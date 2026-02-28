import { render, screen, fireEvent } from '@testing-library/react'
import Textarea from './Textarea'
import { createRef } from 'react'

describe('Textarea', () => {
  it('renders without errors', () => {
    render(<Textarea />)
    const textareaElement = screen.getByRole('textbox')
    expect(textareaElement).toBeInTheDocument()
    expect(textareaElement).toHaveClass('govuk-textarea')
  })

  it('renders with custom class name', () => {
    render(<Textarea className="custom-textarea" />)
    const textareaElement = screen.getByRole('textbox')
    expect(textareaElement).toHaveClass('custom-textarea')
  })

  it('forwards ref to the textarea element', () => {
    const ref = createRef<HTMLTextAreaElement>()
    render(<Textarea ref={ref} />)
    const textareaElement = screen.getByRole('textbox')
    expect(ref.current).toBe(textareaElement)
  })

  it('renders children', () => {
    render(<Textarea>Some content</Textarea>)
    expect(screen.getByRole('textbox')).toHaveValue('Some content')
  })

  it('triggers onChange event', () => {
    const handleChange = vi.fn()
    render(<Textarea onChange={handleChange} />)
    const textareaElement = screen.getByRole('textbox')
    fireEvent.change(textareaElement, { target: { value: 'Hello' } })
    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(textareaElement).toHaveValue('Hello')
  })
})
