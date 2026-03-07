import { defineConfig, globalIgnores } from 'eslint/config'
import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import storybook from 'eslint-plugin-storybook'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import reactRefresh from 'eslint-plugin-react-refresh'
import vitest from '@vitest/eslint-plugin'
import prettier from 'eslint-plugin-prettier'
import eslintConfigPrettier from 'eslint-config-prettier'

export default defineConfig([
  // Include .storybook directory for linting (per Storybook eslint-plugin docs)
  globalIgnores(['!.storybook'], 'Include Storybook Directory'),
  { ignores: ['dist/**', 'coverage/**', '.prettierrc.*', '.storybook/static/**'] },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  ...storybook.configs['flat/recommended'],

  {
    languageOptions: {
      globals: { ...globals.browser },
      parserOptions: { ecmaFeatures: { jsx: true } }
    }
  },

  jsxA11y.flatConfigs.recommended,

  // React: recommended + jsx-runtime (React 17+), prop-types off for TypeScript
  {
    ...react.configs.flat.recommended,
    ...react.configs.flat['jsx-runtime'],
    settings: { react: { version: 'detect' } },
    rules: {
      ...react.configs.flat.recommended.rules,
      ...react.configs.flat['jsx-runtime'].rules,
      'react/prop-types': 'off'
    }
  },

  {
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier
    },
    rules: {
      'react/no-unescaped-entities': 'off',
      'prefer-const': 'error',
      'no-console': 'warn',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
      ],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }]
    }
  },

  // Vitest: globals and recommended rules for test files; allow console in tests
  {
    files: ['**/*.test.ts', '**/*.test.tsx'],
    plugins: { vitest },
    languageOptions: {
      globals: { ...vitest.environments.env.globals }
    },
    rules: {
      ...vitest.configs.recommended.rules,
      'no-console': 'off'
    }
  },

  eslintConfigPrettier
])
