<template>
  <div class="center-content">
    <Header v-if="uiStore.showHeaderFooter" />
    <div class="main-part">
      <div class="nav">
        <el-breadcrumb :separator-icon="ArrowRight">
          <el-breadcrumb-item @click="navigateTo('/learnCenter')" style="cursor: pointer;">Learn</el-breadcrumb-item>
          <el-breadcrumb-item @click="navigateTo('/learnList')" style="cursor: pointer;">List</el-breadcrumb-item>
          <el-breadcrumb-item @click="navigateTo('/centerContent')" style="cursor: pointer;">Article</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="part-container">
        <div class="title-box">
          <div class="first-title">
            {{ blogInfo.title || '----' }}
          </div>
          <div class="info clearfloat">
            <div class="date">{{ formattedCreateTime }} &nbsp;&nbsp; {{ blogInfo.author || '----' }}</div>
            <!-- <div class="icon">
              <img :src="downbar_icon03" alt="" />
              <img :src="paper_full" alt="" />
              <img :src="facebook_icon" alt="" />
              <img :src="downbar_icon09" alt="" />
              <img :src="share_icon" alt="" />
            </div> -->
          </div>
          <div class="divide-line"></div>
        </div>
        <div v-html="blogInfo.blogTxt || '----'" class="content-box"></div>

      </div>
    </div>
    <div class="bottom-part">
      <div class="second-title">
        {{ $t('messages.centerContent.recommend') }}
      </div>
      <CenterContent style="margin-top:-20px" />
    </div>

    <Footer v-if="uiStore.showHeaderFooter && windowWidth > 769" />
    <FooterMobile v-if="uiStore.showHeaderFooter && windowWidth <= 769" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onUnmounted, onMounted, computed } from "vue";
import { useUIStore } from '../../../store/ui'

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

const formattedCreateTime = computed(() => {
  const createTime = blogInfo.value.createTime;
  if (!createTime || createTime === '----') {
    return '----';
  }
  
  try {
    const date = new Date(createTime);
    const targetDate = new Date('2025-08-01');
    
    if (date < targetDate) {
      return '2025-08-01 12:20:20';
    }
    
    return createTime;
  } catch (error) {
    return createTime || '----';
  }
});
onMounted(async () => {
  try {
    if (route.params.id) {
      const res: any = await getBlog(route.params.id as string);
      const resData: Blog = res.data;
      blogInfo.value = resData;
      blogInfo.value.blogTxt = blogInfo.value.blogTxt.replace('http://adminapi.coinbyte.com.au:88', '')
    }
  } catch (e) {
    ElMessage.error('Please try again later.');
  }
})

