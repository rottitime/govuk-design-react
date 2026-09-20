import type { Meta, StoryObj } from '@storybook/react-vite'
import BackLink from './BackLink'

const meta: Meta<typeof BackLink> = {
  title: 'Atoms/BackLink',
  component: BackLink,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Use the back link component to help users go back to the previous page in a multi-page transaction. See https://design-system.service.gov.uk/components/back-link/ for more details.'
      }
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Uim7G5Td35hg5PTGQ79OA1/GOV.UK-Design-System--Community-'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Back'
  }
}

export const Inverse: Story = {
  args: {
    inverse: true,
    children: 'Back'
  },
  parameters: {
    backgrounds: { default: 'dark' }
  }
}
