export const APP_NAME = 'Vite Vue 3 App'
export const APP_VERSION = '1.0.0'

export const API_TIMEOUT = 30000

export const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER: 'current_user',
  THEME: 'app_theme',
} as const

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
} as const

export const USER_ROLES = {
  ADMIN: 'Admin',
  USER: 'User',
  GUEST: 'Guest',
} as const
