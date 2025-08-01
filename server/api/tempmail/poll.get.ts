import type { ParsedMail } from 'mailparser'
import {
  type EmailData,
  extractPreview,
  extractContent,
  isEmailForTarget,
  formatFileSize
} from '~/server/utils/mail.utils'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { email: targetEmail, lastCheck } = query
  
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
    const newEmails = await pollNewEmails(imapConfig, targetEmail, lastCheck as string)
    
    return {
      success: true,
      newEmails,
      count: newEmails.length,
      lastChecked: new Date().toISOString()
    }
  } catch (error) {
    console.error('邮件轮询错误:', error)
    throw createError({
      statusCode: 500,
      statusMessage: `邮件轮询失败: ${(error as Error).message}`
    })
  }
})

async function pollNewEmails(config: any, targetEmail: string, lastCheck?: string): Promise<EmailData[]> {
  const Imap = await import('imap').then(m => m.default)
  const { simpleParser } = await import('mailparser') as any
  
  return new Promise((resolve, reject) => {
    const imap = new Imap(config)
    const emails: EmailData[] = []
    let processedCount = 0

    imap.once('ready', () => {
      imap.openBox('INBOX', false, (err, box) => {
        if (err) {
          reject(err)
          return
        }

        // 构建搜索条件
        let searchCriteria: any[] = ['ALL']
        
        // 如果提供了上次检查时间，只获取之后的邮件
        if (lastCheck) {
          const lastCheckDate = new Date(lastCheck)
          searchCriteria = [['SINCE', lastCheckDate]]
        }

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

          const fetch = imap.fetch(results, {
            bodies: '',
            markSeen: false,
            struct: true
          })

          fetch.on('message', (msg, seqno) => {
            let buffer = ''
            let uid = ''
            msg.on('attributes', (attrs) => {
              uid = String(attrs.uid)
            })
            
            msg.on('body', (stream, info) => {
              stream.on('data', (chunk) => {
                buffer += chunk.toString('utf8')
              })
              
              stream.once('end', () => {
                simpleParser(buffer)
                  .then((parsed: ParsedMail) => {
                    if (isEmailForTarget(parsed, targetEmail)) {
                      const emailData: EmailData = {
                        id: uid,
                        subject: parsed.subject || '无主题',
                        sender: parsed.from?.text || '未知发送者',
                        preview: extractPreview(parsed),
                        content: extractContent(parsed),
                        receivedAt: parsed.date || new Date(),
                        read: false,
                        hasAttachment: (parsed.attachments?.length || 0) > 0,
                        attachments: parsed.attachments?.map((att: any) => ({
                          name: att.filename || '未知文件',
                          size: formatFileSize(att.size || 0)
                        })) || []
                      }
                      emails.push(emailData)
                    }
                    processedCount++
                    
                    // 如果处理完所有邮件，结束连接并返回结果
                    if (processedCount === results.length) {
                      imap.end()
                      // 按时间倒序排列
                      emails.sort((a, b) => b.receivedAt.getTime() - a.receivedAt.getTime())
                      resolve(emails)
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
    }, 30000) // 30秒超时
    
    imap.connect()
  })
}