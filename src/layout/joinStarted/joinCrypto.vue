<template>
  <div class="join-page">
    <div class="ninth-part" v-if="windowWidth > 768">
      <div class="ninth-part-left">
        <div class="first-level-title">
            {{ $t('messages.join.discover') }}
          <span>{{ $t('messages.join.coinbyte') }}</span>
        </div>
        <GetButton type="success" :text="$t('messages.join.start')" class="start-btn"></GetButton>
      </div>
      <div class="ninth-part-right">
        <img :src="part09_pic01" alt="" />
      </div>
    </div>
    <div class="ninth-part" v-if="windowWidth <= 768">
      <div class="ninth-part-left min-left">
        <div class="first-level-title" style="line-height: 38px">
          {{ $t('messages.join.discover') }}
          <span>{{ $t('messages.join.coinbyte') }}</span>
        </div>
        <GetButton type="success" :text="$t('messages.join.start')" class="start-btn"></GetButton>
      </div>
      <div class="ninth-part-right min-right">
        <img :src="part09_pic01" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from "vue";
import GetButton from "../../components/GetButton.vue";

import part09_pic01 from "../../assets/home/part09_pic01.png";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger)


const windowWidth = ref(window.document.body.offsetWidth);
onMounted(() => {
  window.addEventListener("resize", resetWidth);
});
onUnmounted(() => {
  window.removeEventListener("resize", resetWidth);
});
function resetWidth() {
  windowWidth.value = window.document.body.offsetWidth;
}

onMounted(async () => {
  gsap.from(".ninth-part-left", {
    scrollTrigger: {
      trigger: ".ninth-part-left",
      start: "top 50%", // 当触发元素的顶部到达视口中心时开始动画
      end: "bottom bottom", // 当触发元素的底部离开视口底部时结束动画
      toggleActions: "play none none reverse",
    },
      x: -200, // 动画的目标值
      duration: 1.2, // 动画的持续时间
  });
  gsap.from(".ninth-part-right", {
    scrollTrigger: {
      trigger: ".ninth-part-right",
      start: "top 50%", // 当触发元素的顶部到达视口中心时开始动画
      end: "bottom bottom", // 当触发元素的底部离开视口底部时结束动画
      toggleActions: "play none none reverse",
    },
      x: 200, // 动画的目标值
      duration: 1.2, // 动画的持续时间
  });
})
</script>

<style scoped lang="scss">
$main-color: #01c19a;
$bold-font: HarmonyOS_Sans_Bold;
$medium-font: HarmonyOS_Sans_Medium;
$regular-font: HarmonyOS_Sans_Regular;
@media (max-width: 768px) {
  .ninth-part {
    display: block !important;
  }

  .min-right {
    max-width: 100% !important;
    margin-top: 40px;
  }
}
.join-page {
  background-color: #f8f8f8;
  max-width: 1290px;
  margin: auto;
  @media (max-width: 1400px) {
    & {
      max-width: 940px;
    }
  }
  @media (max-width: 985px) {
    & {
      padding:0 30px;
    }
  }
}
.first-level-title {
  font-size: 32px;
  color: #060606;
  font-weight: bold;
  line-height: 44px;
  @media (max-width: 768px) {
    & {
      font-size: 28px;
    }
  }
  span {
    color: $main-color;
  }
}
:deep(.--el-input-focus-border-color) {
  color: none;
}
.ninth-part {
  display: flex;
  padding: 6% 0;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    & {
      padding: 60px 20px;
      height: 100% !important;
    }
  }
  .ninth-part-left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .start-btn {
      margin-top: 10%;
      width: 160px;
      box-shadow: 4px 4px 10px #92929280;
      @media (max-width: 768px) {
        & {
          margin: 5% auto 0 0;
          height: 40px;
          width: auto;
          padding: 8px 30px;
          margin-top: 30px !important;
          font-size: 14px;
        }
      }
    }
  }

  .ninth-part-right {
    max-width: 44%;
    width: 735px;
    img {
      width: 100%;
      height: auto;
    }
  }
}
</style>
