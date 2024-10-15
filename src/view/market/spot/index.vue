<template>
  <div class="allCrypto-page">
    <Header v-if="uiStore.showHeaderFooter" />
    <div class="center-part">
      <div class="search-input" v-if="windowWidth > 769">
        <el-input
          v-model="search"
          class="w-50 m-2"
          size="large"
          placeholder="Search"
          :prefix-icon="Search"
        />
      </div>

      <el-scrollbar>
        <div class="scrollbar-flex-content">
          <el-tabs
            v-model="activeName"
            class="demo-tabs"
          >
            <el-tab-pane name="first" @click="handleTabClick('/market-favorite')">
              <template #label>
                <router-link
                  to="/market-favorite"
                  style="
                    text-decoration: none;
                    color: #9b9b9b;
                    font-weight: 500;
                  "
                >
                  <span class="custom-tabs-label">
                    <el-icon><StarFilled /></el-icon>
                    <span>{{ $t("messages.market.Favorites") }}</span>
                  </span>
                </router-link>
              </template>
            </el-tab-pane>

            <el-tab-pane name="second" @click="handleTabClick('/market-allCrypto')">

              <template #label>
                <router-link
                  to="/market-allCrypto"
                  style="
                    text-decoration: none;
                    color: #9b9b9b;
                    font-weight: 500;
                  "
                >
                  <span class="custom-tabs-label">
                    <span>{{ $t("messages.market.All") }}</span>
                  </span>
                </router-link>
              </template>
            </el-tab-pane>

            <el-tab-pane :label="t('messages.market.Spot')" name="third">
              <el-radio-group v-model="radioValue">
                <el-scrollbar>
                  <div class="scrollbar-flex-content">
                    <el-radio-button label="All" />
                    <el-radio-button label="USDT" />
                    <el-radio-button label="BNB" />
                    <el-radio-button label="BTC" />
                    <el-radio-button label="ALTS" />
                    <el-radio-button label="FIAT(All)" />
                    <el-radio-button label="ETF" />
                  </div>
                </el-scrollbar>
              </el-radio-group>
              <div>
                <el-table
                  :data="coinMarketCapData.data"
                  :table-layout="tableLayout"
                  class="crypto-table"
                  :default-sort="{ prop: 'address', order: 'ascending' }"
                >
                  <el-table-column
                    prop="quote.AUD.price"
                    :label="t('messages.market.table_Crypto')"
                    width="300px"
                  >
                    <template v-slot="{ row }" class="clearfloat">
                      <el-icon class="crypto-star clearfloat"
                        ><StarFilled
                      /></el-icon>
                      <div
                        v-for="item in tableData.filter(
                          (i) => i.tag === row.symbol
                        )"
                        :key="item.id"
                        class="crypto-icon"
                      >
                        <img :src="item.img" alt="icon" />
                      </div>
                      <div class="table-tag">
                        {{ row.symbol }}
                        <div class="table-asset">
                          {{ row.name }}
                        </div>
                      </div>
                    </template>
                  </el-table-column>

                  <el-table-column
                    prop="quote.AUD.price"
                    :label="t('messages.market.table_Price')"
                    align="right"
                    sortable
                    width="150"
                  >
                    <template v-slot="{ row }">
                      <span style="color:#9B9B9B">A${{ row.quote.AUD.price.toFixed(2) }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="t('messages.market.table_Change')"
                    sortable
                    width="200"
                    align="right"
                  >
                    <template v-slot="{ row }">
                      <span
                        v-if="row.quote.AUD.volume_change_24h > 0"
                        style="color: #01c19a"
                      >
                        {{ row.quote.AUD.volume_change_24h }}%
                      </span>
                      <span
                        v-else-if="row.quote.AUD.volume_change_24h < 0"
                        style="color: #f15958"
                      >
                        {{ row.quote.AUD.volume_change_24h }}%
                      </span>
                    </template>
                  </el-table-column>

                  <el-table-column
                    :label="t('messages.market.table_high')"
                    width="380"
                    align="right"
                  >
                    <template v-slot="{ row }">
                      <span
                        class="table-price"
                        style="margin-right: 4px; color: #000"
                        >{{ row.quote.AUD.volume_24h.toFixed(2) }}</span
                      >/
                      <span>
                        {{
                          (row.quote.AUD.volume_change_24h < 0
                            ? row.quote.AUD.volume_24h -
                              Math.abs(row.quote.AUD.volume_change_24h)
                            : row.quote.AUD.volume_24h +
                              row.quote.AUD.volume_change_24h
                          ).toFixed(2)
                        }}
                      </span>
                    </template>
                  </el-table-column>

                  <el-table-column
                    sortable
                    :label="t('messages.market.table_volumn')"
                    width="200"
                    align="right"
                  >
                    <template v-slot="{ row }">
                      <span class="table-price"
                        >{{ row.quote.AUD.volume_24h.toFixed(2) }}M</span
                      >
                    </template>
                  </el-table-column>

                  <el-table-column
                    prop="quote.AUD.market_cap"
                    :label="t('messages.market.table_cap')"
                    sortable
                    width="220"
                    align="right"
                  >
                    <template v-slot="{ row }">
                      ${{ row.quote.AUD.market_cap.toFixed(2) }}B
                    </template>
                  </el-table-column>

                  <el-table-column
                    align="right"
                    fixed="right"
                    prop="address"
                    label="Action"
                    class="action"
                  >
                    <template #header>
                      {{ t("messages.market.table_Action") }}
                    </template>
                    <template #default="scope">
                      <div class="action-btn">
                        <el-button text link>Trade</el-button>
                      </div>
                    </template>
                  </el-table-column>

                  <template #empty>
                    <el-empty :image="no_found" description="No Results Found">
                    </el-empty>
                  </template>
                </el-table>
                <div class="example-pagination-block min-pagination">
                  <el-pagination
                    background
                    :hide-on-single-page="filterSpotData.length < 10"
                    layout="prev, pager, next"
                    :page-size="3"
                    :total="filterSpotData.length"
                  />
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-scrollbar>
    </div>

    <Footer v-if="uiStore.showHeaderFooter && windowWidth > 769" />
    <FooterMobile v-if="uiStore.showHeaderFooter && windowWidth <= 769" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onUnmounted, onMounted, computed } from "vue";
