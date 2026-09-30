import type { Meta, StoryObj } from '@storybook/react-vite'
import Footer from './Footer'

const defaultContentLicence = (
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

const meta: Meta<typeof Footer> = {
  title: 'Atoms/Footer',
  component: Footer,
  tags: ['autodocs'],
  args: {
    contentLicence: defaultContentLicence,
    copyright: defaultCopyright
  },
  parameters: {
    docs: {
      description: {
        component:
          'The footer provides copyright, licensing and other information about your service and department. See https://design-system.service.gov.uk/components/footer/ for more details.'
      }
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Uim7G5Td35hg5PTGQ79OA1/GOV.UK-Design-System--Community-?node-id=20226-12488&t=iHqp2471YNPlJMvO-0'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithMetaLinks: Story = {
  args: {
    meta: {
      items: [
        { text: 'Help', href: '/help' },
        { text: 'Cookies', href: '/cookies' },
        { text: 'Contact', href: '/contact' },
        { text: 'Terms and conditions', href: '/terms' }
      ]
    }
  }
}

export const WithNavigation: Story = {
  args: {
    navigation: [
      {
        title: 'Services and information',
        columns: 2,
        items: [
          { text: 'Benefits', href: '/benefits' },
          { text: 'Births, deaths, marriages', href: '/births' },
          { text: 'Business and self-employed', href: '/business' },
          { text: 'Education and learning', href: '/education' }
        ]
      },
      {
        title: 'Departments and policy',
        items: [
          { text: 'How government works', href: '/government' },
          { text: 'Departments', href: '/departments' }
        ]
      }
    ]
  }
}
