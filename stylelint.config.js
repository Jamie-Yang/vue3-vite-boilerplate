export default {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-standard-vue/scss', 'stylelint-config-recess-order'],

  ignoreFiles: ['node_modules/**', 'src/assets/fonts/**', 'dist/**'],

  overrides: [
    {
      files: ['*.vue', '**/*.vue'],
      rules: {},
    },
  ],

  rules: {
    // 选择器命名：关闭类选择器命名模式检查，支持 BEM、原子化等各种命名方式
    'selector-class-pattern': null,

    // 颜色规范：禁止使用命名颜色
    'color-named': 'never',

    // 值规范：字体粗细使用数字
    'font-weight-notation': 'numeric',

    // 单位规范：禁用印刷媒体单位
    'unit-disallowed-list': ['pt', 'cm', 'mm', 'in', 'pc'],

    // 选择器复杂度：限制各类选择器使用数量，避免过度嵌套
    'selector-max-id': 1,
    'selector-max-universal': 1,
    'selector-max-type': 3,
    'selector-no-qualifying-type': [true, { ignore: ['attribute', 'class'] }],
  },
}
