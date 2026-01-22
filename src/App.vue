<template>
  <div class="coin-byte">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const coinByteRef = ref<HTMLElement | null>(null)
let resizeObserver: ResizeObserver | null = null

// 发送高度给父页面
const sendHeightToParent = () => {
  // 使用 requestAnimationFrame 确保 DOM 更新完成
  requestAnimationFrame(() => {
    const container = document.querySelector('.coin-byte')
    if (container && window.parent !== window) {
      const height = container.scrollHeight
      window.parent.postMessage({ type: 'resize', height }, '*')
    }
  })
}

onMounted(() => {
  document.body.style.setProperty('--el-color-primary', '#01c19a')

  const container = document.querySelector('.coin-byte')
  if (container) {
    // 使用 ResizeObserver 监听内容容器高度变化
    resizeObserver = new ResizeObserver(() => {
      sendHeightToParent()
    })
    resizeObserver.observe(container)
  }

  // 监听窗口大小变化
  window.addEventListener('resize', sendHeightToParent)

  // 初始发送一次高度
  setTimeout(sendHeightToParent, 100)
})

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
  window.removeEventListener('resize', sendHeightToParent)
})
</script>

<style scoped lang="scss">
  @import './assets/font/font.css';
  // @import url('./assets/font/font.css');
  // @import './assets/font/HarmonyOS_Sans_Bold.woff2';
  // @import './assets/font/HarmonyOS_Sans_Medium.woff2';
  // @import './assets/font/HarmonyOS_Sans_Regular.woff2';
  #app {
    font-family: "HarmonyOS Sans",Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;;
    // font-weight: 400;
  }
  .coin-byte{
    font-family: "HarmonyOS Sans", PingFang SC, Microsoft Yahei, Heiti SC, WenQuanYi Micro Hei, Helvetica Neue, Helvetica, Arial, sans-serif !important
  }
</style>
