import type { Meta, StoryObj } from '@storybook/react-vite'
import Breadcrumbs from './Breadcrumbs'

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Atoms/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The breadcrumbs component helps users to understand where they are within a website\'s structure and move between levels. See https://design-system.service.gov.uk/components/breadcrumbs/ for more details.'
      }
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Uim7G5Td35hg5PTGQ79OA1/GOV.UK-Design-System--Community-?node-id=20123-12775&t=iHqp2471YNPlJMvO-0'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      { text: 'Home', href: '/' },
      { text: 'Passports, travel and living abroad', href: '/browse/abroad' },
      { text: 'Travel abroad' }
    ]
  }
}

export const CollapseOnMobile: Story = {
  args: {
    ...Default.args,
    collapseOnMobile: true
  }
}
