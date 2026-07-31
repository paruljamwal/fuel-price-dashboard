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
}

function FilterBar({
  selectedMonth,
  selectedFuelType,
  selectedCity,
  onMonthChange,
  onFuelTypeChange,
  onCityChange,
  onReset,
}: FilterBarProps) {
  return (
    <div className="filter-bar">
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
      <button type="button" className="filter-reset" onClick={onReset}>
        Reset Filters
      </button>
    </div>
  )
}

export default FilterBar
