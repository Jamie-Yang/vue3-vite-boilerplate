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
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    'plugin:import/recommended',
    'plugin:import/typescript',
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
