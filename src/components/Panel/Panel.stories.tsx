import type { Meta, StoryObj } from '@storybook/react-vite'
import Panel from './Panel'

const meta: Meta<typeof Panel> = {
  title: 'Panel',
  component: Panel,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The panel component is a visible container used on confirmation or results pages to highlight important content. See documentation https://design-system.service.gov.uk/components/panel/ for more details.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    title: 'Application complete',
    children: (
      <>
        Your reference number
        <br />
        <strong>HDJ2123F</strong>
      </>
    )
  }
}
