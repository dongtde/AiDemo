export interface ApiResponse<T> {
  data: T
  status: number
  message?: string
}

class ApiService {
  private baseUrl: string

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`)
      const data = await response.json()
      return {
        data,
        status: response.status,
      }
    } catch (error) {
      throw new Error(`API Error: ${error}`)
    }
  }

  async post<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      const data = await response.json()
      return {
        data,
        status: response.status,
      }
    } catch (error) {
      throw new Error(`API Error: ${error}`)
    }
  }
}

export default new ApiService()