function navigateTo(path: string) {
  window.parent.postMessage({ type: 'navigate', path }, '*');
}

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

  @media (max-width: 769px) {
    font-size: 20px;
    line-height: 28px;
    text-align: center;
  }
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

  @media (max-width: 769px) {
    padding: 20px 16px 40px 16px;
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

        @media (max-width: 769px) {
          font-size: 24px;
          line-height: 32px;
        }
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
      line-height: 1.8;
      font-family: "HarmonyOS Sans",Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
      font-size: 16px;
      color: #282828;

      // 移动端覆盖内联样式的固定宽度
      @media (max-width: 769px) {
        :deep(div), :deep(main), :deep(article) {
          width: 100% !important;
          max-width: 100% !important;
          min-width: 0 !important;
          padding-left: 0 !important;
          padding-right: 0 !important;
          margin-left: 0 !important;
          margin-right: 0 !important;
          flex: 1 !important;
        }
      }

      // Typography
      :deep(h1), :deep(h2), :deep(h3), :deep(h4), :deep(h5), :deep(h6) {
        font-weight: 600;
        margin-top: 24px;
        margin-bottom: 16px;
        line-height: 1.4;
        color: #000;
      }

      :deep(h1) {
        font-size: 36px;
        margin-top: 32px;
      }

      :deep(h2) {
        font-size: 28px;
        margin-top: 28px;
      }

      :deep(h3) {
        font-size: 24px;
      }

      :deep(h4) {
        font-size: 20px;
      }

      :deep(h5) {
        font-size: 18px;
      }

      :deep(h6) {
        font-size: 16px;
      }

      // Paragraphs
      :deep(p) {
        margin-bottom: 16px;
        line-height: 1.8;
      }

      // Text styling
      :deep(strong), :deep(b) {
        font-weight: 600;
        color: #000;
      }

      :deep(em), :deep(i) {
        font-style: italic;
      }

      :deep(u) {
        text-decoration: underline;
      }

      :deep(del), :deep(s), :deep(strike) {
        text-decoration: line-through;
        opacity: 0.8;
      }

      :deep(mark) {
        background-color: #fef3c7;
        padding: 2px 4px;
        border-radius: 2px;
      }

      // Links
      :deep(a) {
        color: #01c19a;
        text-decoration: none;
        transition: all 0.3s ease;

        &:hover {
          text-decoration: underline;
          opacity: 0.8;
        }
      }

      // Lists
      :deep(ul), :deep(ol) {
        margin: 16px 0;
        padding-left: 32px;
      }

      :deep(ul) {
        list-style-type: disc;
      }

      :deep(ol) {
        list-style-type: decimal;
      }

      :deep(li) {
        margin-bottom: 8px;
        line-height: 1.8;
      }

      :deep(ul ul), :deep(ol ul) {
        list-style-type: circle;
        margin-top: 8px;
        margin-bottom: 8px;
      }

      :deep(ul ul ul), :deep(ol ul ul), :deep(ul ol ul), :deep(ol ol ul) {
        list-style-type: square;
      }

      // Blockquotes
      :deep(blockquote) {
        margin: 24px 0;
        padding: 16px 24px;
        border-left: 4px solid #01c19a;
        background-color: #f8f9fa;
        color: #4a5568;
        font-style: italic;

        p:last-child {
          margin-bottom: 0;
        }
      }

      // Code
      :deep(code) {
        background-color: #f3f4f6;
        padding: 2px 6px;
        border-radius: 4px;
        font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
        font-size: 14px;
        color: #e53e3e;
      }

      :deep(pre) {
        background-color: #1d262f;
        color: #e6e6e6;
        padding: 16px;
        border-radius: 8px;
        overflow-x: auto;
        margin: 16px 0;
        line-height: 1.5;

        code {
          background-color: transparent;
          padding: 0;
          color: inherit;
          font-size: 14px;
        }
      }

      // Tables
      :deep(table) {
        width: 100%;
        border-collapse: collapse;
        margin: 24px 0;
        overflow-x: auto;
        display: block;
      }

      :deep(th), :deep(td) {
        padding: 12px 16px;
        text-align: left;
        border: 1px solid #e2e8f0;
      }

      :deep(th) {
        background-color: #f7fafc;
        font-weight: 600;
        color: #2d3748;
      }

      :deep(tr:nth-child(even)) {
        background-color: #f9fafb;
      }

      // Images
      :deep(img) {
        max-width: 100%;
        height: auto;
        margin: 16px 0;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      // Horizontal rules
      :deep(hr) {
        margin: 32px 0;
        border: none;
        border-top: 1px solid #e2e8f0;
      }

      // Definition lists
      :deep(dl) {
        margin: 16px 0;
      }

      :deep(dt) {
        font-weight: 600;
        margin-bottom: 4px;
        color: #000;
      }

      :deep(dd) {
        margin-left: 24px;
        margin-bottom: 12px;
        color: #4a5568;
      }

      // Subscript and superscript
      :deep(sub), :deep(sup) {
        font-size: 0.75em;
        line-height: 0;
        position: relative;
        vertical-align: baseline;
      }

      :deep(sup) {
        top: -0.5em;
      }

      :deep(sub) {
        bottom: -0.25em;
      }

      // Small text
      :deep(small) {
        font-size: 14px;
        color: #718096;
      }

      // Abbreviations
      :deep(abbr[title]) {
        text-decoration: underline dotted;
        cursor: help;
      }

      // Keyboard input
      :deep(kbd) {
        display: inline-block;
        padding: 2px 6px;
        font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
        font-size: 13px;
        line-height: 1.4;
        color: #444;
        background-color: #f7f7f7;
        border: 1px solid #ccc;
        border-radius: 3px;
        box-shadow: 0 1px 0 rgba(0,0,0,0.2), inset 0 0 0 2px #fff;
      }

      // Sample output
      :deep(samp) {
        font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
        font-size: 14px;
        background-color: #f3f4f6;
        padding: 2px 4px;
        border-radius: 3px;
      }

      // Variables
      :deep(var) {
        font-style: italic;
        font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
        color: #e53e3e;
      }

      // Citations
      :deep(cite) {
        font-style: italic;
        color: #718096;
      }

      // Address
      :deep(address) {
        font-style: italic;
        margin: 16px 0;
        color: #4a5568;
      }

      // Details and summary
      :deep(details) {
        margin: 16px 0;
        padding: 16px;
        background-color: #f8f9fa;
        border-radius: 8px;
        border: 1px solid #e2e8f0;
      }

      :deep(summary) {
        font-weight: 600;
        cursor: pointer;
        margin-bottom: 8px;
        color: #2d3748;

        &:hover {
          color: #01c19a;
        }
      }

      // Figure and figcaption
      :deep(figure) {
        margin: 24px 0;
        text-align: center;
      }

      :deep(figcaption) {
        margin-top: 8px;
        font-size: 14px;
        color: #718096;
        font-style: italic;
      }

      // Time
      :deep(time) {
        color: #718096;
        font-size: 14px;
      }

      // Progress
      :deep(progress) {
        width: 100%;
        height: 20px;
        margin: 16px 0;
      }

      // Meter
      :deep(meter) {
        width: 100%;
        height: 20px;
        margin: 16px 0;
      }
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

  @media (max-width: 769px) {
    padding: 30px 16px 60px 16px;
  }
}</style>
