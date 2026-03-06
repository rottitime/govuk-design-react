import type { Meta, StoryObj } from '@storybook/react-vite'
import SkipLink from './SkipLink'

const meta: Meta<typeof SkipLink> = {
  title: 'Atoms/SkipLink',
  component: SkipLink,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Use the skip link component to help keyboard-only users skip to the main content on a page. It is the first focusable element on the page. See https://design-system.service.gov.uk/components/skip-link/ for more details.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}

export const CustomTarget: Story = {
  args: {
    href: '#main-content',
    children: 'Skip to main content'
  }
}
