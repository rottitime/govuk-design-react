import type { Meta, StoryObj } from '@storybook/react-vite'
import FormField from './FormField'
import Input from '../Input/Input'
import Textarea from '../Textarea/Textarea'

const meta: Meta<typeof FormField> = {
  title: 'Atoms/Form/FormField',
  component: FormField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Wraps a single form control with a GOV.UK \`govuk-form-group\`: label, optional hint, optional error message, and the field. Pass the control as \`children\` (for example \`Input\` or \`Textarea\`) so refs stay on the leaf for libraries like React Hook Form. See [GOV.UK — Text input](https://design-system.service.gov.uk/components/text-input/) and [error state](https://design-system.service.gov.uk/components/text-input/error/).`
      }
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Uim7G5Td35hg5PTGQ79OA1/GOV.UK-Design-System--Community-?node-id=18169-10191&t=Ekuef8ZeLj0nwMCe-0'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    label: 'What is the name of the event?'
  },
  render: (args) => (
    <FormField {...args}>
      <Input name="event-name" autoComplete="off" />
    </FormField>
  )
}

export const WithHint: Story = {
  args: {
    ...Primary.args,
    hint: 'The name you’ll use on promotional material'
  },
  render: Primary.render
}

export const WithError: Story = {
  args: {
    ...Primary.args,
    error: 'Enter an event name'
  },
  render: Primary.render
}

export const HintAndError: Story = {
  args: {
    ...Primary.args,
    hint: 'The name you’ll use on promotional material',
    error: 'Enter an event name'
  },
  render: Primary.render
}

export const WithTextarea: Story = {
  args: {
    label: 'Can you provide more detail?',
    hint: 'Do not include personal or financial information.',
    error: 'Enter more detail'
  },
  render: (args) => (
    <FormField {...args}>
      <Textarea name="details" rows={5} />
    </FormField>
  )
}
