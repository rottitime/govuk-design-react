import { render, screen } from '@testing-library/react'
import Footer from './Footer'

describe('Footer', () => {
  it('renders the footer element', () => {
    render(<Footer />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('renders the Open Government Licence link', () => {
    render(<Footer />)
    expect(
      screen.getByRole('link', { name: 'Open Government Licence v3.0' })
    ).toBeInTheDocument()
  })

  it('renders Crown copyright', () => {
    render(<Footer />)
    expect(
      screen.getByRole('link', { name: '© Crown copyright' })
    ).toBeInTheDocument()
  })

  it('renders meta items', () => {
    render(
      <Footer
        meta={{
          items: [
            { text: 'Help', href: '/help' },
            { text: 'Cookies', href: '/cookies' }
          ]
        }}
      />
    )
    expect(screen.getByRole('link', { name: 'Help' })).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'Cookies' })
    ).toBeInTheDocument()
  })

  it('renders navigation sections', () => {
    render(
      <Footer
        navigation={[
          {
            title: 'Services and information',
            items: [
              { text: 'Benefits', href: '/benefits' },
              { text: 'Tax', href: '/tax' }
            ]
          }
        ]}
      />
    )
    expect(
      screen.getByText('Services and information')
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'Benefits' })
    ).toBeInTheDocument()
  })

  it('applies govuk-footer class', () => {
    render(<Footer />)
    expect(screen.getByRole('contentinfo')).toHaveClass('govuk-footer')
  })

  it('renders custom meta text', () => {
    render(<Footer meta={{ text: 'Built by the Government Digital Service' }} />)
    expect(
      screen.getByText('Built by the Government Digital Service')
    ).toBeInTheDocument()
  })
})