import Header from "../../../layout/Header/Header.vue";
import { useUIStore } from '../../../store/ui'
import Footer from "../../../layout/Footer/Footer.vue";
import FooterMobile from "../../../layout/Footer/FooterMobile.vue";
import { StarFilled, Search } from "@element-plus/icons-vue";
import { getCoinMarketCap } from "../../../api/market";

import type { TabsPaneContext } from "element-plus";
import { CaretBottom, CaretTop } from "@element-plus/icons";

import no_found from "../../../assets/home/no_found.png";

import BTC from "../../../assets/home/part01_BTC.png";
import ETH from "../../../assets/home/part01_ETH.png";
import OKB from "../../../assets/home/part01_OKB.png";
import OKT from "../../../assets/home/part01_OKT.png";
import LTC from "../../../assets/home/part01_LTC.png";
import DOT from "../../../assets/home/part01_DOT.png";
import USDT from "../../../assets/home/crypto_icon_usdt.png";
import USDC from "../../../assets/home/crypto_icon_usdc.png";
import BNB from "../../../assets/home/BNB.png";
import XRP from "../../../assets/home/xrp.png";
import ADA from "../../../assets/home/crypto_icon_ada.png";
import DOGE from "../../../assets/home/dogecoin.png";
import MATIC from "../../../assets/home/polygon.png";
import SOL from "../../../assets/home/solana.png";

import { useRouter } from 'vue-router';

import { useI18n } from "vue-i18n";
const { t } = useI18n();
const radioValue = ref("All");
const activeName = ref("third");

const router = useRouter();
const routeMap: Record<string, string> = {
  first: '/market-favorite',
  second: '/market-allCrypto'
};
const handleTabClick = (route: string) => {
  router.push(route);
};


const search = ref("");
const uiStore = useUIStore()
const tableLayout = ref("fixed");

interface Coin {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  num_market_pairs: number;
  date_added: string;
  tags: string[];
  max_supply: number | null;
  circulating_supply: number;
  total_supply: number;
  infinite_supply: boolean;
  platform: {
    id: number;
    name: string;
    symbol: string;
    slug: string;
    token_address: string;
  } | null;
  cmc_rank: number;
  self_reported_circulating_supply: number | null;
  self_reported_market_cap: number | null;
  tvl_ratio: number | null;
  last_updated: string;
  quote: {
    AUD: {
      price: number;
      volume_24h: number;
      volume_change_24h: number;
      percent_change_1h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_60d: number;
      percent_change_90d: number;
      market_cap: number;
      market_cap_dominance: number;
      fully_diluted_market_cap: number;
      tvl: number | null;
      last_updated: string;
    };
  };
}

const coinMarketCapData = ref<any>({ data: [] });

