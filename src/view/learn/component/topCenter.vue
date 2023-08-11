<template>
  <div>
    <div class="top-box" v-if="windowWidth > 769">
      <div class="top-container max1290">
        <el-radio-group v-model="activeName" size="large">
          <el-radio-button
            :label="option.value"
            v-for="option in options"
            :key="option.value"
          >
            <div class="label">
              {{ option.label }}
            </div>
          </el-radio-button>
        </el-radio-group>
        <div v-if="activeName === '1'">
          <el-row>
            <el-col :span="13">
              <div class="title">{{ $t('messages.learnTop.label_first') }}</div>
              <div
                class="card clearfloat"
                v-for="(item, index) in firstCard"
                :key="index"
              >
                <div class="number">{{ item.number }}</div>
                <div class="con-text clearfloat">
                  <div class="msg">{{ item.msg }}</div>
                  <div class="first-content content">{{ item.content }}</div>
                </div>
              </div>
              <div>
                <GetButton class="trade-btn" type="success" :text="t('messages.learnTop.trade_btn')" />
              </div>
            </el-col>
            <el-col :span="11">
              <div class="right-img">
                <img :src="learn_banner01" />
              </div>
            </el-col>
          </el-row>
        </div>

        <div v-if="activeName === '2'">
          <el-row>
            <el-col :span="13">
              <div class="title">{{ $t('messages.learnTop.label_second') }}</div>

              <div
                class="card clearfloat"
                v-for="(item, index) in secondCard"
                :key="index"
              >
                <div class="number">{{ item.number }}</div>
                <div class="con-text clearfloat">
                  <div class="msg">{{ item.msg }}</div>
                  <div class="second-content content">{{ item.content }}</div>
                </div>
              </div>
              <div>
                <GetButton class="trade-btn" type="success" :text="t('messages.learnTop.trade_btn')" />
              </div>
            </el-col>
            <el-col :span="11">
              <div class="right-img">
                <img :src="learn_banner02" />
              </div>
            </el-col>
          </el-row>
        </div>
        <!-- <div v-if="activeName === '3'">
          <el-row>
            <el-col :span="13">
              <div class="title">{{ $t('messages.learnTop.label_third') }}</div>
              <div
                class="card clearfloat"
                v-for="(item, index) in thirdCard"
                :key="index"
              >
                <div class="number">{{ item.number }}</div>
                <div class="con-text clearfloat">
                  <div class="msg">{{ item.msg }}</div>
                  <div class="third-content content">{{ item.content }}</div>
                </div>
              </div>
              <div>
                <GetButton class="trade-btn" type="success" :text="t('messages.learnTop.trade_btn')" />
              </div>
            </el-col>
            <el-col :span="11">
              <div class="right-img" style="margin-top:20px">
                <img :src="learn_banner03" />
              </div>
            </el-col>
          </el-row>
        </div>
        <div v-if="activeName === '4'">
          <el-row>
            <el-col :span="13">
              <div class="title">{{ $t('messages.learnTop.label_forth') }}</div>
              <div
                class="card clearfloat"
                v-for="(item, index) in fourthCard"
                :key="index"
              >
                <div class="number">{{ item.number }}</div>
                <div class="con-text clearfloat">
                  <div class="msg">{{ item.msg }}</div>
                  <div class="fourth-content content">{{ item.content }}</div>
                </div>
              </div>
              <div>
                <GetButton class="trade-btn" type="success" :text="t('messages.learnTop.trade_btn')" />
              </div>
            </el-col>
            <el-col :span="11">
              <div class="right-img">
                <img :src="learn_banner04" />
              </div>
            </el-col>
          </el-row>
        </div> -->
      </div>
    </div>
    <div class="top-box" v-if="windowWidth <= 769">
      <div class="top-container max1290">
        <el-radio-group v-model="activeName" size="large" style="margin-top: 20px;margin-left: -10px;">
          <el-scrollbar height="100px">
            <div class="scrollbar-flex-content">
              <el-radio-button
                :label="option.value"
                v-for="option in options"
                :key="option.value"
                style="margin-left: 10px;"
                >
                <div class="label" style="">
                  {{ option.label }}
                </div>
                </el-radio-button
              >
            </div>
          </el-scrollbar>
        </el-radio-group>

        <div v-if="activeName === '1'" >
          <el-row>
            <el-col :span="24">
              <div class="title">{{ $t('messages.learnTop.label_first') }}</div>
              <div
                class="card clearfloat"
                v-for="(item, index) in firstCard"
                :key="index"
              >
                <div class="number">{{ item.number }}</div>
                <div class="con-text clearfloat">
                  <div class="msg">{{ item.msg }}</div>
                  <div class="first-content content">{{ item.content }}</div>
                </div>
              </div>
              <div>
                <GetButton class="trade-btn" type="success" :text="t('messages.learnTop.trade_btn')" />
              </div>
            </el-col>
            <el-col :span="24">
              <div class="right-img">
                <img :src="learn_banner01" />
              </div>
            </el-col>
          </el-row>
        </div>

        <div v-if="activeName === '2'">
          <el-row>
            <el-col :span="24">
              <div class="title">{{ $t('messages.learnTop.label_second') }}</div>

              <div
                class="card clearfloat"
                v-for="(item, index) in secondCard"
                :key="index"
              >
                <div class="number">{{ item.number }}</div>
                <div class="con-text clearfloat">
                  <div class="msg">{{ item.msg }}</div>
                  <div class="second-content content">{{ item.content }}</div>
                </div>
              </div>
              <div>
                <GetButton class="trade-btn" type="success" :text="t('messages.learnTop.trade_btn')" />
              </div>
            </el-col>
            <el-col :span="24">
              <div class="right-img">
                <img :src="learn_banner02" />
              </div>
            </el-col>
          </el-row>
        </div>
        <!-- <div v-if="activeName === '3'">
          <el-row>
            <el-col :span="24">
              <div class="title">{{ $t('messages.learnTop.label_third') }}</div>
              <div
                class="card clearfloat"
                v-for="(item, index) in thirdCard"
                :key="index"
              >
                <div class="number">{{ item.number }}</div>
                <div class="con-text clearfloat">
                  <div class="msg">{{ item.msg }}</div>
                  <div class="third-content content">{{ item.content }}</div>
                </div>
              </div>
              <div>
                <GetButton class="trade-btn" type="success" :text="t('messages.learnTop.trade_btn')" />
              </div>
            </el-col>
            <el-col :span="24">
              <div class="right-img">
                <img :src="learn_banner03" />
              </div>
            </el-col>
          </el-row>
        </div>
        <div v-if="activeName === '4'">
          <el-row>
            <el-col :span="24">
              <div class="title">{{ $t('messages.learnTop.label_forth') }}</div>
              <div
                class="card clearfloat"
                v-for="(item, index) in fourthCard"
                :key="index"
              >
                <div class="number">{{ item.number }}</div>
                <div class="con-text clearfloat">
                  <div class="msg">{{ item.msg }}</div>
                  <div class="fourth-content content">{{ item.content }}</div>
                </div>
              </div>
              <div>
                <GetButton class="trade-btn" type="success" :text="t('messages.learnTop.trade_btn')" />
              </div>
            </el-col>
            <el-col :span="24">
              <div class="right-img">
                <img :src="learn_banner04" />
              </div>
            </el-col>
          </el-row>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onUnmounted, onMounted } from "vue";
