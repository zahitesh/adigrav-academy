export interface CourseModule {
  number: string;
  title: string;
  summary: string;
  topics: string[];
  linkedLabs?: string[];
}

export interface CourseLab {
  id: string;
  tag: string;
  title: string;
  description: string;
  stack: string[];
}

export interface CourseProgram {
  slug: '10x-ai-engineer' | 'ai-engineering-bootcamp';
  title: string;
  shortTitle: string;
  audienceBadge: string;
  statusBadge: string;
  durationBadge: string;
  metaBadge: string;
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  cardDescription: string;
  philosophyBadge: string;
  highlights: string[];
  modules: CourseModule[];
  labs: CourseLab[];
  waitlistNote: string;
}

export interface FounderProfile {
  id: string;
  name: string;
  role: string;
  company: string;
  experience: string;
  bio: string;
  focusAreas: string[];
  initials: string;
  accentGradient: string;
  image?: string;
}

export const FOUNDERS: FounderProfile[] = [
  {
    id: 'aditya',
    name: 'Aditya Prakash',
    role: 'Staff Software Engineer',
    company: 'Google',
    experience: '12+ years',
    bio: '12+ years building software systems where real-world reliability, scale, and engineering depth are non-negotiable.',
    focusAreas: ['Distributed Systems', 'Production LLM Infra', 'High-Scale Reliability'],
    initials: 'AP',
    accentGradient: 'from-[#8b5cff] to-[#39d5ff]',
    image: '/aditya-prakash.avif',
  },
  {
    id: 'gaurav',
    name: 'Gaurav Agrawal',
    role: 'Principal Engineering Manager',
    company: 'Microsoft',
    experience: '17+ years',
    bio: '17+ years leading engineering teams and high-stakes systems — translating ambitious technical plans into durable outcomes.',
    focusAreas: ['Engineering Leadership', 'Agentic Architecture', 'Enterprise Delivery'],
    initials: 'GA',
    accentGradient: 'from-[#f59e0b] to-[#8b5cff]',
    image: '/gaurav-agrawal.avif',
  },
];

