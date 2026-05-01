export type Project = {
  slug: string;
  title: string;
  period: string;
  stack: string[];
  summary: string;
  bullets: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "ai-rag-assistant",
    title: "AI RAG Assistant with PyTorch and LangChain",
    period: "Mar 2026 — Apr 2026",
    stack: ["Python", "PyTorch", "LangChain", "Hugging Face", "FAISS", "OpenAI API"],
    summary:
      "Retrieval-Augmented Generation chatbot with sub-second semantic search and citation-backed answers.",
    bullets: [
      "Built a Retrieval-Augmented Generation (RAG) chatbot ingesting 100+ documents, using sentence-transformer embeddings and FAISS vector search for sub-second semantic retrieval and citation-backed answers.",
      "Fine-tuned a Hugging Face transformer on domain QA pairs using PyTorch with LoRA adapters, reducing training memory footprint by ~60% on a single GPU.",
      "Orchestrated multi-step LLM workflows using LangChain agents and tool-calling, enabling structured query decomposition, function execution, and grounded responses via the OpenAI API.",
    ],
    featured: true,
  },
  {
    slug: "devops-cicd-pipeline",
    title: "DevOps Ultimate CI/CD Pipeline on AWS",
    period: "Sep 2025 — Oct 2025",
    stack: ["AWS", "Jenkins", "Docker", "Kubernetes", "Terraform", "Ansible"],
    summary:
      "End-to-end CI/CD pipeline on AWS automating build, test, security scans, and Kubernetes deployments.",
    bullets: [
      "Built an AWS-based CI/CD pipeline automating build, test, security scans, and Kubernetes deployments for containerized microservices.",
      "Configured a 10+ stage Jenkins pipeline integrating GitHub, Maven, SonarQube, Nexus, Docker, and Kubernetes; provisioned infrastructure with Terraform and Ansible, reducing setup time by ~80%.",
      "Implemented Trivy container security scanning and Prometheus-Grafana monitoring, achieving a 90% reduction in deployment effort.",
    ],
    featured: true,
  },
  {
    slug: "course-management-platform",
    title: "Full-Stack Course Management Platform",
    period: "Jul 2024 — Aug 2024",
    stack: ["Node.js", "Express", "MongoDB", "JWT", "Zod"],
    summary:
      "REST-API-driven course platform with role-based auth and validated input flows.",
    bullets: [
      "Built 10+ REST APIs for signup/signin and course CRUD with modular routing and Zod-based input validation, supporting Admin and User flows end-to-end.",
      "Implemented JWT authentication and bcrypt password hashing, securing user credentials and role-based access across all protected endpoints.",
    ],
  },
  {
    slug: "video-conferencing",
    title: "Video Conferencing Application",
    period: "Dec 2023 — Jan 2024",
    stack: ["React", "TypeScript", "Node.js", "Express", "WebRTC", "Socket.io"],
    summary:
      "Real-time, room-based video calls with low-latency peer-to-peer streaming.",
    bullets: [
      "Built a real-time video conferencing app with low-latency peer-to-peer audio/video streaming over WebRTC and a room-based architecture supporting multi-user meetings.",
      "Integrated real-time chat and join/leave notifications via Socket.io to improve meeting collaboration.",
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
