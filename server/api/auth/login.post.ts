export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { password } = body

  if (!password || typeof password !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: '密码不能为空'
    })
  }

  // 从环境变量获取正确的密码（只在服务端可用）
  const correctPassword = process.env.ACCESS_PASSWORD
  
  if (!correctPassword) {
    // 如果没有设置密码，则不启用密码保护
    return {
      success: true,
      message: '密码保护未启用'
    }
  }

  // 验证密码
  if (password === correctPassword) {
    // 密码正确，设置认证 Cookie
    setCookie(event, 'tempmail-auth', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 24小时
    })
    
    return {
      success: true,
      message: '登录成功',
      apiPassword: password // 返回密码供前端存储，用于 API 调用
    }
  } else {
    throw createError({
      statusCode: 401,
      statusMessage: '密码错误'
    })
  }
})
