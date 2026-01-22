# 多语言路由功能说明

## 概述

本项目已实现基于路由的多语言功能，支持通过 URL 前缀来访问不同语言版本的页面。

## 支持的语言

- **en-US** - 英文版本
- **zh-CN** - 简体中文版本  
- **zh-TW** - 繁體中文版本

## 路由格式

### 带语言前缀的路由
- `/en-US/learnCenter` - 英文版学习中心
- `/zh-CN/learnCenter` - 简体中文版学习中心
- `/zh-TW/learnCenter` - 繁體中文版学习中心

### 无语言前缀的路由（默认）
- `/learnCenter` - 默认语言版本（根据用户设置）

## 功能特性

### 1. 自动语言切换
当访问带语言前缀的 URL 时，系统会自动：
- 设置对应的语言环境
- 更新 localStorage 中的语言设置
- 应用对应的翻译文本

### 2. 路由守卫
路由守卫会自动检测 URL 中的语言前缀，并设置相应的语言环境。

### 3. 工具函数
提供了便捷的工具函数来处理多语言路由：

```typescript
import { getCurrentLocalePrefix, getLocalizedPath } from '../utils/localeRouter'

// 获取当前语言前缀
const prefix = getCurrentLocalePrefix() // 'en-US' | 'zh-CN' | 'zh-TW'

// 生成带语言前缀的路径
const path = getLocalizedPath('/learnCenter') // '/en-US/learnCenter'
```

## 使用示例

### 在组件中使用

```vue
<template>
  <div>
    <!-- 使用工具函数生成链接 -->
    <router-link :to="`/${getCurrentLocalePrefix()}/learnCenter`">
      学习中心
    </router-link>
    
    <!-- 或者使用 getLocalizedPath 函数 -->
    <router-link :to="getLocalizedPath('/learnCenter')">
      学习中心
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { getCurrentLocalePrefix, getLocalizedPath } from '../utils/localeRouter'
</script>
```

### 在 JavaScript 中导航

```typescript
import { useRouter } from 'vue-router'
import { getLocalizedPath } from '../utils/localeRouter'

const router = useRouter()

// 导航到带语言前缀的页面
router.push(getLocalizedPath('/learnCenter'))
```

## 路由配置

所有现有路由都会自动生成对应的多语言版本：

- `/home` → `/en-US/home`, `/zh-CN/home`, `/zh-TW/home`
- `/learnCenter` → `/en-US/learnCenter`, `/zh-CN/learnCenter`, `/zh-TW/learnCenter`
- `/market-allCrypto` → `/en-US/market-allCrypto`, `/zh-CN/market-allCrypto`, `/zh-TW/market-allCrypto`

## 注意事项

1. **SEO 友好**: 每个语言版本都有独立的 URL，有利于搜索引擎优化
2. **用户体验**: 用户可以通过 URL 直接访问特定语言版本
3. **向后兼容**: 原有的无语言前缀路由仍然可用
4. **语言持久化**: 语言设置会保存在 localStorage 中

## 测试

访问以下 URL 来测试多语言路由功能：

- `http://localhost:3000/en-US/learnCenter` - 英文版
- `http://localhost:3000/zh-CN/learnCenter` - 简体中文版
- `http://localhost:3000/zh-TW/learnCenter` - 繁體中文版 