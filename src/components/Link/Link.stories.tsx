import type { Meta, StoryObj } from '@storybook/react-vite'
import Link from './Link'
import { fn } from 'storybook/test'
import { action } from 'storybook/actions'

const meta: Meta<typeof Link> = {
  title: 'Atoms/Link',
  component: Link,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `A Link component for form fields. See documentation https://design-system.service.gov.uk/styles/links/ for more details.`
      }
    }
  }
  // args: { onClick: fn() }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Example Link',
    href: '/?path=/story/atoms-link--primary'
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
