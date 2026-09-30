import { render, screen } from '@testing-library/react'
import Fieldset from './Fieldset'

describe('Fieldset', () => {
  it('renders the legend and children', () => {
    render(
      <Fieldset legend="What is your address?">
        <p>Field controls</p>
      </Fieldset>
    )
    expect(screen.getByText('What is your address?')).toBeInTheDocument()
    expect(screen.getByText('Field controls')).toBeInTheDocument()
  })

  it('applies the correct CSS classes', () => {
    const { container } = render(<Fieldset legend="Legend" />)
    expect(container.firstChild).toHaveClass('govuk-fieldset')
    expect(screen.getByText('Legend')).toHaveClass(
      'govuk-fieldset__legend',
      'govuk-fieldset__legend--m'
    )
  })

  it('supports different legend sizes', () => {
    render(<Fieldset legend="Large" size="large" />)
    expect(screen.getByText('Large')).toHaveClass('govuk-fieldset__legend--l')
  })

  it('renders the legend as a page heading', () => {
    render(<Fieldset legend="Page title" legendAsPageHeading />)
    const heading = screen.getByRole('heading', { level: 1, name: 'Page title' })
    expect(heading).toHaveClass('govuk-fieldset__heading')
  })

  it('passes additional props correctly', () => {
    const { container } = render(
      <Fieldset legend="Legend" className="custom-class" data-testid="fieldset" />
    )
    expect(container.firstChild).toHaveClass('govuk-fieldset', 'custom-class')
    expect(container.firstChild).toHaveAttribute('data-testid', 'fieldset')
  })
})
