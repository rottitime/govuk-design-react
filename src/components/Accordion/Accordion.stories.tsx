import type { Meta, StoryObj } from '@storybook/react-vite'
import Accordion from './Accordion'

const meta: Meta<typeof Accordion> = {
  title: 'Atoms/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The accordion component lets users show and hide sections of related content on a page. See https://design-system.service.gov.uk/components/accordion/ for more details.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    sections: [
      {
        heading: 'Writing well for the web',
        content: (
          <p className="govuk-body">
            This is the content for Writing well for the web.
          </p>
        )
      },
      {
        heading: 'Writing well for specialists',
        content: (
          <p className="govuk-body">
            This is the content for Writing well for specialists.
          </p>
        )
      },
      {
        heading: 'Know your audience',
        content: (
          <p className="govuk-body">
            This is the content for Know your audience.
          </p>
        )
      },
      {
        heading: 'How people read',
        content: (
          <p className="govuk-body">
            This is the content for How people read.
          </p>
        )
      }
    ]
  }
}

export const WithSummary: Story = {
  args: {
    sections: [
      {
        heading: 'Understanding agile',
        summary: 'Introductory information about agile.',
        content: (
          <p className="govuk-body">
            Content about understanding agile.
          </p>
        )
      },
      {
        heading: 'Working with agile methods',
        summary: 'Detailed guidance on methods.',
        content: (
          <p className="govuk-body">
            Content about working with agile methods.
          </p>
        )
      }
    ]
  }
}
