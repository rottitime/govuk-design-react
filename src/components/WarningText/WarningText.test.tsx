import { render, screen } from '@testing-library/react'
import WarningText from './WarningText'

describe('WarningText', () => {
  it('renders warning text content', () => {
    render(<WarningText>You can be fined up to £5,000</WarningText>)
    expect(
      screen.getByText('You can be fined up to £5,000')
    ).toBeInTheDocument()
  })

  it('renders the warning icon', () => {
    render(<WarningText>Test warning</WarningText>)
    expect(screen.getByText('!')).toHaveAttribute('aria-hidden', 'true')
  })

  it('renders default assistive text', () => {
    render(<WarningText>Test warning</WarningText>)
    expect(screen.getByText('Warning')).toHaveClass('govuk-visually-hidden')
  })

  it('renders custom assistive text', () => {
    render(
      <WarningText assistiveText="Important">Test warning</WarningText>
    )
    expect(screen.getByText('Important')).toHaveClass(
      'govuk-visually-hidden'
    )
  })

  it('applies the correct CSS classes', () => {
    const { container } = render(<WarningText>Test</WarningText>)
    expect(container.firstChild).toHaveClass('govuk-warning-text')
  })

  it('passes additional props correctly', () => {
    const { container } = render(
      <WarningText className="custom-class">Test</WarningText>
    )
    expect(container.firstChild).toHaveClass(
      'govuk-warning-text',
      'custom-class'
    )
  })
})
