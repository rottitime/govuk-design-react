import { render, screen } from '@testing-library/react'
import Breadcrumbs from './Breadcrumbs'

const items = [
  { text: 'Home', href: '/' },
  { text: 'Passports', href: '/passports' },
  { text: 'Apply online' }
]

describe('Breadcrumbs', () => {
  it('renders a navigation landmark', () => {
    render(<Breadcrumbs items={items} />)
    expect(screen.getByRole('navigation')).toHaveAttribute(
      'aria-label',
      'Breadcrumb'
    )
  })

  it('renders all breadcrumb items', () => {
    render(<Breadcrumbs items={items} />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Passports')).toBeInTheDocument()
    expect(screen.getByText('Apply online')).toBeInTheDocument()
  })

  it('renders links for items with href', () => {
    render(<Breadcrumbs items={items} />)
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute(
      'href',
      '/'
    )
    expect(screen.getByRole('link', { name: 'Passports' })).toHaveAttribute(
      'href',
      '/passports'
    )
  })

  it('renders current page without a link', () => {
    render(<Breadcrumbs items={items} />)
    const listItem = screen.getByText('Apply online').closest('li')
    expect(listItem).toHaveAttribute('aria-current', 'page')
    expect(screen.queryByRole('link', { name: 'Apply online' })).not.toBeInTheDocument()
  })

  it('applies collapse on mobile class', () => {
    const { container } = render(
      <Breadcrumbs items={items} collapseOnMobile />
    )
    expect(container.firstChild).toHaveClass(
      'govuk-breadcrumbs--collapse-on-mobile'
    )
  })

  it('applies the correct base CSS class', () => {
    const { container } = render(<Breadcrumbs items={items} />)
    expect(container.firstChild).toHaveClass('govuk-breadcrumbs')
  })

  it('passes additional props', () => {
    const { container } = render(
      <Breadcrumbs items={items} className="custom" data-testid="bc" />
    )
    expect(container.firstChild).toHaveClass('govuk-breadcrumbs', 'custom')
    expect(container.firstChild).toHaveAttribute('data-testid', 'bc')
  })
})
