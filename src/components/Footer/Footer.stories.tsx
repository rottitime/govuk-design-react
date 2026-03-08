import type { Meta, StoryObj } from '@storybook/react-vite'
import Footer from './Footer'

const meta: Meta<typeof Footer> = {
  title: 'Atoms/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The footer provides copyright, licensing and other information about your service and department. See https://design-system.service.gov.uk/components/footer/ for more details.'
      }
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
