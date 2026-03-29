import { render, screen } from '@testing-library/react'
import Select from './Select'

const defaultOptions = [
  { value: '', label: 'Select an option' },
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' }
]

describe('Select', () => {
  it('renders with label and options', () => {
    render(
      <Select id="sort" name="sort" label="Sort by" options={defaultOptions} />
    )
    expect(screen.getByLabelText('Sort by')).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('renders all options', () => {
    render(
      <Select id="sort" name="sort" label="Sort by" options={defaultOptions} />
    )
    expect(screen.getAllByRole('option')).toHaveLength(3)
  })

  it('renders with hint text', () => {
    render(
      <Select
        id="sort"
        name="sort"
        label="Sort by"
        hint="Choose how to sort results"
        options={defaultOptions}
      />
    )
    expect(
      screen.getByText('Choose how to sort results')
    ).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toHaveAttribute(
      'aria-describedby',
      'sort-hint'
    )
  })

  it('renders with error message', () => {
    render(
      <Select
        id="sort"
        name="sort"
        label="Sort by"
        errorMessage="Please choose a valid option"
        options={defaultOptions}
      />
    )
    expect(
      screen.getByText('Please choose a valid option')
    ).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toHaveClass('govuk-select--error')
  })

  it('applies error class to form group', () => {
    const { container } = render(
      <Select
        id="sort"
        name="sort"
        label="Sort by"
        errorMessage="Required"
        options={defaultOptions}
      />
    )
    expect(container.firstChild).toHaveClass('govuk-form-group--error')
  })

  it('renders disabled options', () => {
    const options = [
      { value: '', label: 'Select', disabled: true },
      { value: 'a', label: 'Option A' }
    ]
    render(
      <Select id="test" name="test" label="Test" options={options} />
    )
    expect(screen.getByText('Select')).toBeDisabled()
  })

  it('applies the correct CSS class', () => {
    render(
      <Select id="sort" name="sort" label="Sort by" options={defaultOptions} />
    )
    expect(screen.getByRole('combobox')).toHaveClass('govuk-select')
  })
})
