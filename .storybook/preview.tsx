import type { Preview } from '@storybook/react'
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from '@storybook/addon-viewport'

import 'govuk-frontend/dist/govuk/all.scss'
import React from 'react'

const preview: Preview = {
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        <Story />
      </div>
    )
  ],
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: {
        ...INITIAL_VIEWPORTS,
        ...MINIMAL_VIEWPORTS
      }
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
}

export default preview
