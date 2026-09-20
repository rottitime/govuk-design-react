import { render, screen } from '@testing-library/react'
import BackLink from './BackLink'

describe('BackLink', () => {
  it('renders the default text and href', () => {
    render(<BackLink />)
    const link = screen.getByRole('link', { name: 'Back' })
    expect(link).toHaveAttribute('href', '#')
  })

  it('applies the correct CSS class', () => {
    render(<BackLink />)
    expect(screen.getByRole('link')).toHaveClass('govuk-back-link')
  })

  it('supports custom children and href', () => {
    render(<BackLink href="/previous">Back to previous page</BackLink>)
    const link = screen.getByRole('link', { name: 'Back to previous page' })
    expect(link).toHaveAttribute('href', '/previous')
  })

  it('applies the inverse modifier when inverse is set', () => {
    render(<BackLink inverse />)
    expect(screen.getByRole('link')).toHaveClass(
      'govuk-back-link',
      'govuk-back-link--inverse'
    )
  })

  it('passes additional props correctly', () => {
    render(
      <BackLink className="custom-class" data-testid="back">
        Back
      </BackLink>
    )
    const link = screen.getByTestId('back')
    expect(link).toHaveClass('govuk-back-link', 'custom-class')
  })
})
