import { motion } from 'motion/react'
import { Container } from './Container'
import { enterUp } from './motionPresets'

/** Top-of-page intro for secondary pages; provides the page's single <h1>. */
export function PageHeader({ eyebrow, title, accent, intro, children }) {
  return (
    <section aria-labelledby="page-title" className="relative isolate overflow-hidden pt-36 pb-16 md:pt-44 md:pb-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0" />
        <div className="absolute -top-48 left-1/2 h-[480px] w-[min(900px,100%)] -translate-x-1/2 rounded-full bg-accent-700/15 blur-[120px]" />
      </div>

      <Container>
        <motion.p
          {...enterUp(0.05)}
          className="mb-6 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-accent-300 uppercase"
        >
          <span aria-hidden="true" className="h-px w-8 bg-accent-400/50" />
          {eyebrow}
        </motion.p>
        <motion.h1
          id="page-title"
          {...enterUp(0.12)}
          className="max-w-4xl text-[2.6rem] leading-[1.04] font-medium tracking-[-0.04em] text-balance text-zinc-50 sm:text-6xl lg:text-7xl"
        >
          {title}
          {accent && (
            <>
              {' '}
              <span className="text-gradient font-serif font-normal tracking-[-0.02em] italic">{accent}</span>
            </>
          )}
        </motion.h1>
        {intro && (
          <motion.p
            {...enterUp(0.22)}
            className="mt-7 max-w-2xl text-base leading-relaxed text-pretty text-zinc-400 sm:text-lg"
          >
            {intro}
          </motion.p>
        )}
        {children && (
          <motion.div {...enterUp(0.32)} className="mt-9">
            {children}
          </motion.div>
        )}
      </Container>

      <div aria-hidden="true" className="hairline absolute inset-x-0 bottom-0 mx-auto h-px max-w-6xl" />
    </section>
  )
}
