import { ref } from 'vue'

export interface Notification {
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  timeout?: number
}

export function useNotification() {
  const notification = ref<Notification | null>(null)
  const show = ref(false)

  const showNotification = (notif: Notification) => {
    notification.value = notif
    show.value = true

    if (notif.timeout !== 0) {
      setTimeout(() => {
        show.value = false
      }, notif.timeout || 3000)
    }
  }

  const success = (message: string, timeout?: number) => {
    showNotification({ message, type: 'success', timeout })
  }

  const error = (message: string, timeout?: number) => {
    showNotification({ message, type: 'error', timeout })
  }

  const warning = (message: string, timeout?: number) => {
    showNotification({ message, type: 'warning', timeout })
  }

  const info = (message: string, timeout?: number) => {
    showNotification({ message, type: 'info', timeout })
  }

  const close = () => {
    show.value = false
  }

  return {
    notification,
    show,
    success,
    error,
    warning,
    info,
    close,
  }
}
