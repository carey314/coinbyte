<template>
  <div class="deposit-crypto">
    <div v-if="windowWidth > 985">
      <el-row :gutter="80">
        <el-col :span="15" class="left-box">
          <div class="left-header">
            <div class="header-title">Deposit Fiat</div>
            <router-link to="/wallet/DepositCrypto" style="text-decoration: none">
              <div class="header-toFiat">
                <div class="toFiat">
                  Deposit Crypto
                  <el-icon>
                    <Right />
                  </el-icon>
                </div>
              </div>
            </router-link>
          </div>
          <div class="left-center">
            <div class="center-step-box" style="height: 300px">
              <div>
                <el-steps :active="activeStep" direction="vertical" align-center>
                  <el-step title="Select currency">
                    <template #description>
                      <div v-if="activeStep >= 1" class="select">
                        <el-select :disabled="showStepThree" v-model="selectedOption1" placeholder="Select currency"
                          @change="handleContinue">
                          <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
                            <div style="
                                display: flex;
                                align-items: center;
                                gap: 8px;
                              ">
                              <el-avatar :size="26" :src="item.icon" style="margin-right: 8px" />
                              {{ item.label }}
                            </div>
                          </el-option>
                        </el-select>
                      </div>
                    </template>
                  </el-step>
                  <el-step title="Enter Amount" style="margin-top: 20px">
                    <template #description>
                      <div v-if="activeStep === 2 || activeStep === 3" class="select clearfloat"
                        style="position: relative">
                        <div class="enter-amount-tips" @click="dialogVisible = true">
                          <el-icon>
                            <Warning />
                          </el-icon> Transaction
                          requirements
                        </div>
                        <el-dialog v-model="dialogVisible" class="dialog-box" width="30%"
                          style="padding: 0 22px 36px 22px">
                          <template #header>
                            <div class="dialog-header">
                              Transaction requirements
                            </div>
                          </template>
                          <div class="divider"></div>
                          <div class="suggest">Suggested Amount</div>

                          <div class="count-range">A${{ perLimitMin }}-{{ perLimitMax }}</div>
                          <div class="limit requirements">
                            <div class="limit-icon">
                              <el-icon>
                                <Switch />
                              </el-icon>
                            </div>
                            <div class="limit-title">Limit per transaction</div>
                            <div class="limit-count">A${{ perLimitMin }}-{{ perLimitMax }}</div>
                          </div>
                          <div class="remain requirements clearfloat">
                            <div class="limit-icon">
                              <el-icon>
                                <Clock />
                              </el-icon>
                            </div>
                            <div class="limit-title">Remaining daily limit</div>
                            <div class="limit-count">A${{ dailyLimitMax }}</div>
                            <div class="limit-sign">/A$2M</div>
                          </div>
                        </el-dialog>

                        <div class="step-input">
                          <el-input v-model="coinAmount" placeholder="Please enter the amount" @input="enterAmount"
                            class="input" type="number" :disabled="showStepThree" />
                          <div v-for="item in options1" class="label">
                            {{ item.label }}
                          </div>
                        </div>
                        <!-- 输入数值判断 -->
                        <div class="input-rule" v-show="perLimitShow">
                          The limit per transaction is between {{ perLimitMin }}-{{ perLimitMax }} AUD.
                          Please adjust the amount.
                        </div>
                        <div class="input-rule" v-show="dailyLimitShow">
                          The limit per day is {{ dailyLimitMax }} AUD.
                          Please adjust the amount.
                        </div>
                        <div class="enter-amount-rule">
                          <div class="fait-rule-item">
                            <div class="title">Transaction Method:</div>
                            <div class="require">
                              <div class="pay-img">
                                <img :src="crypto_icon_usdt" />
                              </div>
                              <span>PayID/Osko</span>
                            </div>
                          </div>
                          <div class="fait-rule-item" style="padding-bottom: 15px">
                            <div class="title">Transaction Fee:</div>
                            <div class="require">0.00 AUD</div>
                          </div>
                          <div class="receive-box" v-show="activeStep === 2">
                            <el-divider style="width: 62%"></el-divider>
                            <div class="receive">You Receive:</div>
                            <div class="receive-count">
                              <span>{{ receiveAmount }}</span> AUD
                            </div>
                          </div>
                        </div>
                        <el-button v-show="showContinueBtn" class="continue-btn" type="primary" :disabled="!canContinue"
                          @click="handleContinue">
                          Continue
                        </el-button>
                      </div>
                      <el-dialog v-model="dialogContinue" class="dialog-box" width="30%"
                        style="padding: 0 22px 36px 22px">
                        <template #header>
                          <div class="dialog-header-require">
                            Transaction requirements
                          </div>
                        </template>
                        <div class="divider-require"></div>
                        <div class="require-list" v-for="(item, index) in requireList" :key="index">
                          <div class="list-img">
                            <img class="image" :src="item.img" />
                          </div>
                          <div class="list-info">
                            {{ item.info }}<br />{{ item.info2 }}
                          </div>
                        </div>
                        <template #footer>
                          <el-button @click="closeDialog" class="know-btn">OK</el-button>
                        </template>
                      </el-dialog>
                    </template>
                  </el-step>
                  <el-step v-if="showStepThree" title="Transfer Money to Proceed With the Order">
                    <template #description>
                      <div v-if="activeStep === 3 && showStepThree" class="deposit-details clearfloat">
                        <div class="detail-box clearfloat">
                          <div class="detail-box-tips">
                            Please use the PayID detail below to make the
                            transfer and
                            <span>Select the email option, and NOT organisation
                              ID</span>
                            when depositing from online banking or mobile app.
                            How to deposit AUD via PayID/Osko?
                            <span style="text-decoration: underline">Click Here</span>
                          </div>

                          <div class="detail-card">
                            <div class="card-item">
                              <div class="item-title">
                                <div class="item-title-img">
                                  <img :src="crypto_icon_usdt" />
                                </div>
                                <span>AUD</span>
                              </div>
                              <div class="item-count">{{ receiveAmount }}</div>
                            </div>
                            <div class="card-divider"></div>
                            <div class="card-info">
                              <div class="title">PayID Information</div>
                            </div>
                            <div class="indo-detail">
                              <div class="title">user2022@au.coinbyte.com</div>
                              <div class="copy">
                                <el-icon>
                                  <CopyDocument />
                                </el-icon> Copy
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                  </el-step>
                </el-steps>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="9" class="right-box">
          <div class="tips">
            <div class="tips-question">
              <div class="question-title">
                <el-icon>
                  <Upload />
                </el-icon>
              </div>
              <div class="question-content content">Appeal</div>
            </div>
            <div class="tips-faq">
              <div class="faq-title">
                <el-icon>
                  <Opportunity />
                </el-icon> Notice
              </div>
              <el-divider />
              <div class="faq-content content">
                <div>
                  To cover processing costs, a AU$3 processing fee will be
                  charged to refund deposits received from thirdparty bank
                  accounts.
                </div>
                <br />
                <div>
                  Deposits will only be refunded if the deposit is greater than
                  AU$10.
                </div>
                <br />
                <div>
                  Your PayID is generated by CoinByte australia and is solely
                  for accepting AUD deposits into your exchange wallet.
                </div>
                <br />
                <div>
                  This service is supported by CoinByte Australia, in accordance
                  to CoinByte Australia's
                  <span style="cursor: pointer">terms of Use</span> and
                  <span style="cursor: pointer">Privacy Policy</span>.
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="deposit-details clearfloat" v-if="activeStep === 3 && showStepThree">
        <div class="recent-deposit clearfloat">
          <div class="table-name">Recent Deposits</div>
          <div class="not-arrive">Hasn't arrived?</div>
          <Table :sourceData="tableData">
            <template v-slot:columns>
              <el-table-column prop="createTime" :label="t('messages.wallet.fiat_Time')" width="210" />
              <el-table-column prop="creditDetails.currency.alphabeticCode" :label="t('messages.wallet.fiat_Coin')"
                width="210" />
              <el-table-column prop="creditDetails.amount" :label="t('messages.wallet.fiat_Amount')" width="240" />
              <el-table-column prop="status" :label="t('messages.wallet.fiat_Status')" width="230"></el-table-column>
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
                      <p>{{ scope.row.creditDetails?.commission }}</p>
                    </div>
                    <div class="info">
                      <p>Order ID:</p>
                      <p>{{ scope.row.transactionId }}</p>
                    </div>
                  </template>
                </template>
              </el-table-column>
              <el-table-column label="">
                <template #default="scope">
                  <el-button type="text" :class="{
                    icon_button: true,
                    isRotate: isFoldArr.includes(scope.row.key),
                  }" @click="getKey(scope.row.key)"><el-icon style="color: #9b9b9b">
                      <CaretBottom />
                    </el-icon></el-button>
                </template>
              </el-table-column>
            </template>
          </Table>
        </div>
      </div>
    </div>
    <!-- <div v-else></div> -->
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onUnmounted, onMounted, computed, watch } from "vue";
import type { Ref } from "vue";
import {
  Link,
  Right,
  CopyDocument,
  Upload,
  Opportunity,
  Warning,
  Switch,
  Clock,
  CaretBottom,
} from "@element-plus/icons-vue";
import { useWindowSize } from "../../../../hooks/useWindowSize";
import crypto_icon_usdt from "../../../../assets/home/crypto_icon_usdt.png";
import crypto_icon_usdc from "../../../../assets/home/crypto_icon_usdc.png";
import Table from "../component/Table.vue";
import { useI18n } from "vue-i18n";
import requireOne from "../../../../assets/home/part05_icon06.png";
import { Transaction } from "../../../../models/transactions";
import { getDepositTransactions } from "../../../../api/deposit";

