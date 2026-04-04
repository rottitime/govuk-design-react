import { describe, expect, it } from 'vitest'
import { cx } from './cx'

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
})
