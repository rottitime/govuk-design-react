import type { Meta, StoryObj } from '@storybook/react'
import P from './P'

const meta: Meta<typeof P> = {
  title: 'Paragraph',
  component: P,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `A Paragraph component for form fields. See documentation https://design-system.service.gov.uk/styles/paragraphs/ for more details.`
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  }
}
