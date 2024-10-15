<template>
  <div class="contact-page">
    <Header v-if="uiStore.showHeaderFooter" />
    <div class="top-part part">
      <!-- <img :src="contact_img" /> -->
      <div class="top-part-box">
        <div class="top-part-title">{{ $t('messages.contact.contact_contact') }}</div>
        <div class="top-part-content">{{ $t('messages.contact.contact_enjoy') }}</div>
      </div>
      <div class="hand_left">
        <img src="../../assets/home/contactus_handleft.png" />
      </div>
      <div class="hand_right">
        <img src="../../assets/home/contactus_handright.png" />
      </div>
    </div>

    <div class="center-part part top-center">
      <el-row>
        <el-col :span="12">
          <div class="part-box left-box">
            <div class="part-title">{{ $t('messages.contact.contact_firstTitle') }}</div>
            <div class="part-content">
              {{ $t('messages.contact.contact_firstContent') }}
            </div>
            <div class="part-img">
              <img :src="contactus_icon01" />
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="part-box">
            <div class="part-title">{{ $t('messages.contact.contact_secondTitle') }}</div>
            <div class="part-content">
              {{ $t('messages.contact.contact_secondContent') }}
            </div>
            <div class="part-img">
              <img :src="contactus_icon02" />
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="center-part part" style="padding-top:-20px">
      <el-row>
        <el-col :span="12">
          <div class="part-box follow" style="border:none;">
            <div class="part-title">{{ $t('messages.contact.contact_thirdTitle') }}</div>
            <div class="bottom-part-icon">
              <img src="../../assets/home/downbar_icon01.svg" alt="" />
              <img src="../../assets/home/downbar_icon02.svg" alt="" />
              <img src="../../assets/home/downbar_icon03.svg" alt="" />
              <img src="../../assets/home/downbar_icon04.svg" alt="" />
              <img src="../../assets/home/downbar_icon05.svg" alt="" />
              <img src="../../assets/home/downbar_icon06.svg" alt="" />
              <img src="../../assets/home/downbar_icon07.svg" alt="" />
              <img src="../../assets/home/downbar_icon08.svg" alt="" />
              <img src="../../assets/home/downbar_icon09.svg" alt="" />
              <img src="../../assets/home/downbar_icon10.png" alt="" />
            </div>
          </div>
        </el-col>
        <el-col :span="4" :offset="8">
          <div class="part-box" style="border:none">
            <div class="part-img">
              <img :src="contactus_icon03" />
            </div>
          </div>
        </el-col>
      </el-row>
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
//img
import contact_img from "../../assets/home/contact.png";
import contactus_icon01 from "../../assets/home/contactus_icon01.png";
import contactus_icon02 from "../../assets/home/contactus_icon02.png";
import contactus_icon03 from "../../assets/home/contactus_icon03.png";
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
</script>

<style scoped lang="scss">
.contact-page {
  background: #1d262f;
  position: relative;
  .top-part {
    width: 100%;
    height: 440px;
    position: relative;
    display: flex;
    .top-part-box {
      margin: auto;
      text-align: center;
      .top-part-title {
        font-size: 55px;
        color: #01c19a;
        font-weight: 600;
      }
      .top-part-content {
        font-size: 16px;
        color: #ffffff;
        margin-top: 30px;
      }
    }
    .hand_left {
      width: 36%;
      //height: 18%;
      position: absolute;
      top: 40%;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    .hand_right {
      width: 36%;
      //height: 18%;
      position: absolute;
      top: 5%;
      right: 0;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
.top-center{
  padding-top: 46px;

}
  .part-box {
    height: 340px;
    padding: 14% 8% 10% 8%;
    border: 1px solid #2f3f4e;
    border-left: 0px;
    border-right: 0px;
    
    position: relative;
    .part-title {
      font-size: 40px;
      color: #01c19a;
      font-weight: 600;
    }
    .part-content {
      font-size: 16px;
      color: #ffffff;
      margin-top: 30px;
      line-height: 19px;
    }
  }
  .left-box {
    border-right: 1px solid #2f3f4e;
  }
  .bottom-part-icon {
      width: 100%;
      margin-top: 20px;
      img {
        cursor: pointer;
        width: 1rem;
        margin: 8px 12px 0 0;
        height: 1rem;
      }
    }
  .bottom-part {
    padding: 7% 4% 5% 3%;
    border-left: 0px;
    border-right: 0px;
    position: relative;
    .bottom-part-title {
      font-size: 40px;
      color: #01c19a;
      font-weight: 600;
    }
    .bottom-part-icon {
      width: 100%;
      margin-top: 20px;
      img {
        cursor: pointer;
        width: 1rem;
        margin: 8px 12px 0 0;
        height: 1rem;
      }
    }
  }
  .follow{
    @media(min-width:769px)  {
      // margin-left: -25px;
    }
  }
  .part-img {
    position: absolute;
    //right: 2%;
    right: 20px;
    bottom: 4%;
    width: 120px;
    //height: 35%;
    z-index: 0;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
.part {
  max-width: 1290px;
  margin: 0 auto;
}

@media (min-width: 985px) and (max-width: 1400px) {
  .part {
    max-width: 940px;
  }
  .hand_left {
    width: 36%;
    //height: 18%;
    position: absolute;
    top: 55% !important;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
@media (max-width: 985px) {
  .contact-page .top-part {
    padding: 0px;
  }
  .contact-page .top-part .hand_left {
    top: 80%;
  }
  .contact-page .part-box {
    height: 300px;
  }
  .part-box {
    .part-title {
      font-size: 28px !important;
    }
  }
  .bottom-part-title {
     line-height: 50px;
  }
  .part-img {
    right: 10px !important;
    width: 60px !important;
  }
  .part {
    max-width: none;
  }
}
</style>
