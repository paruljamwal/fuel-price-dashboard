import type { ReactNode } from 'react'
import BrandMark from '../../assets/BrandMark'
import './PageHeader.css'

type PageHeaderProps = {
  title: ReactNode
  subtitle: string
}

function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <header className="page-header">
      <div className="page-title-group">
        <BrandMark />
        <h1 className="page-title">{title}</h1>
      </div>
      <p className="page-subtitle">{subtitle}</p>
    </header>
  )
}

export default PageHeader
