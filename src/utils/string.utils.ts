export const isExternalUrl = (url: string): boolean =>
  (url.startsWith('http://') || url.startsWith('https://')) && !url.startsWith('#')

export const capitalizeFirstLetter = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1)
