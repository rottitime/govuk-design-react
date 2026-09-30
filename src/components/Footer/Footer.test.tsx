import { render, screen } from '@testing-library/react'
import Footer from './Footer'

const defaultLicence = (
  <span className="govuk-footer__licence-description">
    All content is available under the{' '}
    <a
      className="govuk-footer__link"
      href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/"
      rel="license"
    >
      Open Government Licence v3.0
    </a>
    , except where otherwise stated
  </span>
)

const defaultCopyright = {
  text: '© Crown copyright',
  href: 'https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/'
}

describe('Footer', () => {
  it('renders the footer element', () => {
    render(<Footer />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('renders the Open Government Licence link', () => {
    render(<Footer contentLicence={defaultLicence} />)
    const oglLink = screen.getByRole('link', {
      name: 'Open Government Licence v3.0'
    })
    expect(oglLink).toBeInTheDocument()
    expect(oglLink).toHaveAttribute('rel', 'license')
  })

  it('renders Crown copyright', () => {
    render(<Footer copyright={defaultCopyright} />)
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
