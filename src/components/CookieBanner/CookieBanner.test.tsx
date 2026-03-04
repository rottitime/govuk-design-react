import { render, screen } from '@testing-library/react'
import CookieBanner from './CookieBanner'

describe('CookieBanner', () => {
  it('renders with default heading', () => {
    render(<CookieBanner>Cookie content</CookieBanner>)
    expect(screen.getByText('Cookies on this service')).toBeInTheDocument()
  })

  it('renders with custom heading', () => {
    render(
      <CookieBanner heading="Cookie preferences">Content</CookieBanner>
    )
    expect(screen.getByText('Cookie preferences')).toBeInTheDocument()
  })

  it('renders children content', () => {
    render(<CookieBanner>We use cookies to improve your experience.</CookieBanner>)
    expect(
      screen.getByText('We use cookies to improve your experience.')
    ).toBeInTheDocument()
  })

  it('renders as a region landmark', () => {
    render(<CookieBanner>Content</CookieBanner>)
    expect(screen.getByRole('region')).toHaveAttribute(
      'aria-label',
      'Cookie banner'
    )
  })

  it('renders button actions', () => {
    render(
      <CookieBanner
        actions={[
          { text: 'Accept analytics cookies' },
          { text: 'Reject analytics cookies' }
        ]}
      >
        Content
      </CookieBanner>
    )
    expect(
      screen.getByRole('button', { name: 'Accept analytics cookies' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Reject analytics cookies' })
    ).toBeInTheDocument()
  })

  it('renders link actions', () => {
    render(
      <CookieBanner
        actions={[{ text: 'View cookies', type: 'link', href: '/cookies' }]}
      >
        Content
      </CookieBanner>
    )
    const link = screen.getByRole('link', { name: 'View cookies' })
    expect(link).toHaveAttribute('href', '/cookies')
  })

  it('can be hidden', () => {
    const { container } = render(
      <CookieBanner hidden>Content</CookieBanner>
    )
    expect(container.firstChild).toHaveAttribute('hidden')
  })

  it('applies the correct CSS class', () => {
    const { container } = render(<CookieBanner>Content</CookieBanner>)
    expect(container.firstChild).toHaveClass('govuk-cookie-banner')
  })
})