const dialogVisible = ref(false);
const dialogContinue = ref(false);

const { t } = useI18n();
const noFound = ref(false);
const coinAmount = ref("");
const receiveAmount = ref("");
const perLimitMin = 50
const perLimitMax = 100000
const perLimitShow = ref(false)
const dailyLimitMax = 2000000
const dailyLimitShow = ref(false)
const windowWidth = useWindowSize().width;
const activeStep = ref(1);
const selectedOption1 = ref("");
const canContinue = ref(false);
const coinAmountDisabled = computed(() => !showStepThree)
let options1 = [
  { value: "AUD", label: "AUD", icon: crypto_icon_usdc }
];

const showStepThree = ref(false);
const showContinueBtn = ref(true);

const enterAmount = () => {
  receiveAmount.value = coinAmount.value
  varify()
}

const varify = () => {
  if (Number(receiveAmount.value) < perLimitMin || Number(receiveAmount.value) > perLimitMax) {
    perLimitShow.value = true
    canContinue.value = !perLimitShow.value
  } else {
    perLimitShow.value = false
    canContinue.value = !perLimitShow.value
  }

  if (Number(receiveAmount.value) > dailyLimitMax) {
    dailyLimitShow.value = true
    canContinue.value = !dailyLimitShow.value
  } else {
    dailyLimitShow.value = false
    canContinue.value = !dailyLimitShow.value
  }
}

