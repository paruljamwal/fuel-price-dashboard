import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'sonner'
import Card from './components/Card/Card'
import FilterBar from './components/FilterBar/FilterBar'
import KpiCards from './components/KpiCards/KpiCards'
import PageHeader from './components/PageHeader/PageHeader'
import Section from './components/Section/Section'
import type { FuelPrice } from './types/fuel'
import { buildChartContext, parseFuelPeriod } from './utils/buildChartContext'
import { buildDashboardSummary } from './utils/buildDashboardSummary'
import { loadFuelData } from './utils/normalizeFuelData'
import './App.css'

const MonthlyTrendChart = lazy(
  () => import('./components/charts/MonthlyTrendChart'),
)
const MetroCityBarChart = lazy(
  () => import('./components/charts/MetroCityBarChart'),
)
const FuelTypeDonutChart = lazy(
  () => import('./components/charts/FuelTypeDonutChart'),
)

function ChartFallback() {
  return <div className="chart-fallback">Loading chart…</div>
}

function toTitleCase(value: string): string {
  if (!value) return 'All'
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
}

function App() {
  const [fuelData, setFuelData] = useState<FuelPrice[]>([])
  const [dataStatus, setDataStatus] = useState<'loading' | 'ready' | 'error'>(
    'loading',
  )
  const [selectedMonth, setSelectedMonth] = useState('')
  const [selectedFuelType, setSelectedFuelType] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [isExportingPdf, setIsExportingPdf] = useState(false)

  const monthlyChartRef = useRef<HTMLElement>(null)
  const metroChartRef = useRef<HTMLElement>(null)
  const donutChartRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let cancelled = false

    loadFuelData()
      .then((data: FuelPrice[]) => {
        if (cancelled) return
        setFuelData(data)
        setDataStatus('ready')
      })
      .catch((error: unknown) => {
        console.error('Failed to load fuel data:', error)
        if (cancelled) return
        setDataStatus('error')
        toast.error('Data Load Failed', {
          id: 'fuel-data-load',
          description: 'Unable to load fuel price data. Please refresh.',
        })
      })

    return () => {
      cancelled = true
    }
  }, [])

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

  const isDataReady = dataStatus === 'ready'

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
    if (isExportingPdf || !isDataReady) return

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

      const { exportDashboardPdf } = await import('./utils/exportDashboardPdf')

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
            isDataReady={isDataReady}
          />
        </Section>

        <Section title="Key Metrics">
          {dataStatus === 'loading' ? (
            <div className="dashboard-status">Loading fuel price data…</div>
          ) : dataStatus === 'error' ? (
            <div className="dashboard-status dashboard-status-error">
              Unable to load fuel price data. Please refresh the page.
            </div>
          ) : (
            <KpiCards filteredData={filteredData} />
          )}
        </Section>

        {isDataReady ? (
          <>
            <Card
              ref={monthlyChartRef}
              title="Monthly Retail Selling Price"
              subtitle={chartContext.periodLabel}
            >
              <Suspense fallback={<ChartFallback />}>
                <MonthlyTrendChart filteredData={filteredData} />
              </Suspense>
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
              <Suspense fallback={<ChartFallback />}>
                <MetroCityBarChart
                  filteredData={filteredData}
                  chartContext={chartContext}
                />
              </Suspense>
            </Card>

            <Card
              ref={donutChartRef}
              title="Fuel Type Distribution"
              subtitle={chartContext.scopeLabel}
            >
              <Suspense fallback={<ChartFallback />}>
                <FuelTypeDonutChart filteredData={filteredData} />
              </Suspense>
            </Card>
          </>
        ) : null}
      </div>
    </main>
  )
}

export default App
