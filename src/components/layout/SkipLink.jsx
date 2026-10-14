export function SkipLink() {
  const skip = (event) => {
    event.preventDefault()
    document.getElementById('main')?.focus()
  }

  return (
    <a
      href="#main"
      onClick={skip}
      className="fixed top-3 left-3 z-[60] -translate-y-20 rounded-full bg-accent-500 px-4 py-2 text-sm font-medium text-white transition-transform focus:translate-y-0"
    >
      Skip to content
    </a>
  )
}
