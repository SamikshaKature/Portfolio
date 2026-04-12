import { useEffect, useState } from 'react'
import data from './data.json'
import Nav from './components/Nav'
import Header from './components/Header'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Miscellaneous from './components/Miscellaneous'

function ContactForm() {
  return (
    <section id="contact" className="bg-white/50 backdrop-blur-md border border-slate-200/60 p-8 rounded-2xl shadow-sm">
      <h2 className="font-sans text-2xl font-bold mb-6 tracking-tight">Let's Connect</h2>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Name"
            className="font-mono text-sm bg-transparent border-b border-slate-300 py-2 focus:border-purple-500 outline-none transition-colors placeholder:text-[#ADADAD]"
          />
          <input
            type="email"
            placeholder="Email"
            className="font-mono text-sm bg-transparent border-b border-slate-300 py-2 focus:border-purple-500 outline-none transition-colors placeholder:text-[#ADADAD]"
          />
        </div>
        <textarea
          placeholder="Message"
          rows={3}
          className="font-mono text-sm w-full bg-transparent border-b border-slate-300 py-2 focus:border-purple-500 outline-none transition-colors resize-none placeholder:text-[#ADADAD]"
        />
        <button className="font-sans text-sm font-medium bg-slate-900 text-white px-8 py-3 rounded-full hover:bg-slate-700 transition-colors active:scale-95">
          Send Message
        </button>
      </form>
    </section>
  )
}

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
    <div className="relative min-h-screen bg-[#FDFDFF] text-slate-900 selection:bg-purple-100">
      {/* Ambient background gradients */}
      <div className="fixed inset-0 overflow-hidden -z-10" aria-hidden="true">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-100/50 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-blue-100/40 blur-[100px]" />
      </div>

      <Nav items={NAV_ITEMS} active={active} />

      <main className="max-w-[800px] mx-auto px-6 pt-28 pb-36 space-y-24">
        {/* Hero header — not a ContentSection so it has no label/divider */}
        <Header data={data.meta} />

        <About content={data.about} />
        <Experience items={data.experience} />
        <Projects items={data.projects} />
        <Miscellaneous items={data.miscellaneous} />

        {/* Contact form */}
        <ContactForm />
      </main>

      <footer className="max-w-[800px] mx-auto px-6 pb-8">
        <p className="font-mono text-[10px] text-[#ADADAD] tracking-wide">
          © {new Date().getFullYear()} Samiksha Kature
        </p>
      </footer>
    </div>
  )
}
