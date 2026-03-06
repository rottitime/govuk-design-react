import { render, screen } from '@testing-library/react'
import Radios from './Radios'

const defaultItems = [
  { value: 'england', label: 'England' },
  { value: 'scotland', label: 'Scotland' },
  { value: 'wales', label: 'Wales' },
  { value: 'ni', label: 'Northern Ireland' }
]

describe('Radios', () => {
  it('renders all radio items', () => {
    render(<Radios name="country" items={defaultItems} />)
    expect(screen.getAllByRole('radio')).toHaveLength(4)
  })

  it('renders labels for each radio', () => {
    render(<Radios name="country" items={defaultItems} />)
    expect(screen.getByLabelText('England')).toBeInTheDocument()
    expect(screen.getByLabelText('Scotland')).toBeInTheDocument()
  })

  it('renders with fieldset and legend', () => {
    render(
      <Radios
        name="country"
        items={defaultItems}
        fieldset={{ legend: 'Where do you live?' }}
      />
    )
    expect(
      screen.getByRole('group', { name: 'Where do you live?' })
    ).toBeInTheDocument()
  })

  it('renders hint text', () => {
    render(
      <Radios
        name="country"
        items={defaultItems}
        hint="Select one option"
      />
    )
    expect(screen.getByText('Select one option')).toBeInTheDocument()
  })

  it('renders error message', () => {
    render(
      <Radios
        name="country"
        items={defaultItems}
        errorMessage="Select a country"
      />
    )
    expect(screen.getByText('Select a country')).toBeInTheDocument()
  })

  it('renders inline variant', () => {
    const { container } = render(
      <Radios name="country" items={defaultItems} inline />
    )
    expect(container.querySelector('.govuk-radios')).toHaveClass(
      'govuk-radios--inline'
    )
  })

  it('renders item hints', () => {
    const items = [
      { value: 'a', label: 'Option A', hint: 'Description for A' }
    ]
    render(<Radios name="test" items={items} />)
    expect(screen.getByText('Description for A')).toBeInTheDocument()
  })

  it('renders divider', () => {
    const items = [
      { value: 'yes', label: 'Yes' },
      { type: 'divider' as const, text: 'or' },
      { value: 'no', label: 'No' }
    ]
    const { container } = render(<Radios name="answer" items={items} />)
    expect(container.querySelector('.govuk-radios__divider')).toHaveTextContent('or')
  })

  it('renders disabled radio', () => {
    const items = [
      { value: 'disabled', label: 'Disabled option', disabled: true }
    ]
    render(<Radios name="test" items={items} />)
    expect(screen.getByRole('radio')).toBeDisabled()
  })
})
