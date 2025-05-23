import js from '@eslint/js'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import { globalIgnores } from 'eslint/config'
import configPrettier from 'eslint-config-prettier'
import pluginImport from 'eslint-plugin-import'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'

export default defineConfigWithVueTs(
  /**
   * javascript config
   */
  js.configs.recommended,
  {
    name: '@project-config/javascript',

    files: ['**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs'],

    languageOptions: {
      globals: globals.browser,
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
    },
  },

  /**
   * typescript config
   */
  vueTsConfigs.recommendedTypeChecked,
  {
    name: '@project-config/typescript',

    files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.vue'],

    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },

    rules: {
      '@typescript-eslint/prefer-promise-reject-errors': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
    },
  },

  /**
   * import plugin config
   */
  pluginImport.flatConfigs.recommended,
  pluginImport.flatConfigs.typescript,
  {
    name: '@project-config/import',

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

  /**
   * vue config
   */
  ...pluginVue.configs['flat/recommended'],
  {
    name: '@project-config/vue',

    files: ['**/*.vue'],

    rules: {
      'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
      'vue/block-lang': ['error', { script: { lang: ['ts', 'tsx'] } }],
      'vue/multi-word-component-names': 'off',
      'vue/attribute-hyphenation': 'off',
      'vue/no-v-html': 'off',
    },
  },

  /**
   * prettier config
   */
  configPrettier,

  /**
   * node config
   */
  {
    name: '@project-config/node',

    files: ['./*.config.{js,ts,cjs}', '.prettierrc.js', './src/utils/dev-proxy/generate-proxy.ts'],

    languageOptions: {
      globals: globals.node,
    },
  },

  /**
   * ignore config
   */
  globalIgnores([
    '**/.DS_Store',
    '**/node_modules',
    '**/.husky',
    '**/Dockerfile',
    '**/package-lock.json',
    '**/pnpm-lock.yaml',
    '**/dist',
    '**/dist-*',
    '**/*-dist',
    '**/.output',
    '**/output',
    '**/.cache',
    '**/temp',
    '**/.temp',
    '**/tmp',
    '**/.tmp',
    '**/.history',
    '**/.changeset',
    '**/.vite-inspect',
    '**/CHANGELOG*.md',
    '**/*.min.*',
    '**/LICENSE*',
    '**/auto-import?(s).d.ts',
    '**/components.d.ts',
    '**/vite.config.mts.*',
    '**/*.sh',
    '**/*.ttf',
    '**/*.woff',
  ]),
)
