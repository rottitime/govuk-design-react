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
        href: '#',
        status: { text: 'Completed' }
      },
      {
        title: 'Registered office address',
        href: '#',
        hint: 'Include your full address',
        status: { text: 'Incomplete', tagColour: 'blue' }
      },
      {
        title: 'Submit application',
        status: { text: 'Cannot start yet', tagColour: 'grey' }
      }
    ]
  }
}
