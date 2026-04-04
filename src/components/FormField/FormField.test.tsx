import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import FormField from './FormField'
import Input from '../Input/Input'
import Textarea from '../Textarea/Textarea'

const label = 'Event name'

describe('FormField', () => {
  it('associates label with the control', () => {
    render(
      <FormField label={label}>
        <Input />
      </FormField>
    )
    const input = screen.getByLabelText(label)
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('id')
    expect(input.id).toBeTruthy()
  })

  it('renders hint when provided', () => {
    const hint = 'Use the name on promotional material'
    render(
      <FormField label={label} hint={hint}>
        <Input />
      </FormField>
    )
    expect(screen.getByText(hint)).toBeInTheDocument()
    const input = screen.getByLabelText(label)
    const describedBy = input.getAttribute('aria-describedby')
    expect(describedBy).toBeTruthy()
    const hintEl = document.getElementById(describedBy!.split(/\s+/)[0]!)
    expect(hintEl).toHaveTextContent(hint)
  })

  it('renders error message and applies error state', () => {
    const message = 'Enter an event name'
    const { container } = render(
      <FormField label={label} error={message}>
        <Input />
      </FormField>
    )
    expect(screen.getByText(message)).toBeInTheDocument()
    expect(container.querySelector('.govuk-form-group--error')).toBeInTheDocument()

    const input = screen.getByLabelText(label)
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveClass('govuk-input--error')
  })

  it('merges aria-describedby with existing value', () => {
    render(
      <FormField label={label} hint="Hint text" error="Error text">
        <Input aria-describedby="extra-id" />
      </FormField>
    )
    const input = screen.getByLabelText(label)
    const describedBy = input.getAttribute('aria-describedby')!
    expect(describedBy).toContain('extra-id')
    expect(describedBy.split(/\s+/).length).toBeGreaterThanOrEqual(3)
  })

  it('forwards ref from register-style props to the DOM input', () => {
    const ref = createRef<HTMLInputElement>()
    render(
      <FormField label={label}>
        <Input ref={ref} />
      </FormField>
    )
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
    expect(ref.current).toBe(screen.getByLabelText(label))
  })

  it('preserves callback ref when cloning (RHF register-style)', () => {
    const ref = vi.fn()
    render(
      <FormField label={label}>
        <Input ref={ref} />
      </FormField>
    )
    const input = screen.getByLabelText(label)
    expect(ref).toHaveBeenCalledWith(input)
  })

  it('passes error styling to Textarea when in error', () => {
    render(
      <FormField label={label} error="Too long">
        <Textarea />
      </FormField>
    )
    expect(screen.getByLabelText(label)).toHaveClass('govuk-textarea--error')
  })
})
