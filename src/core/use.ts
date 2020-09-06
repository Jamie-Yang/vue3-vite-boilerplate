import { App } from 'vue'
import toast from '@/components/toast'
import messageBox from '@/components/message-box'

export default function use(app: App): void {
  app.use(toast)
  app.use(messageBox)
}
