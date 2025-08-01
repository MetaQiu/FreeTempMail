import type { ParsedMail } from 'mailparser'
import {
  type EmailData,
  extractPreview,
  extractContent,
  isEmailForTarget,
  formatDateForIMAP,
  formatFileSize
} from '~/server/utils/mail.utils'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { email: targetEmail } = query
  
  if (!targetEmail || typeof targetEmail !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: '缺少目标邮箱地址参数'
    })
  }

  // 从环境变量或配置中获取IMAP设置
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
      statusMessage: 'IMAP配置未完成，请先配置邮箱连接参数'
    })
  }

  try {
    const emails = await fetchEmailsFromIMAP(imapConfig, targetEmail)
    return {
      success: true,
      emails,
      count: emails.length
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `获取邮件失败: ${(error as Error).message}`
    })
  }
})

async function fetchEmailsFromIMAP(config: any, targetEmail: string): Promise<EmailData[]> {
  const Imap = await import('imap').then(m => m.default)
  const { simpleParser } = await import('mailparser') as any
  
  return new Promise((resolve, reject) => {
    const imap = new Imap(config)
    const emails: EmailData[] = []

    imap.once('ready', () => {
      imap.openBox('INBOX', true, (err, box) => {
        if (err) {
          reject(err)
          return
        }

        // 搜索最近7天的邮件，避免处理过多邮件导致超时
        const sevenDaysAgo = new Date()
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
        const searchCriteria = [['SINCE', formatDateForIMAP(sevenDaysAgo)]]
        
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

          // 限制处理的邮件数量，避免超时
          const limitedResults = results.slice(-50) // 只处理最新的50封邮件

          const fetch = imap.fetch(limitedResults, {
            bodies: '',
            markSeen: false,
            struct: true
          })

          let processedCount = 0

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
                    // 检查这封邮件是否是发送到目标邮箱的
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
                        }))
                      }
                      emails.push(emailData)
                    }
                    
                    processedCount++
                    
                    // 如果处理完所有邮件，结束连接并返回结果
                    if (processedCount === limitedResults.length) {
                      imap.end()
                      // 按时间倒序排列
                      emails.sort((a, b) => b.receivedAt.getTime() - a.receivedAt.getTime())
                      resolve(emails)
                    }
                  })
                  .catch((error: any) => {
                    console.error('解析邮件失败:', error)
                    processedCount++
                    
                    // 即使解析失败也要检查是否所有邮件都处理完了
                    if (processedCount === limitedResults.length) {
                      imap.end()
                      emails.sort((a, b) => b.receivedAt.getTime() - a.receivedAt.getTime())
                      resolve(emails)
                    }
                  })
              })
            })
          })

          fetch.once('error', reject)
          fetch.once('end', () => {
            // 如果没有处理任何邮件，直接结束
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
    }, 60000) // 60秒超时
    
    imap.connect()
  })
} 