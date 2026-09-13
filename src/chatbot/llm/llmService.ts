import { TextGenerationPipeline } from '@xenova/transformers';

// src/chatbot/llm/llmService.ts
export interface LLMService {
  /** Initialize the LLM service. Returns a promise that resolves when the model is ready. */
  initialize(): Promise<void>;
  
  /** Generate a response from the given prompt. */
  generate(prompt: string, options?: { 
    temperature?: number; 
    maxTokens?: number; 
    signal?: AbortSignal 
  }): Promise<string>;
  
  /** Check if the service is initialized and ready. */
  isReady(): boolean;
  
  /** Get the current loading progress (0-1). */
  getProgress(): number;
  
  /** Get any error that occurred during initialization or generation. */
  getError(): Error | null;
}

/** A mock LLM service for development and testing. */
export class MockLLMService implements LLMService {
  private initialized = false;
  private progress = 0;
  private error: Error | null = null;
  
  async initialize(): Promise<void> {
    // Simulate loading progress
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        this.progress += 0.1;
        if (this.progress >= 1) {
          this.progress = 1;
          clearInterval(interval);
          this.initialized = true;
          resolve();
        }
      }, 100);
    });
  }
  
  async generate(prompt: string, options?: { 
    temperature?: number; 
    maxTokens?: number; 
    signal?: AbortSignal 
  }): Promise<string> {
    if (!this.initialized) {
      throw new Error('LLM service not initialized');
    }
    
    // Simulate generation delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simple echo for mock - in reality, this would call the LLM
        resolve(`This is a mock response to: "${prompt.substring(0, 50)}..."`);
      }, 500);
    });
  }
  
  isReady(): boolean {
    return this.initialized;
  }
  
  getProgress(): number {
    return this.progress;
  }
  
  getError(): Error | null {
    return this.error;
  }
}

/**
 * Real LLM service implementation using @xenova/transformers (Transformers.js)
 * Implements browser-local inference with Phi-3-mini-4k-instruct model
 * Supports WebGPU, WebGL, and WASM backends with automatic fallback
 */
export class LLMApiService implements LLMService {
  private pipeline: TextGenerationPipeline | null = null;
  private isLoading = false;
  private initialized = false;
  private progress = 0;
  private error: Error | null = null;

  async initialize(): Promise<void> {
    if (this.initialized) return;

    this.isLoading = true;
    this.error = null;

    try {
      // Import transformers dynamically to avoid SSR issues
      const { pipeline } = await import('@xenova/transformers');

      // Create text generation pipeline with Phi-3-mini-4k-instruct
      this.pipeline = await pipeline(
        'text-generation',
        'Xenova/Phi-3-mini-4k-instruct',
        {
          // Rely on automatic backend selection (WebGPU, WebGL, WASM)
        }
      );
      
      this.initialized = true;
      this.isLoading = false;
    } catch (err) {
      this.error = err instanceof Error ? err : new Error(String(err));
      this.isLoading = false;
      throw this.error;
    }
  }

  async generate(prompt: string, options?: {
    temperature?: number;
    maxTokens?: number;
    signal?: AbortSignal
  }): Promise<string> {
    if (!this.initialized) {
      throw new Error('LLM service not initialized');
    }

    if (!this.pipeline) {
      throw new Error('LLM pipeline not ready');
    }

    try {
      // Check for abort signal
      if (options?.signal?.aborted) {
        throw new Error('Generation aborted');
      }

      // Generate response with Phi-3-mini
      const result = await this.pipeline(prompt, {
        max_new_tokens: options?.maxTokens ?? 500,
        temperature: options?.temperature ?? 0.3,
        // Do not use random seeds for deterministic behavior in testing
        // Top-k and top-p sampling for quality
        top_k: 50,
        top_p: 0.9,
        // Return full text so we can extract just the assistant's response
        return_full_text: false,
        // Signal for abort support
        // signal: options?.signal
      });

      // Extract generated text (pipeline returns array of objects)
      const generatedText = Array.isArray(result) && result.length > 0
        ? result[0].toString()
        : typeof result === 'string'
          ? result
          : result.toString();

      return generatedText.trim();
    } catch (err) {
      this.error = err instanceof Error ? err : new Error(String(err));
      throw this.error;
    }
  }

  isReady(): boolean {
    return this.initialized && this.pipeline !== null;
  }

  getProgress(): number {
    // Transformers.js doesn't expose progress easily during generation
    // Return 1 if initialized, 0 otherwise
    return this.initialized ? 1 : 0;
  }

  getError(): Error | null {
    return this.error;
  }
}
