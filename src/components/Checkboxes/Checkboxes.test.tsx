import { render, screen } from '@testing-library/react'
import Checkboxes from './Checkboxes'

const defaultItems = [
  { value: 'england', label: 'England' },
  { value: 'scotland', label: 'Scotland' },
  { value: 'wales', label: 'Wales' },
  { value: 'ni', label: 'Northern Ireland' }
]

describe('Checkboxes', () => {
  it('renders all checkbox items', () => {
    render(<Checkboxes name="countries" items={defaultItems} />)
    expect(screen.getByLabelText('England')).toBeInTheDocument()
    expect(screen.getByLabelText('Scotland')).toBeInTheDocument()
    expect(screen.getByLabelText('Wales')).toBeInTheDocument()
    expect(screen.getByLabelText('Northern Ireland')).toBeInTheDocument()
  })

  it('renders checkboxes as type checkbox', () => {
    render(<Checkboxes name="countries" items={defaultItems} />)
    const checkbox = screen.getByLabelText('England')
    expect(checkbox).toHaveAttribute('type', 'checkbox')
  })

  it('renders fieldset with legend', () => {
    render(
      <Checkboxes
        name="countries"
        items={defaultItems}
        fieldsetLegend="Where do you live?"
      />
    )
    expect(screen.getByText('Where do you live?')).toBeInTheDocument()
    expect(screen.getByRole('group')).toBeInTheDocument()
  })

  it('renders legend as page heading when specified', () => {
    render(
      <Checkboxes
        name="countries"
        items={defaultItems}
        fieldsetLegend="Where do you live?"
        fieldsetLegendIsPageHeading
      />
    )
    expect(
      screen.getByRole('heading', { name: 'Where do you live?' })
    ).toBeInTheDocument()
  })

  it('renders hint text', () => {
    render(
      <Checkboxes
        name="countries"
        items={defaultItems}
        hint="Select all that apply"
      />
    )
    expect(screen.getByText('Select all that apply')).toBeInTheDocument()
  })

  it('renders error message', () => {
    render(
      <Checkboxes
        name="countries"
        items={defaultItems}
        errorMessage="Select at least one country"
      />
    )
    expect(
      screen.getByText('Select at least one country')
    ).toBeInTheDocument()
  })

  it('renders divider between items', () => {
    render(
      <Checkboxes
        name="countries"
        items={[
          { value: 'england', label: 'England' },
          { divider: 'or' },
          { value: 'none', label: 'None of the above' }
        ]}
      />
    )
    expect(screen.getByText('or')).toBeInTheDocument()
  })

  it('renders item with hint', () => {
    render(
      <Checkboxes
        name="countries"
        items={[
          {
            value: 'england',
            label: 'England',
            hint: 'Including the Channel Islands'
          }
        ]}
      />
    )
    expect(
      screen.getByText('Including the Channel Islands')
    ).toBeInTheDocument()
  })

  it('renders small checkboxes', () => {
    const { container } = render(
      <Checkboxes name="countries" items={defaultItems} small />
    )
    expect(
      container.querySelector('.govuk-checkboxes--small')
    ).toBeInTheDocument()
  })

  it('renders disabled checkbox', () => {
    render(
      <Checkboxes
        name="countries"
        items={[{ value: 'disabled', label: 'Disabled', disabled: true }]}
      />
    )
    expect(screen.getByLabelText('Disabled')).toBeDisabled()
  })

  it('renders pre-checked checkbox', () => {
    render(
      <Checkboxes
        name="countries"
        items={[{ value: 'england', label: 'England', checked: true }]}
      />
    )
    expect(screen.getByLabelText('England')).toBeChecked()
  })

  it('renders conditional content hidden when checkbox is not checked', () => {
    render(
      <Checkboxes
        name="countries"
        items={[
          {
            value: 'england',
            label: 'England',
            conditional: <span>More details about England</span>
          }
        ]}
      />
    )

    const conditionalContent = screen.getByText('More details about England')
    const conditionalContainer = conditionalContent.closest('div')
    expect(conditionalContainer).toHaveClass('govuk-checkboxes__conditional')
    expect(conditionalContainer).toHaveClass(
      'govuk-checkboxes__conditional--hidden'
    )
  })

  it('renders conditional content visible when checkbox is pre-checked', () => {
    render(
      <Checkboxes
        name="countries"
        items={[
          {
            value: 'england',
            label: 'England',
            checked: true,
            conditional: <span>More details about England</span>
          }
        ]}
      />
    )

    const conditionalContent = screen.getByText('More details about England')
    const conditionalContainer = conditionalContent.closest('div')
    expect(conditionalContainer).toHaveClass('govuk-checkboxes__conditional')
    expect(conditionalContainer).not.toHaveClass(
      'govuk-checkboxes__conditional--hidden'
    )
  })

  it('wires data-aria-controls to conditional container id', () => {
    render(
      <Checkboxes
        name="countries"
        items={[
          {
            value: 'england',
            label: 'England',
            conditional: <span>More details</span>
          }
        ]}
      />
    )

    const conditionalDiv = screen.getByText('More details').closest('div')
    const conditionalId = conditionalDiv?.getAttribute('id')
    expect(conditionalId).toBeTruthy()

    const checkbox = screen.getByLabelText('England')
    expect(checkbox).toHaveAttribute('data-aria-controls', conditionalId)
  })
})
