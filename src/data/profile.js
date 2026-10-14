// Central place for personal details. Replace the placeholder contact values before deploying.
export const profile = {
  name: 'Nayem Islam',
  shortName: 'NAYEM ISLAM',
  role: 'Full Stack Software Developer',
  location: 'Available for remote work',
  availability: 'Open to new opportunities',
  heroStack: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'System Design'],

  contact: {
    email: 'hello@example.com',
    github: 'https://github.com/',
    linkedin: 'https://www.linkedin.com/',
    // Optional: a form endpoint that accepts JSON POSTs (e.g. Formspree, Getform, your own API).
    // When empty, the contact form opens the visitor's email client with a prefilled message instead.
    formEndpoint: '',
  },
}

export const site = {
  title: 'Nayem Islam — Full Stack Software Developer',
  description:
    'Nayem Islam is a Full Stack Software Developer building scalable, maintainable web applications with React, Next.js, Node.js, PostgreSQL and thoughtful system design.',
}

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
]

export const pageLinks = navLinks

export const about = {
  statement:
    'I design and build web applications that stay fast, understandable and easy to change long after launch.',
  paragraphs: [
    'I work across the full stack — from accessible, responsive interfaces in React and Next.js to well-structured APIs in Node.js and data models in PostgreSQL. I care about the parts users never see as much as the parts they do.',
    'My approach is grounded in clean architecture and pragmatic system design: clear boundaries between modules, predictable data flow, and code that the next engineer can pick up without a guided tour.',
  ],
  principles: [
    {
      title: 'Scalable applications',
      body: 'Architectures that handle growth in users, data and team size without a rewrite.',
    },
    {
      title: 'Clean architecture',
      body: 'Separated concerns, explicit dependencies and domain logic that is independent of frameworks.',
    },
    {
      title: 'Maintainable code',
      body: 'Readable, tested, consistently structured code that is cheap to change.',
    },
    {
      title: 'Problem-solving',
      body: 'Understanding the real constraint first, then choosing the simplest solution that holds up.',
    },
  ],
}
