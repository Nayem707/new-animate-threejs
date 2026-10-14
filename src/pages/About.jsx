import { profile } from "../data/profile";
import { usePageMeta } from "../hooks/usePageMeta";
import { About } from "../components/sections/About";
import { AboutHero } from "../components/sections/AboutHero";
import { CallToAction } from "../components/sections/CallToAction";
import { Experience } from "../components/sections/Experience";
import { Skills } from "../components/sections/Skills";
import { TechTicker } from "../components/sections/TechTicker";
export default function AboutPage() {
  usePageMeta({
    title: "About",
    description: `About ${profile.name}: approach, skills and experience as a ${profile.role}.`,
  });

  return (
    <>
      <AboutHero
        label={`About / ${profile.name}`}
        meta="03 Sections"
        title="Full stack engineer,"
        accent="systems thinker."
        person={profile}
        facts={[
          { label: "Location", value: profile.location },
          {
            label: "Core stack",
            value: profile.heroStack.slice(0, 3).join(", "),
          },
          { label: "Focus", value: "Scalable systems & AI engineering" },
        ]}
        intro="I build scalable, maintainable and intelligent software — bridging solid full-stack engineering with modern AI to ship products that are reliable and production-ready."
      />
      <TechTicker />
      <About index="01" eyebrow="Approach" />
      <Skills index="02" />
      <Experience index="03" />
      <CallToAction secondary={{ to: "/projects", label: "See my projects" }} />
    </>
  );
}
