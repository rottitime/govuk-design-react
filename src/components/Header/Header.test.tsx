import { render, screen } from '@testing-library/react'
import Header from './Header'

describe('Header', () => {
  it('renders GOV.UK logo text', () => {
    render(<Header />)
    expect(screen.getByText('GOV.UK')).toBeInTheDocument()
  })

  it('renders homepage link', () => {
    render(<Header homepageUrl="/custom" />)
    const link = screen.getByRole('link', { name: /GOV\.UK/ })
    expect(link).toHaveAttribute('href', '/custom')
  })

  it('renders service name', () => {
    render(<Header serviceName="My Service" serviceUrl="/my-service" />)
    const serviceLink = screen.getByRole('link', { name: 'My Service' })
    expect(serviceLink).toHaveAttribute('href', '/my-service')
  })

  it('renders navigation items', () => {
    render(
      <Header
        navigationItems={[
          { text: 'Home', href: '/' },
          { text: 'About', href: '/about' }
        ]}
      />
    )
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument()
  })

  it('marks active navigation item', () => {
    const { container } = render(
      <Header
        navigationItems={[
          { text: 'Home', href: '/', active: true },
          { text: 'About', href: '/about' }
        ]}
      />
    )
    expect(
      container.querySelector('.govuk-header__navigation-item--active')
    ).toBeInTheDocument()
  })

  it('applies govuk-header class', () => {
    const { container } = render(<Header />)
    expect(container.firstChild).toHaveClass('govuk-header')
  })

  it('has data-module attribute', () => {
    const { container } = render(<Header />)
    expect(container.firstChild).toHaveAttribute(
      'data-module',
      'govuk-header'
    )
  })

  it('has role banner', () => {
    render(<Header />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('renders product name', () => {
    render(<Header productName="Design System" />)
    expect(screen.getByText('Design System')).toBeInTheDocument()
  })
})
