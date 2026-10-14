export function ScrollCue({ className = '', ...props }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none flex flex-col items-center gap-2.5 ${className}`} {...props}>
      <span className="font-mono text-[10px] tracking-[0.35em] text-white/75 uppercase">Scroll</span>
      <span className="relative h-10 w-px overflow-hidden bg-white/25">
        <span className="absolute inset-x-0 top-0 h-1/2 animate-[scroll-cue_2.2s_cubic-bezier(0.65,0,0.35,1)_infinite] bg-white" />
      </span>
    </div>
  )
}
