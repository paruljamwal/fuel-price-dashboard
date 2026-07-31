import { useState } from 'react'
import { Download, Loader2, RotateCcw } from 'lucide-react'
import Button from '../Button/Button'
import Select from '../Select/Select'
import './FilterBar.css'

const monthOptions = [
  { value: 'january', label: 'January' },
  { value: 'february', label: 'February' },
  { value: 'march', label: 'March' },
  { value: 'april', label: 'April' },
  { value: 'may', label: 'May' },
  { value: 'june', label: 'June' },
  { value: 'july', label: 'July' },
  { value: 'august', label: 'August' },
  { value: 'september', label: 'September' },
  { value: 'october', label: 'October' },
  { value: 'november', label: 'November' },
  { value: 'december', label: 'December' },
]

const fuelTypeOptions = [
  { value: 'petrol', label: 'Petrol' },
  { value: 'diesel', label: 'Diesel' },
]

const metroCityOptions = [
  { value: 'delhi', label: 'Delhi' },
  { value: 'mumbai', label: 'Mumbai' },
  { value: 'chennai', label: 'Chennai' },
]

type FilterBarProps = {
  selectedMonth: string
  selectedFuelType: string
  selectedCity: string
  onMonthChange: (value: string) => void
  onFuelTypeChange: (value: string) => void
  onCityChange: (value: string) => void
  onReset: () => void
  onExportPdf: () => void
  isExportingPdf: boolean
}

function FilterBar({
  selectedMonth,
  selectedFuelType,
  selectedCity,
  onMonthChange,
  onFuelTypeChange,
  onCityChange,
  onReset,
  onExportPdf,
  isExportingPdf,
}: FilterBarProps) {
  const [isResetSpinning, setIsResetSpinning] = useState(false)

  const handleReset = () => {
    setIsResetSpinning(true)
    onReset()
  }

  return (
    <div className="filter-bar">
      <div className="filter-fields">
        <Select
          label="Month"
          placeholder="Select month"
          options={monthOptions}
          value={selectedMonth}
          onChange={onMonthChange}
        />
        <Select
          label="Fuel Type"
          placeholder="Select fuel type"
          options={fuelTypeOptions}
          value={selectedFuelType}
          onChange={onFuelTypeChange}
        />
        <Select
          label="Metro City"
          placeholder="Select metro city"
          options={metroCityOptions}
          value={selectedCity}
          onChange={onCityChange}
        />
      </div>

      <div className="filter-actions">
        <Button variant="outline" onClick={handleReset} disabled={isExportingPdf}>
          <RotateCcw
            aria-hidden="true"
            className={isResetSpinning ? 'filter-reset-icon is-spinning' : 'filter-reset-icon'}
            onAnimationEnd={() => setIsResetSpinning(false)}
          />
          Reset
        </Button>
        <Button
          variant="primary"
          onClick={onExportPdf}
          disabled={isExportingPdf}
          className="filter-export-pdf"
        >
          {isExportingPdf ? (
            <Loader2 aria-hidden="true" className="filter-export-spinner" />
          ) : (
            <Download aria-hidden="true" />
          )}
          <span>{isExportingPdf ? 'Exporting…' : 'Export'}</span>
        </Button>
      </div>
    </div>
  )
}

export default FilterBar
