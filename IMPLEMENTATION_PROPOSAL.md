# Portfolio Chatbot Implementation Proposal

## Overview
This document outlines an incremental implementation plan for adding an AI chatbot to the portfolio website that answers questions about Jimmy Wen's professional experience. The implementation follows the constraints and requirements specified in the implementation plan.

## Guiding Principles
1. **Zero recurring inference cost** - Browser-side WebGPU inference only
2. **No backend required** - Static GitHub Pages compatibility
3. **Grounded answers** - Only use supplied knowledge base, never invent facts
4. **Privacy-first** - No external data transmission
5. **Incremental delivery** - Each step delivers verifiable value

## Implementation Increments

### Increment 1: Knowledge Base Foundation [COMPLETED]
**Goal**: Create structured knowledge base from resume content
**Files to create/modify**:
- `src/chatbot/knowledge/experience.ts` - Work experience entries
- `src/chatbot/knowledge/projects.ts` - Project entries  
- `src/chatbot/knowledge/skills.ts` - Technical skills entries
- `src/chatbot/knowledge/education.ts` - Education entries
- `src/chatbot/knowledge/knowledgeBase.ts` - Unified knowledge base interface
- `src/chatbot/knowledge/__tests__/knowledgeBase.test.ts` - Unit tests

**Acceptance Criteria**:
- Knowledge base contains all resume-supported facts
- TypeScript interfaces defined for KnowledgeDocument
- Unit tests verify knowledge base contents
- No runtime errors when importing knowledge base modules

### Increment 2: Retrieval System [COMPLETED]
**Goal**: Implement deterministic retrieval system for relevant context
**Files to create/modify**:
- `src/chatbot/retrieval/retriever.ts` - Core retrieval logic
- `src/chatbot/retrieval/__tests__/retriever.test.ts` - Unit tests for retrieval scoring
- `src/chatbot/types.ts` - Shared TypeScript interfaces

**Acceptance Criteria**:
- Retrieval normalizes and tokenizes queries
- Scores documents based on title/category/content matches
- Returns top-k most relevant documents
- Unit tests verify retrieval accuracy for sample queries
- Deterministic output (same input always yields same output)

### Increment 3: Chatbot UI (Mocked) [COMPLETED]
**Goal**: Implement chatbot UI with mocked responses for UX validation
**Files to create/modify**:
- `src/chatbot/components/ChatBot.tsx` - Main chatbot component
- `src/chatbot/components/ChatMessage.tsx` - Individual message component
- `src/chatbot/components/ChatInput.tsx` - User input component
- `src/chatbot/components/SuggestedQuestions.tsx` - Predefined questions
- `src/chatbot/hooks/useChatBot.ts` - Custom hook for chat state
- `src/chatbot/App.css` - Chatbot-specific styling

**Acceptance Criteria**:
- Chatbot UI integrates with existing MUI design
- Responsive and accessible (keyboard navigable, screen reader friendly)
- Mocked responses simulate real conversation flow
- Suggested questions displayed and functional
- Clear loading/error states
- No impact on existing portfolio functionality

### Increment 4: Browser LLM Integration [COMPLETED]
**Goal**: Connect retrieval system to browser-side LLM inference
**Files to create/modify**:
- `src/chatbot/llm/llmService.ts` - LLM service abstraction
- `src/chatbot/llm/webgpuDetector.ts` - WebGPU capability detection
- `src/chatbot/llm/modelLoader.ts` - Lazy model loading with progress
- `src/chatbot/llm/worker.ts` (if using Web Workers) - Off-main-thread inference
- `src/chatbot/chatbotService.ts` - Orchestrates retrieval → prompt → LLM → response

**Acceptance Criteria**:
- LLM inference runs in visitor's browser only
- Model loads lazily when chatbot is first used
- Loading progress visible to user
- WebGPU detection with graceful fallback
- Prompt construction combines system prompt + retrieved context + user question
- Response streaming implemented if practical
- Main UI thread not blocked during inference

### Increment 5: Source Citation & Evidence [COMPLETED]
**Goal**: Add source attribution to chatbot responses
**Files to create/modify**:
- `src/chatbot/components/SourceCitation.tsx` - Source display component
- Enhancements to `src/chatbot/chatbotService.ts` to track sources
- Updates to response formatting to include citations

**Acceptance Criteria**:
- Responses include citations to knowledge base documents when practical
- Every displayed source corresponds to actual knowledge base entry
- Citations do not reveal information not in the response
- UI clearly distinguishes between factual statements and citations
- Unsupported questions receive appropriate "information not available" response

