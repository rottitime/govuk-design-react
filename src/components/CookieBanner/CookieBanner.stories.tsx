import type { Meta, StoryObj } from '@storybook/react-vite'
import CookieBanner from './CookieBanner'

const meta: Meta<typeof CookieBanner> = {
  title: 'Atoms/CookieBanner',
  component: CookieBanner,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Allow users to accept or reject cookies which are not essential to making your service work. See https://design-system.service.gov.uk/components/cookie-banner/ for more details.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <p className="govuk-body">
        We use some essential cookies to make this service work. We'd also like
        to use analytics cookies so we can understand how you use the service
        and make improvements.
      </p>
    ),
    actions: [
      { text: 'Accept analytics cookies' },
      { text: 'Reject analytics cookies' },
      { text: 'View cookies', type: 'link', href: '/cookies' }
    ]
  }
}
