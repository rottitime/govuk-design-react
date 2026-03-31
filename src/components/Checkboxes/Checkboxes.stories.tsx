import type { Meta, StoryObj } from '@storybook/react-vite'
import Checkboxes from './Checkboxes'

const meta: Meta<typeof Checkboxes> = {
  title: 'Atoms/Checkboxes',
  component: Checkboxes,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Let users select one or more options by using the checkboxes component. See https://design-system.service.gov.uk/components/checkboxes/ for more details.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'waste',
    fieldsetLegend: 'Which types of waste do you transport?',
    hint: 'Select all that apply.',
    items: [
      { value: 'animal', label: 'Waste from animal carcasses' },
      { value: 'mines', label: 'Waste from mines or quarries' },
      { value: 'farm', label: 'Farm or agricultural waste' }
    ]
  }
}

export const WithDivider: Story = {
  args: {
    name: 'nationality',
    fieldsetLegend: 'What is your nationality?',
    hint: 'If you have dual nationality, select all options that are relevant to you.',
    items: [
      { value: 'british', label: 'British' },
      { value: 'irish', label: 'Irish' },
      { divider: 'or' },
      { value: 'other', label: 'Citizen of another country' }
    ]
  }
}

export const Small: Story = {
  args: {
    name: 'organisation',
    fieldsetLegend: 'Organisation',
    small: true,
    items: [
      { value: 'hmrc', label: 'HM Revenue and Customs (HMRC)' },
      { value: 'employment', label: 'Employment Tribunal' },
      { value: 'mod', label: 'Ministry of Defence' }
    ]
  }
}
