import { X } from 'lucide-react'
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
  const hasValue = value !== ''

  return (
    <label className="select-field">
      <span className="select-label">{label}</span>
      <div className="select-control">
        <select
          className={
            hasValue ? 'select-input select-input-clearable' : 'select-input'
          }
          value={value}
          onChange={(event) => onChange(event.target.value)}
        >
          <option value="" disabled={hasValue}>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {hasValue ? (
          <button
            type="button"
            className="select-clear"
            aria-label={`Clear ${label}`}
            onClick={(event) => {
              // Clear this filter without opening the native select menu.
              event.preventDefault()
              event.stopPropagation()
              onChange('')
            }}
          >
            <X aria-hidden="true" size={14} strokeWidth={2.5} />
          </button>
        ) : null}
      </div>
    </label>
  )
}

export default Select
