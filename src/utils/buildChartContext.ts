import type { FuelPrice } from '../types/fuel'

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
] as const

export type ParsedPeriod = {
  monthName: string
  year: number | null
  monthIndex: number
}

export type ChartContext = {
  periodLabel: string
  scopeLabel: string
  years: number[]
  isSingleYear: boolean
  singleCity: string | null
  singleFuelType: string | null
  singleMonthLabel: string | null
}

function titleCase(value: string): string {
  if (!value) return value
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
}

export function parseFuelPeriod(month: string, calendarDay = ''): ParsedPeriod {
  const [rawName, rawYear] = month.split(',').map((part) => part.trim())
  const monthName = rawName || month.trim()
  const monthIndex = MONTH_ORDER.indexOf(
    monthName.toLowerCase() as (typeof MONTH_ORDER)[number],
  )

  let year: number | null = null
  if (rawYear && /^\d{4}$/.test(rawYear)) {
    year = Number(rawYear)
  } else if (/^\d{4}/.test(calendarDay)) {
    year = Number(calendarDay.slice(0, 4))
  }

  return {
    monthName: titleCase(monthName),
    year,
    monthIndex,
  }
}

export function formatMonthYear(monthName: string, year: number | null): string {
  return year ? `${titleCase(monthName)} ${year}` : titleCase(monthName)
}

export function formatShortMonthYear(
  monthName: string,
  year: number | null,
): string {
  const short = titleCase(monthName).slice(0, 3)
  if (!year) return short
  return `${short} '${String(year).slice(-2)}`
}

function uniqueSortedYears(data: FuelPrice[]): number[] {
  const years = new Set<number>()

  for (const row of data) {
    const { year } = parseFuelPeriod(row.month, row.calendarDay)
    if (year !== null) years.add(year)
  }

  return [...years].sort((a, b) => a - b)
}

function buildPeriodLabel(data: FuelPrice[], years: number[]): string {
  const monthKeys = new Map<string, { monthName: string; year: number | null; monthIndex: number }>()

  for (const row of data) {
    const parsed = parseFuelPeriod(row.month, row.calendarDay)
    const key = `${parsed.year ?? 'unknown'}-${parsed.monthIndex}-${parsed.monthName.toLowerCase()}`
    if (!monthKeys.has(key)) {
      monthKeys.set(key, parsed)
    }
  }

  const periods = [...monthKeys.values()].sort((a, b) => {
    const yearA = a.year ?? 0
    const yearB = b.year ?? 0
    if (yearA !== yearB) return yearA - yearB
    return a.monthIndex - b.monthIndex
  })

  if (periods.length === 0) return 'All Available Data'

  if (periods.length === 1) {
    const only = periods[0]
    return formatMonthYear(only.monthName, only.year)
  }

  if (years.length === 1) {
    const year = years[0]
    const first = periods[0]
    const last = periods[periods.length - 1]
    return `${formatMonthYear(first.monthName, year)} – ${formatMonthYear(last.monthName, year)}`
  }

  const uniqueMonthNames = new Set(
    periods.map((period) => period.monthName.toLowerCase()),
  )

  if (uniqueMonthNames.size === 1 && years.length > 1) {
    const monthName = periods[0].monthName
    return `${formatMonthYear(monthName, years[0])} – ${formatMonthYear(monthName, years[years.length - 1])}`
  }

  if (years.length > 1) {
    return `${years[0]} – ${years[years.length - 1]}`
  }

  return 'All Available Data'
}

export function buildChartContext(data: FuelPrice[]): ChartContext {
  if (data.length === 0) {
    return {
      periodLabel: 'No data available',
      scopeLabel: 'No data available',
      years: [],
      isSingleYear: false,
      singleCity: null,
      singleFuelType: null,
      singleMonthLabel: null,
    }
  }

  const years = uniqueSortedYears(data)
  const periodLabel = buildPeriodLabel(data, years)

  const cities = [
    ...new Set(data.map((row) => row.metroCity.trim()).filter(Boolean)),
  ]
  const fuelTypes = [
    ...new Set(
      data.map((row) => titleCase(row.product.trim())).filter(Boolean),
    ),
  ]

  const singleCity = cities.length === 1 ? cities[0] : null
  const singleFuelType = fuelTypes.length === 1 ? fuelTypes[0] : null
  const singleMonthLabel =
    periodLabel !== 'All Available Data' &&
    periodLabel !== 'No data available' &&
    !periodLabel.includes('–')
      ? periodLabel
      : null

  const scopeLabel = singleCity
    ? `${singleCity} • ${periodLabel}`
    : periodLabel

  return {
    periodLabel,
    scopeLabel,
    years,
    isSingleYear: years.length === 1,
    singleCity,
    singleFuelType,
    singleMonthLabel,
  }
}
