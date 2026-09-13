// src/chatbot/__tests__/evaluation.test.ts
// Tests for the evaluation framework

import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { EvaluationTestRunner } from '../evaluation/testRunner';
import { Question } from 'chatbot/evaluation/questions';

// Mock the LLM service to avoid actual API calls during testing
// MUST BE DONE BEFORE importing ChatBotService
jest.mock('../llm/llmService', () => {
  return {
    // This is what gets imported as LLMApiService in chatbotService.ts
    LLMApiService: jest.fn().mockImplementation(() => ({
      initialize: jest.fn(() => Promise.resolve()),
      generate: jest.fn((prompt: string) => {
        // Simple mock that returns grounded responses based on prompt content
        if (prompt.includes('Has Jimmy worked at Google?')) {
          return Promise.resolve("not available");
        }
        if (prompt.includes('Jimmy has significant experience')) {
          return Promise.resolve('Jimmy has significant experience with JavaScript, TypeScript, React, and Go.');
        }
        if (prompt.includes('experiment management platform')) {
          return Promise.resolve('At Madhive, Jimmy led the design and development of an internal experiment management platform.');
        }
        if (prompt.includes('not available')) {
          return Promise.resolve("I don't have information indicating that in my portfolio.");
        }
        return Promise.resolve(`Mock response to: ${prompt.substring(0, 50)}...`);
      }),
      isReady: jest.fn().mockReturnValue(true),
      getProgress: jest.fn().mockReturnValue(1),
      getError: jest.fn().mockReturnValue(null)
    })),
    // Keep MockLLMService for any other uses if needed
    MockLLMService: jest.fn().mockImplementation(() => ({
      initialize: jest.fn(() => Promise.resolve()),
      generate: jest.fn((prompt: string) => {
        if (prompt.includes('Has Jimmy worked at Google?')) {
          return Promise.resolve("not available");
        }
        if (prompt.includes('Jimmy has significant experience')) {
          return Promise.resolve('Jimmy has significant experience with JavaScript, TypeScript, React, and Go.');
        }
        if (prompt.includes('experiment management platform')) {
          return Promise.resolve('At Madhive, Jimmy led the design and development of an internal experiment management platform.');
        }
        if (prompt.includes('not available')) {
          return Promise.resolve("I don't have information indicating that in my portfolio.");
        }
        return Promise.resolve(`Mock response to: ${prompt.substring(0, 50)}...`);
      }),
      isReady: jest.fn().mockReturnValue(true),
      getProgress: jest.fn().mockReturnValue(1),
      getError: jest.fn().mockReturnValue(null)
    }))
  };
});

// Mock modelLoader with proper syntax
jest.mock('../llm/modelLoader', () => ({
  createModelLoader: jest.fn(() => ({
    initialize: jest.fn(() => Promise.resolve()),
    generate: jest.fn(() => Promise.resolve('Mock model response')),
    isReady: jest.fn().mockReturnValue(true),
    getProgress: jest.fn().mockReturnValue(1),
    getError: jest.fn().mockReturnValue(null)
  })),
  defaultModelOptions: {
    modelId: 'test-model',
    useWebGPU: true,
    useWorker: true
  }
}));


interface TestResult {
  questionId: string;
  question: string;
  response: string;
  expectedKeywords: string[];
  matchedKeywords: string[];
  score: number;
  passed: boolean;
}

describe('Evaluation Test Framework', () => {
  let testRunner: EvaluationTestRunner;

  beforeEach(async () => {
    testRunner = new EvaluationTestRunner();
    await testRunner.initialize();
  });

  it('should create an evaluation test runner', () => {
    expect(testRunner).toBeInstanceOf(EvaluationTestRunner);
  });

  it('should run a single question and return structured results', async () => {
    const question: Question = {
      id: 'test-001',
      question: `What is Jimmy's primary expertise?`,
      expectedKeywords: ['javascript', 'typescript', 'react', 'go'],
      category: 'skills',
      difficulty: 'easy'
    };

    const result = await testRunner.runQuestion(question);

    expect(result).toHaveProperty('questionId', 'test-001');
    expect(result).toHaveProperty('question');
    expect(result).toHaveProperty('response');
    expect(result).toHaveProperty('expectedKeywords');
    expect(result).toHaveProperty('matchedKeywords');
    expect(result).toHaveProperty('score');
    expect(result).toHaveProperty('passed');

    expect(typeof result.response).toBe('string');
    expect(result.response.length).toBeGreaterThan(0);
    expect(Array.isArray(result.expectedKeywords)).toBe(true);
    expect(Array.isArray(result.matchedKeywords)).toBe(true);
    expect(typeof result.score).toBe('number');
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(1);
    expect(typeof result.passed).toBe('boolean');
  });

  it('should handle unsupported questions correctly', async () => {
    const question: Question = {
      id: 'unsupported-001',
      question: 'Has Jimmy worked at Google?',
      expectedKeywords: ['not available', "don't have information", 'not in my portfolio'],
      category: 'unsupported',
      difficulty: 'easy'
    };

    const result = await testRunner.runQuestion(question);

    expect(result.questionId).toBe('unsupported-001');
    expect(typeof result.response).toBe('string');
    expect(result.response.length).toBeGreaterThan(0);

    // For unsupported questions, check if we got a "not available" type response
    const lowerResponse = result.response.toLowerCase();
    const isNotAvailable = question.expectedKeywords.some(keyword => 
      lowerResponse.includes(keyword.toLowerCase())
    );

    // Verify that we detected the response as unsupported
    expect(isNotAvailable).toBe(true);
  });

  it('should generate a report from results', () => {
    const mockResults: TestResult[] = [
      {
        questionId: 'test-001',
        question: 'Test question 1',
        response: 'Test response 1',
        expectedKeywords: ['test', 'response'],
        matchedKeywords: ['test', 'response'],
        score: 1.0,
        passed: true
      },
      {
        questionId: 'test-002',
        question: 'Test question 2',
        response: 'Test response 2',
        expectedKeywords: ['test', 'missing'],
        matchedKeywords: ['test'],
        score: 0.5,
        passed: true
      },
      {
        questionId: 'test-003',
        question: 'Test question 3',
        response: 'Test response 3',
        expectedKeywords: ['present'],
        matchedKeywords: [],
        score: 0.0,
        passed: false
      }
    ];

    const report = testRunner.generateReport(mockResults);

    expect(typeof report).toBe('string');
    expect(report.length).toBeGreaterThan(0);
    expect(report.includes('Chatbot Evaluation Report')).toBe(true);
    expect(report.includes('Total Questions: 3')).toBe(true);
    expect(report.includes('Passed: 2')).toBe(true);
    expect(report.includes('Failed: 1')).toBe(true);
    expect(report.includes('Average Score:')).toBe(true);
    expect(report.includes('[PASS] test-001')).toBe(true);
    expect(report.includes('[FAIL] test-003')).toBe(true);
  });
});