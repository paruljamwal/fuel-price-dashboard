import { useMemo } from 'react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { FuelPrice } from '../../types/fuel'
import ChartContainer from './ChartContainer'

type MonthlyTrendPoint = {
  month: string
  petrol: number
  diesel: number
}

type MonthlyTrendChartProps = {
  filteredData: FuelPrice[]
}

const MONTH_ORDER = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
]

function getMonthName(month: string): string {
  return month.split(',')[0]?.trim() ?? month.trim()
}

function average(values: number[]): number {
  if (values.length === 0) return 0
  const total = values.reduce((sum, value) => sum + value, 0)
  return Number((total / values.length).toFixed(2))
}

function buildMonthlyTrendData(data: FuelPrice[]): MonthlyTrendPoint[] {
  const groups = new Map<
    string,
    { label: string; petrol: number[]; diesel: number[] }
  >()

  for (const row of data) {
    const label = getMonthName(row.month)
    const key = label.toLowerCase()

    if (!groups.has(key)) {
      groups.set(key, { label, petrol: [], diesel: [] })
    }

    const group = groups.get(key)!
    const product = row.product.toLowerCase()

    if (product === 'petrol') {
      group.petrol.push(row.retailSellingPrice)
    }

    if (product === 'diesel') {
      group.diesel.push(row.retailSellingPrice)
    }
  }

  return [...groups.values()]
    .map((group) => ({
      month: group.label,
      petrol: average(group.petrol),
      diesel: average(group.diesel),
    }))
    .sort(
      (a, b) =>
        MONTH_ORDER.indexOf(a.month.toLowerCase()) -
        MONTH_ORDER.indexOf(b.month.toLowerCase()),
    )
}

function MonthlyTrendChart({ filteredData }: MonthlyTrendChartProps) {
  const chartData = useMemo(
    () => buildMonthlyTrendData(filteredData),
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
      <LineChart
        responsive
        data={chartData}
        style={{ width: '100%', height: '100%' }}
        margin={{ top: 8, right: 16, left: 0, bottom: 8 }}
      >
        <CartesianGrid stroke="#E5E4E7" strokeDasharray="3 3" />
        <XAxis
          dataKey="month"
          tick={{ fill: '#4B5563', fontSize: 12 }}
          tickLine={false}
          axisLine={{ stroke: '#E5E4E7' }}
        />
        <YAxis
          tick={{ fill: '#4B5563', fontSize: 12 }}
          tickLine={false}
          axisLine={{ stroke: '#E5E4E7' }}
          width={48}
        />
        <Tooltip
          formatter={(value) =>
            typeof value === 'number' ? `₹${value.toFixed(2)}` : value
          }
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="petrol"
          name="Petrol"
          stroke="#0F766E"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4 }}
        />
        <Line
          type="monotone"
          dataKey="diesel"
          name="Diesel"
          stroke="#F97316"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4 }}
        />
      </LineChart>
    </ChartContainer>
  )
}

export default MonthlyTrendChart
