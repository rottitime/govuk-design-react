import type { Meta, StoryObj } from '@storybook/react-vite'
import { Suspense } from 'react'
import Icon from '../components/Icon/Icon'
import { ICONS } from '../components/Icon/const'

const meta: Meta = {
  title: 'Foundation/Icons',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Gallery of all available icons. Add new icons to the `icons` folder and to the `icon` prop type to see them here.'
      }
    }
  },
  argTypes: {
    size: {
      control: { type: 'range', min: 12, max: 200, step: 1 },
      description: 'Size in pixels (uses font-size for scaling)'
    },
    color: {
      control: 'color',
      description: 'Color of the icon'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const AllIcons: Story = {
  render: (args) => (
    <Suspense fallback={<span style={{ fontSize: 24 }}>…</span>}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
          gap: 24,
          alignItems: 'end'
        }}
      >
        {ICONS.map((icon) => (
          <div
            key={icon}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8
            }}
          >
            <Icon {...args} icon={icon} size={args.size} />
            <span style={{ fontSize: 12, color: '#505a5f' }}>{icon}</span>
          </div>
        ))}
      </div>
    </Suspense>
  ),
  args: {
    size: 90,
    color: 'black'
  }
}
