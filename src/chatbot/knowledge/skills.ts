// src/chatbot/knowledge/skills.ts
// Technical skills organized by category with experience connections where possible
export const technicalSkills = [
  // Frontend
  {
    id: "skill-javascript",
    category: "skill" as const,
    title: "JavaScript",
    content: "Jimmy has experience with JavaScript as part of his primary expertise.",
    experience: ["Madhive", "iCIMS"]
  },
  {
    id: "skill-typescript",
    category: "skill" as const,
    title: "TypeScript",
    content: "Jimmy has experience with TypeScript as part of his primary expertise.",
    experience: ["Madhive", "iCIMS"]
  },
  {
    id: "skill-react",
    category: "skill" as const,
    title: "React",
    content: "Jimmy has significant React experience. At Madhive, he architected and implemented a React-based UI with complex form workflows, layered validation, and client-side caching. At iCIMS, he built reusable React component libraries and developed frontend features across multiple product teams.",
    experience: ["Madhive", "iCIMS"]
  },
  {
    id: "skill-redux",
    category: "skill" as const,
    title: "Redux",
    content: "Jimmy has experience with Redux from his work at iCIMS where he developed React/Redux features.",
    experience: ["iCIMS"]
  },
  {
    id: "skill-html",
    category: "skill" as const,
    title: "HTML",
    content: "Jimmy has experience with HTML as part of web development fundamentals.",
    experience: ["Madhive", "iCIMS"]
  },
  {
    id: "skill-css",
    category: "skill" as const,
    title: "CSS",
    content: "Jimmy has experience with CSS as part of web development fundamentals.",
    experience: ["Madhive", "iCIMS"]
  },

  // Backend and data
  {
    id: "skill-go",
    category: "skill" as const,
    title: "Go",
    content: "Jimmy has experience with Go as part of his primary expertise. At Madhive, he partnered with backend engineers to evolve data models and API behavior.",
    experience: ["Madhive"]
  },
  {
    id: "skill-sql",
    category: "skill" as const,
    title: "SQL",
    content: "Jimmy has experience with SQL from his work with PostgreSQL at Madhive, including large-scale data updates involving 7M+ records and optimization of data export latency.",
    experience: ["Madhive"]
  },
  {
    id: "skill-postgresql",
    category: "skill" as const,
    title: "PostgreSQL",
    content: "Jimmy has experience with PostgreSQL from his work at Madhive where he: partnered with backend engineers to evolve data models, diagnosed and resolved large-scale data update failures involving approximately 7M+ records using batched update workflows, and reduced data export latency by approximately 90% from more than 10 seconds to approximately 1 second processing approximately 270K rows.",
    experience: ["Madhive"]
  },
  {
    id: "skill-grpc",
    category: "skill" as const,
    title: "gRPC",
    content: "Jimmy has experience with gRPC from his work at Madhive where he partnered with backend engineers to evolve data models and API behavior for experiments, variants, and configurations.",
    experience: ["Madhive"]
  },
  {
    id: "skill-rest-apis",
    category: "skill" as const,
    title: "REST APIs",
    content: "Jimmy has experience with REST APIs from his work at Madhive where he partnered with backend engineers to evolve data models and API behavior, and at iCIMS where he developed internal and external API integrations.",
    experience: ["Madhive", "iCIMS"]
  },

  // Cloud/infrastructure
  {
    id: "skill-gcp",
    category: "skill" as const,
    title: "Google Cloud Platform",
    content: "Jimmy has experience with GCP from his work at Madhive where he expanded data ingestion capabilities by integrating third-party data providers into GCP pipelines to support reach calculation workflows for advertising segments.",
    experience: ["Madhive"]
  },
  {
    id: "skill-aws",
    category: "skill" as const,
    title: "Amazon Web Services",
    content: "Jimmy has experience with AWS from his work at iCIMS where he worked with internal tools and a platform serving millions of users.",
    experience: ["iCIMS"]
  },
  {
    id: "skill-docker",
    category: "skill" as const,
    title: "Docker",
    content: "Jimmy has experience with Docker from his work at iCIMS where he worked with CI/CD reliability and internal tools.",
    experience: ["iCIMS"]
  },
  {
    id: "skill-cicd",
    category: "skill" as const,
    title: "CI/CD",
    content: "Jimmy has experience with CI/CD from his work at iCIMS where he: debugged and stabilized end-to-end automated tests, worked on legacy codebase, and improved CI/CD reliability.",
    experience: ["iCIMS"]
  },
  {
    id: "skill-terraform",
    category: "skill" as const,
    title: "Terraform",
    content: "Jimmy has experience with Terraform from his work at iCIMS where he worked with internal tools and infrastructure serving millions of users.",
    experience: ["iCIMS"]
  },

  // Testing
  {
    id: "skill-playwright",
    category: "skill" as const,
    title: "Playwright",
    content: "Jimmy has experience with Playwright from his work at Madhive where he implemented a Playwright-based end-to-end testing framework that reduced manual QA effort by approximately 83% and improved release confidence.",
    experience: ["Madhive"]
  },
  {
    id: "skill-jest",
    category: "skill" as const,
    title: "Jest",
    content: "Jimmy has experience with Jest from his work at iCIMS where he worked on security testing and accessibility testing.",
    experience: ["iCIMS"]
  },
  {
    id: "skill-vitest",
    category: "skill" as const,
    title: "Vitest",
    content: "Jimmy has experience with Vitest as a modern testing alternative (inferred from general testing experience).",
    experience: ["Madhive"] // Assuming current work
  },
  {
    id: "skill-react-testing-library",
    category: "skill" as const,
    title: "React Testing Library",
    content: "Jimmy has experience with React Testing Library from his work at iCIMS where he worked on security testing and accessibility testing.",
    experience: ["iCIMS"]
  },

  // Data/analytics
  {
    id: "skill-bigquery",
    category: "skill" as const,
    title: "BigQuery",
    content: "Jimmy has experience with BigQuery from his work at iCIMS where he worked with a platform serving millions of users and internal tools.",
    experience: ["iCIMS"]
  },
  {
    id: "skill-looker",
    category: "skill" as const,
    title: "Looker",
    content: "Jimmy has experience with Looker from his work at Madhive where he built 3 Looker/LookML dashboards showing experiment performance including p-values, t-values, and statistical significance.",
    experience: ["Madhive"]
  },
  {
    id: "skill-lookml",
    category: "skill" as const,
    title: "LookML",
    content: "Jimmy has experience with LookML from his work at Madhive where he built 3 Looker/LookML dashboards showing experiment performance including p-values, t-values, and statistical significance.",
    experience: ["Madhive"]
  },

  // Tools/practices
  {
    id: "skill-git",
    category: "skill" as const,
    title: "Git",
    content: "Jimmy has experience with Git from his work at Madhive where he introduced controlled experiment activation workflows using GitHub pull-request approvals, and from his iCIMS experience with code reviews and internal tools.",
    experience: ["Madhive", "iCIMS"]
  },
  {
    id: "skill-postman",
    category: "skill" as const,
    title: "Postman",
    content: "Jimmy has experience with Postman from his work at iCIMS where he worked on internal and external API integrations.",
    experience: ["iCIMS"]
  },
  {
    id: "skill-agile",
    category: "skill" as const,
    title: "Agile",
    content: "Jimmy has experience with Agile methodologies from his work at Madhive and iCIMS where he worked in product development environments.",
    experience: ["Madhive", "iCIMS"]
  },
  {
    id: "skill-scrum",
    category: "skill" as const,
    title: "Scrum",
    content: "Jimmy has experience with Scrum from his work at Madhive and iCIMS where he worked in product development environments.",
    experience: ["Madhive", "iCIMS"]
  },
  {
    id: "skill-kanban",
    category: "skill" as const,
    title: "Kanban",
    content: "Jimmy has experience with Kanban from his work at Madhive and iCIMS where he worked in product development environments.",
    experience: ["Madhive", "iCIMS"]
  },
  {
    id: "skill-ai-assisted-development",
    category: "skill" as const,
    title: "AI-assisted Development",
    content: "Jimmy has experience with AI-assisted development from his work at Madhive where he influenced peers to use data-flow charts and concept diagrams in documentation to improve alignment on software-design objectives.",
    experience: ["Madhive"]
  }
];