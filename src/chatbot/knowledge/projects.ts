// src/chatbot/knowledge/projects.ts
// Notable projects mentioned in resume
export const notableProjects = [
  {
    id: "experiment-management-platform",
    category: "project" as const,
    title: "Experiment Management Platform",
    content: "Internal experiment management platform used by approximately 300 internal users with 20-30 active stakeholders. Allows users to configure and run A/B tests on advertising campaign line items. Reduced reliance on backend engineers and accelerated experiment turnaround.",
    technologies: ["React", "Go", "PostgreSQL", "REST", "gRPC"],
    impact: ["Reduced backend reliance", "Accelerated experiment turnaround"]
  },
  {
    id: "data-export-optimization",
    category: "project" as const,
    title: "Data Export Latency Optimization",
    content: "Reduced data export latency by approximately 90%, from more than 10 seconds to approximately 1 second. Involved processing approximately 270K rows and eliminating redundant object initialization.",
    technologies: ["PostgreSQL", "SQL", "Batch processing"],
    metrics: ["~90% latency reduction", "~10s → ~1s", "~270K rows processed"]
  },
  {
    id: "playwright-testing-framework",
    category: "project" as const,
    title: "Playwright End-to-End Testing Framework",
    content: "Implemented a Playwright-based end-to-end testing framework that reduced manual QA effort by approximately 83% and improved release confidence.",
    technologies: ["Playwright", "JavaScript/TypeScript"],
    metrics: ["~83% QA reduction", "Improved release confidence"]
  },
  {
    id: "postgresql-batched-updates",
    category: "project" as const,
    title: "PostgreSQL Batched Update Workflows",
    content: "Diagnosed and resolved large-scale data update failures in PostgreSQL system involving approximately 7M+ records using batched update workflows via scheduled queries. Mitigated concurrency conflicts and cascading trigger issues.",
    technologies: ["PostgreSQL", "SQL", "Scheduled queries"],
    metrics: ["~7M+ records", "Resolved concurrency conflicts", "Prevented cascading trigger issues"]
  },
  {
    id: "gcp-data-ingestion",
    category: "project" as const,
    title: "GCP Third-party Data Ingestion",
    content: "Expanded data ingestion capabilities by integrating third-party data providers into GCP pipelines. Supported reach calculation workflows for advertising segments.",
    technologies: ["GCP", "Data pipelines", "Third-party APIs"],
    impact: ["Supported reach calculation workflows"]
  },
  {
    id: "analytics-dashboards",
    category: "project" as const,
    title: "Looker/LookML Experiment Performance Dashboards",
    content: "Built 3 Looker/LookML dashboards showing experiment performance including p-values, t-values, and statistical significance. Improved visibility and supported more informed decision-making.",
    technologies: ["Looker", "LookML", "SQL"],
    metrics: ["3 dashboards", "p-values, t-values, statistical significance tracking"]
  },
  {
    id: "controlled-activation-workflows",
    category: "project" as const,
    title: "GitHub Pull-request Controlled Activation",
    content: "Introduced controlled experiment activation workflows using GitHub pull-request approvals to mitigate risk for changes affecting live client campaigns.",
    technologies: ["GitHub", "CI/CD", "Workflow automation"],
    impact: ["Risk mitigation for live campaigns", "Controlled activation process"]
  }
];