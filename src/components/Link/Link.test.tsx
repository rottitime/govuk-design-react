import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Link from './Link'

describe('Link', () => {
  it('renders a link with the provided href', () => {
    render(
      <BrowserRouter>
        <Link href="/example">Example Link</Link>
      </BrowserRouter>
    )
    const linkElement = screen.getByRole('link', { name: /example link/i })
    expect(linkElement).toHaveAttribute('href', '/example')
  })

  it('renders a button link when button prop is true', () => {
    render(
      <BrowserRouter>
        <Link href="/example" button>
          Button Link
        </Link>
      </BrowserRouter>
    )
    const buttonElement = screen.getByRole('button', { name: /button link/i })
    expect(buttonElement).toHaveAttribute('href', '/example')
  })

  it('renders an external link when href starts with http', () => {
    render(
      <BrowserRouter>
        <Link href="http://example.com">External Link</Link>
      </BrowserRouter>
    )
    const externalLinkElement = screen.getByRole('link', { name: /external link/i })
    expect(externalLinkElement).toHaveAttribute('href', 'http://example.com')
    expect(externalLinkElement).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders a link with additional props', () => {
    render(
      <BrowserRouter>
        <Link href="/example" className="custom-link" data-testid="custom-link">
          Custom Link
        </Link>
      </BrowserRouter>
    )
    const customLinkElement = screen.getByTestId('custom-link')
    expect(customLinkElement).toHaveClass('custom-link')
  })
})
