import ContentSection from './ContentSection'

interface AboutProps {
  content: string
}

export default function About({ content }: AboutProps) {
  return (
    <ContentSection id="about" title="About">
      <p className="font-mono text-sm leading-[1.9] text-[#444] max-w-[620px]">
        {content}
      </p>
    </ContentSection>
  )
}
