import type { DateDigit } from '@/types'

// UI constants for the design system
// Documentation: https://design-system.service.gov.uk/styles/

export const sizes = {
  small: 's',
  medium: 'm',
  large: 'l',
  'extra-large': 'xl'
} as const

export const layout = {
  full: 'full',
  'three-quarters': 'three-quarters',
  'two-thirds': 'two-thirds',
  'one-half': 'one-half',
  'one-third': 'one-third',
  'one-quarter': 'one-quarter'
} as const

export const statusColors = {
  grey: 'grey',
  green: 'green',
  turquoise: 'turquoise',
  blue: 'blue',
  light: 'light',
  purple: 'purple',
  pink: 'pink',
  red: 'red',
  orange: 'orange',
  yellow: 'yellow'
}

// Component specific
type DateLabels = Record<DateDigit, string>

export const labelsDate: DateLabels = {
  dd: 'Day',
  mm: 'Month',
  yyyy: 'Year'
} as const
