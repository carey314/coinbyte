<template>
  <div>
    <Header v-if="uiStore.showHeaderFooter" />
    <div class="sign-box">
      <div class="sign">
        <div class="sign-title">{{ $t("messages.sign.create") }}</div>
        <div class="sign-radio">
          <el-radio-group v-model="activeSign">
            <el-radio
              :label="option.value"
              v-for="option in options"
              :key="option.value"
            >
              <el-row>
                <el-col span="12">
                  <div class="label">
                    {{ option.label }}
                  </div>
                </el-col>
              </el-row>
            </el-radio>
          </el-radio-group>
          <div
            v-if="activeSign === '1'"
            class="activeNumber"
            style="margin-top: 18px"
          >
            <el-input
              v-model="number"
              :placeholder="t('messages.sign.mobile')"
              class="input-with-select"
            >
              <template #prepend>
                <el-select v-model="numberSelect" placeholder="Select" filterable>
                  <el-option
                    v-for="item in areas"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value"
                    style="width: 358px;"
                  >
                    <span style="float: left">{{ item.label }}</span>
                    <span
                      style="
                        float: right;
                        color: var(--el-text-color-secondary);
                        font-size: 13px;
                      "
                      >{{ item.value }}</span
                    >
                  </el-option>
                </el-select>
              </template>
            </el-input>
          </div>
          <div v-if="activeSign === '2'" class="activeEmail">
            <el-input v-model="email" :placeholder="t('messages.sign.email')">
              <template #prefix>
                <img :src="login_email" />
              </template>
            </el-input>
          </div>
        </div>
        <div class="sign-password">
          <el-input
            v-model="password"
            :type="isShowPass ? 'text' : 'password'"
            :placeholder="t('messages.sign.password')"
          >
            <template #prefix>
              <img :src="login_password" />
            </template>
            <template v-if="!isShowPass" #suffix>
              <img :src="login_eye_off" @click="showPassWord" />
            </template>
            <template v-else #suffix>
              <img
                :src="login_eye_view"
                style="width: 22px; height: 20px"
                @click="showPassWord"
              />
            </template>
          </el-input>
          <div class="password-condition">
            <div class="condition clearfloat">
              <div
                :class="{
                  'satisfy-frame': true,
                  dot: passwordConditions.length,
                }"
              >
                <div class="blank clearfloat"></div>
              </div>
              <div class="satisfy">{{ $t("messages.sign.characters") }}</div>
            </div>
            <div class="condition clearfloat">
              <div
                :class="{
                  'satisfy-frame': true,
                  dot: passwordConditions.lowercase,
                }"
              >
                <div class="blank clearfloat"></div>
              </div>
              <div class="satisfy">{{ $t("messages.sign.lowercase") }}</div>
            </div>
            <div class="condition clearfloat">
              <div
                :class="{
                  'satisfy-frame': true,
                  dot: passwordConditions.uppercase,
                }"
              >
                <div class="blank clearfloat"></div>
              </div>
              <div class="satisfy">{{ $t("messages.sign.uppercase") }}</div>
            </div>
            <div class="condition clearfloat">
              <div
                :class="{
                  'satisfy-frame': true,
                  dot: passwordConditions.number,
                }"
              >
                <div class="blank clearfloat"></div>
              </div>
              <div class="satisfy">{{ $t("messages.sign.number") }}</div>
            </div>
            <!-- <div class="condition clearfloat">
              <div :class="{'satisfy-frame' : true, 'dot' : password.match(/^(?=.*[@$!%*?&]).*$/)}"></div>
              <div class="satisfy">{{ $t('messages.sign.symbol') }}</div>
            </div> -->
          </div>
        </div>
        <div class="sign-referral">
          <el-input
            v-model="optional"
            :placeholder="t('messages.sign.referral')"
          />
        </div>
        <div class="sign-agree clearfloat">
          <div class="agree-frame">
            <el-checkbox v-model="checked" />
          </div>
          <div class="agreement">
            {{ $t("messages.sign.agree") }}
            <a href="" style="color: #01c19a">{{
              $t("messages.sign.Terms")
            }}</a>
            {{ $t("messages.sign.and") }}
            <a href="" style="color: #01c19a"
              >{{ $t("messages.sign.policies") }}
            </a>
          </div>
        </div>
        <div class="sign-button">
          <GetButton :text="t('messages.sign.sign')" @click="handleToSignUp" />
        </div>
        <div class="sign-login">
          <div>
            {{ $t("messages.sign.to_login") }} &nbsp;
            <a href="/login" style="color: #01c19a; text-decoration: none">{{
              $t("messages.sign.login")
            }}</a>
          </div>
        </div>
        <div class="sign-with">
          <el-divider>
            <span>{{ $t("messages.sign.or") }}</span>
          </el-divider>
        </div>
        <div class="sign-other">
          <div class="other-sign">
            <div class="other-sign-icon"><img :src="twitter" /></div>
            <div class="other-sign-name">Twitter</div>
          </div>
          <div class="other-sign">
            <div class="other-sign-icon"><img :src="login_google" /></div>
            <div class="other-sign-name">Google</div>
          </div>
        </div>
      </div>
    </div>
    <Footer v-if="uiStore.showHeaderFooter && windowWidth > 769" />
    <FooterMobile v-if="uiStore.showHeaderFooter && windowWidth <= 769" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onUnmounted, onMounted, watchEffect } from "vue";
