import type { FuelPrice } from '../types/fuel'

const RETAIL_SELLING_PRICE_KEY =
  'Retail Selling Price (Rsp) Of Petrol And Diesel (UOM:INR/L(IndianRupeesperLitre)), Scaling Factor:1'

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
