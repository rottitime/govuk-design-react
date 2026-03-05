import { render, screen } from '@testing-library/react'
import InsetText from './InsetText'

describe('InsetText', () => {
  it('renders children correctly', () => {
    render(<InsetText>It can take up to 8 weeks to renew your passport.</InsetText>)
    expect(
      screen.getByText('It can take up to 8 weeks to renew your passport.')
    ).toBeInTheDocument()
  })

  it('applies the correct CSS class', () => {
    const { container } = render(<InsetText>Content</InsetText>)
    expect(container.firstChild).toHaveClass('govuk-inset-text')
  })

  it('renders HTML children', () => {
    render(
      <InsetText>
        <p>First paragraph</p>
        <p>Second paragraph</p>
      </InsetText>
    )
    expect(screen.getByText('First paragraph')).toBeInTheDocument()
    expect(screen.getByText('Second paragraph')).toBeInTheDocument()
  })

  it('passes additional props correctly', () => {
    const { container } = render(
      <InsetText className="custom-class" data-testid="inset">
        Content
      </InsetText>
    )
    expect(container.firstChild).toHaveClass('govuk-inset-text', 'custom-class')
    expect(container.firstChild).toHaveAttribute('data-testid', 'inset')
  })
})
