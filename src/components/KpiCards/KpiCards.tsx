import { useMemo } from 'react'
import type { FuelPrice } from '../../types/fuel'
import KpiCard from '../KpiCard/KpiCard'

type KpiCardsProps = {
  filteredData: FuelPrice[]
}

function formatPrice(value: number): string {
  return `₹${value.toFixed(2)}`
}

function KpiCards({ filteredData }: KpiCardsProps) {
  const averagePrice = useMemo(() => {
    if (filteredData.length === 0) return '--'

    const total = filteredData.reduce(
      (sum, row) => sum + row.retailSellingPrice,
      0,
    )

    return formatPrice(total / filteredData.length)
  }, [filteredData])

  const highestPrice = useMemo(() => {
    if (filteredData.length === 0) return '--'

    return formatPrice(
      Math.max(...filteredData.map((row) => row.retailSellingPrice)),
    )
  }, [filteredData])

  const lowestPrice = useMemo(() => {
    if (filteredData.length === 0) return '--'

    return formatPrice(
      Math.min(...filteredData.map((row) => row.retailSellingPrice)),
    )
  }, [filteredData])

  const totalRecords = useMemo(() => {
    if (filteredData.length === 0) return '--'

    return String(filteredData.length)
  }, [filteredData])

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <KpiCard title="Average Retail Selling Price" value={averagePrice} />
      <KpiCard title="Highest Retail Selling Price" value={highestPrice} />
      <KpiCard title="Lowest Retail Selling Price" value={lowestPrice} />
      <KpiCard title="Total Records" value={totalRecords} />
    </div>
  )
}

export default KpiCards
