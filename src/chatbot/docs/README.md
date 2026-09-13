# Portfolio Chatbot - Implementation Documentation

## Overview
This document provides an overview of the portfolio chatbot implementation, including how to run, test, deploy, and maintain the feature.

## Table of Contents
1. [Getting Started](#getting-started)
2. [Running Tests](#running-tests)
3. [Building for Production](#building-for-production)
4. [Deploying to GitHub Pages](#deploying-to-github-pages)
5. [Updating the Knowledge Base](#updating-the-knowledge-base)
6. [Changing the Model](#changing-the-model)
7. [Troubleshooting](#troubleshooting)
8. [Architecture Overview](#architecture-overview)

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- Yarn package manager
- Git

### Installation
The project dependencies are already installed. If you need to reinstall:
```bash
yarn install
```

### Development Server
```bash
yarn start
```
This will start the development server at http://localhost:3000

The chatbot will be available as a floating button in the bottom-right corner once the feature is implemented.

## Running Tests

### All Tests
```bash
yarn test
```

### Chatbot-Specific Tests
```bash
yarn test src/chatbot
```

### Test Coverage
```bash
yarn test --coverage
```

## Building for Production
```bash
yarn build
```
This creates an optimized production build in the `build` folder.

## Deploying to GitHub Pages
```bash
yarn deploy
```
This runs the build script and deploys the `build` folder to GitHub Pages.

## Updating the Knowledge Base

The knowledge base is located in `src/chatbot/knowledge/` and consists of TypeScript files organized by category:

- `experience.ts` - Work experience entries
- `projects.ts` - Project entries  
- `skills.ts` - Technical skills entries
- `education.ts` - Education entries
- `knowledgeBase.ts` - Unified export and helper functions

### Adding New Facts
1. Identify the appropriate category (experience, project, skill, education)
2. Add a new entry to the corresponding array following the existing format
3. Ensure each entry has:
   - Unique `id` string
   - Appropriate `category` value
   - Descriptive `title`
   - Factual `content` based only on the resume
   - Optional fields like `dateRange`, `technologies`, `impact`, `metrics` as appropriate

### Example Skill Entry
```typescript
{
  id: "skill-example",
  category: "skill" as const,
  title: "Example Skill",
  content: "Jimmy has experience with example skill from his work at [Company] where he [specific achievement].",
  experience: ["Company Name"] // Optional: which roles used this skill
}
```

### Validation
After updating the knowledge base, run the tests to ensure nothing is broken:
```bash
yarn test src/chatbot/__tests__/knowledgeBaseIntegration.test.ts
```

## Changing the Model

The model and runtime selection is documented in `ADR-001-model-runtime-selection.md`. To change the model:

1. Review the feasibility spike results in `PHASE_1_FEASIBILITY_SPIKE_RESULTS.md`
2. Select a new model from Hugging Face Hub that is:
   - Available in ONNX format
   - Appropriately sized (<1GB target, preferably much smaller)
   - Properly licensed for redistribution
   - Suitable for the chatbot's use case (instruction following, grounding ability)

3. Update `src/chatbot/llm/modelLoader.ts`:
   ```typescript
   export const defaultModelOptions: ModelLoadingOptions = {
     modelId: 'new-model-id-from-hf-hub', // Change this
     useWebGPU: true,
     useWorker: true,
     modelOptions: {
       // Adjust quantization/settings as needed for new model
     }
   };
   ```

4. Update the ADR if changing the model/runtime decision
5. Test the new model with the evaluation set

## Troubleshooting

### Common Issues

#### "Model failed to load" Error
1. Check browser console for specific error messages
2. Verify network connectivity to Hugging Face Hub (if loading from CDN)
3. Try clearing browser cache and IndexedDB storage for the site
4. Ensure browser supports required features (IndexedDB, etc.)

#### Chatbot Not Responding
1. Verify the chatbot service is initialized (`chatBotService.isReady()` returns true)
2. Check if model is loading (check progress indicator)
3. Look for errors in browser console
4. Ensure WebGPU/WebGL/WASM backend is available

#### Performance Issues
1. First load will be slower due to model download
2. Subsequent loads should be much faster from cache
3. Performance depends on user's hardware:
   - WebGPU: Best performance (modern GPUs)
   - WebGL: Moderate performance
   - WASM: Slowest but universal fallback
4. Consider reducing model size if performance is consistently poor

#### Deployment Issues
1. Verify `yarn build` succeeds locally
2. Check that all assets are properly referenced (no 404 errors)
3. Ensure GitHub Pages is configured to serve from the `build` folder
4. Check repository settings for GitHub Pages source

### Getting Help
1. Check the browser console for error messages
2. Review the test output for failing tests
3. Consult the architecture documentation in `src/chatbot/docs/`
4. Refer to the ADR for model/runtime decisions
5. Check the implementation plan for original requirements

## Architecture Overview

For detailed architecture information, see `src/chatbot/docs/ARCHITECTURE.md`.

### Key Components
1. **Knowledge Base**: Structured resume facts (`src/chatbot/knowledge/`)
2. **Retrieval**: Deterministic search with relevance threshold (`src/chatbot/retrieval/`)
3. **LLM Service**: Browser-local inference (`src/chatbot/llm/`)
4. **Chatbot Service**: Orchestrates RAG pipeline (`src/chatbot/chatbotService.ts`)
5. **UI Components**: Chat interface (`src/chatbot/components/`)

### Data Flow
```
User Question
        ↓
Retrieval (find relevant KB docs)
        ↓
Evidence Check (above threshold?)
        ↓
Prompt Construction (system + context + history + question)
        ↓
LLM Generation (local, context-only)
        ↓
Response (with optional source citations)
        ↓
UI Display
```

### Grounding Mechanisms
- Knowledge base as sole source of resume facts
- Strict system prompt prohibiting invention
- Relevance threshold preventing irrelevant context
- Bounded conversation history preventing poisoning
- Explicit "not available" responses for unsupported questions

## Future Enhancements
Potential future improvements (not implemented in initial version):
1. Source/citation display in UI
2. Advanced retrieval techniques (still client-side)
3. Model quantization experimentation
4. Enhanced caching strategies
5. Offline-first capabilities
6. Multi-language support
7. Voice input/output
8. Analytics (opt-in, privacy-preserving)

## License
This implementation is part of the personal portfolio website and follows the same usage terms as the rest of the site.

## Acknowledgments
- Built with Create React App, TypeScript, and MUI
- Browser inference powered by Transformers.js and Hugging Face
- Model: Phi-3-mini-4k-instruct (Microsoft)