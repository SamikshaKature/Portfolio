import ContentSection from './ContentSection'

interface MiscItem {
  label: string
  url: string | null
}

interface MiscCategory {
  category: string
  items: MiscItem[]
}

interface MiscellaneousProps {
  items: MiscCategory[]
}

export default function Miscellaneous({ items }: MiscellaneousProps) {
  return (
    <ContentSection id="miscellaneous" title="Miscellaneous">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        {items.map((category) => (
          <div key={category.category}>
            <h3 className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[#ADADAD] mb-4">
              {category.category}
            </h3>
            <ul className="space-y-2.5">
              {category.items.map((item, i) =>
                item.url ? (
                  <li key={i}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-sm text-[#0D0D0D] group inline-flex items-center gap-1 underline-offset-4 hover:underline"
                    >
                      {item.label}
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px]">
                        ↗
                      </span>
                    </a>
                  </li>
                ) : (
                  <li key={i} className="font-mono text-sm text-[#777]">
                    {item.label}
                  </li>
                ),
              )}
            </ul>
          </div>
        ))}
      </div>
    </ContentSection>
  )
}
