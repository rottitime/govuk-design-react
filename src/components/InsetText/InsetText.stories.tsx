import type { Meta, StoryObj } from '@storybook/react-vite'
import InsetText from './InsetText'

const meta: Meta<typeof InsetText> = {
  title: 'Atoms/InsetText',
  component: InsetText,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Use the inset text component to differentiate a block of text from the surrounding content. See https://design-system.service.gov.uk/components/inset-text/ for more details.'
      }
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Uim7G5Td35hg5PTGQ79OA1/GOV.UK-Design-System--Community-?node-id=18774-13519&t=pO0o7t7Qev4PDjPK-0'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'It can take up to 8 weeks to renew your passport.'
  }
}

export const WithHTML: Story = {
  args: {
    children: (
      <>
        <p>You'll need to provide:</p>
        <ul>
          <li>your passport number</li>
          <li>the date it was issued</li>
        </ul>
      </>
    )
  }
}
