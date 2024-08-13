import stylistic from '@stylistic/eslint-plugin'
import svelte from 'eslint-plugin-svelte'
import prettier from 'eslint-config-prettier'
import globals from 'globals'
import neostandard from 'neostandard'

/** @type {import('eslint').Linter.Config[]} */
export default [
  stylistic.configs['all-flat'],
  ...neostandard({ ts: true }),
  ...svelte.configs['flat/recommended'],
  prettier,
  ...svelte.configs['flat/prettier'],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parserOptions: {
        parser: ts.parser
      }
    }
  },
  {
    ignores: [
      "build/",
      '.svelte-kit/',
      'dist/'
    ],
  },
  {
    rules: {
      '@stylistic/indent': [
        "error",
        2
      ],
      '@stylistic/comma-dangle': [
        "error",
        'never'
      ],
    },
    ignores: ['*.svelte']
  }
]
