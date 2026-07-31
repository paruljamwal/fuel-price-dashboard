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
import { buildMetroCityChartData } from '../../utils/buildMetroCityChartData'
import ChartContainer from './ChartContainer'

type MetroCityBarChartProps = {
  filteredData: FuelPrice[]
}

function MetroCityBarChart({ filteredData }: MetroCityBarChartProps) {
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
        margin={{ top: 8, right: 16, left: 0, bottom: 8 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E4E7" />
        <XAxis
          dataKey="metroCity"
          tick={{ fill: '#4B5563', fontSize: 12 }}
          tickLine={false}
          axisLine={{ stroke: '#E5E4E7' }}
        />
        <YAxis
          tick={{ fill: '#4B5563', fontSize: 12 }}
          tickLine={false}
          axisLine={{ stroke: '#E5E4E7' }}
          width={48}
          label={{
            value: 'Retail Selling Price (₹)',
            angle: -90,
            position: 'insideLeft',
            style: { fill: '#4B5563', fontSize: 11, textAnchor: 'middle' },
          }}
        />
        <Tooltip
          formatter={(value) =>
            typeof value === 'number' ? `₹${value.toFixed(2)}` : value
          }
        />
        <Legend />
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
