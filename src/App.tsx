import { useEffect, useState } from 'react'
import data from './data.json'
import Nav from './components/Nav'
import Header from './components/Header'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Miscellaneous from './components/Miscellaneous'

const NAV_ITEMS = ['about', 'experience', 'projects', 'miscellaneous'] as const
type NavItem = (typeof NAV_ITEMS)[number]

export default function App() {
  const [active, setActive] = useState<NavItem>('about')

  // Track which section is currently in the viewport to highlight the nav link
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          setActive(visible[0].target.id as NavItem)
        }
      },
      // Trigger when a section crosses the upper-middle of the viewport
      { rootMargin: '-35% 0px -60% 0px' },
    )

    NAV_ITEMS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-[#F9F8F6]">
      <Nav items={NAV_ITEMS} active={active} />

      <main className="max-w-[800px] mx-auto px-6 pt-28 pb-36 space-y-24">
        {/* Hero header — not a ContentSection so it has no label/divider */}
        <Header data={data.meta} />

        <About content={data.about} />
        <Experience items={data.experience} />
        <Projects items={data.projects} />
        <Miscellaneous items={data.miscellaneous} />
      </main>

      <footer className="max-w-[800px] mx-auto px-6 pb-8">
        <p className="font-mono text-[10px] text-[#ADADAD] tracking-wide">
          © {new Date().getFullYear()} Samiksha Kature
        </p>
      </footer>
    </div>
  )
}
