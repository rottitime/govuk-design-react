import type { Meta, StoryObj } from '@storybook/react-vite'
import Button from './Button'

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,

  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `A Button component for user Button. See https://design-system.service.gov.uk/components/button/ for more details.`
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Save and continue'
  }
}

export const Secondary: Story = {
  args: {
    ...Primary.args,
    secondary: true
  }
}

export const Warning: Story = {
  args: {
    ...Primary.args,
    warning: true
  }
}
