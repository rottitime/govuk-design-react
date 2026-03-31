import { render, screen } from '@testing-library/react'
import BackLink from './BackLink'

describe('BackLink', () => {
  it('renders a link with default text', () => {
    render(<BackLink href="/previous" />)
    const link = screen.getByRole('link', { name: 'Back' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/previous')
  })

  it('renders with custom href', () => {
    render(<BackLink href="/previous-page" />)
    expect(screen.getByRole('link', { name: 'Back' })).toHaveAttribute(
      'href',
      '/previous-page'
    )
  })

  it('renders with custom children', () => {
    render(<BackLink href="/back">Go back</BackLink>)
    expect(screen.getByRole('link', { name: 'Go back' })).toBeInTheDocument()
  })

  it('applies the correct CSS class', () => {
    render(<BackLink href="/back" />)
    expect(screen.getByRole('link')).toHaveClass('govuk-back-link')
  })

  it('passes additional props', () => {
    render(
      <BackLink href="/back" className="custom-class" data-testid="back" />
    )
    const link = screen.getByTestId('back')
    expect(link).toHaveClass('govuk-back-link', 'custom-class')
    expect(link).toHaveAttribute('data-testid', 'back')
  })
})
