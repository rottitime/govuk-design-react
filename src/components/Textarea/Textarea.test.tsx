import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Textarea from './Textarea'
import { createRef } from 'react'

describe('Textarea', () => {
  it('renders without errors', () => {
    render(<Textarea />)
    const textareaElement = screen.getByRole('textbox')
    expect(textareaElement).toBeInTheDocument()
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
    render(
      <Textarea>
        <span>Some content</span>
      </Textarea>
    )
    const contentElement = screen.getByText('Some content')
    expect(contentElement).toBeInTheDocument()
  })

  it('triggers onChange event', () => {
    const handleChange = jest.fn()
    render(<Textarea onChange={handleChange} />)
    const textareaElement = screen.getByRole('textbox')
    userEvent.type(textareaElement, 'Hello')
    expect(handleChange).toHaveBeenCalledTimes(5) // Number of characters typed
  })
})
