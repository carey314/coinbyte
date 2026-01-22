<template>
  <div class="join-page">
    <div class="ninth-part" v-if="windowWidth > 768">
      <div class="ninth-part-left">
        <div class="first-level-title" style="line-height: 38px">
          <div>{{ $t('messages.join.local') }}</div>
          <span>{{ $t('messages.join.earn') }}</span>
        </div>
        <div class="enter-mailbox">
          <el-input
            v-model="input"
            class="email-input"
            size="small"
            style="height: 54px !important"
            :placeholder="$t('messages.join.email')"
          >
            <template #append>
              <GetButton type="success" :text="$t('messages.join.start')" target="_top" href="https://coinbyte.com.au/zh-cn/register/" class="start-btn" />
            </template>
          </el-input>
        </div>
      </div>
      <div class="ninth-part-right">
        <img :src="part09_pic01" alt="" />
      </div>
    </div>
    <div class="ninth-part max1290" v-if="windowWidth <= 768">
      <div class="ninth-part-left">
        <div class="first-level-title" style="line-height: 38px">
          <div>{{ $t('messages.join.local') }}</div>
          <span>{{ $t('messages.join.earn') }}</span>
        </div>
        <div class="enter-mailbox">
          <el-input
            v-model="input"
            class="email-input"
            size="small"
            :placeholder="$t('messages.join.email')"
          >
            <template #append>
              <GetButton type="success" :text="$t('messages.join.start')" class="start-btn" />
            </template>
          </el-input>
        </div>
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

const input = ref("");
const start = ref("Get started");

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
</script>

<style scoped lang="scss">
$main-color: #01c19a;

@media(max-width:768px) {
  .ninth-part {
    display: block !important;
  }

  .min-right{
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
  line-height: 35px;
  @media (max-width: 768px) {
    & {
      font-size: 28px !important;
    }
  }
  span {
    color: $main-color;
  }
}
.ninth-part {
  margin: auto;
  display: flex;
  padding: 6% 0;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    & {
      padding: 60px 0;
      height: 100% !important;
    }
  }
  .ninth-part-left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media (max-width:985px) {
      width: 100%;
    }
    .enter-mailbox {
      margin-top: 42px;
      @media (max-width: 985px) {
        & {
          margin-top: 30px;
        }
      }
      :deep(.el-input-group__append) {
        padding: 0 !important;
      }
      .email-input {
        border: 1px solid #dfdfe5;
        border-radius: 4px;
      }
      :deep(.el-input) {
        --el-input-focus-border-color: #dfdfe5;
      }
      :deep(.el-input) {
        height: 45px !important;
        @media (max-width: 985px) {
          & {
            height: 40px !important;
            width: auto;
          }
        }
      }
      :deep(.el-input__wrapper) {
          width: 300px;
          @media (max-width: 783px) {
            & {
              width: 180px;
            }
          }
        }
      :deep(.el-input__inner) {
          font-size: 20px;
          color: #9b9b9b;
          line-height: 28px;
          padding-left: 10px;
          @media (max-width: 768px) {
            font-size: 14px !important;
          }
        }
      

      .start-btn {
        height: 100% !important;
        display: flex !important;
        align-items: center !important;
        border-radius: 0 4px 4px 0;
        @media (max-width: 768px) {
          & {
            padding: 6px 20px !important;
            box-shadow: none;
            font-size: 14px !important;

          }
        }
      }
    }
  }

  .ninth-part-right {
    max-width: 44%;
    width: 600px;
    img {
      width: 100%;
      height: auto;
    }
  }
}
</style>
