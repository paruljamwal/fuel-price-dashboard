import type { FuelPrice } from '../types/fuel'

const CSV_HEADERS = [
  'Calendar Day',
  'Month',
  'Metro City',
  'Fuel Type',
  'Retail Selling Price',
  'Country',
] as const

function escapeCsvValue(value: string | number | null | undefined): string {
  if (value === null || value === undefined) {
    return '""'
  }

  const stringValue = String(value)
  const escaped = stringValue.replaceAll('"', '""')

  return `"${escaped}"`
}

function formatExportDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function buildCsvContent(data: FuelPrice[]): string {
  const rows = data.map((row) =>
    [
      escapeCsvValue(row.calendarDay),
      escapeCsvValue(row.month),
      escapeCsvValue(row.metroCity),
      escapeCsvValue(row.product),
      escapeCsvValue(row.retailSellingPrice),
      escapeCsvValue(row.country),
    ].join(','),
  )

  return [CSV_HEADERS.join(','), ...rows].join('\n')
}

// Trigger a CSV download of the filtered rows in the browser.
export function exportFilteredFuelCsv(data: FuelPrice[]): void {
  if (data.length === 0) {
    return
  }

  const csvContent = buildCsvContent(data)
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const objectUrl = URL.createObjectURL(blob)
  const filename = `fuel-price-data-${formatExportDate(new Date())}.csv`

  const link = document.createElement('a')
  link.href = objectUrl
  link.download = filename
  link.style.display = 'none'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  URL.revokeObjectURL(objectUrl)
}
