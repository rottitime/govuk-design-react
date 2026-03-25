import type { Meta, StoryObj } from '@storybook/react-vite'
import Fieldset from './Fieldset'

const meta: Meta<typeof Fieldset> = {
  title: 'Atoms/Fieldset',
  component: Fieldset,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Use the fieldset component to group related form inputs. See https://design-system.service.gov.uk/components/fieldset/ for more details.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    legend: 'What is your address?',
    children: <p>Form fields go here</p>
  }
}

export const AsPageHeading: Story = {
  args: {
    legend: 'What is your date of birth?',
    legendIsHeading: true,
    legendSize: 'xl',
    children: <p>Date input fields go here</p>
  }
}
