import { forwardRef, type ReactNode } from 'react'

type CardProps = {
  title: string
  subtitle?: ReactNode
  children: ReactNode
}

const Card = forwardRef<HTMLElement, CardProps>(function Card(
  { title, subtitle, children },
  ref,
) {
  return (
    <section
      ref={ref}
      className="mt-8 w-full rounded-xl bg-white p-4 shadow-md md:p-6"
    >
      <div className="mb-4">
        <h2 className="m-0 text-lg font-semibold tracking-tight text-slate-900 md:text-xl">
          {title}
        </h2>
        {subtitle ? (
          <div className="mt-1 text-sm font-medium leading-snug text-slate-500">
            {subtitle}
          </div>
        ) : null}
      </div>
      <div className="w-full">{children}</div>
    </section>
  )
})

export default Card
