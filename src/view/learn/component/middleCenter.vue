<template>
  <div>
    <!-- Desktop Layout -->
    <div class="center-box" v-if="!isMobile">
      <div 
        v-for="(section, sectionIndex) in sections" 
        :key="sectionIndex"
        class="center-part max1290" 
        v-show="filterBlogs(sectionIndex).length > 0"
      >
        <div class="title-box clearfloat">
          <div class="title">
            <span>{{ $t(section.titleKey) }}</span>{{ $t(section.subtitleKey) }}
          </div>
          <div class="more">
            <a href="javascript:void(0)" class="learn-more-link" @click="navigateToLearnList">
              {{ $t("messages.learnMiddle.learn_more") }} &gt;
            </a>
          </div>
        </div>
        <el-row :gutter="20">
          <el-col
            :span="6"
            v-for="(item, index) in filterBlogs(sectionIndex)"
            :key="index"
          >
            <a href="javascript:void(0)" class="to-article" @click="navigateToArticle(item.id)">
              <div class="content clearfloat">
                <div class="image">
                  <img :src="item.icon" :alt="item.title" />
                </div>
                <div class="message">{{ item.title || "----" }}</div>
              </div>
            </a>
          </el-col>
        </el-row>
      </div>
    </div>

    <!-- Mobile Layout -->
    <div class="center-box max1290" v-else>
      <div 
        v-for="(section, sectionIndex) in sections" 
        :key="sectionIndex"
        class="center-part" 
        v-show="filterBlogs(sectionIndex).length > 0"
      >
        <div class="title-box clearfloat">
          <div class="title">
            <span>{{ $t(section.titleKey) }}</span>{{ $t(section.subtitleKey) }}
          </div>
          <div class="more">
            <a href="javascript:void(0)" class="learn-more-link" @click="navigateToLearnList">
              {{ $t("messages.learnMiddle.learn_more") }} &gt;
            </a>
          </div>
        </div>
        <el-row>
          <el-col
            :span="24"
            class="mobile-col"
            v-for="(item, index) in filterBlogs(sectionIndex)"
            :key="index"
          >
            <a href="javascript:void(0)" class="to-article" @click="navigateToArticle(item.id)">
              <div class="content clearfloat">
                <div class="image">
                  <img :src="item.icon" :alt="item.title" />
                </div>
                <div class="message">{{ item.title }}</div>
              </div>
            </a>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useWindowSize } from "../../../hooks/useWindowSize";
import type { Blog } from "../../../models/blog";

interface Section {
  titleKey: string;
  subtitleKey: string;
}

interface Props {
  filterBlogs: (id: number) => Blog[];
}

const props = defineProps<Props>();

const { width: windowWidth } = useWindowSize();

// Use computed for better performance
const isMobile = computed(() => windowWidth.value <= 769);

const sections: any = [
  {
    titleKey: "messages.learnMiddle.Beginners",
    subtitleKey: "messages.learnMiddle.Tutorial"
  },
  {
    titleKey: "messages.learnMiddle.Trading", 
    subtitleKey: "messages.learnMiddle.Ideas"
  },
  {
    titleKey: "messages.learnMiddle.Industry",
    subtitleKey: "messages.learnMiddle.Analysis"
  }
] as const;

function navigateToLearnList() {
  window.parent.postMessage({ type: 'navigate', path: '/learnList' }, '*');
}
function navigateToArticle(id: number) {
  window.parent.postMessage({ type: 'navigate', path: `/centerContent/${id}` }, '*');
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

.max1290 {
  max-width: 1290px;
  margin: 0 auto;
}

.center-box {
  padding: 0 100px;
  width: auto;

  @media (max-width: 769px) {
    padding: 8px 20px;
  }

  .title-box {
    margin-top: 50px;
    
    .title {
      font-size: $fontSizeMedPro;
      line-height: 34px;
      font-weight: 600;
      float: left;
      
      span {
        color: $main-color;
      }
      
      @media (max-width: 769px) {
        float: none;
        text-align: center;
      }
    }
    
    .more {
      font-size: $fontSizeDef;
      color: #878787;
      line-height: 26px;
      float: right;
      
      @media (max-width: 769px) {
        margin-top: 5px;
        float: none;
        text-align: center;
      }
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
}

.to-article {
  text-decoration: none;
  color: inherit;
  font-size: inherit;
  font-family: inherit;
}

.learn-more-link {
  color: #878787;
  text-decoration: none;
}

.mobile-col {
  margin: auto;
}


</style>
