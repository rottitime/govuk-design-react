import type { Meta, StoryObj } from '@storybook/react-vite'
import ServiceNavigation from './ServiceNavigation'

const meta: Meta<typeof ServiceNavigation> = {
  title: 'Atoms/ServiceNavigation',
  component: ServiceNavigation,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The service navigation helps users understand that they're using your service and lets them navigate around it. See https://design-system.service.gov.uk/components/service-navigation/ for more details.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    serviceName: 'Service name',
    navigationItems: [
      { text: 'Navigation item 1', href: '#1', active: true },
      { text: 'Navigation item 2', href: '#2' },
      { text: 'Navigation item 3', href: '#3' }
    ]
  }
}

export const ServiceNameOnly: Story = {
  args: {
    serviceName: 'Service name',
    serviceUrl: '/'
  }
}
