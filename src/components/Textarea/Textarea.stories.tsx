import type { Meta, StoryObj } from '@storybook/react-vite'
import Textarea from './Textarea'

const meta: Meta<typeof Textarea> = {
  title: 'Textarea',
  component: Textarea,
  parameters: {
    docs: {
      description: {
        component: `A textarea component for user input. See https://design-system.service.gov.uk/components/textarea/ for more details.`
      }
    }
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'The content of the Textarea element'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'The content of the Textarea element'
  }
}
