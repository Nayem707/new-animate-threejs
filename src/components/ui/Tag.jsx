export function Tag({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] tracking-wide text-zinc-300 ${className}`}
    >
      {children}
    </span>
  )
}
