module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },

  // the ts-eslint recommended ruleset sets the parser so we need to set it back
  parser: 'vue-eslint-parser',

  parserOptions: {
    ecmaVersion: 2021,
    parser: '@typescript-eslint/parser',
    extraFileExtensions: ['.vue'],
    ecmaFeatures: { jsx: true },
    sourceType: 'module',
  },

  plugins: ['@typescript-eslint'],

  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
}
