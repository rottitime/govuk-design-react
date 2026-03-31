import { render, screen } from '@testing-library/react'
import Fieldset from './Fieldset'

describe('Fieldset', () => {
  it('renders a fieldset with legend', () => {
    render(<Fieldset legend="What is your address?">Content</Fieldset>)
    expect(
      screen.getByRole('group', { name: 'What is your address?' })
    ).toBeInTheDocument()
  })

  it('renders children content', () => {
    render(<Fieldset legend="Legend">Field content here</Fieldset>)
    expect(screen.getByText('Field content here')).toBeInTheDocument()
  })

  it('applies the default legend size', () => {
    const { container } = render(
      <Fieldset legend="Legend">Content</Fieldset>
    )
    expect(container.querySelector('.govuk-fieldset__legend')).toHaveClass(
      'govuk-fieldset__legend--l'
    )
  })

  it('applies a custom legend size', () => {
    const { container } = render(
      <Fieldset legend="Legend" legendSize="xl">
        Content
      </Fieldset>
    )
    expect(container.querySelector('.govuk-fieldset__legend')).toHaveClass(
      'govuk-fieldset__legend--xl'
    )
  })

  it('wraps legend in h1 when legendIsHeading is true', () => {
    render(
      <Fieldset legend="Page heading" legendIsHeading>
        Content
      </Fieldset>
    )
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Page heading')
    expect(heading).toHaveClass('govuk-fieldset__heading')
  })

  it('does not wrap legend in h1 by default', () => {
    render(<Fieldset legend="Not a heading">Content</Fieldset>)
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })

  it('applies the correct CSS class', () => {
    const { container } = render(
      <Fieldset legend="Legend">Content</Fieldset>
    )
    expect(container.firstChild).toHaveClass('govuk-fieldset')
  })
})
