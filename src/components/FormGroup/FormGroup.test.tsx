import { render } from '@testing-library/react'
import FormGroup from './FormGroup'

describe('FormGroup', () => {
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
