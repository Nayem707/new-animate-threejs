// Central place for personal details. Replace the placeholder contact values before deploying.
export const profile = {
  name: "Nayem Islam",
  shortName: "NAYEM ISLAM",
  role: "Full-Stack Engineer",
  // Square portrait in public/. The source has a watermark in its bottom-right corner, so every
  // use crops it off (AboutPreview zooms in slightly, AboutHero uses a portrait crop).
  photo: "/me.jpg",
  location: "Dhaka, Bangladesh.",
  availability: "Open to new opportunities",
  heroStack: [
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "PostgreSQL",
    "LLMs & RAG",
  ],

  contact: {
    email: "inaeem707@gmail.com",
    github: "https://github.com/inaeem707",
    linkedin: "https://www.linkedin.com/in/inaeem301",
    // Optional: a form endpoint that accepts JSON POSTs (e.g. Formspree, Getform, your own API).
    // When empty, the contact form opens the visitor's email client with a prefilled message instead.
    formEndpoint: "",
  },
};

export const site = {
  title: "Nayem Islam — Full Stack Software Developer",
  description:
    "Nayem Islam is a Full Stack Software Developer building scalable, maintainable and intelligent software with React, Next.js, Node.js, Python, PostgreSQL and modern AI (LLMs, RAG).",
};

export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
];

export const pageLinks = navLinks;

export const about = {
  statement:
    "I build scalable, maintainable and intelligent software systems — reliable enough for production, simple enough to change.",
  paragraphs: [
    "My core experience is modern full-stack development with React, Next.js, TypeScript, Node.js, Python and PostgreSQL, with a strong interest in backend engineering, API design, system architecture and scalable applications.",
    "I'm also expanding deeply into AI engineering — LLMs, RAG, vector search and AI-driven workflows — to bridge traditional software engineering with modern AI and build products that are intelligent, reliable and production-ready.",
  ],
  principles: [
    {
      title: "Clean architecture",
      body: "Separation of concerns, SOLID principles and design patterns that keep code easy to reason about.",
    },
    {
      title: "Scalable systems",
      body: "Backends, APIs and data models designed to grow in users, data and features without a rewrite.",
    },
    {
      title: "Production-ready AI",
      body: "LLM and RAG features held to the same bar as any other code: reliable, secure and maintainable.",
    },
    {
      title: "Under the hood",
      body: "Understanding how systems really work, then turning that knowledge into practical solutions.",
    },
  ],
  motto: "Always learning. Always building.",
};
