import { fireEvent, render, screen } from '@testing-library/react'
import PasswordInput from './PasswordInput'

describe('PasswordInput', () => {
  it('renders the label associated with the input', () => {
    render(<PasswordInput label="Password" name="password" />)
    const input = screen.getByLabelText('Password')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'password')
    expect(input).toHaveAttribute('name', 'password')
  })

  it('applies the correct GOV.UK classes', () => {
    render(<PasswordInput label="Password" name="password" />)
    const input = screen.getByLabelText('Password')
    expect(input).toHaveClass(
      'govuk-input',
      'govuk-password-input__input',
      'govuk-js-password-input-input'
    )
  })

  it('toggles the input type and button text when the toggle is clicked', () => {
    render(<PasswordInput label="Password" name="password" />)
    const input = screen.getByLabelText('Password')
    const toggle = screen.getByRole('button', { name: 'Show password' })

    expect(input).toHaveAttribute('type', 'password')

    fireEvent.click(toggle)
    expect(input).toHaveAttribute('type', 'text')
    expect(screen.getByRole('button', { name: 'Hide password' })).toHaveTextContent(
      'Hide'
    )

    fireEvent.click(screen.getByRole('button', { name: 'Hide password' }))
    expect(input).toHaveAttribute('type', 'password')
  })

  it('renders a hint and wires aria-describedby', () => {
    render(
      <PasswordInput label="Password" name="password" hint="Must be 8 characters" />
    )
    const input = screen.getByLabelText('Password')
    const hint = screen.getByText('Must be 8 characters')
    expect(input.getAttribute('aria-describedby')).toContain(hint.id)
  })

  it('renders an error and applies error styling', () => {
    const { container } = render(
      <PasswordInput label="Password" name="password" error="Enter a password" />
    )
    expect(container.firstChild).toHaveClass('govuk-form-group--error')
    expect(screen.getByLabelText('Password')).toHaveClass('govuk-input--error')
    expect(screen.getByText('Enter a password')).toBeInTheDocument()
  })

  it('supports custom toggle text', () => {
    render(
      <PasswordInput
        label="Password"
        name="password"
        showPasswordText="Reveal"
        showPasswordAriaLabel="Reveal password"
      />
    )
    expect(
      screen.getByRole('button', { name: 'Reveal password' })
    ).toHaveTextContent('Reveal')
  })

  it('forwards native input props', () => {
    render(
      <PasswordInput label="Password" name="password" data-testid="pw" required />
    )
    const input = screen.getByTestId('pw')
    expect(input).toBeRequired()
  })
})