onMounted(async () => {
  try {
    // const response = await getCoinMarketCap();
    // coinMarketCapData.value = JSON.parse(response.data);
  } catch (error) {
    console.error(error);
  }
});

const tableData = [
  {
    id: 1,
    img: BTC,
    tag: "BTC",
    asset: "Bitcoin",
  },
  {
    id: 2,
    img: ETH,
    tag: "ETH",
    asset: "Ethereum",
  },
  {
    id: 3,
    img: USDT,
    tag: "USDT",
    asset: "USDT",
  },
  {
    id: 4,
    img: BNB,
    tag: "BNB",
    asset: "OKC Token",
  },
  {
    id: 5,
    img: USDC,
    tag: "USDC",
    asset: "Litecoin",
  },
  {
    id: 6,
    img: XRP,
    tag: "XRP",
    asset: "Polkadot",
  },
  {
    id: 7,
    img: ADA,
    tag: "ADA",
    asset: "Cardano",
  },
  {
    id: 8,
    img: DOGE,
    tag: "DOGE",
    asset: "Cardano",
  },
  {
    id: 9,
    img: MATIC,
    tag: "MATIC",
    asset: "Cardano",
  },
  {
    id: 10,
    img: SOL,
    tag: "SOL",
    asset: "Cardano",
  },
];

