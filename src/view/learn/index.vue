<template>
  <div class="learn-center">
    <Header v-if="uiStore.showHeaderFooter" />
    <topCenter />
    <middleCenter :filterBlogs="filterBlogs" />
    <bottomCenter :filterBlogsBottom="filterBlogsBottom" />
    <Footer v-if="uiStore.showHeaderFooter && windowWidth > 769" />
    <FooterMobile v-if="uiStore.showHeaderFooter && windowWidth <= 769" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onUnmounted, onMounted } from "vue";
import { useUIStore } from "../../store/ui";
import Header from "../../layout/Header/Header.vue";
import Footer from "../../layout/Footer/Footer.vue";
import FooterMobile from "../../layout/Footer/FooterMobile.vue";
import topCenter from "./component/topCenter.vue";
import middleCenter from "./component/middleCenter.vue";
import bottomCenter from "./component/bottomCenter.vue";

import { getBlogs } from "../../api/blog";
import { Blog } from "../../models/blog";

import { GetBlogs } from "../../models/blog";
import { getCurrentLocalePrefix } from "../../utils/localeRouter";
import { useI18n } from "vue-i18n";

const uiStore = useUIStore();
const windowWidth = ref(window.document.body.offsetWidth);
const { t, locale } = useI18n();
const localStorageLanguage = ref("");

onMounted(() => {
  window.addEventListener("resize", resetWidth);
  localStorageLanguage.value =
    localStorage.getItem("selectedLanguage") || "Not set";
});
onUnmounted(() => {
  window.removeEventListener("resize", resetWidth);
});
function resetWidth() {
  windowWidth.value = window.document.body.offsetWidth;
}

const blogs = ref<Blog[]>([]);

onMounted(async () => {
  try {
    const res: any = await getBlogs();
    const data: Blog[] = res.data.content;
    blogs.value = data;
    blogs.value.forEach((item: Blog) => {
      item.icon = item.icon.replace("http://adminapi.coinbyte.com.au:88", "");
      item.banner = item.banner?.replace("http://adminapi.coinbyte.com.au:88", "");
    });
    console.log(blogs.value);
  } catch (e) {
    console.log(e);
  }
});

const filterBlogs = (index: number) => {
  return blogs.value.filter((v: Blog) => v.typeOne === index).slice(0, 4);
};

const filterBlogsBottom = (index: number) => {
  blogs.value.forEach((item: Blog) => {
    item.icon = item.icon.replace("http://adminapi.coinbyte.com.au:88", "");
    item.banner = item.banner?.replace("http://adminapi.coinbyte.com.au:88", "");
  });
  return blogs.value.filter((v: Blog) => v.typeOne === index).slice(0, 6);
};

const switchLanguage = (lang: string) => {
  locale.value = lang;
  localStorageLanguage.value = lang;
};
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
.max1290 {
  max-width: 1290px;
  margin: 0 auto;
  @media (max-width: 1440px) {
    max-width: 940px;
  }
}
.learn-center {
  font-family: HarmonyOS Sans, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
}
</style>
