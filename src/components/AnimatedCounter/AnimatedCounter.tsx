import { memo } from 'react'
import CountUpImport from 'react-countup'

// react-countup is CJS; Vite may nest the component under `.default`.
const CountUp =
  typeof CountUpImport === 'function'
    ? CountUpImport
    : (CountUpImport as unknown as { default: typeof CountUpImport }).default

type AnimatedCounterProps = {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  duration?: number
}

function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 2,
}: AnimatedCounterProps) {
  // Animate KPI values from zero up to the current metric.
  return (
    <CountUp
      start={0}
      end={value}
      duration={duration}
      decimals={decimals}
      decimal="."
      prefix={prefix}
      suffix={suffix}
      preserveValue
    />
  )
}

export default memo(AnimatedCounter)
