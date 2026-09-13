# Architecture Decision Record: Browser LLM Runtime and Model Selection

## Status
Accepted

## Context
We need to select a browser-local LLM runtime and model for the portfolio chatbot that meets the following requirements:
- Zero recurring inference cost (pure client-side)
- No backend required (static GitHub Pages compatibility)
- Grounded answers (no hallucination of resume facts)
- Privacy-preserving (no external data transmission)
- Reasonable performance on typical desktop hardware
- Acceptable model download size (<1GB target, preferably much smaller)
- Licensing suitable for redistribution

## Decision
We will use **Transformers.js** as the browser inference runtime with the **Phi-3-mini-4k-instruct** model (4-bit quantized ONNX version).

## Consequences

### Positive
1. **Browser Compatibility**: Transformers.js provides automatic fallback chain (WebGPU → WebGL → WASM) ensuring baseline functionality across all major browsers (Chrome, Firefox, Safari, Edge)
2. **Model Availability**: Access to Hugging Face Hub's extensive library of pre-converted ONNX models
3. **Developer Experience**: Familiar pipeline API similar to Hugging Face's Python library, excellent documentation, TypeScript support
4. **Size Efficiency**: Phi-3-mini-4k-instruct at 4-bit quantization is approximately 400-500MB download size
5. **Performance**: Reasonable inference speed (estimated 15-25 tok/s on WebGPU, 3-8 tok/s on WebGL, 1-3 tok/s on WASM)
6. **Licensing**: MIT license for Transformers.js, Phi-3 model is permissively licensed for research/commercial use
7. **Gradual Degradation**: When WebGPU unavailable, gracefully degrades to WASM rather than failing completely
8. **Offline Capability**: Models can be cached via IndexedDB/Cache API for near-instant subsequent loads

### Negative
1. **Performance**: Slower than WebLLM when WebGPU is available (estimated 30-50% slower)
2. **Memory Footprint**: Larger memory usage than WebLLM for equivalent models due to ONNX Runtime overhead
3. **Optimization**: Less optimized kernels than WebLLM's custom MLC-LLM compilation
4. **Initialization**: Slightly longer initialization time due to ONNX Runtime setup

## Implementation Details

### Runtime Selection Justification
- **WebLLM Considered**: Higher performance when WebGPU available, but requires Chrome 113+/Edge 113+/Safari 26+ and has less graceful fallback
- **ONNX Runtime Web Considered**: More complex API, requires manual model preparation, less turnkey for LLMs
- **Transformers.js Chosen**: Best balance of compatibility, ease of use, model availability, and acceptable performance

### Model Selection Justification
- **Target Size**: <500MB download size to meet budget and ensure reasonable loading times
- **Candidate Models Evaluated**:
  - TinyLlama-1.1B-Chat-v1.0 (~250MB 4-bit) - Very small but weaker capabilities
  - Phi-2 (~1.6GB FP16 → ~400MB 4-bit) - Strong reasoning but older
  - Phi-3-mini-4k-instruct (~2.2GB FP16 → ~550MB 4-bit) - Strongest balance of size/quality
  - Gemma-2B (~1.8GB FP16 → ~450MB 4-bit) - Good alternative but slightly larger
- **Phi-3-mini Selected**: Best combination of instruction following, reasoning capabilities, and proven performance in browser benchmarks

### Configuration
```typescript
// Default model options
export const defaultModelOptions: ModelLoadingOptions = {
  modelId: 'microsoft/Phi-3-mini-4k-instruct-onnx', // HF Hub model ID
  useWebGPU: true,
  useWorker: true, // Off-main-thread inference via Web Worker
  modelOptions: {
    // Quantization settings for optimal quality/size balance
    dtype: {
      // Keep higher precision for sensitive components
      embed_tokens: 'q4',      // Embeddings
      lm_head: 'q4',           # Language model head
      // Default quantization for other layers
      default: 'q4'
    }
  }
};
```

### Fallback Strategy
1. **WebGPU Available**: Use WebGPU acceleration (primary path)
2. **WebGPU Unavailable but WebGL Available**: Fall back to WebGL backend
3. **Neither Available**: Fall back to WASM backend (universal but slower)
4. **Model Load Failure**: Display clear error message and suggest updating browser
5. **Insufficient Memory**: Graceful degradation with informative message

## When to Revisit
This decision should be revisited if:
1. Browser WebGPU support becomes universal enough to justify WebLLM-only approach
2. Significantly better models become available in the target size range
3. Performance measurements show inadequate speed for user experience
4. Licensing issues arise with selected components
5. New browser inference runtimes emerge with superior characteristics

## References
- Transformers.js Documentation: https://huggingface.co/docs/transformers.js/
- Phi-3 Model Card: https://huggingface.co/microsoft/Phi-3-mini-4k-instruct
- WebGPU Browser Support: https://caniuse.com/webgpu
- Hugging Face ONNX Models: https://huggingface.co/models?pipeline_tag=text-generation&library=onnx