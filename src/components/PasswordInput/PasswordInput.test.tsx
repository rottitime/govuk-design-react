import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PasswordInput from './PasswordInput'

describe('PasswordInput', () => {
  it('renders label and password input', () => {
    render(<PasswordInput label="Password" name="password" />)
    const input = screen.getByLabelText('Password')
    expect(input).toHaveAttribute('type', 'password')
  })

  it('toggles password visibility with correct ARIA attributes', async () => {
    const user = userEvent.setup()
    render(<PasswordInput label="Password" name="password" />)
    const input = screen.getByLabelText('Password')
    const toggleBtn = screen.getByRole('button', { name: 'Show password' })

    expect(input).toHaveAttribute('type', 'password')
    expect(toggleBtn).toHaveAttribute('aria-controls', input.id)
    expect(toggleBtn).toHaveAttribute('aria-label', 'Show password')

    await user.click(toggleBtn)
    expect(input).toHaveAttribute('type', 'text')

    const hideBtn = screen.getByRole('button', { name: 'Hide password' })
    expect(hideBtn).toHaveAttribute('aria-label', 'Hide password')

    await user.click(hideBtn)
    expect(input).toHaveAttribute('type', 'password')
  })

  it('renders hint text', () => {
    render(
      <PasswordInput
        label="Password"
        name="password"
        hint="Must be at least 8 characters"
      />
    )
    expect(
      screen.getByText('Must be at least 8 characters')
    ).toBeInTheDocument()
  })

  it('renders error message', () => {
    render(
      <PasswordInput
        label="Password"
        name="password"
        errorMessage="Enter your password"
      />
    )
    expect(screen.getByText('Enter your password')).toBeInTheDocument()
  })

  it('applies error class to form group', () => {
    const { container } = render(
      <PasswordInput
        label="Password"
        name="password"
        errorMessage="Required"
      />
    )
    expect(container.firstChild).toHaveClass('govuk-form-group--error')
  })

  it('has data-module attribute', () => {
    const { container } = render(
      <PasswordInput label="Password" name="password" />
    )
    expect(container.firstChild).toHaveAttribute(
      'data-module',
      'govuk-password-input'
    )
  })

  it('has spellCheck disabled', () => {
    render(<PasswordInput label="Password" name="password" />)
    expect(screen.getByLabelText('Password')).toHaveAttribute(
      'spellcheck',
      'false'
    )
  })

  it('button text changes on toggle', async () => {
    const user = userEvent.setup()
    render(<PasswordInput label="Password" name="password" />)
    expect(screen.getByText('Show')).toBeInTheDocument()
    await user.click(screen.getByText('Show'))
    expect(screen.getByText('Hide')).toBeInTheDocument()
  })
})

  it('links input to hint and error via aria-describedby', () => {
    render(
      <PasswordInput
        label="Password"
        name="password"
        hint="Must be at least 8 characters"
        errorMessage="Enter your password"
      />
    )
    const input = screen.getByLabelText('Password')
    const describedBy = input.getAttribute('aria-describedby')
    expect(describedBy).toBeTruthy()

    const hint = screen.getByText('Must be at least 8 characters')
    const error = screen.getByText('Enter your password')
    expect(describedBy).toContain(hint.id)
    expect(describedBy).toContain(error.id)
  })
})
