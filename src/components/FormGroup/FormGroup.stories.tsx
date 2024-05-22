import type { Meta, StoryObj } from '@storybook/react'
import FormGroup from './FormGroup'
import Input from '../Input/Input'
import Label from '../Label/Label'

const meta: Meta<typeof FormGroup> = {
  title: 'FormGroup',
  component: FormGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `A FormGroup component for form fields. This acts as a wrapper around each form field.`
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

const idInput = 'test-input'

export const Primary: Story = {
  args: {
    children: (
      <>
        <Label htmlFor={idInput}>What is the name of the event?</Label>
        <Input id={idInput} />
      </>
    )
  }
}

export const WithError: Story = {
  args: {
    error: true,
    children: (
      <>
        <Label htmlFor={idInput}>What is the name of the event?</Label>
        <Input error id={idInput} />
      </>
    )
  }
}
