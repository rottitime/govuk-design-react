import type { Meta, StoryObj } from '@storybook/react-vite'
import FormGroup from './FormGroup'
import Input from '../Input/Input'
import Label from '../Label/Label'
import Textarea from '../Textarea/Textarea'

const meta: Meta<typeof FormGroup> = {
  title: 'Atoms/Form/FormGroup',
  component: FormGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `GOV.UK \`govuk-form-group\` wrapper. Use **children only** for manual label + input layout, or **\`renderControl\`** with \`label\` (and optional \`hint\`, \`error\`) for the full accessible field pattern. Spread the props from \`renderControl\` onto Input/Textarea. \`FormField\` is the same component, exported for backward compatibility. See [text input](https://design-system.service.gov.uk/components/text-input/) and [error state](https://design-system.service.gov.uk/components/text-input/error/).`
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

const idInput = 'test-input'

export const WrapperWithLabelAndInput: Story = {
  name: 'Wrapper (manual label + input)',
  args: {
    children: (
      <>
        <Label htmlFor={idInput}>What is the name of the event?</Label>
        <Input id={idInput} />
      </>
    )
  }
}

export const WrapperWithError: Story = {
  name: 'Wrapper with error styling',
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

export const FieldPrimary: Story = {
  name: 'Field — primary',
  args: {
    label: 'What is the name of the event?'
  },
  render: (args) => (
    <FormGroup
      {...args}
      renderControl={(props) => <Input {...props} name="event-name" autoComplete="off" />}
    />
  )
}

export const FieldWithHint: Story = {
  name: 'Field — with hint',
  args: {
    ...FieldPrimary.args,
    hint: 'The name you’ll use on promotional material'
  },
  render: FieldPrimary.render
}

export const FieldWithError: Story = {
  name: 'Field — with error',
  args: {
    ...FieldPrimary.args,
    error: 'Enter an event name'
  },
  render: FieldPrimary.render
}

export const FieldHintAndError: Story = {
  name: 'Field — hint and error',
  args: {
    ...FieldPrimary.args,
    hint: 'The name you’ll use on promotional material',
    error: 'Enter an event name'
  },
  render: FieldPrimary.render
}

export const FieldWithTextarea: Story = {
  name: 'Field — textarea',
  args: {
    label: 'Can you provide more detail?',
    hint: 'Do not include personal or financial information.',
    error: 'Enter more detail'
  },
  render: (args) => (
    <FormGroup
      {...args}
      renderControl={(props) => <Textarea {...props} name="details" rows={5} />}
    />
  )
}
