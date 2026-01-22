<template>
  <div class="fees-page">
    <Header v-if="uiStore.showHeaderFooter" />
    <div class="top-part">
      <div class="top-part-box">
        <div class="top-part-title">{{ $t('messages.fees.fees') }}</div>
        <div class="top-part-content">
          {{ $t('messages.fees.fees_enjoy') }}
        </div>
        <div class="top-part-msg">
          {{ $t('messages.fees.fees_con') }}
        </div>
        <GetButton
          type="success"
          :text="t('messages.fees.fees_btn')"
          href="https://coinbyte.com.au/zh-cn/register/"
          target="_top"
          style="margin-top: 40px"
        ></GetButton>
      </div>
    </div>

    <div class="center-part part" v-if="windowWidth > 985">
      <el-row justify="space-between">
        <el-col :span="7" v-for="(item, index) in feeTable" :key="index">
          <div class="center-box">
            <div class="center-img">
              <img :src="item.icon" />
            </div>
            <div class="center-title">{{ item.title }}</div>
            <div class="center-tips">{{ item.tips }}</div>
            <div class="rate">
              <div class="center-currency">{{ item.currency }}</div>
              <div class="center-number">{{ item.number }}</div>
            </div>
            <div class="center-message msg">{{ item.message }}</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="center-part part" v-if="windowWidth <= 985">
      <el-row>
        <el-col
          :span="24"
          v-for="(item, index) in feeTable"
          :key="index"
          style="margin: auto"
        >
          <div class="center-box">
            <div class="center-img">
              <img :src="item.icon" />
            </div>
            <div class="center-title">{{ item.title }}</div>
            <div class="center-tips">{{ item.tips }}</div>
            <div class="rate">
              <div class="center-currency">{{ item.currency }}</div>
              <div class="center-number">{{ item.number }}</div>
            </div>
            <div class="center-message msg">{{ item.message }}</div>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="bottom-part">
      <joinEmail style="margin-top: 60px" />
    </div>
    <Footer v-if="uiStore.showHeaderFooter && windowWidth > 769" />
    <FooterMobile v-if="uiStore.showHeaderFooter && windowWidth <= 769" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from "vue";
import { useUIStore } from '../../store/ui'
import Header from "../../layout/Header/Header.vue";
import FooterMobile from "../../layout/Footer/FooterMobile.vue";
import Footer from "../../layout/Footer/Footer.vue";
import joinCrypto from "../../layout/joinStarted/joinCrypto.vue";
import joinEmail from "../../layout/joinStarted/joinEmail.vue";
import GetButton from "../../components/GetButton.vue";

//img
import fees_icon01 from "../../assets/home/fees_icon01.png";
import fees_icon02 from "../../assets/home/fees_icon02.png";
import fees_icon03 from "../../assets/home/fees_icon03.png";

import { useI18n } from "vue-i18n";
const { t } = useI18n();
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

const feeTable = [
  {
    icon: fees_icon01,
    title: t('messages.fees.firstTitle'),
    tips: t('messages.fees.firstTips'),
    currency: "$",
    number: "0",
    message: t('messages.fees.firstMessage'),
  },
  {
    icon: fees_icon02, 
    title: t('messages.fees.secondTitle'),
    tips: t('messages.fees.secondTips'),
    currency: "%",
    number: "0",
    message: t('messages.fees.secondMessage'),
  },
  {
    icon: fees_icon03,
    title: t('messages.fees.thirdTitle'),
    tips: t('messages.fees.thirdTips'),
    currency: "%",
    number: "0.1",
    message: t('messages.fees.thirdMessage'),
  },
];
</script>

<style scoped lang="scss">
$fontSizeMax: 42px;
$fontSizeMed: 24px;
$fontSizeDefPro: 18px;
$fontSizeDef: 16px;
$fontSizeMin: 12px;

.part {
  max-width: 1290px;
  margin: auto;
}
.fees-page {
  position: relative;
  .top-part {
    background: #1d262f;
    width: 100%;
    height: 440px;
    position: relative;
    display: flex;
    .top-part-box {
      margin: auto;
      text-align: center;
      width: 654px;
      @media (max-width: 769px) {
        & {
          padding: 0 5%;
        }
      }
      .top-part-title {
        font-size: $fontSizeMax;
        color: #01c19a;
        font-weight: 600;
        line-height: 51px;
        // @media (max-width: 769px) {
        //   & {
        //     font-size: $fontSizeMed !important;
        //   }
        // }
      }
      .top-part-content {
        font-size: $fontSizeMed;
        color: #ffffff;
        margin-top: 12px;
        line-height: 29px;
        @media (max-width: 769px) {
          & {
            font-size: $fontSizeDef !important;
            width: 70%;
            margin: auto;
          }
        }
      }
      .top-part-msg {
        font-size: $fontSizeDef;
        color: #ffffff;
        line-height: 19px;
        margin-top: 18px;
        @media (max-width: 769px) {
          & {
            font-size: $fontSizeMin !important;
            width: 80%;
            margin: auto;
            margin-top: 10px;
          }
        }
      }
    }
  }
  .center-part {
    background-color: #ffffff;
    margin-top: 110px;
    @media (max-width: 1400px) {
      & {
        max-width: 940px;
      }
    }
    @media (max-width: 985px) {
      margin-top: 60px;
    }
    :deep(.el-row) {
      @media (max-width: 985px) {
        width: 100%;
        flex-direction: column;
        gap: 45px;
      }
    }
    .center-box {
      width: 100%;
      background-color: #ffffff;
      box-shadow: 0 0 15px 0 rgba(95, 95, 95, 0.19);
      border-radius: 8px;
      text-align: center;
      padding: 20px;
      height: 440px;
      @media (max-width: 1400px) {
        width: 310px;
      }
      @media (max-width: 985px) {
        width: 320px;
        height: 340px;
      }
      .center-img {
        display: flex;
        margin: auto;
        width: 73px;
        height: auto;
        margin-top: -44px;
        @media (max-width: 985px) {
          width: 63px;
          height: auto;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
      .center-title {
        font-size: $fontSizeMed;
        color: #01c19a;
        font-weight: bold;
        padding-top: 30px;
        @media (max-width: 985px) {
          & {
            padding-top: 20px !important;
            font-size: $fontSizeDef !important;
          }
        }
      }
      .center-tips {
        font-size: $fontSizeDef;
        color: #060606;
        font-weight: bold;
        margin-top: 18px;
        @media (max-width: 985px) {
          & {
            padding-top: 10px !important;
            font-size: $fontSizeMin !important;
          }
        }
      }
      .rate {
        padding: 20px 0;
        .center-currency {
          font-size: 26px;
          color: #01c19a;
          font-weight: bold;
          padding-top: 40px;
          display: flex;
          padding-left: 18%;
          img {
            width: 100%;
            height: 100%;
          }
          @media (max-width: 1400px) {
            & {
              padding-left: 12%;
            }
          }
          @media (max-width: 985px) {
            & {
              padding-top: 30px !important;
              font-size: $fontSizeMed !important;
            }
          }
        }
        .center-number {
          margin-top: -60px;
          font-weight: bold;
          font-size: 100px;
          color: #01c19a;
          @media (max-width: 985px) {
            & {
              margin-top: -46px !important;
              font-size: 70px !important;
            }
          }
        }
      }

      .msg {
        line-height: 26px;
        color: #878787;
        font-size: $fontSizeDef;
        @media (max-width: 985px) {
          & {
            font-size: $fontSizeMin !important;
          }
        }
      }
    }
  }
  .bottom-part {
    background-color: #f8f8f8;
  }
}
</style>
