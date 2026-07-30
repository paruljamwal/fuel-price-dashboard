import type { ReactNode } from 'react'
import { useId } from 'react'
import './Section.css'

type SectionProps = {
  title: string
  children: ReactNode
}

function Section({ title, children }: SectionProps) {
  const headingId = useId()

  return (
    <section className="dashboard-section" aria-labelledby={headingId}>
      <h2 id={headingId} className="section-heading">
        {title}
      </h2>
      {children}
    </section>
  )
}

export default Section
