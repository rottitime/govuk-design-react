import { render, screen } from '@testing-library/react'
import ServiceNavigation from './ServiceNavigation'

describe('ServiceNavigation', () => {
  it('renders service name with link', () => {
    render(<ServiceNavigation serviceName="My Service" serviceUrl="/home" />)
    const link = screen.getByRole('link', { name: 'My Service' })
    expect(link).toHaveAttribute('href', '/home')
  })

  it('renders navigation items', () => {
    render(
      <ServiceNavigation
        navigationItems={[
          { text: 'Dashboard', href: '/dashboard' },
          { text: 'Settings', href: '/settings' }
        ]}
      />
    )
    expect(
      screen.getByRole('link', { name: 'Dashboard' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'Settings' })
    ).toBeInTheDocument()
  })

  it('marks active item with aria-current', () => {
    render(
      <ServiceNavigation
        navigationItems={[
          { text: 'Dashboard', href: '/dashboard', active: true },
          { text: 'Settings', href: '/settings' }
        ]}
      />
    )
    expect(screen.getByRole('link', { name: 'Dashboard' })).toHaveAttribute(
      'aria-current',
      'page'
    )
  })

  it('renders navigation with aria-label', () => {
    render(
      <ServiceNavigation
        navigationLabel="Service menu"
        navigationItems={[{ text: 'Home', href: '/' }]}
      />
    )
    expect(
      screen.getByRole('navigation', { name: 'Service menu' })
    ).toBeInTheDocument()
  })

  it('renders menu button (hidden by default)', () => {
    render(
      <ServiceNavigation
        navigationItems={[{ text: 'Home', href: '/' }]}
      />
    )
    expect(screen.getByText('Menu')).toBeInTheDocument()
  })

  it('applies the correct CSS class', () => {
    const { container } = render(<ServiceNavigation serviceName="Test" />)
    expect(container.firstChild).toHaveClass('govuk-service-navigation')
  })

  it('has data-module attribute', () => {
    const { container } = render(<ServiceNavigation serviceName="Test" />)
    expect(container.firstChild).toHaveAttribute(
      'data-module',
      'govuk-service-navigation'
    )
  })
})
