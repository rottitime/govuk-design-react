import type { Meta, StoryObj } from '@storybook/react-vite'
import FormGroup from '../FormGroup/FormGroup'
import Date from './Date'
import type { ComponentProps } from 'react'
import { fn } from 'storybook/test'

type Format = ComponentProps<typeof Date>['format']

const meta: Meta<typeof Date> = {
  title: 'Atoms/Form/Date',
  component: Date,
  tags: ['autodocs'],

  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Uim7G5Td35hg5PTGQ79OA1/GOV.UK-Design-System--Community-?node-id=17984-10767&t=pO0o7t7Qev4PDjPK-0'
    },
    docs: {
      description: {
        component: `A Date component for user Date. See https://design-system.service.gov.uk/components/date-input/ for more details.`
      }
    }
  },
  args: {
    onChange: fn()
  },
  argTypes: {
    format: {
      control: 'select',
      options: ['dd/mm/yyyy', 'dd/mm', 'mm/yyyy'] as Format[],
      description: 'Date format'
    },
    anchorId: {
      control: 'text',
      description: 'Override the first input id'
    },
    separator: {
      control: 'text',
      description: 'separator between each date digit'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    format: 'dd/mm/yyyy'
  }
}

export const Error: Story = {
  args: {
    ...Primary,
    error: true
  }
}

export const WithLabelHintAndError: Story = {
  name: 'With label, hint and error (FormGroup)',
  args: {
    format: 'dd/mm/yyyy' as Format,
    onChange: fn()
  },
  render: ({ format, onChange }) => (
    <FormGroup
      label="When is your passport due to expire?"
      hint="For example, 27 3 2040"
      error="Enter the expiry date"
      renderControl={(props) => (
        <Date {...Primary.args} {...props} format={format} onChange={onChange} />
      )}
    />
  )
}
