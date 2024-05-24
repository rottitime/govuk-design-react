import type { Meta, StoryObj } from '@storybook/react'
import HR from './HR'

const meta: Meta<typeof HR> = {
  title: 'HR',
  component: HR,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `A HR component for form fields. See documentation https://design-system.service.gov.uk/styles/section-break/ for more details.`
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {}
}
