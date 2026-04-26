import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Experience from './components/Experience.jsx'
import Education from './components/Education.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Press from './components/Press.jsx'
import Contact from './components/Contact.jsx'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Education />
        <Skills />
        <Projects />
        <Press />
        <Contact />
      </main>
    </>
  )
}
