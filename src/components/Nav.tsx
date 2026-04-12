interface NavProps {
  items: readonly string[]
  active: string
}

export default function Nav({ items, active }: NavProps) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#F9F8F6]/90 backdrop-blur-md border-b border-[#E8E6E3]">
      <div className="max-w-[800px] mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo / initials */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-sans font-black text-sm tracking-tight hover:opacity-50 transition-opacity"
        >
          SK
        </button>

        {/* Nav links */}
        <nav className="flex items-center gap-6 sm:gap-8">
          {items.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className={`font-mono text-[11px] tracking-[0.1em] capitalize transition-colors ${
                active === item
                  ? 'text-[#0D0D0D]'
                  : 'text-[#ADADAD] hover:text-[#0D0D0D]'
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
