import { render, screen } from '@testing-library/react'
import NotificationBanner from './NotificationBanner'

describe('NotificationBanner', () => {
  it('renders with default title', () => {
    render(<NotificationBanner>Content here</NotificationBanner>)
    expect(screen.getByText('Important')).toBeInTheDocument()
    expect(screen.getByText('Content here')).toBeInTheDocument()
  })

  it('renders with custom title', () => {
    render(
      <NotificationBanner title="Notice">Content</NotificationBanner>
    )
    expect(screen.getByText('Notice')).toBeInTheDocument()
  })

  it('renders as region role by default', () => {
    const { container } = render(
      <NotificationBanner>Content</NotificationBanner>
    )
    expect(container.firstChild).toHaveAttribute('role', 'region')
  })

  it('renders success variant with alert role', () => {
    const { container } = render(
      <NotificationBanner type="success">Done!</NotificationBanner>
    )
    expect(container.firstChild).toHaveClass(
      'govuk-notification-banner--success'
    )
    expect(container.firstChild).toHaveAttribute('role', 'alert')
    expect(screen.getByText('Success')).toBeInTheDocument()
  })

  it('applies the correct CSS class', () => {
    const { container } = render(
      <NotificationBanner>Content</NotificationBanner>
    )
    expect(container.firstChild).toHaveClass('govuk-notification-banner')
  })

  it('includes data-module attribute', () => {
    const { container } = render(
      <NotificationBanner>Content</NotificationBanner>
    )
    expect(container.firstChild).toHaveAttribute(
      'data-module',
      'govuk-notification-banner'
    )
  })

  it('passes additional props', () => {
    const { container } = render(
      <NotificationBanner className="custom" data-testid="nb">
        Content
      </NotificationBanner>
    )
    expect(container.firstChild).toHaveClass(
      'govuk-notification-banner',
      'custom'
    )
    expect(container.firstChild).toHaveAttribute('data-testid', 'nb')
  })
})
