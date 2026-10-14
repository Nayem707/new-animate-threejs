// `core: true` marks the tools used most heavily day to day. It is shown as a subtle indicator in the UI.
export const skillGroups = [
  {
    id: 'frontend',
    title: 'Frontend',
    icon: 'frontend',
    description: 'Accessible, responsive interfaces with predictable state and fast rendering.',
    skills: [
      { name: 'React', core: true },
      { name: 'Next.js', core: true },
      { name: 'TypeScript', core: true },
      { name: 'JavaScript' },
      { name: 'Redux Toolkit' },
      { name: 'Tailwind CSS' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: 'backend',
    description: 'Well-structured services and APIs with clear contracts and secure access.',
    skills: [
      { name: 'Node.js', core: true },
      { name: 'Express.js' },
      { name: 'REST APIs', core: true },
      { name: 'Authentication' },
      { name: 'API Design' },
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    icon: 'databases',
    description: 'Relational and document data modelling, query performance and caching.',
    skills: [
      { name: 'PostgreSQL', core: true },
      { name: 'MongoDB' },
      { name: 'Prisma' },
      { name: 'Redis' },
    ],
  },
  {
    id: 'engineering',
    title: 'Engineering',
    icon: 'engineering',
    description: 'The practices that keep systems reliable and teams productive over time.',
    skills: [
      { name: 'System Design', core: true },
      { name: 'SOLID' },
      { name: 'Design Patterns' },
      { name: 'Testing' },
      { name: 'Docker' },
      { name: 'Git' },
    ],
  },
]
