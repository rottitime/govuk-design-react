import type { Meta, StoryObj } from '@storybook/react-vite'
import { Suspense } from 'react'
import Icon from './Icon'
import { ICONS } from './const'

const meta: Meta<typeof Icon> = {
  title: 'Atoms/Icon',
  component: Icon,
  tags: ['autodocs'],
  args: {
    icon: 'Crest',
    size: 100,
    title: 'Government crest',
    color: 'black'
  },
  render: (args) => (
    <Suspense fallback={<span style={{ fontSize: 24 }}>…</span>}>
      <Icon {...args} />
    </Suspense>
  ),
  parameters: {
    docs: {
      description: {
        component:
          'Icon component for GOV.UK branding and UI icons. Icons are loaded on demand. Add more icons under `src/components/Icon/icons/` and extend the `icon` prop type.'
      }
    }
  },
  argTypes: {
    icon: {
      control: 'select',
      options: ICONS,
      description: 'Icon to display'
    },
    size: {
      control: { type: 'range', min: 12, max: 96, step: 4 },
      description: 'Size in pixels (uses font-size for scaling)'
    },
    title: {
      control: 'text',
      description: 'Accessible title for the SVG'
    },
    color: {
      control: 'color',
      description: 'Color of the icon'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Crest: Story = {
  args: {
    icon: 'Crest'
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Uim7G5Td35hg5PTGQ79OA1/GOV.UK-Design-System--Community-?node-id=19792-14486&t=pO0o7t7Qev4PDjPK-0'
    }
  }
}

export const CrownLogo: Story = {
  args: {
    icon: 'CrownLogo'
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Uim7G5Td35hg5PTGQ79OA1/GOV.UK-Design-System--Community-?node-id=18169-11293&t=pO0o7t7Qev4PDjPK-0'
    },
    docs: {
      description: {
        story: 'Deprecated. Use Crest for current government branding.'
      }
    }
  }
}

export const CrownLogoQueen: Story = {
  args: {
    icon: 'CrownLogoQueen'
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Uim7G5Td35hg5PTGQ79OA1/GOV.UK-Design-System--Community-?node-id=18169-11293&t=pO0o7t7Qev4PDjPK-0'
    },
    docs: {
      description: {
        story: 'Deprecated. Use Crest for current government branding.'
      }
    }
  }
}

export const Search: Story = {
  args: {
    icon: 'Search'
  }
}
