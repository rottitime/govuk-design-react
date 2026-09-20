import { render, screen } from '@testing-library/react'
import PhaseBanner from './PhaseBanner'

describe('PhaseBanner', () => {
  it('renders the tag text', () => {
    render(<PhaseBanner tag="Alpha">Feedback text</PhaseBanner>)
    expect(screen.getByText('Alpha')).toBeInTheDocument()
  })

  it('renders the children', () => {
    render(
      <PhaseBanner tag="Beta">
        This is a new service – your{' '}
        <a className="govuk-link" href="/feedback">
          feedback
        </a>{' '}
        will help us to improve it.
      </PhaseBanner>
    )
    expect(screen.getByText(/This is a new service/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'feedback' })).toHaveAttribute(
      'href',
      '/feedback'
    )
  })

  it('applies the tag CSS classes', () => {
    render(<PhaseBanner tag="Alpha">Content</PhaseBanner>)
    const tag = screen.getByText('Alpha')
    expect(tag).toHaveClass('govuk-tag', 'govuk-phase-banner__content__tag')
  })

  it('applies the correct base CSS class', () => {
    const { container } = render(
      <PhaseBanner tag="Beta">Content</PhaseBanner>
    )
    expect(container.firstChild).toHaveClass('govuk-phase-banner')
  })

  it('passes additional props', () => {
    const { container } = render(
      <PhaseBanner tag="Alpha" className="custom" data-testid="pb">
        Content
      </PhaseBanner>
    )
    expect(container.firstChild).toHaveClass('govuk-phase-banner', 'custom')
    expect(container.firstChild).toHaveAttribute('data-testid', 'pb')
  })
})
