import type { ReactNode } from 'react'

type ChartContainerProps = {
  children: ReactNode
}

function ChartContainer({ children }: ChartContainerProps) {
  return <div className="h-[320px] w-full md:h-[400px]">{children}</div>
}

export default ChartContainer
