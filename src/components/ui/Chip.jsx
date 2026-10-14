export function Chip({ as: Tag = "p", className = "", children, ...props }) {
  return (
    <Tag
      className={`border border-white/15 bg-ink-950 px-3 py-2 font-mono text-[10px] font-medium tracking-[0.2em] text-zinc-100 uppercase ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
