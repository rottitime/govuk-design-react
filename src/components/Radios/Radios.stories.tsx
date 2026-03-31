import type { Meta, StoryObj } from '@storybook/react-vite'
import Radios from './Radios'

const meta: Meta<typeof Radios> = {
  title: 'Atoms/Radios',
  component: Radios,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Use the radios component when users can only select one option from a list. See https://design-system.service.gov.uk/components/radios/ for more details.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'where-do-you-live',
    fieldset: {
      legend: 'Where do you live?',
      legendSize: 'l',
      legendIsHeading: true
    },
    items: [
      { value: 'england', label: 'England' },
      { value: 'scotland', label: 'Scotland' },
      { value: 'wales', label: 'Wales' },
      { value: 'northern-ireland', label: 'Northern Ireland' }
    ]
  }
}

export const Inline: Story = {
  args: {
    ...Default.args,
    inline: true,
    fieldset: { legend: 'Have you changed your name?', legendSize: 'l' },
    items: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' }
    ]
  }
}

export const WithDivider: Story = {
  args: {
    name: 'contact',
    fieldset: { legend: 'How do you want to be contacted?', legendSize: 'l' },
    items: [
      { value: 'email', label: 'Email' },
      { value: 'phone', label: 'Phone' },
      { value: 'text', label: 'Text message' },
      { type: 'divider', text: 'or' },
      { value: 'none', label: 'None of the above' }
    ]
  }
}
