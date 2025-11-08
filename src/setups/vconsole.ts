/**
 * 启用 vConsole，在开发、测试环境启用
 */
if (['dev', 'test'].includes(import.meta.env.VITE_APP_ENV)) {
  import('vconsole').then(({ default: vConsole }) => {
    new vConsole()
  })
}
