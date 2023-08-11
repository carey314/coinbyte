<template>
  <div class="about-box">
    <div
      class="about-box-content"
      :style="{ height: viewMore ? 'auto' : '509px' }"
    >
      <div
        class="about-box-content-inner"
        v-html="coinInfo ? coinInfo.infoTxt : copy"
      ></div>
    </div>
    <div  class="view-more">
      <div class="view-more-mask" v-if="viewMore === false"></div>
      <div class="view-more-button" @click="toggleViewMore">View more</div>
    </div>
  </div>

  <div class="resource-box">
    <div class="resource-title">
      <span>{{ coinInfo?.name || currencyName }}</span> Resources
    </div>
    <div class="resource-way">
      <div class="way-website clearfloat">
        <div class="website-icon">
          <img :src="icon_official" />
        </div>
        <div class="website-name">
          Official {{ coinInfo?.name || currencyName }} Website &gt;
        </div>
      </div>
      <div class="way-paper clearfloat">
        <div class="paper-icon">
          <img :src="icon_whitepaperl" />
        </div>
        <div class="paper-name">Whitepaper &gt;</div>
      </div>
    </div>
  </div>
  <div class="question-box">
    <div class="question-part">
      <div class="question-title">
        People Also Ask: Other Questions About
        <span>{{ coinInfo?.name || currencyName }}</span>
      </div>
      <div class="question-part-collapse">
        <!-- <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="How Many Bitcoins Are There?" name="1">
            <div class="collapse-content">How Many Bitcoins Are There?</div>
          </el-collapse-item>
          <el-collapse-item
            title=" What Role Does Bitcoin Have as a Store of Value?"
            name="2"
          >
            <div class="collapse-content">
              What Role Does Bitcoin Have as a Store of Value?
            </div>
          </el-collapse-item>
          <el-collapse-item
            title="How Is Bitcoin (BTC) Different From Bitcoin Cash (BCH)?"
            name="3"
          >
            <div class="collapse-content">
              How Is Bitcoin (BTC) Different From Bitcoin Cash (BCH)?
            </div>
          </el-collapse-item>
          <el-collapse-item
            title="Why Do Bitcoin Price Changes Impact Other Coins?"
            name="4"
          >
            <div class="collapse-content">
              Why Do Bitcoin Price Changes Impact Other Coins?
            </div>
          </el-collapse-item>
          <el-collapse-item title="How Secure Is Bitcoin?" name="5">
            <div class="collapse-content">How Secure Is Bitcoin?</div>
          </el-collapse-item>
          <el-collapse-item title="What Is Bitcoin Mining?" name="6">
            <div class="collapse-content">What Is Bitcoin Mining?</div>
          </el-collapse-item>
          <el-collapse-item title="How Can I Store My Bitcoin?" name="7">
            <div class="collapse-content">How Can I Store My Bitcoin?</div>
          </el-collapse-item>
        </el-collapse> -->
        <el-collapse
          v-if="decodeData(coinInfo?.questionJson).length > 0"
          v-model="activeNames"
        >
          <el-collapse-item
            v-for="(item, index) in decodeData(coinInfo?.questionJson)"
            :key="index"
            :title="item.que"
            :name="item.que + index"
          >
            <div class="collapse-content" v-html="item.ans" />
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onUnmounted, onMounted } from "vue";

import icon_official from "../../../assets/home/icon_official.svg";
import icon_whitepaperl from "../../../assets/home/icon_whitepaperl.svg";
import { storeToRefs } from "pinia";
import { tradeStore } from "../../../store/trade";

const useTradeStore = tradeStore();
const { currencySlug, currencyName, currencyIcon } = storeToRefs(useTradeStore);

const props = defineProps<{
  coinInfo: any;
}>();

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
const activeNames = ref([""]);
const handleChange = (val: string[]) => {
  // console.log(val);
};

const copy = `
    <div class="about-crypto">About <span>${currencyName.value}</span></div>
    <div class="about-introduce">
      Bitcoin is one of the most popular cryptocurrencies in the market. First
      introduced in 2009 by Satoshi Nakamoto, Bitcoin has held the crypto
      market's number one spot according to market capitalization. Bitcoin paved
      the way for many existing altcoins in the market and marked a pivotal
      moment for digital payment solutions.
    </div>
    <div class="about-introduce">
      As the world's first cryptocurrency, Bitcoin has come a long way in terms
      of its value. However, one does not have to buy an entire bitcoin as
      bitcoins can be divided into small units called satoshis, named after the
      creator. A satoshi is equivalent to 0.00000001 bitcoin.
    </div>
    <div class="about-introduce">
      There is no physical BTC token so you can think of bitcoin as digital
      money. Bitcoin transactions are fully transparent and can't be censored.
      You can send money to anyone in the world with ease. It's a financial
      system backed by thousands of computers, known as 'nodes', around the
      world, instead of a single central bank or government, i.e. hence the term
      'decentralization'.
    </div>
    <div class="upgrades">Bitcoin Upgrades</div>
    <div class="gradient-text">
      Because Bitcoin is decentralized and community-driven, many upgrades to
      Bitcoin come in the form of formal proposals called Bitcoin Improvement
      Proposals, or BIPs. This ensures that the software is always undergoing
      upgrades that can further contribute to the community's needs. Anyone can
      propose a BIP, and the community will reject or approve of the BIP
      collectively. One major upgrade to Bitcoin's consensus protocol is the
      SegWit Upgrade, proposed in BIP 141 and designed to help the bitcoin scale
      to support more transactions to meet growing demand. BIPs like these
      change Bitcoin's consensus rules, resulting in forks.
    </div>
`;

