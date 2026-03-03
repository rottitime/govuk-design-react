import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn } from 'storybook/test'
import Button from './Button'

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  args: {
    onClick: fn()
  },
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

export const Disabled: Story = {
  args: {
    ...Primary.args,
    warning: true,
    disabled: true
  },
  play: async function ({ args, canvas, userEvent }) {
    const button = canvas.getByRole('button', { name: 'Save and continue' })

    // 👇 Simulate behavior
    await userEvent.click(button)

    // 👇 Make assertions
    await expect(button).toBeDisabled()
    await expect(args.onClick).not.toHaveBeenCalled()
  }
}
