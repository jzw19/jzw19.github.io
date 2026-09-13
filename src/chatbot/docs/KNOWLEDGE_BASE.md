# Knowledge Base Documentation

This document describes the structure and content of the portfolio chatbot's knowledge base.

## Overview
The knowledge base contains structured, atomic facts derived exclusively from Jimmy Wen's resume. It is designed to be the authoritative source of truth for the chatbot, ensuring grounded responses and preventing hallucination of unsupported facts.

## Structure

The knowledge base is organized into five categories:

1. **Experience** - Work history and professional experience
2. **Projects** - Significant projects and initiatives
3. **Skills** - Technical skills and competencies
4. **Education** - Academic background and qualifications
5. **Achievement** - Awards, recognitions, and accomplishments (currently unused but reserved for future)

Each knowledge unit follows this TypeScript interface:

```typescript
interface KnowledgeDocument {
  id: string;              // Unique identifier
  title: string;           // Concise title/summary
  category: 'experience' | 'project' | 'skill' | 'education' | 'achievement';
  content: string;         // Detailed factual content
  dateRange?: string;      // For experience entries
  technologies?: string[]; // For skill/project entries
  impact?: string[];       // For project entries
  metrics?: string[];      // Quantitative measurements
  experience?: string[];   // For skills: which roles utilized this skill
}
```

## Design Principles

### Atomic Facts
Quantitative data and specific claims are separated into individually retrievable units. For example:
- "~300 internal users" (experiment platform user count)
- "~90% latency reduction" (performance improvement metric)
- "~270K rows" (data processing volume)
- "7M+ records" (database scale)
- "~83% manual QA reduction" (testing efficiency)
- "2 engineers mentored" (leadership metric)

This prevents the model from accidentally modifying or misrepresenting precise values.

### Context Preservation
While facts are atomic, related information is grouped to preserve contextual understanding. For instance, the experiment management platform fact includes:
- Purpose (A/B testing for advertising campaigns)
- Scale (300 internal users, 20-30 stakeholders)
- Impact (reduced backend reliance, accelerated turnaround)

### Source Tracking
Each fact retains its origin context, enabling potential citation/evidence display in the UI.

### No Invention
Only information explicitly stated in the resume is included. The knowledge base deliberately omits:
- Inferred career progression
- Assumed skill proficiency levels
- Unstated personal details
- Speculative future plans
- Information not in the original resume

## Content Sources

All facts originate from the resume sections:

### Professional Experience
- Madhive (Software Engineer, May 2022-Present)
- iCIMS (Software Engineer II, Feb 2021-May 2022)
- iCIMS (Software Engineer I, Jun 2019-Feb 2021)
- iCIMS (Software Development Intern, Jan 2019-May 2019)
- iCIMS (Test Engineering Intern, Jun-Aug 2018)
- WRKSHP Global (Jun 2016)

### Technical Skills
Organized by category with connections to specific experience where resume support exists:
- Frontend: JavaScript, TypeScript, React, Redux, HTML, CSS
- Backend/Data: Go, SQL, PostgreSQL, gRPC, REST APIs
- Cloud/Infrastructure: GCP, AWS, Docker, CI/CD, Terraform
- Testing: Playwright, Jest, Vitest, React Testing Library
- Data/Analytics: BigQuery, Looker, LookML
- Tools/Practices: Git, Postman, Agile, Scrum, Kanban, AI-assisted development

### Education
- Rutgers University, School of Engineering
- B.S. in Computer Engineering
- B.A. in Computer Science

## Maintenance Guidelines

### Adding New Facts
1. Verify the fact exists in the resume
2. Determine appropriate category
3. Create atomic, retrievable unit
4. Include relevant optional fields (dateRange, technologies, etc.)
5. Add to appropriate `.ts` file in `src/chatbot/knowledge/`
6. Export via knowledgeBase.ts
7. Run tests to ensure integrity

### Updating Existing Facts
1. Ensure changes remain resume-supported
2. Preserve atomic fact principle
3. Update relevant optional fields as needed
4. Verify tests still pass

### Removing Facts
1. Only if fact is determined to be inaccurate or not resume-supported
2. Remove from source file
3. Verify no broken references
4. Run tests

## Validation

The knowledge base includes automated tests that verify:
- All entries have required fields (id, title, category, content)
- Categories are valid
- No duplicate IDs
- Content is non-empty
- Structural integrity

Run knowledge base tests with:
```bash
yarn test src/chatbot/__tests__/knowledgeBaseIntegration.test.ts
```

## Example Entries

### Experience Entry
```typescript
{
  id: "madhive-performance-improvement",
  category: "experience" as const,
  title: "Data Export Performance Optimization",
  content: "Jimmy reduced data export latency by approximately 90%, from more than 10 seconds to approximately 1 second. The work involved processing approximately 270K rows and eliminating redundant object initialization.",
  dateRange: "May 2022 — Present",
  metrics: ["~90% latency reduction", "~10s → ~1s", "~270K rows processed"],
  impact: ["Reduced backend reliance", "Accelerated experiment turnaround"]
}
```

### Skill Entry
```typescript
{
  id: "skill-postgresql",
  category: "skill" as const,
  title: "PostgreSQL",
  content: "Jimmy has experience with PostgreSQL from his work at Madhive where he: partnered with backend engineers to evolve data models, diagnosed and resolved large-scale data update failures involving approximately 7M+ records using batched update workflows, and reduced data export latency by approximately 90% from more than 10 seconds to approximately 1 second processing approximately 270K rows.",
  experience: ["Madhive"]
}
```

### Project Entry
```typescript
{
  id: "data-export-optimization",
  category: "project" as const,
  title: "Data Export Latency Optimization",
  content: "Reduced data export latency by approximately 90%, from more than 10 seconds to approximately 1 second. Involved processing approximately 270K rows and eliminating redundant object initialization.",
  technologies: ["PostgreSQL", "SQL", "Batch processing"],
  metrics: ["~90% latency reduction", "~10s → ~1s", "~270K rows processed"]
}
```

This structure ensures the knowledge base remains a reliable, grounded foundation for the chatbot's responses while supporting future enhancements like source citation and advanced retrieval techniques.