import type { TabsPaneContext } from "element-plus";
import GetButton from "../../../components/GetButton.vue";

import learn_banner01 from "../../../assets/home/learn_banner01.png";
import learn_banner02 from "../../../assets/home/learn_banner02.png";
import learn_banner03 from "../../../assets/home/learn_banner03.png";
import learn_banner04 from "../../../assets/home/learn_banner04.png";

import { useI18n } from 'vue-i18n'
const {t} = useI18n();

const activeName = ref("1");

const trade = ref("Trade now");

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
    label: t('messages.learnTop.label_first'),
  },
  {
    value: "2",
    label: t('messages.learnTop.label_second'),
  },
  // {
  //   value: "3",
  //   label: t('messages.learnTop.label_third'),
  // },view-more-mask
  // {
  //   value: "4",
  //   label: t('messages.learnTop.label_forth'),
  // },
  

  // 记得更换justify space-between
]);

const firstCard = [
  {
    number: 1,
    msg: t('messages.learnTop.card_firstMsg1'),
    content:t('messages.learnTop.card_firstContent1'),
  },
  {
    number: 2,
    msg: t('messages.learnTop.card_firstMsg2'),
    content: t('messages.learnTop.card_firstContent2'),
  },
  {
    number: 3,
    msg: t('messages.learnTop.card_firstMsg3'),
    content:t('messages.learnTop.card_firstContent3'),
  },
];
const secondCard = [
  {
    number: 1,
    msg: t('messages.learnTop.card_secondMsg1'),
    content:t('messages.learnTop.card_secondContent1'),
  },
  {
    number: 2,
    msg: t('messages.learnTop.card_secondMsg2'),
    content:t('messages.learnTop.card_secondContent2'),
  },
  {
    number: 3,
    msg: t('messages.learnTop.card_secondMsg3'),
    content: t('messages.learnTop.card_secondContent3'),
  },
];
const thirdCard = [
  {
    number: 1,
    msg: t('messages.learnTop.card_thirdMsg1'),
    content: t('messages.learnTop.card_thirdContent1'),
  },
  {
    number: 2,
    msg: t('messages.learnTop.card_thirdMsg2'),
    content: t('messages.learnTop.card_thirdContent2'),
  },
  {
    number: 3,
    msg: t('messages.learnTop.card_thirdMsg3'),
    content:t('messages.learnTop.card_thirdContent3'),
  },
];
const fourthCard = [
  {
    number: 1,
    msg: t('messages.learnTop.card_fourthMsg1'),
    content: t('messages.learnTop.card_fourthContent1'),
  },
  {
    number: 2,
    msg: t('messages.learnTop.card_fourthMsg2'),
    content: t('messages.learnTop.card_fourthContent2'),
  },
  {
    number: 3,
    msg: t('messages.learnTop.card_fourthMsg3'),
    content: t('messages.learnTop.card_fourthContent3'),
  },
];
</script>

