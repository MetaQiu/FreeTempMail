export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { email: targetEmail, limit = '5' } = query
  
  if (!targetEmail || typeof targetEmail !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: '缺少目标邮箱地址参数'
    })
  }

  // 从环境变量获取IMAP配置
  const imapConfig = {
    user: process.env.IMAP_USERNAME || '',
    password: process.env.IMAP_PASSWORD || '',
    host: process.env.IMAP_HOST || '',
    port: parseInt(process.env.IMAP_PORT || '993'),
    tls: process.env.IMAP_TLS !== 'false',
    tlsOptions: { rejectUnauthorized: false }
  }

  if (!imapConfig.user || !imapConfig.password || !imapConfig.host) {
    throw createError({
      statusCode: 500,
      statusMessage: 'IMAP配置未完成，请检查环境变量'
    })
  }

  try {
    const debugInfo = await getEmailDebugInfo(imapConfig, targetEmail, parseInt(limit as string))
    
    return {
      success: true,
      targetEmail,
      debugInfo,
      totalEmails: debugInfo.length
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `获取调试信息失败: ${(error as Error).message}`
    })
  }
})

async function getEmailDebugInfo(config: any, targetEmail: string, limit: number): Promise<any[]> {
  const Imap = await import('imap').then(m => m.default)
  const { simpleParser } = await import('mailparser') as any
  
  return new Promise((resolve, reject) => {
    const imap = new Imap(config)
    const debugInfo: any[] = []

    imap.once('ready', () => {
      imap.openBox('INBOX', true, (err, box) => {
        if (err) {
          reject(err)
          return
        }

        // 获取最近3天的邮件进行分析，避免处理过多邮件
        const threeDaysAgo = new Date()
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)
        const searchCriteria = [['SINCE', formatDateForIMAP(threeDaysAgo)]]
        
        imap.search(searchCriteria, (err, results) => {
          if (err) {
            reject(err)
            return
          }

          if (!results || results.length === 0) {
            imap.end()
            resolve([])
            return
          }

          // 限制获取的邮件数量
          const limitedResults = results.slice(-limit)

          const fetch = imap.fetch(limitedResults, {
            bodies: '',
            markSeen: false,
            struct: true
          })

          let processedCount = 0

          fetch.on('message', (msg, seqno) => {
            let buffer = ''
            
            msg.on('body', (stream, info) => {
              stream.on('data', (chunk) => {
                buffer += chunk.toString('utf8')
              })
              
              stream.once('end', () => {
                simpleParser(buffer)
                  .then((parsed: any) => {
                    const emailDebug = {
                      seqno,
                      subject: parsed.subject || '无主题',
                      from: parsed.from?.text || '未知发送者',
                      to: parsed.to || [],
                      cc: parsed.cc || [],
                      date: parsed.date,
                      headers: parsed.headers || {},
                      isForTarget: isEmailForTarget(parsed, targetEmail),
                      contentPreview: (parsed.text || parsed.html || '').substring(0, 200) + '...'
                    }
                    debugInfo.push(emailDebug)
                    processedCount++
                    
                    if (processedCount === limitedResults.length) {
                      imap.end()
                      // 按序号排序
                      debugInfo.sort((a, b) => b.seqno - a.seqno)
                      resolve(debugInfo)
                    }
                  })
                  .catch(reject)
              })
            })
          })

          fetch.once('error', reject)
          fetch.once('end', () => {
            if (processedCount === 0) {
              imap.end()
              resolve([])
            }
          })
        })
      })
    })

    imap.once('error', reject)
    
    // 设置连接超时
    setTimeout(() => {
      if (imap.state !== 'disconnected') {
        imap.end()
        reject(new Error('IMAP连接超时'))
      }
    }, 45000) // 45秒超时
    
    imap.connect()
  })
}

function isEmailForTarget(parsed: any, targetEmail: string): boolean {
  // 检查直接收件人
  if (parsed.to && Array.isArray(parsed.to)) {
    for (const recipient of parsed.to) {
      if (recipient.address && recipient.address.toLowerCase() === targetEmail.toLowerCase()) {
        return true
      }
    }
  }
  
  // 检查抄送收件人  
  if (parsed.cc && Array.isArray(parsed.cc)) {
    for (const recipient of parsed.cc) {
      if (recipient.address && recipient.address.toLowerCase() === targetEmail.toLowerCase()) {
        return true
      }
    }
  }
  
  // 检查邮件头部的原始收件人信息
  if (parsed.headers) {
    const headers = parsed.headers as any
    
    // 检查X-Original-To头部
    if (headers['x-original-to']) {
      const originalTo = Array.isArray(headers['x-original-to']) 
        ? headers['x-original-to'].join(' ') 
        : headers['x-original-to']
      if (originalTo.toLowerCase().includes(targetEmail.toLowerCase())) {
        return true
      }
    }
    
    // 检查Delivered-To头部
    if (headers['delivered-to']) {
      const deliveredTo = Array.isArray(headers['delivered-to']) 
        ? headers['delivered-to'].join(' ') 
        : headers['delivered-to']
      if (deliveredTo.toLowerCase().includes(targetEmail.toLowerCase())) {
        return true
      }
    }
    
    // 检查Envelope-To头部
    if (headers['envelope-to']) {
      const envelopeTo = Array.isArray(headers['envelope-to']) 
        ? headers['envelope-to'].join(' ') 
        : headers['envelope-to']
      if (envelopeTo.toLowerCase().includes(targetEmail.toLowerCase())) {
        return true
      }
    }
  }
  
  // 检查邮件内容中是否包含目标邮箱
  const emailContent = parsed.text || parsed.html || ''
  if (emailContent.toLowerCase().includes(targetEmail.toLowerCase())) {
    return true
  }
  
  return false
}

function formatDateForIMAP(date: Date): string {
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short', 
    year: 'numeric'
  }).replace(/,/g, '') // 格式：01 Jan 2024
} 