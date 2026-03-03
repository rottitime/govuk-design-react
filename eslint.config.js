import { defineConfig, globalIgnores } from 'eslint/config'
import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import storybook from 'eslint-plugin-storybook'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import reactRefresh from 'eslint-plugin-react-refresh'
import prettier from 'eslint-plugin-prettier'
import eslintConfigPrettier from 'eslint-config-prettier'

export default defineConfig([
  // Include .storybook directory for linting (per Storybook eslint-plugin docs)
  globalIgnores(['!.storybook'], 'Include Storybook Directory'),
  { ignores: ['dist/**', 'coverage/**', '.prettierrc.*', '.storybook/static/**'] },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...storybook.configs['flat/recommended'],

  {
    languageOptions: {
      globals: { ...globals.browser },
      parserOptions: { ecmaFeatures: { jsx: true } }
    }
  },

  jsxA11y.flatConfigs.recommended,

  {
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier
    },
    rules: {
      'no-console': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }]
    }
  },

  { files: ['**/*.test.ts', '**/*.test.tsx'], rules: {} },

  eslintConfigPrettier
])
