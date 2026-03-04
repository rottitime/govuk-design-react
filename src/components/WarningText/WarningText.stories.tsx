import type { Meta, StoryObj } from '@storybook/react-vite'
import WarningText from './WarningText'

const meta: Meta<typeof WarningText> = {
  title: 'Atoms/WarningText',
  component: WarningText,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Use the warning text component when you need to warn users about something important, such as legal consequences of an action. See https://design-system.service.gov.uk/components/warning-text/ for more details.'
      }
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Uim7G5Td35hg5PTGQ79OA1/GOV.UK-Design-System--Community-?node-id=213-28&t=uKHtjFmxXYtHoZTO-0'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'You can be fined up to £5,000 if you do not register.'
  }
}

export const CustomAssistiveText: Story = {
  args: {
    children: 'You must return the form by 31 December.',
    assistiveText: 'Important'
  }
}
