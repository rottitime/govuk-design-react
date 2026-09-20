import { render, screen } from '@testing-library/react'
import WarningText from './WarningText'

describe('WarningText', () => {
  it('renders children correctly', () => {
    render(<WarningText>You can be fined up to £5,000.</WarningText>)
    expect(screen.getByText('You can be fined up to £5,000.')).toBeInTheDocument()
  })

  it('applies the correct CSS class', () => {
    const { container } = render(<WarningText>Content</WarningText>)
    expect(container.firstChild).toHaveClass('govuk-warning-text')
  })

  it('renders the default visually hidden fallback text', () => {
    render(<WarningText>Content</WarningText>)
    expect(screen.getByText('Warning')).toHaveClass('govuk-visually-hidden')
  })

  it('supports a custom iconFallbackText', () => {
    render(<WarningText iconFallbackText="Important">Content</WarningText>)
    expect(screen.getByText('Important')).toHaveClass('govuk-visually-hidden')
  })

  it('renders the decorative icon hidden from assistive tech', () => {
    const { container } = render(<WarningText>Content</WarningText>)
    const icon = container.querySelector('.govuk-warning-text__icon')
    expect(icon).toHaveAttribute('aria-hidden', 'true')
    expect(icon).toHaveTextContent('!')
  })

  it('passes additional props correctly', () => {
    const { container } = render(
      <WarningText className="custom-class" data-testid="warning">
        Content
      </WarningText>
    )
    expect(container.firstChild).toHaveClass('govuk-warning-text', 'custom-class')
    expect(container.firstChild).toHaveAttribute('data-testid', 'warning')
  })
})
