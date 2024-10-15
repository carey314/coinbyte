<template>
  <div class="wallet-page">
    <Header v-if="uiStore.showHeaderFooter" />
    <div class="center-part">
      <el-scrollbar>
        <div class="scrollbar-flex-content">
          
          <el-tabs v-model="activeName" class="demo-tabs">
            <el-tab-pane
              :label="t('messages.wallet.Overview')"
              name="first"
              :lazy="true" 
            >
            <template #label>  
              <div class="click-success" @click="changeTab('')">
                {{ t('messages.wallet.Overview') }}
              </div>
            </template>
          </el-tab-pane>

            <el-tab-pane
              :label="t('messages.wallet.Trading')"
              name="second"
              :lazy="true"
            >
            <template #label>  
              <div class="click-success" @click="changeTab('trading')">
                {{ t('messages.wallet.Trading') }}
              </div>
            </template>
          </el-tab-pane>

            <!-- <el-tab-pane
              :label="t('messages.wallet.Earning')"
              name="third"
              :lazy="true"
            /> -->

            <el-tab-pane
              :label="t('messages.wallet.History')"
              name="fourth"
              :lazy="true"
            >
            <template #label>  
              <div class="click-success" @click="changeTab('')">
                {{ t('messages.wallet.History') }}
              </div>
            </template>
          </el-tab-pane>

            <el-tab-pane
              :label="t('messages.wallet.Account')"
              name="fifth"
              :lazy="true"
            >
            <template #label>  
              <div class="click-success" @click="changeTab('')">
                {{ t('messages.wallet.Account') }}
              </div>
            </template>
          </el-tab-pane>
          </el-tabs>
        </div>
      </el-scrollbar>
      <div class="min-height" v-if="activeName === 'first'">
        <!-- <DepositCrypto v-if="isTransaction" /> -->
       
        <div v-if="isTransaction">
          <router-view></router-view>
        </div>
        <OverView v-else/>
        <!-- <component :is="currentTab" /> -->
      </div>
      <div class="min-height" v-if="activeName === 'second'">
        <Trading />
      </div>
      <div class="min-height" v-if="activeName === 'third'"></div>
      <div class="min-height" v-if="activeName === 'fourth'">
        <History />
      </div>
      <div class="min-height" v-if="activeName === 'fifth'">
        <AccountStatement />
      </div>
    </div>

    <Footer v-if="uiStore.showHeaderFooter && windowWidth > 769" />
    <FooterMobile v-if="uiStore.showHeaderFooter && windowWidth <= 769" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeMount, provide, watch, computed, defineExpose, watchEffect } from "vue";
import { useUIStore } from '../../store/ui'
import { windowWidth } from "../../components/WindowWidth";
import Header from "../../layout/Header/Header.vue";
import Footer from "../../layout/Footer/Footer.vue";
import FooterMobile from "../../layout/Footer/FooterMobile.vue";
import OverView from "./layout/OverView/OverView.vue";
import Trading from "./layout/Trading/Trading.vue";
import History from "./layout/History/History.vue";
import AccountStatement from "./layout/AccountStatement/AccountStatement.vue";

import DepositCrypto from "../transaction/layout/OverView/DepositCrypto.vue";
import DepositFiat from "../transaction/layout/OverView/DepositFiat.vue";
import WithdrawCrypto from "../transaction/layout/OverView/WithdrawCrypto.vue";
import WithdrawFiat from "../transaction/layout/OverView/WithdrawFiat.vue";

import { StarFilled, Search } from "@element-plus/icons-vue";
import { getMyAssets } from "../../api/wallet";
import { getTransactions } from "../../api/transactions";
import type { TabsPaneContext } from "element-plus";
import { useRoute, useRouter,RouteLocationNormalizedLoaded } from "vue-router";

import { useI18n } from "vue-i18n";
const { t } = useI18n();
const uiStore = useUIStore()

const route = useRoute();
const router = useRouter();

const isTransaction = ref(false);

const activeName = ref<any>("first");
  const currentTab = computed(() => {
  const tab = route.params.tab
  const childTab = route.params.childTab

  if (tab === 'first') {
    return 'OverView'
  } else if (tab === 'second') {
    return 'Trading'
  } else if (tab === 'third') {
    return 'Earning'
  } else if (tab === 'fourth') {
    if (childTab === 'first') {
      return 'DepositWithdraw'
    } else if (childTab === 'second') {
      return 'BuySell'
    } else if (childTab === 'third') {
      return 'Convert'
    } else if (childTab === 'fourth') {
      return 'Spot'
    } else {
      return 'DepositWithdraw'
    }
  } else if (tab === 'fifth') {
    return 'AccountStatement'
  } else {
    return 'OverView'
  }
})

defineExpose({ currentTab })

watch(route, () => {
  const transaction = route.meta.isTransaction
  if(transaction) {
    isTransaction.value = true;
  }
  activeName.value = route.meta.tab;
});

onBeforeMount(() => {
  const tab = route.meta.tab;
  const transaction = route.meta.isTransaction
  if(transaction) {
    isTransaction.value = true;
  } else {
    isTransaction.value = false;
  }
  if (tab) {
    activeName.value = tab;
  }
});

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

const changeTab = (path: string) => {
  const url = path ? '/wallet/' + path : '/wallet'
  router.push(url)
  isTransaction.value = false
}
</script>

<style scoped lang="scss">
.center-part {
  max-width: 1290px; 
  min-height: calc(100vh - 394px);
  margin: auto;
  padding: 21px 0 141px 0;
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
    height: 1px solid #EBEBEB ;
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
.click-success{
  height: 100% !important;
}
</style>
