import { render, screen } from '@testing-library/react'
import SkipLink from './SkipLink'

describe('SkipLink', () => {
  it('renders with default text and href', () => {
    render(<SkipLink />)
    const link = screen.getByRole('link', { name: 'Skip to main content' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '#content')
  })

  it('renders with custom href', () => {
    render(<SkipLink href="#main" />)
    expect(screen.getByRole('link')).toHaveAttribute('href', '#main')
  })

  it('renders with custom children', () => {
    render(<SkipLink>Skip navigation</SkipLink>)
    expect(
      screen.getByRole('link', { name: 'Skip navigation' })
    ).toBeInTheDocument()
  })

  it('applies the correct CSS class', () => {
    render(<SkipLink />)
    expect(screen.getByRole('link')).toHaveClass('govuk-skip-link')
  })

  it('includes the data-module attribute', () => {
    render(<SkipLink />)
    expect(screen.getByRole('link')).toHaveAttribute(
      'data-module',
      'govuk-skip-link'
    )
  })

  it('passes additional props', () => {
    render(<SkipLink className="custom" data-testid="skip" />)
    const link = screen.getByRole('link')
    expect(link).toHaveClass('govuk-skip-link', 'custom')
    expect(link).toHaveAttribute('data-testid', 'skip')
  })
})
