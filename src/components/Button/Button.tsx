import type { ButtonHTMLAttributes, ReactNode } from 'react'
import './Button.css'

type ButtonVariant = 'primary' | 'outline'

type ButtonProps = {
  children: ReactNode
  onClick?: () => void
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  disabled?: boolean
  className?: string
  variant?: ButtonVariant
}

function Button({
  children,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  variant = 'outline',
}: ButtonProps) {
  const classes = ['app-button', `app-button--${variant}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
