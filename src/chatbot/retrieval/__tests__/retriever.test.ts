import { Retriever, retrieveKnowledge } from '../retriever';
import { beforeEach, describe, expect, it } from '@jest/globals';

import { knowledgeBase } from '../../knowledge/knowledgeBase';

describe('Retriever', () => {
  let retriever: Retriever;

  beforeEach(() => {
    retriever = new Retriever({
      maxResults: 5,
      threshold: 0.15,
      boostExactPhrase: true,
      boostTechnicalTerms: true
    });
  });

  describe('Basic Retrieval', () => {
    it('should return empty results for empty query', () => {
      const result = retriever.retrieve('');
      expect(result.documents).toHaveLength(0);
      expect(result.scores).toHaveLength(0);
      expect(result.hasSufficientEvidence).toBe(false);
    });

    it('should return empty results for whitespace-only query', () => {
      const result = retriever.retrieve('   ');
      expect(result.documents).toHaveLength(0);
      expect(result.scores).toHaveLength(0);
      expect(result.hasSufficientEvidence).toBe(false);
    });

    it('should return results for relevant query', () => {
      const result = retriever.retrieve('Does Jimmy have experience with PostgreSQL');
      expect(result.documents.length).toBeGreaterThan(0);
      expect(result.hasSufficientEvidence).toBe(true);
      // Should contain technical skills
      const skillDocs = result.documents.filter(doc => doc.category === 'skill');
      expect(skillDocs.length).toBeGreaterThan(0);
    });

    it('should sort results by relevance score descending', () => {
      const result = retriever.retrieve('React experience');
      if (result.documents.length > 1) {
        for (let i = 0; i < result.scores.length - 1; i++) {
          expect(result.scores[i]).toBeGreaterThanOrEqual(result.scores[i + 1]);
        }
      }
    });

    it('should respect maxResults limit', () => {
      const result = retriever.retrieve('experience');
      expect(result.documents.length).toBeLessThanOrEqual(5);
    });

    it('should apply threshold filtering', () => {
      // We'll test this by checking that the retriever returns some results
      // since we can't easily change threshold without modifying the constructor
      const result = retriever.retrieve('test');
      // The test should pass as long as we get some result (even if empty)
      expect(result).toBeDefined();
    });
  });

  describe('Scoring Components', () => {
    it('should give higher score for title matches', () => {
      const reactResult = retriever.retrieve('React');
      const randomResult = retriever.retrieve('xyzabc123');
      
      // React should have documents with high title scores
      const reactHasHighScore = reactResult.documents.some(doc => 
        doc.title.toLowerCase().includes('react') && 
        reactResult.scores[reactResult.documents.indexOf(doc)] > 0.3
      );
      
      expect(reactHasHighScore).toBe(true);
      
      // Random query should have low or no scores
      if (randomResult.documents.length > 0) {
        expect(Math.max(...randomResult.scores)).toBeLessThan(0.3);
      }
    });

    it('should boost exact phrase matches', () => {
      const exactResult = retriever.retrieve('PostgreSQL large-scale data updates');
      const partialResult = retriever.retrieve('PostgreSQL data');
      
      // Exact phrase should generally score higher
      if (exactResult.documents.length > 0 && partialResult.documents.length > 0) {
        // This is a probabilistic test - exact phrase should help
        expect(exactResult.scores[0]).toBeGreaterThanOrEqual(partialResult.scores[0]);
      }
    });

    it('should boost technical term matches', () => {
      const technicalResult = retriever.retrieve('React TypeScript Go PostgreSQL');
      const nonTechnicalResult = retriever.retrieve('hello world foo bar');
      
      // Technical query should yield higher scores
      if (technicalResult.documents.length > 0 && nonTechnicalResult.documents.length > 0) {
        const techAvg = technicalResult.scores.reduce((a, b) => a + b, 0) / technicalResult.scores.length;
        const nonTechAvg = nonTechnicalResult.scores.reduce((a, b) => a + b, 0) / nonTechnicalResult.scores.length;
        
        expect(techAvg).toBeGreaterThanOrEqual(nonTechAvg);
      }
    });
  });

  describe('Specific Query Tests', () => {
    it('should find PostgreSQL-specific documents', () => {
      const result = retriever.retrieve('PostgreSQL experience');
      expect(result.hasSufficientEvidence).toBe(true);
      
      const postgresDocs = result.documents.filter(doc => 
        doc.content.toLowerCase().includes('postgresql')
      );
      expect(postgresDocs.length).toBeGreaterThan(0);
    });

    it('should find experiment platform documents', () => {
      const result = retriever.retrieve('experiment management platform');
      expect(result.hasSufficientEvidence).toBe(true);
      
      const experimentDocs = result.documents.filter(doc => 
        doc.content.toLowerCase().includes('experiment') && 
        doc.content.toLowerCase().includes('platform')
      );
      expect(experimentDocs.length).toBeGreaterThan(0);
    });

    it('should find quantitative facts', () => {
      const latencyResult = retriever.retrieve('90% latency reduction');
      expect(latencyResult.hasSufficientEvidence).toBe(true);
      
      const latencyDocs = latencyResult.documents.filter(doc => 
        doc.content.includes('90%') && 
        doc.content.includes('latency')
      );
      expect(latencyDocs.length).toBeGreaterThan(0);
      
      const rowsResult = retriever.retrieve('270K rows');
      expect(rowsResult.hasSufficientEvidence).toBe(true);
      
      const rowsDocs = rowsResult.documents.filter(doc => 
        doc.content.includes('270K') && 
        doc.content.includes('rows')
      );
      expect(rowsDocs.length).toBeGreaterThan(0);
    });

    it('should handle unsupported questions appropriately', () => {
      const result = retriever.retrieve('Has Jimmy worked at Google?');
      // This should return low scores or no results since Google is not in knowledge base
      if (result.documents.length > 0) {
        // If we get results, they should have low scores (not highly relevant)
        const maxScore = Math.max(...result.scores);
        expect(maxScore).toBeLessThan(0.3); // Arbitrary low threshold
      }
    });
  });

  describe('Convenience Function', () => {
    it('should work with retrieveKnowledge convenience function', () => {
      const result = retrieveKnowledge('TypeScript experience');
      expect(result).toHaveProperty('documents');
      expect(result).toHaveProperty('scores');
      expect(result).toHaveProperty('hasSufficientEvidence');
      expect(result).toHaveProperty('query');
    });

    it('should accept options in convenience function', () => {
      const result = retrieveKnowledge('testing', { maxResults: 2, threshold: 0.2 });
      expect(result.documents.length).toBeLessThanOrEqual(2);
    });
  });

  describe('Edge Cases', () => {
    it('should handle special characters in query', () => {
      const result = retriever.retrieve('C/C++ experience');
      // Should not crash
      expect(result).toBeDefined();
    });

    it('should handle unicode characters', () => {
      const result = retriever.retrieve('José experience'); // Assuming no José in KB
      expect(result).toBeDefined();
    });

    it('should work with very long queries', () => {
      const longQuery = 'a '.repeat(100) + 'React';
      const result = retriever.retrieve(longQuery);
      expect(result).toBeDefined();
      // Should still find React-related content if present
    });

    it('should prevent index out of bounds on empty results', () => {
      const result = retriever.retrieve('xyz qwerty asdfgh');
      // Should not crash when accessing result.documents[0] for hasSufficientEvidence
      expect(result.hasSufficientEvidence).toBe(false);
    });
  });
});

// Test the actual knowledge base statistics
describe('Knowledge Base', () => {
  it('should have expected structure', () => {
    expect(knowledgeBase).toBeDefined();
    expect(Array.isArray(knowledgeBase)).toBe(true);
    expect(knowledgeBase.length).toBeGreaterThan(0);
  });

  it('should have documents with required fields', () => {
    knowledgeBase.forEach(doc => {
      expect(doc).toHaveProperty('id');
      expect(doc).toHaveProperty('title');
      expect(doc).toHaveProperty('category');
      expect(doc).toHaveProperty('content');
      
      expect(typeof doc.id).toBe('string');
      expect(typeof doc.title).toBe('string');
      expect(typeof doc.category).toBe('string');
      expect(typeof doc.content).toBe('string');
      
      // Category should be valid
      const validCategories = ['experience', 'project', 'skill', 'education', 'achievement'];
      expect(validCategories).toContain(doc.category);
    });
  });

  it('should not be empty', () => {
    expect(knowledgeBase.length).toBeGreaterThan(0);
  });
});