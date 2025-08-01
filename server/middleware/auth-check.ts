export default defineEventHandler(async (event) => {
  // 只对页面请求进行检查，跳过 API 和静态资源
  const url = event.node.req.url || ''
  
  // 跳过这些路径
  if (
    url.startsWith('/api/') ||
    url.startsWith('/_nuxt/') ||
    url.startsWith('/favicon.ico') ||
    url.includes('.')
  ) {
    return
  }

  // 检查是否设置了密码保护
  const accessPassword = process.env.ACCESS_PASSWORD
  if (!accessPassword) {
    // 没有设置密码，允许访问
    return
  }

  // 检查会话中的认证状态
  const cookies = parseCookies(event.node.req.headers.cookie || '')
  const authToken = cookies['tempmail-auth']
  
  if (authToken === 'authenticated') {
    // 已认证，允许访问
    return
  }

  // 未认证，重定向到登录页面
  if (url !== '/login') {
    await sendRedirect(event, '/login')
  }
})

function parseCookies(cookieString: string): Record<string, string> {
  const cookies: Record<string, string> = {}
  
  if (!cookieString) return cookies
  
  cookieString.split(';').forEach(cookie => {
    const [name, value] = cookie.trim().split('=')
    if (name && value) {
      cookies[name] = decodeURIComponent(value)
    }
  })
  
  return cookies
}
