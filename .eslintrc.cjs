/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,

  env: {
    browser: true,
    node: true,
  },

  parserOptions: {
    ecmaVersion: 'latest',
  },

  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],

  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: true,
      alias: {
        map: [['^@', './src/']],
        extensions: ['.ts', '.js', '.vue', '.json'],
      },
    },
  },

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'arrow-body-style': ['error', 'as-needed'],
    'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],

    'vue/multi-word-component-names': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/no-v-html': 'off',

    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: ['type', 'builtin', 'external', ['internal', 'parent', 'sibling', 'index'], 'object', 'unknown'],
        pathGroups: [{ pattern: '@/**', group: 'external', position: 'after' }],
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
  },
}
