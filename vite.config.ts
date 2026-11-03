import { cwd } from 'node:process'
import { fileURLToPath, URL } from 'node:url'

import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import { defineConfig, lazyPlugins, loadEnv } from 'vite-plus'
import svgLoader from 'vite-svg-loader'

import generateProxy from './src/utils/dev-proxy/generate-proxy.ts'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, cwd(), '')

  return {
    base: '/',

    lint: {
      plugins: ['typescript', 'unicorn', 'oxc', 'import', 'vue'],
      rules: {
        'no-fallthrough': 'error',
        'no-case-declarations': 'error',
        'no-var': 'error',
        'prefer-const': 'error',
        'typescript/no-misused-promises': 'error',
        'import/default': 'error',
        'import/namespace': 'error',
        'import/export': 'error',
        'import/no-duplicates': 'error',
        'vue/no-async-in-computed-properties': 'error',
        'vue/no-side-effects-in-computed-properties': 'error',
        'vue/no-lifecycle-after-await': 'error',
        'vue/no-watch-after-await': 'error',
        'vue/no-expose-after-await': 'error',
      },
      options: {
        typeAware: true,
        typeCheck: false,
      },
      env: { browser: true, node: true },
      ignorePatterns: ['dist/**'],
    },

    fmt: {
      printWidth: 150,
      semi: false,
      singleQuote: true,
      sortImports: true,
      sortPackageJson: false,
      ignorePatterns: ['pnpm-lock.yaml', '**/reset.css'],
    },

    staged: {
      '*.{vue,scss,css}': ['stylelint --fix', 'vp check --fix'],
      '!(*.vue|*.scss|*.css)': 'vp check --fix',
    },

    plugins: lazyPlugins(() => [
      vue(),
      legacy({
        modernPolyfills: true,
      }),
      svgLoader(),
    ]),

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },

    server: {
      host: true,
      open: true,
      proxy: {
        ...generateProxy(env.VITE_PROXY_TARGETS),
      },
    },
  }
})
