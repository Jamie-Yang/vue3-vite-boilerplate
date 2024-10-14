import js from '@eslint/js'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import configPrettier from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import tsEslint from 'typescript-eslint'

const typeScriptExtensions = ['.ts', '.cts', '.mts', '.tsx']

const allExtensions = [...typeScriptExtensions, '.js', '.jsx', '.mjs', '.cjs']

export default tsEslint.config(
  js.configs.recommended,
  ...tsEslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  ...vueTsEslintConfig(),
  importPlugin.flatConfigs.recommended,
  configPrettier,

  {
    name: 'browser',
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      ecmaVersion: 2024,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },

    settings: {
      'import/extensions': allExtensions,
      'import/external-module-folders': ['node_modules', 'node_modules/@types'],
      'import/parsers': {
        '@typescript-eslint/parser': typeScriptExtensions,
      },
      'import/resolver': {
        node: {
          extensions: allExtensions,
        },
        typescript: true,
        alias: {
          map: [['^@', './src/']],
          extensions: ['.ts', '.js', '.vue', '.json'],
        },
      },
    },

    rules: {
      'arrow-body-style': ['error', 'as-needed'],
      'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
      'spaced-comment': [
        'error',
        'always',
        {
          line: { markers: ['/'], exceptions: ['-', '+'] },
          block: { markers: ['!'], exceptions: ['*'], balanced: true },
        },
      ],

      'vue/multi-word-component-names': 'off',
      'vue/attribute-hyphenation': 'off',
      'vue/no-v-html': 'off',

      'import/named': 'off', // TypeScript compilation already ensures that named imports exist in the referenced module
      'import/no-named-as-default-member': 'off',
      'import/order': [
        'error',
        {
          'newlines-between': 'always',
          groups: ['type', 'builtin', 'external', ['internal', 'parent', 'sibling', 'index'], 'object', 'unknown'],
          pathGroups: [{ pattern: '@/**', group: 'external', position: 'after' }],
          pathGroupsExcludedImportTypes: ['type'],
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },

  {
    name: 'node',
    files: ['service/**/*.js', '.prettierrc.js', '.stylelintrc.js', 'babel.config.js'],

    languageOptions: {
      globals: {
        ...globals.node,
      },
    },

    rules: {},
  },

  {
    name: 'ignore',
    ignores: ['dist'],
  },
)
