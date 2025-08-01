// API 认证工具
export const useApiAuth = () => {
  // 获取存储的密码（与登录密码相同）
  const getApiPassword = (): string | null => {
    if (import.meta.client) {
      // 从 sessionStorage 获取登录时存储的密码
      return sessionStorage.getItem('access_password')
    }
    return null
  }

  // 设置 API 密码（与登录密码相同）
  const setApiPassword = (password: string) => {
    if (import.meta.client) {
      sessionStorage.setItem('access_password', password)
    }
  }

  // 清除 API 密码
  const clearApiPassword = () => {
    if (import.meta.client) {
      sessionStorage.removeItem('access_password')
    }
  }

  // 创建带认证的请求头
  const getAuthHeaders = (): Record<string, string> => {
    const password = getApiPassword()
    if (password) {
      return {
        'x-api-password': password
      }
    }
    return {}
  }

  // 带认证的 $fetch 封装
  const $authFetch = async <T = any>(url: string, options: any = {}): Promise<T> => {
    const headers = {
      ...getAuthHeaders(),
      ...options.headers
    }

    try {
      return await $fetch<T>(url, {
        ...options,
        headers
      })
    } catch (error: any) {
      if (error.statusCode === 401) {
        // API 认证失败，清除密码并提示用户
        clearApiPassword()
        throw new Error('API 访问需要密码，请重新设置')
      }
      throw error
    }
  }

  return {
    getApiPassword,
    setApiPassword,
    clearApiPassword,
    getAuthHeaders,
    $authFetch
  }
}
