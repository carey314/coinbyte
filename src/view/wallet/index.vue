<template>
  <div class="wallet-page">
    <Header></Header>
    <div class="center-part">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="Overview" name="first">
            <OverView />
        </el-tab-pane>

        <el-tab-pane label="Trading" name="second"> 
          <Trading />  
        </el-tab-pane>

        <el-tab-pane label="Earning" name="third">Earning</el-tab-pane>

        <el-tab-pane label="History" name="fourth">
          <History />
        </el-tab-pane>

        <el-tab-pane label="Account Statement" name="fifth">
          <AccountStatement />
        </el-tab-pane
        >
      </el-tabs>
    </div>

    <Footer v-if="windowWidth > 769" />
    <FooterMobile v-if="windowWidth <= 769"></FooterMobile>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onUnmounted, onMounted, computed,provide } from "vue";
import Header from "../../layout/Header/Header.vue";
import Footer from "../../layout/Footer/Footer.vue";
import FooterMobile from "../../layout/Footer/FooterMobile.vue";
import OverView from "./layout/OverView/OverView.vue";
import Trading from "./layout/Trading/Trading.vue";
import History from "./layout/History/History.vue";
import AccountStatement from "./layout/AccountStatement/AccountStatement.vue";
import { StarFilled, Search } from "@element-plus/icons-vue";
import {getMyAssets} from '../../api/wallet';
import {getTransactions} from '../../api/transactions';
import type { TabsPaneContext } from "element-plus";

// import no_found from "../../../assets/home/no_found.png";

// import BTC from "../../assets/home/part01_BTC.png";


const activeName = ref("first");
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
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
// ==== ?????????????????? ????????????
interface AssetsData {
  currency: string;
  balance: string;
  alphabeticCode : string;
  caption : string;
  accountNumber : string;
  accountId : string;
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
          alphabeticCode : v.currency.alphabeticCode,
          caption : v.caption,
          accountNumber : v.accountNumber,
          accountId : v.accountId
        };
      });
    };
  });
});
provide("assetsData",assetsData);
const transactions = ref<any>([]);
onMounted(() => {
  getTransactions().then(res => {
    console.log(res.data);
    transactions.value = res.data.data;
  })
});
provide("transactions",transactions);

</script>

<style scoped lang="scss">
.scrollbar-flex-content {
  display: flex;
}
.center-part {
  max-width: 1290px;
  min-height: 985px;
  margin: auto;
  padding: 21px 0 141px 0;
  position: relative;
  @media (max-width: 1440px) {
    padding: 21px 20px 135px 20px;
  }
}

:deep() {

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
  .el-tabs__nav-wrap::after{
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
</style>