async function handleContinue() {
  if (activeStep.value === 1 && selectedOption1.value !== "") {
    activeStep.value = 2;
    options1 = options1.filter((o) => o.value === selectedOption1.value);
  } else if (activeStep.value === 2 && canContinue.value) {
    // 不再隐藏步骤二的内容，直接进入第三步
    console.log(activeStep.value);
    activeStep.value = 3;
    showStepThree.value = true;
    showContinueBtn.value = false; // 隐藏继续按钮
    dialogContinue.value = true;
    // Recent Deposits
    const depositTransactions = await getDepositTransactions(5, 0, "desc", "createTime", "deposit", null, null)
    if (depositTransactions.status === 200) {
      tableData.value = depositTransactions.data.data
    }
  }
}
function closeDialog() {
  dialogContinue.value = false;
}
const requireList = [
  {
    img: requireOne,
    info: "In line with AML/CTF laws, deposits are only accepted from the bank account that is in the same name as the account you have verified on CoinByte.",
  },
  {
    img: requireOne,
    info: "To cover processing costs, a AU$3 processing fee will be charged to refund desposits received from third-party bank accounts",
    info2:
      "Deposits will only be refunded if the deposit is greater than AU$10",
  },
  {
    img: requireOne,
    info: "This service is supported by CoinByte, in accordance to CoinByte's Terms of Use and Privacy Policy.",
  },
  {
    img: requireOne,
    info: "Failed deposits will be returned to the source account within 2 business days",
  },
  {
    img: requireOne,
    info: "You First PayID transfer may take 24 hours to clear subject to your bank's policy.",
    info2: "Subsequent transfers are instant.",
  },
];
const tableData = ref<Transaction[]>([]);
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
  padding-bottom: 100px;

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
      font-weight: bold;
    }

    .header-toFiat {
      width: 128px;
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
          border-image: repeating-linear-gradient(359deg,
              var(--el-text-color-placeholder) 0,
              var(--el-text-color-placeholder) 5px,
              transparent 0,
              transparent 10px) 30 12;
          background-color: transparent;

          .el-step__line-inner {
            display: none;
          }
        }
      }

      .select {
        position: relative;
        margin-top: 20px;

        :deep() {
          .el-select .el-input__wrapper {
            width: 442px;
            height: 48px;
          }
        }

        .enter-amount-tips {
          cursor: pointer;
          float: left;
          margin-top: -45px;
          margin-left: 260px;
          font-size: 14px;
          color: #878787;
        }

        .dialog-box {
          .dialog-header {
            font-weight: 500;
            size: 20px;
            color: #000000;
            line-height: 25px;
          }

          .divider {
            height: 1px;
            width: 100%;
            background-color: #dfdfe5;
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
            margin: 23px auto;
            align-items: center;
            padding: 13px 14px 14px 14px;

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
          margin-top: 20px;

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
          margin-top: 10px;
          font-size: 20px;
        }
      }

      .deposit-details {

        // position: relative;
        .detail-box {
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
  }
}

.recent-deposit {
  font-size: 26px;
  color: #000000;
  line-height: 32px;
  font-weight: 500;
  margin-top: 400px;

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
    .tips-question {
      .question-title {
        float: left;
      }

      .question-content {
        margin-left: 20px;
        font-size: 14px;
        color: #878787;
        line-height: 16px;
      }
    }

    .tips-faq {
      margin-top: 30px;

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

        span {
          color: #01c19a;
        }
      }
    }
  }
}

.step-input {
  position: relative;

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

.input-rule {
  font-size: 16px;
  color: #f35854;
  line-height: 18px;
  width: 442px;
  margin-top: 15px;
}

.dialog-header-require {
  font-size: 20px;
  color: #000000;
  line-height: 25px;
}

.divider-require {
  height: 1px;
  width: 100%;
  background-color: #dfdfe5;
}

.require-list {
  margin-top: 24px;
  padding: 5px 20px;
  display: flex;
  justify-content: space-around;

  .image {
    width: 36px;
    height: auto;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .list-info {
    font-size: 14px;
    color: #878787;
    line-height: 20px;
    margin-left: 17px;
    width: 100%;
    word-break: break-all;
  }
}

.know-btn {
  width: 100% !important;
  height: 48px !important;
  border-radius: 4px;
  border: 1px solid #dfdfe5;
  background-color: #01c19a;
  color: #fff;
}
</style>
