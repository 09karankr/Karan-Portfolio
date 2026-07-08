export type CaseStudy = {
  problem: string;
  approach: string[];
  outcomes: string[];
  learnings?: string;
};

export type ProjectMetric = { value: string; label: string };
export type ProjectCategory = "AI/ML" | "DevOps" | "Full-Stack" | "Real-Time";

export type Project = {
  slug: string;
  title: string;
  period: string;
  stack: string[];
  summary: string;
  bullets: string[];
  category: ProjectCategory;
  metrics: ProjectMetric[];
  github?: string;
  demo?: string;
  featured?: boolean;
  caseStudy?: CaseStudy;
};

export const projects: Project[] = [
  {
    slug: "port-logistics-intelligence",
    title: "Real-Time Port Logistics Intelligence System",
    period: "June 2026",
    category: "Real-Time",
    stack: [
      "Python",
      "FastAPI",
      "TimescaleDB",
      "PostgreSQL",
      "Redis",
      "Celery",
      "React",
      "TypeScript",
      "MapLibre GL",
      "Docker",
      "Vercel",
      "Cloudflare",
    ],
    summary:
      "Production-grade maritime intelligence platform tracking 1,600+ live vessels with sub-second WebSocket streaming and composite risk scoring.",
    metrics: [
      { value: "1,600+", label: "vessels tracked live" },
      { value: "<100ms", label: "analytical queries" },
      { value: "zero", label: "cloud server cost" },
    ],
    bullets: [
      "Architected a production-grade maritime intelligence platform ingesting live global AIS feeds, tracking 1,600+ active vessels in real time and streaming position updates to an interactive world map via WebSocket — achieving sub-second latency across simultaneous connections.",
      "Designed a composite risk scoring engine (ETA deviation × port congestion × live weather hazards) running on a Celery Beat scheduler every 10 minutes, automatically classifying shipments as LOW / MEDIUM / HIGH risk and dispatching alerts to Slack and email with a configurable cooldown — reducing manual monitoring overhead to zero.",
      "Modeled a TimescaleDB time-series schema with hypertables, spatial indexes (PostGIS), and continuous aggregates for vessel positions and port congestion, enabling sub-100ms analytical queries over millions of rows without full table scans.",
      "Deployed a containerized 8-service stack (FastAPI, Celery worker + beat, AIS consumer, vessel simulator, Redis, TimescaleDB, React frontend) using Docker Compose; served the frontend on Vercel and exposed the local API globally via Cloudflare Tunnel — full production setup with zero cloud server cost.",
    ],
    featured: true,
    github: "https://github.com/09karankr/port-logistics-intelligence",
    caseStudy: {
      problem:
        "Global maritime shipping suffers from opaque risk signals — vessel delays, port congestion, and weather hazards compound in ways operators only notice after the fact. Off-the-shelf trackers show positions but not composite risk in real time.",
      approach: [
        "Ingested live global AIS (Automatic Identification System) feeds and normalized them into a TimescaleDB schema with hypertables for vessel positions, PostGIS spatial indexes for geo queries, and continuous aggregates for congestion metrics.",
        "Streamed real-time vessel positions to a React + MapLibre GL map via WebSocket, handling backpressure so a single connection never drops even under 1,600+ concurrent vessel updates.",
        "Wrote a composite risk scoring engine: ETA deviation × port congestion × live weather hazards. A Celery Beat scheduler runs it every 10 minutes; results classify shipments as LOW / MEDIUM / HIGH and fire Slack + email alerts with per-shipment cooldown to prevent alert fatigue.",
        "Packaged the whole system as an 8-service Docker Compose stack: FastAPI, Celery worker, Celery beat, AIS consumer, vessel simulator, Redis, TimescaleDB, and React frontend.",
        "Deployed the frontend on Vercel and exposed the local API globally via Cloudflare Tunnel — a full production topology with zero cloud server cost.",
      ],
      outcomes: [
        "Tracks 1,600+ active vessels in real time with sub-second WebSocket latency.",
        "Analytical queries over millions of rows return in under 100ms thanks to hypertables + continuous aggregates.",
        "Manual monitoring overhead reduced to zero — the risk engine only pages operators when a shipment actually crosses a threshold.",
      ],
      learnings:
        "TimescaleDB's hypertables + continuous aggregates make analytical queries on time-series data scale trivially without sharding. Cloudflare Tunnel is an underrated way to expose local services globally without paying for cloud compute. Celery Beat + per-shipment cooldowns is the right primitive for alert engines — don't reinvent scheduling.",
    },
  },
  {
    slug: "cold-email-generator",
    title: "AI-Powered Cold Email Generator",
    period: "June 2026",
    category: "AI/ML",
    stack: [
      "Python",
      "Streamlit",
      "LangChain",
      "Groq API",
      "LLaMA 3.3-70B",
      "ChromaDB",
      "BeautifulSoup4",
      "Pandas",
    ],
    summary:
      "AI outreach tool that scrapes any job URL, extracts structured requirements with LLaMA 3.3-70B, and generates a personalized cold email backed by matched portfolio projects.",
    metrics: [
      { value: "LLaMA 3.3", label: "70B params (Groq)" },
      { value: "20+", label: "portfolio matches" },
      { value: "RAG", label: "two-step pipeline" },
    ],
    bullets: [
      "Built an AI-powered cold email generator using Python, LangChain, and Streamlit that automates personalized outreach for business development.",
      "Integrated Groq API with Meta's LLaMA 3.3-70B model to extract structured job data (role, skills, experience) from scraped career pages using prompt engineering.",
      "Implemented a ChromaDB vector store to semantically match job-required skills against a portfolio of 20+ tech-stack/project-link pairs using similarity search.",
      "Developed a web scraping pipeline with LangChain's WebBaseLoader and regex-based text cleaning to parse any job posting URL.",
      "Chained multiple LangChain PromptTemplates to build a two-step RAG pipeline: job extraction → context-aware email generation with relevant portfolio links.",
      "Deployed an interactive Streamlit web UI enabling one-click cold email generation from any job URL.",
    ],
    featured: true,
    github: "https://github.com/09karankr/ColdEmailGeneratorTool",
    demo: "https://coldemailgeneratortool-4dvgypxqz5afm55xxkdozf.streamlit.app/",
    caseStudy: {
      problem:
        "Cold outreach from job postings takes a template every time: copy the JD, find a matching portfolio project, write the email. Doing this manually across dozens of postings a week doesn't scale.",
      approach: [
        "Built a scraping pipeline with LangChain's WebBaseLoader + regex cleaning that parses arbitrary job posting URLs.",
        "Ran the cleaned JD through LLaMA 3.3-70B via Groq's API with a structured extraction prompt (role, skills, experience). Groq's throughput makes 70B-parameter inference feel snappy at request time.",
        "Embedded a portfolio of 20+ (tech-stack, project-link) pairs into ChromaDB. When a JD comes in, semantic similarity picks the most relevant projects to reference.",
        "Chained two LangChain PromptTemplates: (1) extract structured requirements, (2) generate an email that cites the matched projects — a two-step RAG pipeline.",
        "Wrapped it all in a Streamlit UI so I paste a URL, click one button, and get the email.",
      ],
      outcomes: [
        "One-click cold-email generation from any job posting URL — deployed live on Streamlit Cloud.",
        "Every generated email references real portfolio work matched to the JD's requirements, not generic filler.",
        "Cut outreach turnaround from ~10 minutes per email to under 30 seconds.",
      ],
      learnings:
        "Groq's inference speed changes what's feasible at LLM request time — a 70B model is fine to call inline. Two-step chains (extract → generate) hallucinate less than one-shot prompts because the second call operates on structured input. ChromaDB is the right choice when you don't want to run a vector-DB service.",
    },
  },
  {
    slug: "personal-portfolio",
    title: "Personal Portfolio & Developer Blog",
    period: "April 2026",
    category: "Full-Stack",
    stack: [
      "Next.js 15",
      "TypeScript",
      "Tailwind CSS",
      "Notion API",
      "Framer Motion",
      "Resend",
      "Vercel",
    ],
    summary:
      "The site you're on — Next.js 15 App Router portfolio with a Notion-backed blog, live GitHub/GFG stats, and on-demand ISR revalidation.",
    metrics: [
      { value: "Next 15", label: "App Router + ISR" },
      { value: "Notion", label: "headless CMS" },
      { value: "Live", label: "GitHub + GFG APIs" },
    ],
    bullets: [
      "Built a full-stack personal portfolio using Next.js 15 App Router with TypeScript and Tailwind CSS, deployed on Vercel with ISR (revalidate=3600) and an on-demand revalidation webhook for near-instant content updates.",
      "Integrated Notion as a headless CMS for the blog — converts Notion blocks to Markdown via notion-to-md, renders with react-markdown + rehype-highlight for full syntax-highlighted code blocks.",
      "Wired live GitHub API and GeeksforGeeks API integrations to surface real-time coding stats (repos, stars, followers, DSA problem breakdown by difficulty) using parallel server-side fetches.",
      "Implemented UX details including Framer Motion page transitions, an IntersectionObserver-based sticky table of contents with active-heading tracking, and a scroll-driven reading progress bar.",
      "Built a contact form backed by the Resend email API with client-side loading/success/error states, and a /api/revalidate webhook route for Notion-triggered cache purges.",
    ],
    github: "https://github.com/09karankr/Karan-Portfolio",
    demo: "https://www.karan-dev.co.in",
    caseStudy: {
      problem:
        "Wanted a portfolio recruiters could skim in 60 seconds and engineers could dig into for hours — plus a blog I could keep updated without leaving my usual tools. Notion is where my notes already live.",
      approach: [
        "Bootstrapped with Next.js 15 App Router + TypeScript + Tailwind, hosted on Vercel. ISR (revalidate=3600) for static-fast rendering with fresh Notion data.",
        "Wired Notion as a headless CMS via @notionhq/client + notion-to-md, rendering with react-markdown + rehype-highlight so code blocks are syntax-highlighted and every Notion block type is supported.",
        "Built a /api/revalidate webhook so a GitHub Actions cron (or Notion Automations) can push edits live within minutes — no waiting for the 1h ISR window.",
        "Server-side fetched GitHub + GeeksforGeeks APIs in parallel, surfacing live coding stats (repos, stars, followers, DSA problem breakdown).",
        "Layered UX details: Framer Motion page transitions, an IntersectionObserver-based sticky TOC with active-heading tracking, a scroll-driven reading progress bar, a print-friendly resume view, and a hamburger menu on mobile.",
        "Built the contact form on Resend with client-side loading/success/error states — reply_to set so replies go straight to the sender.",
      ],
      outcomes: [
        "Fresh Notion content appears on the live site within 5 minutes via the revalidate webhook.",
        "Every page under 150 KB first-load JS. 25 routes pre-rendered at build.",
        "Zero third-party lock-in — swap Notion for MDX in a day if needed.",
      ],
      learnings:
        "ISR + on-demand revalidation is the sweet spot for content sites — you get static-fast delivery without a 'redeploy on every edit' loop. notion-to-md handles ~95% of Notion blocks perfectly; the last 5% you either accept or write a small custom renderer for. Fetching third-party stats server-side is more reliable than embedding their images (which routinely 503 on free-tier services).",
    },
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
