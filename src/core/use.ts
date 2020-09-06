import { App } from 'vue'
import Toast from '@/components/toast'

export default function use(app: App): void {
  app.use(Toast)
}
