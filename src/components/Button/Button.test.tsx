import { render, screen } from '@testing-library/react'
import Button from '@/components/Button/Button'

const text = 'Click me'

describe('Button', () => {
  it('renders a button element', () => {
    render(<Button>{text}</Button>)
    const buttonElement = screen.getByRole('button', { name: text })
    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement).toHaveClass('govuk-button')
  })

  it('renders a warning button when warning prop is true', () => {
    const name = 'Warning'
    render(<Button warning>{name}</Button>)

    expect(screen.getByRole('button', { name })).toHaveClass(
      'govuk-button govuk-button--warning'
    )
  })

  it.skip('renders a link button when href prop is provided', () => {
    render(<Button href="https://example.com">Go to example.com</Button>)
    const buttonElement = screen.getByRole('link')
    expect(buttonElement).toHaveAttribute('href', 'https://example.com')
  })

  it('renders a secondary button when secondary prop is true', () => {
    const name = 'Secondary'
    render(<Button secondary>{name}</Button>)
    expect(screen.getByRole('button', { name })).toHaveClass(
      'govuk-button govuk-button--secondary'
    )
  })
})
