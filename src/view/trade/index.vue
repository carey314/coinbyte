<template>
  <div class="market-trade-page">
    <Header></Header>
    <div class="box-header">
      <div class="header-nav" style="color: #fff">
        <span>Home&nbsp; &gt;</span>&nbsp; <span>Bitcoin&nbsp; &gt;</span>&nbsp;
        <span>Buy</span>
      </div>
      <div class="header-name">Buy <span>{{ coinInfo?.slug ? coinInfo.slug + ' ' + coinInfo.name : `${currencySlug} ${currencyName}` }}</span></div>
    </div>

    <div class="trade-page-box">
      <el-row :gutter="40">
        <el-col :span="16" :xs="24" :sm="24" :md="24" :lg="16">
          <div class="box-left">
            <div>
              <!-- chart区域 -->
              <Chart/>
            </div>
            <div class="crypto-info">
              <div><PriceInfo :info="currencyInformation" /></div>
              <div><MarketInfo :info="currencyInformation" /></div>
            </div>
          </div>
        </el-col>
        <el-col :span="8" :xs="24" :sm="24" :md="24" :lg="8">
          <div class="box-right">
            <div><Convert :is-sell="!!(route.query.isSell && (route.query.isSell === '1'))"/></div>
            <div><Similar /></div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="trade-page-text">
      <el-row>
        <el-col :span="16" :xs="24" :sm="24" :md="24" :lg="16">
          <AboutCrypto :coinInfo="coinInfo"/>
        </el-col>
      </el-row>
    </div>
    <div class="trade-page-explore">
      <Explore />
      <div class="transparent-fees">
        <div class="transparent-fees-content">
          <div class="fees-title">Transparent <span>fees</span></div>
          <div class="fees-text">
            We believe in a transparent and fair fee schedule. We are constantly
            looking at ways to reduce the fees and always welcome your feedback.
          </div>
          <div class="fees-read-more">Read more &gt;</div>
        </div>

        <div class="transparent-fees-image">
          <img :src="markets_buy_image" />
        </div>
      </div>
    </div>
    <div class="bottom-part">
      <joinEmail />
    </div>
    <Footer v-if="windowWidth > 769" />
    <FooterMobile v-else></FooterMobile>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onUnmounted, onMounted, computed, provide } from "vue";
import Header from "../../layout/Header/Header.vue";
import Footer from "../../layout/Footer/Footer.vue";
import FooterMobile from "../../layout/Footer/FooterMobile.vue";
import Convert from "../trade/layout/Convert.vue";
import Similar from "../trade/layout/Similar.vue";
import PriceInfo from "../trade/layout/PriceInfo.vue";
import MarketInfo from "../trade/layout/MarketInfo.vue";
import AboutCrypto from "../trade/layout/AboutCrypto.vue";
import Explore from "../trade/layout/Explore.vue";
import joinEmail from "../../layout/joinStarted/joinEmail.vue";
import Chart from "./layout/Chart.vue";

import markets_buy_image from "../../assets/home/markets_buy_image.png";
import { CurrencyInformation } from "../../models/currencyInformation";
import {queryCurrencyInformation} from "../../api/currencies"

import { useRoute } from "vue-router";
import { getOneCoin } from '../../api/currencies';
import { storeToRefs } from "pinia";
import { tradeStore } from "../../store/trade";

const useTradeStore = tradeStore()
const {currencySlug, currencyName, currencyIcon} = storeToRefs(useTradeStore)

const route = useRoute();

const windowWidth = ref(window.document.body.offsetWidth);
onMounted(async () => {
  window.addEventListener("resize", resetWidth);
  // query Price and MarketInformation
  await queryCurrencyInfo()
});
onUnmounted(() => {
  window.removeEventListener("resize", resetWidth);
});
function resetWidth() {
  windowWidth.value = window.document.body.offsetWidth;
}

const coinInfo = ref();
onMounted(() => {
  getCoinInfo(currencySlug.value);
})

const getCoinInfo = async (id: string) => {
  const res = await getOneCoin(id);
  coinInfo.value = res.data;
  console.log(coinInfo.value)
}

const currencyInformation = ref<CurrencyInformation>({} as CurrencyInformation)
const queryCurrencyInfo = async ()=>{
  const res = await queryCurrencyInformation(currencyName.value.toLowerCase())
  if(res.status == 200 && res.data){
    const data = JSON.parse(res.data)
    if (data.length > 0) {
      currencyInformation.value = data[0]
      console.log("currencyInformation", currencyInformation)
    }
  }
}

</script>

<style scoped lang="scss">
$fontMax: 40px;
$fontMain: 14px;
.box-header {
  background: #1c242c;
  padding: 46px 0px 21px 0px;
  @media (max-width: 1400px) {
    padding-left: 40px;
    padding-right: 40px;
  }
  .header-nav {
    cursor: pointer;
    font-size: $fontMain;
    line-height: 17px;
    max-width: 1290px;
    margin: auto;
  }
  .header-name {
    font-size: $fontMax;
    color: #fff;
    line-height: 49px;
    font-weight: 600;
    margin-top: 6px;
    max-width: 1290px;
    margin: auto;
    span {
      color: #01c19a;
    }
  }
}
.trade-page-box {
  max-width: 1290px;
  min-height: 985px;
  margin: auto;
  padding: 46px 0px 24px 0px !important;
  position: relative;
  @media (max-width: 1400px) {
    padding-left: 40px !important;
    padding-right: 40px !important;
  }
  @media (max-width: 992px) {
    padding-left: 20px !important;
    padding-right: 20px !important;
  }
}
.trade-page-text {
  max-width: 1290px;
  min-height: 985px;
  margin: auto;
  padding: 0px 20px 45px 0px;
  position: relative;
  @media (max-width: 1400px) {
    padding-left: 40px;
    padding-right: 40px;
  }
}
.trade-page-explore {
  max-width: 1290px;
  min-height: 985px;
  margin: auto;
  padding: 46px 0px 100px 0px;
  @media (max-width: 1400px) {
    padding-left: 40px;
    padding-right: 40px;
  }
  .transparent-fees {
    display: flex;
    margin-top: 100px;
    @media (max-width: 985px) {
      display: block;
    }
    .transparent-fees-content {
      .fees-title {
        font-size: 32px;
        color: #010000;
        line-height: 39px;
        font-weight: 600;
        span {
          color: #01c19a;
        }
      }
      .fees-text {
        font-size: 22px;
        color: #060606;
        line-height: 27px;
        width: 517px;
        margin-top: 35px;
        @media (max-width: 985px) {
          width: 100%;
        }
      }
      .fees-read-more {
        margin-top: 45px;
        font-size: 22px;
        color: #01c19a;
        line-height: 27px;
        cursor: pointer;
      }
    }
    .transparent-fees-image {
      margin-left: 20px;
      width: 413px;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      @media (max-width: 985px) {
        width: 100%;
      }
    }
  }
}
.bottom-part {
  background-color: #f8f8f8;
  :deep(.join-page) {
    max-width: 1290px;
  }
  @media (max-width: 1400px) {
    padding: 0 40px;
  }
  @media (max-width: 992px) {
    padding: 0px;
  }
}
</style>
