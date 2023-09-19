<template>
  <div class="about-page">
    <Header />
    <div class="top-part">
      <div class="back-center"><img :src="banner_bgk_lightgreen" /></div>
      <div class="back-left">
        <img :src="banner_left_bytecoin" />
      </div>
      <div class="back-right">
        <img :src="banner_right_bytecoin" />
      </div>

      <div class="top-part-box">
        <img :src="logo" class="top-part-img" />
        <div class="top-part-content" style="margin-top: 55px">
          {{ $t("messages.about.about_exchange") }}
        </div>
        <div class="top-part-content">
          {{ $t("messages.about.about_exchange") }}
        </div>
      </div>
    </div>

    <div class="center-part part" v-if="windowWidth > 769">
      <el-row>
        <el-col :span="12" @mouseover="yr" @mouseleave="yc" :style="active">
          <div class="part-box" style="border-top: none">
            <div class="part-msg clearfloat">
              <div class="part-img">
                <img :src="aboutus_icon01" />
              </div>
              <div class="part-title">
                {{ $t("messages.about.about_firstTitle") }}
              </div>
            </div>
            <div class="part-content">
              {{ $t("messages.about.about_firstContent") }}
            </div>
          </div>
        </el-col>
        <el-col :span="12" @mouseover="yr1" @mouseleave="yc1" :style="active1">
          <div class="part-box left-box" style="border-top: none">
            <div class="part-msg clearfloat">
              <div class="part-img">
                <img :src="aboutus_icon02" />
              </div>
              <div class="part-title">
                {{ $t("messages.about.about_secondTitle") }}
              </div>
            </div>
            <div class="part-content">
              {{ $t("messages.about.about_secondContent") }}
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="center-part part" v-if="windowWidth <= 769">
      <el-row>
        <el-col :span="24" @mouseover="yr" @mouseleave="yc" :style="active">
          <div class="part-box" style="border-top: none">
            <div class="part-msg clearfloat">
              <div class="part-img">
                <img :src="aboutus_icon01" />
              </div>
              <div class="part-title">
                {{ $t("messages.about.about_firstTitle") }}
              </div>
            </div>
            <div class="part-content">
              {{ $t("messages.about.about_firstContent") }}
            </div>
          </div>
        </el-col>
        <el-col :span="24" @mouseover="yr1" @mouseleave="yc1" :style="active1">
          <div class="part-box left-box">
            <div class="part-msg clearfloat">
              <div class="part-img">
                <img :src="aboutus_icon02" />
              </div>
              <div class="part-title">
                {{ $t("messages.about.about_secondTitle") }}
              </div>
            </div>
            <div class="part-content">
              {{ $t("messages.about.about_secondContent") }}
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="center-part part" v-if="windowWidth > 769">
      <el-row>
        <el-col :span="12" @mouseover="yr2" @mouseleave="yc2" :style="active2">
          <div class="part-box" name="third">
            <div class="part-msg clearfloat">
              <div class="part-img">
                <img :src="aboutus_icon03" />
              </div>
              <div class="part-title">
                {{ $t("messages.about.about_thirdTitle") }}
              </div>
            </div>
            <div class="part-content">
              {{ $t("messages.about.about_thirdContent") }}
            </div>
          </div>
        </el-col>
        <el-col :span="12" @mouseover="yr3" @mouseleave="yc3" :style="active3">
          <div class="part-box left-box" name="forth">
            <div class="part-msg clearfloat">
              <div class="part-img">
                <img :src="aboutus_icon04" />
              </div>
              <div class="part-title">
                {{ $t("messages.about.about_forthTitle") }}
              </div>
            </div>
            <div class="part-content">
              {{ $t("messages.about.about_forthCentre") }}<br />
              <span>100662269</span>
            </div>
            <div class="part-content-forth">
              {{ $t("messages.about.about_forthExchange") }}<br />
              <span>DCE100662269-001</span>
            </div>
            <div class="part-content-forth">
              {{ $t("messages.about.about_forthProvider") }}<br />
              <span>IND100662269-001</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="center-part part" v-if="windowWidth <= 769">
      <el-row>
        <el-col :span="24" @mouseover="yr2" @mouseleave="yc2" :style="active2">
          <div class="part-box" name="third">
            <div class="part-msg clearfloat">
              <div class="part-img">
                <img :src="aboutus_icon03" />
              </div>
              <div class="part-title">
                {{ $t("messages.about.about_forthTitle") }}
              </div>
            </div>
            <div class="part-content">
              {{ $t("messages.about.about_forthCentre") }}<br />
              <span>100662269</span>
            </div>
            <div class="part-content-forth">
              {{ $t("messages.about.about_forthExchange") }}<br />
              <span>DCE100662269-001</span>
            </div>
            <div class="part-content-forth">
              {{ $t("messages.about.about_forthProvider") }}<br />
              <span>IND100662269-001</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <div style="background: #f8f8f8">
      <joinCrypto class="max-width: 1600px;" />
    </div>
    <Footer v-if="windowWidth > 769" />
    <FooterMobile v-if="windowWidth <= 769" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from "vue";
import Header from "../../layout/Header/Header.vue";
import FooterMobile from "../../layout/Footer/FooterMobile.vue";
import Footer from "../../layout/Footer/Footer.vue";
import joinCrypto from "../../layout/joinStarted/joinCrypto.vue";

