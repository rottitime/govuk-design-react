import { render, screen } from '@testing-library/react'
import Heading from './Heading'
import type { HeadingProps } from './Heading'
import type { sizes } from '@/const'

const text = 'Hello, world!'

describe('Heading', () => {
  it('renders the heading text', () => {
    render(<Heading>{text}</Heading>)
    expect(screen.getByRole('heading', { name: text })).toBeInTheDocument()
  })

  it.each<[HeadingProps['level'], string]>([
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

  it('uses `as` for the element type instead of `level`', () => {
    render(
      <Heading as="h2" level={1}>
        {text}
      </Heading>
    )
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2 }).tagName.toLowerCase()).toBe('h2')
  })

  it('renders caption and main text', () => {
    render(
      <Heading caption="Question 3 of 9" captionSize="large">
        Your details
      </Heading>
    )
    expect(screen.getByText('Question 3 of 9')).toBeInTheDocument()
    expect(screen.getByText('Your details')).toBeInTheDocument()
    expect(screen.getByText('Question 3 of 9')).toHaveClass('govuk-caption-l')
  })

  it('merges custom className with the govuk heading class', () => {
    render(<Heading className="my-extra">{text}</Heading>)
    const el = screen.getByRole('heading')
    expect(el).toHaveClass('govuk-heading-l')
    expect(el).toHaveClass('my-extra')
  })
})
