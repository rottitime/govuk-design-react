// This file has been automatically migrated to valid ESM format by Storybook.
import { createRequire } from "node:module";
import type { StorybookConfig } from '@storybook/react-vite'

const require = createRequire(import.meta.url);

// const css =
//   require('../node_modules/govuk-frontend/dist/govuk/govuk-frontend.min.css').toString()

const config: StorybookConfig = {
  stories: ['../src/stories/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@chromatic-com/storybook',
    '@storybook/addon-a11y',
    'storybook-addon-remix-react-router',
    '@chromatic-com/storybook',
    '@storybook/addon-docs'
  ],
  core: {
    builder: '@storybook/builder-vite'
  },
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  staticDirs: ['../public'],
  viteFinal: (config, { configType }) => {
    //fix for github pages 404
    if (configType === 'PRODUCTION') {
      config.base = './'
    }

    return config
  },
  previewHead: (head) => `
    ${head}
  `
}
export default config
