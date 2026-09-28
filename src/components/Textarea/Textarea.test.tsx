import { fireEvent, render, screen } from '@testing-library/react'
import { createRef } from 'react'
import Textarea from './Textarea'

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

  it('applies the error class', () => {
    render(<Textarea error />)
    expect(screen.getByRole('textbox')).toHaveClass('govuk-textarea--error')
  })

  it('forwards ref to the textarea element', () => {
    const ref = createRef<HTMLTextAreaElement>()
    render(<Textarea ref={ref} />)
    const textareaElement = screen.getByRole('textbox')
    expect(ref.current).toBe(textareaElement)
  })

  it('renders children as the initial value', () => {
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

  it('renders the GOV.UK character count pattern when maxLength is set', () => {
    const { container } = render(<Textarea id="more-detail" maxLength={200} />)
    expect(container.firstChild).toHaveClass('govuk-character-count')
    expect(container.firstChild).toHaveAttribute('data-module', 'govuk-character-count')
    expect(container.firstChild).toHaveAttribute('data-maxlength', '200')
    expect(screen.getByRole('textbox')).toHaveClass('govuk-js-character-count')
    expect(screen.getByText('You have 200 characters remaining')).toBeInTheDocument()
  })

  it('updates the remaining character count', () => {
    render(<Textarea id="more-detail" maxLength={10} />)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'hello' } })
    expect(screen.getByText('You have 5 characters remaining')).toBeInTheDocument()
  })

  it('shows an over-limit message and error class without blocking input', () => {
    render(<Textarea id="more-detail" maxLength={3} />)
    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: 'hello' } })
    expect(textarea).toHaveValue('hello')
    expect(textarea).toHaveClass('govuk-textarea--error')
    expect(screen.getByText('You have 2 characters too many')).toBeInTheDocument()
  })

  it('counts words when maxWords is set', () => {
    const { container } = render(<Textarea id="job-description" maxWords={10} />)
    expect(container.firstChild).toHaveAttribute('data-maxwords', '10')
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'one two three' } })
    expect(screen.getByText('You have 7 words remaining')).toBeInTheDocument()
  })

  it('hides the live count until the threshold is reached', () => {
    render(<Textarea id="more-detail" maxLength={100} threshold={75} />)
    const message = screen.getByText('You can enter up to 100 characters')
    expect(message).toHaveClass('govuk-character-count__message--disabled')
    expect(message).toHaveAttribute('aria-hidden', 'true')

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'a'.repeat(75) } })
    expect(screen.getByText('You have 25 characters remaining')).toHaveAttribute(
      'aria-live',
      'polite'
    )
  })

  it('combines existing aria-describedby with the count message id', () => {
    render(
      <Textarea id="more-detail" maxLength={10} aria-describedby="more-detail-hint" />
    )
    expect(screen.getByRole('textbox')).toHaveAttribute(
      'aria-describedby',
      'more-detail-info more-detail-hint'
    )
  })
})
