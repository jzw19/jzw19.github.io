# Portfolio Chatbot Implementation Proposal - Revised

## Phase 0: Repository Inspection (Completed)

### Framework and Version
- **React**: 19.0.0 (from package.json)
- **TypeScript**: 5.8.3 (from package.json)
- **Build Tool**: Create React App (react-scripts 5.0.1)
- **Package Manager**: Yarn (yarn.lock present, scripts use yarn)
- **Styling**: MUI v6 (@mui/material: ^6.4.4, @mui/icons-material: ^6.4.4) with SCSS modules
- **Routing**: react-router-dom v7.2.0
- **State Management**: None apparent (no Redux/Zustand/etc. dependencies)
- **Testing**: Jest + React Testing Library (@testing-library/react: ^16.2.0)
- **Linting**: ESLint with react-app configuration
- **Deployment**: GitHub Pages via gh-pages (^6.3.0) with predeploy/build/deploy scripts
- **SEO**: react-helmet-async v3.0.0 already installed
- **PDF**: @react-pdf/renderer and react-pdf for resume viewing
- **Analytics**: web-vitals for performance monitoring

### Existing Application Structure
```
src/
├── App.tsx                 # Root component with ThemeProvider
├── index.tsx               # Entry point
├── Router.tsx              # Application routing
├── components/             # Shared reusable components
│   ├── NavBar/             # Navigation bar
│   ├── PageScrollButtons/  # Scroll navigation
│   ├── PageView/           # Page container
│   ├── SkeletonLoader/     # Loading states
│   └── SkipToContent/      # Accessibility helper
├── hooks/                  # Custom React hooks
│   ├── useAppBarHeight.ts
│   ├── useScrollPosition.ts
│   └── useWindowSize.ts
├── pages/                  # Page components
│   ├── About/
│   ├── Home/               # Landing page with skills/logos
│   ├── Projects/           # Project showcase
│   │   └── Markdown/       # Markdown rendering for projects
│   └── Resume/             # Resume viewing
├── assets/                 # Static assets (images, etc.)
├── App.scss                # Global styles
├── index.scss              # Global styles
├── index.d.ts              # TypeScript declarations
├── index.js                # JS entry point
├── reportWebVitals.js      # Performance monitoring
└── setupTests.js           # Test setup
```

### Styling/UI Conventions
- **Theme**: Dark mode via MUI ThemeProvider in App.tsx
- **Component Pattern**: Index barrels (components/X/index.tsx)
- **Styling Approach**: CSS modules (.scss files) + MUI sx prop/system
- **Icons**: MUI IconButton with @mui/icons-material
- **Layout**: Container-based with consistent spacing
- **Accessibility**: SkipToContent component implemented, ARIA labels on icons
- **Loading States**: Reusable SkeletonLoader component
- **Navigation**: Custom PageScrollButtons for anchor navigation

### Testing Setup
- **Framework**: Jest via react-scripts test
- **DOM**: @testing-library/jest-dom
- **User Events**: @testing-library/user-event
- **Configuration**: jest configuration in package.json (extends react-app/jest)
- **Test Files**: Likely *.test.tsx/.test.ts convention (not yet present in visible structure)
- **Coverage**: Not configured but standard CRA testing available

### CI/CD Configuration
- **Scripts**: 
  - `yarn start`: Development server
  - `yarn build`: Production build to `/build`
  - `yarn test`: Test runner
  - `yarn predeploy`: Runs build
  - `yarn deploy`: gh-pages -d build (deploys /build to GitHub Pages)
- **Configuration**: No explicit CI config (GitHub Actions) visible, relies on npm/yarn scripts
- **Branch**: main branch deployed to GitHub Pages (https://jzw19.github.io/)
- **Homepage**: package.json homepage field set to https://jzw19.github.io/

### Browser Support Assumptions
- **browserslist**: 
  - Production: >0.2%, not dead, not op_mini all
  - Development: last 1 Chrome/Firefox/Safari version
- **Target**: Modern browsers with ES6+ support
- **Polyfills**: Likely handled by react-scripts/Babel
- **Features**: Assumes fetch, Promise, etc. (standard for CRA)

### Reusable Dependencies/Utilities
- **MUI Components**: Rich component library available (Buttons, Cards, TextFields, etc.)
- **Custom Hooks**: Window size, scroll position, app bar height utilities
- **SkeletonLoader**: Reusable loading component
- **SkipToContent**: Accessibility navigation aid
- **react-helmet-async**: Already installed for dynamic meta tags
- **TypeScript**: Strict typing available
- **Testing Library**: Established testing patterns

### Natural Chatbot Integration Points
Based on existing architecture:

1. **Location Options**:
   - **Floating Action Button**: Consistent with MUI patterns, minimal intrusion
   - **Inline Section**: Could be added to Home or About page
   - **Modal/Dialog**: MUI Dialog component available
   - **Drawer**: MUI Slide/Drawer for side panel
   - **Dedicated Route**: New /chat route via react-router-dom

2. **Recommended Approach**: 
   - **Floating Action Button** in bottom-right corner
   - **Expandable Chat Panel** using MUI Paper/Drawer/Slide
   - **Reasons**:
     - Doesn't disrupt existing page layouts
     - Follows common UX pattern for chat widgets
     - Can be toggled open/closed
     - Minimal impact on initial page load
     - Consistent with modern web applications

3. **Integration Structure**:
   - Create `src/chatbot/` directory
   - Follow existing component patterns (index barrels, SCSS modules)
   - Reuse MUI components and styling conventions
   - Utilize existing hooks where applicable (window size for responsiveness)
   - Follow existing testing patterns

### Constraints Discovered
1. **Bundle Size Sensitivity**: Existing performance focus (code splitting, lazy loading)
2. **Static Site Requirement**: Must work with GitHub Pages (no server)
3. **No Backend Allowed**: Pure client-side implementation
4. **Performance Consciousness**: Existing optimizations show concern for metrics
5. **TypeScript Strictness**: Existing TS setup suggests preference for type safety
6. **Accessibility Focus**: SkipToContent and ARIA labels show a11y consideration
7. **SEO Awareness**: react-helmet-async already implemented
8. **Testing Culture**: Existing test setup indicates value on testability
9. **Bundle Analysis**: Previous source-map-explorer usage shows size consciousness
10. **Mobile Responsiveness**: Existing responsive design must be maintained

### Recommendations for Chatbot Location/Structure
1. **Directory**: `src/chatbot/` following existing patterns
2. **UI Pattern**: Floating button → expandable panel (MUI Fab + Dialog/Drawer)
3. **State Management**: React Context or custom hook (avoid over-engineering)
4. **Styling**: SCSS modules + MUI sx props to match existing conventions
5. **Testing**: Follow existing *.test.tsx pattern with React Testing Library
6. **Lazy Loading**: Use React.lazy/Suspense for chatbot code splitting
7. **Accessibility**: Ensure keyboard navigability, screen reader friendly, ARIA labels
8. **Performance**: Chatbot code/chunk should be small (<50KB gzipped target)
9. **Model Loading**: Must be lazy and non-blocking to initial page load
10. **Error Handling**: Graceful degradation when WebGPU/model unavailable

This completes Phase 0. The inspection reveals a well-structured, performance-conscious React application with established patterns that the chatbot implementation should follow.

## Next Step: Phase 1 - Browser LLM/Runtime Feasibility Spike

Before proceeding with implementation, I will now conduct Phase 1: investigating browser-local inference options suitable for a static GitHub Pages site.