export const COURSES: Record<CourseProgram['slug'], CourseProgram> = {
  '10x-ai-engineer': {
    slug: '10x-ai-engineer',
    title: '10x AI Engineer Course',
    shortTitle: '10x AI Engineer',
    audienceBadge: 'For experienced engineers',
    statusBadge: 'Coming soon',
    durationBadge: '12 Weeks',
    metaBadge: 'AWS · Azure · GCP',
    eyebrow: 'For working professionals & experienced engineers',
    heroTitle: 'Stop prompting. Start architecting.',
    heroSubtitle:
      'Production systems, not playground prototypes. Master AI-native engineering, multi-agent orchestration, hybrid RAG, automated evals, and cloud-scale governance.',
    cardDescription:
      'Use AI to multiply real job output: AI-native development, agents, multi-agent swarms, agentic systems, RAG, vector databases, knowledge graphs, and production patterns.',
    philosophyBadge: 'Curriculum design · Keep your edge. Ship what’s next.',
    highlights: [
      'Multi-agent orchestration & swarms',
      'Hybrid RAG & knowledge graphs',
      'Continuous evals & red-teaming',
      'Cloud deployment across AWS, Azure & GCP',
    ],
    waitlistNote:
      'Join the waitlist for launch dates, early curriculum access, and a founder-only discount on the 10x AI Engineer Course.',
    modules: [
      {
        number: '01',
        title: 'AI Foundations: ML, DL & GenAI',
        summary: 'Bridge classical ML intuition with transformer architectures and modern foundation model trade-offs.',
        topics: [
          'Tokenization, attention mechanics, and scaling laws in practice',
          'Discriminative vs. generative workloads & latency/cost profiling',
          'Choosing open-weight vs. frontier APIs for enterprise workloads',
        ],
      },
      {
        number: '02',
        title: 'LLM Models & Context Mechanics',
        summary: 'Architect low-latency streaming services with context budgeting, KV caching, and dynamic model routing.',
        topics: [
          'Context rot, needle-in-a-haystack failure modes, and sliding memory',
          'Router patterns: complexity-based model selection & fallback chains',
          'SSE streaming, structured outputs, and token budget enforcement',
        ],
        linkedLabs: ['LAB 01'],
      },
      {
        number: '03',
        title: 'Prompt Engineering & Agentic Principles',
        summary: 'Move beyond ad-hoc prompting into deterministic contracts, schemas, and tool-calling loops.',
        topics: [
          'Contract-driven system prompts and JSON schema enforcement',
          'ReAct, plan-and-execute, and reflection control loops',
          'Handling non-determinism, retries, and idempotent tool execution',
        ],
      },
      {
        number: '04',
        title: 'Skills, Agents & RAG',
        summary: 'Combine composable agent skills with grounded retrieval pipelines for domain-accurate execution.',
        topics: [
          'Designing modular agent skills, hooks, and workflow triggers',
          'Chunking strategies, metadata filtering, and citation grounding',
          'Preventing context poisoning and retrieval hallucinations',
        ],
      },
      {
        number: '05',
        title: 'Advanced Retrieval & RAG Optimization',
        summary: 'Engineer production hybrid search combining dense vectors, BM25, knowledge graphs, and cross-encoder reranking.',
        topics: [
          'Dense + sparse hybrid indexing in Qdrant with reciprocal rank fusion',
          'Cohere cross-encoder reranking and query decomposition',
          'Knowledge graph augmentation & Ragas retrieval metric diagnostics',
        ],
        linkedLabs: ['LAB 02'],
      },
      {
        number: '06',
        title: 'Evals & Automated Benchmarking',
        summary: 'Build CI/CD quality gates for non-deterministic AI systems before a single prompt ships to prod.',
        topics: [
          'Golden datasets, LLM-as-a-judge calibration, and pairwise grading',
          'Regression testing across model upgrades and prompt revisions',
          'Automated adversarial red-teaming and guardrail benchmarks',
        ],
      },
      {
        number: '07',
        title: 'Model Context Protocol',
        summary: 'Standardize secure tool and data connectivity using FastMCP, OAuth2, and human-in-the-loop approvals.',
        topics: [
          'MCP architecture: resources, tools, prompts, and transport layers',
          'Securing OpenAPI gateways with OAuth2 scopes and rate limiting',
          'Transactional HITL gates, spend limits, and immutable audit logs',
        ],
        linkedLabs: ['LAB 03', 'LAB 04'],
      },
      {
        number: '08',
        title: 'HARNESS AI & Agent Frameworks',
        summary: 'Evaluate and compose production agent harnesses with durable state, checkpoints, and sandboxing.',
        topics: [
          'Comparing LangGraph, CrewAI, custom state machines, and harnesses',
          'Long-running execution durability and Postgres state checkpointing',
          'Sandboxed code execution and tool permission boundaries',
        ],
      },
      {
        number: '09',
        title: 'Multi-Agent Systems & Orchestration',
        summary: 'Coordinate specialist agent teams with typed handoffs, shared memory, and self-correction loops.',
        topics: [
          'Supervisor, swarm, and hierarchical delegation topologies',
          'Spec-driven SDLC orchestration across planning, coding, and QA',
          'Resolving deadlocks, infinite loops, and conflicting agent state',
        ],
        linkedLabs: ['LAB 05'],
      },
      {
        number: '10',
        title: 'Observability & Agent Economics',
        summary: 'Instrument token burn, trace multi-hop tool calls, and optimize unit economics at scale.',
        topics: [
          'Distributed OpenTelemetry tracing across multi-agent spans',
          'Prompt caching, batching, and semantic caching for cost reduction',
          'Latency SLAs, TTFT optimization, and per-tenant spend attribution',
        ],
      },
      {
        number: '11',
        title: 'Governance & AI Safety',
        summary: 'Enforce PII masking, prompt-injection defense, and compliance controls for regulated industries.',
        topics: [
          'Indirect prompt injection defense and output policy filtering',
          'PII/PHI redaction pipelines and zero-retention provider configs',
          'Enterprise auditability, RBAC, and model risk governance',
        ],
      },
      {
        number: '12',
        title: 'Cloud Deployment for Agentic AI',
        summary: 'Containerize and deploy real-time WebSocket and voice agent workloads across AWS, Azure, and GCP.',
        topics: [
          'Dockerized FastAPI & WebSocket scaling for bidirectional audio',
          'Real-time voice pipeline optimization (STT -> LLM -> TTS)',
          'Blue-green rollouts, canary evals, and CRM webhook integrations',
        ],
        linkedLabs: ['LAB 06'],
      },
    ],
    labs: [
      {
        id: 'LAB 01',
        tag: 'LLM ROUTING',
        title: 'Multi-Model Production ChatGPT Microservice',
        description:
          'FastAPI with dynamic model routing, SSE streaming, token budgets, and persistent conversation threads.',
        stack: ['FastAPI', 'SSE', 'Model Router', 'Redis / SQL'],
      },
      {
        id: 'LAB 02',
        tag: 'HYBRID RAG',
        title: 'Enterprise Hybrid RAG Engine with Re-Ranking',
        description:
          'Qdrant, Cohere Re-rank, Ragas evaluation, PDF ingestion, and retrieval guardrails for messy enterprise data.',
        stack: ['Qdrant', 'Cohere Rerank', 'Ragas', 'Hybrid Search'],
      },
      {
        id: 'LAB 03',
        tag: 'MCP SECURITY',
        title: 'Secure Enterprise MCP Server & OpenAPI Gateway',
        description:
          'FastMCP server, OAuth2, OpenAPI tools, rate limiting, and continuous evals before tool execution.',
        stack: ['FastMCP', 'OAuth2', 'OpenAPI', 'Eval Gates'],
      },
      {
        id: 'LAB 04',
        tag: 'HITL FINTECH',
        title: 'Transactional Zerodha Trading MCP Agent',
        description:
          'Kite APIs, live holdings and market data, manual approval gates, spend limits, PII masking, and audit trails.',
        stack: ['Kite API', 'MCP', 'HITL Approval', 'Audit Trails'],
      },
      {
        id: 'LAB 05',
        tag: 'AGENTIC SDLC',
        title: 'Multi-Agent Spec-Driven SDLC Suite',
        description:
          'An orchestrator with requirements, design, coding, and QA agents, Postgres checkpoints, and automated self-correction loops.',
        stack: ['Orchestrator', 'Postgres', 'Self-Correction', 'QA Loop'],
      },
      {
        id: 'LAB 06',
        tag: 'REAL-TIME VOICE',
        title: 'Cloud-Hosted Sales Voice Agent',
        description:
          'Deepgram or Whisper, a real-time LLM, ElevenLabs, WebSockets, Docker deployment, and CRM-integrated structured notes.',
        stack: ['Deepgram', 'ElevenLabs', 'WebSockets', 'Docker'],
      },
    ],
  },
  'ai-engineering-bootcamp': {
    slug: 'ai-engineering-bootcamp',
    title: 'AI Engineering Bootcamp',
    shortTitle: 'AI Engineering Bootcamp',
    audienceBadge: 'For freshers',
    statusBadge: 'Coming soon',
    durationBadge: '12 Weeks',
    metaBadge: 'Guided learning path',
    eyebrow: 'For freshers & entry-level developers',
    heroTitle: 'Start curious. Leave hireable.',
    heroSubtitle:
      'Build fundamentals, ship guided projects, and earn the confidence to enter AI engineering with portfolio-ready systems.',
    cardDescription:
      'Build strong fundamentals from GenAI, agents, skills, workflows, and hooks — then deepen them through hands-on projects and advanced AI concepts.',
    philosophyBadge: 'For Freshers · Start curious. Leave hireable.',
    highlights: [
      'Strong GenAI & LLM fundamentals',
      'Hands-on RAG & ChromaDB chatbots',
      'MCP tools & multi-agent workflows',
      '6 portfolio-grade guided builds',
    ],
    waitlistNote:
      'Join the waitlist for launch dates, early curriculum access, and a founder-only discount on the AI Engineering Bootcamp.',
    modules: [
      {
        number: '01',
        title: 'AI Foundations: ML, DL & GenAI',
        summary: 'Understand how machine learning, neural networks, and modern LLMs actually work under the hood.',
        topics: [
          'From traditional code to ML models, embeddings, and transformers',
          'How LLM inference generates tokens, probabilities, and context',
          'Setting up a clean Python AI development environment',
        ],
      },
      {
        number: '02',
        title: 'LLM Models',
        summary: 'Work directly with LLM APIs, parameters, streaming, and session memory to ship your first AI app.',
        topics: [
          'System prompts, temperature, top-p, and max token controls',
          'Managing multi-turn chat history and conversation context',
          'Building interactive UIs with Streamlit and FastAPI',
        ],
        linkedLabs: ['LAB 01'],
      },
      {
        number: '03',
        title: 'Prompt Engineering',
        summary: 'Master clear instructions, few-shot examples, chain-of-thought reasoning, and structured JSON output.',
        topics: [
          'Zero-shot, few-shot, and role-based prompting frameworks',
          'Extracting reliable JSON schemas from unstructured text',
          'Debugging prompt failures systematically',
        ],
      },
      {
        number: '04',
        title: 'Skills, Agents & RAG',
        summary: 'Learn how LLMs gain external knowledge through Retrieval-Augmented Generation and reusable skills.',
        topics: [
          'Why LLMs hallucinate and how grounded retrieval solves it',
          'Document parsing, text chunking, and vector embeddings',
          'Connecting tools, workflows, and agent skills',
        ],
      },
      {
        number: '05',
        title: 'Fine-Tuning RAGs',
        summary: 'Improve retrieval accuracy using ChromaDB, smart chunking, and safe fallback responses.',
        topics: [
          'Tuning chunk sizes, overlap, and top-k retrieval scores',
          'Building closed-domain Q&A with strict source citations',
          'Implementing honest “I don’t know” confidence thresholds',
        ],
        linkedLabs: ['LAB 02'],
      },
      {
        number: '06',
        title: 'Evals',
        summary: 'Learn how to measure whether your AI application actually works before showing it to users.',
        topics: [
          'Writing test cases for LLM responses and tool calls',
          'Measuring accuracy, groundedness, and latency',
          'Iterating on prompts using repeatable evaluation scripts',
        ],
      },
      {
        number: '07',
        title: 'Model Context Protocol',
        summary: 'Connect AI assistants to live REST APIs and simulated trading workflows safely via MCP.',
        topics: [
          'Understanding MCP servers, clients, and tool schemas',
          'Exposing public REST APIs and OpenAPI endpoints to agents',
          'Adding user confirmation prompts before sensitive actions',
        ],
        linkedLabs: ['LAB 03', 'LAB 04'],
      },
      {
        number: '08',
        title: 'HARNESS AI & Agent Frameworks',
        summary: 'Understand agent loops, memory hooks, and structured frameworks that power autonomous apps.',
        topics: [
          'How agent harnesses manage planning, tools, and errors',
          'Using hooks and workflows for predictable execution',
          'Debugging multi-step agent traces cleanly',
        ],
      },
      {
        number: '09',
        title: 'Multi-Agent Systems & Orchestration',
        summary: 'Coordinate multiple specialized AI agents working together on software development tasks.',
        topics: [
          'Orchestrator vs. specialist agent responsibilities',
          'Passing structured artifacts between requirements, coding & QA',
          'Reviewing and validating multi-agent outputs',
        ],
        linkedLabs: ['LAB 05'],
      },
      {
        number: '10',
        title: 'Observability & Agent Economics',
        summary: 'Track token usage, API latency, and application costs so your projects stay fast and affordable.',
        topics: [
          'Logging prompts, completions, and token counts',
          'Estimating API spend and choosing cost-effective models',
          'Spotting slow steps in multi-turn agent flows',
        ],
      },
      {
        number: '11',
        title: 'Governance & AI Safety',
        summary: 'Ship responsible AI apps and cap off your portfolio with a real-time WebSocket voice agent.',
        topics: [
          'Basic input validation, prompt injection awareness & safety checks',
          'Streaming speech-to-text and text-to-speech over WebSockets',
          'Packaging projects cleanly for technical interviews',
        ],
        linkedLabs: ['LAB 06'],
      },
    ],
    labs: [
      {
        id: 'LAB 01',
        tag: 'CHAT APP',
        title: 'Build Your Own ChatGPT',
        description:
          'A responsive Streamlit or FastAPI chat app with model selection, system prompts, temperature, and session memory.',
        stack: ['Streamlit', 'FastAPI', 'LLM APIs', 'Session Memory'],
      },
      {
        id: 'LAB 02',
        tag: 'GROUNDED RAG',
        title: 'Closed-Domain RAG Chatbot',
        description:
          'A safe Q&A assistant over local PDFs or website text using ChromaDB, chunking, and “I don’t know” fallbacks.',
        stack: ['ChromaDB', 'Embeddings', 'PDF Chunking', 'Citations'],
      },
      {
        id: 'LAB 03',
        tag: 'MCP TOOLS',
        title: 'MCP API Lookup & Eval Bot',
        description:
          'A local MCP server with public REST API tools, simple evaluation scripts, and an OpenAPI-driven chatbot.',
        stack: ['MCP Server', 'REST APIs', 'OpenAPI', 'Eval Scripts'],
      },
      {
        id: 'LAB 04',
        tag: 'SAFE ACTIONS',
        title: 'Zerodha Trading MCP Agent',
        description:
          'A simulated trading assistant with Zerodha tools, holdings and quote lookups, plus user confirmation before orders.',
        stack: ['Zerodha Tools', 'MCP', 'Confirmations', 'Quote Lookup'],
      },
      {
        id: 'LAB 05',
        tag: 'MULTI-AGENT',
        title: 'Multi-Agent SDLC Suite',
        description:
          'An Orchestrator delegates requirements, design, coding, and QA tasks across a practical AI software team.',
        stack: ['Orchestrator', 'Coder Agent', 'QA Agent', 'Workflows'],
      },
      {
        id: 'LAB 06',
        tag: 'VOICE AI',
        title: 'Outbound Sales Voice Agent',
        description:
          'A real-time voice agent with STT, LLM sales scripts, TTS, WebSockets, and structured local call summaries.',
        stack: ['STT', 'TTS', 'WebSockets', 'Voice Pipeline'],
      },
    ],
  },
};
