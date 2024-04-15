export default {
  extends: ['stylelint-config-recess-order', 'stylelint-config-standard-scss', 'stylelint-config-standard-vue/scss'],
  ignoreFiles: ['node_modules/**', 'src/assets/font/**', 'src/assets/style/reset.css'],
  overrides: [
    {
      files: ['*.vue', '**/*.vue'],
      rules: {},
    },
  ],
  rules: {},
}
