<template>
  <div class="wallet-page">
    <Header v-if="uiStore.showHeaderFooter" />
    <div class="center-part">
      <el-scrollbar>
        <div class="scrollbar-flex-content">
          
          <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleTabClick">
            <el-tab-pane
              :label="t('messages.wallet.Overview')"
              name="first"
              :lazy="true"
            />

            <!-- <el-tab-pane
              :label="t('messages.wallet.Trading')"
              name="second"
              :lazy="true"
            />

            <el-tab-pane
              :label="t('messages.wallet.Earning')"
              name="third"
              :lazy="true"
            />

            <el-tab-pane
              :label="t('messages.wallet.History')"
              name="fourth"
              :lazy="true"
            />

            <el-tab-pane
              :label="t('messages.wallet.Account')"
              name="fifth"
              :lazy="true"
            /> -->
          </el-tabs>
        </div>
      </el-scrollbar>
      <div class="min-height" v-if="activeName === 'first'">
        <!-- <WithdrawCrypto /> -->
        <router-view></router-view>
      </div>
      <!-- <div class="min-height" v-if="activeName === 'second'">
        <Trading />
      </div>
      <div class="min-height" v-if="activeName === 'third'"></div>
      <div class="min-height" v-if="activeName === 'fourth'">
        <History />
      </div>
      <div class="min-height" v-if="activeName === 'fifth'">
        <AccountStatement />
      </div> -->
    </div> 
    <Footer v-if="uiStore.showHeaderFooter && windowWidth > 769" />
    <FooterMobile v-if="uiStore.showHeaderFooter && windowWidth <= 769" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeMount, provide, watch } from "vue";
import { useUIStore } from '../../store/ui'
import { windowWidth } from "../../components/WindowWidth";
import Header from "../../layout/Header/Header.vue";
import Footer from "../../layout/Footer/Footer.vue";
import FooterMobile from "../../layout/Footer/FooterMobile.vue";
import DepositCrypto from "./layout/OverView/DepositCrypto.vue";
import DepositFiat from "./layout/OverView/DepositFiat.vue";
import WithdrawCrypto from "./layout/OverView/WithdrawCrypto.vue";
import WithdrawFiat from "./layout/OverView/WithdrawFiat.vue";

import { StarFilled, Search } from "@element-plus/icons-vue";
import { getMyAssets } from "../../api/wallet";
import { getTransactions } from "../../api/transactions";
import type { TabsPaneContext } from "element-plus";
import { useRoute, useRouter } from "vue-router";

import { useI18n } from "vue-i18n";
const { t } = useI18n();
const uiStore = useUIStore()

const route = useRoute();
const router = useRouter();

const activeName = ref<any>("first");

watch(route, () => {
  activeName.value = route.meta.tab;
});

onBeforeMount(() => {
  const tab = route.meta.tab;

  if (tab) {
    activeName.value = tab;
  }
});
// const handleClick = (tab: TabsPaneContext, event: Event) => {
//   console.log(tab, event);
// };
// ==== 主页请求数据 共享状态
interface AssetsData {
  currency: string;
  balance: string;
  alphabeticCode: string;
  caption: string;
  accountNumber: string;
  accountId: string;
}
const assetsData = ref<AssetsData[]>([]);
onMounted(() => {
  getMyAssets().then((res) => {
    console.log(res.data.data);
    if (res.data.data) {
      assetsData.value = res.data.data.map((v: any) => {
        return {
          currency: v.currency.name,
          balance: v.statement.availableBalance,
          alphabeticCode: v.currency.alphabeticCode,
          caption: v.caption,
          accountNumber: v.accountNumber,
          accountId: v.accountId,
        };
      });
    }
  });
});
provide("assetsData", assetsData);
const transactions = ref<any>([]);
onMounted(() => {
  getTransactions().then((res) => {
    console.log(res.data);
    transactions.value = res.data.data;
  });
});
provide("transactions", transactions);
const handleTabClick = (tab:any) => {
  switch (tab.name) {
    case 'first':
      router.push({ name: 'transaction/DepositCrypto' });
      break;
    case 'second':
      router.push({ name: 'transaction/DepositFiat' });
      break;
    case 'third':
      router.push({ name: 'transaction/WithdrawFiat' });
      break;
    case 'fourth':
      router.push({ name: 'transaction/WithdrawCrypto' });
      break;
    default:
      break;
  }
};
</script>

<style scoped lang="scss">
.center-part {
  max-width: 1290px;
  min-height: calc(100vh - 394px);
  margin: auto;
  padding: 21px 0 100px 0;
  position: relative;
  @media (max-width: 1440px) {
    max-width: 940px;
  }
  @media (max-width: 992px) {
    padding: 21px 20px 50px 20px;
  }
  .scrollbar-flex-content {
    @media (max-width: 600px) {
      display: flex;
    }
  }
}

:deep() {
  .el-scrollbar__bar.is-horizontal > div {
    height: 0; //iPhone滑动样式高度
  }
  .el-tabs__item {
    color: #9b9b9b !important;
    font-size: 16px;
    line-height: 19px;
  }
  .el-table__inner-wrapper {
    margin-top: 10px;
    margin-left: -10px;
  }
  .el-table__header {
    font-size: 14px;
    line-height: 16px;
    color: #878787;
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
  .el-tabs__nav-wrap::after {
    height: 1px;
  }

  .el-radio-button {
    &:hover span {
      color: #01c19a;
    }
    .el-radio-button__inner {
      border-radius: 6px !important;
      border: none !important;
      box-shadow: none;
      font-size: 14px;
      line-height: 17px;
    }
    --el-radio-button-checked-bg-color: #f1f1f1;
    --el-radio-button-checked-text-color: #01c19a !important;
  }
  .el-table .descending .sort-caret.descending {
    border-top-color: #01c19a;
  }
  .el-table .ascending .sort-caret.ascending {
    border-bottom-color: #01c19a;
  }
  .el-radio-button__inner {
    color: #9b9b9b;
  }
}

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.demo-tabs .custom-tabs-label {
  :deep(.el-icon) {
    vertical-align: middle;
    font-size: 25px;
    color: #dfdfdf;
  }
}
.demo-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}
:deep(.el-table__inner-wrapper::before) {
  height: 0px;
}
:deep(.el-table__row) {
  height: 70px;
}
:deep(.el-tabs__nav-scroll){
  border-bottom: 1px solid #EBEBEB !important;
}
</style>
