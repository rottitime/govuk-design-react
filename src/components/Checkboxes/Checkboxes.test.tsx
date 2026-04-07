import { render, screen, fireEvent } from '@testing-library/react'
import Checkboxes from './Checkboxes'

const basicItems = [
  { id: 'c1', label: 'One', value: '1' },
  { id: 'c2', label: 'Two', value: '2' }
]

describe('Checkboxes', () => {
  it('renders legend and checkboxes', () => {
    render(
      <Checkboxes name="test" legend="Pick options" items={basicItems} />
    )
    expect(screen.getByRole('group', { name: /pick options/i })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: 'One' })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: 'Two' })).toBeInTheDocument()
  })

  it('uses the group name on inputs', () => {
    render(<Checkboxes name="waste" legend="Waste" items={basicItems} />)
    expect(screen.getByRole('checkbox', { name: 'One' })).toHaveAttribute('name', 'waste')
  })

  it('renders hint and links fieldset with aria-describedby', () => {
    render(
      <Checkboxes
        name="test"
        legend="Question"
        hint="Select all that apply"
        items={basicItems}
      />
    )
    const group = screen.getByRole('group', { name: /question/i })
    const hint = screen.getByText('Select all that apply')
    expect(hint).toHaveClass('govuk-hint')
    expect(group).toHaveAttribute('aria-describedby', hint.id)
  })

  it('renders error message and includes its id in aria-describedby', () => {
    render(
      <Checkboxes
        name="test"
        legend="Question"
        error="Choose an option"
        items={basicItems}
      />
    )
    const group = screen.getByRole('group', { name: /question/i })
    expect(screen.getByText(/choose an option/i)).toBeInTheDocument()
    const describedBy = group.getAttribute('aria-describedby') ?? ''
    expect(describedBy).toMatch(/checkboxes-/)
    expect(describedBy.length).toBeGreaterThan(0)
  })

  it('applies small modifier', () => {
    const { container } = render(
      <Checkboxes name="t" legend="Filter" small items={basicItems} />
    )
    expect(container.querySelector('.govuk-checkboxes--small')).toBeInTheDocument()
  })

  it('renders a divider and exclusive option', () => {
    render(
      <Checkboxes
        name="waste"
        legend="Types"
        items={[
          { id: 'a', label: 'A', value: 'a' },
          { divider: true, text: 'or' },
          { id: 'none', label: 'None', value: 'none', exclusive: true }
        ]}
      />
    )
    expect(screen.getByText('or')).toHaveClass('govuk-checkboxes__divider')
    const none = screen.getByRole('checkbox', { name: 'None' })
    expect(none).toHaveAttribute('data-behaviour', 'exclusive')
  })

  it('when exclusive is checked, unchecks other options with the same name', () => {
    render(
      <Checkboxes
        name="waste"
        legend="Types"
        items={[
          { id: 'a', label: 'A', value: 'a' },
          { id: 'b', label: 'B', value: 'b' },
          { divider: true },
          { id: 'none', label: 'None', value: 'none', exclusive: true }
        ]}
      />
    )
    const a = screen.getByRole('checkbox', { name: 'A' })
    const b = screen.getByRole('checkbox', { name: 'B' })
    const none = screen.getByRole('checkbox', { name: 'None' })

    fireEvent.click(a)
    fireEvent.click(b)
    expect(a).toBeChecked()
    expect(b).toBeChecked()

    fireEvent.click(none)
    expect(none).toBeChecked()
    expect(a).not.toBeChecked()
    expect(b).not.toBeChecked()
  })

  it('when a non-exclusive option is checked, unchecks the exclusive option', () => {
    render(
      <Checkboxes
        name="waste"
        legend="Types"
        items={[
          { id: 'a', label: 'A', value: 'a' },
          { divider: true },
          { id: 'none', label: 'None', value: 'none', exclusive: true }
        ]}
      />
    )
    const a = screen.getByRole('checkbox', { name: 'A' })
    const none = screen.getByRole('checkbox', { name: 'None' })

    fireEvent.click(none)
    expect(none).toBeChecked()

    fireEvent.click(a)
    expect(a).toBeChecked()
    expect(none).not.toBeChecked()
  })

  it('renders item hint and aria-describedby on the input', () => {
    render(
      <Checkboxes
        name="g"
        legend="Sign in"
        items={[
          {
            id: 'gw',
            name: 'gateway',
            label: 'Gateway',
            value: 'gw',
            hint: 'Hint text for this item'
          }
        ]}
      />
    )
    const input = screen.getByRole('checkbox', { name: 'Gateway' })
    const hintId = input.getAttribute('aria-describedby')
    expect(hintId).toBe('gw-item-hint')
    expect(document.getElementById(hintId!)).toHaveTextContent('Hint text for this item')
  })

  it('sets data-aria-controls when conditional content is provided', () => {
    render(
      <Checkboxes
        name="c"
        legend="Contact"
        items={[
          {
            id: 'email',
            label: 'Email',
            value: 'email',
            conditional: <span>Extra</span>
          }
        ]}
      />
    )
    expect(screen.getByRole('checkbox', { name: 'Email' })).toHaveAttribute(
      'data-aria-controls',
      'conditional-email'
    )
    expect(document.getElementById('conditional-email')).toHaveClass('govuk-checkboxes__conditional')
  })

  it('toggles conditional hidden class when checked is controlled', () => {
    const noop = vi.fn()
    const { rerender } = render(
      <Checkboxes
        name="c"
        legend="Contact"
        items={[
          {
            id: 'email',
            label: 'Email',
            value: 'email',
            checked: false,
            onChange: noop,
            conditional: <span>Extra</span>
          }
        ]}
      />
    )
    let panel = document.getElementById('conditional-email')
    expect(panel).toHaveClass('govuk-checkboxes__conditional--hidden')

    rerender(
      <Checkboxes
        name="c"
        legend="Contact"
        items={[
          {
            id: 'email',
            label: 'Email',
            value: 'email',
            checked: true,
            onChange: noop,
            conditional: <span>Extra</span>
          }
        ]}
      />
    )
    panel = document.getElementById('conditional-email')
    expect(panel).not.toHaveClass('govuk-checkboxes__conditional--hidden')
  })

  it('calls onChange when a checkbox is toggled', () => {
    const handleChange = vi.fn()
    render(
      <Checkboxes
        name="t"
        legend="Q"
        items={[{ id: 'x', label: 'Tick', value: 'yes', onChange: handleChange }]}
      />
    )
    fireEvent.click(screen.getByRole('checkbox', { name: 'Tick' }))
    expect(handleChange).toHaveBeenCalled()
  })
})
