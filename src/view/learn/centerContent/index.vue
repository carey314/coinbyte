<template>
  <div class="center-content">
    <Header />
    <div class="main-part">
      <div class="nav">
        <el-breadcrumb :separator-icon="ArrowRight">
          <el-breadcrumb-item :to="{ path: '/learnCenter' }">Learn</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/learnList' }">Explained</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/centerContent' }">Article</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="part-container">
        <div class="title-box">
          <div class="first-title">
            {{ blogInfo.title || '----' }}
          </div>
          <div class="info clearfloat">
            <div class="date">{{ blogInfo.createTime || '----' }} &nbsp;&nbsp; {{ blogInfo.author || '----' }}</div>
            <div class="icon">
              <img :src="downbar_icon03" alt="" />
              <img :src="paper_full" alt="" />
              <img :src="facebook_icon" alt="" />
              <img :src="downbar_icon09" alt="" />
              <img :src="share_icon" alt="" />
            </div>
          </div>
          <div class="divide-line"></div>
        </div>
        <div v-html="blogInfo.blogTxt || '----'" class="content-box"></div>
        <!-- <div class="content-box" v-for="(item, index) in contentCard" :key="index">
          <div class="second-title">
            {{ item.title }}
          </div>
          <div class="content">
            <div class="con-content">{{ item.firstContent }}</div>
            <div class="con-content">{{ item.secondContent }}</div>
          </div>
        </div>
        <div class="content-box">
          <div class="second-title">Accessing COINBYTE's trading bot</div>
          <div class="content">
            <div class="con-content">
              You'll see the different trading bot strategies listed below the
              chart in the Trade section.
            </div>
            <div class="screenshot">
              <img :src="image1" />
            </div>
            <div class="con-content">
              In the Iceberg section, select the product and trading pair you
              want to trade using the menu in the top-left corner. You can use
              the trading bot in the Spot, Perpetual, Futures, Margin and
              Options markets. Select the desired instrument and then the
              trading pair from the list.
            </div>
            <div class="screenshot">
              <img :src="image2" />
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <div class="bottom-part">
      <div class="second-title">
        {{ $t('messages.centerContent.recommend') }}
      </div>
      <CenterContent style="margin-top:-20px" />
    </div>

    <Footer v-if="windowWidth > 769" />
    <FooterMobile v-if="windowWidth <= 769" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onUnmounted, onMounted } from "vue";

import { useRoute } from "vue-router";
import { getBlog,getBlogs } from '../../../api/blog';
import { Blog } from "../../../models/blog";

import { ElMessage, type TabsPaneContext } from "element-plus";
import { ArrowRight } from "@element-plus/icons-vue";
import Header from "../../../layout/Header/Header.vue";
import Footer from "../../../layout/Footer/Footer.vue";
import FooterMobile from "../../../layout/Footer/FooterMobile.vue";
import CenterContent from "../component/CenterContent.vue";

