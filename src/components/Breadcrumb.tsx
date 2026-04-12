interface BreadcrumbItem {
  label: string
  /** Omit `href` for the current (last) crumb */
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

/**
 * Breadcrumb / back-button nav for sub-pages.
 *
 * Usage (e.g. with React Router):
 *   <Breadcrumb items={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Projects', href: '/projects' },
 *     { label: 'LLM Eval Harness' },
 *   ]} />
 */
export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 font-mono text-xs text-[#999] mb-10">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-[#CCC]">/</span>}
          {item.href ? (
            <a
              href={item.href}
              className="hover:text-[#0D0D0D] transition-colors underline-offset-4 hover:underline"
            >
              {item.label}
            </a>
          ) : (
            <span className="text-[#0D0D0D] font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
