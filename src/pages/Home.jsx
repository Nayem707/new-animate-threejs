import { usePageMeta } from "../hooks/usePageMeta";
import { AboutPreview } from "../components/sections/AboutPreview";
import { Contact } from "../components/sections/Contact";
import { FeaturedProjects } from "../components/sections/FeaturedProjects";
import { Hero } from "../components/sections/Hero";

/** The only page that mounts the hero's Three.js scene, so the WebGL chunk loads only here. */
export default function HomePage() {
  usePageMeta();

  return (
    <>
      <Hero />
      <div aria-hidden="true" className="hairline mx-auto h-px max-w-7xl" />
      <AboutPreview index="01" />
      <FeaturedProjects index="02" />
      <Contact index="03" />
    </>
  );
}
