import type { Meta, StoryObj } from '@storybook/react-vite'
import Fieldset from './Fieldset'

const meta: Meta<typeof Fieldset> = {
  title: 'Atoms/Form/Fieldset',
  component: Fieldset,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Use the fieldset component to group related form inputs together with a legend describing the group. See https://design-system.service.gov.uk/components/fieldset/ for more details.'
      }
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Uim7G5Td35hg5PTGQ79OA1/GOV.UK-Design-System--Community-'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    legend: 'What is your address?',
    children: <p className="govuk-body">Form inputs go here.</p>
  }
}

export const AsPageHeading: Story = {
  args: {
    legend: 'What is your address?',
    legendAsPageHeading: true,
    size: 'large',
    children: <p className="govuk-body">Form inputs go here.</p>
  }
}
