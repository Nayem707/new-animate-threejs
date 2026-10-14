import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { profile } from "../../data/profile";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { enterUp as enter } from "../ui/motionPresets";
import { HeroVisual } from "../three/HeroVisual";

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate flex flex-col justify-center overflow-hidden pt-24 pb-14 lg:min-h-[100svh] lg:pt-16 lg:pb-0"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="bg-grid absolute inset-0" />
        <div className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-accent-700/15 blur-[120px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink-950" />
      </div>

      <Container className="grid items-center gap-6 lg:grid-cols-12 lg:gap-0">
        <div className="relative z-10 pt-6 lg:col-span-6 lg:pt-0">
          <motion.p
            {...enter(0.05)}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] py-1.5 pr-4 pl-3 text-xs text-zinc-300"
          >
            <span className="relative flex size-2" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            {profile.availability}
          </motion.p>

          <motion.h1
            id="hero-title"
            {...enter(0.12)}
            className="text-[2.75rem] leading-[1.02] font-medium tracking-[-0.04em] text-balance text-zinc-50 sm:text-6xl lg:text-[4.6rem]"
          >
            Building Digital AI Powered Experiences{" "}
            <span className="text-gradient font-serif font-normal tracking-[-0.02em] italic">
              That Scale.
            </span>
          </motion.h1>

          <motion.p
            {...enter(0.22)}
            className="mt-7 max-w-xl text-base leading-relaxed text-pretty text-zinc-400 sm:text-lg"
          >
            I&apos;m <span className="text-zinc-100">{profile.name}</span>, a{" "}
            {profile.role} building scalable, intelligent products end to end —
            from React and Next.js interfaces to Node.js and Python services,
            PostgreSQL data models and AI features powered by LLMs and RAG.
          </motion.p>

          <motion.div
            {...enter(0.32)}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button to="/projects">
              Explore My Work
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Button>
            <Button to="#contact" variant="secondary">
              Contact Me
              <ArrowUpRight
                className="size-4 text-accent-300 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Button>
          </motion.div>

          <motion.div
            {...enter(0.42)}
            className="mt-12 border-t border-white/[0.06] pt-6"
          >
            <p className="mb-3 font-mono text-[11px] tracking-[0.2em] text-zinc-500 uppercase">
              Core stack
            </p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-300">
              {profile.heroStack.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="size-1 rounded-full bg-accent-400"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.2 }}
          className="relative -mx-5 sm:mx-0 lg:col-span-6 lg:-mr-24 xl:-mr-32"
        >
          <HeroVisual className="h-[340px] sm:h-[440px] lg:h-[min(680px,82svh)]" />
        </motion.div>
      </Container>

      <Link
        to="#introduction"
        aria-label="Scroll to introduction"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 rounded-full p-2 font-mono text-[10px] tracking-[0.25em] text-zinc-500 uppercase transition-colors hover:text-zinc-300 lg:flex"
      >
        Scroll
        <span
          aria-hidden="true"
          className="h-10 w-px overflow-hidden bg-white/10"
        >
          <span className="block h-1/2 w-full animate-[scroll-cue_2.2s_ease-in-out_infinite] bg-accent-400" />
        </span>
      </Link>
    </section>
  );
}
