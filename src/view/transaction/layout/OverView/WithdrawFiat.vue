<template>
  <div class="deposit-crypto">
    <div v-if="windowWidth > 985">
      <el-row :gutter="80">
        <el-col :span="15" class="left-box">
          <div class="left-header">
            <div class="header-title">Withdraw Fiat</div>
            <router-link
              to="/wallet/WithdrawCrypto"
              style="text-decoration: none"
            >
              <div class="header-toFiat">
                <div class="toFiat">
                  Withdraw Crypto
                  <el-icon>
                    <Right />
                  </el-icon>
                </div>
              </div>
            </router-link>
          </div>
          <div class="left-center">
            <div class="center-step-box" style="height: 300px">
              <div v-if="withdrawStatus === false">
                <el-steps
                  :active="activeStep"
                  direction="vertical"
                  align-center
                >
                  <el-step title="Select currency" class="select">
                    <template #description>
                      <div v-if="activeStep >= 1">
                        <el-select
                          v-model="selectedOption1"
                          placeholder="Select currency"
                          @change="handleContinue"
                          style="margin-top: 20px"
                        >
                          <el-option
                            v-for="item in options1"
                            :key="item.alphabeticCode"
                            :label="item.alphabeticCode"
                            :value="item.alphabeticCode"
                          >
                            <div
                              style="
                                display: flex;
                                align-items: center;
                                gap: 8px;
                              "
                            >
                              <el-avatar
                                :size="26"
                                src="asdfasdf"
                                style="margin-right: 8px"
                              />
                              {{ item.alphabeticCode }}
                            </div>
                          </el-option>
                        </el-select>
                      </div>
                    </template>
                  </el-step>
                  <el-step title="Enter Amount" style="margin-top: 25px">
                    <template #description>
                      <div
                        v-if="activeStep === 2 || activeStep === 3"
                        class="select clearfloat"
                        style="position: relative"
                      >
                        <div
                          class="enter-amount-tips"
                          @click="dialogVisible = true"
                        >
                          <el-icon><Warning /></el-icon> Transaction
                          requirements
                        </div>
                        <el-dialog
                          v-model="dialogVisible"
                          class="dialog-box"
                          width="30%"
                          style="padding-bottom: 36px"
                        >
                          <template #header>
                            <div class="dialog-header">
                              Transaction requirements
                            </div>
                          </template>
                          <div class="divider"></div>
                          <div class="suggest">Suggested Amount</div>

                          <div class="count-range">A$50-2,000,000</div>
                          <div class="limit requirements">
                            <div class="limit-icon">
                              <el-icon><Switch /></el-icon>
                            </div>
                            <div class="limit-title">Limit per transaction</div>
                            <div class="limit-count">A$50-1,000,000,000</div>
                          </div>
                          <div class="remain requirements clearfloat">
                            <div class="limit-icon">
                              <el-icon><Clock /></el-icon>
                            </div>
                            <div class="limit-title">Remaining daily limit</div>
                            <div class="limit-count">A$2,000,000</div>
                            <div class="limit-sign">/A$2M</div>
                          </div>
                        </el-dialog>

                        <div class="step-input">
                          <el-input
                            v-model="coinAmount"
                            placeholder="Please enter the amount"
                            @change="updateCanContinue"
                            class="input"
                          />
                          <div v-for="item in options1" class="label">
                            {{ item.alphabeticCode }}
                          </div>
                        </div>

                        <div class="enter-amount-rule">
                          <div class="available">
                            <div class="title">
                              Available: <span>531.6517381 AUD</span>
                            </div>
                          </div>
                          <div class="divider" style="width: 61%"></div>
                          <div class="fait-rule-item">
                            <div class="title">Account Number:</div>
                            <div class="require">
                              <span>436*213</span>
                              <div
                                class="edit-info"
                                @click="editVisible = true"
                              >
                                Edit
                              </div>
                              <el-dialog
                                v-model="editVisible"
                                class="edit-dialog"
                                width="30%"
                                style="padding-bottom: 14px"
                              >
                                <div class="iamge">
                                  <img :src="crypto_icon_usdt" />
                                </div>
                                <div class="delete">Delete Bank Account</div>

                                <div class="content">
                                  To add a new account, you need to delete this
                                  account first. Please note that you can only
                                  Add one new account within 24 hours. Are you
                                  sure you want to delete this bank account
                                  (462**215)?
                                </div>
                                <template #footer>
                                  <div
                                    class="dialog-footer"
                                    style="text-align: center"
                                  >
                                    <el-button
                                      @click="editVisible = false"
                                      style="height: 48px; width: 47%"
                                      >Cancel</el-button
                                    >
                                    <el-button
                                      type="primary"
                                      style="height: 48px; width: 47%"
                                      @click="editVisible = false"
                                    >
                                      Confirm
                                    </el-button>
                                  </div>
                                </template>
                              </el-dialog>
                            </div>
                          </div>
                          <div class="fait-rule-item">
                            <div class="title">Transaction Method:</div>
                            <div class="require">
                              <div class="pay-img">
                                <img :src="crypto_icon_usdt" />
                              </div>
                              <span>PayID/Osko</span>
                            </div>
                          </div>
                          <div class="fait-rule-item">
                            <div class="title">Transaction Fee:</div>
                            <div class="require">0.00 AUD</div>
                          </div>
                          <el-divider style="width: 61%"></el-divider>
                          <div class="receive-box">
                            <div class="receive">You Receive:</div>
                            <div class="receive-count">
                              <span>0.00</span> AUD
                            </div>
                          </div>
                        </div>
                        <el-button
                          class="continue-btn"
                          type="primary"
                          :disabled="!canContinue"
                          @click="handleContinue"
                        >
                          Continue
                        </el-button>
                      </div>
                      <el-dialog
                        v-model="continueVisible"
                        class="continue-dialog-box"
                        width="30%"
                      >
                        <template #header>
                          <div class="dialog-header">
                            Withdrawal Confirmation
                          </div>
                        </template>

                        <div class="divider"></div>
                        <div class="receive">Your receive</div>
                        <div class="confirm-count">
                          1000.00 <span>AUD</span>
                        </div>
                        <div class="detail-rules">
                          <div class="rule-item">
                            <div class="title">Receiver's Name</div>
                            <div class="require">Ausun Overseas Pty Ltd</div>
                          </div>
                          <div class="rule-item">
                            <div class="title">Bank Name</div>
                            <div class="require">Others</div>
                          </div>
                          <div class="rule-item">
                            <div class="title">BSB</div>
                            <div class="require">123-123</div>
                          </div>
                          <div class="rule-item">
                            <div class="title">Account Number</div>
                            <div class="require">436*123</div>
                          </div>
                          <div class="rule-item">
                            <div class="title">Fee</div>
                            <div class="require">0.00 AUD</div>
                          </div>
                          <div class="rule-item">
                            <div class="title">Indicated Amount</div>
                            <div class="require">1000 AUD</div>
                          </div>
                        </div>
                        <template #footer>
                          <div class="dialog-footer">
                            <el-button @click="continueVisible = false"
                              >Cancel</el-button
                            >
                            <el-button
                              type="primary"
                              @click="innerVisible = true"
                            >
                              Confirm
                            </el-button>
                            <el-dialog
                              class="inner-dialog"
                              v-model="innerVisible"
                              width="32%"
                              title="Inner Dialog"
                              append-to-body
                            >
                              <template #header>
                                <div style="font-weight: 600">
                                  Security Verification
                                </div>
                              </template>

                              <div class="divider"></div>
                              <div class="receive">
                                To secure your account. please complete the
                                following Verificatio.
                              </div>
                              <div class="identify-box">
                                <div class="func-text">
                                  Enter the 6-digit code sent to 481***1234
                                </div>
                                <div class="container">
                                  <input
                                    class="container-input"
                                    v-model="inputValue"
                                    type="text"
                                    placeholder="Phone Number Verification Code"
                                  />
                                  <el-button
                                    class="send-btn"
                                    key="button.text"
                                    type="success"
                                    link
                                    >Send</el-button
                                  >
                                </div>
                              </div>

                              <div class="identify-box">
                                <div class="func-text">
                                  Enter the 6-gigit code sent to aar***@bitu.co
                                </div>
                                <div class="container">
                                  <input
                                    class="container-input"
                                    v-model="inputValue"
                                    type="text"
                                    placeholder="Email Verification Code"
                                  />
                                  <el-button
                                    class="send-btn"
                                    key="button.text"
                                    type="success"
                                    link
                                    >Send</el-button
                                  >
                                </div>
                              </div>

                              <div class="identify-box">
                                <div class="func-text">
                                  Enter the 6-digit code form authenticator
                                </div>
                                <div class="container">
                                  <input
                                    class="container-input"
                                    v-model="inputValue"
                                    type="text"
                                    placeholder="Google verification code"
                                  />
                                  <el-button
                                    class="send-btn"
                                    key="button.text"
                                    type="success"
                                    link
                                    >Send</el-button
                                  >
                                </div>
                              </div>

                              <div class="security">
                                Security verification unavailable?
                              </div>
                              <el-button
                                class="submit-btn"
                                @click="handleSubmit"
                              >
                                Submit
                              </el-button>
                            </el-dialog>
                          </div>
                        </template>
                      </el-dialog>
                    </template>
                  </el-step>
                  <!-- <el-step
                    v-if="showStepThree"
                    title="Transfer Money to Proceed With the Order"
                  >
                    <template #description>
                      <div
                        v-if="activeStep === 3 && showStepThree"
                        class="deposit-details clearfloat"
                      >
                        <div class="select clearfloat">
                          <el-select
                            class="select-second"
                            style="margin-top: 20px"
                            v-model="selectedOption2"
                            placeholder="Select Network"
                            @change="updateCanContinue"
                          >
                            <el-option
                              v-for="item in options2"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            ></el-option>
                          </el-select>

                          <div class="detail-box clearfloat">
                            <div class="detail-box-tips">
                              Please use the PayID detail below to make the
                              transfer and
                              <span
                                >Select the email option, and NOT organisation
                                ID</span
                              >
                              when depositing from online banking or mobile app.
                              How to deposit AUD via PayID/Osko?
                              <span style="text-decoration: underline"
                                >Click Here</span
                              >
                            </div>

                            <div class="detail-card">
                              <div class="card-item">
                                <div class="item-title">
                                  <div class="item-title-img">
                                    <img :src="crypto_icon_usdt" />
                                  </div>
                                  <span>AUD</span>
                                </div>
                                <div class="item-count">10,000.00</div>
                              </div>
                              <div class="card-divider"></div>
                              <div class="card-info">
                                <div class="title">PayID Information</div>
                              </div>
                              <div class="indo-detail">
                                <div class="title">
                                  user2022@au.coinbyte.com
                                </div>
                                <div class="copy">
                                  <el-icon><CopyDocument /></el-icon> Copy
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                  </el-step> -->
                </el-steps>
              </div>

              <div v-else>
                <div class="success-box">
                  <img :src="success_img" />
                  <div class="success-title">Withdraw Successful</div>
                  <div class="success-tip">
                    Withdrawal request submitted.<br />
                    Visit History to view your order status.
                  </div>
                  <div class="success-people">Recipient amount</div>
                  <div class="success-account">
                    <img src="" />
                    999.00 USDT
                  </div>
                  <div class="detail-rules">
                    <div class="rule-item">
                      <div class="title">Bank account</div>
                      <div class="require">462*125</div>
                    </div>
                    <div class="rule-item">
                      <div class="title">Type</div>
                      <div class="require">Bank Transfer</div>
                    </div>
                    <div class="rule-item">
                      <div class="title">Transaction fees</div>
                      <div class="require">0.00 AUD</div>
                    </div>
                  </div>
                </div>
                <el-divider style="width: 65%" />
                <div class="rate">Rate your experience</div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="9" class="right-box">
          <div class="tips">
            <div class="tips-faq">
              <div class="faq-title">FAQ</div>
              <div class="faq-content content">
                <el-collapse v-model="faqActiveName" accordion>
                  <el-collapse-item title="What is PayID/Osko?" name="1">
                    <div class="faq-text">
                      PayID/Osko is a bank transfer method supported by over 100
                      Australian banks and financial institutions. PayID/Osko
                      withdrawals are free and available anytime.
                    </div>
                  </el-collapse-item>
                  <el-collapse-item
                    title="How long does the Withdrawal take?"
                    name="2"
                  >
                    <div class="faq-text">
                      Operation feedback: enable the users to clearly perceive
                      their operations by style updates and interactive effects;
                    </div>
                  </el-collapse-item>
                  <el-collapse-item
                    title="How much is the withdrawal fee?"
                    name="3"
                  >
                    <div class="faq-text">
                      Simplify the process: keep operating process simple and
                      intuitive;
                    </div>
                  </el-collapse-item>
                  <el-collapse-item
                    title="How do I link my Australian bank account?"
                    name="4"
                  >
                    <div class="faq-text">
                      Decision making: giving advices about operations is
                      acceptable, but do not make decisions for the users;
                    </div>
                  </el-collapse-item>
                  <el-collapse-item
                    title="How to Withdraw AUD from CoinByte.com"
                    name="5"
                  >
                    <div class="faq-text">
                      Decision making: giving advices about operations is
                      acceptable, but do not make decisions for the users;
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <div
        class="deposit-details clearfloat"
        v-if="activeStep === 3 && showStepThree"
      >
        <div class="recent-deposit">
          <div class="table-name">Recent Deposits</div>
          <div class="not-arrive">Hasn't arrived?</div>
          <Table :sourceData="tableData">
            <template v-slot:columns>
              <el-table-column
                prop="time"
                :label="t('messages.wallet.fiat_Time')"
                width="210"
              />
              <el-table-column
                prop="coin"
                :label="t('messages.wallet.fiat_Coin')"
                width="210"
              />
              <el-table-column
                prop="amount"
                :label="t('messages.wallet.fiat_Amount')"
                width="240"
              />
              <el-table-column
                :label="t('messages.wallet.fiat_Status')"
                width="230"
              >
                <template #default="scope">
                  <div
                    v-if="scope.row.status === 'Successful'"
                    style="color: #01c19a"
                  >
                    Successful
                  </div>
                  <div v-else-if="scope.row.status === 'Faild'">Faild</div>
                </template>
              </el-table-column>
              <el-table-column :label="t('messages.wallet.fiat_Information')">
                <template #default="scope">
                  <template v-if="!isFoldArr.includes(scope.row.key)">
                    <div class="info">
                      <p>Payment Method:</p>
                      <p>{{ scope.row.payment_method }}</p>
                    </div>
                  </template>
                  <template v-else>
                    <div class="info">
                      <p>Payment Method:</p>
                      <p>{{ scope.row.payment_method }}</p>
                    </div>
                    <div class="info">
                      <p>indicated Amount:</p>
                      <p>{{ scope.row.indicated_amount }}</p>
                    </div>
                    <div class="info">
                      <p>Fee:</p>
                      <p>{{ scope.row.fee }}</p>
                    </div>
                    <div class="info">
                      <p>Order ID:</p>
                      <p>{{ scope.row.order_ID }}</p>
                    </div>
                  </template>
                </template>
              </el-table-column>
              <el-table-column label="">
                <template #default="scope">
                  <el-button
                    type="text"
                    :class="{
                      icon_button: true,
                      isRotate: isFoldArr.includes(scope.row.key),
                    }"
                    @click="getKey(scope.row.key)"
                    ><el-icon style="color: #9b9b9b"><CaretBottom /></el-icon
                  ></el-button>
                </template>
              </el-table-column>
            </template>
          </Table>
        </div>
      </div>
    </div>
    <div v-else></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import {
  Right,
  Warning,
  Switch,
  Clock,
  CaretBottom,
} from "@element-plus/icons-vue";
import { useWindowSize } from "../../../../hooks/useWindowSize";
import success_img from "../../../..//assets/deposit/Successful.png";
import crypto_icon_usdt from "../../../../assets/home/crypto_icon_usdt.png";
import Table from "../component/Table.vue";
import { useI18n } from "vue-i18n";
import { useUserInfoStore } from "../../../../store/user";
import { getMyAssets } from "../../../../api/wallet";
import type { AssetsData } from "../../../../models/assets";
import type { CurrencyType } from "../../../../models/currencyType";
import { queryCurrenciesType } from "../../../../api/currencies";

