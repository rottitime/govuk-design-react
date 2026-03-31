import type { Meta, StoryObj } from '@storybook/react-vite'
import PasswordInput from './PasswordInput'

const meta: Meta<typeof PasswordInput> = {
  title: 'Atoms/PasswordInput',
  component: PasswordInput,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Let users enter a password with the option to show what they have entered. See https://design-system.service.gov.uk/components/password-input/ for more details.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Create a password',
    name: 'password'
  }
}

export const WithHint: Story = {
  args: {
    label: 'Create a password',
    name: 'password',
    hint: 'Your password must be at least 8 characters and contain a number.'
  }
}

export const WithError: Story = {
  args: {
    label: 'Create a password',
    name: 'password',
    errorMessage: 'Enter a password'
  }
}
