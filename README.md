# vue3-mobile

开箱即用的 Vue 3 移动端 Web 应用脚手架

## 技术栈

- Vue 3
- Vue Router 4
- Pinia 2
- Axios
- TypeScript
- Vite
- ESLint
- Prettier
- Stylelint
- Commitlint
- Husky
- And more!

## VSCode 推荐配置

```jsonc
{
  // 默认格式化程序指定为 prettier
  "editor.defaultFormatter": "esbenp.prettier-vscode",

  // 保存时格式化代码
  "editor.formatOnSave": true,

  // 手动保存时，运行代码自动修复
  "editor.codeActionsOnSave": { "source.fixAll": "explicit" },

  // 配置 Eslint 校验文件类型
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact", "vue"],

  // 配置 Stylelint 校验 Vue 文件
  "stylelint.validate": ["vue"],
}
```
