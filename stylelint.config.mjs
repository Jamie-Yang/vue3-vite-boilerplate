export default {
  extends: ['stylelint-config-standard', 'stylelint-config-standard-scss'],
  ignoreFiles: ['node_modules/**', 'src/assets/font/**', 'src/assets/style/reset.css'],
  overrides: [
    {
      files: ['*.vue', '**/*.vue'],
      customSyntax: 'postcss-html',
    },
  ],
  rules: {
    'at-rule-no-unknown': [
      true,
      { ignoreAtRules: ['extends', 'ignores', 'include', 'mixin', 'if', 'else', 'media', 'for'] },
    ],
  },
}