const inputValue = ref("");
const dialogVisible = ref(false);
const editVisible = ref(false);
const continueVisible = ref(false);
const innerVisible = ref(false);

const { t } = useI18n();

const windowWidth = useWindowSize().width;
const activeStep = ref(1);
const selectedOption1 = ref("");
const selectedOption2 = ref("");
const canContinue = ref(false);
let options1 = ref<AssetsData[]>([]);
let options2 = [
  { value: "optionA", label: "Polygon" },
  { value: "optionB", label: "Solana" },
  { value: "optionC", label: "Tezos" },
  { value: "optionD", label: "Tron(TRC20)" },
];
const coinAmount = ref("");
const faqActiveName = ref("1");
const showStepThree = ref(false);
const showContinueBtn = ref(true);
const withdrawStatus = ref(false);

const userInfoStore = useUserInfoStore();
const assetsData = ref<AssetsData[]>([]);
const currenciesTypes = ref<CurrencyType[]>([])
onMounted(async ()=>{
  //
  const res = await queryCurrenciesType()
  if (res.status == 200) {
    if (res.data.content) {
      currenciesTypes.value = res.data.content
    }
  }
  //
  if(userInfoStore.token){
    getMyAssets().then((res) => {
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
        // 
        options1.value = assetsData.value.filter((e)=> e.group === "Fiat" && Number(e.balance) > 0)
      }
    });
  }
})

