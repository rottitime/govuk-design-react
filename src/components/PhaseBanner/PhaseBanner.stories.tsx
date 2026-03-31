import type { Meta, StoryObj } from '@storybook/react-vite'
import PhaseBanner from './PhaseBanner'

const meta: Meta<typeof PhaseBanner> = {
  title: 'Atoms/PhaseBanner',
  component: PhaseBanner,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Use the phase banner component to show users your service is still being worked on. See https://design-system.service.gov.uk/components/phase-banner/ for more details.'
      }
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Uim7G5Td35hg5PTGQ79OA1/GOV.UK-Design-System--Community-?node-id=20226-12488&t=iHqp2471YNPlJMvO-0'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Alpha: Story = {
  args: {
    tag: 'Alpha',
    children: (
      <>
        This is a new service – your{' '}
        <a className="govuk-link" href="/feedback">
          feedback
        </a>{' '}
        will help us to improve it.
      </>
    )
  }
}

export const Beta: Story = {
  args: {
    tag: 'Beta',
    children: (
      <>
        This is a new service – your{' '}
        <a className="govuk-link" href="/feedback">
          feedback
        </a>{' '}
        will help us to improve it.
      </>
    )
  }
}
