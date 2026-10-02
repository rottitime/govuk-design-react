import type { Meta, StoryObj } from '@storybook/react-vite'
import Textarea from './Textarea'

const meta: Meta<typeof Textarea> = {
  title: 'Atoms/Form/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A textarea component for user input. It can also render the GOV.UK character count pattern when maxLength or maxWords is provided. See https://design-system.service.gov.uk/components/textarea/ and https://design-system.service.gov.uk/components/character-count/ for more details.'
      }
    },
    design: {
      type: 'figma',
      // TODO: Replace with the component node URL when the GOV.UK Design System Community Figma kit exposes Textarea and Character count node links.
      url: 'https://www.figma.com/design/Uim7G5Td35hg5PTGQ79OA1/GOV.UK-Design-System--Community-?node-id=23-233&p=f&t=VUsK8fv9aRbXGOJv-0'
    }
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'The content of the Textarea element'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'The content of the Textarea element'
  }
}

export const WithCharacterCount: Story = {
  args: {
    id: 'more-detail',
    name: 'moreDetail',
    rows: 5,
    maxLength: 200,
    'aria-describedby': 'more-detail-hint'
  },
  render: (args) => (
    <div className="govuk-form-group">
      <h1 className="govuk-label-wrapper">
        <label className="govuk-label govuk-label--l" htmlFor="more-detail">
          Can you provide more detail?
        </label>
      </h1>
      <div id="more-detail-hint" className="govuk-hint">
        Do not include personal or financial information, like your National Insurance
        number or credit card details.
      </div>
      <Textarea {...args} />
    </div>
  )
}

export const WithWordCount: Story = {
  args: {
    id: 'job-description',
    name: 'jobDescription',
    rows: 5,
    maxWords: 150
  },
  render: (args) => (
    <div className="govuk-form-group">
      <label className="govuk-label govuk-label--l" htmlFor="job-description">
        Enter a job description
      </label>
      <Textarea {...args} />
    </div>
  )
}

export const WithThreshold: Story = {
  args: {
    id: 'more-detail-with-threshold',
    name: 'moreDetailWithThreshold',
    rows: 5,
    maxLength: 400,
    threshold: 75
  },
  render: (args) => (
    <div className="govuk-form-group">
      <label className="govuk-label govuk-label--l" htmlFor="more-detail-with-threshold">
        Can you provide more detail?
      </label>
      <Textarea {...args} />
    </div>
  )
}
