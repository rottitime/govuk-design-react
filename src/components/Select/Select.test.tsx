import { render, screen, fireEvent } from '@testing-library/react'
import Select from './Select'
import { createRef } from 'react'
import type { ChangeEvent } from 'react'

const options = [
  { label: 'One', value: '1' },
  { label: 'Two', value: '2' }
]

describe('Select', () => {
  it('renders a select with options', () => {
    render(<Select options={options} aria-label="Test select" />)
    const select = screen.getByRole('combobox', { name: /test select/i })
    expect(select).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'One' })).toHaveValue('1')
    expect(screen.getByRole('option', { name: 'Two' })).toHaveValue('2')
  })

  it('applies govuk-select class', () => {
    render(<Select options={options} aria-label="Test" />)
    expect(screen.getByRole('combobox')).toHaveClass('govuk-select')
  })

  it('applies error class when error prop is true', () => {
    render(<Select options={options} error aria-label="Test" />)
    expect(screen.getByRole('combobox')).toHaveClass('govuk-input--error')
  })

  it('merges custom className', () => {
    render(<Select options={options} className="custom-select" aria-label="Test" />)
    expect(screen.getByRole('combobox')).toHaveClass('custom-select')
  })

  it('forwards ref to the select element', () => {
    const ref = createRef<HTMLSelectElement>()
    render(<Select ref={ref} options={options} aria-label="Test" />)
    expect(ref.current).toBe(screen.getByRole('combobox'))
  })

  it('passes through native select attributes', () => {
    render(
      <Select options={options} name="country" id="country-select" data-testid="country-select" />
    )
    const select = screen.getByTestId('country-select')
    expect(select).toHaveAttribute('name', 'country')
    expect(select).toHaveAttribute('id', 'country-select')
  })

  it('updates value and calls onChange when the user selects an option', () => {
    const handleChange = vi.fn()
    render(
      <Select
        options={options}
        defaultValue="1"
        onChange={(e: ChangeEvent<HTMLSelectElement>) => handleChange(e.target.value)}
        aria-label="Test"
      />
    )
    const select = screen.getByRole('combobox')
    fireEvent.change(select, { target: { value: '2' } })
    expect(handleChange).toHaveBeenCalledWith('2')
    expect(select).toHaveValue('2')
  })
})
