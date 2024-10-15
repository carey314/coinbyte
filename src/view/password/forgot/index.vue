<template>
  <div>
    <Header v-if="uiStore.showHeaderFooter" />
    <div class="password-box">
      <div class="password">
        <div class="password-title">{{ $t('messages.forgot_password.password') }}</div>
        <div class="password-message">
          {{ $t('messages.forgot_password.withdrawal') }}
        </div>
        <div class="password-count">
          <el-input
            v-model="password"
            type="password"
            :placeholder="t('messages.forgot_password.equipment')"
          />
        </div>
        <div class="password-verify">
          <div class="verify-input">
            <el-input v-model="code" :placeholder="t('messages.forgot_password.code')" />
          </div>
          <div class="verify-btn">
            <GetButton :text="t('messages.forgot_password.verify_btn')" />
          </div>
        </div>

        <div class="password-sms">{{ $t('messages.forgot_password.resend') }} (58)</div>

        <div class="password-continue">
          <router-link to="update">
            <GetButton :text="t('messages.forgot_password.continue')" />
          </router-link>
        </div>
        <div class="return-login">
          <a href="/login" style="color: #01c19a; text-decoration: none"
            > {{ $t('messages.forgot_password.return_login') }}</a
          >
        </div>
      </div>
    </div>
    <Footer v-if="uiStore.showHeaderFooter && windowWidth > 769" />
    <FooterMobile v-if="uiStore.showHeaderFooter && windowWidth <= 769" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onUnmounted, onMounted } from "vue";
import { useUIStore } from '../../../store/ui'
import Header from "../../../layout/Header/Header.vue";
import FooterMobile from "../../../layout/Footer/FooterMobile.vue";
import Footer from "../../../layout/Footer/Footer.vue";
import GetButton from "../../../components/GetButton.vue";

import { useI18n } from 'vue-i18n'
const {t} = useI18n()
const uiStore = useUIStore()

const password = ref("");
const code = ref("");
const text = ref("Get Verification Code");
const textContinue = ref("Continue");

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
const options = ref([
  {
    value: "1",
    label: "Mobile number",
  },
  {
    value: "2",
    label: "Email",
  },
]);
</script>

<style scoped lang="scss">
$headerBackGround: #1d262f;
$bg-color: #fff;
$main-color: #01c19a;
$fontSizeMax: 42px;
$fontSizeMedPro: 28px;
$fontSizeMed: 24px;
$fontSizeDefPro: 18px;
$fontSizeDef: 16px;
$fontSizeMinPro: 14px;
$fontSizeMin: 12px;
$lineH: 16px;
.password-box {
  display: flex;
  min-height: calc(100vh - 394px);
  align-items: center;
  background: #1d262f;
  padding: 110px 0;
  border-bottom: 1px solid #2e3945;
  @media (max-width: 768px) {
    padding: 0;
  }
  .password {
    max-width: 438px;
    flex: 1;
    margin: auto;
    background: #fff;
    box-shadow: 0 0 15px 0 rgba(95, 95, 95, 0.19);
    border-radius: 8px;
    padding: 36px 42px 39px 42px;
    @media (max-width: 768px) {
      border-radius: 0px;
    }
    :deep(.el-input__inner) {
      font-size: $fontSizeMinPro;
      color: #c4c9d0;
      line-height: $lineH;
    }
    .password-title {
      font-size: $fontSizeMedPro;
      color: #000000;
      line-height: 34px;
      font-weight: 600;
      text-align: center;
    }
    .password-message {
      margin-top: 18px;
      font-size: $fontSizeMinPro;
      color: #9b9b9b;
      line-height: 16px;
    }

    .password-count {
      margin-top: 23px;

      :deep() {
        .el-input__wrapper {
          height: 48px;
          padding: 15px;
        }
        .el-input .el-input__clear,
        .el-input .el-input__password {
          font-size: 20px;
        }
        .el-icon svg {
          height: 20px;
          width: 20px;
        }
        .el-input__wrapper {
          background: #fff;
          border: 1px solid #dfdfe5;
          height: 48px;
          border-radius: 4px;
          --el-input-focus-border-color: none;
          --el-input-hover-border-color: none;
          box-shadow: none;
          padding-left: 15px;
        }
      }
    }
    .password-verify {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;

      .verify-btn {
        margin-left: 13px;
        :deep(.button) {
          padding: 0 10px !important;
          font-size: 14px !important;
          font-weight: 400;
        }
      }
      :deep() {
        .btn {
          font-size: 14px;
          color: #ffffff;
        }
        .el-input__wrapper {
          // background: #fff;
          border: 1px solid #dfdfe5;
          height: 48px;
          border-radius: 4px;
          --el-input-focus-border-color: none;
          --el-input-hover-border-color: none;
          box-shadow: none;
          padding-left: 15px;
        }
      }
    }
    .password-sms {
      margin-top: 10px;
      font-size: 14px;
      color: #f15958;
      float: right;
      height: 35px;
    }
    .password-continue {
      :deep(.button) {
        color: #bdbdbd;
        background-color: #f7f7f7;
        width: 100%;
        height: 100%;
        font-size: 20px;
        font-family: 600;
        line-height: 25px;
        padding: 16px 0 14px 0px;
        border: 8px;
        @media (max-width: 769px) {
          padding: 16px 0;
        }
      }
    }
    .return-login {
      text-align: center;
      margin-top: 18px;
      font-size: $fontSizeMinPro;
      line-height: 16px;
    }
  }
}
</style>
