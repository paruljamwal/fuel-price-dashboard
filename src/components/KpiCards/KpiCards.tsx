import { useMemo } from 'react'
import type { FuelPrice } from '../../types/fuel'
import AnimatedCounter from '../AnimatedCounter/AnimatedCounter'
import KpiCard from '../KpiCard/KpiCard'

type KpiCardsProps = {
  filteredData: FuelPrice[]
}

type KpiMetrics = {
  averagePrice: number | null
  highestPrice: number | null
  lowestPrice: number | null
  totalRecords: number | null
}

function KpiCards({ filteredData }: KpiCardsProps) {
  // Memoize KPI calculations so cards do not recompute on unrelated renders.
  const metrics = useMemo<KpiMetrics>(() => {
    if (filteredData.length === 0) {
      return {
        averagePrice: null,
        highestPrice: null,
        lowestPrice: null,
        totalRecords: null,
      }
    }

    const prices = filteredData.map((row) => row.retailSellingPrice)
    const total = prices.reduce((sum, price) => sum + price, 0)

    return {
      averagePrice: total / prices.length,
      highestPrice: Math.max(...prices),
      lowestPrice: Math.min(...prices),
      totalRecords: filteredData.length,
    }
  }, [filteredData])

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <KpiCard
        title="Average Retail Selling Price"
        value={
          metrics.averagePrice === null ? (
            '--'
          ) : (
            <AnimatedCounter
              value={metrics.averagePrice}
              prefix="₹"
              decimals={2}
            />
          )
        }
      />
      <KpiCard
        title="Highest Retail Selling Price"
        value={
          metrics.highestPrice === null ? (
            '--'
          ) : (
            <AnimatedCounter
              value={metrics.highestPrice}
              prefix="₹"
              decimals={2}
            />
          )
        }
      />
      <KpiCard
        title="Lowest Retail Selling Price"
        value={
          metrics.lowestPrice === null ? (
            '--'
          ) : (
            <AnimatedCounter
              value={metrics.lowestPrice}
              prefix="₹"
              decimals={2}
            />
          )
        }
      />
      <KpiCard
        title="Total Records"
        value={
          metrics.totalRecords === null ? (
            '--'
          ) : (
            <AnimatedCounter value={metrics.totalRecords} />
          )
        }
      />
    </div>
  )
}

export default KpiCards
