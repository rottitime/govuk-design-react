import type { Meta, StoryObj } from '@storybook/react'
import ErrorMessage from './ErrorMessage'

const meta: Meta<typeof ErrorMessage> = {
  title: 'Error Message',
  component: ErrorMessage,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `A ErrorMessage component for form fields.  See https://design-system.service.gov.uk/components/error-message/ for more details`
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Select if you are British, Irish or a citizen of a different country'
  }
}
