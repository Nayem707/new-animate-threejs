import { Link } from 'react-router-dom'

const base =
  'group inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium tracking-tight transition-[background-color,border-color,color,box-shadow,transform] duration-300 ease-out-expo focus-visible:outline-offset-4 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50'

const variants = {
  primary:
    'bg-accent-500 px-6 py-3 text-white shadow-[0_0_0_1px_rgb(167_139_250/0.4),0_10px_40px_-10px_rgb(139_92_246/0.7)] hover:bg-accent-400 hover:shadow-[0_0_0_1px_rgb(196_181_253/0.6),0_14px_50px_-10px_rgb(139_92_246/0.9)]',
  secondary:
    'border border-white/12 bg-white/[0.03] px-6 py-3 text-zinc-100 hover:border-accent-400/50 hover:bg-white/[0.06]',
  ghost: 'px-3 py-2 text-zinc-300 hover:text-white',
}

export function buttonClasses(variant = 'primary', className = '') {
  return `${base} ${variants[variant]} ${className}`
}

/** Renders a router <Link> for `to`, a plain <a> for `href`, otherwise a <button>. */
export function Button({ variant = 'primary', className = '', to, href, children, ...props }) {
  const classes = buttonClasses(variant, className)

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}
