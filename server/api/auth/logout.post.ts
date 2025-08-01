export default defineEventHandler(async (event) => {
  // 清除认证 Cookie
  setCookie(event, 'tempmail-auth', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0 // 立即过期
  })

  return {
    success: true,
    message: '已退出登录',
    clearApiPassword: true // 提示前端清除 API 密码
  }
})
