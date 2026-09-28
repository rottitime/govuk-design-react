import type { Meta, StoryObj } from '@storybook/react-vite'
import Table from './Table'

const meta: Meta<typeof Table> = {
  title: 'Atoms/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Use the table component to make information easier to compare and scan for users. See https://design-system.service.gov.uk/components/table/ for more details.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    caption: 'Dates and amounts',
    head: [
      { text: 'Date' },
      { text: 'Amount', format: 'numeric' }
    ],
    rows: [
      [{ text: 'First 6 weeks' }, { text: '£109.80 per week', format: 'numeric' }],
      [{ text: 'Next 33 weeks' }, { text: '£109.80 per week', format: 'numeric' }],
      [{ text: 'Total estimated pay' }, { text: '£4,282.20', format: 'numeric' }]
    ],
    firstCellIsHeader: true
  }
}