<style scoped lang="scss">
$headerBackGround: #1d262f;
$bg-color: #fff;
$main-color: #01c19a;
$fontSizeMax: 42px;
$fontSizeMed: 24px;
$fontSizeDefPro: 18px;
$fontSizeDef: 16px;
$fontSizeMinPro: 14px;
$fontSizeMin: 12px;
.max1290 {
  max-width: 1290px;
  margin: 0 auto;
}
.scrollbar-flex-content {
  display: flex;
}
.trade-btn {
  font-weight: 500;
  height: 38px;
  margin-top: 30px;
  font-size: 16px;
  color: #ffffff;
  line-height: 19px;
  padding: 10px 17px 9px 18px !important;
}
.label {
  margin: auto;
  font-weight: 600;
  line-height: 19px;
}
:deep() {
  .el-radio-group {
    display: flex;
    // justify-content: space-between;
    justify-content: flex-start;
    gap: 20px;
  }
  .el-radio-button__inner {
    background: #313e4a;
    border: none !important;
    border-radius: 8px 8px 4px 4px;
    z-index: 999;
  }
  .el-radio-button--large .el-radio-button__inner {
    width: 280px;
    height: 70px;
    display: flex;
    align-items: center;
    color: #788590;
    margin-top:11px;
  }
  .el-radio-button:first-child .el-radio-button__inner {
    border-radius: 8px 8px 4px 4px;
  }
  .el-radio-button:last-child .el-radio-button__inner {
    border-radius: 8px 8px 4px 4px;
  }

  .el-radio-button__original-radio:checked + .el-radio-button__inner {
    background-color: #313e4a !important;
    color: #01c19a;
    border-bottom: 3px solid #01c19a !important;
    box-shadow: none;
  }
  .el-tabs--card > .el-tabs__header .el-tabs__nav {
    border: none;
  }
  .el-tabs--card > .el-tabs__header .el-tabs__item {
    border: none;
  }
  .el-tabs__nav-scroll {
    background-color: #313e4a;
    border-radius: 8px;
  }
  .el-scrollbar__bar.is-horizontal>div{
    height: 0;
  }

}
.top-box {
  padding: 30px 100px 80px 100px;
  background-color: $headerBackGround;
  height: 560px;
  .right-img{
    margin-top: -50px;
  }
  @media (max-width: 1320px) {
    & {
      height: 100%;
    }
    .right-img{
      margin-top: 0px;
    }
  }
  @media (min-width: 1250px) {
    & {
      padding-bottom:0;
    }
  }
  @media (max-width: 769px) {
    & {
      padding: 8px 20px;
    }
  }
  .demo-tabs {
    margin: auto;

    .el-tabs__content {
      padding: 32px;
      color: #7a8690;
      font-size: 32px;
      font-weight: 600;
    }
  }
}
.title {
  line-height: 29px;
  font-size: $fontSizeMed;
  color: $main-color;
  font-weight: 600;
  margin-top: 45px;
  @media(max-width:769px) {
    margin-top: 0;
  }
}
.con-text {
  display: block;
  float: left;
  margin-top: 20px;
  margin-left: 10px;
}
.number {
  width: 14px;
  height: 14px;
  background-color: $main-color;
  text-align: center;
  line-height: 15px;
  font-size: $fontSizeMin;
  color: $bg-color;
  display: block;
  float: left;
  margin-top: 23px;
}
.msg {
  line-height: 17px;
  font-size: $fontSizeMinPro;
  color: $bg-color;
}
.content {
  line-height: 16px;
  font-size: $fontSizeMinPro;
  color: #788590;
  margin-top: 7px;
}
.con-text {
  width: 90%;
}

.right-img {
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
