import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import FormGroup from './FormGroup'
import Input from '../Input/Input'
import Textarea from '../Textarea/Textarea'

describe('FormGroup (wrapper)', () => {
  it('renders without error prop', () => {
    const { container } = render(<FormGroup />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('renders with error prop', () => {
    const { container } = render(<FormGroup error />)
    expect(container.firstChild).toBeInTheDocument()
    expect(container.firstChild).toHaveClass('govuk-form-group govuk-form-group--error')
  })
})

const label = 'Event name'

describe('FormGroup (field)', () => {
  it('associates label with the control', () => {
    render(
      <FormGroup
        label={label}
        renderControl={(props) => <Input {...props} />}
      />
    )
    const input = screen.getByLabelText(label)
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('id')
    expect(input.id).toBeTruthy()
  })

  it('renders hint when provided', () => {
    const hint = 'Use the name on promotional material'
    render(
      <FormGroup
        label={label}
        hint={hint}
        renderControl={(props) => <Input {...props} />}
      />
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
      <FormGroup
        label={label}
        error={message}
        renderControl={(props) => <Input {...props} />}
      />
    )
    expect(screen.getByText(message)).toBeInTheDocument()
    expect(container.querySelector('.govuk-form-group--error')).toBeInTheDocument()

    const input = screen.getByLabelText(label)
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveClass('govuk-input--error')
  })

  it('merges aria-describedby with additional ids', () => {
    render(
      <FormGroup
        label={label}
        hint="Hint text"
        error="Error text"
        additionalAriaDescribedBy="extra-id"
        renderControl={(props) => <Input {...props} />}
      />
    )
    const input = screen.getByLabelText(label)
    const describedBy = input.getAttribute('aria-describedby')!
    expect(describedBy).toContain('extra-id')
    expect(describedBy.split(/\s+/).length).toBeGreaterThanOrEqual(3)
  })

  it('forwards ref to the DOM input', () => {
    const ref = createRef<HTMLInputElement>()
    render(
      <FormGroup
        label={label}
        renderControl={(props) => <Input ref={ref} {...props} />}
      />
    )
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
    expect(ref.current).toBe(screen.getByLabelText(label))
  })

  it('supports callback ref on the control (RHF register-style)', () => {
    const ref = vi.fn()
    render(
      <FormGroup
        label={label}
        renderControl={(props) => <Input ref={ref} {...props} />}
      />
    )
    const input = screen.getByLabelText(label)
    expect(ref).toHaveBeenCalledWith(input)
  })

  it('passes error styling to Textarea when in error', () => {
    render(
      <FormGroup
        label={label}
        error="Too long"
        renderControl={(props) => <Textarea {...props} />}
      />
    )
    expect(screen.getByLabelText(label)).toHaveClass('govuk-textarea--error')
  })
})