const filterTableData = computed(() => {
  if (radioValue.value === "All") return tableData;
  return tableData.filter((v) => v.tag.includes(radioValue.value));
});
const spotData = [
  {
    id: 1,
    isFavorites: true,
    img: BTC,
    tag: "BTC",
    asset: "Bitcoin",
    upPirce: "22,788,01",
    price: "/ A$32,814,73",
    change: "-0.02%",
    changeCount: "23.470.02 / 22.661.80",
    volume: "1,280.34M",
    cap: "$460.00B",
    type: "down",
    data: [30, 20, 30, 10, 0, 10],
  },
  {
    id: 2,
    img: ETH,
    tag: "ETH",
    asset: "Ethereum",
    downPirce: "1,611.30",
    price: "/ A$32,814,73",
    change: "+1.42%",
    changeCount: "1,678.86 / 1,599.99",
    volume: "814.78M",
    cap: "$216.69B",
    type: "up",
    data: [10, 0, 30, 50, 40, 70],
  },
  {
    id: 3,
    img: OKB,
    tag: "OKB",
    asset: "OKB",
    changePrice: "38.75",
    price: "/ A$32,814,73",
    change: " -3.82% ",
    changeCount: "42.45 / 37.45",
    volume: "89.27M",
    cap: "$65.89B",
    type: "up",
    data: [40, 20, 30],
  },
  {
    id: 4,
    img: OKT,
    tag: "OKT",
    asset: "OKC Token",
    changePrice: "38.75",
    price: "/ A$32,814,73",
    changeCount: "242.45 / 237.45",
    volume: "89.27M",
    cap: "$54.76B",
    change: "+1.92%",
    type: "down",
    data: [10, 20, 70],
  },
  {
    id: 5,
    img: LTC,
    tag: "LTC",
    asset: "Litecoin",
    changePrice: "38.75",
    price: "/ A$32,814,73",
    changeCount: "242.45 / 237.45",
    volume: "89.27M",
    cap: "$18.50B",
    change: "+1.92%",
    type: "down",
    data: [20, 20, 60],
  },
  {
    id: 6,
    img: DOT,
    tag: "DOT",
    asset: "Polkadot",
    changePrice: "38.75",
    price: "/ A$32,814,73",
    changeCount: "242.45 / 237.45",
    volume: "89.27M",
    cap: "$18.50B",
    change: "+1.92%",
    type: "down",
    data: [10, 20, 30],
  },
  {
    id: 7,
    img: ADA,
    tag: "ADA",
    asset: "Cardano",
    changePrice: "38.75",
    price: "/ A$32,814,73",
    changeCount: "242.45 / 237.45",
    volume: "89.27M",
    cap: "$18.50B",
    change: "+1.92%",
    type: "up",
    data: [10, 0, 30, 0, 50, 10, 90],
  },
  {
    id: 7,
    img: ADA,
    tag: "ADA",
    asset: "Cardano",
    changePrice: "38.75",
    price: "/ A$32,814,73",
    changeCount: "242.45 / 237.45",
    volume: "89.27M",
    cap: "$18.50B",
    change: "+1.92%",
    type: "up",
    data: [10, 0, 30, 0, 50, 10, 90],
  },
  {
    id: 7,
    img: ADA,
    tag: "ADA",
    asset: "Cardano",
    changePrice: "38.75",
    price: "/ A$32,814,73",
    changeCount: "242.45 / 237.45",
    volume: "89.27M",
    cap: "$18.50B",
    change: "+1.92%",
    type: "up",
    data: [10, 0, 30, 0, 50, 10, 90],
  },
  {
    id: 7,
    img: ADA,
    tag: "ADA",
    asset: "Cardano",
    changePrice: "38.75",
    price: "/ A$32,814,73",
    changeCount: "242.45 / 237.45",
    volume: "89.27M",
    cap: "$18.50B",
    change: "+0.20%",
    type: "up",
    data: [10, 0, 30, 0, 50, 10, 90],
  },
  {
    id: 7,
    img: ADA,
    tag: "ADA",
    asset: "Cardano",
    changePrice: "38.75",
    price: "/ A$32,814,73",
    changeCount: "242.45 / 237.45",
    volume: "89.27M",
    cap: "$18.50B",
    change: "+0.20%",
    type: "up",
    data: [10, 0, 30, 0, 50, 10, 90],
  },
  {
    id: 7,
    img: ADA,
    tag: "ADA",
    asset: "Cardano",
    changePrice: "38.75",
    price: "/ A$32,814,73",
    changeCount: "242.45 / 237.45",
    volume: "89.27M",
    cap: "$18.50B",
    change: "+0.20%",
    type: "up",
    data: [10, 0, 30, 0, 50, 10, 90],
  },
  {
    id: 8,
    img: ADA,
    tag: "ADA",
    asset: "Cardano",
    changePrice: "38.75",
    price: "/ A$32,814,73",
    changeCount: "242.45 / 237.45",
    volume: "89.27M",
    cap: "$18.50B",
    change: "+0.20%",
    type: "up",
    data: [10, 0, 30, 0, 50, 10, 90],
  },
  {
    id: 9,
    img: ADA,
    tag: "ADA",
    asset: "Cardano",
    changePrice: "38.75",
    price: "/ A$32,814,73",
    changeCount: "242.45 / 237.45",
    volume: "89.27M",
    cap: "$18.50B",
    change: "+0.20%",
    type: "up",
    data: [10, 0, 30, 0, 50, 10, 90],
  },
  {
    id: 10,
    img: ADA,
    tag: "ADA",
    asset: "Cardano",
    changePrice: "38.75",
    price: "/ A$32,814,73",
    changeCount: "242.45 / 237.45",
    volume: "89.27M",
    cap: "$18.50B",
    change: "+0.20%",
    type: "up",
    data: [10, 0, 30, 0, 50, 10, 90],
  },
  {
    id: 11,
    img: ADA,
    tag: "ADA",
    asset: "Cardano",
    changePrice: "38.75",
    price: "/ A$32,814,73",
    changeCount: "242.45 / 237.45",
    volume: "89.27M",
    cap: "$18.50B",
    change: "+0.20%",
    type: "up",
    data: [10, 0, 30, 0, 50, 10, 90],
  },
  {
    id: 12,
    img: ADA,
    tag: "ADA",
    asset: "Cardano",
    changePrice: "38.75",
    price: "/ A$32,814,73",
    changeCount: "242.45 / 237.45",
    volume: "89.27M",
    cap: "$18.50B",
    change: "+0.20%",
    type: "up",
    data: [10, 0, 30, 0, 50, 10, 90],
  },
  {
    id: 13,
    img: ADA,
    tag: "ADA",
    asset: "Cardano",
    changePrice: "38.75",
    price: "/ A$32,814,73",
    changeCount: "1,678.86 / 1,599.99",
    volume: "89.27M",
    cap: "$18.50B",
    change: "+0.20%",
    type: "up",
    data: [10, 0, 30, 0, 50, 10, 90],
  },
  {
    id: 14,
    img: ADA,
    tag: "Metaverse",
    asset: "Cardano",
    changePrice: "38.75",
    price: "/ A$32,814,73",
    changeCount: "1,678.86 / 1,599.99",
    volume: "89.27M",
    cap: "$18.50B",
    change: "+0.20%",
    type: "up",
    data: [10, 0, 30, 0, 50, 10, 90],
  },
  {
    id: 15,
    img: ADA,
    tag: "Metaverse",
    asset: "Cardano",
    changePrice: "38.75",
    price: "/ A$32,814,73",
    changeCount: "1,678.86 / 1,599.99",
    volume: "89.27M",
    cap: "$18.50B",
    change: "+0.20%",
    type: "up",
    data: [10, 0, 30, 0, 50, 10, 90],
  },
  {
    id: 16,
    img: ADA,
    tag: "Metaverse",
    asset: "Cardano",
    changePrice: "38.75",
    price: "/ A$32,814,73",
    changeCount: "1,678.86 / 1,599.99",
    volume: "89.27M",
    cap: "$18.50B",
    change: "+0.20%",
    type: "up",
    data: [10, 0, 30, 0, 50, 10, 90],
  },
  {
    id: 17,
    img: ADA,
    tag: "Metaverse",
    asset: "Cardano",
    changePrice: "38.75",
    price: "/ A$32,814,73",
    changeCount: "1,678.86 / 1,599.99",
    volume: "89.27M",
    cap: "$18.50B",
    change: "+0.20%",
    type: "up",
    data: [10, 0, 30, 0, 50, 10, 90],
  },
  {
    id: 18,
    img: ADA,
    tag: "Metaverse",
    asset: "Cardano",
    changePrice: "38.75",
    price: "/ A$32,814,73",
    changeCount: "1,678.86 / 1,599.99",
    volume: "89.27M",
    cap: "$18.50B",
    change: "+0.20%",
    type: "up",
    data: [10, 0, 30, 0, 50, 10, 90],
  },
];

