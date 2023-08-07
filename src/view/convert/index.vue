<template>
  <div class="convert-page">
    <Header />
    <div class="convert-content">
      <div class="top-part">
        <div class="top-part-box">
          <div class="top-part-title">{{ $t("messages.convert.convert") }}</div>
          <div class="top-part-content">
            {{ $t("messages.convert.convert_tip") }}
          </div>
        </div>
      </div>
      <div class="center-part">
        <div class="center-convert">
          <div class="convert-radio">
            <!-- tab -->
            <el-radio-group v-model="activeSign">
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

            <!-- Crypto -->
            <div v-if="activeSign === '1'" class="convert-crypto">
              <div class="radio-content">
                <div class="pre-input">
                  <div class="input-title">{{ $t("messages.convert.pay") }}</div>
                  <el-input v-model="numberCrypto" placeholder="pay" class="change-count clearfloat">
                    <template #append>
                      <div class="option-icon">
                        <img :src="firstIcon" v-show="firstIcon" />
                      </div>
                      <el-select v-model="firstSelect" placeholder="Select" style="width: 97px" @change="cryptoChange">
                        <el-option v-for="item in currenciesTypesCrypto" :label="item.slug" :value="item.slug" :key="item.id">
                          <div style="
                              width: 20px;
                              display: flex;
                              align-items: center;
                              font-size: 14px !important;
                              color: #000;
                              margin-left: -5px;
                            ">
                            <img :src="item.icon" style="
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
                      <span>{{ errorTxtCrypto }}</span>
                    </div>
                    <div class="tip-right">
                      <a href="/wallet/depositCrypto" style="color: #01c19a">{{ $t("messages.convert.deposit") }}</a>
                    </div>
                  </div>
                </div>
                <div class="exchange-icon">
                  <!-- 中间转换图片 -->
                  <img :src="crypto_buy" @click="switchSelect" />
                </div>
                <div class="pro-input">
                  <div class="input-second-title">{{ $t("messages.convert.receive") }}</div>
                  <el-input v-model="countCrypto" placeholder="receive" class="change-count clearfloat">
                    <template #append>
                      <div class="option-icon">
                        <img :src="secondIcon" v-show="secondIcon" />
                      </div>
                      <el-select v-model="secondSelect" placeholder="Select" style="width: 97px" @change="cryptoChange">
                        <el-option v-for="item in currenciesTypesCrypto" :label="item.slug" :value="item.slug" :key="item.id">
                          <div style="
                              width: 20px;
                              display: flex;
                              align-items: center;
                              font-size: 14px !important;
                              color: #000;
                              margin-left: -5px;
                            ">
                            <img :src="item.icon" style="
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
                      {{ $t("messages.convert.tip_Estimated") }} : 1 {{ secondSelect }} ≈ {{ currentPairCrypto?.rate }} {{
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

            <!-- Stablecoins -->
            <div v-if="activeSign === '2'" class="convert-stable">
              <div class="radio-content">
                <div class="pre-input">
                  <div class="input-title">{{ $t("messages.convert.pay") }}</div>
                  <el-input v-model="numberStable" placeholder="pay" class="change-count clearfloat">
                    <template #append>
                      <div class="option-icon">
                        <img :src="thirdIcon" v-show="thirdIcon" />
                      </div>
                      <el-select disabled filterable="false" remote v-model="thirdSelect" placeholder="Select" style="width: 97px"
                        @change="handleCoinsChange">
                        <el-option v-for="item in currenciesTypesStable" :label="item.slug" :value="item.slug">
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
                    <el-button type="primary" link @click="stableMax">Max</el-button>
                    <el-divider direction="vertical" style="height: 22px" />
                  </div>
                  <div class="convert-tip">
                    <div class="tip-left">
                      {{ $t("messages.convert.tip_Available") }} : {{ availableAmount }} {{ thirdSelect }}
                      <span>{{ errorTxtStable }}</span>
                    </div>
                    <div class="tip-right">
                      <a href="/" style="color: #01c19a">{{ $t("messages.convert.deposit") }}</a>
                    </div>
                  </div>
                </div>
                <!-- <template v-if="stableCoinsToOptions.length > 0"> -->
                <div class="exchange-icon">
                  <!-- 中间转换图片 -->
                  <img :src="crypto_buy" @click="switchSelect" />
                </div>
                <div class="pro-input">
                  <div class="input-second-title">{{ $t("messages.convert.receive") }}</div>
                  <el-input v-model="countStable" placeholder="receive" class="change-count clearfloat">
                    <template #append>
                      <div class="option-icon">
                        <img :src="fourthIcon" v-show="fourthIcon" />
                      </div>
                      <el-select disabled filterable="false" remote v-model="fourthSelect" placeholder="Select" style="width: 97px" @change="handleSetRate">
                        <el-option v-for="item in currenciesTypesStable" :label="item.slug" :value="item.slug">
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
                      <template v-if="currentPairStable?.rate && fourthSelect">
                        {{ $t("messages.convert.tip_Estimated") }} : 1 {{ thirdSelect }} ≈ {{ currentPairStable?.rate }}
                        {{ fourthSelect }}
                      </template>
                      <!-- <template v-else>
                        {{ $t("messages.convert.tip_Estimated") }} : This is the exchange message !
                      </template> -->
                      <div style="margin-left: 8px">
                        <img :src="buy_info" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="convert-button">
                  <GetButton :text="text" @click="handleToConvert" />
                </div>
                <!-- </template>
                <template v-else> -->
                <div style="margin-top: 20px" v-if="!userInfoStore.isLogin">
                  <h4 style="font-size: 18px; line-height: 35px">
                    {{ $t("messages.convert.tip_notAvailable") }}
                  </h4>
                  <p> {{ $t("messages.convert.tip_select") }}</p>
                </div>
                <!-- </template> -->
              </div>
            </div>
          </div>
        </div>
        <div class="center-service">
          <div class="service">
            <div class="service-icon">
              <img :src="convert_icon01" />
            </div>
            <div class="service-msg">{{ $t("messages.convert.fees") }}</div>
          </div>
          <div class="service">
            <div class="service-icon">
              <img :src="convert_icon02" />
            </div>
            <div class="service-msg">{{ $t("messages.convert.slippage") }}</div>
          </div>
          <div class="service">
            <div class="service-icon">
              <img :src="convert_icon03" />
            </div>
            <div class="service-msg">{{ $t("messages.convert.pairs") }}</div>
          </div>
        </div>
        <div class="center-faq">
          <convertFAQ></convertFAQ>
        </div>
      </div>
    </div>

    <Footer v-if="windowWidth > 769" />
    <FooterMobile v-if="windowWidth <= 769"></FooterMobile>
  </div>
</template>

<script setup lang="ts">
import _ from "lodash";
import { ref, reactive, onMounted, onUnmounted, computed } from "vue";
import type { Ref } from "vue";
import { useI18n } from "vue-i18n"
import Header from "../../layout/Header/Header.vue";
import FooterMobile from "../../layout/Footer/FooterMobile.vue";
import Footer from "../../layout/Footer/Footer.vue";
import GetButton from "../../components/GetButton.vue";
import convertFAQ from "../../layout/FAQ/convertFAQ.vue";
import { getMyAssets } from "../../api/wallet";
import { queryCurrenciesType } from "../../api/currencies";
import { getBaseCurrency, getExchangeRateForCurrencyPair, exchangeCurrencies } from "../../api/converts";
import type { StableCoinsToOptions, CurrentPair } from "../../models/convert";
import type { AssetsData } from "../../models/assets";
import type { CurrencyType } from "../../models/currencyType";
//img
import convert_icon01 from "../../assets/home/convert_icon01.png";
import convert_icon02 from "../../assets/home/convert_icon02.png";
import convert_icon03 from "../../assets/home/convert_icon03.png";
import part01_BTC from "../../assets/home/part01_BTC.png";
import crypto_icon_usdt from "../../assets/home/crypto_icon_usdt.png";
import crypto_icon_usdc from "../../assets/home/crypto_icon_usdc.png";
import crypto_buy from "../../assets/home/crypto_buy.png";
import buy_info from "../../assets/home/buy_info.svg";
import { useUserInfoStore } from "../../store/user";

const { t } = useI18n();
const windowWidth = ref(window.document.body.offsetWidth);
const options = ref([
  {
    value: "1",
    label: t("messages.convert.convert_Crypto"),
  },
  {
    value: "2",
    label: t("messages.convert.convert_Stablecoins"),
  },
]);
const userInfoStore = useUserInfoStore();
const activeSign = ref("1");
const assetsData = ref<AssetsData[]>([]);
const currenciesTypesCrypto = ref<CurrencyType[]>([])
onMounted(async () => {
  window.addEventListener("resize", resetWidth);
  //
  if(userInfoStore.token){
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
  const res = await queryCurrenciesType()
  console.log(res)
  if (res.status == 200) {
    if (res.data.content) {
      currenciesTypesCrypto.value = res.data.content?.sort((e:CurrencyType, f:CurrencyType)=> e.id-f.id)
    }
  }
});
onUnmounted(() => {
  window.removeEventListener("resize", resetWidth);
});
function resetWidth() {
  windowWidth.value = window.document.body.offsetWidth;
}

const text = computed(()=>{
  if(userInfoStore.isLogin){
    return "Convert"
  } else {
    return "Login to Convert"
  }
})

const switchSelect = () => {
  if (activeSign.value === '1') {
    [firstIcon.value, secondIcon.value] = [secondIcon.value, firstIcon.value];
    [firstSelect.value, secondSelect.value] = [secondSelect.value, firstSelect.value];
    numberCrypto.value = String(countCrypto.value)
    cryptoChange()
  }
  if (activeSign.value === '2') {
    [thirdIcon.value, fourthIcon.value] = [fourthIcon.value, thirdIcon.value];
    [thirdSelect.value, fourthSelect.value] = [fourthSelect.value, thirdSelect.value];
    numberStable.value = String(countStable.value)
    handleSetRate()
  }
}

/** 
 * Crypto 
 */
// const insufficientCrypto = ref("display:none;")
const numberCrypto = ref("0.0000")
// const countCrypto = ref("0.0000")
const firstSelect = ref("")
const secondSelect = ref("")
const firstIcon = ref("")
const secondIcon = ref("")
const availableBalance = computed(()=>{
  const arr = assetsData.value.find((e)=> e.alphabeticCode == firstSelect.value)
  if(arr){
    return Number(arr.balance)
  }
  return 0
})
const errorTxtCrypto = computed(() => {
  if (numberCrypto.value && Number(numberCrypto.value) < 0.00000001) {
    return "Minimum amount: 0.00000001"
  }
  return null
})
const currentPairCrypto = ref<CurrentPair>();
const countCrypto = computed(() => {
  if (numberCrypto.value && currentPairCrypto.value?.rate) {
    return (parseFloat(numberCrypto.value) * parseFloat(currentPairCrypto.value.rate)).toFixed(8)
  } else {
    return "0.0000";
  }
});

const cryptoChange = async () => {
  // 换图标
  if(firstSelect.value && currenciesTypesCrypto.value){
    firstIcon.value = ""
    const arr =  currenciesTypesCrypto.value.find((e)=> e.slug == firstSelect.value )
    if(arr){
      firstIcon.value = arr.icon
    }
  }
  if(secondSelect.value && currenciesTypesCrypto.value){
    secondIcon.value = ""
    const arr = currenciesTypesCrypto.value.find((e)=> e.slug == secondSelect.value )
    if(arr){
      secondIcon.value = arr.icon
    }
  }
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
    currentPairCrypto.value = newObj;
  }
}

const cryptoMax = () => {
  if (currentPairCrypto.value?.maxAmount) {
    numberCrypto.value = String(currentPairCrypto.value?.maxAmount)
  }
}

/** 
 * Stablecoin 
 */
//  const currenciesTypesStable = ref<CurrencyType[]>([
//   { id: 1, slug: "AUD", area: "", icon: crypto_icon_usdc, name:"" }, // AUD
//   { id: 2, slug: "USDT", area: "", icon: part01_BTC, name:"" }
// ])
const currenciesTypesStable = ref<CurrencyType[]>([])
// const insufficientStableCoin = ref("display:none;")
const numberStable = ref("0.0000");
// const countStable = ref("1.0002");
const thirdSelect = ref("AUD");
const fourthSelect = ref("USDT");
const thirdIcon = ref(crypto_icon_usdc)
const fourthIcon = ref(part01_BTC)

const errorTxtStable = computed(() => {
  if (numberStable.value && Number(numberStable.value) < 0.00000001) {
    return "Minimum amount: 0.00000001"
  }
  return null
})
// witch fiat || crypto || stablecoins
// const fiatOptions = computed(() => {
//   if (assetsData.value.length > 0) {
//     return assetsData.value.filter((v) => v.group === "Fiat");
//   } else {
//     return [];
//   }
// });
// const cryptoOptions = computed(() => {
//   if (assetsData.value.length > 0) {
//     return assetsData.value.filter((v) => v.group === "Crypto");
//   } else {
//     return [];
//   }
// });
const stableCoinsOptions = computed(() => {
  if (assetsData.value.length > 0) {
    return assetsData.value.filter((v) => v.group === "Stablecoins");
  } else {
    return [];
  }
});
const stableCoinsToOptions = ref<StableCoinsToOptions[]>([]);
const handleCoinsChange = () => {
  if(thirdSelect.value && currenciesTypesStable.value){
    thirdIcon.value = ""
    const arr =  currenciesTypesStable.value.filter((e)=>{
      return e.slug == thirdSelect.value
    })
    if(arr.length > 0){
      thirdIcon.value = arr[0].icon
    }
  }
  if(fourthSelect.value && currenciesTypesStable.value){
    fourthIcon.value = ""
    const arr = currenciesTypesStable.value.filter((e)=>{
      return e.slug == fourthIcon.value
    })
    if(arr.length > 0){
      fourthIcon.value = arr[0].icon
    }
  }
  getBaseCurrency(thirdSelect.value).then((res) => {
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
const currentPairStable = ref<CurrentPair>();
const handleSetRate = async () => {
  if (thirdSelect.value && fourthSelect.value) {
    const res = await getExchangeRateForCurrencyPair(thirdSelect.value, fourthSelect.value)
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
    currentPairStable.value = newObj;
  }
};
const countStable = computed(() => {
  if (numberStable.value && currentPairStable.value?.rate) {
    return (parseFloat(numberStable.value) * parseFloat(currentPairStable.value.rate)).toFixed(8)
  } else {
    return "0.0000";
  }
});
const availableAmount = computed(() => {
  if (thirdSelect.value && stableCoinsOptions.value.length > 0) {
    let selectOption = stableCoinsOptions.value.find(
      (v) => v.alphabeticCode === thirdSelect.value
    );
    if (selectOption) {
      return parseFloat(selectOption.balance).toFixed(selectOption.minorUnit);
    } else {
      return "0.0000";
    }
  }
});

const stableMax = () => {
  if (currentPairStable.value?.maxAmount) {
    numberStable.value = String(currentPairStable.value.maxAmount)
  }
}

/**
 * convert
*/
const handleToConvert = () => {
  if (numberStable.value) {
    let fromObj = stableCoinsOptions.value.find(
      (v) => v.alphabeticCode === secondSelect.value
    );
    let toObj = assetsData.value.find(
      (v) => v.alphabeticCode === thirdSelect.value
    );
    if (fromObj && toObj && currentPairStable.value) {
      let exchangeData = {
        amount: numberStable.value as string,
        destinationAccountId: toObj.accountId,
        quoteId: currentPairStable.value.quoteId as string,
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
    min-height: calc(100vh - 394px);
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
      padding-top: 48px;
      padding-bottom: 90px;

      @media (max-width: 769px) {
        padding: 0;
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
          top: 55px;
          right: 168px;
          z-index: 1;
          color: #2462f5;
          font-size: $fontSizeDef;
          font-weight: bold;

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