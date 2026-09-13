// src/chatbot/llm/webgpuDetector.ts
/**
 * WebGPU capability detection utility
 * Determines if the current browser/device supports WebGPU for GPU acceleration
 */
interface WebGPUInfo {
  available: boolean;
  adapterName?: string;
  deviceName?: string;
  error?: string;
  features?: string[];
  limits?: {
    maxTextureDimension1D?: number;
    maxTextureDimension2D?: number;
    maxTextureDimension3D?: number;
    maxTextureArrayLayers?: number;
    maxBindGroups?: number;
    maxBindingsPerBindGroup?: number;
    maxDynamicUniformBuffersPerPipelineLayout?: number;
    maxDynamicStorageBuffersPerPipelineLayout?: number;
    maxSampledTexturesPerShaderStage?: number;
    maxSamplersPerShaderStage?: number;
    maxStorageBuffersPerShaderStage?: number;
    maxStorageTexturesPerShaderStage?: number;
    maxUniformBuffersPerShaderStage?: number;
    maxUniformBufferBindingSize?: number;
    maxStorageBufferBindingSize?: number;
    minUniformBufferOffsetAlignment?: number;
    minStorageBufferOffsetAlignment?: number;
  } | null;
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class WebGPUDetector {
  /**
   * Check if WebGPU is available in the current browser
   * @returns Promise that resolves to true if WebGPU is available
   */
  static async isAvailable(): Promise<boolean> {
    // Check if navigator.gpu exists (standard WebGPU API)
    if (!('gpu' in navigator)) {
      return false;
    }

    try {
      // Attempt to request a GPU adapter
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const adapter = await (navigator as any).gpu.requestAdapter();
      return adapter !== null;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // Request failed - WebGPU not available or not supported
      return false;
    }
  }

  /**
   * Get detailed WebGPU information
   * @returns Promise with WebGPU capabilities or null if not available
   */
  static async getInfo(): Promise<WebGPUInfo> {
    if (!('gpu' in navigator)) {
      return { available: false };
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const adapter = await (navigator as any).gpu.requestAdapter();
      if (!adapter) {
        return { available: false };
      }

      const device = await adapter.requestDevice();
      
      return {
        available: true,
        adapterName: adapter.description,
        deviceName: device.description,
        features: [...adapter.features],
        limits: adapter.limits
      };
    } catch (error) {
      return { 
        available: false,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  /**
   * Check if the device has sufficient memory for LLM inference
   * @param requiredMB - Minimum required memory in MB
   * @returns Promise that resolves to true if sufficient memory is available
   */
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types, @typescript-eslint/no-unused-vars
  static async hasSufficientMemory(requiredMB: number = 1024): Promise<boolean> {
    // Note: There's no standard API to check device memory in browsers
    // This is a placeholder that assumes modern devices have sufficient memory
    // In practice, we'd rely on WebGPU device limits or catch OOM errors during initialization
    return true;
  }

  /**
   * Get recommended WebGPU usage based on device capabilities
   * @returns Object with recommendations for WebGPU usage
   */
  static async getRecommendations(): Promise<{
    shouldUseWebGPU: boolean;
    preferredBackend: 'webgpu' | 'wasm' | 'webgl';
    reason: string;
  }> {
    const isAvailable = await this.isAvailable();
    
    if (!isAvailable) {
      return {
        shouldUseWebGPU: false,
        preferredBackend: 'wasm', // WASM is widely available
        reason: 'WebGPU not available in this browser/device'
      };
    }

    try {
      const info = await this.getInfo();
      if (!info.available) {
        return {
          shouldUseWebGPU: false,
          preferredBackend: 'wasm',
          reason: 'WebGPU adapter not available'
        };
      }

      // WebGPU is available - check if it's worth using
      // For now, we'll recommend WebGPU if available
      return {
        shouldUseWebGPU: true,
        preferredBackend: 'webgpu',
        reason: 'WebGPU available and recommended for best performance'
      };
    } catch (error) {
      return {
        shouldUseWebGPU: false,
        preferredBackend: 'wasm',
        reason: `Unable to determine WebGPU capabilities: ${error}`
      };
    }
  }
}

/**
 * Utility function to check if WebGPU is available with caching
 * Useful for preventing repeated checks
 */
let webgpUAvaliableCache: boolean | null = null;
const webgpUAvaliablePromise: Promise<boolean> | null = null;

export async function isWebGPUAvaliable(): Promise<boolean> {
  if (webgpUAvaliableCache !== null) {
    return webgpUAvaliableCache;
  }

  if (webgpUAvaliablePromise) {
    return webgpUAvaliablePromise;
  }

  return WebGPUDetector.isAvailable()
    .then(result => {
      webgpUAvaliableCache = result;
      return result;
    })
    .catch(() => {
      return false;
    });
}