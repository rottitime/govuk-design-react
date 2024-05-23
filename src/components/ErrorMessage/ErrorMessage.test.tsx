import { render, screen } from '@testing-library/react'
import ErrorMessage from './ErrorMessage'

describe('ErrorMessage', () => {
  it('renders the error message', () => {
    render(<ErrorMessage>Error message</ErrorMessage>)
    const errorMessage = screen.getByText('Error message')
    expect(errorMessage).toBeInTheDocument()
    expect(errorMessage).toHaveClass('govuk-error-message')
  })

  it('passes additional props to the underlying p element', () => {
    render(
      <ErrorMessage id="error" className="error-message">
        Error message
      </ErrorMessage>
    )
    const errorMessage = screen.getByText('Error message')
    expect(errorMessage).toHaveAttribute('id', 'error')
    expect(errorMessage).toHaveClass('error-message')
  })

  // Add more tests here
})
