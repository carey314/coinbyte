<template>
  <div class="convert-page">
    <div class="convert-content">
      <div class="center-part">
        <div class="center-convert">
          <div class="convert-radio">
            <el-radio-group v-model="activeSign" @change="switchSelect">
              <el-radio-button :label="option.value" v-for="option in options" :key="option.value">
                <el-row>
                  <el-col span="12">
                    <div class="label">
                      {{ option.label }}
                    </div>
                  </el-col>
                </el-row>
              </el-radio-button>
            </el-radio-group>
            <!-- pay -->
            <div class="convert-crypto">
              <div class="quick-amount">
                <div class="quick-amount-title">How much ?</div>
                <div class="quick-amount-part">
                  <el-button @click="howMuchInput(500)" type="info" plain class="amount">{{ activeSign == "1" ? "$" : ""}}500</el-button>
                  <el-button @click="howMuchInput(1000)" type="info" plain class="amount">{{ activeSign == "1" ? "$" : ""}}1000</el-button>
                  <el-button @click="howMuchInput(5000)" type="info" plain class="amount">{{ activeSign == "1" ? "$" : ""}}5000</el-button>
                  <el-button @click="howMuchInput(10000)" type="info" plain class="amount">{{ activeSign == "1" ? "$" : ""}}10,000</el-button>
                </div>
              </div>
              <div class="radio-content">
                <div class="pre-input">
                  <div class="input-title">{{ $t("messages.convert.pay") }}</div>
                  <el-input v-model="numberBuyOrSell" placeholder="pay" class="change-count clearfloat">
                    <template #append>
                      <div class="option-icon">
                        <img :src="firstIcon" v-show="firstIcon" />
                      </div>
                      
                      <el-select disabled filterable="false" remote v-model="firstSelect" placeholder="Select" style="width: 97px" @change="cryptoChange">
                        <el-option v-for="item in currenciesTypes" :label="item.slug" :value="item.slug">
                          <div style="
                              width: 20px;
                              display: flex;
                              align-items: center;
                              font-size: 14px !important;
                              color: #000;
                              margin-left: -5px;
                            ">
                            <img :src="item.icon" v-show="item.icon" style="
                                width: 100%;
                                height: 100%;
                                margin-right: 5px;
                              " />
                            {{ item.slug }}
                          </div>
                        </el-option> 
                      </el-select>
                    </template>
                  </el-input>
                  <div class="input-tip">
                    <el-button type="primary" link @click="cryptoMax">Max</el-button>
                    <el-divider direction="vertical" style="height: 22px" />
                  </div>
                  <div class="convert-tip">
                    <div class="tip-left">
                      {{ $t("messages.convert.tip_Available") }} : {{ availableBalance }} {{ firstSelect }}
                      <span>{{ errorTxtBuy }}</span>
                    </div>
                    <div class="tip-right">
                      <a href="/wallet/DepositCrypto" style="color: #01c19a">Deposit</a>
                    </div>
                  </div>
                </div>
                <!-- <div class="exchange-icon">
                  <-- 中间转换图片 
                  <img :src="crypto_buy" @click="switchSelect" />
                </div> -->
                <div class="pro-input">
                  <div class="input-second-title">{{ $t("messages.convert.receive") }}</div>
                  <el-input v-model="countBuy" placeholder="receive" class="change-count clearfloat">
                    <template #append>
                      <div class="option-icon">
                        <img :src="secondIcon" v-show="secondIcon" />
                      </div>
                      <el-select disabled filterable="false" remote v-model="secondSelect" style="width: 97px" @change="cryptoChange">
                        <el-option v-for="item in currenciesTypes" :label="item.slug" :value="item.slug">
                          <div style="
                              width: 20px;
                              display: flex;
                              align-items: center;
                              font-size: 14px !important;
                              color: #000;
                              margin-left: -5px;
                            ">
                            <img :src="item.icon" v-show="item.icon" style="
                                width: 100%;
                                height: 100%;
                                margin-right: 5px;
                              " />
                            {{ item.slug }}
                          </div>
                        </el-option>
                      </el-select>
                    </template>
                  </el-input>
                  <div class="input-split">
                    <el-divider direction="vertical" style="height: 22px" />
                  </div>
                  <div class="convert-tip">
                    <div class="tip-left" style="display: flex">
                      {{ $t("messages.convert.tip_Estimated") }} : 1 {{ secondSelect }} ≈ {{ currentPairs?.rate }} {{
                        firstSelect }}
                      <div style="margin-left: 8px">
                        <img :src="buy_info" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="convert-button">
                  <GetButton :text="text" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import _ from "lodash";
