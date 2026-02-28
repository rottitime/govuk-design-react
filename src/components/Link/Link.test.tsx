import { render, screen } from '@testing-library/react'
import Link from './Link'

describe('Link', () => {
  it('renders a link with the provided href', () => {
    render(<Link href="/example">Example Link</Link>)
    const linkElement = screen.getByRole('link', { name: /example link/i })
    expect(linkElement).toHaveAttribute('href', '/example')
  })

  it('renders a button link when button prop is true', () => {
    render(
      <Link href="/example" button>
        Button Link
      </Link>
    )
    const buttonElement = screen.getByRole('button', { name: /button link/i })
    expect(buttonElement).toHaveAttribute('href', '/example')
  })

  it('renders an external link when href starts with http', () => {
    render(<Link href="http://example.com">External Link</Link>)
    const externalLinkElement = screen.getByRole('link', { name: /external link/i })
    expect(externalLinkElement).toHaveAttribute('href', 'http://example.com')
    expect(externalLinkElement).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders a link with additional props', () => {
    render(
      <Link href="/example" className="custom-link" data-testid="custom-link">
        Custom Link
      </Link>
    )
    const customLinkElement = screen.getByTestId('custom-link')
    expect(customLinkElement).toHaveClass('custom-link')
  })
})
