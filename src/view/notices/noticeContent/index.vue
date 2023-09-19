<template>
  <div class="center-content">
    <Header />
    <div class="main-part">
      <div class="nav">
        <el-breadcrumb :separator-icon="ArrowRight">
          <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/noticesList' }">Announcements</el-breadcrumb-item>
          <el-breadcrumb-item >Article</el-breadcrumb-item> <!-- :to="{ path: '/noticeContent' }" -->
        </el-breadcrumb>
      </div>
      <div class="part-container">
        <div class="title-box">
          <div class="first-title">
            {{ noticeInfo?.title }}
          </div>
          <div class="info clearfloat">
            <div class="date">{{ noticeInfo?.createTime }} &nbsp;&nbsp; </div>
          </div>
          <div class="divide-line"></div>
        </div>
        <div class="content-box">
          <!-- <div class="second-title">
            {{ noticeInfo?.text }}
          </div> -->
          <div class="content">
            <div class="con-content">{{ noticeInfo?.text }}</div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <Footer v-if="windowWidth > 769" />
      <FooterMobile v-if="windowWidth <= 769"></FooterMobile>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onUnmounted, onMounted, onUpdated } from "vue";
import { ArrowRight } from "@element-plus/icons-vue";
import Header from "../../../layout/Header/Header.vue";
import Footer from "../../../layout/Footer/Footer.vue";
import FooterMobile from "../../../layout/Footer/FooterMobile.vue";
import { storeToRefs } from "pinia";
import { noticeInfoStore } from "../../../store/notice";

const windowWidth = ref(window.document.body.offsetWidth);
const noticeStore = noticeInfoStore()
const {noticeInfo} = storeToRefs(noticeStore)
onMounted(() => {
  window.addEventListener("resize", resetWidth);
  noticeStore.markReads()
});
onUnmounted(() => {
  window.removeEventListener("resize", resetWidth);
});
function resetWidth() {
  windowWidth.value = window.document.body.offsetWidth;
}
onUpdated(() => {
  noticeStore.markReads()
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
  min-height: calc(100vh - 165px);

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
