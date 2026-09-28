import type { Meta, StoryObj } from '@storybook/react-vite'
import Tabs from './Tabs'

const meta: Meta<typeof Tabs> = {
  title: 'Atoms/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The tabs component lets users navigate between related sections of content, displaying one section at a time. See https://design-system.service.gov.uk/components/tabs/ for more details.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Contents',
    items: [
      {
        id: 'past-day',
        label: 'Past day',
        content: (
          <table className="govuk-table">
            <thead className="govuk-table__head">
              <tr className="govuk-table__row">
                <th className="govuk-table__header" scope="col">Case manager</th>
                <th className="govuk-table__header" scope="col">Cases opened</th>
              </tr>
            </thead>
            <tbody className="govuk-table__body">
              <tr className="govuk-table__row">
                <td className="govuk-table__cell">David Francis</td>
                <td className="govuk-table__cell">3</td>
              </tr>
            </tbody>
          </table>
        )
      },
      {
        id: 'past-week',
        label: 'Past week',
        content: <p className="govuk-body">Weekly content goes here</p>
      }
    ]
  }
}