import { ref, reactive, onMounted, onUnmounted, computed } from "vue";
import type { Ref } from "vue";
import GetButton from "../../../components/GetButton.vue";
//img
import buy_info from "../../../assets/home/buy_info.svg";
import { getMyAssets } from "../../../api/wallet";
import {
  getBaseCurrency,
  getExchangeRateForCurrencyPair,
  exchangeCurrencies,
} from "../../../api/converts";
import type {
  StableCoinsToOptions,
  CurrentPair,
} from "../../../models/convert";
import type { AssetsData } from "../../../models/assets";
import { CurrencyType } from "../../../models/currencyType";
import { storeToRefs } from "pinia";
import { useUserInfoStore } from "../../../store/user";
import { tradeStore } from "../../../store/trade";

const userInfoStore = useUserInfoStore()
const useTradeStore = tradeStore()
const {currencySlug, currencyName, currencyIcon} = storeToRefs(useTradeStore)
const activeSign = ref("1");
const numberBuyOrSell = ref("0.0000");
const thirdSelect = ref("");
// const text = ref("Buy Bitcoin");
const currenciesTypesCrypto = ref<CurrencyType[]>([])

const props = defineProps<
  {
    isSell: boolean
  }
>();

onMounted(() => {
  if(props.isSell) {
    console.log(props.isSell);
    activeSign.value = '2';
  }
})

const firstSelect = ref("AUD");
const secondSelect = ref(currencySlug.value);
const firstIcon = ref("")
const secondIcon = ref(currencyIcon.value)
const currenciesTypes = ref<CurrencyType[]>([])
const options = ref([
  {
    value: "1",
    label: "Buy",
  },
  {
    value: "2",
    label: "Sell",
  },
]);
const text = computed(()=>{
  if(activeSign.value === '2'){
    return userInfoStore.isLogin ? `Sell ${currencyName.value}` : `Login to Sell ${currencyName.value}`
  } else {
    return userInfoStore.isLogin ? `Buy ${currencyName.value}` : `Login to Buy ${currencyName.value}`
  }
})
const errorTxtBuy = computed(() => {
  if (numberBuyOrSell.value && Number(numberBuyOrSell.value) < 0.00000001) {
    return "Minimum amount: 0.00000001"
  }
  return null
})
const availableBalance = computed(()=>{
  const arr = assetsData.value.find((e)=> e.alphabeticCode == firstSelect.value)
  if(arr){
    return Number(arr.balance)
  }
  return 0
})
//get rates

const assetsData = ref<AssetsData[]>([]);
onMounted(async () => {
  if (userInfoStore.token) {
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
            group: v.group.name,
            minorUnit: v.currency.minorUnit,
          };
        });
        console.log(assetsData.value);
      }
    });
  }
  
  // 
  // const res = await queryCurrenciesType()
  // console.log(res)
  // if (res.status == 200) {
  //   if (res.data.content) {
  //     currenciesTypes.value = res.data.content
  //     const payCurrency = currenciesTypes.value.filter((e)=> {
  //       return e.slug == currencySlug.value
  //     })
  //   }
  // }
});

const howMuchInput = (howMuch: number)=>{
  numberBuyOrSell.value = String(howMuch)
}

