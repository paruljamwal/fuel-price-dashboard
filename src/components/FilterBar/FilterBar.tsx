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

function FilterBar() {
  return (
    <div className="filter-bar">
      <Select
        label="Month"
        placeholder="Select month"
        options={monthOptions}
      />
      <Select
        label="Fuel Type"
        placeholder="Select fuel type"
        options={fuelTypeOptions}
      />
      <Select
        label="Metro City"
        placeholder="Select metro city"
        options={metroCityOptions}
      />
      <button type="button" className="filter-reset" onClick={() => {}}>
        Reset Filters
      </button>
    </div>
  )
}

export default FilterBar
