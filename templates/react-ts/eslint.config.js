import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'
import globals from 'globals'

export default [
  // Base JS rules
  js.configs.recommended,

  // Browser globals (React app)
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: globals.browser,
    },
  },

  // TypeScript (non type-aware, for configs & tooling)
  ...tseslint.configs.recommended,

  // Type-aware linting ONLY for src
  ...tseslint.configs.recommendedTypeChecked.map(config => ({
    ...config,
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      ...config.languageOptions,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  })),

  // Node.js files (configs)
  {
    files: ['*.config.*', 'vite.config.ts'],
    languageOptions: {
      globals: globals.node,
    },
  },

  // Disable rules conflicting with Prettier
  prettier,
]
