import type { Meta, StoryObj } from '@storybook/react'
import Hint from './Hint'
import Input from '../Input/Input'
import Label from '../Label/Label'

const meta: Meta<typeof Hint> = {
  title: 'Hint',
  component: Hint,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `A Hint component for form fields`
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'The name you’ll use on promotional material'
  }
}

export const WithInput: Story = {
  args: {
    ...Primary.args
  },
  decorators: [
    (Story) => {
      const idInput = 'test-input'
      return (
        <>
          <Label htmlFor={idInput}>What is the name of the event?</Label>
          <Story />
          <Input id={idInput} />
        </>
      )
    }
  ]
}
