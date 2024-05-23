import type { Meta, StoryObj } from '@storybook/react'
import Heading from './Heading'
import { sizes } from '@/const'

const meta: Meta<typeof Heading> = {
  title: 'Headings',
  component: Heading,

  parameters: {
    docs: {
      description: {
        component: `A Heading component for form fields. Will default as H1. See https://design-system.service.gov.uk/styles/headings/ for more details`
      }
    }
  },
  argTypes: {
    level: {
      description: 'The tag level e.g. h1, h2, h3, h4, h5, h6'
    },
    size: {
      description: 'Size of the heading'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'govuk-heading'
  },
  decorators: [
    (Story) => {
      const { props } = Story()
      const { children } = props

      return (
        <>
          {Object.entries(sizes).map(([key, value]) => (
            <Heading key={key} size={key} {...props}>{`${children}-${value}`}</Heading>
          ))}
        </>
      )
    }
  ]
}

export const SingleHeading: Story = {
  args: {
    children: 'govuk-heading'
  }
}