function handleSubmit() {
  withdrawStatus.value = true;
  innerVisible.value = false;
}
function handleContinue() {
  if (activeStep.value === 1 && selectedOption1.value !== "") {
    activeStep.value = 2;
    // options1 = options1.filter((o) => o.value === selectedOption1.value);
  } else if (activeStep.value === 2 && canContinue.value) {
    activeStep.value = 3;
    showStepThree.value = true;
    continueVisible.value = true;
  }
}

function updateCanContinue() {
  canContinue.value = selectedOption2.value !== null;
}
const tableData = ref([
  {
    time: "2023-04-20 20:22",
    coin: "USDT",
    icon: "crypto_icon_usdt",
    amount: "33399.567 USDT",
    status: "Successful",
    payment_method: "PayID/Osko",
    indicated_amount: "3800.00",
    TxID: "TXRLV…aAjr7",
    order_ID: "PAC23212232112121211",
    key: "1",
    network: "Tron(TRC20)",
    address: "Cf9044…104a5f",
    wallet: "Trading Wallet",
  },
  {
    time: "2023-04-20 20:22",
    coin: "USDT",
    amount: "33399.567 USDT",
    status: "Successful",
    payment_method: "PayID/Osko",
    indicated_amount: "3800.00",
    TxID: "TXRLV…aAjr7",
    order_ID: "PAC23212232112121211",
    key: "2",
    network: "Tron(TRC20)",
    address: "Cf9044…104a5f",
    wallet: "Trading Wallet",
  },
  {
    time: "2023-04-20 20:22",
    coin: "USDT",
    amount: "33399.567 USDT",
    status: "Successful",
    payment_method: "PayID/Osko",
    indicated_amount: "3800.00",
    TxID: "TXRLV…aAjr7",
    order_ID: "PAC23212232112121211",
    key: "3",
    network: "Tron(TRC20)",
    address: "Cf9044…104a5f",
    wallet: "Trading Wallet",
  },
]);
const isFoldArr = ref<string[]>([]);
const getKey = (key: string) => {
  let index = isFoldArr.value.indexOf(key);
  if (index >= 0) {
    isFoldArr.value.splice(index, 1);
  } else {
    isFoldArr.value.push(key);
  }
};
</script>

