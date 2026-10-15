import { SHOWCASE_ONLY } from "../config";
import { about } from "./profile";

// Content and tuning for the scroll-driven landing page at /showcase.

// The hero video is scrubbed by scroll, never played. Files in public/hero/ are encoded from
// public/dark-fantasy.mp4 for fast seeking (keyframe every 6 frames, no B-frames, no audio):
//   ffmpeg -i dark-fantasy.mp4 -an -vf scale=1920:1080 -c:v libx264 -crf 23 -g 6 -keyint_min 6 \
//          -sc_threshold 0 -bf 0 -pix_fmt yuv420p -movflags +faststart dark-fantasy-1080.mp4
// The portrait file is a centered 9:16 crop (crop=1215:2160:1312:0,scale=720:1280); posters are
// each file's first frame.
export const heroVideo = {
  landscape: { src: "/hero/dark-fantasy-1080.mp4", poster: "/hero/poster.jpg" },
  portrait: { src: "/hero/dark-fantasy-portrait.mp4", poster: "/hero/poster-portrait.jpg" },
  portraitQuery: "(max-width: 1024px) and (orientation: portrait)",
  // Must match the encode; used to snap scroll progress to whole frames.
  fps: 30,
  focalPoint: "50% 58%",
};

export const heroContent = {
  eyebrow: "Creative development · Digital experiences",
  // Each entry renders on its own line; `font` is 'sans' or 'serif'.
  headline: [
    { text: "Designing", font: "sans" },
    { text: "What's next.", font: "serif" },
  ],
};

// Pinned scroll length is measured in viewport heights; larger values slow the expansion down.
export const heroMotion = {
  desktop: {
    distance: 1.6,
    scrub: 0.8,
    endInset: 12,
    endRadius: 20,
    maxTextScale: 3.4,
  },
  mobile: {
    distance: 0.9,
    scrub: 0.4,
    endInset: 8,
    endRadius: 14,
    maxTextScale: 2,
  },
};

// Horizontal gallery after the hero. `color` tints the card's overlay and number.
export const showcaseGallery = [
  { id: 1, color: "#a78bfa", label: "Night One", image: "/photos/tokyo-shinjuku-2/image-1.jpg" },
  { id: 2, color: "#e879f9", label: "Night Two", image: "/photos/tokyo-shinjuku-2/image-2.jpg" },
  { id: 3, color: "#67e8f9", label: "Night Three", image: "/photos/tokyo-shinjuku-2/image-3.jpg" },
  { id: 4, color: "#fbbf24", label: "Night Four", image: "/photos/tokyo-shinjuku-2/image-4.jpg" },
  { id: 5, color: "#fb7185", label: "Night Five", image: "/photos/tokyo-shinjuku-2/image-8.jpg" },
];

// In showcase-only mode the portfolio routes don't exist, so only in-page anchors are kept.
const isReachable = ({ to }) => !SHOWCASE_ONLY || to.startsWith("#");

export const showcaseNav = [
  { to: "#intro", label: "Intro" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
].filter(isReachable);

// Documents linked from the showcase footer's nav (files in public/ or external); they open in a
// new tab. `kind` is the small tag shown next to the label.
export const showcaseDocuments = [
  { href: "/SEOMATIK_RELAUNCH_HOME.pdf", label: "SEOMATIK Brief", kind: "PDF" },
  {
    href: "https://docs.google.com/presentation/d/16xNDbUB7b9Q9wo89FQN_ZiG9q1VmKAYy2nf7KoBEb2c/edit",
    label: "Project Structure",
    kind: "Slides",
  },
];

export const showcaseIntro = {
  eyebrow: "Introduction",
  title: about.statement,
  body: about.paragraphs[0],
  focus: about.principles.slice(0, 3).map((principle) => principle.title),
  links: [
    { to: "/projects", label: "View projects", variant: "primary" },
    { to: "/about", label: "About me", variant: "secondary" },
  ].filter(isReachable),
};
