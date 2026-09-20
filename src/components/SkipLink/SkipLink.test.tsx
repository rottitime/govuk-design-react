import { render, screen } from '@testing-library/react'
import SkipLink from './SkipLink'

describe('SkipLink', () => {
  it('renders the default text and target', () => {
    render(<SkipLink />)
    const link = screen.getByRole('link', { name: 'Skip to main content' })
    expect(link).toHaveAttribute('href', '#main-content')
  })

  it('applies the correct CSS class and data-module', () => {
    render(<SkipLink />)
    const link = screen.getByRole('link')
    expect(link).toHaveClass('govuk-skip-link')
    expect(link).toHaveAttribute('data-module', 'govuk-skip-link')
  })

  it('supports custom children and href', () => {
    render(<SkipLink href="#content">Skip to content</SkipLink>)
    const link = screen.getByRole('link', { name: 'Skip to content' })
    expect(link).toHaveAttribute('href', '#content')
  })

  it('passes additional props correctly', () => {
    render(
      <SkipLink className="custom-class" data-testid="skip">
        Skip
      </SkipLink>
    )
    const link = screen.getByTestId('skip')
    expect(link).toHaveClass('govuk-skip-link', 'custom-class')
  })
})
