import ContentSection from './ContentSection'
import Accordion from './Accordion'

interface ProjectItem {
  id: string
  title: string
  description: string
  tech: string[]
  url: string
  year: string
}

interface ProjectsProps {
  items: ProjectItem[]
}

export default function Projects({ items }: ProjectsProps) {
  return (
    <ContentSection id="projects" title="Projects">
      <div>
        {items.map((item) => (
          <Accordion
            key={item.id}
            trigger={
              <div className="flex items-baseline justify-between gap-4 w-full">
                <span className="font-mono text-sm font-medium text-[#0D0D0D]">
                  {item.title}
                </span>
                <span className="font-mono text-xs text-[#ADADAD] flex-shrink-0">{item.year}</span>
              </div>
            }
          >
            <div className="space-y-4 pl-0">
              <p className="font-mono text-xs text-[#555] leading-relaxed max-w-[560px]">
                {item.description}
              </p>

              {/* Tech stack pills */}
              <div className="flex flex-wrap gap-2">
                {item.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] tracking-wide text-[#777] bg-[#F0EFED] border border-[#E5E3E0] px-2 py-0.5 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* External link */}
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-xs text-[#0D0D0D] underline-offset-4 hover:underline group"
              >
                View project
                <span className="opacity-60 group-hover:opacity-100 transition-opacity">↗</span>
              </a>
            </div>
          </Accordion>
        ))}
      </div>
    </ContentSection>
  )
}
