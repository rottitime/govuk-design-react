import type { Meta, StoryObj } from '@storybook/react'
import ErrorSummary from './ErrorSummary'

const meta: Meta<typeof ErrorSummary> = {
  title: 'Error Summary',
  component: ErrorSummary,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `A ErrorSummary component for user input. See https://design-system.service.gov.uk/components/error-summary/ for more ErrorSummary.`
      }
    }
  },
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    errors: [
      { href: '#example', text: 'Example error message' },
      { href: '#example-2', text: 'Example error message 2' }
    ]
  }
}
