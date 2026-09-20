import type { Meta, StoryObj } from '@storybook/react-vite'
import Input from '../Input/Input'
import Radios from './Radios'

const whereItems = [
  { id: 'where-you-live', label: 'England', value: 'england' },
  { id: 'where-you-live-2', label: 'Scotland', value: 'scotland' },
  { id: 'where-you-live-3', label: 'Wales', value: 'wales' },
  { id: 'where-you-live-4', label: 'Northern Ireland', value: 'northern-ireland' }
] as const

const meta: Meta<typeof Radios> = {
  title: 'Atoms/Form/Radios',
  component: Radios,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `GOV.UK radios for selecting a single option from a list. Matches the patterns in the [GOV.UK Design System — Radios](https://design-system.service.gov.uk/components/radios/). Load **govuk-frontend** JavaScript and initialise radios (or \`initAll()\`) so conditional reveals match the design system.`
      }
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Uim7G5Td35hg5PTGQ79OA1/GOV.UK-Design-System--Community-'
    }
  },
  args: {
    name: 'where-you-live',
    legend: 'Where do you live?',
    items: [...whereItems]
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithHint: Story = {
  args: {
    hint: 'Select one option',
    items: [...whereItems]
  }
}

export const WithErrorMessage: Story = {
  name: 'With error message',
  args: {
    error: 'Select where you live',
    items: [...whereItems]
  }
}

export const LegendAsPageHeading: Story = {
  name: 'Legend as page heading',
  args: {
    legendAsPageHeading: true,
    items: [...whereItems]
  }
}

export const Inline: Story = {
  args: {
    legend: 'Have you changed your name?',
    name: 'changed-name',
    inline: true,
    items: [
      { id: 'changed-name-yes', label: 'Yes', value: 'yes' },
      { id: 'changed-name-no', label: 'No', value: 'no' }
    ]
  }
}

export const Small: Story = {
  args: {
    small: true,
    items: [...whereItems]
  }
}

export const WithDivider: Story = {
  name: 'With divider',
  args: {
    legend: 'How do you want to sign in?',
    name: 'sign-in',
    items: [
      { id: 'government-gateway', label: 'Use Government Gateway', value: 'gateway' },
      { id: 'nino', label: 'Use your National Insurance number', value: 'nino' },
      { divider: true, text: 'or' },
      { id: 'create-account', label: 'Create an account', value: 'create' }
    ]
  }
}

export const WithConditionalReveal: Story = {
  name: 'With conditional reveal',
  args: {
    legend: 'How would you prefer to be contacted?',
    name: 'contact',
    items: [
      {
        id: 'contact-email',
        label: 'Email',
        value: 'email',
        conditional: (
          <>
            <label className="govuk-label" htmlFor="contact-by-email">
              Email address
            </label>
            <Input
              className="govuk-!-width-one-third"
              name="contact-by-email"
              type="email"
              id="contact-by-email"
            />
          </>
        )
      },
      {
        id: 'contact-phone',
        label: 'Phone',
        value: 'phone',
        conditional: (
          <>
            <label className="govuk-label" htmlFor="contact-by-phone">
              Phone number
            </label>
            <Input
              className="govuk-!-width-one-third"
              name="contact-by-phone"
              type="tel"
              id="contact-by-phone"
            />
          </>
        )
      }
    ]
  }
}
