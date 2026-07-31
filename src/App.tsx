import { useEffect, useMemo, useState } from 'react'
import Papa from 'papaparse'
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
import { normalizeFuelData } from './utils/normalizeFuelData'
import './App.css'

function loadFuelData(): FuelPrice[] {
  const result = Papa.parse<Record<string, string>>(retailFuelPricesCsv, {
    header: true,
    skipEmptyLines: true,
  })

  return normalizeFuelData(result.data)
}

function App() {
  const [fuelData] = useState(loadFuelData)
  const [selectedMonth, setSelectedMonth] = useState('')
  const [selectedFuelType, setSelectedFuelType] = useState('')
  const [selectedCity, setSelectedCity] = useState('')

  const filteredData = useMemo(() => {
    return fuelData.filter((row) => {
      const matchesMonth =
        !selectedMonth ||
        row.month.toLowerCase().includes(selectedMonth.toLowerCase())

      const matchesFuelType =
        !selectedFuelType ||
        row.product.toLowerCase() === selectedFuelType.toLowerCase()

      const matchesCity =
        !selectedCity ||
        row.metroCity.toLowerCase() === selectedCity.toLowerCase()

      return matchesMonth && matchesFuelType && matchesCity
    })
  }, [fuelData, selectedMonth, selectedFuelType, selectedCity])

  useEffect(() => {
    console.log(filteredData)
  }, [filteredData])

  const handleResetFilters = () => {
    setSelectedMonth('')
    setSelectedFuelType('')
    setSelectedCity('')
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
            selectedMonth={selectedMonth}
            selectedFuelType={selectedFuelType}
            selectedCity={selectedCity}
            onMonthChange={setSelectedMonth}
            onFuelTypeChange={setSelectedFuelType}
            onCityChange={setSelectedCity}
            onReset={handleResetFilters}
          />
        </Section>

        <Section title="Key Metrics">
          <KpiCards filteredData={filteredData} />
        </Section>

        <Card title="Monthly Retail Selling Price">
          <MonthlyTrendChart filteredData={filteredData} />
        </Card>

        <Card title="Fuel Price by Metro City">
          <MetroCityBarChart filteredData={filteredData} />
        </Card>

        <Card title="Fuel Type Distribution">
          <FuelTypeDonutChart filteredData={filteredData} />
        </Card>
      </div>
    </main>
  )
}

export default App
