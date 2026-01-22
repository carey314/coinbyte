<template>
  <div class="learn-center-list">
    <Header v-if="uiStore.showHeaderFooter" />
    <div class="center-part" v-if="windowWidth > 1050">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane :label="t('messages.learnList.first_label')" name="first">
          <div class="min-height">
            <ListCenter :index="0" :toGetBlogs="toGetBlogs"/>

          </div>
        </el-tab-pane>
        <el-tab-pane :label="t('messages.learnList.second_label')" name="second">
          <div class="min-height">
            <div class="min-height">
              <ListCenter :index="1" :toGetBlogs="toGetBlogs"/>

          </div>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="t('messages.learnList.third_label')" name="third">
          <div class="min-height">
            <div class="min-height">
              <ListCenter :index="2" :toGetBlogs="toGetBlogs"/>
            <!-- <el-row :gutter="20">
              <el-col :span="6" v-for="(item, index) in filterBlogs(2)" :key="index">
                <a class="to-article"  :href="'/centerContent/' + item.id">
                    <div class="content clearfloat">
                      <div class="image">
                        <img :src="item.icon" />
                      </div>
                      <div class="message">{{ item.subDesc || "----" }}</div>
                    </div>
                  </a>
                </el-col>
            </el-row> -->
            <!-- <div style="display: flex; flex-wrap: wrap;">
              
            </div> -->
          </div>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="t('messages.learnList.forth_label')" name="fourth">
          <div class="min-height"><div class="min-height">
            <ListCenter :index="3" :toGetBlogs="toGetBlogs"/>
          </div></div>
        </el-tab-pane>
        <el-tab-pane :label="t('messages.learnList.next_label')" name="next">
          <div class="min-height"><div class="min-height">
            <ListCenter :index="5" :toGetBlogs="toGetBlogs"/>
          </div></div>
        </el-tab-pane>
        <el-tab-pane :label="t('messages.learnList.fifth_label')" name="fifth">
          <div class="min-height"><div class="min-height">
            <ListCenter :index="4" :toGetBlogs="toGetBlogs"/>
          </div></div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="center-part" v-if="windowWidth <= 1050">
      <el-scrollbar>
        <div class="scrollbar-flex-content">
          <el-tabs
            v-model="activeName"
            class="demo-tabs"
            @tab-click="handleClick"
          >
            <el-tab-pane :label="t('messages.learnList.first_label')" name="first">
              <ListCenter :index="0" :toGetBlogs="toGetBlogs"/>
            </el-tab-pane>
            <el-tab-pane :label="t('messages.learnList.second_label')" name="second">
              <ListCenter :index="1" :toGetBlogs="toGetBlogs"/>
            </el-tab-pane>
            <el-tab-pane :label="t('messages.learnList.third_label')" name="third">
              <ListCenter :index="2" :toGetBlogs="toGetBlogs"/>
            </el-tab-pane>
            <el-tab-pane :label="t('messages.learnList.forth_label')" name="fourth">
              <ListCenter :index="3" :toGetBlogs="toGetBlogs"/>
            </el-tab-pane>
            <el-tab-pane :label="t('messages.learnList.new_label')" name="new">
              <ListCenter :index="5" :toGetBlogs="toGetBlogs"/>
            </el-tab-pane>
            <el-tab-pane :label="t('messages.learnList.fifth_label')" name="fifth">
              <ListCenter :index="4" :toGetBlogs="toGetBlogs"/>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-scrollbar>
      <div class="min-height" v-if="activeName === 'first'">
        <!-- <ListCenter /> -->
      </div>
    </div>
    <Footer v-if="uiStore.showHeaderFooter && windowWidth > 769" />
    <FooterMobile v-if="uiStore.showHeaderFooter && windowWidth <= 769" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onUnmounted, onMounted } from "vue";
import { useUIStore } from '../../../store/ui'
import type { TabsPaneContext } from "element-plus";
import Header from "../../../layout/Header/Header.vue";
import Footer from "../../../layout/Footer/Footer.vue";
import FooterMobile from "../../../layout/Footer/FooterMobile.vue";
import ListCenter from "../component/ListCenter.vue";
import { useI18n } from 'vue-i18n'
import { Blog, GetBlogs } from "../../../models/blog";
import { getBlogs } from "../../../api/blog";

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
const activeName = ref("first");

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};


const blogs = ref<Blog[]>([]);

onMounted(async () => {
  try {
    const res: any = await getBlogs();
    const data: Blog[] = res.data.content;
    blogs.value = data;
    blogs.value?.forEach((item: Blog) => {
    item.icon = item.icon.replace('http://adminapi.coinbyte.com.au:88', '')
    item.banner = item.banner?.replace('http://adminapi.coinbyte.com.au:88', '')
  })
    console.log(blogs.value)
  } catch(e) {
    console.log(e)
  }
})

const filterBlogs = (index: number) => {
  return blogs.value.filter((v: Blog) => v.typeOne === index);
}

const toGetBlogs = async (
  getConfig: GetBlogs
) => {
  try {
    const res: any = await getBlogs(getConfig);
    const content: Blog[] = res.data.content;
    content.forEach((item: Blog) => {
      item.icon = item.icon.replace('http://adminapi.coinbyte.com.au:88', '')
      item.banner = item.banner?.replace('http://adminapi.coinbyte.com.au:88', '')
    })
    const totalElements: number = res.data.totalElements;
    return {
      content,
      totalElements
    }
  } catch(e) {
    console.log(e)
  }
}

function navigateToArticle(id: number) {
  window.parent.postMessage({ type: 'navigate', path: `/centerContent/${id}` }, '*');
}
</script>

<style scoped lang="scss">
.scrollbar-flex-content {
  display: flex;
}

.center-part {
  max-width: 1290px;
  min-height: 985px;
  margin: auto;
  padding: 45px 0 135px 0;
  position: relative;
  @media (max-width: 1440px) {
    & {
      padding: 25px 30px 135px 30px;
    }
  }
}
.min-height {
  min-height: 50px;
  @media (max-width: 769px) {
    & {
      margin-top: -20px;

    }
  }
}

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.demo-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}
:deep() {
  .el-tabs__item {
    color: #9b9b9b !important;
    font-size: 16px;
    line-height: 19px;
  }
  .el-tabs__item is-top {
    --el-menu-active-color: #01c19a;
    font-size: 16px;
    line-height: 19px;
  }
  .el-tabs__item.is-active {
    color: #01c19a !important;
    font-weight: 500;
  }
  .el-tabs__active-bar {
    background-color: #01c19a;
    height: 4px;
  }
  .el-scrollbar__bar.is-horizontal>div{
    height: 0; //iPhone滑动样式高度
  }
}

.content {
    margin-top: 23px;
    .image {
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    .message {
      margin-top: 9px;
      color: #000000;
      line-height: 20px;
      font-weight: 500;
      @media (max-width: 769px) {
        text-align: center;
        font-weight: 400;
      }
    }
  }
  .to-article {
  text-decoration: none;
  color: inherit;
  font-size: inherit;
  font-family: inherit;
}
</style>