<style scoped lang="scss">
$fontColor: #878787;
$fontSizeMed: 26px;
$fontSizeDefPro: 20px;
$fontSizeDef: 16px;
$fontSizeMinPro: 14px;
$fontSizeMin: 12px;
.deposit-crypto {
  margin-top: 20px;
  padding-bottom: 250px;
  :deep() {
    .el-button.is-disabled,
    .el-button.is-disabled:focus,
    .el-button.is-disabled:hover {
      background-color: #f1f1f1;
      color: #cbcccf;
      border: none;
      font-size: 20px;
    }
    .el-button--primary {
      --el-button-hover-bg-color: #01c19a;
    }
    .el-step.is-vertical .el-step__title {
      font-size: 20px;
    }
    .el-step__title.is-finish {
      color: #000;
      font-weight: 500;
    }
    .el-step__title.is-process {
      font-weight: 500;
      color: #9b9b9b;
    }
    .el-dialog__body {
      padding: 0;
    }
  }
}
.left-box {
  padding-left: 60px !important;
  .left-header {
    display: flex;
    justify-content: space-between;
    .header-title {
      font-size: $fontSizeMed;
      color: #000;
      line-height: 32px;
      font-weight: 500;
    }
    .header-toFiat {
      // width: 128px;
      padding: 0px 13px 11px 10px;
      height: 36px;
      background-color: #f7f7f7;
      color: #01c19a;
      border-radius: 8px;
      .toFiat {
        cursor: pointer;
        height: 36px;
        font-size: $fontSizeMinPro;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  .left-center {
    .center-step-box {
      margin-top: 23px;
      :deep() {
        .el-step__line {
          border-left: 2px dashed var(--el-text-color-placeholder);
          border-image: repeating-linear-gradient(
              359deg,
              var(--el-text-color-placeholder) 0,
              var(--el-text-color-placeholder) 5px,
              transparent 0,
              transparent 10px
            )
            30 12;
          background-color: transparent;
          .el-step__line-inner {
            display: none;
          }
        }
      }
      .select {
        position: relative;
        :deep() {
          .el-select .el-input__wrapper {
            width: 442px;
            height: 48px;
          }
        }

        .enter-amount-tips {
          cursor: pointer;
          font-size: 14px;
          color: #878787;
          position: absolute;
          left: 260px;
          top: -40px;
        }
        .dialog-box {
          .dialog-header {
            font-weight: 500;
            size: 20px;
            color: #000000;
            line-height: 25px;
          }

          .suggest {
            text-align: center;
            font-size: 14px;
            color: #878787;
            line-height: 16px;
            margin-top: 24px;
          }
          .count-range {
            font-size: 20px;
            text-align: center;
            color: #01c19a;
            margin-top: 12px;
            line-height: 25px;
          }
          .requirements {
            background: #f7f7f7;
            border-radius: 8px;
            height: 67px;
            margin: 23px 10px;
            align-items: center;
            padding: 13px 14px 14px 14px;
            // @media (max-width: 1440px) {
            //   width: 100%;
            // }
            .limit-icon {
              float: left;

              margin-top: 16px;
            }
            .limit-title {
              font-size: 12px;
              color: #878787;
              line-height: 15px;
              margin-left: 30px;
            }
            .limit-count {
              font-size: 16px;
              color: #000000;
              line-height: 19px;
              margin-left: 30px;
              margin-top: 10px;
            }
            .limit-sign {
              float: right;
              font-size: 12px;
              color: #878787;
              margin-top: -12px;
            }
          }
        }
        .enter-amount-rule {
          .available {
            padding: 10px 0 20px 0;
            .title {
              font-size: 14px;
              color: #878787;

              span {
                color: #01c19a;
              }
            }
          }
          .fait-rule-item {
            width: 442px;
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            color: #878787;
            margin-top: 15px;
            span {
              color: #000000;
              font-weight: 500;
            }
            .require {
              .edit-info {
                float: right;
                padding-left: 5px;
                text-decoration: underline;
                cursor: pointer;
                color: #01c19a;
              }
              .edit-dialog {
                .iamge {
                  text-align: center;
                  margin-top: 10px;
                }
                .delete {
                  font-size: 18px;
                  color: #000000;
                  line-height: 23px;
                  text-align: center;
                  padding: 16px 0 20px 0;
                }
                .content {
                  text-align: center;
                  font-size: 14px;
                  overflow-wrap: break-word;
                  color: #9b9b9b;
                  line-height: 16px;
                  padding: 0 30px 32px 30px;
                }
                .dialog-footer {
                  text-align: center;
                  .dialog-footer button:first-child {
                    margin-right: 10px;
                  }
                }
              }
              .pay-img {
                width: 20px;
                height: 20px;
                display: flex;
                float: left;
                margin-top: -5px;
                margin-right: 4px;
                img {
                  width: 100%;
                  height: 100%;
                  object-fit: contain;
                }
              }
            }
          }
          .receive-box {
            .receive {
              font-size: 16px;
              color: #000000;
              line-height: 18px;
            }
            .receive-count {
              font-size: 14px;
              color: #000000;
              margin-top: 12px;
              span {
                font-size: 28px;
                color: #000000;
                line-height: 34px;
                font-weight: 600;
              }
            }
          }
        }
        .continue-btn {
          width: 442px;
          height: 60px;

          font-size: 20px;
        }
      }
      .continue-dialog-box {
        .dialog-header {
          font-weight: 600;
        }
        .receive {
          font-size: 14px;
          color: #878787;
          text-align: center;
          margin-top: 24px;
        }
        .confirm-count {
          color: #01c19a;
          font-size: 32px;
          font-weight: 600;
          text-align: center;
          margin-top: 10px;
          span {
            font-size: 14px;
          }
        }
        .detail-rules {
          margin-top: 23px;
          background: #f7f7f7;
          border-radius: 8px;
          padding: 10px 17px;
          margin-left: 23px;
          margin-right: 23px;
          .rule-item {
            display: flex;
            justify-content: space-between;
            .title {
              font-size: $fontSizeMinPro;
              color: #878787;
              line-height: 32px;
            }
            .require {
              font-size: $fontSizeMinPro;
              color: #000000;
              line-height: 32px;
            }
          }
        }
      }
      .deposit-details {
        // position: relative;
        .detail-box {
          margin-top: -90px;
          .detail-box-tips {
            margin-top: 10px;
            background: #fef9e0;
            border-radius: 4px;
            width: 443px;
            padding: 14px 4px 8px 13px;
            font-size: 12px;
            color: #878787;
            line-height: 16px;
            span {
              color: #01c19a;
              text-decoration-line: underline;
              cursor: pointer;
            }
          }

          .detail-card {
            margin-top: 23px;
            width: 443px;
            background: #f7f7f7;
            border-radius: 4px;
            padding: 10px 17px;
            .card-item {
              display: flex;
              justify-content: space-between;
              padding-bottom: 14px;
              .item-title {
                font-size: 14px;
                color: #000000;
                line-height: 17px;
                display: flex;
                align-items: center;
                span {
                  padding-left: 12px;
                  font-weight: 600;
                }
                .item-title-img {
                  width: 26px;
                  height: 26px;
                  img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                  }
                }
              }
              .item-count {
                font-size: 22px;
                color: #000000;
                line-height: 27px;
              }
            }
            .card-divider {
              width: 100%;
              height: 1px;
              background-color: #ebebeb;
            }
            .card-info {
              padding-top: 13px;
              .title {
                font-size: 12px;
                color: #878787;
              }
            }
            .indo-detail {
              padding: 13px 15px 17px 0px;
              .title {
                font-size: 14px;
                color: #000000;
                float: left;
              }
              .copy {
                font-size: 12px;
                color: #000000;
                float: right;
              }
            }
          }
        }
      }
    }
    .divider {
      height: 1px;
      width: 100%;
      background-color: #dfdfe5;
    }
  }
}
.recent-deposit {
  font-size: 26px;
  color: #000000;
  line-height: 32px;
  font-weight: 500;
  margin-top: 280px;
  .not-arrive {
    float: right;

    font-size: 14px;
    color: #9b9b9b;
    line-height: 16px;
    text-decoration: underline #9b9b9b;
  }
}
.right-box {
  .tips {
    .tips-faq {
      .faq-title {
        font-size: 20px;
        color: #000000;
        line-height: 25px;
        font-weight: 500;
      }
      :deep() {
        .el-divider--horizontal {
          margin: 18px 0;
        }
      }
      .faq-content {
        font-size: 16px;
        color: #878787;
        letter-spacing: 0;
        line-height: 18px;
        margin-top: 17px;
        span {
          color: #01c19a;
        }
        .faq-text {
          color: #878787;
        }
      }
    }
  }
}
.inner-dialog {
  .divider {
    width: 100%;
    height: 1px;
    background-color: #ebebeb;
    margin-top: -20px;
  }
  .receive {
    margin-top: 21px;
    font-size: 13px;
    color: #878787;
    line-height: 32px;
  }
  .identify-box {
    .func-text {
      font-size: 14px;
      color: #878787;
      line-height: 32px;
      margin-top: 14px;
    }
    .container {
      position: relative;
      .container-input {
        width: 100%;
        height: 48px;
        border-radius: 4px;
        border: 1px solid #dfdfe5;
        margin-top: 5px;
      }
      .send-btn {
        position: absolute;
        right: 15px;
        top: 20px;
        color: #01c19a;
      }
    }
  }
}
.security {
  font-size: 14px;
  color: #01c19a;
  text-align: center;
  margin-top: 18px;
}
.submit-btn {
  height: 48px;
  margin-top: 8px;
  width: 100%;
  background-color: #01c19a;
  font-size: 18px;
  color: #fff;
  line-height: 23px;
}
.step-input {
  position: relative;
  margin-top: 18px;
  .input {
    width: 442px;
    height: 48px;
  }
  .label {
    position: absolute;
    left: 400px;
    top: 15px;
    color: #9b9b9b;
  }
}
.success-box {
  width: 65%;
  text-align: center;
  .success-title {
    margin-top: 25px;
    font-size: 28px;
    color: #000000;
    font-weight: bold;
  }
  .success-tip {
    font-size: 16px;
    color: #878787;
    margin-top: 10px;
  }
  .success-people {
    font-size: 16px;
    color: #878787;
    margin-top: 17px;
  }
  .success-account {
    font-size: 22px;
    color: #000000;
    line-height: 27px;
    font-weight: bold;
    margin-top: 10px;
  }
  .rate {
    font-size: 18px;
    color: #000000;
    line-height: 23px;
    width: 65%;
    text-align: center;
  }
  .detail-rules {
    background: #f7f7f7;
    border-radius: 5px;
    padding: 12px 19px;
    margin-top: 18px;
    .rule-item {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      gap: 30px;
      .title {
        color: #878787;
      }
    }
  }
}
</style>
