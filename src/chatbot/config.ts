// src/chatbot/config.ts
// Configuration for the chatbot system

export interface ChatBotConfig {
  // Model configuration
  modelName: string;
  modelVersion: string;
  
  // Retrieval configuration
  retrievalThreshold: number;
  maxResults: number;
  maxContextDocuments: number;
  
  // Performance settings
  enableWebGPU: boolean;
  enableWebWorkers: boolean;
  lazyLoadModel: boolean;
  
  // UI settings
  chatbotPosition: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  chatbotWidth: number;
  chatbotHeight: number;
  
  // Feature flags
  enableSourceCitations: boolean;
  enableSuggestedQuestions: boolean;
  enableStreaming: boolean;
}

// Default configuration
export const DEFAULT_CHATBOT_CONFIG: ChatBotConfig = {
  // Model configuration - using a small, efficient model suitable for browser use
  modelName: 'Xenova/distilgpt2',
  modelVersion: 'v1.0.0',
  
  // Retrieval configuration
  retrievalThreshold: 0.15,
  maxResults: 10,
  maxContextDocuments: 5,
  
  // Performance settings
  enableWebGPU: true,
  enableWebWorkers: true,
  lazyLoadModel: true,
  
  // UI settings
  chatbotPosition: 'bottom-right',
  chatbotWidth: 350,
  chatbotHeight: 500,
  
  // Feature flags
  enableSourceCitations: true,
  enableSuggestedQuestions: true,
  enableStreaming: false, // Set to true when streaming is implemented
};

// Environment-specific configuration overrides
export const getChatBotConfig = (): ChatBotConfig => {
  // In production, we might want different settings
  if (process.env.NODE_ENV === 'production') {
    return {
      ...DEFAULT_CHATBOT_CONFIG,
      // Production-specific optimizations
      lazyLoadModel: true, // Definitely want lazy loading in production
      enableWebGPU: true,  // Try to use WebGPU in production
    };
  }
  
  // Development configuration
  return DEFAULT_CHATBOT_CONFIG;
};