const viewMore = ref(false);
const toggleViewMore = () => {
  viewMore.value = !viewMore.value;
};
// const myDiv = ref(null); // 创建 ref 引用
// const state = reactive({
//   divHeight: "500px", // 初始化高度
// });

// // 切换高度的方法
// const toggleHeight = () => {
//   state.divHeight = state.divHeight === "500px" ? "100%" : "500px";
// };
onMounted(() => {
  const content = document.querySelector(
    ".about-box-content-inner"
  ) as HTMLElement;
  if (content) {
    console.log(content.offsetHeight <= 509);
    if (content.offsetHeight <= 509) {
      viewMore.value = false;
    }
  }
});

const decodeData = (data: any) => {
  try {
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
};
</script>

<style scoped lang="scss">
$headerBackGround: #161719;
$bg-color: #fff;
$main-color: #01c19a;
$fontSizeMax: 42px;
$fontSizeMed: 24px;
$fontSizeDefPro: 18px;
$fontSizeDef: 16px;
$fontSizeMinPro: 14px;
$fontSizeMin: 12px;

.about-box-content-inner h2 {
  font-size: 32px;
  color: #010000;
  line-height: 39px;
  font-weight: 600;
}
.about-box-content-inner p {
  margin-top: 20px;
}
.question-part {
  background-color: #fff;
  margin-top: 93px;
  font-size: 32px;
  color: #010000;
  line-height: 39px;
  font-weight: 600;
  span {
    color: #01c19a;
  }

  .question-part-collapse {
    padding-top: 33px;
    // margin: auto;
    text-align: left;
    font-size: $fontSizeDef !important;
    line-height: 19px;
    color: #060606;
    width: 907px;

    @media (max-width: 985px) {
      & {
        width: 100%;
      }
    }

    :deep(.el-collapse-item__header) {
      height: 68px;
      font-size: $fontSizeDef;
      line-height: 19px;
      color: #060606;
      font-weight: 500;

      .el-collapse-item__arrow {
        transform: rotate(90deg);
      }

      .el-collapse-item__arrow.is-active {
        transform: rotate(270deg);
      }
    }

    .collapse-content {
      font-size: 14px;
      color: #929292;
      font-weight: 400;
    }
  }
}

.about-box {
  &-content {
    overflow: hidden;
  }
  :deep() {
    .about-crypto {
      font-size: 32px;
      color: #010000;
      line-height: 39px;
      font-weight: 600;
      span {
        color: #01c19a;
      }
    }
    .about-introduce {
      margin-top: 30px;
      color: #060606;
      line-height: 18px;
    }
    .upgrades {
      color: #060606;
      line-height: 18px;
      font-weight: 600;
      margin-top: 19px;
    }
    .gradient-text {
      line-height: 18px;
      margin-top: 19px;
      background-image: linear-gradient(to bottom, #060606 -60%, #ffffff 100%);
      -webkit-background-clip: text;
      -moz-background-clip: text;
      background-clip: text;
      color: transparent;
    }
    .view-more {
      width: 100%;
      display: flex;
      justify-content: center;
      border-radius: 3px;
      margin: auto;
      position: relative;
      &-mask {
        background-image: linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0.3),
          rgba(255, 255, 255, 1)
        );
        // background-color: red;
        // -webkit-background-clip: text;
        // -moz-background-clip: text;
        // background-clip: text;
        color: transparent;
        height: 200px;
        width: 100%;
        position: absolute;
        top: -200px;
        z-index: 1000;
      }
      .view-more-button {
        cursor: pointer;
        width: 133px;
        height: 41px;
        border: 1px solid #d7d7d7;
        height: 41px;
        color: #878787;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 3px;
      }
    }
  }
}

.resource-box {
  margin-top: 70px;
  .resource-title {
    font-size: 32px;
    color: #010000;
    line-height: 39px;
    font-weight: 600;
    span {
      color: #01c19a;
    }
  }
  .resource-way {
    .way-website {
      margin-top: 35px;
      .website-icon {
        float: left;
      }
      .website-name {
        float: left;
        margin-left: 14px;
        margin-top: 2px;
        font-size: $fontSizeDef;
        color: #060606;
        font-weight: 500;
      }
    }

    .way-paper {
      margin-top: 27px;
      .paper-icon {
        float: left;
      }
      .paper-name {
        float: left;
        margin-left: 16px;
        margin-top: 2px;
        font-size: $fontSizeDef;
        color: #060606;
        font-weight: 500;
      }
    }
  }
}
.about-box {
  line-height: 22px;
  font-family: "HarmonyOS Sans", Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
}
</style>
