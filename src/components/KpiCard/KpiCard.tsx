import type { ReactNode } from 'react'

type KpiCardProps = {
  title: string
  value: ReactNode
}

function KpiCard({ title, value }: KpiCardProps) {
  return (
    <article className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
      <h3 className="m-0 text-sm font-semibold tracking-tight text-[var(--text)]">
        {title}
      </h3>
      <p className="mt-3 mb-0 text-2xl font-bold tracking-tight text-[var(--text-h)]">
        {value}
      </p>
    </article>
  )
}

export default KpiCard
