# vue3-vite-boilerplate

A Modern Vue 3 Starter Boilerplate based on Vite 8, TypeScript 6, Prettier, Stylelint, ESLint 10, and more.

## Tech Stack

| Category         | Technologies                   |
| ---------------- | ------------------------------ |
| **Core**         | Vue 3, Vue Router 5, Pinia 4   |
| **Build Tools**  | Vite 8, TypeScript 6           |
| **HTTP Client**  | Axios                          |
| **Code Quality** | ESLint 10, Prettier, Stylelint |
| **Git Workflow** | Commitlint, Husky              |

## Features

- 🚀 **Modern Architecture**: Built with latest frontend technologies
- 📱 **Responsive Design**: Ready for different screen sizes
- 🛠️ **Developer Experience**: Comprehensive code quality tools
- 🔒 **Git Hooks**: Husky + lint-staged for pre-commit validation
- 📦 **Auto Import**: Components and APIs auto-importing
- 🎨 **Iconify Integration**: Easily use icons from various icon sets
- 🌐 **Development Proxy**: Convenient API proxying during development
- 🧩 **Modular Structure**: Well-organized project structure

## Quick Start

### Prerequisites

- Node.js 22.x (22.22.1+) or 24+; the version in `.node-version` is recommended
- pnpm 10+

### Installation

```bash
# Clone the repository
git clone https://github.com/Jamie-Yang/vue3-vite-boilerplate.git
cd vue3-vite-boilerplate

# Install dependencies
pnpm install
```

### Development

```bash
# Start development server
pnpm dev
```

### Build

```bash
# Production build
pnpm build

# Test environment build
pnpm build:test

# Pre-production build
pnpm build:pre

# Production build
pnpm build:prod
```

### Linting

```bash
# Check without modifying files
pnpm lint

# Apply fixes sequentially, then format
pnpm lint:fix

# Run specific linters
pnpm lint:eslint
pnpm lint:prettier
pnpm lint:stylelint
```

## Project Structure

```
vue3-vite-boilerplate/
├── public/              # Static assets
├── src/
│   ├── api/             # API requests
│   ├── assets/          # Images, fonts, etc.
│   ├── components/      # Reusable components
│   ├── composables/     # Vue 3 composables
│   ├── directives/      # Vue directives
│   ├── router/          # Vue Router configuration
│   │   ├── guard/       # Navigation guards
│   │   └── modules/     # Route modules
│   ├── stores/          # Pinia stores
│   ├── utils/           # Utility functions
│   ├── views/           # Page components
│   ├── App.vue          # Root component
│   └── main.ts          # Application entry point
├── typings/             # TypeScript declaration files
└── ...config files
```

## Commit Guidelines

This project follows the conventional commit format. Commitlint will help ensure your commit messages meet the format.

Examples:

- `feat: add new feature`
- `fix: resolve issue with component`
- `docs: update readme`
- `style: format code`
- `refactor: restructure component`

## License

[MIT License](./LICENSE)
