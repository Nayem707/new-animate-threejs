import { useRef } from "react";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "../ui/Button";
import { Chip } from "../ui/Chip";
import { Container } from "../ui/Container";
import { GlyphField } from "../ui/GlyphField";
import { enterUp } from "../ui/motionPresets";
import { SocialLinks } from "../ui/SocialLinks";

const CORNERS = {
  tl: "-top-px -left-px border-t border-l",
  tr: "-top-px -right-px border-t border-r",
  bl: "-bottom-px -left-px border-b border-l",
};

function ProfileCard({ person }) {
  return (
    <div className="mb-10 flex shrink-0 flex-col md:mb-0 md:w-56 lg:w-64">
      <div className="flex items-center gap-5 md:flex-col md:items-stretch md:gap-0">
        <div className="relative aspect-[4/5] w-24 shrink-0 overflow-hidden border border-white/10 bg-ink-900 sm:w-28 md:w-full">
          {/* Square source with a watermark bottom-right; the portrait crop keeps the centre and drops it. */}
          <img
            src={person.photo}
            alt={`Portrait of ${person.name}`}
            width="400"
            height="400"
            decoding="async"
            fetchPriority="high"
            className="absolute inset-0 size-full object-cover object-[50%_30%]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_55%,rgb(7_6_11/0.55))] ring-1 ring-accent-400/10 ring-inset"
          />
        </div>
        <div className="min-w-0 md:mt-5">
          <p className="text-xl font-semibold tracking-tight text-zinc-50">{person.name}</p>
          <p className="mt-1 text-sm text-zinc-400">{person.role}</p>
        </div>
      </div>

      {person.availability && (
        <p className="mt-5 inline-flex items-center gap-2.5 self-start rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] py-1.5 pr-3.5 pl-3 text-xs text-emerald-100">
          <span className="relative flex size-2" aria-hidden="true">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/60" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
          </span>
          {person.availability}
        </p>
      )}

      <SocialLinks
        className="mt-5 gap-2"
        linkClassName="border border-white/10 hover:border-accent-400/40"
      />
    </div>
  );
}

/**
 * About page hero: an animated glyph field behind a pair of label chips and a solid, framed card
 * holding an optional profile column and the title. Provides the page's single <h1>.
 */
export function AboutHero({ label, meta, title, accent, intro, person, facts }) {
  const cardRef = useRef(null);

  return (
    <section
      aria-labelledby="page-title"
      className="relative isolate overflow-hidden pt-24 pb-16 md:pt-28 md:pb-24"
    >
      <div className="absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,#000_60%,transparent)]">
        <GlyphField excludeRef={cardRef} />
      </div>

      <Container className="max-w-6xl">
        <motion.div
          {...enterUp(0.05)}
          className="flex items-center justify-between gap-4"
        >
          <Chip>{label}</Chip>
          <Chip>{meta}</Chip>
        </motion.div>

        <motion.div
          ref={cardRef}
          {...enterUp(0.12)}
          className="relative mt-8 border border-white/10 bg-ink-950 px-6 py-10 sm:px-10 sm:py-14 md:mt-10 md:px-14 md:py-16"
        >
          {Object.entries(CORNERS).map(([corner, position]) => (
            <span
              key={corner}
              aria-hidden="true"
              className={`absolute size-3 border-accent-400 ${position}`}
            />
          ))}
          <div className="md:flex md:items-stretch md:gap-10 lg:gap-14">
            {person && <ProfileCard person={person} />}
            <div className="flex min-w-0 flex-1 flex-col">
              <h1
                id="page-title"
                className="max-w-4xl text-[2.6rem] leading-[1.02] font-semibold tracking-[-0.045em] text-balance text-zinc-50 sm:text-6xl lg:text-7xl"
              >
                {title}
                {accent && (
                  <>
                    {" "}
                    <span className="text-gradient font-serif font-normal tracking-[-0.02em] italic">
                      {accent}
                    </span>
                  </>
                )}
              </h1>
              {intro && (
                <p className="mt-6 max-w-xl text-base leading-relaxed text-pretty text-zinc-400 md:mt-8 md:text-[17px]">
                  {intro}
                </p>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                <Button to="/#contact">
                  Get in touch
                  <ArrowUpRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </Button>
                <Button to="/projects" variant="secondary">
                  See my projects
                  <ArrowRight
                    className="size-4 text-accent-300 transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Button>
              </div>

              {facts?.length > 0 && (
                <div className="pt-10 md:mt-auto">
                  <dl className="grid gap-x-8 gap-y-5 border-t border-white/10 pt-6 sm:grid-cols-3">
                    {facts.map(({ label: factLabel, value }) => (
                      <div key={factLabel}>
                        <dt className="font-mono text-[10px] font-medium tracking-[0.2em] text-zinc-500 uppercase">
                          {factLabel}
                        </dt>
                        <dd className="mt-1.5 text-sm text-zinc-200">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
