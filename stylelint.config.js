export default {
  extends: ['stylelint-config-recommended-scss', 'stylelint-config-recommended-vue/scss'],
  ignoreFiles: ['node_modules/**', 'dist/**'],
  rules: {
    'selector-max-id': 1,
    'max-nesting-depth': 3,
    'font-weight-notation': 'numeric',
  },
}
