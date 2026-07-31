import { forwardRef, type ReactNode } from 'react'

type CardProps = {
  title: string
  children: ReactNode
}

const Card = forwardRef<HTMLElement, CardProps>(function Card(
  { title, children },
  ref,
) {
  return (
    <section
      ref={ref}
      className="mt-8 w-full rounded-xl bg-white p-4 shadow-md md:p-6"
    >
      <h2 className="mb-4 text-lg font-semibold tracking-tight text-slate-900 md:text-xl">
        {title}
      </h2>
      <div className="w-full">{children}</div>
    </section>
  )
})

export default Card
