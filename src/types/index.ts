export interface BaseEntity {
  id: number
  createdAt?: Date
  updatedAt?: Date
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
}

export type Theme = 'light' | 'dark'

export interface MenuItem {
  title: string
  icon: string
  to: string
}