const filterSpotData = computed(() => {
  if (radioValue.value === "All") return spotData;
  return spotData.filter((v) => v.tag.includes(radioValue.value));
});

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
// .scrollbar-flex-content {
//   display: flex;
// }
.center-part {
  max-width: 1290px;
  min-height: calc(100vh - 394px);
  // align-items: center;
  margin: auto;
  padding: 21px 0 141px 0;
  position: relative;
  @media (max-width: 1440px) {
    padding: 21px 20px 141px 20px;
    max-width: 940px;
  }
}
.search-input {
  position: absolute;
  right: 0px;
  top: 20px;
  width: 231px;
  height: 37px;
  z-index: 99;
  @media (max-width: 1440px) {
    right: 20px;
  }
}

:deep() {
  .el-input--large {
    height: 37px; //搜索框
  }
  // .el-scrollbar__bar.is-horizontal > div {
  //   height: 0; //iPhone滑动样式高度
  // }

  // .el-icon svg {
  //   width: 25px;
  //   height: 25px;
  // }
  .el-input__wrapper {
    background: #f1f1f1;
    box-shadow: none;
    border-radius: 6px;
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
  .el-table th.el-table__cell {
    font-weight: 400;
  }
  .el-table__body {
    font-weight: 500;
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
.crypto-star {
  margin-top: 3px;
  display: flex;
  float: left;
  font-size: 25px;
  color: #dfdfdf;
  img {
    width: 100%;
    height: 100%;
  }
}
.crypto-table {
  font-size: 16px;
  font-weight: 600;
  color: #020202;
  line-height: 19px;
}

.crypto-icon {
  display: flex;
  float: left;
  width: 32px;
  height: 32px;
  margin-left: 10px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
.table-tag {
  display: flex;
  float: left;
  margin-left: 11px;
  margin-top: 5px;
  color: #020202;
}
.table-asset {
  margin-left: 11px;
  color: #9b9b9b;
  font-weight: 400;
}

.action {
  :deep(.cell) {
    float: right;
  }
}
.action-btn {
  :deep(.el-button > span) {
    font-size: 16px;
    color: #01c19a;
    line-height: 19px;
    font-weight: 500;
  }
}
:deep(.el-empty__image) {
  margin-left: 40px;
  margin-top: 52px;
}
:deep(.el-empty__description p) {
  font-weight: 400;
  font-size: 16px !important;
  color: #9b9b9b !important;
}
.example-pagination-block {
  float: right;
  margin-top: 27px;
  color: #9b9b9b;
  :deep() {
    // .el-pager{
    //   margin-top: 15px;
    // }
    .el-pager li {
      color: #9b9b9b;
    }
    .el-pagination.is-background .el-pager li {
      background-color: #ffffff;
    }
    .el-pager li.is-active {
      background-color: #f1f1f1 !important;
      color: #000;
    }
    .el-pagination.is-background .btn-next,
    .el-pagination.is-background .btn-prev,
    .el-pagination.is-background .el-pager li {
      background-color: #ffffff;
    }
    // .el-pager li:hover {
    //   color: #01c19a !important;
    // }
    .el-pagination {
      --el-pagination-border-radius: 4px;
      --el-pagination-font-size: 16px;
    }
  }
}
.min-pagination {
  :deep(.el-pagination) {
    --el-pagination-button-width: 20px;
    --el-pagination-button-height: 20px;
    --el-pagination-font-size: 14px;
  }
}
</style>
