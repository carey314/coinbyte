<template>
  <div>
    <div class="similar-title">Similar Cryptocurrencies</div>
    <div class="similar-box">
      <div class="card-item" v-for="(item, index) in coinMarketCapData" :key="item.id">
        <div class="icon"><img :src="item.image" /></div>
        <div class="ctypto-type">
          <div class="ctypto-type-name">{{ item.symbol?.toUpperCase() }}</div>
          <div class="ctypto-type-fullname">{{ item.name }}</div>
        </div>
        <div class="price">
          <div class="price-asset">A${{ item.current_price?.toFixed(4) }}</div>
          <div class="price-rate">{{ item.price_change_percentage_24h?.toFixed(4) }}%</div>
        </div>
        <el-divider class="divider" />
      </div>
    </div>
    <div class="view-more">
      <router-link to="/market-allCrypto" style="text-decoration: none;"><div class="view-more-button">View more</div></router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { queryCurrenciesType } from "../../../api/currencies";
import { getLastCoinMarketCap } from "../../../api/market";

const coinMarketCapData = ref<any>([]);

onMounted(async () => {
  refreshData(null, 6, 0);
});

async function refreshData(typeId?: number | null, pageSize: number = 10, pageNumber: number = 0, blurry?: string) {
  try {
    let queryCurrenciesTypeParams: QueryCurrenciesType = {
      size: pageSize,
      page: pageNumber
    };
    typeId && (queryCurrenciesTypeParams.typeId = typeId);
    blurry && (queryCurrenciesTypeParams.blurry = blurry);
    const coins: any = await queryCurrenciesType(queryCurrenciesTypeParams);
    const symbols = coins.data.content.map((v: any) => v.alias && v.alias.toLowerCase());
    const getLastCoinMarketCapParams: {symbols?: string} = {symbols: '\'\''};
    if(symbols.length > 0) {
      getLastCoinMarketCapParams.symbols = symbols.join(',')
    }
    const response = await getLastCoinMarketCap(getLastCoinMarketCapParams);
    const resJson = JSON.parse(response.data);
    coinMarketCapData.value = resJson;
  } catch (error) {
    console.error(error);
  }
}

interface QueryCurrenciesType {
  typeId?: number;
  page?: number;
  size?: number;
  blurry?: string;
}
</script>

<style scoped lang="scss">
.similar-title {
  margin-top: 42px;
  font-size: 20px;
  color: #000000;
  line-height: 24px;
}
.similar-card {
  border: 1px solid #dfdfe5;
  border-radius: 8px;
  margin-top: 15px;
  .card-item {
    padding: 21px 19px 0px 19px;
    .icon {
      width: 40px;
      float: left;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    .ctypto-type {
      float: left;
      margin-left: 16px;
      margin-top: 2px;
      .ctypto-type-name {
        color: #020202;
        line-height: 19px;
        font-weight: 500;
      }
      .ctypto-type-fullname {
        margin-top: 4px;
        color: #878787;
        line-height: 18px;
        font-weight: 400;
      }
    }
    .price {
      float: right;
      margin-top: 3px;
      .price-rate {
        margin-top: 4px;
        text-align: right;
        color: #01c19a;
      }
    }
    .divider {
      width: 100%;
      margin-top: 55px;
      margin-left: -20px;
      :deep(.el-divider--horizontal) {
        margin: -1px 0 !important;
      }
    }
  }
}
.similar-box {
  border: 1px solid #dfdfe5;
  border-radius: 8px;
  margin-top: 15px;

  .card-item {
    padding: 21px 19px 0px 19px;
    .icon {
      width: 40px;
      float: left;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    .ctypto-type {
      float: left;
      margin-left: 16px;
      margin-top: 2px;
      .ctypto-type-name {
        color: #020202;
        line-height: 19px;
        font-weight: 500;
      }
      .ctypto-type-fullname {
        margin-top: 4px;
        color: #878787;
        line-height: 18px;
        font-weight: 400;
      }
    }
    .price {
      float: right;
      margin-top: 3px;
      .price-rate {
        margin-top: 4px;
        text-align: right;
        color: #01c19a;
      }
    }
  }
  .divider {
    width: 100%;
    margin-top: 60px !important;
  }
  :deep(.el-divider--horizontal) {
    margin: -1px 0;
  }
}
.view-more {
  width: 133px;
  height: 41px;
  border: 1px solid #d7d7d7;
  border-radius: 3px;
  margin: 29px auto;
  cursor: pointer;
  .view-more-button {
    height: 41px;
    color: #878787;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
