import type { Meta, StoryObj } from '@storybook/react-vite'
import Heading from './Heading'
import { sizes } from '@/const'

const meta: Meta<typeof Heading> = {
  title: 'Foundation/Headings',
  component: Heading,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Use headings consistently to create a clear hierarchy on the page. This component applies GOV.UK heading classes (\`govuk-heading-xl\` through \`govuk-heading-s\`). See the [GOV.UK Design System — Headings](https://design-system.service.gov.uk/styles/headings/) for guidance.

When \`CssBaseline\` is used, bare \`h1\`–\`h6\` elements **without a \`class\` attribute** get default sizes (h1 → xl, h2 → l, h3 → m, h4–h6 → s).

Use the \`as\` prop to apply a heading style to a different HTML element (for example an \`h2\` that uses the extra-large style). If you use a non-heading element for visible heading text, add an appropriate ARIA role (for example \`role="heading"\` and \`aria-level\`) so assistive technologies still get a sensible document outline.`
      }
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Uim7G5Td35hg5PTGQ79OA1/GOV.UK-Design-System--Community-?node-id=484-9&t=Bgrqv9wiV3JK51jZ-0'
    }
  },
  argTypes: {
    level: {
      description: 'Default heading level when `as` is omitted (h1–h6).',
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6]
    },
    size: {
      description:
        'Visual size: extra-large (govuk-heading-xl), large (l), medium (m), small (s).',
      options: Object.keys(sizes),
      control: { type: 'select' }
    },
    as: {
      description:
        'Optional intrinsic HTML tag name (any element React supports), e.g. `h2`, `header`, `label`, `li`, `div`. Leave empty to use `h{level}`.',
      control: 'text'
    },
    children: {
      control: 'text'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const ExtraLarge: Story = {
  args: {
    size: 'extra-large',
    children: 'Extra large heading'
  }
}

export const Large: Story = {
  args: {
    size: 'large',
    children: 'Large heading'
  }
}

export const Medium: Story = {
  args: {
    size: 'medium',
    children: 'Medium heading'
  }
}

export const Small: Story = {
  args: {
    size: 'small',
    children: 'Small heading'
  }
}

export const WithCaption: Story = {
  args: {
    size: 'large',
    children: 'Your details',
    caption: 'Question 3 of 9',
    captionSize: 'large'
  }
}

/** Same visual size as extra-large, but renders an `h2` (for example when the page title is not an `h1`). */
export const PolymorphicAs: Story = {
  args: {
    as: 'h2',
    level: 1,
    size: 'extra-large',
    children: 'This is an h2 with xl styling'
  }
}

/** Bare heading tags with no `class` pick up default styles when `CssBaseline` is on the page. */
export const BareHeadingsBaseline: Story = {
  render: () => (
    <>
      <h1>Plain h1 (xl)</h1>
      <h2>Plain h2 (l)</h2>
      <h3>Plain h3 (m)</h3>
      <h4>Plain h4 (s)</h4>
    </>
  )
}
