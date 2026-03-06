import type { Meta, StoryObj } from '@storybook/react-vite'
import SummaryList from './SummaryList'

const meta: Meta<typeof SummaryList> = {
  title: 'Atoms/SummaryList',
  component: SummaryList,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Use the summary list to summarise information, for example, a user's responses at the end of a form. See https://design-system.service.gov.uk/components/summary-list/ for more details.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    rows: [
      {
        key: 'Name',
        value: 'Sarah Philips',
        actions: [{ text: 'Change', href: '#', visuallyHiddenText: 'name' }]
      },
      {
        key: 'Date of birth',
        value: '5 January 1978',
        actions: [
          { text: 'Change', href: '#', visuallyHiddenText: 'date of birth' }
        ]
      },
      {
        key: 'Address',
        value: '72 Guild Street, London, SE23 6FH',
        actions: [
          { text: 'Change', href: '#', visuallyHiddenText: 'address' }
        ]
      }
    ]
  }
}

export const WithoutActions: Story = {
  args: {
    rows: [
      { key: 'Name', value: 'Sarah Philips' },
      { key: 'Date of birth', value: '5 January 1978' },
      { key: 'Address', value: '72 Guild Street, London, SE23 6FH' }
    ]
  }
}

export const NoBorder: Story = {
  args: {
    ...WithoutActions.args,
    noBorder: true
  }
}
