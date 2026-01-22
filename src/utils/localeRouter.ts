import { useRouter } from 'vue-router'
import { getStoredLanguage } from '../languageStorage'

// 语言映射
const localeMap: { [key: string]: string } = {
  'English/USD': 'en-US',
  '简体中文': 'zh-CN',
  '繁體中文': 'zh-TW'
}

// 反向映射
const reverseLocaleMap: { [key: string]: string } = {
  'en-US': 'English/USD',
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文'
}

/**
 * 获取当前语言前缀
 */
export function getCurrentLocalePrefix(): string {
  const currentLanguage = getStoredLanguage() || 'English/USD'
  return localeMap[currentLanguage] || 'en-US'
}

/**
 * 生成带语言前缀的路由路径
 */
export function getLocalizedPath(path: string, locale?: string): string {
  const targetLocale = locale || getCurrentLocalePrefix()
  return `/${targetLocale}${path}`
}

/**
 * 从路径中提取语言前缀
 */
export function extractLocaleFromPath(path: string): string | null {
  const segments = path.split('/')
  const locale = segments[1]
  
  if (['en-US', 'zh-CN', 'zh-TW', 'zh-cn', 'en-us'].includes(locale)) {
    return locale
  }
  
  return null
}

/**
 * 从路径中移除语言前缀
 */
export function removeLocaleFromPath(path: string): string {
  const locale = extractLocaleFromPath(path)
  if (locale) {
    return path.replace(`/${locale}`, '')
  }
  return path
}

/**
 * 检查路径是否包含语言前缀
 */
export function hasLocalePrefix(path: string): boolean {
  return extractLocaleFromPath(path) !== null
}

/**
 * 获取路由名称的语言前缀版本
 */
export function getLocalizedRouteName(routeName: string, locale?: string): string {
  const targetLocale = locale || getCurrentLocalePrefix()
  return `${targetLocale}_${routeName}`
} 