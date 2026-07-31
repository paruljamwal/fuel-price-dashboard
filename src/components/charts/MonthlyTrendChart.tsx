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
import {
  formatMonthYear,
  formatShortMonthYear,
  parseFuelPeriod,
} from '../../utils/buildChartContext'
import ChartContainer from './ChartContainer'

type MonthlyTrendPoint = {
  month: string
  monthFull: string
  year: number | null
  petrol: number
  diesel: number
  sortKey: number
}

type MonthlyTrendChartProps = {
  filteredData: FuelPrice[]
}

function average(values: number[]): number {
  if (values.length === 0) return 0
  const total = values.reduce((sum, value) => sum + value, 0)
  return Number((total / values.length).toFixed(2))
}

// Prepare monthly averages for the petrol / diesel line chart.
function buildMonthlyTrendData(
  data: FuelPrice[],
  isSingleYear: boolean,
): MonthlyTrendPoint[] {
  const groups = new Map<
    string,
    {
      monthName: string
      year: number | null
      monthIndex: number
      petrol: number[]
      diesel: number[]
    }
  >()

  for (const row of data) {
    const parsed = parseFuelPeriod(row.month, row.calendarDay)
    const key = `${parsed.year ?? 'unknown'}-${parsed.monthIndex}`

    if (!groups.has(key)) {
      groups.set(key, {
        monthName: parsed.monthName,
        year: parsed.year,
        monthIndex: parsed.monthIndex,
        petrol: [],
        diesel: [],
      })
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
    .map((group) => {
      const monthFull = formatMonthYear(group.monthName, group.year)
      const monthLabel = isSingleYear
        ? group.monthName
        : formatShortMonthYear(group.monthName, group.year)

      return {
        month: monthLabel,
        monthFull,
        year: group.year,
        petrol: average(group.petrol),
        diesel: average(group.diesel),
        sortKey: (group.year ?? 0) * 12 + Math.max(group.monthIndex, 0),
      }
    })
    .sort((a, b) => a.sortKey - b.sortKey)
}

function MonthlyTrendTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: Array<{
    name?: string
    value?: number
    payload?: MonthlyTrendPoint
    color?: string
  }>
}) {
  if (!active || !payload?.length) return null

  const point = payload[0]?.payload
  if (!point) return null

  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-md">
      <p className="m-0 font-semibold text-slate-900">{point.monthFull}</p>
      <p className="mt-1 mb-0 text-slate-500">Retail Selling Price</p>
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

function MonthlyTrendChart({ filteredData }: MonthlyTrendChartProps) {
  const isSingleYear = useMemo(() => {
    const values = new Set<number>()
    for (const row of filteredData) {
      const { year } = parseFuelPeriod(row.month, row.calendarDay)
      if (year !== null) values.add(year)
    }
    return values.size === 1
  }, [filteredData])

  const chartData = useMemo(
    () => buildMonthlyTrendData(filteredData, isSingleYear),
    [filteredData, isSingleYear],
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
        margin={{ top: 36, right: 16, left: 8, bottom: 28 }}
      >
        <CartesianGrid stroke="#E5E4E7" strokeDasharray="3 3" />
        <XAxis
          dataKey="month"
          tick={{ fill: '#4B5563', fontSize: 12 }}
          tickLine={false}
          axisLine={{ stroke: '#E5E4E7' }}
          label={{
            value: 'Month',
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
        <Tooltip content={<MonthlyTrendTooltip />} />
        <Legend verticalAlign="top" height={32} />
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
