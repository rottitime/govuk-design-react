import { fireEvent, render, screen } from '@testing-library/react'
import Radios from './Radios'

const items = [
  { id: 'where-you-live', label: 'England', value: 'england' },
  { id: 'where-you-live-2', label: 'Scotland', value: 'scotland' },
  { id: 'where-you-live-3', label: 'Wales', value: 'wales' }
]

describe('Radios', () => {
  it('renders the legend and all options', () => {
    render(<Radios name="where" legend="Where do you live?" items={items} />)
    expect(screen.getByText('Where do you live?')).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'England' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'Scotland' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'Wales' })).toBeInTheDocument()
  })

  it('gives all radios the same shared name', () => {
    render(<Radios name="where" legend="Where?" items={items} />)
    screen.getAllByRole('radio').forEach((radio) => {
      expect(radio).toHaveAttribute('name', 'where')
    })
  })

  it('applies the govuk-radios wrapper and data-module', () => {
    const { container } = render(
      <Radios name="where" legend="Where?" items={items} />
    )
    const group = container.querySelector('.govuk-radios')
    expect(group).toHaveAttribute('data-module', 'govuk-radios')
  })

  it('renders a hint and wires aria-describedby', () => {
    const { container } = render(
      <Radios name="where" legend="Where?" hint="Select one option" items={items} />
    )
    const fieldset = container.querySelector('fieldset')
    const hint = screen.getByText('Select one option')
    expect(fieldset?.getAttribute('aria-describedby')).toContain(hint.id)
  })

  it('renders an error message and error styling', () => {
    const { container } = render(
      <Radios name="where" legend="Where?" error="Select where you live" items={items} />
    )
    expect(container.firstChild).toHaveClass('govuk-form-group--error')
    expect(screen.getByText('Select where you live')).toBeInTheDocument()
  })

  it('supports the small and inline modifiers', () => {
    const { container } = render(
      <Radios name="where" legend="Where?" small inline items={items} />
    )
    const group = container.querySelector('.govuk-radios')
    expect(group).toHaveClass('govuk-radios--small', 'govuk-radios--inline')
  })

  it('renders a divider', () => {
    render(
      <Radios
        name="where"
        legend="Where?"
        items={[...items, { divider: true, text: 'or' }, { id: 'abroad', label: 'Abroad', value: 'abroad' }]}
      />
    )
    expect(screen.getByText('or')).toHaveClass('govuk-radios__divider')
  })

  it('fires onChange when an option is selected', () => {
    const onChange = vi.fn()
    render(
      <Radios
        name="where"
        legend="Where?"
        items={[{ id: 'england', label: 'England', value: 'england', onChange }]}
      />
    )
    fireEvent.click(screen.getByRole('radio', { name: 'England' }))
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('renders a conditional reveal panel, hidden until selected', () => {
    const { container } = render(
      <Radios
        name="contact"
        legend="How?"
        items={[
          {
            id: 'email',
            label: 'Email',
            value: 'email',
            conditional: <p>Email address</p>
          }
        ]}
      />
    )
    const panel = container.querySelector('.govuk-radios__conditional')
    expect(panel).toHaveClass('govuk-radios__conditional--hidden')
    expect(screen.getByText('Email address')).toBeInTheDocument()
  })
})
