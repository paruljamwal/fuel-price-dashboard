import { useMemo } from 'react'
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts'
import type { FuelPrice } from '../../types/fuel'
import { buildFuelTypeDistributionData } from '../../utils/buildFuelTypeDistributionData'
import ChartContainer from './ChartContainer'

type FuelTypeDonutChartProps = {
  filteredData: FuelPrice[]
}

function formatPercent(value: number, total: number): string {
  if (total === 0) return '0%'
  return `${((value / total) * 100).toFixed(1)}%`
}

function FuelTypeDonutChart({ filteredData }: FuelTypeDonutChartProps) {
  const chartData = useMemo(
    () => buildFuelTypeDistributionData(filteredData),
    [filteredData],
  )

  const total = useMemo(
    () => chartData.reduce((sum, slice) => sum + slice.value, 0),
    [chartData],
  )

  if (filteredData.length === 0) {
    return (
      <div className="flex h-[320px] items-center justify-center text-slate-500 md:h-[400px]">
        No data available
      </div>
    )
  }

  return (
    <ChartContainer>
      <PieChart
        responsive
        style={{ width: '100%', height: '100%' }}
        margin={{ top: 8, right: 16, left: 16, bottom: 8 }}
      >
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius="55%"
          outerRadius="80%"
          paddingAngle={2}
          isAnimationActive
          animationDuration={600}
          label={({ name, value }) =>
            `${name} ${formatPercent(Number(value), total)}`
          }
        >
          {chartData.map((slice) => (
            <Cell key={slice.name} fill={slice.fill} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => {
            const count = typeof value === 'number' ? value : Number(value)
            return [`${count} (${formatPercent(count, total)})`, 'Records']
          }}
        />
        <Legend />
      </PieChart>
    </ChartContainer>
  )
}

export default FuelTypeDonutChart
