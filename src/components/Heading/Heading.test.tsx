import { render, screen } from '@testing-library/react'
import Heading from './Heading'
import type { sizes } from '@/const'
import type { ComponentProps } from 'react'

const text = 'Hello, world!'

describe('Heading', () => {
  it('renders the heading text', () => {
    render(<Heading>{text}</Heading>)
    expect(screen.getByRole('heading', { name: text })).toBeInTheDocument()
  })

  it.each<[ComponentProps<typeof Heading>['level'], string]>([
    [1, 'h1'],
    [2, 'h2'],
    [3, 'h3'],
    [4, 'h4'],
    [5, 'h5'],
    [6, 'h6']
  ])('renders the heading with level %s as %s', (level, expectedHeading) => {
    render(<Heading level={level}>{text}</Heading>)
    expect(screen.getByRole('heading', { level })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level }).tagName.toLowerCase()).toBe(
      expectedHeading
    )
  })

  it.each<[keyof typeof sizes, string]>([
    ['small', 'govuk-heading-s'],
    ['medium', 'govuk-heading-m'],
    ['large', 'govuk-heading-l'],
    ['extra-large', 'govuk-heading-xl']
  ])('renders with the %s size class', (size, expectedClassName) => {
    render(<Heading size={size}>{text}</Heading>)
    expect(screen.getByRole('heading')).toHaveClass(expectedClassName)
  })
})
