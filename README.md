# vue3-vite-boilerplate

[English](./README.en.md)

开箱即用的现代 Vue3 web 应用脚手架，基于 Vite 7、Typescript 5、Prettier、Stylelint、ESLint 9 等

## 技术栈

| 分类            | 技术                          |
| --------------- | ----------------------------- |
| **核心框架**    | Vue 3, Vue Router 4, Pinia 3  |
| **构建工具**    | Vite 7, TypeScript 5          |
| **HTTP 客户端** | Axios                         |
| **代码质量**    | ESLint 9, Prettier, Stylelint |
| **Git 工作流**  | Commitlint, Husky             |

## 特性

- 🚀 **现代架构**：采用最新前端技术构建
- 📱 **响应式设计**：适配不同屏幕尺寸
- 🛠️ **开发体验**：完善的代码质量工具
- 🔒 **Git Hooks**：使用 Husky + lint-staged 进行提交前验证
- 📦 **自动导入**：组件和 API 自动导入
- 🎨 **Iconify 集成**：轻松使用各种图标集
- 🌐 **开发代理**：开发过程中便捷的 API 代理
- 🧩 **模块化结构**：组织良好的项目结构

## 快速开始

### 前提条件

- Node.js 22+
- pnpm 10+

### 安装

```bash
# 克隆仓库
git clone https://github.com/Jamie-Yang/vue3-vite-boilerplate.git
cd vue3-vite-boilerplate

# 安装依赖
pnpm install
```

### 开发

```bash
# 启动开发服务器
pnpm dev
```

### 构建

```bash
# 生产环境构建
pnpm build

# 测试环境构建
pnpm build:test

# 预生产环境构建
pnpm build:pre

# 生产环境构建
pnpm build:prod
```

### 代码检查

```bash
# 运行所有检查工具
pnpm lint

# 运行特定检查工具
pnpm lint:eslint
pnpm lint:prettier
pnpm lint:stylelint
```

## 项目结构

```
vue3-vite-boilerplate/
├── public/              # 静态资源
├── src/
│   ├── api/             # API 请求
│   ├── assets/          # 图片、字体等资源
│   ├── components/      # 可复用组件
│   ├── composables/     # Vue 3 组合式函数
│   ├── directives/      # Vue 指令
│   ├── router/          # Vue Router 配置
│   │   ├── guard/       # 导航守卫
│   │   └── modules/     # 路由模块
│   ├── stores/          # Pinia 状态管理
│   ├── utils/           # 工具函数
│   ├── views/           # 页面组件
│   ├── App.vue          # 根组件
│   └── main.ts          # 应用入口
├── typings/             # TypeScript 声明文件
└── ...配置文件
```

## 提交规范

本项目遵循约定式提交格式。Commitlint 将帮助确保您的提交消息符合格式。

示例：

- `feat: 添加新功能`
- `fix: 解决组件问题`
- `docs: 更新文档`
- `style: 格式化代码`
- `refactor: 重构组件`

## 许可证

[MIT 许可证](./LICENSE)
