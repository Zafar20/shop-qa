import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

// 🔒 Отдельный экземпляр без интерцепторов для обновления токена
const authApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

// 🔁 Флаг, чтобы не запускать несколько обновлений одновременно
let isRefreshing = false
let refreshQueue: any[] = []

function logoutUser() {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('token_expiry')
  window.location.href = '/login'
}

async function refreshToken(): Promise<string> {
  try {
    const refreshToken = localStorage.getItem('refresh_token')
    if (!refreshToken) throw new Error('Нет refresh_token')

    const response = await authApi.post('/auth/login/refresh', { refresh: refreshToken })
    const { access, refresh } = response.data

    localStorage.setItem('access_token', access)
    if (refresh) {
      localStorage.setItem('refresh_token', refresh)
    }

    const expiresIn = 3 * 60 * 60 * 1000 // 3 часа
    localStorage.setItem('token_expiry', (Date.now() + expiresIn).toString())

    return access
  } catch (err) {
    logoutUser()
    throw err
  }
}

// 🛠 Универсальный request-интерцептор: обновляет токен при необходимости и добавляет его
api.interceptors.request.use(
  async (config) => {
    let accessToken = localStorage.getItem('access_token')
    const tokenExpiry = localStorage.getItem('token_expiry')

    if (tokenExpiry && Date.now() > Number(tokenExpiry)) {
      // Токен истёк, пытаемся обновить
      if (!isRefreshing) {
        isRefreshing = true
        try {
          accessToken = await refreshToken()
          refreshQueue.forEach(cb => cb.resolve(accessToken))
        } catch (err) {
          refreshQueue.forEach(cb => cb.reject(err))
          throw err
        } finally {
          isRefreshing = false
          refreshQueue = []
        }
      } else {
        // Ждём пока другой запрос завершит refresh
        return new Promise((resolve, reject) => {
          refreshQueue.push({
            resolve: (newToken: string) => {
              config.headers['Authorization'] = `Bearer ${newToken}`
              resolve(config)
            },
            reject: (err: any) => reject(err)
          })
        })
      }
    }

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// ⚠️ Response-интерцептор: перехватывает 401 и пробует обновить токен
api.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const newAccessToken = await refreshToken()
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
        return api(originalRequest)
      } catch (err) {
        logoutUser()
        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  }
)

export default api
