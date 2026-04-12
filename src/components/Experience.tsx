import ContentSection from './ContentSection'
import Accordion from './Accordion'

interface ExperienceItem {
  id: string
  company: string
  role: string
  period: string
  location: string
  bullets: string[]
}

interface ExperienceProps {
  items: ExperienceItem[]
}

export default function Experience({ items }: ExperienceProps) {
  return (
    <ContentSection id="experience" title="Experience">
      <div>
        {items.map((item) => (
          <Accordion
            key={item.id}
            trigger={
              <div>
                <div className="font-mono text-sm font-medium text-[#0D0D0D] leading-snug">
                  {item.company}
                  <span className="text-[#BBB] mx-2">·</span>
                  <span className="font-normal">{item.role}</span>
                </div>
                <div className="font-mono text-xs text-[#ADADAD] mt-0.5">
                  {item.period}
                  <span className="mx-2">·</span>
                  {item.location}
                </div>
              </div>
            }
          >
            <ul className="space-y-2.5 pl-0">
              {item.bullets.map((bullet, i) => (
                <li key={i} className="flex gap-3 font-mono text-xs text-[#555] leading-relaxed">
                  <span className="text-[#CCC] flex-shrink-0 mt-px select-none">—</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </Accordion>
        ))}
      </div>
    </ContentSection>
  )
}
