export const profile = {
  name: "Karan Kumar",
  role: "Software Engineer",
  company: "Capgemini",
  location: "India",
  email: "officialkaran39@gmail.com",
  phone: "+91 7903214466",
  github: "https://github.com/09karankr",
  linkedin: "https://linkedin.com/in/karan-kumar-122787226",

  tagline:
    "Software Engineer building cloud-native systems and AI-powered products.",

  // First-person hero prose. The {company} placeholder is replaced with an inline
  // pill in the Hero component.
  intro:
    "I'm Karan, a software engineer at {company} based in India. I work across the stack — cloud and CI/CD on weekdays, AI/ML on weekends. I love shipping end-to-end and writing about what I learn.",

  companyUrl: "https://www.capgemini.com",
  companyColor: "#0070AD",

  summary:
    "Software Engineer at Capgemini with hands-on experience in GCP, Docker, Kubernetes, and full-stack JavaScript/TypeScript. Currently learning the modern AI/ML stack — PyTorch, Hugging Face, LangChain, and RAG-based LLM applications. Strong CS fundamentals with 400+ DSA problems solved on CodeChef and LeetCode.",

  skills: {
    Languages: ["Python", "Java", "C++", "JavaScript", "TypeScript", "SQL"],
    "AI / ML": [
      "PyTorch",
      "Hugging Face",
      "LangChain",
      "RAG",
      "FAISS",
      "OpenAI API",
      "Pandas",
      "NumPy",
      "Prompt Engineering",
    ],
    Web: ["React.js", "Next.js", "Node.js", "Express.js", "REST APIs"],
    Cloud: ["AWS", "GCP", "GCS", "BigQuery"],
    DevOps: [
      "Docker",
      "Kubernetes",
      "Jenkins",
      "Terraform",
      "Ansible",
      "Prometheus",
      "Grafana",
      "CI/CD",
    ],
    Databases: ["MySQL", "BigQuery"],
    Tools: ["Git", "GitHub", "Linux", "VS Code"],
  } as Record<string, string[]>,

  experience: [
    {
      company: "Capgemini",
      role: "Software Engineer",
      period: "Sep 2025 — Present",
      bullets: [
        "Deploy and manage scalable containerized applications on GCP, leveraging GCS buckets for structured and unstructured data storage across services.",
        "Built backend-centric Next.js services using SSR and API routes, integrating SQL and BigQuery to process large-scale datasets and improve API response latency by ~30%.",
        "Containerized applications with Docker, enabling consistent deployments and smoother release workflows across environments.",
      ],
    },
    {
      company: "Capgemini",
      role: "SDE Intern",
      period: "May 2025 — Jul 2025",
      bullets: [
        "Completed 8+ weeks of structured Core Java training, applying OOP, collections, and exception handling in 2+ mini-projects.",
        "Designed CI/CD pipelines using Git, Jenkins, and Docker, automating build and deployment for 3+ services and integrating Java, Python, and DevOps tools.",
      ],
    },
  ],

  education: {
    degree: "B.Tech, Computer Science",
    school: "Technocrats Institute of Technology, Bhopal",
    period: "Oct 2021 — May 2025",
    cgpa: "9.05 / 10",
  },

  certifications: [
    "AWS Certified Cloud Practitioner (CCP)",
    "GitHub Foundations Certification",
    "Docker Hands-On: Containerization Fundamentals",
  ],

  // Used by the Stats widget. Set to null to hide a service.
  stats: {
    githubUsername: "09karankr",
    leetcodeUsername: "09_Karan" as string | null, // set to your LeetCode handle, or null to hide
    codechefUsername: "karan_4466" as string | null, // CodeChef handle
    gfgUsername:"karan_09" , // GeeksforGeeks handle — set yours, e.g. "karan_kumar"
    dsaProblemsSolved: "400+",
  },

  // Used by the /now page. Edit freely as your focus changes.
  // (See https://nownownow.com for the convention.)
  now: {
    updatedAt: "2026-06-01T00:00:00Z", // RFC3339 format — required
    workingOn: [
      "Enhancing next js backend services with SQL and BigQuery for efficient data processing and improved API response latency.",
      "Also working on bug fixes and performance optimizations for existing services, leveraging my full-stack JS/TS skills and cloud experience.",
      "",
    ],
    learning: [
      "PyTorch fundamentals — tensors, autograd, training loops, testing loops, forward and backward passes, backpropagation, optimizers, and more.",
      "Classification Neural Networks (CNNs) and transformer architectures for NLP tasks, setting up loss functions and optimization strategies.",
      "Convolutional Neural Networks (CNNs), Data Loaders, confusion matrices, and evaluation metrics for image classification tasks.",
      "Custom datasets, imagefolder structure, Data augmentation with torchvision.",
      "Pytorch transfer learning",
      "Transformer architecture, attention mechanisms, embeddings, encoders, decoders etc",
      "LangChain agents and tool-calling patterns",
      "Retrieval-Augmented Generation (RAG) pipelines with vector databases like FAISS",
      "Also learning about prompt engineering best practices, few-shot prompting, and evaluation techniques for LLM applications.",
      "Continuing to deepen my understanding of cloud-native architectures, containerization with Docker, and orchestration with Kubernetes.",
      "Exploring Terraform for infrastructure as code and Jenkins for CI/CD automation to streamline development workflows.",
      "Autoscaling groups and load balancing strategies on AWS and GCP to optimize application performance and cost-efficiency.",
      "AWS ERC, ECS and container orchestration patterns for scalable deployments.",
      "Monitoring and new relic for observability and performance optimization of cloud applications.",
      "prometheus and grafana for monitoring and alerting in cloud environments.",
      "Kubernetes concepts like namespaces, deployments, services, and ingress controllers for managing containerized applications at scale.",
    ],
    reading: [
      // Add books or papers here as you finish them
    ],
    location: "India",
  },

  // Used by the /reading page — what I've been learning, course/book/paper-style.
  // Edit freely. `status: "completed" | "in-progress" | "queued"`.
  reading: {
    courses: [
      {
        title: "Docker & Kubernetes — The Complete Guide",
        source: "Udemy",
        status: "completed",
        note: "Foundations of containerization, multi-container apps, k8s on AWS.",
      },
     
     
      {
        title: "100xDevs — Cohort 2.0",
        source: "Harkirat Singh",
        status: "in-progress",
        note: "Full-stack JS/TS deep-dive — React, Node, MongoDB, system design, DevOps.",
      },
     
      {
        title: "PyTorch",
        source: "Official tutorials + udemy courses",
        status: "in-progress",
        note: "Tensors, autograd, training loops, LoRA fine-tuning, transformers and many more.",
      },
      
    ] as ReadingItem[],

    papers: [
      // Add seminal papers here as you read them.
      // Examples to seed when ready: "Attention Is All You Need", "LoRA: Low-Rank Adaptation",
      // "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks".
    ] as ReadingItem[],

    books: [
      // Add books here.
    ] as ReadingItem[],

    articles: [
      // Add notable articles/blog posts here.
      {
        title: "Transformer Architecture Explained",
        source: "Medium",
        url: "https://medium.com/@amanatulla1606/transformer-architecture-explained-2c49e2257b4c",
        status: "completed",
        note: "In-depth explanation of the transformer architecture and its components.",
      },
      {
        title: "ML Foundations",
        source: "Kunal Singh's blog",
        url: "https://knl.co.in/blog/ml-foundations/",
        status: "completed",
        note: "Foundational concepts in machine learning and deep learning.",
      },
      
    ] as ReadingItem[],
  },
};

export type ReadingStatus = "completed" | "in-progress" | "queued";

export type ReadingItem = {
  title: string;
  source: string;
  url?: string;
  status: ReadingStatus;
  note?: string;
};
