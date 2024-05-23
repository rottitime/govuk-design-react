import { isExternalUrl } from './string.utils'

describe('isExternalUrl', () => {
  it('should return true for external URLs starting with http://', () => {
    expect(isExternalUrl('http://www.example.com')).toBeTruthy()
    expect(isExternalUrl('http://github.com')).toBeTruthy()
  })

  it('should return true for external URLs starting with https://', () => {
    expect(isExternalUrl('https://www.example.com')).toBeTruthy()
    expect(isExternalUrl('https://github.com')).toBeTruthy()
  })

  it('should return false for URLs starting with #', () => {
    expect(isExternalUrl('#section1')).toBeFalsy()
    expect(isExternalUrl('#top')).toBeFalsy()
  })

  it('should return false for empty string', () => {
    expect(isExternalUrl('')).toBeFalsy()
  })
})
