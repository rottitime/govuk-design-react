import type { Meta, StoryObj } from '@storybook/react-vite'
import Caption from './Caption'

const meta: Meta<typeof Caption> = {
  title: 'Atoms/Caption',
  component: Caption,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Uim7G5Td35hg5PTGQ79OA1/GOV.UK-Design-System--Community-?node-id=724-19&t=pO0o7t7Qev4PDjPK-0'
    },
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
