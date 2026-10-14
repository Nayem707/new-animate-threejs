// Placeholder projects that illustrate the card layout. Replace them with real work.
// Leave a link empty ('') and the card shows it as unavailable instead of rendering a broken link.
// `featured: true` projects also appear on the home page.
export const projects = [
  {
    id: 'commerce-platform',
    title: 'Headless Commerce Platform',
    category: 'Full Stack',
    year: '2025',
    featured: true,
    description:
      'A storefront and admin dashboard built on a headless API, designed for fast page loads and a clean separation between catalog, cart and order domains.',
    stack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'Redis'],
    features: [
      'Server-rendered product pages with incremental revalidation',
      'Role-based admin dashboard for catalog and order management',
      'Cart and checkout flow with idempotent order creation',
    ],
    challenge:
      'Keeping inventory consistent under concurrent checkouts using row-level locking and Redis-backed reservations.',
    links: { github: '', live: '' },
  },
  {
    id: 'realtime-workspace',
    title: 'Realtime Team Workspace',
    category: 'SaaS',
    year: '2025',
    featured: true,
    description:
      'A collaborative task board with live presence and instant updates, structured as a multi-tenant application with isolated workspaces.',
    stack: ['React', 'Redux Toolkit', 'Express.js', 'MongoDB', 'WebSockets', 'Docker'],
    features: [
      'Live updates and presence indicators over WebSockets',
      'Multi-tenant data model with per-workspace permissions',
      'Optimistic UI with conflict-aware reconciliation',
    ],
    challenge:
      'Designing an event model that keeps clients in sync after reconnects without replaying the full history.',
    links: { github: '', live: '' },
  },
  {
    id: 'auth-gateway',
    title: 'Auth & API Gateway Service',
    category: 'Backend',
    year: '2024',
    description:
      'A standalone authentication service and gateway that centralises sessions, token rotation and rate limiting for a set of internal APIs.',
    stack: ['Node.js', 'Express.js', 'PostgreSQL', 'Redis', 'Docker'],
    features: [
      'Access/refresh token rotation with reuse detection',
      'Sliding-window rate limiting backed by Redis',
      'OpenAPI-documented endpoints with request validation',
    ],
    challenge:
      'Revoking sessions instantly across services without adding a database round-trip to every request.',
    links: { github: '', live: '' },
  },
  {
    id: 'analytics-dashboard',
    title: 'Operations Analytics Dashboard',
    category: 'Data & UI',
    year: '2024',
    description:
      'An internal dashboard that turns large event tables into fast, filterable charts and reports for non-technical teams.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
    features: [
      'Composable filters encoded in the URL for shareable views',
      'Pre-aggregated materialized views for sub-second queries',
      'Accessible charts with keyboard navigation and data tables',
    ],
    challenge:
      'Keeping queries over millions of rows responsive by moving aggregation into scheduled materialized views.',
    links: { github: '', live: '' },
  },
]
