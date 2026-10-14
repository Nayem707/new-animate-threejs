import { ArrowRight } from "lucide-react";
import { about, profile } from "../../data/profile";
import { skillGroups } from "../../data/skills";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";

const coreSkills = skillGroups.flatMap((group) =>
  group.skills.filter((skill) => skill.core).map((skill) => skill.name),
);

export function AboutPreview({ index = "01" }) {
  return (
    <section
      id="introduction"
      aria-labelledby="introduction-title"
      className="relative py-24 md:py-36"
    >
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-4">
          <p className="mb-5 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-accent-300 uppercase">
            <span aria-hidden="true">{index}</span>
            <span aria-hidden="true" className="h-px w-8 bg-accent-400/50" />
            Introduction
          </p>
          <h2
            id="introduction-title"
            className="text-3xl font-medium tracking-[-0.03em] text-zinc-50 sm:text-4xl"
          >
            Who I am
          </h2>
          <div className="relative mt-10 aspect-square w-full max-w-xs overflow-hidden rounded-2xl border border-white/[0.07] bg-ink-900">
            <img
              src={profile.photo}
              alt={`Portrait of ${profile.name}`}
              width="400"
              height="400"
              loading="lazy"
              decoding="async"
              className="size-full origin-[30%_30%] scale-[1.15] object-cover"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-2xl bg-[linear-gradient(to_bottom,transparent_60%,rgb(7_6_11/0.45))] ring-1 ring-accent-400/10 ring-inset"
            />
          </div>
        </Reveal>

        <div className="lg:col-span-8">
          <Reveal>
            <p className="font-serif text-3xl leading-[1.2] text-balance text-zinc-100 sm:text-[2.6rem]">
              {about.statement}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-8 max-w-2xl leading-relaxed text-pretty text-zinc-400">
              {about.paragraphs[0]}
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Core skills">
              {coreSkills.slice(0, 6).map((name) => (
                <li
                  key={name}
                  className="inline-flex items-center gap-2 rounded-full border border-accent-400/30 bg-accent-500/[0.08] px-3 py-1.5 text-[13px] text-zinc-100"
                >
                  <span
                    className="size-1.5 rounded-full bg-accent-400"
                    aria-hidden="true"
                  />
                  {name}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.2} className="mt-10">
            <Button to="/about" variant="secondary">
              More about me
              <ArrowRight
                className="size-4 text-accent-300 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
