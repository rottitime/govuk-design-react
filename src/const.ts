/**
 * UI constants for style guideline
 * @see [GOV.UK Design System](https://design-system.service.gov.uk/styles/).
 *
 */

/**
 * UI constants for design attributes
 *
 * @see [GOV.UK Design System - Colour Palette](https://design-system.service.gov.uk/styles/colour/#colour-palette)
 */
export const colors = {
  red: '#d4351c',
  yellow: '#ffdd00',
  green: '#00703c',
  blue: '#1d70b8',
  'dark-blue': '#003078',
  'light-blue': '#5694ca',
  purple: '#4c2c92',
  black: '#0b0c0c',
  'dark-grey': '#505a5f',
  'mid-grey': '#b1b4b6',
  'light-grey': '#f3f2f1',
  white: '#ffffff',
  'light-purple': '#6f72af',
  'bright-purple': '#912b88',
  pink: '#d53880',
  'light-pink': '#f499be',
  orange: '#f47738',
  brown: '#b58840',
  'light-green': '#85994b',
  turquoise: '#28a197'
}

/**
 * An object that represents the available sizes.
 */
export const sizes = {
  small: 's',
  medium: 'm',
  large: 'l',
  'extra-large': 'xl'
} as const

/**
 * Represents the layout options for a component.
 */
export const layout = {
  full: 'full',
  'three-quarters': 'three-quarters',
  'two-thirds': 'two-thirds',
  'one-half': 'one-half',
  'one-third': 'one-third',
  'one-quarter': 'one-quarter'
} as const

/**
 * Defines the available colors for tags.
 *
 * For more information, see the [GOV.UK Design System documentation](https://design-system.service.gov.uk/components/tag/#additional-colours).
 */
export const tagColors = {
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
} as const

/*
export const statusColours = {
  initiated: 'pink',
  pending: 'blue',
  granted: 'green',
  declined: 'red',
  cancelled: 'orange',
  withdrawn: 'yellow',
  'no results found': 'orange',
  default: 'grey'
} as const
*/
