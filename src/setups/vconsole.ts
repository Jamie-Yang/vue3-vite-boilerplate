/**
 * 启用 vConsole，在开发、测试环境启用
 */
if (import.meta.env.VITE_APP_ENV === 'dev' || import.meta.env.VITE_APP_ENV === 'test') {
  void import('vconsole').then(({ default: vConsole }) => {
    new vConsole()
  })
}