const switchSelect = () => {
  [secondIcon.value, firstIcon.value] = [firstIcon.value, secondIcon.value];
  [secondSelect.value, firstSelect.value] = [firstSelect.value, secondSelect.value];
  numberBuyOrSell.value = String(countBuy.value)
  cryptoChange()
}

const currentPairs = ref<CurrentPair>();
const countBuy = computed(() => {
  if (numberBuyOrSell.value && currentPairs.value?.rate) {
    return (parseFloat(numberBuyOrSell.value) * parseFloat(currentPairs.value.rate)).toFixed(8)
  } else {
    return "0.0000";
  }
});

const cryptoChange = async () => {
  // 查汇率
  if (firstSelect.value && secondSelect.value && userInfoStore.token) {
    const res = await getExchangeRateForCurrencyPair(secondSelect.value, firstSelect.value)
    console.log(res.data);
    let newData = _.cloneDeep(res.data);
    let newObj = {
      currency: newData.currency.name,
      alphabeticCode: newData.currency.alphabeticCode,
      numericCode: newData.currency.numericCode,
      maxAmount: newData.maxAmount,
      quoteId: newData.quoteId,
      rate: newData.rate,
      minorUnit: newData.currency.minorUnit,
    };
    currentPairs.value = newObj;
  }
}

