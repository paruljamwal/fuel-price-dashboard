import './Select.css'

type SelectOption = {
  value: string
  label: string
}

type SelectProps = {
  label: string
  placeholder: string
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
}

function Select({
  label,
  placeholder,
  options,
  value,
  onChange,
}: SelectProps) {
  return (
    <label className="select-field">
      <span className="select-label">{label}</span>
      <select
        className="select-input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
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
