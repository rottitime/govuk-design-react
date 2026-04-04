import type { Meta, StoryObj } from '@storybook/react-vite'
import FormGroup from './FormGroup'
import Input from '../Input/Input'
import Textarea from '../Textarea/Textarea'

const meta: Meta<typeof FormGroup> = {
  title: 'Atoms/Form/FormGroup',
  component: FormGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `GOV.UK \`govuk-form-group\` wrapper. Use **\`renderControl\`** with \`label\` (and optional \`hint\`, \`error\`) for the accessible field pattern, spreading the props from \`renderControl\` onto Input/Textarea. Use **children** for fully custom markup inside the group. \`FormField\` is the same component, exported for backward compatibility. See [text input](https://design-system.service.gov.uk/components/text-input/) and [error state](https://design-system.service.gov.uk/components/text-input/error/).`
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
  name: 'Wrapper (manual label + input)',
  args: {
    label: 'What is the name of the event?',
    renderControl: (props) => <Input {...props} name="event-name" autoComplete="off" />
  }
}

export const WrapperWithError: Story = {
  name: 'Wrapper with error styling',
  args: {
    ...Primary.args,
    error: true
  }
}

export const FieldPrimary: Story = {
  name: 'Field - primary',
  args: {
    ...Primary.args
  }
}

export const FieldWithHint: Story = {
  name: 'Field - with hint',
  args: {
    ...Primary.args,
    hint: "The name you'll use on promotional material"
  }
}

export const FieldWithError: Story = {
  name: 'Field - with error',
  args: {
    ...Primary.args,
    error: 'Enter an event name'
  }
}

export const FieldHintAndError: Story = {
  name: 'Field - hint and error',
  args: {
    ...Primary.args,
    hint: "The name you'll use on promotional material",
    error: 'Enter an event name'
  }
}

export const FieldWithTextarea: Story = {
  name: 'Field - textarea',
  args: {
    label: 'Can you provide more detail?',
    hint: 'Do not include personal or financial information.',
    error: 'Enter more detail',
    renderControl: (args) => <Textarea {...args} name="details" rows={5} />
  }
}
