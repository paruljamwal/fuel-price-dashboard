import { useMemo } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { FuelPrice } from '../../types/fuel'
import type { ChartContext } from '../../utils/buildChartContext'
import { buildMetroCityChartData } from '../../utils/buildMetroCityChartData'
import ChartContainer from './ChartContainer'

type MetroCityBarChartProps = {
  filteredData: FuelPrice[]
  chartContext: ChartContext
}

function MetroCityTooltip({
  active,
  payload,
  chartContext,
}: {
  active?: boolean
  payload?: Array<{
    name?: string
    value?: number
    color?: string
    payload?: { metroCity?: string }
  }>
  chartContext: ChartContext
}) {
  if (!active || !payload?.length) return null

  const city = payload[0]?.payload?.metroCity ?? 'Unknown city'
  const period = chartContext.singleMonthLabel ?? chartContext.periodLabel

  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-md">
      <p className="m-0 font-semibold text-slate-900">{city}</p>
      <p className="mt-1 mb-0 text-slate-500">{period}</p>
      <div className="mt-2 flex flex-col gap-1">
        {payload.map((entry) => (
          <p
            key={entry.name}
            className="m-0 font-medium text-slate-700"
            style={{ color: entry.color }}
          >
            {entry.name}: ₹
            {typeof entry.value === 'number'
              ? entry.value.toFixed(2)
              : entry.value}
          </p>
        ))}
      </div>
    </div>
  )
}

function MetroCityBarChart({
  filteredData,
  chartContext,
}: MetroCityBarChartProps) {
  // Memoize city averages so the bar chart only rebuilds when filters change.
  const chartData = useMemo(
    () => buildMetroCityChartData(filteredData),
    [filteredData],
  )

  if (filteredData.length === 0) {
    return (
      <div className="flex h-[320px] items-center justify-center text-slate-500 md:h-[400px]">
        No records available for the selected filters.
      </div>
    )
  }

  return (
    <ChartContainer>
      <BarChart
        responsive
        data={chartData}
        style={{ width: '100%', height: '100%' }}
        margin={{ top: 36, right: 16, left: 8, bottom: 28 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E4E7" />
        <XAxis
          dataKey="metroCity"
          tick={{ fill: '#4B5563', fontSize: 12 }}
          tickLine={false}
          axisLine={{ stroke: '#E5E4E7' }}
          label={{
            value: 'Metro City',
            position: 'insideBottom',
            offset: -10,
            style: { fill: '#4B5563', fontSize: 11 },
          }}
        />
        <YAxis
          tick={{ fill: '#4B5563', fontSize: 12 }}
          tickLine={false}
          axisLine={{ stroke: '#E5E4E7' }}
          width={56}
          label={{
            value: 'Retail Selling Price (₹)',
            angle: -90,
            position: 'insideLeft',
            style: { fill: '#4B5563', fontSize: 11, textAnchor: 'middle' },
          }}
        />
        <Tooltip
          content={<MetroCityTooltip chartContext={chartContext} />}
        />
        <Legend verticalAlign="top" height={32} />
        <Bar
          dataKey="petrol"
          name="Petrol"
          fill="#0F766E"
          radius={[4, 4, 0, 0]}
          isAnimationActive
          animationDuration={600}
        />
        <Bar
          dataKey="diesel"
          name="Diesel"
          fill="#F97316"
          radius={[4, 4, 0, 0]}
          isAnimationActive
          animationDuration={600}
        />
      </BarChart>
    </ChartContainer>
  )
}

export default MetroCityBarChart
