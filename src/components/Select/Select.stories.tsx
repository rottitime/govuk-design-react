import type { Meta, StoryObj } from '@storybook/react-vite'
import Select from './Select'

const meta: Meta<typeof Select> = {
  title: 'Atoms/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The select component should only be used as a last resort in production because research shows that some users find selects very difficult to use. See https://design-system.service.gov.uk/components/select/ for more details.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: 'sort',
    name: 'sort',
    label: 'Sort by',
    options: [
      { value: 'published', label: 'Recently published' },
      { value: 'updated', label: 'Recently updated' },
      { value: 'views', label: 'Most views' },
      { value: 'comments', label: 'Most comments' }
    ]
  }
}

export const WithHint: Story = {
  args: {
    ...Default.args,
    hint: 'This determines the order results are shown in'
  }
}

export const WithError: Story = {
  args: {
    ...Default.args,
    errorMessage: 'Select an option'
  }
}
