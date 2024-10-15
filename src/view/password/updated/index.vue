<template>
  <div>
    <Header v-if="uiStore.showHeaderFooter" />
    <div class="password-box">
      <div class="password">
        <div class="updated-success">
          <img :src="login_updated" />
        </div>
        <div class="password-title">{{ $t('messages.forgot_password.updated') }}</div>

       
        <div class="return-login">
          {{ $t('messages.forgot_password.updated_newPassword') }}
        </div>
        <div class="password-continue">
          <router-link to="login">
            <GetButton :text="t('messages.forgot_password.continue_login')" />
          </router-link>
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

import login_updated from "../../../assets/home/login_updated.svg";

import { useI18n } from "vue-i18n";
const {t} = useI18n()
const uiStore = useUIStore()

const password = ref("");
const textContinue = ref("Continue to login");

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
    padding: 44px 42px 39px 42px;
    @media (max-width: 768px) {
      border-radius: 0px;
    }
    :deep(.el-input__inner) {
      font-size: $fontSizeMinPro;
      color: #c4c9d0;
      line-height: $lineH;
    }
    .updated-success{
      margin: auto;
      width: 95px;
      img{
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    .password-title {
      margin-top: 21px;
      font-size: $fontSizeMedPro;
      color: #000000;
      line-height: 34px;
      font-weight: 600;
      text-align: center;
    }


    .password-continue {
      margin-top: 41px;
      :deep(.button) {
        // color: #bdbdbd;
        // background-color: #f7f7f7;
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
      color: #9B9B9B;
      margin-top: 34px;
      font-size: $fontSizeMinPro;
      line-height: 16px;
    }
  }
}
</style>
