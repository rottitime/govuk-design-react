import { render, screen, fireEvent } from '@testing-library/react'
import Input from './Input'
import type { ChangeEvent } from 'react'

describe('Input', () => {
  it('renders without error', () => {
    render(<Input />)
    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toBeInTheDocument()
  })

  it('renders with error class when error prop is true', () => {
    render(<Input error />)
    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toHaveClass('govuk-input govuk-input--error')
  })

  it('renders with specified width class', () => {
    render(<Input width="full" />)
    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toHaveClass('govuk-input govuk-!-width-full')
  })

  it('renders with specified number of characters', () => {
    render(<Input characters={10} />)
    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toHaveAttribute('class', 'govuk-input govuk-input--width-10')
  })

  //test for onchange to ensure input value updates
  it('updates input value when user types', () => {
    const mockOnChange = vi.fn()
    render(
      <Input
        onChange={(e: ChangeEvent<HTMLInputElement>) => mockOnChange(e.target.value)}
      />
    )
    const inputElement = screen.getByRole('textbox')
    fireEvent.change(inputElement, { target: { value: 'Hello, World!' } })
    expect(inputElement).toHaveValue('Hello, World!')
  })
})
