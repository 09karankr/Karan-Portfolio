export type CaseStudy = {
  problem: string;
  approach: string[];
  outcomes: string[];
  learnings?: string;
};

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
  caseStudy?: CaseStudy;
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
    caseStudy: {
      problem:
        "Domain experts at the org couldn't answer questions across hundreds of internal docs without re-reading them. Generic LLMs hallucinated and lacked citations, making answers untrustworthy.",
      approach: [
        "Ingested 100+ documents and chunked them into ~512-token segments with overlap to preserve context across chunk boundaries.",
        "Generated dense embeddings using sentence-transformers and indexed them in FAISS for sub-second cosine-similarity search.",
        "Built a LangChain agent that decomposes a user query into sub-questions, retrieves top-k chunks per sub-question, and synthesizes a grounded answer with citations.",
        "Fine-tuned a HF transformer on internal QA pairs with LoRA adapters — 4-bit quantized base + adapter weights only — to keep training under 8 GB VRAM on a single GPU.",
        "Wrapped the pipeline with tool-calling so the LLM can invoke functions (e.g., date lookup, table query) instead of guessing structured data.",
      ],
      outcomes: [
        "Sub-second semantic retrieval over 100+ docs.",
        "~60% reduction in training memory footprint via LoRA.",
        "Every answer cites the source chunks, eliminating hallucination on questions inside the corpus.",
      ],
      learnings:
        "LoRA + 4-bit quantization is the right starting point when GPU is the bottleneck. Tool-calling beats prompting for anything structured (dates, IDs, calculations). FAISS is overkill for <10k chunks but cheap to start with.",
    },
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
    caseStudy: {
      problem:
        "Manual deployments to a Kubernetes cluster on AWS were error-prone, slow, and missed security checks. Each new microservice required engineers to repeat ~80% of the same setup.",
      approach: [
        "Codified the entire AWS substrate (VPC, EKS, IAM, S3) in Terraform — one apply provisions a fresh environment.",
        "Used Ansible for post-provisioning config (Jenkins, Nexus, SonarQube on a control-plane VM).",
        "Built a 10+ stage Jenkins pipeline: checkout → unit test → SonarQube → Maven build → Docker build → Trivy scan → Nexus push → Helm deploy to EKS → Prometheus scrape config update.",
        "Pinned every tool version and wrote pipeline-as-code in Jenkinsfile so onboarding a new service is a copy-paste of ~30 lines.",
        "Wired Prometheus + Grafana for app and pipeline metrics; alerts for failed deploys and stuck pods.",
      ],
      outcomes: [
        "Setup time for a new microservice cut by ~80%.",
        "Deployment effort reduced ~90% via pipeline automation.",
        "Trivy gate blocks images with critical CVEs from reaching prod.",
      ],
      learnings:
        "The Terraform + Ansible split is worth it: Terraform owns infra state, Ansible owns config drift. Putting security scanning early (pre-Nexus) means you don't waste artifacts you can't deploy. Helm is great for templating but resist the urge to template everything — keep app-specific values minimal.",
    },
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
