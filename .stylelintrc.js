module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  plugins: ['stylelint-scss'],
  ignoreFiles: ['node_modules/**', 'src/assets/font/**', 'src/assets/style/reset.css'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['extends', 'ignores', 'include', 'mixin', 'if', 'else', 'media', 'for'],
      },
    ],
  },
}
