import { render, screen } from '@testing-library/react'
import Heading from './Heading'
import type { sizes } from '@/const'

const text = 'Hello, world!'

describe('Heading', () => {
  it('renders the heading text', () => {
    render(<Heading>{text}</Heading>)
    expect(screen.getByRole('heading', { name: text })).toBeInTheDocument()
  })

  test.each<[keyof typeof sizes, string]>([
    ['small', 'govuk-heading-s'],
    ['medium', 'govuk-heading-m'],
    ['large', 'govuk-heading-l'],
    ['extra-large', 'govuk-heading-xl']
  ])('renders with the %s size class', (size, expectedClassName) => {
    render(<Heading size={size}>{text}</Heading>)
    expect(screen.getByRole('heading')).toHaveClass(expectedClassName)
  })
})
