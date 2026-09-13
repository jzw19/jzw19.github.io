// src/chatbot/evaluation/testRunner.ts
// Automated test execution for chatbot evaluation

import { Question, evaluationQuestions } from './questions';

import { ChatBotService } from '../chatbotService';

/**
 * Test runner for evaluating chatbot responses
 * Runs evaluation questions and scores responses based on keyword presence
 */
export class EvaluationTestRunner {
  private chatBot: ChatBotService;
  
  constructor() {
    this.chatBot = new ChatBotService();
  }
  
  /**
   * Initialize the chatbot service
   */
  async initialize(): Promise<void> {
    await this.chatBot.initialize();
  }
  
  /**
   * Run a single evaluation question and score the response
   */
  async runQuestion(question: Question): Promise<{
    questionId: string;
    question: string;
    response: string;
    expectedKeywords: string[];
    matchedKeywords: string[];
    score: number;
    passed: boolean;
  }> {
    const response = (await this.chatBot.generateResponse(question.question)).response;
    
    // Convert response to lowercase for case-insensitive matching
    const lowerResponse = response.toLowerCase();
    
    // Check if expected keywords are present in the response
    const matches = question.expectedKeywords.filter(keyword => 
      lowerResponse.includes(keyword.toLowerCase())
    );
    
    // Calculate score as percentage of expected keywords found
    const score = matches.length / question.expectedKeywords.length;
    
    return {
      questionId: question.id,
      question: question.question,
      response: response,
      expectedKeywords: question.expectedKeywords,
      matchedKeywords: matches,
      score: score,
      passed: score >= 0.5 // Consider passed if at least 50% of keywords found
    };
  }
  
  /**
   * Run questions by category or all questions if no category specified
   */
  async runQuestions(category?: string): Promise<{
    questionId: string;
    question: string;
    response: string;
    expectedKeywords: string[];
    matchedKeywords: string[];
    score: number;
    passed: boolean;
  }[]> {
    const questions = category ? evaluationQuestions.filter(q => q.category === category) : evaluationQuestions;
    const results: {
      questionId: string;
      question: string;
      response: string;
      expectedKeywords: string[];
      matchedKeywords: string[];
      score: number;
      passed: boolean;
    }[] = [];
    
    for (const question of questions) {
      await this.runQuestion(question).then(result => results.push(result)).catch(error => {
        console.error(`Error running question ${question.id}:`, error);
        results.push({
          questionId: question.id,
          question: question.question,
          response: `ERROR: ${error.message}`,
          expectedKeywords: question.expectedKeywords,
          matchedKeywords: [],
          score: 0,
          passed: false
        });
      });
    }
    
    return results;
  }
  
  /**
   * Generate a summary report of test results
   */
  generateReport(results: {
    questionId: string;
    question: string;
    response: string;
    expectedKeywords: string[];
    matchedKeywords: string[];
    score: number;
    passed: boolean;
  }[]): string {
    const total = results.length;
    const passed = results.filter(r => r.passed).length;
    const failed = total - passed;
    const averageScore = results.reduce((sum, r) => sum + r.score, 0) / total;
    
    let report = `Chatbot Evaluation Report\n`;
    report += `=====================\n\n`;
    report += `Total Questions: ${total}\n`;
    report += `Passed: ${passed}\n`;
    report += `Failed: ${failed}\n`;
    report += `Average Score: ${(averageScore * 100).toFixed(1)}%\n\n`;
    
    report += `Detailed Results:\n`;
    report += `----------------\n`;
    
    for (const result of results) {
      report += `\n[${result.passed ? 'PASS' : 'FAIL'}] ${result.questionId}\n`;
      report += `Q: ${result.question}\n`;
      report += `A: ${result.response}\n`;
      report += `Expected: ${result.expectedKeywords.join(', ')}\n`;
      report += `Matched: ${result.matchedKeywords.length > 0 ? result.matchedKeywords.join(', ') : 'None'}\n`;
      report += `Score: ${(result.score * 100).toFixed(1)}%\n`;
    }
    
    return report;
  }
}

/**
 * Factory function to create an evaluation test runner
 */
export function createEvaluationTestRunner(): EvaluationTestRunner {
  return new EvaluationTestRunner();
}

export default EvaluationTestRunner;