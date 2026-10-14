import { about } from './profile'

// Content and tuning for the scroll-driven video landing page at /showcase.
// To swap the footage, re-encode it into public/video/ (or point `src` at an absolute URL).
export const heroVideo = {
  landscape: { src: '/video/hero-1080.mp4', poster: '/video/hero-poster.jpg' },
  // Center-cropped 9:16 encode for portrait phones and tablets; a third of the landscape file's size
  // and the same framing a landscape source would be cropped to anyway.
  portrait: { src: '/video/hero-portrait.mp4', poster: '/video/hero-poster-portrait.jpg' },
  portraitQuery: '(max-width: 1024px) and (orientation: portrait)',
  type: 'video/mp4',
  focalPoint: '50% 58%',
}

export const heroContent = {
  eyebrow: 'Creative development · Digital experiences',
  // Each entry renders on its own line; `font` is 'sans' or 'serif'.
  headline: [
    { text: 'Designing', font: 'sans' },
    { text: "What's next.", font: 'serif' },
  ],
}

// Pinned scroll length is measured in viewport heights; larger values slow the expansion down.
export const heroMotion = {
  desktop: { distance: 1.6, scrub: 0.8, endInset: 12, endRadius: 20, maxTextScale: 3.4, zoomMedia: true },
  mobile: { distance: 0.9, scrub: 0.4, endInset: 8, endRadius: 14, maxTextScale: 2, zoomMedia: false },
}

export const showcaseNav = [
  { to: '#intro', label: 'Intro' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
]

export const showcaseIntro = {
  eyebrow: 'Introduction',
  title: about.statement,
  body: about.paragraphs[0],
  focus: about.principles.slice(0, 3).map((principle) => principle.title),
  links: [
    { to: '/projects', label: 'View projects', variant: 'primary' },
    { to: '/about', label: 'About me', variant: 'secondary' },
  ],
}
