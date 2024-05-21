import type { Meta, StoryObj } from '@storybook/react'
import Details from './Details'

const meta: Meta<typeof Details> = {
  title: 'Details',
  component: Details,
  parameters: {
    docs: {
      description: {
        component: `A details component for user input. See https://design-system.service.gov.uk/components/details/ for more details.`
      }
    }
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The title of the details element'
    },
    children: {
      control: 'text',
      description: 'The content of the details element'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    title: 'Help with nationality',
    children:
      "We need to know your nationality so we can work out which elections you're entitled to vote in. If you cannot provide your nationality, you'll have to send copies of identity documents through the post."
  }
}
