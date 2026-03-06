import type { Meta, StoryObj } from '@storybook/react-vite'
import Pagination from './Pagination'

const meta: Meta<typeof Pagination> = {
  title: 'Atoms/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Help users navigate forwards and backwards through a series of pages. See https://design-system.service.gov.uk/components/pagination/ for more details.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      { type: 'page', number: 1, href: '/page/1' },
      { type: 'page', number: 2, href: '/page/2', current: true },
      { type: 'page', number: 3, href: '/page/3' }
    ],
    previous: { href: '/page/1' },
    next: { href: '/page/3' }
  }
}

export const WithEllipsis: Story = {
  args: {
    items: [
      { type: 'page', number: 1, href: '/1' },
      { type: 'ellipsis' },
      { type: 'page', number: 6, href: '/6' },
      { type: 'page', number: 7, href: '/7', current: true },
      { type: 'page', number: 8, href: '/8' },
      { type: 'ellipsis' },
      { type: 'page', number: 42, href: '/42' }
    ],
    previous: { href: '/6' },
    next: { href: '/8' }
  }
}

export const PreviousNextOnly: Story = {
  args: {
    previous: {
      href: '/previous',
      labelText: 'Applying for a licence'
    },
    next: {
      href: '/next',
      labelText: 'Paying for your licence'
    }
  }
}
