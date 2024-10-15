<template>
  <div>
    <Header v-if="uiStore.showHeaderFooter" />
    <div class="password-box">
      <div class="password">
        <div class="password-title">{{ $t('messages.forgot_password.update') }}</div>
        <div class="sign-password">
          <el-input v-model="password" type="password" :placeholder="t('messages.forgot_password.input_password')">
            <template #prefix>
              <img :src="login_password" />
            </template>
            <template #suffix>
              <img :src="login_eye_off" />
            </template>
          </el-input>
          <div class="password-condition">
            <div class="condition clearfloat">
              <div class="satisfy-frame"></div>
              <div class="satisfy">{{ $t('messages.forgot_password.characters') }}</div>
            </div>
            <div class="condition clearfloat">
              <div class="satisfy-frame"></div>
              <div class="satisfy">{{ $t('messages.forgot_password.lowercase') }}</div>
            </div>
            <div class="condition clearfloat">
              <div class="satisfy-frame"></div>
              <div class="satisfy">{{ $t('messages.forgot_password.uppercase') }}</div>
            </div>
            <div class="condition clearfloat">
              <div class="satisfy-frame"></div>
              <div class="satisfy">{{ $t('messages.forgot_password.number') }}</div>
            </div>
            <div class="condition clearfloat">
              <div class="satisfy-frame"></div>
              <div class="satisfy">{{ $t('messages.forgot_password.symbol') }}</div>
            </div>
          </div>
        </div>
        <div class="password-continue">
          <router-link to="updated">
            <GetButton :text="t('messages.forgot_password.update')" />
          </router-link>
        </div>
        <div class="return-login">
          <a href="/login" style="color: #01c19a; text-decoration: none"
            >{{ $t('messages.forgot_password.return_login') }}</a
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

import login_password from "../../../assets/home/login_password.svg";
import login_eye_off from "../../../assets/home/login_eye_off.svg";
import login_updated from "../../../assets/home/login_updated.svg";
import { useI18n } from "vue-i18n";
const {t} = useI18n()
const password = ref("");
const text = ref("Get Verification Code");
const textContinue = ref("Update password");
const uiStore = useUIStore()

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

    .sign-password {
      margin-top: 43px;
      .password-condition {
        margin-top: 15px;
        .condition {
          margin-top: 9px;
          .satisfy-frame {
            float: left;
            width: 12px;
            height: 12px;
            border: 1px solid #dfdfe5;
            border-radius: 1px;
          }
          .satisfy {
            margin-top: -6px;
            float: left;
            margin-left: 10px;
            font-size: $fontSizeMin;
            color: #000000;
            line-height: 22px;
            font-weight: 500;
          }
        }
      }
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
    .password-continue {
      margin-top: 35px;
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
