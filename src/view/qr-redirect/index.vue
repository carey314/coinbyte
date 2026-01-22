<template>
  <div class="qr-redirect-container">
    <div class="loading-content">
      <div class="spinner"></div>
      <p>{{ redirecting ? $t('messages.qr.redirecting') : $t('messages.qr.detecting') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const redirecting = ref(false)

const iosUrl = 'https://apps.apple.com/au/app/coinbyte-buy-bitcoin-crypto/id6739201223'
const androidUrl = 'https://play.google.com/store/apps/details?id=au.com.coinbyte.app'

onMounted(() => {
  detectAndRedirect()
})

function detectAndRedirect() {
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera
  
  // Detect iOS
  if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
    redirecting.value = true
    setTimeout(() => {
      window.location.href = iosUrl
    }, 1000)
    return
  }
  
  // Detect Android
  if (/android/i.test(userAgent)) {
    redirecting.value = true
    setTimeout(() => {
      window.location.href = androidUrl
    }, 1000)
    return
  }
  
  // For desktop or unknown devices, redirect to download page
  redirecting.value = true
  setTimeout(() => {
    window.location.href = '/download'
  }, 2000)
}
</script>

<style scoped lang="scss">
.qr-redirect-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1d262f;
}

.loading-content {
  text-align: center;
  color: #ffffff;
  
  .spinner {
    width: 50px;
    height: 50px;
    margin: 0 auto 20px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: #01c19a;
    animation: spin 1s ease-in-out infinite;
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  
  p {
    font-size: 18px;
    margin: 0;
  }
}
</style>