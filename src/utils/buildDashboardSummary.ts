import type { FuelPrice } from '../types/fuel'

export type DashboardSummary = {
  averagePrice: string
  highestPrice: string
  lowestPrice: string
  totalRecords: string
}

function formatPrice(value: number): string {
  return `₹${value.toFixed(2)}`
}

// Calculate dashboard KPIs from filtered data for the PDF summary section.
export function buildDashboardSummary(data: FuelPrice[]): DashboardSummary {
  if (data.length === 0) {
    return {
      averagePrice: '--',
      highestPrice: '--',
      lowestPrice: '--',
      totalRecords: '0',
    }
  }

  const prices = data.map((row) => row.retailSellingPrice)
  const total = prices.reduce((sum, price) => sum + price, 0)

  return {
    averagePrice: formatPrice(total / prices.length),
    highestPrice: formatPrice(Math.max(...prices)),
    lowestPrice: formatPrice(Math.min(...prices)),
    totalRecords: String(data.length),
  }
}
