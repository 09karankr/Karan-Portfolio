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
    "Google Cloud Innovator",
    "GitHub Foundations Certification",
    "Docker Hands-On: Containerization Fundamentals",
  ],
};
