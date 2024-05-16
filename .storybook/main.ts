import type { StorybookConfig } from '@storybook/react-vite'

// const css =
//   require('../node_modules/govuk-frontend/dist/govuk/govuk-frontend.min.css').toString()

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y'
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
