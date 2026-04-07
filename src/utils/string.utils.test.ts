/* eslint-disable no-constant-binary-expression */
import { capitalizeFirstLetter, cx, isExternalUrl } from './string.utils'

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

describe('cx', () => {
  it('joins string parts', () => {
    expect(cx('a', 'b')).toBe('a b')
  })

  it('omits undefined, null, false', () => {
    expect(cx('base', undefined, null, false, 'end')).toBe('base end')
  })

  it('flattens one level of arrays', () => {
    expect(cx(['a', 'b'], 'c')).toBe('a b c')
  })

  it('flattens nested arrays', () => {
    expect(cx(['a', ['b', 'c']], 'd')).toBe('a b c d')
  })

  it('trims and drops empty strings', () => {
    expect(cx('  a  ', '', '  ', 'b')).toBe('a b')
  })

  it('combines base className with extras', () => {
    const className = 'custom'
    expect(cx('govuk-input', className, true && 'govuk-input--error')).toBe(
      'govuk-input custom govuk-input--error'
    )
  })

  it('removes duplicate tokens', () => {
    expect(cx('a', 'a', 'b')).toBe('a b')
  })

  it('removes duplicates across arguments and inside strings', () => {
    expect(cx('govuk-input', 'govuk-input foo')).toBe('govuk-input foo')
  })

  it('returns undefined when there are no tokens', () => {
    expect(cx()).toBeUndefined()
    expect(cx(undefined, false, null)).toBeUndefined()
    expect(cx('')).toBeUndefined()
  })
})
