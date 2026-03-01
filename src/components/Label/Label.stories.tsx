import type { Meta, StoryObj } from '@storybook/react-vite'
import Label from './Label'
import Input from '../Input/Input'

const meta: Meta<typeof Label> = {
  title: 'Label',
  component: Label,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `A Label component for user Label. See https://design-system.service.gov.uk/get-started/labels-legends-headings/ for more details.`
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Test Label'
  }
}

export const WithInput: Story = {
  args: {
    ...Primary.args,
    htmlFor: 'test-input'
  },
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        <Story />
        <Input id={Story().props.htmlFor} />
      </div>
    )
  ]
}
