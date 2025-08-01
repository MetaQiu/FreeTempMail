export default defineEventHandler(async (event) => {
  const url = event.node.req.url || ''
  
  // 只对 API 请求进行验证，跳过其他请求
  if (!url.startsWith('/api/')) {
    return
  }

  // 跳过认证相关的 API
  if (
    url.startsWith('/api/auth/') ||
    url.startsWith('/api/client-info')
  ) {
    return
  }

  // 检查是否设置了密码保护
  const accessPassword = process.env.ACCESS_PASSWORD
  if (!accessPassword) {
    // 没有设置密码，允许访问
    return
  }

  // 从请求头中获取密码
  const authHeader = event.node.req.headers['x-api-password'] || 
                    event.node.req.headers['authorization']
  
  let providedPassword = ''
  
  if (authHeader) {
    if (typeof authHeader === 'string') {
      // 支持两种格式：
      // 1. x-api-password: your_password
      // 2. authorization: Bearer your_password
      if (authHeader.startsWith('Bearer ')) {
        providedPassword = authHeader.substring(7)
      } else {
        providedPassword = authHeader
      }
    }
  }

  // 验证密码
  if (providedPassword !== accessPassword) {
    throw createError({
      statusCode: 401,
      statusMessage: 'API访问需要有效的密码。请在请求头中包含 x-api-password 或 authorization。'
    })
  }

  // 密码正确，允许继续处理请求
})