import { useUIStore } from '../../store/ui'
import Header from "../../layout/Header/Header.vue";
import FooterMobile from "../../layout/Footer/FooterMobile.vue";
import Footer from "../../layout/Footer/Footer.vue";
import GetButton from "../../components/GetButton.vue";

import login_password from "../../assets/home/login_password.svg";
import login_eye_off from "../../assets/home/login_eye_off.svg";
import login_email from "../../assets/home/login_email.svg";
import login_telegram from "../../assets/home/login_telegram.svg";
import twitter from "../../assets/home/twitter.png";
import login_google from "../../assets/home/login_google.svg";
import login_eye_view from "../../assets/wallet/overview_eye.png";

import { initializeSignUpWizard, signUp, choosePer } from "../../api/user";

import { useFingerprintStore } from "../../store/fingerprint";
import { ElMessage } from "element-plus";

import { useI18n } from "vue-i18n";
const { t } = useI18n();

const fingerprintStore = useFingerprintStore();
const uiStore = useUIStore()

const activeSign = ref("1");
const number = ref("");
const numberSelect = ref("+61");
const areas = [
{ label: "Australia", value: "+61" },
  { label: "United States", value: "+1" },
];
const filterMethod = (query: string, option: any) => {
  return (
    option.label.toLowerCase().indexOf(query.toLowerCase()) >= 0 ||
    option.value.toLowerCase().indexOf(query.toLowerCase()) >= 0
  );
};
const email = ref("");
const password = ref("");
const optional = ref("");
const checked = ref(false);
const text = ref("Sign up");
const isShowPass = ref(false);
const showPassWord = () => {
  isShowPass.value = !isShowPass.value;
};
const passRule = ref([
  {
    rule: /^.{8,32}$/,
    message: "Password length 8 to 32.",
  },
  {
    rule: /^(?=.*[a-z]).*$/,
    message: "Password must have at least one lowercase character.",
  },
  {
    rule: /^(?=.*[A-Z]).*$/,
    message: "Password must have at least one uppercase character.",
  },
  {
    rule: /^(?=.*\d).*$/,
    message: "Password must be at least one number.",
  },
  // {
  //   rule : /^(?=.*[@$!%*?&]).*$/,
  //   message : "Password has at least one symbol."
  // },
]);
const passwordConditions = reactive({
  length: false,
  lowercase: false,
  uppercase: false,
  number: false,
});

watchEffect(() => {
  passwordConditions.length = !!password.value.match(/^.{8,32}$/);
  passwordConditions.lowercase = !!password.value.match(/^(?=.*[a-z]).*$/);
  passwordConditions.uppercase = !!password.value.match(/^(?=.*[A-Z]).*$/);
  passwordConditions.number = !!password.value.match(/^(?=.*\d).*$/);
});

const windowWidth = ref(window.document.body.offsetWidth);
onMounted(() => {
  window.addEventListener("resize", resetWidth);
});
onUnmounted(() => {
  window.removeEventListener("resize", resetWidth);
});
const regUUID = ref("");