const cryptoMax = () => {
  if (currentPairs.value?.maxAmount) {
    numberBuyOrSell.value = String(currentPairs.value?.maxAmount)
  }
}
// witch fiat || crypto || stablecoins
const fiatOptions = computed(() => {
  if (assetsData.value.length > 0) {
    return assetsData.value.filter((v) => v.group === "Fiat");
  } else {
    return [];
  }
});
const cryptoOptions = computed(() => {
  if (assetsData.value.length > 0) {
    return assetsData.value.filter((v) => v.group === "Crypto");
  } else {
    return [];
  }
});
const stableCoinsOptions = computed(() => {
  if (assetsData.value.length > 0) {
    return assetsData.value.filter((v) => v.group === "Stablecoins");
  } else {
    return [];
  }
});
const stableCoinsToOptions = ref<StableCoinsToOptions[]>([]);
const handleCoinsChange = () => {
  console.log(secondSelect.value);
  getBaseCurrency(secondSelect.value).then((res) => {
    console.log(res.data);
    stableCoinsToOptions.value = res.data.data.map((v: any) => {
      return {
        currency: v.currency.name,
        alphabeticCode: v.currency.alphabeticCode,
        minorUnit: v.currency.minorUnit,
        maxAmount: v.maxAmount,
        quoteId: v.quoteId,
        rate: v.rate,
      };
    });
  });
};
const currentPair = ref<CurrentPair>();
const handleSetRate = () => {
  getExchangeRateForCurrencyPair(firstSelect.value, secondSelect.value).then(
    (res) => {
      console.log(res.data);
      // currentPair.value = res.data.data;
      let newData = _.cloneDeep(res.data);
      let newObj = {
        currency: newData.currency.name,
        alphabeticCode: newData.currency.alphabeticCode,
        numericCode: newData.currency.numericCode,
        maxAmount: newData.maxAmount,
        quoteId: newData.quoteId,
        rate: newData.rate,
        minorUnit: newData.currency.minorUnit,
      };
      currentPair.value = newObj;
    }
  );
};
const availableAmount = computed(() => {
  if (secondSelect.value && stableCoinsOptions.value.length > 0) {
    let selectOption = stableCoinsOptions.value.find(
      (v) => v.alphabeticCode === secondSelect.value
    );
    if (selectOption) {
      return parseFloat(selectOption.balance).toFixed(selectOption.minorUnit);
    } else {
      return null;
    }
  }
});
const handleToConvert = () => {
  if (numberBuyOrSell.value) {
    let fromObj = stableCoinsOptions.value.find(
      (v) => v.alphabeticCode === firstSelect.value
    );
    let toObj = assetsData.value.find(
      (v) => v.alphabeticCode === secondSelect.value
    );
    if (fromObj && toObj && currentPair.value) {
      let exchangeData = {
        amount: numberBuyOrSell.value as string,
        destinationAccountId: toObj.accountId,
        quoteId: currentPair.value.quoteId as string,
        sourceAccountId: fromObj.accountId,
      };
      console.log(exchangeData);
      exchangeCurrencies(exchangeData).then((res) => {
        console.log(res.data);
      });
    }
  }
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

.part {
  max-width: 1290px;
  margin: auto;
}

.convert-page {
  position: relative;

  .convert-content {
    align-items: center;

    .top-part {
      background: #1d262f;
      width: 100%;
      padding: 46px 0 68px 0;
      position: relative;
      display: flex;

      .top-part-box {
        margin: auto;
        text-align: center;
        width: 654px;

        @media (max-width: 769px) {
          & {
            padding: 0 5%;
          }
        }

        .top-part-title {
          font-size: $fontSizeMax;
          color: #01c19a;
          font-weight: 600;
          line-height: 51px;
        }

        .top-part-content {
          font-size: $fontSizeMed;
          color: #ffffff;
          margin-top: 12px;
          line-height: 29px;

          @media (max-width: 769px) {
            & {
              font-size: $fontSizeDef !important;
            }
          }
        }
      }
    }

    .center-part {

      @media (max-width: 769px) {
        padding-top: 10px;
      }

      .center-convert {
        max-width: 618px;
        flex: 1;
        margin: auto;
        background: #fff;
        box-shadow: 0 0 15px 0 rgba(95, 95, 95, 0.19);
        border-radius: 8px;

        @media (max-width: 768px) {
          border-radius: 0px;
        }

        .convert-radio {
          :deep() {
            .el-radio-group {
              width: 100%;
            }

            .el-radio-button {
              width: 50%;
            }

            .el-radio-button__inner {
              font-size: 18px;
              line-height: 23px;
              color: #878787;
              font-weight: 600;
              background-color: #f1f4f5;
              border: none;
              height: 50px;
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .el-radio-button:first-child .el-radio-button__inner {
              background: #f1f4f5;
              border-radius: 8px 0;
            }

            .el-radio-button:last-child .el-radio-button__inner {
              border-radius: 0 0 0 8px;
            }

            .el-radio-button__original-radio:checked+.el-radio-button__inner {
              color: #000 !important;
              box-shadow: none;
              border-radius: 0 8px 0 0;
              background: #fff;
            }
          }

          .el-radio {
            height: 50px;
            border-radius: 4px;
            padding: 15px;
            background: #f1f4f5;
          }

          .change-count {
            position: relative;

            // border: 1px solid #DFDFE5;
            // border-radius: 8px;
            .option-icon {
              position: absolute;
              left: -18px;
              top: 18px;
              width: 24px;
              z-index: 999;

              img {
                width: 100%;
                height: 100%;
                object-fit: contain;
              }
            }

            :deep() {
              .el-input__inner {
                font-size: 22px;
                line-height: 27px;
                color: #000;
                font-weight: 600;
              }

              .el-select .el-input__inner {
                font-size: 18px !important;
                line-height: 23px !important;
                margin-top: 0;
                font-weight: 500 !important;
              }
            }
          }

          :deep() {
            .el-input {
              --el-input-border-color: none;
            }

            .el-input-group__prepend {
              width: 73px;
              border-radius: 8px;
            }

            .el-input-group--prepend>.el-input__wrapper {
              margin-left: 16px;
            }

            .el-select {
              --el-select-input-focus-border-color: none;
            }

            //right input
            .el-input__wrapper {
              background: #fff;
              border: 1px solid #dfdfe5;
              height: 60px;
              border-radius: 4px;
              --el-input-focus-border-color: none;
              --el-input-hover-border-color: none;
              box-shadow: none;
              padding-left: 12px !important;
            }

            .el-input__inner {
              font-size: $fontSizeMinPro;
              color: #c4c9d0;
              line-height: 16px;
            }
          }

          .convert-tip {
            display: flex;
            justify-content: space-between;
            margin-top: 9px;

            .tip-left {
              font-size: $fontSizeMin;
              color: #878787;
              line-height: 14px;

              span {
                color: #f15958;
              }
            }

            .tip-right {
              font-size: $fontSizeMin;
            }
          }
        }
      }

      .convert-stable {
        :deep() {
          .el-input__wrapper {
            background: #fff;
            border: 1px solid #dfdfe5;
            height: 48px;
            border-radius: 4px;
            --el-input-focus-border-color: none;
            --el-input-hover-border-color: none;
            box-shadow: none;
            padding-left: 15px;
          }
        }
      }

      .quick-amount {
        padding: 26px 25px 0px 25px;

        .quick-amount-title {
          font-size: $fontSizeMinPro;
          color: #878787;
          text-align: center;
        }

        .quick-amount-part {
          margin-top: 18px;
          display: flex;
          justify-content: space-between;

          .amount {
            padding: 8px 15px 7px 15px;
            height: 32px;
            background: #F1F4F5;
            border-radius: 6px;
            font-size: $fontSizeMinPro;
            color: #878787;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }

      .radio-content {
        padding: 32px 40px 40px 40px;
        position: relative;

        :deep() {
          .el-input__inner {
            margin-top: 18px;
          }

          .el-select .el-input .el-select__caret {
            color: #1f2832;
          }

          .el-input-group--append>.el-input__wrapper {
            border-radius: 8px 0 0 8px !important;
            border-right: none !important;
          }

          .el-input-group__append,
          .el-input-group__prepend {
            background-color: none;
          }

          .el-input-group--append .el-input-group__append .el-select .el-input .el-input__wrapper {
            border-left: none !important;
            border-radius: 0 8px 8px 0 !important;
          }
        }

        .input-title {
          position: absolute;
          top: 40px;
          left: 52px;
          z-index: 1;
          color: #878787;
          font-size: $fontSizeMin;
        }

        .input-tip {
          position: absolute;
          top: 50px;
          right: 168px;
          z-index: 1;
          color: #f15958;
          font-size: $fontSizeMin;

          :deep(.el-divider--vertical) {
            margin: 0 10px;
          }

          @media (max-width: 769px) {
            & {
              right: 160px;
            }
          }
        }

        .input-split {
          position: absolute;
          top: 20px;
          right: 128px;
          z-index: 1;

          :deep(.el-divider--vertical) {
            margin: 0 10px;
          }

          @media (max-width: 769px) {
            & {
              right: 120px;
            }
          }
        }

        .exchange-icon {
          margin-top: 6px !important;
          margin: auto;
          width: 16px;
          height: 16px;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        .pro-input {
          margin-top: 12px;
          position: relative;

          .input-second-title {
            position: absolute;
            top: 8px;
            left: 12px;
            z-index: 1;
            color: #878787;
            font-size: $fontSizeMin;
          }
        }

        .convert-button {
          margin-top: 20px;

          :deep(.button) {
            width: 100%;
            height: 100%;
            font-size: 20px;
            line-height: 25px;
            padding: 16px 0 14px 0px;
            border: 8px;

            @media (max-width: 769px) {
              padding: 16px 0;
            }
          }
        }
      }

      .center-service {
        max-width: 618px;
        margin: auto;
        display: flex;
        justify-content: space-between;
        margin-top: 83px;
        padding: 0 20px;

        .service {
          .service-icon {
            text-align: center;

            img {
              width: 73px;
              height: auto;
              object-fit: contain;

              @media (max-width: 769px) {
                width: 63px;
              }
            }
          }

          .service-msg {
            line-height: 25px;
            font-size: 20px;
            color: #060606;
            margin-top: 12px;

            @media (max-width: 769px) {
              font-size: 16px;
            }
          }
        }
      }

      .center-faq {
        margin-top: 102px;

        @media (max-width: 1000px) {
          margin-top: 60px;
        }
      }
    }
  }
}
</style>
