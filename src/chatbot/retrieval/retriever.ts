// src/chatbot/retrieval/retriever.ts
import { KnowledgeDocument, knowledgeBase } from '../knowledge/knowledgeBase';

interface RetrievalOptions {
  /** Maximum number of documents to return */
  maxResults?: number;
  /** Minimum relevance score required (0-1) */
  threshold?: number;
  /** Whether to boost exact phrase matches */
  boostExactPhrase?: boolean;
  /** Whether to boost technical term matches */
  boostTechnicalTerms?: boolean;
}

export interface RetrievalResult {
  documents: KnowledgeDocument[];
  scores: number[];
  hasSufficientEvidence: boolean;
  query: string;
}

/**
 * Deterministic retrieval system for the portfolio knowledge base
 * 
 * Features:
 * - Deterministic output (same input = same output)
 * - Relevance threshold to prevent irrelevant results
 * - Explicit no-evidence detection
 * - Configurable scoring weights
 * - Lightweight, no external dependencies
 */
export class Retriever {
  private readonly maxResults: number;
  private readonly threshold: number;
  private readonly boostExactPhrase: boolean;
  private readonly boostTechnicalTerms: boolean;

  // Technical terms commonly found in the resume for boosting
  private readonly technicalTerms = new Set([
    'react', 'typescript', 'javascript', 'go', 'golang', 'postgresql', 'sql',
    'rest', 'grpc', 'api', 'apis', 'gcp', 'aws', 'docker', 'kubernetes',
    'ci/cd', 'cicd', 'jenkins', 'git', 'github', 'jira', 'playwright',
    'jest', 'vitest', 'react testing library', 'rtl', 'looker', 'lookml',
    'bigquery', 'terraform', 'redux', 'html', 'css', 'sass', 'scss',
    'mui', 'material-ui', 'node.js', 'nodejs', 'express', 'grpc',
    'websocket', 'websockets', 'microservices', 'distributed systems',
    'a/b testing', 'ab testing', 'experimentation', 'analytics',
    'dashboard', 'dashboards', 'statistical significance', 'p-value',
    't-value', 'performance', 'optimization', 'latency', 'throughput',
    'scalability', 'reliability', 'testing', 'qa', 'security',
    'accessibility', 'agile', 'scrum', 'kanban', 'tdd', 'bdd',
    'ci/cd pipeline', 'data ingestion', 'etl', 'elt', 'batch processing',
    'scheduled queries', 'stored procedures', 'triggers', 'concurrency',
    'race condition', 'deadlock', 'isolation level', 'acid'
  ]);

  constructor(options: RetrievalOptions = {}) {
    this.maxResults = options.maxResults ?? 5;
    this.threshold = options.threshold ?? 0.15; // Empirically determined threshold
    this.boostExactPhrase = options.boostExactPhrase ?? true;
    this.boostTechnicalTerms = options.boostTechnicalTerms ?? true;
  }

  /**
   * Retrieve relevant documents for a query
   * 
   * @param query - User's question or search query
   * @returns RetrievalResult with documents, scores, and evidence flag
   */
  retrieve(query: string): RetrievalResult {
    // Normalize query: lowercase, remove extra whitespace
    const normalizedQuery = query.trim().toLowerCase();
    
    // Handle empty query
    if (!normalizedQuery) {
      return {
        documents: [],
        scores: [],
        hasSufficientEvidence: false,
        query: normalizedQuery
      };
    }

    // Tokenize query (simple whitespace split for now)
    const queryTokens = normalizedQuery.split(/\s+/).filter(token => token.length > 0);
    
    // Score each document
    const scoredDocuments: { 
      document: KnowledgeDocument; 
      score: number; 
      matches: {
        title: number;
        category: number; 
        content: number;
        exactPhrase: boolean;
        technicalTerms: number;
      }
    }[] = [];

    for (const doc of knowledgeBase) {
      const scoreComponents = this.calculateScore(doc, normalizedQuery, queryTokens);
      const totalScore = 
        scoreComponents.title * 0.4 +      // Title matches are most important
        scoreComponents.category * 0.2 +   // Category matches
        scoreComponents.content * 0.3 +    // Content matches
        (scoreComponents.exactPhrase ? 0.1 : 0) + // Exact phrase bonus
        (scoreComponents.technicalTerms * 0.1);   // Technical term bonus
      
      scoredDocuments.push({
        document: doc,
        score: totalScore,
        matches: scoreComponents
      });
    }

    // Sort by score descending
    scoredDocuments.sort((a, b) => b.score - a.score);

    // Filter by threshold
    const thresholdDocuments = scoredDocuments.filter(
      item => item.score >= this.threshold
    );

    // Limit results
    const resultDocuments = thresholdDocuments.slice(0, this.maxResults);
    
    // Determine if we have sufficient evidence
    const hasSufficientEvidence = resultDocuments.length > 0 && 
      resultDocuments[0].score >= this.threshold;

    return {
      documents: resultDocuments.map(item => item.document),
      scores: resultDocuments.map(item => item.score),
      hasSufficientEvidence: hasSufficientEvidence,
      query: normalizedQuery
    };
  }