onMounted(() => {
  initializeSignUpWizard({
    url: "https://my.b2bdemo-accounting.com/register/{registration}/{code}",
    utm: {
      referral: "",
      uri: "https://my.b2bdemo-accounting.com/en/register",
    },
  })
    .then((res: any) => {
      if ((res.data && res.data.code === 200) || res.data.code === 202) {
        signUp({ wizard_id: 13, uuid: res.data.uuid })
          .then((regRes) => {
            if (regRes.status === 200 || regRes.status === 202) {
              regUUID.value = regRes.data.uuid;
            } else {
              ElMessage({
                message: "Please try again later.",
                type: "error",
              });
            }
          })
          .catch((err) => {
            ElMessage({
              message: "Please try again later.",
              type: "error",
            });
          });
      } else {
        ElMessage({
          message: "Please try again later.",
          type: "error",
        });
      }
    })
    .catch(() => {
      ElMessage({
        message: "Please try again later.",
        type: "error",
      });
    });
});
function resetWidth() {
  windowWidth.value = window.document.body.offsetWidth;
}
const options = ref([
  {
    value: "1",
    label: t("messages.sign.mobile"),
  },
  {
    value: "2",
    label: t("messages.sign.email"),
  },
]);
const handleToSignUp = () => {
  let correctPass = passRule.value.find((v) => !password.value.match(v.rule));
  if (correctPass) {
    ElMessage({
      message: correctPass.message,
      type: "error",
    });
    return;
  }
  signUp({
    wizard_id: 13,
    uuid: regUUID.value,
    email: email.value,
    password: password.value,
    password_confirmation: password.value,
    device_fingerprint: fingerprintStore.fingerprint,
  }).then((res: any) => {
    console.log(res.data);
  });
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
.sign-box {
  display: flex;
  min-height: calc(100vh - 394px);
  align-items: center;
  background: #1d262f;
  padding: 80px 0;
  border-bottom: 1px solid #2e3945;
  @media (max-width: 768px) {
    padding: 0;
  }
  .sign {
    max-width: 438px;
    flex: 1;
    margin: auto;
    background: #fff;
    box-shadow: 0 0 15px 0 rgba(95, 95, 95, 0.19);
    border-radius: 8px;
    padding: 30px 40px 40px 40px;
    @media (max-width: 768px) {
      border-radius: 0px;
    }
    .sign-title {
      font-size: $fontSizeMedPro;
      color: #000000;
      line-height: 34px;
      font-weight: 600;
      text-align: center;
    }
    .sign-radio {
      margin-top: 28px;
      :deep() {
        .el-radio__inner {
          border-color: #dfdfe5;
          border-radius: 3px;
        }
        .el-radio__input.is-checked .el-radio__inner {
          background: #01c19a;
          border-color: #01c19a;
          border-radius: 4px;
        }
        .el-radio__input.is-checked + .el-radio__label {
          color: #000;
        }

        .el-radio-group {
          display: flex;
          justify-content: space-between;
        }
        .el-radio {
          width: 48%;
          margin-right: 0;
          --el-radio-text-color: #c4c9d0;
          // --el-radio-font-size:14px;
        }
        .el-radio__inner::after {
          border-radius: 0px;
        }
      }
      .el-radio {
        height: 48px;
        border: 1px solid #dfdfe5;
        border-radius: 4px;
        padding: 15px;
      }
      .activeNumber {
        .input-with-select {
          :deep() {
            .el-input__inner {
              font-size: $fontSizeMinPro;
              color: #000;
              line-height: 16px;
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
          .el-input-group--prepend > .el-input__wrapper {
            margin-left: 16px;
          }
          .el-select {
            --el-select-input-focus-border-color: none;
          }

          //right input
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
          .el-input__inner {
            font-size: $fontSizeMinPro;
            color: #c4c9d0;
            line-height: 16px;
          }
        }
      }
      .activeEmail {
        margin-top: 18px;
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
    }
    .sign-password {
      margin-top: 17px;
      .password-condition {
        margin-top: 12px;
        .condition {
          margin-top: 9px;
          .dot {
            background-color: #01c19a;
          }
          .satisfy-frame {
            display: flex;
            justify-content: center;
            align-items: center;
            float: left;
            width: 12px;
            height: 12px;
            border-radius: 4px;
            .blank {
              background: #fff;
              width: 3.2px;
              height: 3.2px;
            }
          }
          .satisfy {
            margin-top: -6px;
            float: left;
            margin-left: 10px;
            font-size: $fontSizeMin;
            color: #000000;
            line-height: 22px;
            font-weight: 500;
          }
        }
      }
      :deep() {
        .el-input__wrapper {
          height: 48px;
          padding: 15px;
        }
        .el-input .el-input__clear,
        .el-input .el-input__password {
          font-size: 20px;
        }
        .el-icon svg {
          height: 20px;
          width: 20px;
        }
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
    .sign-referral {
      margin-top: 14px;
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
    .sign-agree {
      margin-top: 26px;
      .agree-frame {
        float: left;
        margin-top: -11px;
        height: 12px;
        :deep() {
          .el-checkbox__inner {
            width: 12px;
            height: 12px;
          }
          .el-checkbox__inner::after {
            height: 5px;
            left: 3px;
          }
          .el-checkbox__inner:hover {
            border-color: #01c19a;
          }
          .el-checkbox__input.is-checked .el-checkbox__inner {
            background-color: #01c19a;
            border-color: #01c19a;
          }
        }
      }
      .agreement {
        font-size: $fontSizeMin;
        color: #6e6e6e;
        line-height: 22px;
        float: left;
        margin-top: -6px;
        margin-left: 10px;
      }
    }
    .sign-button {
      margin-top: 7px;
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
    .sign-login {
      text-align: center;
      margin-top: 22px;
      font-size: $fontSizeMinPro;
      line-height: 16px;
      color: #000;
      font-weight: 500;
    }
    .sign-with {
      margin-top: 29px;
      span {
        font-size: $fontSizeMin;
        line-height: 14px;
        color: #6e6e6e;
      }
      :deep(.el-divider__text.is-center) {
        margin-top: -2px;
      }
    }
    .sign-other {
      margin-top: 18px;
      display: flex;
      cursor: pointer;
      justify-content: space-between;

      .other-sign {
        width: 48%;
        height: 48px;
        border: 1px solid #dfdfe5;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        float: left;
        .other-sign-icon {
          width: 16px;
          height: 16px;
          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }
        .other-sign-name {
          margin-left: 5px;
        }
      }
    }
  }
}

:deep() {
  .el-select-dropdown {
    min-width: 358px !important;
  }
  // .sign-box .sign .sign-radio .activeNumber[data-v-47e17749] .el-input__wrapper{
  //   margin-left: -8px;
  // }

}
</style>
