# vue3-vite-boilerplate

A Modern Vue 3 Starter Boilerplate based on Vite+, TypeScript 6, Oxlint, Oxfmt, and more.

## Tech Stack

| Category         | Technologies                      |
| ---------------- | --------------------------------- |
| **Core**         | Vue 3, Vue Router 5, Pinia 4      |
| **Build Tools**  | Vite+, TypeScript 6               |
| **HTTP Client**  | Axios                             |
| **Code Quality** | Oxlint, Oxfmt, Stylelint, vue-tsc |
| **Git Workflow** | Commitlint, Vite+ hooks           |

## Features

- 🚀 **Modern Architecture**: Built with latest frontend technologies
- 📱 **Responsive Design**: Ready for different screen sizes
- 🛠️ **Developer Experience**: Comprehensive code quality tools
- 🔒 **Git Hooks**: Vite+ hooks + vp staged for pre-commit validation
- 🎨 **Iconify Integration**: Easily use icons from various icon sets
- 🌐 **Development Proxy**: Convenient API proxying during development
- 🧩 **Modular Structure**: Well-organized project structure

## Quick Start

### Prerequisites

- Node.js 22.x (22.22.1+), 24.x (24.11.0+), or 26+; the version in `.node-version` is recommended
- pnpm 10.13.1

### Installation

```bash
# Clone the repository
git clone https://github.com/Jamie-Yang/vue3-vite-boilerplate.git
cd vue3-vite-boilerplate

# Install dependencies
pnpm install --frozen-lockfile
```

### Development

```bash
# Start development server
pnpm dev
```

### Build

```bash
# Production build (loads .env.prod)
pnpm build

# Test environment build
pnpm build:test

# Pre-production build
pnpm build:pre
```

### Linting

Use `pnpm check` for format checks, Oxlint, Stylelint, and Vue type checks; running `vp check` directly omits the last two.

```bash
# Type checking
pnpm type-check

# Full read-only checks: formatting, Oxlint, Stylelint, and Vue types
pnpm check

# Fix style and code rule violations, then format (modifies files)
pnpm lint

# Check styles only
pnpm lint:stylelint

# Format only (modifies files)
pnpm fmt
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
│   ├── router/          # Vue Router configuration
│   │   ├── guards/      # Navigation guards
│   │   └── example.ts   # Example routes
│   ├── stores/          # Pinia stores
│   ├── utils/           # Utility functions
│   ├── views/           # Page components
│   ├── App.vue          # Root component
│   └── main.ts          # Application entry point
├── typings/             # TypeScript declaration files
└── ...config files
```

## Commit Guidelines

This project follows the conventional commit format with a scope. Commitlint will help ensure your commit messages meet the format.

Examples:

- `feat(app): add new feature`
- `fix(components): resolve issue with component`
- `docs(readme): update readme`
- `style(format): format code`
- `refactor(components): restructure component`

## License

[MIT License](./LICENSE)
