# Browser LLM Feasibility Spike Test Harness

This directory contains a test harness for evaluating browser-local LLMs for the portfolio chatbot.
Due to the limitations of this environment, I cannot actually execute browser-based inference,
but I have prepared the test structure and documented expected results based on current research.

## Test Files Structure

```
chatbot-spike-test/
├── index.html              # Main test page
├── test-webllm.js          # WebLLM specific tests
├── test-transformers.js    # Transformers.js specific tests
├── test-onnxruntime.js     # ONNX Runtime Web specific tests
├── evaluation-questions.js # Common evaluation question set
├── benchmark-runner.js     # Test execution and metrics collection
└── README.md               # Instructions for running tests
```

## Test Approach

Since we cannot run actual browser benchmarks here, I will:
1. Document the test structure that would be used
2. Summarize expected results based on research from web search
3. Provide recommendations based on that research

## Expected Results Summary

Based on the web search conducted, here are the anticipated findings:

### WebLLM (MLC-LLM)
- **Strengths**:
  - Highest performance among browser LLMs when WebGPU available
  - Compiles model-specific kernels for optimal GPU utilization
  - 4-bit quantization support (q4f format)
  - Good balance of quality and speed
  - OpenAI-compatible API eases integration
  - Strong caching via IndexedDB after initial download
- **Weaknesses**:
  - Requires WebGPU (Chrome 113+, Edge 113+, Safari 26+)
  - Longer initial setup (shader compilation)
  - Limited to MLC-LLM formatted models
  - Less flexible backend fallback than Transformers.js
- **Typical Performance** (from research):
  - Llama 3.2 1B Q4: ~15-20 tok/s on WebGPU
  - Phi-3.5-mini: ~70 tok/s on WebGPU
  - Initial load: 200MB-850MB download + shader compilation
- **Model Size**: 400MB-850MB for 1B-3B models at 4-bit

### Transformers.js
- **Strengths**:
  - Broadest browser compatibility (WebGPU → WebGL → WASM fallback)
  - Familiar Hugging Face pipeline API
  - Access to vast Hugging Face model hub
  - Good documentation and community support
  - Automatic quantization handling
  - Works in all major browsers (including Firefox)
- **Weaknesses**:
  - Generally slower than WebLLM when WebGPU available
  - More overhead due to ONNX Runtime abstraction
  - Larger memory footprint for same model
  - Less optimized kernels than WebLLM's custom compilation
- **Typical Performance** (from research):
  - Similar models ~30-50% slower than WebLLM on WebGPU
  - Better fallback: degrades gracefully to WASM (~3-10x JS)
  - Model sizes similar to WebLLM for equivalent quantization
- **Browser Support**: Excellent (Chrome, Firefox, Safari, Edge)

### ONNX Runtime Web
- **Strengths**:
  - Mature, widely-used runtime
  - Good WebGPU/WebGL/WASM backend support
  - Lower-level control when needed
  - Strong enterprise adoption
- **Weaknesses**:
  - More complex API than WebLLM/Transformers.js
  - Requires manual model preparation/conversion
  - Less turnkey for LLMs specifically
  - Performance typically between WebLLM and Transformers.js
- **Browser Support**: Good, similar to Transformers.js

## Recommended Approach Based on Research

### Primary Recommendation: Transformers.js
**Why**:
1. **Browser Compatibility**: Works everywhere (including Firefox) with graceful fallback
2. **Ease of Integration**: Familiar pipeline API fits React patterns well
3. **Model Availability**: Access to thousands of pre-converted models on HF Hub
4. **Fallback Chain**: WebGPU → WebGL → WASM ensures baseline functionality
5. **Development Experience**: Good documentation, TypeScript support, active community
6. **Static Hosting**: Models hosted on HF Hub or can be self-hosted on GitHub Pages

### Model Recommendation: Phi-3-mini-4k-instruct (or similar)
**Why**:
1. **Size**: ~2.2GB FP16 → ~550MB 4-bit quantized
2. **Quality**: Strong instruction following, good for RAG/use-case specific tasks
3. **Training**: Microsoft's Phi series has strong reasoning capabilities
4. **Format**: Available ONNX converted via Hugging Face (e.g., microsoft/Phi-3-mini-4k-instruct-onnx)
5. **Alternative**: TinyLlama-1.1B-Chat-v1.0 (~250MB 4-bit) for even smaller footprint

## Estimated Metrics for Phi-3-mini 4-bit with Transformers.js

### Download Size
- Initial: ~550MB (first visit)
- Cached: Subsequent loads from IndexedDB/cache (near-instant)

### Initialization Time
- First load: 3-8 seconds (download + preparation)
- Warm load: <1 second (from cache)

### Runtime Performance
- WebGPU: ~15-25 tokens/second
- WebGL: ~3-8 tokens/second  
- WASM: ~1-3 tokens/second (usable but slow)

### Memory Usage
- Peak: ~600-800MB during inference
- Working set: Model size + KV cache + activations

### Quality Expectations
- Good at following instructions and sticking to context
- Capable of refusing unsupported questions when properly prompted
- Strong performance on extractive QA (facts from context)
- Lower hallucination rates when grounded properly with relevant context

## Implementation Recommendations

### Architecture
1. **Lazy Load**: Only load chatbot code when user initiates chat
2. **Model Loading**: Show progress during download/initialization
3. **Worker Pattern**: Consider Web Worker for off-main-thread inference (if supported)
4. **Fallback UI**: Clear messaging when WebGPU unavailable or model fails to load
5. **Caching**: Leverage browser cache/IndexedDB for model persistence

### Integration with React
1. Create `useLLM` hook that handles model lifecycle
2. Use React.Suspense for loading states
3. Implement error boundaries for graceful degradation
4. Utilize existing MUI components for consistent UX
5. Follow existing testing patterns with Jest + React Testing Library

### Evaluation Strategy
1. Create unit tests for retrieval and knowledge base
2. Create integration tests for chatbot service with mocked LLM
3. Create manual evaluation suite with the 15 question set
4. Test grounding behavior extensively
5. Test adversarial cases (prompt injection, fact poisoning)

## Next Steps for Actual Implementation

If this were to be executed in a proper browser environment, the steps would be:

1. Create a simple test page that loads each runtime
2. Download and initialize a small test model (e.g., TinyLlama 1.1B)
3. Run the evaluation question set through each
4. Measure TTFT, TPS, and memory usage
5. Assess response quality and refusal behavior
6. Document results and make selection

Based on the research conducted, Transformers.js with a Phi-3-family or TinyLlama model represents the best balance of compatibility, performance, quality, and ease of integration for this GitHub Pages-hosted portfolio chatbot.

The key insight is that browser compatibility and graceful degradation are more important than peak performance, since the portfolio must remain usable even when the chatbot cannot run at full speed.