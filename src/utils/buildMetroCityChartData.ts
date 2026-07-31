import type { FuelPrice } from '../types/fuel'

export type MetroCityChartPoint = {
  metroCity: string
  petrol: number
  diesel: number
}

function average(values: number[]): number {
  if (values.length === 0) return 0

  const total = values.reduce((sum, value) => sum + value, 0)
  return Number((total / values.length).toFixed(2))
}

export function buildMetroCityChartData(
  data: FuelPrice[],
): MetroCityChartPoint[] {
  const groups = new Map<
    string,
    { label: string; petrol: number[]; diesel: number[] }
  >()

  for (const row of data) {
    const key = row.metroCity.toLowerCase()

    if (!groups.has(key)) {
      groups.set(key, { label: row.metroCity, petrol: [], diesel: [] })
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
      metroCity: group.label,
      petrol: average(group.petrol),
      diesel: average(group.diesel),
    }))
    .sort((a, b) => a.metroCity.localeCompare(b.metroCity))
}
