import type { FuelPrice } from '../types/fuel'

export type FuelTypeDistributionPoint = {
  name: string
  value: number
  fill: string
}

const PETROL_COLOR = '#0F766E'
const DIESEL_COLOR = '#F97316'

// Count petrol vs diesel rows for the donut chart slices.
export function buildFuelTypeDistributionData(
  data: FuelPrice[],
): FuelTypeDistributionPoint[] {
  let petrolCount = 0
  let dieselCount = 0

  for (const row of data) {
    const product = row.product.toLowerCase()

    if (product === 'petrol') {
      petrolCount += 1
    }

    if (product === 'diesel') {
      dieselCount += 1
    }
  }

  const slices: FuelTypeDistributionPoint[] = []

  if (petrolCount > 0) {
    slices.push({ name: 'Petrol', value: petrolCount, fill: PETROL_COLOR })
  }

  if (dieselCount > 0) {
    slices.push({ name: 'Diesel', value: dieselCount, fill: DIESEL_COLOR })
  }

  return slices
}
