<template>
  <div>
    <Header v-if="uiStore.showHeaderFooter" />
    <div class="download-box">
      <div class="download">
        <el-row v-if="windowWidth > 768">
          <el-col :span="10">
            <div class="download-first-title">
              {{ $t('messages.download.download_join') }}
            </div>
            <div class="download-second-title">
              {{ $t('messages.download.download_exchange') }}
            </div>
            <div class="download-message">
              {{ $t('messages.download.download_mobile') }}
            </div>
            <div class="download-link">
              <div class="link"><img :src="download_banner_app" /></div>
              <div class="link"><img :src="download_banner_google" /></div>
              <div class="link"><img :src="download_banner_code" /></div>
            </div>
          </el-col>
          <el-col :span="10" :offset="4" class="download-right-img">
            <img :src="download_banner01" alt="" />
          </el-col>
        </el-row>
        <el-row v-if="windowWidth <= 768">
          <el-col :span="24">
            <div class="download-first-title">
              {{ $t('messages.download.download_join') }}
            </div>
            <div class="download-second-title">
              {{ $t('messages.download.download_exchange') }}
            </div>
            <div class="download-message">
              {{ $t('messages.download.download_mobile') }}
            </div>
            <div class="download-link">
              <div class="link"><img :src="download_banner_app" /></div>
              <div class="link"><img :src="download_banner_google" /></div>
              <div class="link"><img :src="download_banner_code" /></div>
            </div>
          </el-col>
          <el-col :span="24" class="download-right-img">
            <img :src="download_banner01" alt="" />
          </el-col>
        </el-row>
      </div>
    </div>
    <Footer v-if="uiStore.showHeaderFooter && windowWidth > 769" />
    <FooterMobile v-if="uiStore.showHeaderFooter && windowWidth <= 769" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onUnmounted, onMounted } from "vue";
import Header from "../../layout/Header/Header.vue";
import FooterMobile from "../../layout/Footer/FooterMobile.vue";
import Footer from "../../layout/Footer/Footer.vue";

import download_banner01 from "../../assets/home/download_banner01.png";
import download_banner_app from "../../assets/home/download_banner_app.png";
import download_banner_google from "../../assets/home/download_banner_google.png";
import download_banner_code from "../../assets/home/download_banner_code.png";
import { useUIStore } from '../../store/ui'
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
.download-box {
  display: flex;
  min-height: calc(100vh - 394px);
  align-items: center;
  background: #1d262f;
  border-bottom: 1px solid #2e3945;
  // @media (max-width: 768px) {
  //   padding: 0;
  // }
  .download {
    max-width: 1290px;
    margin: auto;
    flex: 1;
    padding: 100px 0px 135px 0px;

    @media (max-width: 1400px) {
      max-width: 985px;
      padding: 50px 30px 100px 30px;
    }
    .download-first-title {
      font-size: 32px;
      color: #01c19a;
      font-weight: 600;
      line-height: 39px;
    }
    .download-second-title {
      margin-top: 27px;
      font-size: 26px;
      color: #ffffff;
      line-height: 32px;
      font-weight: 600;
    }
    .download-message {
      margin-top: 26px;
      font-size: $fontSizeDef;
      color: #ffffff;
      line-height: 19px;
    }
    .download-link{
      margin-top: 36px;
      display: flex;
      margin-left: -19px;
      cursor: pointer;
      .link{
        margin-left: 19px;
        img{
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
    
    }
    .download-right-img {
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      @media (max-width: 768px) {
        margin-top: 50px;
      }
    }
  }
}
</style>
