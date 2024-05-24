import { capitalizeFirstLetter, isExternalUrl } from './string.utils'

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

describe('capitalizeFirstLetter', () => {
  it.each`
    input        | expected
    ${'hello'}   | ${'Hello'}
    ${'world'}   | ${'World'}
    ${'foo bar'} | ${'Foo bar'}
    ${'123'}     | ${'123'}
    ${'!@#$'}    | ${'!@#$'}
    ${''}        | ${''}
  `('should capitalize the first letter of "$input"', ({ input, expected }) => {
    const result = capitalizeFirstLetter(input)
    expect(result).toBe(expected)
  })
})
