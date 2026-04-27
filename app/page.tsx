import About from "@/components/About";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import NotesPreview from "@/components/NotesPreview";
import Press from "@/components/Press";
import Contact from "@/components/Contact";
import HomePageShell from "@/components/HomePageShell";

// HomePageShell (client) renders Hero with the shared palette context.
// All other sections are Server Components passed as a slot.
export default function HomePage() {
  return (
    <HomePageShell
      sections={
        <>
          <About />
          <Experience />
          <Education />
          <Skills />
          <Projects />
          <NotesPreview />
          <Press />
          <Contact />
        </>
      }
    />
  );
}
