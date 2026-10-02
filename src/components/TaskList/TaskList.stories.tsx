import type { Meta, StoryObj } from '@storybook/react-vite'
import TaskList from './TaskList'

const meta: Meta<typeof TaskList> = {
  title: 'Atoms/TaskList',
  component: TaskList,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The task list component displays all the tasks a user needs to complete, and allows users to easily identify which ones are done and which they still need to do. See https://design-system.service.gov.uk/components/task-list/ for more details.'
      }
    },
    design: {
      type: 'figma',
      // TODO: Replace with the component node URL when the GOV.UK Design System Community Figma kit exposes a Task list node link.
      url: 'https://www.figma.com/design/Uim7G5Td35hg5PTGQ79OA1/GOV.UK-Design-System--Community-?node-id=23-233&p=f&t=VUsK8fv9aRbXGOJv-0'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      {
        title: 'Company directors',
        href: '#company-directors',
        status: { text: 'Completed' }
      },
      {
        id: 'registered-office-address',
        title: 'Registered office address',
        href: '#registered-office-address',
        hint: 'Include your full address',
        status: { text: 'Incomplete', tagColour: 'blue' }
      },
      {
        id: 'submit-application',
        title: 'Submit application',
        description: 'You cannot submit until every section is complete',
        status: { text: 'Cannot start yet', tagColour: 'grey' }
      }
    ]
  }
}
