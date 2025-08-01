export const useAuth = () => {
  const config = useRuntimeConfig()
  const isAuthenticated = ref(false)

  // 检查是否需要密码保护
  const isPasswordProtectionEnabled = () => {
    const password = config.public.accessPassword
    // 支持字符串和数字类型的密码
    if (typeof password === 'string') {
      return !!(password && password.trim())
    } else if (typeof password === 'number') {
      return true
    }
    return false
  }

  // 检查认证状态
  const checkAuthStatus = () => {
    if (!isPasswordProtectionEnabled()) {
      isAuthenticated.value = true
      return true
    }

    if (import.meta.client) {
      const authStatus = sessionStorage.getItem('tempmail_auth')
      const authTime = sessionStorage.getItem('tempmail_auth_time')
      
      if (authStatus === 'true' && authTime) {
        const authTimestamp = parseInt(authTime)
        const currentTime = Date.now()
        const sessionDuration = 24 * 60 * 60 * 1000 // 24小时
        
        // 检查会话是否过期
        if (currentTime - authTimestamp < sessionDuration) {
          isAuthenticated.value = true
          return true
        } else {
          // 会话过期，清除认证状态
          logout()
        }
      }
    }

    isAuthenticated.value = false
    return false
  }

  // 登录成功
  const login = () => {
    isAuthenticated.value = true
    if (import.meta.client) {
      sessionStorage.setItem('tempmail_auth', 'true')
      sessionStorage.setItem('tempmail_auth_time', Date.now().toString())
    }
  }

  // 登出
  const logout = () => {
    isAuthenticated.value = false
    if (import.meta.client) {
      sessionStorage.removeItem('tempmail_auth')
      sessionStorage.removeItem('tempmail_auth_time')
    }
  }

  // 初始化时检查认证状态
  onMounted(() => {
    checkAuthStatus()
  })

  return {
    isAuthenticated: readonly(isAuthenticated),
    isPasswordProtectionEnabled,
    checkAuthStatus,
    login,
    logout
  }
}
