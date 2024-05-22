import type { Meta, StoryObj } from '@storybook/react'
import Date from './Date'
import type { ComponentProps } from 'react'
import { fn } from '@storybook/test'

type Format = ComponentProps<typeof Date>['format']

const meta: Meta<typeof Date> = {
  title: 'Date',
  component: Date,
  tags: ['autodocs'],
  parameters: {
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
    seperator: {
      control: 'text',
      description: 'seperator between each date digit'
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
