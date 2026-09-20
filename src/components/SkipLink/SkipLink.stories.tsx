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
          'Use the skip link component to help keyboard-only users skip to the main content on a page. It is visually hidden until focused. See https://design-system.service.gov.uk/components/skip-link/ for more details.'
      }
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Uim7G5Td35hg5PTGQ79OA1/GOV.UK-Design-System--Community-'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Skip to main content'
  }
}

export const CustomTarget: Story = {
  args: {
    href: '#content',
    children: 'Skip to content'
  }
}
