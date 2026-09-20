import type { Meta, StoryObj } from '@storybook/react-vite'
import PasswordInput from './PasswordInput'

const meta: Meta<typeof PasswordInput> = {
  title: 'Atoms/Form/Password input',
  component: PasswordInput,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Help users to create and enter passwords. The show/hide toggle is implemented in React, so it works without the govuk-frontend JavaScript. See https://design-system.service.gov.uk/components/password-input/ for more details.'
      }
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Uim7G5Td35hg5PTGQ79OA1/GOV.UK-Design-System--Community-'
    }
  },
  args: {
    label: 'Password',
    name: 'password'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithHint: Story = {
  args: {
    hint: 'Your password should be at least 8 characters long.'
  }
}

export const WithError: Story = {
  args: {
    error: 'Enter your password'
  }
}
