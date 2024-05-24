import type { Meta, StoryObj } from '@storybook/react'
import { withRouter } from 'storybook-addon-remix-react-router'
import Link from './Link'

const meta: Meta<typeof Link> = {
  title: 'Link',
  component: Link,
  tags: ['autodocs'],
  decorators: [withRouter],
  parameters: {
    docs: {
      description: {
        component: `A Link component for form fields. See documentation https://design-system.service.gov.uk/styles/links/ for more details.`
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Example Link',
    href: '/?path=/docs/link--docs'
  }
}

export const ExternalLink: Story = {
  args: {
    ...Primary.args,
    href: 'https://github.com/rottitime/govuk-design-react',
    target: '_blank'
  }
}

export const Button: Story = {
  args: {
    ...Primary.args,
    button: true
  }
}
