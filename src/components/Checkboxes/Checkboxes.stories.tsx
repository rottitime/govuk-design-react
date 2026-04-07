import type { Meta, StoryObj } from '@storybook/react-vite'
import Input from '../Input/Input'
import Checkboxes from './Checkboxes'

const nationalityItems = [
  { id: 'nationality', label: 'British', value: 'british' },
  { id: 'nationality-2', label: 'Irish', value: 'irish' },
  { id: 'nationality-3', label: 'Citizen of another country', value: 'other' }
] as const

const meta: Meta<typeof Checkboxes> = {
  title: 'Atoms/Form/Checkboxes',
  component: Checkboxes,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `GOV.UK checkboxes for selecting one or more options. Matches the patterns in the [GOV.UK Design System — Checkboxes](https://design-system.service.gov.uk/components/checkboxes/). Load **govuk-frontend** JavaScript and initialise checkboxes (or \`initAll()\`) so conditional reveals and exclusive “none” behaviour match the design system.`
      }
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Uim7G5Td35hg5PTGQ79OA1/GOV.UK-Design-System--Community-?node-id=18169-10191&t=Ekuef8ZeLj0nwMCe-0'
    }
  },
  args: {
    name: 'nationality',
    legend: 'What is your nationality?',
    items: [...nationalityItems]
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithHint: Story = {
  args: {
    hint: 'Select all that apply',
    items: [...nationalityItems]
  }
}

export const WithErrorMessage: Story = {
  name: 'With error message',
  args: {
    legend: 'Which types of waste do you transport regularly?',
    name: 'waste',
    error: 'Please select an option',
    items: [
      {
        id: 'waste',
        label: 'Waste from animal carcasses',
        value: 'animal',
        hint: 'Nullam id dolor id nibh ultricies vehicula ut id elit.'
      },
      {
        id: 'waste-2',
        label: 'Waste from mines or quarries',
        value: 'mines',
        hint: 'Nullam id dolor id nibh ultricies vehicula ut id elit.'
      },
      {
        id: 'waste-3',
        label: 'Farm or agricultural waste',
        value: 'farm',
        hint: 'Nullam id dolor id nibh ultricies vehicula ut id elit.'
      }
    ]
  }
}

export const LegendAsPageHeading: Story = {
  name: 'Legend as page heading',
  args: {
    legend: 'Which types of waste do you transport regularly?',
    legendAsPageHeading: true,
    hint: 'Select all that apply',
    name: 'waste',
    items: [
      { id: 'waste', label: 'Waste from animal carcasses', value: 'animal' },
      { id: 'waste-2', label: 'Waste from mines or quarries', value: 'mines' },
      { id: 'waste-3', label: 'Farm or agricultural waste', value: 'farm' }
    ]
  }
}

export const Small: Story = {
  args: {
    legend: 'Filter by',
    name: 'nationality',
    small: true,
    items: [
      { id: 'nationality', label: 'a thing', value: 'a' },
      { id: 'nationality-2', label: 'another thing', value: 'b' },
      { id: 'nationality-3', label: 'this thing', value: 'c' }
    ]
  }
}

export const SmallWithHint: Story = {
  args: {
    ...Small.args,
    hint: 'Select all that apply'
  }
}

export const SmallWithError: Story = {
  name: 'Small with error',
  args: {
    legend: 'Filter by',
    name: 'nationality',
    small: true,
    error: 'Select a thing',
    items: [
      { id: 'nationality', label: 'a thing', value: 'a' },
      { id: 'nationality-2', label: 'another thing', value: 'b' },
      { id: 'nationality-3', label: 'this thing', value: 'c' }
    ]
  }
}

export const WithDividerAndExclusiveNone: Story = {
  name: 'With divider and exclusive “none”',
  args: {
    legend: 'Which types of waste do you transport regularly?',
    name: 'with-divider-and-none',
    items: [
      { id: 'with-divider-and-none', label: 'Waste from animal carcasses', value: 'animal' },
      { id: 'with-divider-and-none-2', label: 'Waste from mines or quarries', value: 'mines' },
      { id: 'with-divider-and-none-3', label: 'Farm or agricultural waste', value: 'farm' },
      { divider: true, text: 'or' },
      {
        id: 'with-divider-and-none-5',
        label: 'None of these',
        value: 'none',
        exclusive: true
      }
    ]
  }
}

export const WithConditionalReveal: Story = {
  name: 'With conditional reveal',
  args: {
    legend: 'How do you want to be contacted?',
    name: 'with-conditional-items',
    items: [
      {
        id: 'how-contacted',
        label: 'Email',
        value: 'email',
        conditional: (
          <>
            <label className="govuk-label" htmlFor="context-email">
              Email address
            </label>
            <Input
              className="govuk-!-width-one-third"
              name="context-email"
              type="text"
              id="context-email"
            />
          </>
        )
      },
      {
        id: 'how-contacted-2',
        label: 'Phone',
        value: 'phone',
        conditional: (
          <>
            <label className="govuk-label" htmlFor="contact-phone">
              Phone number
            </label>
            <Input
              className="govuk-!-width-one-third"
              name="contact-phone"
              type="text"
              id="contact-phone"
            />
          </>
        )
      },
      {
        id: 'how-contacted-3',
        label: 'Text message',
        value: 'text',
        conditional: (
          <>
            <label className="govuk-label" htmlFor="contact-text-message">
              Mobile phone number
            </label>
            <Input
              className="govuk-!-width-one-third"
              name="contact-text-message"
              type="text"
              id="contact-text-message"
            />
          </>
        )
      }
    ]
  }
}

export const WithPreCheckedConditional: Story = {
  name: 'With pre-checked values (conditional)',
  args: {
    legend: 'How do you want to be contacted?',
    name: 'how-contacted-checked',
    items: [
      {
        id: 'how-contacted-checked',
        label: 'Email',
        value: 'email',
        defaultChecked: true,
        conditional: (
          <>
            <label className="govuk-label" htmlFor="context-email-pre">
              Email address
            </label>
            <Input
              className="govuk-!-width-one-third"
              name="context-email"
              type="text"
              id="context-email-pre"
            />
          </>
        ),
        conditionalId: 'conditional-how-contacted-checked'
      },
      {
        id: 'how-contacted-checked-2',
        label: 'Phone',
        value: 'phone',
        conditional: (
          <>
            <label className="govuk-label" htmlFor="contact-phone-pre">
              Phone number
            </label>
            <Input
              className="govuk-!-width-one-third"
              name="contact-phone"
              type="text"
              id="contact-phone-pre"
            />
          </>
        ),
        conditionalId: 'conditional-how-contacted-checked-2'
      },
      {
        id: 'how-contacted-checked-3',
        label: 'Text message',
        value: 'text',
        defaultChecked: true,
        conditional: (
          <>
            <label className="govuk-label" htmlFor="contact-text-message-pre">
              Mobile phone number
            </label>
            <Input
              className="govuk-!-width-one-third"
              name="contact-text-message"
              type="text"
              id="contact-text-message-pre"
            />
          </>
        ),
        conditionalId: 'conditional-how-contacted-checked-3'
      }
    ]
  }
}

export const WithHintsOnItems: Story = {
  name: 'With hints on items (different names)',
  args: {
    legend: 'How do you want to sign in?',
    name: 'sign-in',
    items: [
      {
        id: 'government-gateway',
        name: 'gateway',
        label: 'Sign in with Government Gateway',
        value: 'gov-gateway',
        hint: "You'll have a user ID if you've registered for Self Assessment or filed a tax return online before."
      },
      {
        id: 'govuk-verify',
        name: 'verify',
        label: 'Sign in with GOV.UK Verify',
        value: 'gov-verify',
        hint: "You'll have an account if you've already proved your identity with either Barclays, CitizenSafe, Digidentity, Experian, Post Office, Royal Mail or SecureIdentity."
      }
    ]
  }
}

export const WithVeryLongOptionText: Story = {
  name: 'With very long option text',
  args: {
    legend: 'Which types of waste do you transport regularly?',
    name: 'waste-long',
    items: [
      {
        id: 'waste-long',
        label:
          'Waste from animal carcasses — Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vestibulum volutpat feugiat. Sed non mi nec nulla condimentum molestie in id magna.',
        value: 'animal'
      },
      {
        id: 'waste-long-2',
        label:
          'Waste from mines or quarries — Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vestibulum volutpat feugiat.',
        value: 'mines'
      }
    ]
  }
}
