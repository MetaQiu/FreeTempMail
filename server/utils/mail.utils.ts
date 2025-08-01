
import type { ParsedMail, AddressObject } from 'mailparser'

export interface EmailData {
  id: string
  subject: string
  sender: string
  preview: string
  content: string
  receivedAt: Date
  read: boolean
  hasAttachment: boolean
  attachments?: Array<{
    name: string
    size: string
  }>
}

export function extractPreview(parsed: ParsedMail): string {
  const text = parsed.text || parsed.html || ''
  // 移除HTML标签并截取前100个字符作为预览
  const preview = text.replace(/<[^>]*>/g, '').trim()
  return preview.length > 100 ? preview.substring(0, 100) + '...' : preview
}

export function extractContent(parsed: ParsedMail): string {
  // 优先使用HTML内容，如果没有则使用文本内容
  if (parsed.html) {
    return parsed.html
  }
  if (parsed.text) {
    // 将纯文本转换为HTML格式
    return parsed.text.replace(/\n/g, '<br>')
  }
  return '邮件内容为空'
}

export function isEmailForTarget(parsed: ParsedMail, targetEmail: string): boolean {
  const lowercasedTargetEmail = targetEmail.toLowerCase();

  const checkAddressArray = (address?: AddressObject | AddressObject[]) => {
    if (!address) {
      return false;
    }
    const addresses = Array.isArray(address) ? address : [address];
    for (const addr of addresses) {
      for (const recipient of addr.value) {
        if (recipient.address && recipient.address.toLowerCase() === lowercasedTargetEmail) {
          return true;
        }
      }
    }
    return false;
  }

  // 检查直接收件人和抄送
  if (checkAddressArray(parsed.to)) return true;
  if (checkAddressArray(parsed.cc)) return true;
  
  // 检查邮件头部的原始收件人信息
  if (parsed.headers) {
    const headers = parsed.headers as any
    
    // 检查X-Original-To头部（常见的转发邮件头部）
    if (headers['x-original-to']) {
      const originalTo = Array.isArray(headers['x-original-to']) 
        ? headers['x-original-to'].join(' ') 
        : headers['x-original-to']
      if (originalTo.toLowerCase().includes(lowercasedTargetEmail)) {
        return true
      }
    }
    
    // 检查Delivered-To头部
    if (headers['delivered-to']) {
      const deliveredTo = Array.isArray(headers['delivered-to']) 
        ? headers['delivered-to'].join(' ') 
        : headers['delivered-to']
      if (deliveredTo.toLowerCase().includes(lowercasedTargetEmail)) {
        return true
      }
    }
    
    // 检查Envelope-To头部
    if (headers['envelope-to']) {
      const envelopeTo = Array.isArray(headers['envelope-to']) 
        ? headers['envelope-to'].join(' ') 
        : headers['envelope-to']
      if (envelopeTo.toLowerCase().includes(lowercasedTargetEmail)) {
        return true
      }
    }
  }
  
  // 检查邮件内容中是否包含目标邮箱（适用于转发邮件）
  const emailContent = parsed.text || parsed.html || ''
  if (emailContent.toLowerCase().includes(lowercasedTargetEmail)) {
    return true
  }
  
  return false
}

export function formatDateForIMAP(date: Date): string {
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short', 
    year: 'numeric'
  }).replace(/,/g, '') // 格式：01 Jan 2024
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return Math.round(bytes / Math.pow(k, i)) + ' ' + sizes[i]
} 