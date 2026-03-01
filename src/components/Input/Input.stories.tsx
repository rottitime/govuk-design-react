import type { Meta, StoryObj } from '@storybook/react-vite'
import Input from './Input'
import { layout } from '@/const'

const meta: Meta<typeof Input> = {
  title: 'Input',
  component: Input,
  parameters: {
    docs: {
      description: {
        component: `A Input component for user input. See https://design-system.service.gov.uk/components/text-input/ for more details.`
      }
    }
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'The content of the Input element'
    },
    characters: {
      control: 'select',

      options: [undefined, 2, 3, 4, 5, 10, 20],
      description: 'The, number of characters the input should accept'
    },
    width: {
      control: 'select',
      options: Object.keys(layout),
      description: 'The width of the input'
    },
    error: {
      control: 'boolean',
      description: 'Whether the input should display an error state'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    error: false,
    value: undefined
  }
}

export const Error: Story = {
  args: {
    ...Primary,
    error: true
  }
}