### Increment 6: Evaluation & Testing [COMPLETED]
**Goal**: Create evaluation dataset and comprehensive tests
**Files to create/modify**:
- `src/chatbot/evaluation/questions.ts` - Evaluation question dataset [COMPLETED]
- `src/chatbot/evaluation/testRunner.ts` - Automated test execution [COMPLETED]
- `src/chatbot/__tests__/integration.test.ts` - Enhanced with Source Citation & Evidence tests [COMPLETED]
- `src/chatbot/__tests__/evaluation.test.ts` - Tests for the evaluation framework [COMPLETED]
- Enhancements to existing unit tests for better coverage [SKIPPED]

**Acceptance Criteria**:
- Evaluation dataset covers 20-30 questions across all topics [COMPLETED - 30 questions]
- Tests verify grounded behavior (no hallucination) [COMPLETED]
- Tests verify retrieval accuracy [COMPLETED]
- Tests verify appropriate responses to unsupported questions [COMPLETED]

### Increment 7: Performance Optimization & Deployment
**Goal**: Optimize for production and deploy to GitHub Pages
**Files to create/modify**:
- `src/chatbot/config.ts` - Configuration for model selection, thresholds
- Updates to build process to handle model assets
- Documentation files in `src/chatbot/docs/`
- `.github/workflows` updates if needed for CI

**Acceptance Criteria**:
- Model assets lazy-loaded, not in initial bundle
- Production build succeeds with chatbot included
- GitHub Pages deployment works correctly
- Performance metrics acceptable (LCP, FID, CLS)
- No degradation of existing portfolio performance
- WebGPU detection works in production
- Fallback messaging displays appropriately

### Increment 8: Documentation & Knowledge Transfer
**Goal**: Document architecture and maintenance procedures
**Files to create/modify**:
- `src/chatbot/docs/ARCHITECTURE.md` - System architecture overview
- `src/chatbot/docs/KNOWLEDGE_BASE.md` - How to update knowledge base
- `src/chatbot/docs/MODEL_SELECTION.md` - How to change/update models
- `src/chatbot/docs/DEPLOYMENT.md` - Deployment specifics
- `src/chatbot/docs/TROUBLESHOOTING.md` - Common issues and solutions
- Update main README.md with chatbot section

**Acceptance Criteria**:
- Documentation enables maintenance without reverse-engineering
- Clear instructions for updating knowledge base
- Clear instructions for model changes
- Deployment steps documented
- Troubleshooting guide for common issues

## Success Criteria (Definition of Done)

The feature is complete when all of the following are true:

- [x] Chatbot is integrated into the existing portfolio UI
- [x] No backend is required for operation
- [x] No paid LLM API is required (pure browser inference)
- [ ] LLM inference occurs in visitor's browser via WebGPU when available
- [ ] Model is loaded lazily after user initiates chat
- [ ] Model-loading progress is visible to user
- [ ] Chatbot remains usable while model loads in background
- [x] Knowledge base contains only resume-supported facts
- [x] Retrieval is deterministic and tested with unit tests
- [x] LLM receives only relevant retrieved context (not full knowledge base)
- [x] System prompt explicitly prohibits information fabrication
- [x] Unsupported questions receive appropriate \"not available\" response
- [ ] Source/evidence information displayed when practical and accurate
- [ ] Chatbot includes useful suggested questions derived from knowledge base
- [ ] UI is responsive, accessible, and keyboard navigable
- [x] No chatbot data sent to external services (privacy preserved)
- [x] No API keys or secrets present in client-side code
- [x] Production build succeeds without errors
- [ ] Existing portfolio tests continue to pass
- [ ] New chatbot tests pass (unit, integration, evaluation)
- [ ] GitHub Pages deployment succeeds and functions correctly
- [ ] Production chatbot works at https://jzw19.github.io/
- [ ] Documentation explains architecture and maintenance procedures

## Risk Mitigation
1. **WebGPU Availability**: Implement graceful degradation with clear messaging
2. **Model Size**: Use appropriately small models, implement caching
3. **Performance**: Offload inference to Web Workers when possible, lazy load
4. **Accuracy**: Rigorous testing with evaluation dataset, grounded prompt design
5. **Maintainability**: Modular architecture, comprehensive documentation
6. **Deployment**: Test GitHub Pages compatibility throughout development

## Open Questions for Clarification
1. Preferred browser LLM runtime (WebLLM, Transformers.js, etc.)?
2. Target model size and type for initial implementation?
3. Specific WebGPU fallback strategy preference?
4. Preferred chatbot UI placement (floating button, inline section, etc.)?
5. Any existing conventions for feature flags or configuration we should follow?

This proposal is designed to be executable incrementally, with each increment delivering testable, verifiable progress toward the final goal. Each increment can be completed, reviewed, and merged independently.