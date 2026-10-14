// `core: true` marks the tools used most heavily day to day. It is shown as a subtle indicator in the UI.
export const skillGroups = [
  {
    id: "frontend",
    title: "Frontend",
    icon: "frontend",
    description:
      "Accessible, responsive interfaces with predictable state and fast rendering.",
    skills: [
      { name: "React", core: true },
      { name: "Next.js", core: true },
      { name: "TypeScript", core: true },
      { name: "JavaScript" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    icon: "backend",
    description:
      "Well-structured services and APIs with clear contracts and secure access.",
    skills: [
      { name: "Node.js", core: true },
      { name: "Express.js" },
      { name: "Python" },
      { name: "REST APIs", core: true },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    icon: "databases",
    description:
      "Relational and document data modelling, query performance and caching.",
    skills: [
      { name: "PostgreSQL", core: true },
      { name: "MongoDB" },
      { name: "Redis" },
    ],
  },
  {
    id: "ai",
    title: "AI",
    icon: "ai",
    description:
      "Intelligent features built on LLMs and retrieval, held to production standards.",
    skills: [
      { name: "LLMs" },
      { name: "RAG" },
      { name: "AI Applications" },
      { name: "Vector Search" },
    ],
  },
  {
    id: "engineering",
    title: "Engineering",
    icon: "engineering",
    description:
      "The fundamentals that keep systems reliable, performant and easy to change.",
    skills: [
      { name: "System Design", core: true },
      { name: "Scalable Architecture" },
      { name: "API Design" },
      { name: "Clean Code" },
    ],
  },
  {
    id: "tools",
    title: "Tools & Infrastructure",
    icon: "tools",
    description: "Version control, containers and cloud to ship and run it all.",
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "Docker" },
      { name: "AWS" },
    ],
  },
];

// Logo ticker on the About page, one array per row. `logo` is a key in TechLogos.jsx; items
// without one render `name` as a wordmark in the given `style` ("sans", "italic" or "mono").
export const techTicker = [
  [
    { name: "React", logo: "react" },
    { name: "Next.js", logo: "nextdotjs" },
    { name: "TypeScript", logo: "typescript" },
    { name: "JavaScript", logo: "javascript" },
    { name: "Node.js", logo: "nodedotjs" },
    { name: "Express.js", logo: "express" },
    { name: "Python", logo: "python" },
  ],
  [
    { name: "PostgreSQL", logo: "postgresql" },
    { name: "LLMs", style: "sans" },
    { name: "MongoDB", logo: "mongodb" },
    { name: "RAG", style: "mono" },
    { name: "Redis", logo: "redis" },
    { name: "Vector Search", style: "mono" },
  ],
  [
    { name: "Docker", logo: "docker" },
    { name: "Git", logo: "git" },
    { name: "GitHub", logo: "github" },
    { name: "AWS", logo: "amazonwebservices" },
    { name: "Vercel", logo: "vercel" },
    { name: "Clean Code", style: "italic" },
    { name: "REST", style: "mono" },
  ],
];
