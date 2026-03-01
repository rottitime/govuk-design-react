import type { Preview } from '@storybook/react-vite'
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from 'storybook/viewport'
import React from 'react'

import CSSBaseline from '../src/components/CssBaseline/CssBaseline'
// import 'govuk-frontend/dist/govuk/all.scss'  //using CSSBaseline instead

const preview: Preview = {
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: '3em' }}>
        <CSSBaseline />
        <Story />
      </div>
    )
  ],
  parameters: {
    layout: 'fullscreen',
    options: {
      storySort: {
        order: ['Introduction', 'Colors']
      }
    },
    viewport: {
      options: {
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
