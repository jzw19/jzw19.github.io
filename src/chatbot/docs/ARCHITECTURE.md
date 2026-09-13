# Portfolio Chatbot Architecture

## Overview
The portfolio chatbot is a client-side AI assistant that answers questions about Jimmy Wen's professional experience using only the information provided in his resume. It runs entirely in the visitor's browser with no backend or external API dependencies.

## System Components

### 1. Knowledge Base (`src/chatbot/knowledge/`)
- Structured representation of resume content as atomic facts
- Organized by category: experience, projects, skills, education
- Each fact is independently retrievable while preserving context
- Source: Only information explicitly stated in the resume

### 2. Retrieval System (`src/chatbot/retrieval/`)
- Deterministic, lightweight retrieval without vector databases
- Scores documents based on title/category/content matches
- Implements relevance threshold to prevent irrelevant results
- Returns explicit "no sufficiently relevant evidence" when threshold not met
- Includes technical term boosting for better domain matching

### 3. LLM Service (`src/chatbot/llm/`)
- **Current**: Mock LLM service for development and testing
- **Planned**: Browser-local inference using Transformers.js with Phi-3-mini-4k-instruct model
- Lazy loading: Model loads only when user initiates chat
- WebGPU acceleration with graceful fallback to WebGL/WASM
- Off-main-thread inference using Web Workers when available
- Model caching via IndexedDB for subsequent visits
- Progress tracking and error handling

### 4. Chatbot Service (`src/chatbot/chatbotService.ts`)
- Orchestrates retrieval-augmented generation pipeline
- Constructs grounded prompts with strict anti-hallucination instructions
- Maintains bounded conversation history (configurable turn limit)
- Enforces knowledge base as authoritative source of truth
- Handles unsupported questions with appropriate refusals

### 5. UI Components (`src/chatbot/components/`)
- Floating action button to initiate chat
- Expandable chat panel using MUI components
- Message display with user/assistant styling
- Input area with send button and Enter key support
- Loading and error states
- Responsive and accessible design

## Data Flow

1. **User Interaction**: User clicks chat button or types question
2. **Query Processing**: Question sent to chatbot service
3. **Retrieval**: Relevant knowledge base documents fetched using deterministic retrieval
4. **Evidence Check**: System determines if sufficient relevant evidence exists
5. **Prompt Construction**: 
   - System prompt with grounding instructions
   - Retrieved context (if sufficient evidence)
   - Conversation history (bounded)
   - User question
6. **LLM Generation**: 
   - Prompt sent to local LLM service
   - Model generates response based only on provided context
   - Streaming response if supported
7. **Response Delivery**: 
   - Response displayed in chat UI
   - Conversation history updated (bounded)
   - Ready for next interaction

## Grounding Mechanisms

### Knowledge Base as Source of Truth
- All professional facts derived exclusively from resume
- No pretrained knowledge used for resume-related questions
- Quantitative facts preserved as atomic, retrievable units

### Prompt Design
- Explicit instruction to use ONLY supplied context
- Prohibition against inventing or inferring unsupported facts
- Clear refusal protocol for unsupported questions
- Distinction between portfolio facts and reasonable interpretation

### Retrieval Threshold
- Minimum relevance score required to consider evidence sufficient
- Prevents irrelevant context from influencing generation
- Explicit "no sufficiently relevant evidence" fallback

### Conversation History Bounding
- History limited to configurable number of turns
- Prevents context dilution and user-fact poisoning
- History cannot override knowledge base facts

### Anti-Poisoning Measures
- Conversation history never overrides knowledge base
- System prompt reinforces grounding on every turn
- Evaluation includes adversarial testing for prompt injection

## Performance Characteristics

### Lazy Loading
- Chatbot code splits via React.lazy/Suspense
- Model loads only after user initiates chat
- Initial portfolio load unaffected

### Model Loading
- Progress visible during download/initialization
- Subsequent loads near-instant from cache
- Main thread not blocked during model operations

### Runtime Performance
- **Current**: Mock service provides immediate responses for development/testing
- **Planned**: WebGPU: 15-25 tokens/second (estimated)
- **Planned**: WebGL: 3-8 tokens/second (estimated)  
- **Planned**: WASM: 1-3 tokens/second (estimated, usable but slow)
- **Planned**: Time to first token: 1-3 seconds from cache
- **Planned**: Memory usage: 400-600MB peak

### Bundle Impact
- Chatbot code chunk: <50KB gzipped target
- Model assets: Lazy-loaded, not in initial bundle
- No impact on initial page load performance

## Browser Compatibility

### Supported Features
- WebGPU acceleration (Chrome 113+, Edge 113+, Safari 26+)
- WebGL fallback (broad browser support)
- WASM universal fallback (all modern browsers)
- IndexedDB caching for model persistence
- Web Workers for off-main-thread inference

### Graceful Degradation
- When WebGPU unavailable: Falls back to WebGL → WASM
- When model fails to load: Clear error message, portfolio remains usable
- When initialization fails: Chatbot disabled, no impact on portfolio
- No server-side fallback that creates recurring costs

## Security and Privacy

### Data Protection
- All processing occurs client-side
- No user questions or conversations leave the browser
- No external API calls or telemetry
- No storage of personal data beyond session

### Content Safety
- Knowledge base contains only publicly intended resume information
- No private contact details, credentials, or confidential information
- Model runs in sandboxed browser environment
- No ability to access local filesystem or peripherals

## Deployment

### GitHub Pages Compatibility
- Pure static site implementation
- No server components or dependencies
- Model assets hosted alongside other static assets
- Service worker compatibility maintained
- Standard CRA build and deploy process

### Asset Hosting
- Model files served from GitHub Pages
- Leverages browser caching and IndexedDB
- No special server configuration required
- Works from subdirectory (not assuming root domain)

## Maintenance

### Updating Knowledge Base
- Modify files in `src/chatbot/knowledge/`
- Follow existing TypeScript interfaces and structure
- Add/update/delete facts as needed
- Run tests to verify integrity

### Changing Models
- Update `defaultModelOptions` in `src/chatbot/llm/modelLoader.ts`
- Select new model from Hugging Face Hub (ONNX format)
- Update ADR-001 with justification
- Test performance and quality with evaluation set

### Running Tests
- `yarn test` - Runs all tests including chatbot-specific tests
- Individual test files in `src/chatbot/__tests__/`
- Covers knowledge base, retrieval, service, and integration

## Limitations

### Knowledge Scope
- Limited to information explicitly in resume
- Cannot answer questions requiring inference beyond resume
- No general knowledge or chat capabilities outside domain

### Performance Dependencies
- Actual speed depends on user's hardware/browser
- First load requires model download (mitigated by caching)
- WebGPU availability varies by device

### Language Support
- Primarily optimized for English questions
- Performance may degrade with other languages

### Context Window
- Bounded conversation history limits very long conversations
- Retrieval limited to top-K documents above threshold