//img
import logo from "../../assets/home/编组 62.svg";
import banner_bgk_lightgreen from "../../assets/home/banner_bgk_lightgreen.png";
import banner_left_bytecoin from "../../assets/home/banner_left_bytecoin.png";
import banner_right_bytecoin from "../../assets/home/banner_right_bytecoin.png";
import aboutus_icon01 from "../../assets/home/aboutus_icon01.png";
import aboutus_icon02 from "../../assets/home/aboutus_icon02.png";
import aboutus_icon03 from "../../assets/home/aboutus_icon03.png";
import aboutus_icon04 from "../../assets/home/aboutus_icon04.png";

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
// const showCode = ref<boolean>(true)
// const activeName = ref("")
// const onClick = () => {
//   showCode.value = !showCode.value
// }
const active = ref("");
const active1 = ref("");
const active2 = ref("");
const active3 = ref("");

const yr = () => {
  active.value = "background:#fff";
};
const yr1 = () => {
  active1.value = "background:#fff";
};
const yr2 = () => {
  active2.value = "background:#fff";
};
const yr3 = () => {
  active3.value = "background:#fff";
};
const yc = () => {
  active.value = "";
};
const yc1 = () => {
  active1.value = "";
};
const yc2 = () => {
  active2.value = "";
};
const yc3 = () => {
  active3.value = "";
};
</script>

<style scoped lang="scss">
.about-page {
  background: #1d262f;
  position: relative;
  overflow: hidden;
  min-height: calc(100vh - 0px);

  .top-part {
    width: 100%;
    height: 620px;
    position: relative;
    display: flex;
    max-width: 1440px;
    margin: auto;
    // background: #1c242c;
    // background-image: url("../../assets/home/banner_bgk_lightgreen.png");
    // background-repeat: no-repeat;
    // background-position: 100% bottom;
    // background-size: 100%;

    .back-center {
      position: absolute;
      bottom: 0;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    .back-left {
      position: absolute;
      bottom: 0;
      width: 420px;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    .back-right {
      position: absolute;
      width: 420px;
      right: 0;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    .top-part-box {
      margin: auto;
      text-align: center;
      margin-top: 193px;
      @media (max-width: 985px) {
        margin: auto !important;
      }
      .top-part-img {
        width: 378px;
      }
      .top-part-content {
        width: 50%;
        margin: auto;
        font-size: 16px;
        color: #ffffff;
        margin-top: 30px;
        line-height: 20px;
      }
    }
  }
  .center-part {
    height: 100%;
    .part-box {
      height: 440px;
      padding: 4% 8% 10% 8%;
      border-top: 1px solid #2f3f4e;
      border-left: 0px;
      border-right: 0px;
      position: relative;

      &:hover {
        .part-content {
          color: #1d2622;
          line-height: 19px;
          font-weight: 600;
          width: 90%;
        }
        .part-content-forth {
          color: #1d2622;
          line-height: 19px;
          font-weight: 600;
        }
      }
      .part-img {
        width: 53px;
        display: flex;
        float: left;
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
      .part-title {
        float: left;
        margin: 10px 0;
        margin-left: 15px;
        font-size: 40px;
        color: #01c19a;
        font-weight: 600;
      }
      .part-content {
        font-size: 16px;
        color: #ffffff;
        line-height: 19px;
        margin-top: 70px;
      }
      .part-content-forth {
        font-size: 16px;
        color: #ffffff;
        line-height: 19px;
        margin-top: 15px;
      }
      .part-msg {
        margin-top: 60px;
      }
    }
    .left-box {
      border-left: 1px solid #2f3f4e;
      @media (max-width: 985px) {
        border-left: none;
      }
    }
  }
}
.part {
  // padding-bottom: 46px ;
  max-width: 1290px;
  margin: 0 auto;
}

@media (min-width: 985px) and (max-width: 1400px) {
  .part {
    max-width: 940px;
  }

  .part-title {
    width: 80% !important;
    font-size: 27px !important;
    margin-top: 14px !important;
    // margin: 0 !important;
  }

  .top-part-content {
    width: 60% !important;
  }
  .back-left {
    bottom: 48px !important;
    width: 400px !important;
    left: -70px !important;
  }
  .back-right {
    bottom: 48px !important;
    right: -32px !important;
    width: 400px !important;
  }
}
@media (min-width: 1400px) {
  .part-box {
    height: 580px !important;
  }
  .part-msg {
    margin-top: 160px !important;
  }
  .part-content {
    margin-top: 70px !important;
  }
  .top-part-content {
    width: 60% !important;
  }
  .back-right {
    top: 80px !important;
  }
}
@media (max-width: 985px) {
  .about-page .top-part {
    padding: 0px;
  }
  .about-page .top-part .hand_left {
    top: 80%;
  }
  .about-page .part-box {
    height: 310px !important;
    text-align: center;
  }
  .part-title {
    padding-top: 5px !important;
    font-size: 20px !important;
    float: none !important;
    margin: 0 !important;
  }
  .top-part {
    height: 500px !important;
  }
  .top-part-box {
    padding: 0 2%;
    position: absolute !important;
    top: 115px !important;
  }

  .top-part-content {
    width: 88% !important;
    font-size: 14px !important;
  }
  .top-part-img {
    & {
      width: 260px !important;
    }
  }

  .part-img {
    width: 30px !important;
    position: absolute;
    left: 45%;
    top: 12%;
  }
  .part-content {
    // float: left;
    padding-top: 33px;
    font-size: 14px !important;
    margin: 0 !important;
  }
  .part-content-forth {
    font-size: 14px !important;
  }

  .part {
    max-width: none;
  }
  .center-part {
    height: 350px;
  }
  .back-left {
    width: 120px !important;
    bottom: 20px !important;
  }
  .back-right {
    width: 120px !important;
    top: 140px !important;
  }
}
</style>
