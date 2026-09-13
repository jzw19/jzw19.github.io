// src/chatbot/evaluation/questions.ts
// Evaluation question dataset for chatbot testing
export interface Question {
  id: string;
  question: string;
  expectedKeywords: string[];
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
};

/**
 * Evaluation questions organized by topic and difficulty
 * Each question includes expected keywords/phrases that should appear in grounded responses
 */
export const evaluationQuestions: Question[] = [
  // Technology & Skills Questions
  {
    id: 'tech-001',
    question: 'What programming languages does Jimmy have experience with?',
    expectedKeywords: ['javascript', 'typescript', 'go', 'golang', 'java', 'python', 'c++', 'c#'],
    category: 'skills',
    difficulty: 'easy'
  },
  {
    id: 'tech-002',
    question: 'What frontend frameworks and libraries has Jimmy worked with?',
    expectedKeywords: ['react', 'redux', 'mui', 'material-ui'],
    category: 'skills',
    difficulty: 'easy'
  },
  {
    id: 'tech-003',
    question: 'What testing tools and frameworks has Jimmy used?',
    expectedKeywords: ['playwright', 'jest', 'vitest', 'burp', 'jmeter', 'axe', 'qa', 'testing'],
    category: 'skills',
    difficulty: 'medium'
  },
  {
    id: 'tech-004',
    question: 'What cloud platforms and services has Jimmy experience with?',
    expectedKeywords: ['gcp', 'google cloud', 'aws', 'azure', 'postgresql', 'rest', 'grpc'],
    category: 'skills',
    difficulty: 'medium'
  },
  {
    id: 'tech-005',
    question: 'What is Jimmy\'s primary area of expertise?',
    expectedKeywords: ['javascript', 'typescript', 'react', 'go', 'full-stack'],
    category: 'skills',
    difficulty: 'easy'
  },

  // Madhive Experience Questions
  {
    id: 'madhive-001',
    question: 'What did Jimmy build at Madhive?',
    expectedKeywords: ['experiment', 'management', 'platform', 'a/b tests', 'advertising'],
    category: 'experience',
    difficulty: 'easy'
  },
  {
    id: 'madhive-002',
    question: 'What performance improvement did Jimmy achieve at Madhive?',
    expectedKeywords: ['90%', 'latency', 'export', '10 seconds', '1 second'],
    category: 'experience',
    difficulty: 'easy'
  },
  {
    id: 'madhive-003',
    question: 'How did Jimmy improve testing efficiency at Madhive?',
    expectedKeywords: ['playwright', '83%', 'manual qa', 'automated testing', 'release confidence'],
    category: 'experience',
    difficulty: 'medium'
  },
  {
    id: 'madhive-004',
    question: 'What data optimization work did Jimmy do at Madhive?',
    expectedKeywords: ['postgresql', '7m+', 'batched updates', 'scheduled queries', 'concurrency'],
    category: 'experience',
    difficulty: 'medium'
  },
  {
    id: 'madhive-005',
    question: 'What UI development work did Jimmy do at Madhive?',
    expectedKeywords: ['react', 'complex forms', 'validation', 'caching', 'api mocking'],
    category: 'experience',
    difficulty: 'medium'
  },
  {
    id: 'madhive-006',
    question: 'What mentoring activities has Jimmy done at Madhive?',
    expectedKeywords: ['mentored', 'engineers', 'react', 'go', 'testing', 'onboarding'],
    category: 'experience',
    difficulty: 'hard'
  },

  // iCIMS Experience Questions
  {
    id: 'icims-001',
    question: 'What did Jimmy work on at iCIMS?',
    expectedKeywords: ['jwt', 'authentication', 'api', 'react', 'redux', 'millions of users'],
    category: 'experience',
    difficulty: 'easy'
  },
  {
    id: 'icims-002',
    question: 'What testing experience does Jimmy have from iCIMS?',
    expectedKeywords: ['burp suite', 'jmeter', 'axe', 'security testing', 'accessibility'],
    category: 'experience',
    difficulty: 'medium'
  },
  {
    id: 'icims-003',
    question: 'What frontend work did Jimmy do at iCIMS?',
    expectedKeywords: ['react component libraries', 'reusable', 'frontend development'],
    category: 'experience',
    difficulty: 'medium'
  },

  // Internship Questions
  {
    id: 'intern-001',
    question: 'What testing work did Jimmy do during his iCIMS internships?',
    expectedKeywords: ['end-to-end tests', 'java testing utilities', 'bdd', 'qa workflow'],
    category: 'experience',
    difficulty: 'medium'
  },
  {
    id: 'intern-002',
    question: 'What did Jimmy do at WRKSHP Global?',
    expectedKeywords: ['device compatibility', 'scoring algorithm', 'critical error'],
    category: 'experience',
    difficulty: 'hard'
  },

  // Project Questions
  {
    id: 'project-001',
    question: 'What are some notable projects Jimmy has worked on?',
    expectedKeywords: ['portfolio website', 'chatbot', 'react', 'mui', 'webgpu'],
    category: 'project',
    difficulty: 'easy'
  },
  {
    id: 'project-002',
    question: 'What technologies does Jimmy\'s portfolio website use?',
    expectedKeywords: ['react', 'typescript', 'mui', 'webgpu', 'transformers'],
    category: 'project',
    difficulty: 'medium'
  },

  // Education Questions
  {
    id: 'edu-001',
    question: 'What is Jimmy\'s educational background?',
    expectedKeywords: ['education', 'degree', 'university', 'college'],
    category: 'education',
    difficulty: 'easy'
  },

  // Unsupported/Negative Questions (should return "not available")
  {
    id: 'unsupported-001',
    question: 'Has Jimmy worked at Google?',
    expectedKeywords: ['not available', "don't have information", 'not in my portfolio'],
    category: 'unsupported',
    difficulty: 'easy'
  },
  {
    id: 'unsupported-002',
    question: 'What is Jimmy\'s salary?',
    expectedKeywords: ['not available', "don't have information", 'not in my portfolio'],
    category: 'unsupported',
    difficulty: 'easy'
  },
  {
    id: 'unsupported-003',
    question: 'Tell me about Jimmy\'s personal life',
    expectedKeywords: ['not available', "don't have information", 'not in my portfolio', 'personal'],
    category: 'unsupported',
    difficulty: 'easy'
  },
  {
    id: 'unsupported-004',
    question: 'What is Jimmy\'s age or date of birth?',
    expectedKeywords: ['not available', "don't have information", 'not in my portfolio'],
    category: 'unsupported',
    difficulty: 'easy'
  },
  {
    id: 'unsupported-005',
    question: 'What are Jimmy\'s political views?',
    expectedKeywords: ['not available', "don't have information", 'not in my portfolio'],
    category: 'unsupported',
    difficulty: 'easy'
  }
];

/**
 * Get questions by category
 */
export const getQuestionsByCategory = (category: string) => {
  return evaluationQuestions.filter(q => q.category === category);
};

/**
 * Get questions by difficulty
 */
export const getQuestionsByDifficulty = (difficulty: string) => {
  return evaluationQuestions.filter(q => q.difficulty === difficulty);
};

/**
 * Get unsupported questions (for testing grounded behavior)
 */
export const getUnsupportedQuestions = () => {
  return evaluationQuestions.filter(q => q.category === 'unsupported');
};

/**
 * Get all questions
 */
export const getAllQuestions = () => {
  return [...evaluationQuestions];
};

export default evaluationQuestions;