  /**
   * Calculate individual score components for a document
   */
  private calculateScore(
    doc: KnowledgeDocument, 
    normalizedQuery: string,
    queryTokens: string[]
  ): {
    title: number;
    category: number;
    content: number;
    exactPhrase: boolean;
    technicalTerms: number;
  } {
    const titleLower = doc.title.toLowerCase();
    const contentLower = doc.content.toLowerCase();
    
    // Title score: percentage of query tokens found in title
    let titleMatches = 0;
    for (const token of queryTokens) {
      if (titleLower.includes(token)) {
        titleMatches++;
      }
    }
    const titleScore = queryTokens.length > 0 ? titleMatches / queryTokens.length : 0;
    
    // Category score: bonus if category appears in query
    const categoryMatches = normalizedQuery.includes(doc.category) ? 1 : 0;
    
    // Content score: percentage of query tokens found in content
    let contentMatches = 0;
    for (const token of queryTokens) {
      if (contentLower.includes(token)) {
        contentMatches++;
      }
    }
    const contentScore = queryTokens.length > 0 ? contentMatches / queryTokens.length : 0;
    
    // Exact phrase bonus: if the entire query appears in title or content
    let exactPhrase = false;
    if (this.boostExactPhrase) {
      exactPhrase = titleLower.includes(normalizedQuery) || 
                   contentLower.includes(normalizedQuery);
    }
    
    // Technical terms bonus: count of technical terms found in query that also appear in doc
    let technicalTermMatches = 0;
    if (this.boostTechnicalTerms) {
      for (const token of queryTokens) {
        if (this.technicalTerms.has(token) && 
            (titleLower.includes(token) || contentLower.includes(token))) {
          technicalTermMatches++;
        }
      }
    }
    // Normalize by query length to prevent long queries from dominating
    const technicalTermScore = queryTokens.length > 0 ? 
      technicalTermMatches / queryTokens.length : 0;

    return {
      title: titleScore,
      category: categoryMatches,
      content: contentScore,
      exactPhrase: exactPhrase,
      technicalTerms: technicalTermScore
    };
  }

  /**
   * Get the top document if sufficient evidence exists
   */
  getTopDocument(query: string): KnowledgeDocument | null {
    const result = this.retrieve(query);
    return result.hasSufficientEvidence && result.documents.length > 0 
      ? result.documents[0] 
      : null;
  }

  /**
   * Get all documents above threshold (no limit)
   */
  getAllAboveThreshold(query: string): RetrievalResult {
    const options: RetrievalOptions = {
      maxResults: knowledgeBase.length, // Return all if above threshold
      threshold: this.threshold,
      boostExactPhrase: this.boostExactPhrase,
      boostTechnicalTerms: this.boostTechnicalTerms
    };
    
    const retriever = new Retriever(options);
    return retriever.retrieve(query);
  }
}

/**
 * Convenience function for quick retrieval
 */
export function retrieveKnowledge(
  query: string, 
  options: RetrievalOptions = {}
): RetrievalResult {
  const retriever = new Retriever(options);
  return retriever.retrieve(query);
}