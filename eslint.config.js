import js from '@eslint/js'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import prettierConfig from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import vuePlugin from 'eslint-plugin-vue'
import globals from 'globals'
import tsEslint from 'typescript-eslint'

export default tsEslint.config(
  js.configs.recommended,
  ...tsEslint.configs.strict,
  ...vuePlugin.configs['flat/recommended'],
  ...vueTsEslintConfig(),
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  prettierConfig,

  {
    name: 'browser',
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 'latest',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },

    settings: {
      'import/resolver': {
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

      'import/named': 'off', // TypeScript 已经确保了命名导入在引用的模块中存在
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
      globals: globals.node,
    },
  },

  {
    name: 'ignore',
    ignores: ['dist'],
  },
)
