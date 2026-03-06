import type { Meta, StoryObj } from '@storybook/react-vite'
import Header from './Header'

const meta: Meta<typeof Header> = {
  title: 'Atoms/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The GOV.UK header shows users that they are on GOV.UK and which service they are using. See https://design-system.service.gov.uk/components/header/ for more details.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithServiceName: Story = {
  args: {
    serviceName: 'Service name',
    serviceUrl: '/service'
  }
}

export const WithNavigation: Story = {
  args: {
    serviceName: 'Service name',
    navigationItems: [
      { text: 'Navigation item 1', href: '#1', active: true },
      { text: 'Navigation item 2', href: '#2' },
      { text: 'Navigation item 3', href: '#3' }
    ]
  }
}

export const WithProductName: Story = {
  args: {
    productName: 'Product name'
  }
}
