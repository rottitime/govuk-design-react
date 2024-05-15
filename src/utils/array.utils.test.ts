import { insertIf } from './array.utils'

describe('insertIf', () => {
  it('should return an empty array if the condition is false', () => {
    const result = insertIf(false, 'element1', 'element2')
    expect(result).toEqual([])
  })

  it('should return an array with the elements if the condition is true', () => {
    const result = insertIf(true, 'element1', 'element2')
    expect(result).toEqual(['element1', 'element2'])
  })

  it('should return an empty array if no elements are provided', () => {
    const result = insertIf(true)
    expect(result).toEqual([])
  })
})
