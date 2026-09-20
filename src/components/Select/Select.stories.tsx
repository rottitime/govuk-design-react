import type { Meta, StoryObj } from '@storybook/react-vite'
import FormGroup from '../FormGroup/FormGroup'
import Select from './Select'
import { fn } from 'storybook/test'

const sampleOptions = [
  { label: 'France', value: 'france' },
  { label: 'Germany', value: 'germany' },
  { label: 'Spain', value: 'spain' }
]

const meta: Meta<typeof Select> = {
  title: 'Atoms/Form/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `A Select component for choosing one option from a list. See https://design-system.service.gov.uk/components/select/ for more details.`
      }
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Uim7G5Td35hg5PTGQ79OA1/GOV.UK-Design-System--Community-?node-id=18169-10191&t=Ekuef8ZeLj0nwMCe-https://www.figma.com/design/Uim7G5Td35hg5PTGQ79OA1/GOV.UK-Design-System--Community-?node-id=20128-12845&t=YSiHUFQniBUDohkO-0'
    }
  },
  args: {
    options: sampleOptions,
    name: 'country',
    id: 'country',
    onChange: fn()
  },
  argTypes: {
    error: {
      control: 'boolean',
      description: 'Whether the select should display an error state'
    },
    options: {
      control: 'object',
      description: 'Options as { label, value } pairs'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    'aria-label': 'Country'
  }
}

export const Error: Story = {
  args: {
    ...Primary.args,
    error: true
  }
}

export const WithLabelHintAndError: Story = {
  name: 'With label, hint and error (FormGroup)',

  args: {
    options: sampleOptions,
    onChange: fn()
  },
  render: ({ options, onChange }) => (
    <FormGroup
      label="Where do you live?"
      hint="Select a country from the list"
      error="Select a country"
      renderControl={(props) => (
        <Select {...props} options={options} name="country" onChange={onChange} />
      )}
    />
  )
}
