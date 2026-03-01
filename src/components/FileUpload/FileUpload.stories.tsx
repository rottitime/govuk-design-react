import type { Meta, StoryObj } from '@storybook/react-vite'
import FileUpload from './FileUpload'

const meta: Meta<typeof FileUpload> = {
  title: 'File upload',
  component: FileUpload,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `A FileUpload component for form fields.  See https://design-system.service.gov.uk/components/file-upload/ for more details`
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    label: 'Upload a file'
  }
}

export const WithError: Story = {
  args: {
    ...Primary.args,
    error: 'The CSV must be smaller than 2MB'
  }
}