import downbar_icon03 from "../../../assets/home/downbar_icon03.svg";
import paper_full from "../../../assets/home/paper-full.svg";
import facebook_icon from "../../../assets/home/facebook_icon.svg";
import downbar_icon09 from "../../../assets/home/downbar_icon09.svg";
import share_icon from "../../../assets/home/share_icon.svg";
import image1 from "../../../assets/home/image1.png";
import image2 from "../../../assets/home/image2.png";

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
const activeName = ref("first");

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
const contentCard = ref([
  {
    title: "Trading bots modes",
    firstContent:
      "The COINBYTE trading bot has seven distinct modes — spot grid, futures grid, smart portfolio, recurring buy, arbitrage order, iceberg and TWAP (i.e., time-weighted average price) — suitable for varying purposes and needs.",
    secondContent:
      "Spot grid, futures grid, smart portfolio and recurring buy are the most straightforward modes to use and carry the least risk. They're perfect for traders and investors of any ability level. Meanwhile, arbitrage order, iceberg order and TWAP are suited to more advanced users. These modes have more complex risk profiles or are only beneficial for those traders making larger orders.",
  },
  {
    title: "Spot grid",
    firstContent:
      "The first mode, called spot grid, is ideal for traders of any volume and experience level hoping to lock in additional profits from asset volatility. The bot sets grid lines between an upper and lower price set by the user, and automatically sells crypto if the traded asset's price increases and reaches one of the lines. Conversely, the bot automatically buys crypto if the price decreases to one of the lines.",
    secondContent:
      "You can determine the spot grid's parameters yourself or choose the AI strategy, which is based on previous price movements. The AI strategy uses back-tested parameters that will likely result in the most profitable trades. Setting the trading bot grids yourself is slightly riskier but allows greater user control.",
  },
  {
    title: "Futures grid",
    firstContent:
      "The futures grid trading bot is similar to spot grid mode but buys and sells long or short futures contracts rather than buying and selling assets in the spot market. Again, the futures trading bot uses a grid system to place orders above and below the current price, and buys and sells different futures contracts to profit from price volatility. Futures grid mode supports three distinct trading strategies: long, short and neutral.",
    secondContent:
      "A crucial difference between the futures and spot grid modes is the ability to trade with leverage on futures contracts. Users can amplify their position size with leverage, potentially making it a more capital-efficient strategy that can result in more significant gains. Of course, leverage trading carries its own risks, and it's crucial to understand them before using the futures grid trading bot.",
  },
]);

const route = useRoute();
const blogInfo = ref<Blog>({
  author: '',
  createTime: '',
  blogTxt: '',
  icon: '',
  banner: '',
  id: 0,
  status: 0,
  title: '',
  top: 0,
  typeOne: 0,
  typeTwo: 0,
  subDesc: ''
});
onMounted(async () => {
  try {
    if (route.params.id) {
      const res: any = await getBlog(route.params.id as string);
      const resData: Blog = res.data;
      blogInfo.value = resData;
    }
  } catch (e) {
    ElMessage.error('Please try again later.');
  }
})

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

.second-title {
  font-size: $fontSizeMedPro;
  color: #000;
  line-height: 49px;
  font-weight: 600;
}

.content {
  font-size: $fontSizeDef;
  line-height: 22px;
  color: #282828;

  .con-content {
    margin-top: 28px;
  }

  .screenshot {
    margin-top: 30px;

    img {
      width: 100%;
      height: 100%;
    }
  }
}

.main-part {
  max-width: 1290px;
  margin: auto;
  padding: 45px 130px 77px 130px;

  @media (max-width: 1440px) {
    padding: 45px 30px 37px 30px;
  }

  .nav {
    :deep() {

      .el-breadcrumb__inner a,
      .el-breadcrumb__inner.is-link {
        color: #878787;
        line-height: 16px;
        font-weight: 500;
      }
    }
  }

  .part-container {
    margin-top: 21px;

    .title-box {
      margin-top: 32px;

      .first-title {
        font-size: 40px;
        color: #000;
        line-height: 49px;
        font-weight: 600;
      }

      .info {
        margin-top: 32px;

        .date {
          font-size: $fontSizeMinPro;
          color: #878787;
          line-height: 16px;
          display: flex;
          float: left;
        }

        .icon {
          float: right;

          @media(max-width:769px) {
            margin-top: -7px;
          }

          img {
            cursor: pointer;
            width: 1rem;
            margin: 8px 20px 0 0;
            height: 1rem;
          }
        }
      }

      .divide-line {
        width: 100%;
        border: 1px solid #ebebeb;
        margin-top: 6px;
      }
    }

    .content-box {
      margin-top: 45px;
      line-height: 22px;
      font-family: "HarmonyOS Sans",Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
    }
  }
}

.bottom-part {
  max-width: 1290px;
  margin: auto;
  padding: 45px 0 134px 0;

  @media (max-width: 1440px) {
    padding: 45px 30px 134px 30px;
  }
}</style>
