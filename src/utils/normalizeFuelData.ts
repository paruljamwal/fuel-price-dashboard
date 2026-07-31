import Papa from 'papaparse'
import type { FuelPrice } from '../types/fuel'

const FUEL_DATA_URL = '/data/retail-fuel-prices.csv'

const RETAIL_SELLING_PRICE_KEY =
  'Retail Selling Price (Rsp) Of Petrol And Diesel (UOM:INR/L(IndianRupeesperLitre)), Scaling Factor:1'

// Map raw CSV columns into a consistent FuelPrice shape.
export function normalizeFuelData(
  rows: Record<string, string>[],
): FuelPrice[] {
  return rows.map((row) => {
    const price = Number(row[RETAIL_SELLING_PRICE_KEY]?.trim())

    return {
      country: row.Country?.trim() ?? '',
      financialYear: row.Year?.trim() ?? '',
      month: row.Month?.trim() ?? '',
      calendarDay: row['Calendar Day']?.trim() ?? '',
      product: row['Products ']?.trim() ?? '',
      metroCity: row['Metro Cities']?.trim() ?? '',
      retailSellingPrice: Number.isFinite(price) ? price : 0,
    }
  })
}

// Fetch the public CSV and normalize rows for the dashboard.
export async function loadFuelData(
  url = FUEL_DATA_URL,
): Promise<FuelPrice[]> {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to load fuel data (${response.status})`)
  }

  const csv = await response.text()
  const result = Papa.parse<Record<string, string>>(csv, {
    header: true,
    skipEmptyLines: true,
  })

  return normalizeFuelData(result.data)
}
