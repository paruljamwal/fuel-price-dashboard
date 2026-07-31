import { useMemo, useRef, useState } from 'react'
import Papa from 'papaparse'
import { toast } from 'sonner'
import Card from './components/Card/Card'
import FilterBar from './components/FilterBar/FilterBar'
import KpiCards from './components/KpiCards/KpiCards'
import FuelTypeDonutChart from './components/charts/FuelTypeDonutChart'
import MetroCityBarChart from './components/charts/MetroCityBarChart'
import MonthlyTrendChart from './components/charts/MonthlyTrendChart'
import PageHeader from './components/PageHeader/PageHeader'
import Section from './components/Section/Section'
import retailFuelPricesCsv from './data/retail-fuel-prices.csv?raw'
import type { FuelPrice } from './types/fuel'
import { buildChartContext, parseFuelPeriod } from './utils/buildChartContext'
import { buildDashboardSummary } from './utils/buildDashboardSummary'
import { exportDashboardPdf } from './utils/exportDashboardPdf'
import { normalizeFuelData } from './utils/normalizeFuelData'
import './App.css'

function loadFuelData(): FuelPrice[] {
  const result = Papa.parse<Record<string, string>>(retailFuelPricesCsv, {
    header: true,
    skipEmptyLines: true,
  })

  return normalizeFuelData(result.data)
}

function toTitleCase(value: string): string {
  if (!value) return 'All'
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
}

function App() {
  const [fuelData] = useState(loadFuelData)
  const [selectedMonth, setSelectedMonth] = useState('')
  const [selectedFuelType, setSelectedFuelType] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [isExportingPdf, setIsExportingPdf] = useState(false)

  const monthlyChartRef = useRef<HTMLElement>(null)
  const metroChartRef = useRef<HTMLElement>(null)
  const donutChartRef = useRef<HTMLElement>(null)

  const monthOptions = useMemo(() => {
    const months = new Map<string, { year: number | null; monthIndex: number }>()

    for (const row of fuelData) {
      const month = row.month.trim()
      if (!month || months.has(month)) continue

      const { year, monthIndex } = parseFuelPeriod(row.month, row.calendarDay)
      months.set(month, { year, monthIndex })
    }

    return [...months.entries()]
      .sort(([, a], [, b]) => {
        const yearDiff = (b.year ?? 0) - (a.year ?? 0)
        if (yearDiff !== 0) return yearDiff
        return b.monthIndex - a.monthIndex
      })
      .map(([month]) => ({ value: month, label: month }))
  }, [fuelData])

  const filteredData = useMemo(() => {
    return fuelData.filter((row) => {
      const matchesMonth =
        !selectedMonth || row.month.trim() === selectedMonth

      const matchesFuelType =
        !selectedFuelType ||
        row.product.toLowerCase() === selectedFuelType.toLowerCase()

      const matchesCity =
        !selectedCity ||
        row.metroCity.toLowerCase() === selectedCity.toLowerCase()

      return matchesMonth && matchesFuelType && matchesCity
    })
  }, [fuelData, selectedMonth, selectedFuelType, selectedCity])

  const chartContext = useMemo(
    () => buildChartContext(filteredData),
    [filteredData],
  )

  const handleResetFilters = () => {
    setSelectedMonth('')
    setSelectedFuelType('')
    setSelectedCity('')

    toast.success('Filters Reset', {
      id: 'filters-reset',
      description: 'All filters have been cleared successfully.',
    })
  }

  const handleExportPdf = async () => {
    if (isExportingPdf) return

    const chartElements = [
      monthlyChartRef.current,
      metroChartRef.current,
      donutChartRef.current,
    ].filter((element): element is HTMLElement => element !== null)

    if (chartElements.length === 0) return

    setIsExportingPdf(true)

    const exportPromise = (async () => {
      // Let the button loading state paint before capture starts.
      await new Promise<void>((resolve) => {
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => resolve())
        })
      })

      await exportDashboardPdf({
        filters: {
          month: selectedMonth || 'All',
          fuelType: toTitleCase(selectedFuelType),
          metroCity: toTitleCase(selectedCity),
        },
        summary: buildDashboardSummary(filteredData),
        chartElements,
      })
    })()

    toast.promise(exportPromise, {
      id: 'pdf-export',
      loading: 'Generating PDF...',
      success: {
        message: 'PDF Exported',
        description: 'Dashboard report downloaded successfully.',
      },
      error: {
        message: 'Export Failed',
        description:
          'Unable to generate the dashboard PDF. Please try again.',
      },
      finally: () => {
        setIsExportingPdf(false)
      },
    })

    try {
      await exportPromise
    } catch (error) {
      console.error('Failed to export dashboard PDF:', error)
    }
  }

  return (
    <main className="dashboard">
      <div className="dashboard-container">
        <PageHeader
          title={
            <>
              <span className="page-title-primary">Fuel Price</span>
              <span className="page-title-secondary">Dashboard</span>
            </>
          }
          subtitle="Monthly retail fuel price visualization across metro cities."
        />

        <Section title="Filters">
          <FilterBar
            monthOptions={monthOptions}
            selectedMonth={selectedMonth}
            selectedFuelType={selectedFuelType}
            selectedCity={selectedCity}
            onMonthChange={setSelectedMonth}
            onFuelTypeChange={setSelectedFuelType}
            onCityChange={setSelectedCity}
            onReset={handleResetFilters}
            onExportPdf={handleExportPdf}
            isExportingPdf={isExportingPdf}
          />
        </Section>

        <Section title="Key Metrics">
          <KpiCards filteredData={filteredData} />
        </Section>

        <Card
          ref={monthlyChartRef}
          title="Monthly Retail Selling Price"
          subtitle={chartContext.periodLabel}
        >
          <MonthlyTrendChart filteredData={filteredData} />
        </Card>

        <Card
          ref={metroChartRef}
          title="Fuel Price by Metro City"
          subtitle={
            <div className="flex flex-col gap-0.5">
              <span>Average Retail Selling Price</span>
              <span>{chartContext.periodLabel}</span>
            </div>
          }
        >
          <MetroCityBarChart
            filteredData={filteredData}
            chartContext={chartContext}
          />
        </Card>

        <Card
          ref={donutChartRef}
          title="Fuel Type Distribution"
          subtitle={chartContext.scopeLabel}
        >
          <FuelTypeDonutChart filteredData={filteredData} />
        </Card>
      </div>
    </main>
  )
}

export default App
