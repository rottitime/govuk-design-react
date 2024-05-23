export const isExternalUrl = (url: string): boolean =>
  (url.startsWith('http://') || url.startsWith('https://')) && !url.startsWith('#')
