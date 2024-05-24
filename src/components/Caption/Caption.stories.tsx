import type { Meta, StoryObj } from '@storybook/react'
import Caption from './Caption'

const meta: Meta<typeof Caption> = {
  title: 'Caption',
  component: Caption,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Sometimes you may need to make it clear that a page is part of a larger section or group. To do this, you can use a heading with a caption above it. See https://design-system.service.gov.uk/styles/headings/#headings-with-captions for more Caption.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Completed'
  }
}
