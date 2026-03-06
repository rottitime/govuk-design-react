import type { Meta, StoryObj } from '@storybook/react-vite'
import NotificationBanner from './NotificationBanner'

const meta: Meta<typeof NotificationBanner> = {
  title: 'Atoms/NotificationBanner',
  component: NotificationBanner,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Use a notification banner to tell the user about something they need to know about, but that is not directly related to the page content. See https://design-system.service.gov.uk/components/notification-banner/ for more details.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <p className="govuk-notification-banner__heading">
        You have 7 days left to send your application.{' '}
        <a className="govuk-notification-banner__link" href="#">
          View application
        </a>
        .
      </p>
    )
  }
}

export const Success: Story = {
  args: {
    type: 'success',
    children: (
      <h3 className="govuk-notification-banner__heading">
        Training outcome recorded and trainee notified
      </h3>
    )
  }
}
