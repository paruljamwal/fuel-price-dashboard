import './Select.css'

type SelectOption = {
  value: string
  label: string
}

type SelectProps = {
  label: string
  placeholder: string
  options: SelectOption[]
}

function Select({ label, placeholder, options }: SelectProps) {
  return (
    <label className="select-field">
      <span className="select-label">{label}</span>
      <select className="select-input" defaultValue="">
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}

export default Select
