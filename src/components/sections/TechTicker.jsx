import { techTicker } from "../../data/skills";
import { Chip } from "../ui/Chip";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { TechLogo } from "../ui/TechLogos";

// Each copy of a row repeats its items to at least this many tiles (~2.3k px), wider than any
// common viewport, so the second copy is always ready before the first scrolls out.
const MIN_TILES = 14;
const ROW_MOTION = [
  { duration: 42, direction: "normal" },
  { duration: 34, direction: "reverse" },
  { duration: 48, direction: "normal" },
];

const WORDMARK = {
  sans: "text-lg font-semibold tracking-tight",
  italic: "text-2xl font-black tracking-tighter italic",
  mono: "font-mono text-xs font-medium tracking-[0.25em] uppercase",
};

const uniqueNames = [...new Set(techTicker.flat().map((item) => item.name))];

function Tile({ item }) {
  return (
    <li
      title={item.name}
      className="grid h-16 w-32 shrink-0 place-items-center rounded-[3px] border border-white/[0.06] bg-white/[0.025] text-zinc-300 transition-colors duration-300 hover:border-accent-400/30 hover:bg-accent-500/[0.07] hover:text-white sm:h-20 sm:w-40"
    >
      {item.logo ? (
        <TechLogo name={item.logo} className="size-7 sm:size-8" />
      ) : (
        <span className={`px-3 text-center leading-snug ${WORDMARK[item.style]}`}>{item.name}</span>
      )}
    </li>
  );
}

function TickerRow({ items, duration, direction }) {
  const repeated = Array.from(
    { length: Math.ceil(MIN_TILES / items.length) },
    () => items,
  ).flat();

  return (
    <div className="ticker-row overflow-hidden">
      <div
        className="ticker-track flex w-max will-change-transform"
        data-direction={direction}
        style={{ "--ticker-duration": `${duration}s` }}
      >
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 gap-2 pr-2">
            {repeated.map((item, i) => (
              <Tile key={`${item.name}-${i}`} item={item} />
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

/** Full-bleed, endlessly scrolling rows of the tools I use, alternating direction per row. */
export function TechTicker() {
  return (
    <section
      aria-labelledby="toolkit-title"
      className="relative pt-4 pb-12 md:pt-6 md:pb-20 max-w-6xl mx-auto"
    >
      <Container className="max-w-6xl">
        <Reveal className="flex items-center justify-between gap-4">
          <Chip as="h2" id="toolkit-title">
            Toolkit
          </Chip>
          <Chip>{String(uniqueNames.length).padStart(2, "0")} Tools</Chip>
        </Reveal>
      </Container>

      <ul className="sr-only">
        {uniqueNames.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>

      <div
        aria-hidden="true"
        className="mt-8 flex flex-col gap-2 [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)] md:mt-10"
      >
        {techTicker.map((items, row) => (
          <Reveal key={row} delay={0.08 * row} y={16}>
            <TickerRow items={items} {...ROW_MOTION[row % ROW_MOTION.length]} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
