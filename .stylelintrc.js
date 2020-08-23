module.exports = {
  extends: 'stylelint-config-standard',
  plugins: ['stylelint-scss', 'stylelint-order'],
  ignoreFiles: [
    'node_modules/**',
    '**/*.md',
    '**/*.js',
    'src/assets/font/**',
    'src/assets/style/reset.css',
  ],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['extends', 'ignores', 'include', 'mixin', 'if', 'else', 'media', 'for'],
      },
    ],
    'number-leading-zero': 'never',
  },
}
