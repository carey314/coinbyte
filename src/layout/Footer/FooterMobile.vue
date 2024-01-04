<template>
  <footer>
    <div class="footer-links">
      <div class="footer-logoinfo">
        <img class="logo" :src="logo" alt="logo" />
        <div class="lan-box">
          <div class="lan-icon">
            <img :src="top_en" alt="" />
          </div>
          <el-select
            v-model="currentLanguage"
            class="selectLan"
            placeholder="Select"
            size="large"
            @change="changeLanguage"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <div class="link-list">
        <div class="part09-collapse">
          <el-collapse v-model="activeNamesFoot" @change="handleFootChange">
            <el-collapse-item name="1">
              <template #title>
                <div class="el-collapse-item-title">
                  {{ $t("messages.footer.about") }}
                </div>
              </template>
              <div class="list-item">
                <a
                  href="/about"
                  style="color: rgb(144, 144, 144); text-decoration: none"
                  >{{ $t("messages.footer.about_us") }}</a
                >
              </div>
              <div class="list-item">
                <a
                  href="/contact"
                  style="color: rgb(144, 144, 144); text-decoration: none"
                  >{{ $t("messages.footer.contact_us") }}</a
                >
              </div>
              <div class="list-item">
                <a
                  href="/fees"
                  style="color: rgb(144, 144, 144); text-decoration: none"
                  >{{ $t("messages.footer.fees") }}</a
                >
              </div>
            </el-collapse-item>
            <el-collapse-item name="2">
              <template #title>
                <div class="el-collapse-item-title">
                  {{ $t("messages.footer.legal") }}
                </div>
              </template>
              <div class="list-item">{{ $t("messages.footer.terms") }}</div>
              <div class="list-item">{{ $t("messages.footer.privacy") }}</div>
              <div class="list-item" @click="dialogTableVisible = true">
                {{ $t("messages.footer.kyc_aml") }}
              </div>
            </el-collapse-item>
            <el-collapse-item name="3">
              <template #title>
                <div class="el-collapse-item-title">
                  {{ $t("messages.footer.service") }}
                </div>
              </template>
              <div class="list-item">
                {{ $t("messages.footer.service_instant") }}
              </div>
              <!-- <div class="list-item">
                {{ $t("messages.footer.service_spot_trading") }}
              </div> -->
            </el-collapse-item>
            <el-collapse-item name="4">
              <template #title>
                <div class="el-collapse-item-title">
                  {{ $t("messages.footer.support") }}
                </div>
              </template>
              <div class="list-item">
                {{ $t("messages.footer.support_center") }}
              </div>
              <div class="list-item">
                {{ $t("messages.footer.support_announcement") }}
              </div>
              <div class="list-item">
                {{ $t("messages.footer.support_connect") }}
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
      
      <div class="icon-links">
        <!-- <img :src="../../assets/home/downbar_icon01.png" alt="">-->
        <img src="../../assets/home/downbar_icon02.svg" alt="" />
        <img src="../../assets/home/downbar_icon03.svg" alt="" />
        <!-- <img :src="../../assets/home/downbar_icon04.png" alt="">-->
        <img src="../../assets/home/downbar_icon05.svg" alt="" />
        <img src="../../assets/home/downbar_icon06.svg" alt="" />
        <img src="../../assets/home/downbar_icon07.svg" alt="" />
        <img src="../../assets/home/downbar_icon08.svg" alt="" />
        <img src="../../assets/home/downbar_icon09.svg" alt="" />
        <img src="../../assets/home/downbar_icon10.png" alt="" />
      </div>
    </div>
    <div class="footer-bottom">
      <span>©2022 COINBYTE.COM</span>
    </div>
    <!-- <div
      v-show="showWin"
      class="message-win-box"
      @click.prevent.stop="hideWinFn"
    > -->
    <el-dialog
      v-model="dialogTableVisible"
      class="message-win"
      :show-close="false"
    >
      <h1
        style="
          color: #000;
          font-size: 24pt;
          line-height: 40px;
          font-weight: 700;
        "
      >
        KYC/AML policy
      </h1>

      <p>
        Coinbyte is bound by Australian law to take steps to ensure that it is
        not involved in the facilitation of money laundering or terrorism
        financing.
      </p>

      <p>
        Various anti-money laundering (AML), counter-terrorism financing (CTF)
        and fraud prevention measures are in place designed to articulate our
        commitment to detecting, preventing and reporting attempts to use our
        platform to illegally launder money, to finance illegal activities such
        as terrorism and drug trafficking, or to commit fraud.
      </p>

      <p>Our measures include, but are not limited to, the following:</p>

      <ul type="disc">
        <li
          class="MsoNormal"
          style="
            mso-margin-top-alt: auto;
            mso-margin-bottom-alt: auto;
            mso-list: l1 level1 lfo1;
            tab-stops: 0.5in;
          "
        >
          Members depositing or withdrawing fiat currency to/from their account
          must undergo a verification check to confirm their identity.
        </li>
        <li
          class="MsoNormal"
          style="
            mso-margin-top-alt: auto;
            mso-margin-bottom-alt: auto;
            mso-list: l1 level1 lfo1;
            tab-stops: 0.5in;
          "
        >
          Verified members are checked against international watch lists
          including, but not limited to, Politically Exposed Persons and US
          Treasury - Office of Foreign Assets Control lists.
        </li>
        <li
          class="MsoNormal"
          style="
            mso-margin-top-alt: auto;
            mso-margin-bottom-alt: auto;
            mso-list: l1 level1 lfo1;
            tab-stops: 0.5in;
          "
        >
          Fiat currency withdrawals can only be made to a bank account held in
          the same name as the Coinbyte account.
        </li>
        <li
          class="MsoNormal"
          style="
            mso-margin-top-alt: auto;
            mso-margin-bottom-alt: auto;
            mso-list: l1 level1 lfo1;
            tab-stops: 0.5in;
          "
        >
          Fiat currency deposits can only be accepted from a bank account held
          in the same name as the Coinbyte account.
        </li>
        <li
          class="MsoNormal"
          style="
            mso-margin-top-alt: auto;
            mso-margin-bottom-alt: auto;
            mso-list: l1 level1 lfo1;
            tab-stops: 0.5in;
          "
        >
          Coinbyte is obliged to report any suspicious activity to the relevant
          authorities.
        </li>
      </ul>
      <div class="bold-title">What is Money Laundering?</div>
      <p>
        Money Laundering is the name given to the process by which illegally
        obtained funds are given the appearance of having been legitimately
        obtained. Every year, vast amounts of funds are generated from illegal
        activities such as drug trafficking, tax evasion, people smuggling,
        theft, arms trafficking and corrupt practices. These funds are mostly in
        the form of cash. The criminals who generate these funds need to bring
        them into the legitimate financial system without raising suspicion. The
        conversion of cash into other forms makes it more usable. It also puts a
        distance between the criminal activities and the funds.
      </p>

      <div class="bold-title">What is Terrorism Financing?</div>
      <p>
        Terrorism financing refers to the processing of funds to sponsor or
        facilitate terrorist activity. A terrorist group, like any other
        criminal organization, builds and maintains an infrastructure to
        facilitate the development of sources of funding, to channel those funds
        to the providers of materials and/or services to the organization, and,
        possibly, to launder the funds used in financing the terrorist activity
        or resulting from that same activity. Terrorist organizations derive
        income from a variety of sources, often combining both lawful and
        unlawful funding, and where the agents involved do not always know the
        illegitimate end of that income. The forms of financing can be grouped
        in two types:
      </p>

      <ul type="disc">
        <li
          class="MsoNormal"
          style="
            mso-margin-top-alt: auto;
            mso-margin-bottom-alt: auto;
            mso-list: l0 level1 lfo2;
            tab-stops: 0.5in;
          "
        >
          Financial support - In the form of donations, community solicitation,
          and other fundraising initiatives. Financial support may come from
          states and large organizations, or from individuals.
        </li>
        <li
          class="MsoNormal"
          style="
            mso-margin-top-alt: auto;
            mso-margin-bottom-alt: auto;
            mso-list: l0 level1 lfo2;
            tab-stops: 0.5in;
          "
        >
          Revenue generating activities - Income is often derived from criminal
          activities such as kidnapping, extortion, smuggling or fraud. Income
          may also be derived from legitimate economic activities such as
          diamond trading or real estate investment.
        </li>
      </ul>

      <div class="bold-title">What is Fraud?</div>
      <p>
        Fraud is a type of criminal activity, defined as an abuse of position,
        or false representation, or prejudicing someone's rights for personal
        gain. Put simply; fraud is an act of deception intended for personal
        gain or to cause a loss to another party. The general criminal offense
        of fraud can include deception whereby someone knowingly makes a false
        representation, fails to disclose information or abuses a position.
      </p>

      <div class="bold-title">Who is AUSTRAC?</div>
      <p>
        Australian Transaction Reports and Analysis Centre (AUSTRAC) is
        Australia's anti-money laundering and counter-terrorism financing
        regulator. AUSTRAC aims to contribute towards a financial environment
        hostile to money laundering, major crime, and tax evasion. Coinbyte is
        registered with AUSTRAC as a Digital Currency Exchange provider.
      </p>
      <div class="bold-title">KYC process</div>
      <p>
        Coinbyte's KYC process includes ID verification, face verification,
        document verification such as utility bills as proof of address, and
        biometric verification. As a regulated digital currency exchange
        services provider, we are obligated to follow the money laundering and
        terrorist financing prevention act, thus KYC would be required for all
        our users.
      </p>
    </el-dialog>
    <!-- </div> -->
  </footer>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref, watch } from "vue";
import type { TabsPaneContext } from "element-plus";
import { ArrowDown } from "@element-plus/icons-vue";
import { getStoredLanguage, saveStoredLanguage } from "../../languageStorage";

// img
import logo from "../../assets/home/logo.svg";
import menu_icon from "../../assets/home/menu_icon.png";
import top_down from "../../assets/home/top_down.svg";
import top_notice from "../../assets/home/top_notice.svg";
import top_bangzhu from "../../assets/home/top_bangzhu.svg";
import top_en from "../../assets/home/top_en.svg";
import banner_b from "../../assets/home/banner_b.png";
import banner_01 from "../../assets/home/banner_01.png";
import part02_left from "../../assets/home/part02_left.png";
import part03_img from "../../assets/home/part03_im.png";
import part03_b1 from "../../assets/home/part03_b1.png";
import part04 from "../../assets/home/part04.png";
import part07_pic01 from "../../assets/home/part07_pic01.png";
import part07_pic02 from "../../assets/home/part07_pic02.png";
import part07_pic03 from "../../assets/home/part07_pic03.png";
import part02_left2 from "../../assets/home/part02_left.png";
import part03_im2 from "../../assets/home/part03_im.png";
import part09_pic01 from "../../assets/home/part09_pic01.png";
import close_icon from "../../assets/home/close_icon.png";
import * as echarts from "echarts";

export default defineComponent({
  name: "home",
  components: { ArrowDown },
  setup() {
    const dropdown1 = ref();
    const dropdownShow = ref(false);
    const { proxy } = getCurrentInstance() as any;

    const dialogTableVisible = ref(false);
    const showWin = ref(false);
    const showWinFn = () => {
      showWin.value = true;
    };
    const hideWinFn = () => {
      showWin.value = false;
    };
    const showClick = () => {
      dropdownShow.value = true;
    };
    const closeDropdown = () => {
      dropdownShow.value = false;
    };
    // menu
    const activeIndex = ref("1");
    const handleSelect = (key: string, keyPath: string[]) => {
      console.log(key, keyPath);
    };
    // tabs
    const activeName = ref("first");
    const handleClick = (tab: TabsPaneContext, event: Event) => {
      console.log(tab, event);
    };
    // table

    const activeNames = ref([""]);
    const activeNamesFoot = ref([""]);
    const handleChange = (val: string[]) => {
      console.log(val);
    };
    const handleFootChange = (val: string[]) => {
      console.log(val);
    };

    const mainColor = "#01C19A";

    const currentLanguage = ref(getStoredLanguage() || "English/USD");
    const $this = getCurrentInstance()?.appContext.config.globalProperties as any;

    const options = [
      {
        value: "English/USD",
        label: "English/USD",
      },
      {
        value: "简体中文",
        label: "简体中文",
      },
      {
        value: "zh-TW",
        label: "繁体中文",
      },
    ];
    const changeLanguage = (selectedLanguage: string) => {
      $this.$i18n.locale = selectedLanguage;
      saveStoredLanguage(selectedLanguage);
      location.reload();
    };

    watch(currentLanguage, (newLanguage) => {
      changeLanguage(newLanguage);
    });
    return {
      currentLanguage,
      $this,
      options,
      changeLanguage,
      watch,
      dropdown1,
      showClick,
      showWin,
      dialogTableVisible,
      showWinFn,
      hideWinFn,
      activeIndex,
      handleSelect,
      mainColor,
      activeName,
      handleClick,
      activeNames,
      handleChange,
      activeNamesFoot,
      handleFootChange,
      logo,
      top_down,
      top_notice,
      top_bangzhu,
      top_en,
      banner_b,
      banner_01,
      part02_left,
      part03_img,
      part03_b1,
      part04,
      part07_pic01,
      part07_pic02,
      part07_pic03,
      part09_pic01,
      menu_icon,
      part02_left2,
      part03_im2,
      dropdownShow,
      close_icon,
      closeDropdown,
    };
  },
});
</script>

<style scoped lang="scss">
.no-underline {
  text-decoration: none;
}
.lan-box {
  position: relative;
  .lan-icon {
    width: 20px;
    position: absolute;
    top: 7px;
    left: 10px;
    z-index: 999;
  }
  .selectLan {
    width: 152px;
    :deep() {
      .el-input--large .el-input__inner {
        color: #e3e3e3;
        margin-left: 20px;
        font-size: 14px;
      }
      .el-input__wrapper {
        height: 34px;
        background-color: #1d262f;
        box-shadow: 0 0 0 1px #5c6368;
      }
      .el-input__suffix-inner > :first-child {
        margin-left: 0;
      }
    }
  }
}
.part01-link {
  color: #004cff;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  text-align: center;
  margin-top: 32px;
  cursor: pointer;
  margin-bottom: 60px;

  span {
    cursor: pointer;
  }
}

.navClass {
  .el-dropdown-menu {
    background-color: #161719 !important;
  }

  .el-dropdown-menu__item {
    color: #f3f3f3;
  }

  .el-dropdown-menu .el-dropdown-menu__item:not(.is-disabled):hover {
    background-color: #ffffff;
    color: #01c19a;
  }

  // &.el-popper.is-light {
  // background: #161719;
  // border: none;
  // }
}
</style>
<style scoped lang="scss">
$main-color: #01c19a;
$bg-color: #fff;

.btn {
  box-shadow: 4px 4px 10px 0 rgb(146 146 146 / 50%);
  box-sizing: border-box;
  color: #fff;
  line-height: 80%;
  padding: 15px 18px;
  background: $main-color;
  border-color: $main-color;
  border-radius: 4px;
  font-size: 20px;
}

.btn2 {
  border: none;
  padding: 8px 16px;
  background: #01c19a;
  box-shadow: 4px 4px 10px 0 rgba(146, 146, 146, 0.5);
  border-radius: 4px;
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
  cursor: pointer;
  height: 40px;
}
.message-win-box {
  background-color: rgba(0, 0, 0, 0.67);
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
}
.bold-title {
  font-weight: bold;
  line-height: 40px;
  color: rgb(0, 0, 0);
}
:deep(.message-win) {
  .el-dialog__body {
    margin-top: -40px;
  }
  p {
    word-break: break-word;
    color: #000;
  }
  position: absolute;
  width: 80%;
  height: 80%;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  padding: 0;
  font-size: 12pt;
  line-height: 20px !important;
  color: #060606;
  background-color: white;
  overflow: auto;
  white-space: pre-wrap;
  word-break: break-word;
  font-family: HarmonyOS Sans, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif !important;
  ul {
    list-style: disc;
    margin-left: 15px !important;
    word-break: break-word;

    li {
      font-size: 12pt !important;
      color: #000;

      word-break: break-word;
    }
  }
  * {
    font-family: HarmonyOS Sans, Helvetica, PingFang SC, Hiragino Sans GB,
      Microsoft YaHei, SimSun, sans-serif !important;
    //font-size: 14px!important;
  }
  // .MsoNormal {
  //   ::marker {
  //     unicode-bidi: isolate;
  //     font-variant-numeric: tabular-nums;
  //     text-transform: none;
  //     text-indent: 0px !important;
  //     text-align: start !important;
  //     text-align-last: start !important;
  //   }
  // }
  // @font-face
  // {font-family:Wingdings;
  //   panose-1:5 0 0 0 0 0 0 0 0 0;
  //   mso-font-charset:2;
  //   mso-generic-font-family:auto;
  //   mso-font-pitch:variable;
  //   mso-font-signature:0 268435456 0 0 -2147483648 0;}
  // @font-face
  // {font-family:SimSun;
  //   panose-1:2 1 6 0 3 1 1 1 1 1;
  //   mso-font-alt:宋体;
  //   mso-font-charset:134;
  //   mso-generic-font-family:auto;
  //   mso-font-pitch:variable;
  //   mso-font-signature:3 680460288 22 0 262145 0;}
  // @font-face
  // {font-family:"Cambria Math";
  //   panose-1:2 4 5 3 5 4 6 3 2 4;
  //   mso-font-charset:0;
  //   mso-generic-font-family:roman;
  //   mso-font-pitch:variable;
  //   mso-font-signature:-536870145 1107305727 0 0 415 0;}
  // @font-face
  // {font-family:Calibri;
  //   panose-1:2 15 5 2 2 2 4 3 2 4;
  //   mso-font-charset:0;
  //   mso-generic-font-family:swiss;
  //   mso-font-pitch:variable;
  //   mso-font-signature:-536859905 -1073732485 9 0 511 0;}
  // @font-face
  // {font-family:"\@SimSun";
  //   panose-1:2 1 6 0 3 1 1 1 1 1;
  //   mso-font-charset:134;
  //   mso-generic-font-family:auto;
  //   mso-font-pitch:variable;
  //   mso-font-signature:3 680460288 22 0 262145 0;}
  // /* Style Definitions */
  // p.MsoNormal, li.MsoNormal, div.MsoNormal
  // {mso-style-unhide:no;
  //   mso-style-qformat:yes;
  //   mso-style-parent:"";
  //   margin:0in;
  //   margin-bottom:.0001pt;
  //   mso-pagination:widow-orphan;
  //   font-size:10.0pt;
  //   font-family:"Calibri",sans-serif;
  //   mso-fareast-font-family:SimSun;
  //   mso-bidi-font-family:"Times New Roman";}
  // h1
  // {mso-style-unhide:no;
  //   mso-style-qformat:yes;
  //   mso-style-parent:"";
  //   mso-style-next:正文;
  //   mso-margin-top-alt:auto;
  //   margin-right:0in;
  //   mso-margin-bottom-alt:auto;
  //   margin-left:0in;
  //   mso-pagination:widow-orphan;
  //   mso-outline-level:1;
  //   font-size:24.0pt;
  //   font-family:SimSun;
  //   mso-font-kerning:22.0pt;
  //   font-weight:bold;}
  // p
  // {mso-style-unhide:no;
  //   mso-style-parent:"";
  //   mso-margin-top-alt:auto;
  //   margin-right:0in;
  //   mso-margin-bottom-alt:auto;
  //   margin-left:0in;
  //   mso-pagination:widow-orphan;
  //   font-size:12.0pt;
  //   font-family:"Times New Roman",serif;
  //   mso-fareast-font-family:SimSun;}
  // .MsoChpDefault
  // {mso-style-type:export-only;
  //   mso-default-props:yes;
  //   mso-fareast-font-family:SimSun;}
  // @page WordSection1
  // {size:595.3pt 841.9pt;
  //   margin:1.0in 1.25in 1.0in 1.25in;
  //   mso-header-margin:.5in;
  //   mso-footer-margin:.5in;
  //   mso-paper-source:0;}
  // div.WordSection1
  // {page:WordSection1;}
  // /* List Definitions */
  // @list l0
  // {mso-list-id:-1040315353;
  //   mso-list-template-ids:-1040315353;}
  // @list l0:level1
  // {mso-level-number-format:bullet;
  //   mso-level-text:;
  //   mso-level-tab-stop:.5in;
  //   mso-level-number-position:left;
  //   text-indent:-.25in;
  //   mso-ansi-font-size:10.0pt;
  //   font-family:Symbol;
  //   mso-bidi-font-family:Symbol;}
  // @list l0:level2
  // {mso-level-number-format:bullet;
  //   mso-level-text:o;
  //   mso-level-tab-stop:1.0in;
  //   mso-level-number-position:left;
  //   text-indent:-.25in;
  //   mso-ansi-font-size:10.0pt;
  //   font-family:"Courier New";}
  // @list l0:level3
  // {mso-level-number-format:bullet;
  //   mso-level-text:;
  //   mso-level-tab-stop:1.5in;
  //   mso-level-number-position:left;
  //   text-indent:-.25in;
  //   mso-ansi-font-size:10.0pt;
  //   font-family:Wingdings;
  //   mso-bidi-font-family:Wingdings;}
  // @list l0:level4
  // {mso-level-number-format:bullet;
  //   mso-level-text:;
  //   mso-level-tab-stop:2.0in;
  //   mso-level-number-position:left;
  //   text-indent:-.25in;
  //   mso-ansi-font-size:10.0pt;
  //   font-family:Wingdings;
  //   mso-bidi-font-family:Wingdings;}
  // @list l0:level5
  // {mso-level-number-format:bullet;
  //   mso-level-text:;
  //   mso-level-tab-stop:2.5in;
  //   mso-level-number-position:left;
  //   text-indent:-.25in;
  //   mso-ansi-font-size:10.0pt;
  //   font-family:Wingdings;
  //   mso-bidi-font-family:Wingdings;}
  // @list l0:level6
  // {mso-level-number-format:bullet;
  //   mso-level-text:;
  //   mso-level-tab-stop:3.0in;
  //   mso-level-number-position:left;
  //   text-indent:-.25in;
  //   mso-ansi-font-size:10.0pt;
  //   font-family:Wingdings;
  //   mso-bidi-font-family:Wingdings;}
  // @list l0:level7
  // {mso-level-number-format:bullet;
  //   mso-level-text:;
  //   mso-level-tab-stop:3.5in;
  //   mso-level-number-position:left;
  //   text-indent:-.25in;
  //   mso-ansi-font-size:10.0pt;
  //   font-family:Wingdings;
  //   mso-bidi-font-family:Wingdings;}
  // @list l0:level8
  // {mso-level-number-format:bullet;
  //   mso-level-text:;
  //   mso-level-tab-stop:4.0in;
  //   mso-level-number-position:left;
  //   text-indent:-.25in;
  //   mso-ansi-font-size:10.0pt;
  //   font-family:Wingdings;
  //   mso-bidi-font-family:Wingdings;}
  // @list l0:level9
  // {mso-level-number-format:bullet;
  //   mso-level-text:;
  //   mso-level-tab-stop:4.5in;
  //   mso-level-number-position:left;
  //   text-indent:-.25in;
  //   mso-ansi-font-size:10.0pt;
  //   font-family:Wingdings;
  //   mso-bidi-font-family:Wingdings;}
  // @list l1
  // {mso-list-id:1350454723;
  //   mso-list-template-ids:1350454723;}
  // @list l1:level1
  // {mso-level-number-format:bullet;
  //   mso-level-text:;
  //   mso-level-tab-stop:.5in;
  //   mso-level-number-position:left;
  //   text-indent:-.25in;
  //   mso-ansi-font-size:10.0pt;
  //   mso-ascii-font-family:Symbol;
  //   mso-hansi-font-family:Symbol;
  //   mso-bidi-font-family:Symbol;}
  // @list l1:level2
  // {mso-level-number-format:bullet;
  //   mso-level-text:o;
  //   mso-level-tab-stop:1.0in;
  //   mso-level-number-position:left;
  //   text-indent:-.25in;
  //   mso-ansi-font-size:10.0pt;
  //   mso-ascii-font-family:"Courier New";
  //   mso-hansi-font-family:"Courier New";
  //   mso-bidi-font-family:"Courier New";}
  // @list l1:level3
  // {mso-level-number-format:bullet;
  //   mso-level-text:;
  //   mso-level-tab-stop:1.5in;
  //   mso-level-number-position:left;
  //   text-indent:-.25in;
  //   mso-ansi-font-size:10.0pt;
  //   mso-ascii-font-family:Wingdings;
  //   mso-hansi-font-family:Wingdings;
  //   mso-bidi-font-family:Wingdings;}
  // @list l1:level4
  // {mso-level-number-format:bullet;
  //   mso-level-text:;
  //   mso-level-tab-stop:2.0in;
  //   mso-level-number-position:left;
  //   text-indent:-.25in;
  //   mso-ansi-font-size:10.0pt;
  //   font-family:Wingdings;
  //   mso-bidi-font-family:Wingdings;}
  // @list l1:level5
  // {mso-level-number-format:bullet;
  //   mso-level-text:;
  //   mso-level-tab-stop:2.5in;
  //   mso-level-number-position:left;
  //   text-indent:-.25in;
  //   mso-ansi-font-size:10.0pt;
  //   font-family:Wingdings;
  //   mso-bidi-font-family:Wingdings;}
  // @list l1:level6
  // {mso-level-number-format:bullet;
  //   mso-level-text:;
  //   mso-level-tab-stop:3.0in;
  //   mso-level-number-position:left;
  //   text-indent:-.25in;
  //   mso-ansi-font-size:10.0pt;
  //   font-family:Wingdings;
  //   mso-bidi-font-family:Wingdings;}
  // @list l1:level7
  // {mso-level-number-format:bullet;
  //   mso-level-text:;
  //   mso-level-tab-stop:3.5in;
  //   mso-level-number-position:left;
  //   text-indent:-.25in;
  //   mso-ansi-font-size:10.0pt;
  //   font-family:Wingdings;
  //   mso-bidi-font-family:Wingdings;}
  // @list l1:level8
  // {mso-level-number-format:bullet;
  //   mso-level-text:;
  //   mso-level-tab-stop:4.0in;
  //   mso-level-number-position:left;
  //   text-indent:-.25in;
  //   mso-ansi-font-size:10.0pt;
  //   font-family:Wingdings;
  //   mso-bidi-font-family:Wingdings;}
  // @list l1:level9
  // {mso-level-number-format:bullet;
  //   mso-level-text:;
  //   mso-level-tab-stop:4.5in;
  //   mso-level-number-position:left;
  //   text-indent:-.25in;
  //   mso-ansi-font-size:10.0pt;
  //   font-family:Wingdings;
  //   mso-bidi-font-family:Wingdings;}
  ol {
    margin-bottom: 0in;
  }
  ul {
    margin-bottom: 0in;
  }
}
img {
  width: 100%;
  height: 100%;
}

.title-one {
  font-size: 28px;
  color: #060606;
  font-weight: 700;

  span {
    color: $main-color;
  }
}

.title-two {
  font-size: 16px;
  color: #060606;
  line-height: 20px;
  font-weight: 400;
}

.part {
  padding: 5% 20px 5%;
  background-color: $bg-color;
}

.home-con {
  width: 100%;
  height: 100vh;
  overflow: auto;
  box-sizing: border-box;
  color: #fff;
  font-size: 14px;
  overflow-x: hidden;

  .head-con {
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #161719;

    .el-col {
      height: 100%;
    }

    .logo {
      // height: 32px;
      height: 58%;
      width: auto;
      padding-left: 20px;
      margin-bottom: 2.5%;
    }

    .head-right {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;

      .menu-dropdown {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: #121212;
        width: 100vw;
        height: 100vh;
        z-index: 10000;

        .close-icon {
          position: absolute;
          width: 20px;
          height: 20px;
          right: 20px;
          top: 14px;
        }

        .box {
          padding: 60px 20px 0;

          .button-group {
            display: flex;
            line-height: 28px;

            .sign-button {
              font-weight: 400;
              margin-right: 6px;
              width: 66px;
              height: 28px;
              background-color: transparent;
              border: 1px solid #fafafa;
              font-size: 14px;
              color: white;
            }

            span {
              padding: 0 8px;
            }
          }
        }

        .nav-list {
          list-style: none;
          text-align: left;
          line-height: 18px;
          margin-top: 20px;

          li {
            padding: 18px 0;
            font-size: 18px;
            font-weight: 400;
          }
        }

        .download-app {
          text-align: center;
          line-height: 46px;
          width: 100%;
          font-size: 16px;
          font-weight: 500;
          border: 1px solid #404040;
          border-radius: 6px;
          margin-top: 48px;
        }
      }

      :deep(.el-dropdown-menu) {
        background-color: #161719 !important;
      }

      .el-dropdown-menu__item {
        color: #f3f3f3;
      }

      .el-dropdown-menu .el-dropdown-menu__item:not(.is-disabled):hover {
        background-color: #ffffff;
        color: #01c19a;
      }
    }

    .login-span {
      line-height: 50px;
      margin-right: 0.6rem;
    }

    .btn-signup {
      box-sizing: border-box;
      color: #fff;
      line-height: 80%;
      padding: 8px 10px;
      background: #01c19a;
      border-radius: 4px;
      border: none;
      font-size: 14px;
    }

    text-align: right;

    .el-dropdown-link {
      padding-right: 10px;
      img {
        width: 20px;
        height: 20px;
        margin: 0 1.2rem;
        // margin-top: 14px;
        margin-bottom: -3px;
      }
    }
  }

  .menu {
    .aud-badge {
      background: #01c19a;
      border-radius: 4px;
      font-size: 0.5rem;
      padding: 2px 3px;
      margin-right: 4px;
    }

    list-style: none;

    // list-style-type: none;
    // display: flex;
    li {
      padding: 0 1.5rem;
      display: inline-block;
      position: relative;
      // float: left;
      // flex:1
    }
  }
}

.banner-con {
  height: 500px;
  position: relative;

  .banner-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  .banner-left {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 20px;

    .banner1 {
      font-size: 44px;
      font-weight: bold;
      margin-bottom: 32px;
      text-align: left;
    }

    .banner2 {
      font-size: 16px;
      line-height: 30px;
      font-weight: 500;
      margin-bottom: 32px;
      text-align: left;
    }

    .banner-btn {
      box-shadow: none;
      font-size: 14px;
      font-weight: 700;
      max-width: 280px;
      // margin: 0 auto;
      width: 200px;
      height: 50px;
    }

    .banner3 {
      display: flex;
      align-items: center;
      // justify-content: center;
      margin-top: 30px;

      .ban3-left {
        width: 30px;
        height: 32px;
        margin-right: 16px;
      }

      .ban3-top {
        font-size: 14px;
        line-height: 30px;
      }

      .ban3-bottom {
        font-size: 14px;
        color: $main-color;
        text-align: left;

        .ban-icon {
          vertical-align: middle;
          margin-left: 12px;
        }
      }
    }
  }
}

.part01 {
  .demo-tabs {
    // padding: 40px 0;
    :deep() {
      // .el-tabs__nav .is-top{
      //     transform: translateX(50%) !important;
      // }
      .el-tabs__nav-wrap {
        padding: 0;
      }

      .el-tabs__header {
        width: 100%;
        margin: 0 auto 20px;
      }

      .el-tabs__nav-scroll {
        overflow-x: scroll;

        &::-webkit-scrollbar {
          width: 0;
          display: none;
        }
      }

      .el-tabs__item:hover {
        color: $main-color;
      }

      .el-tabs__item {
        font-size: 16px;
        font-weight: 500;
      }

      .el-tabs__item.is-active {
        color: $main-color;
        font-weight: 700;
      }

      .el-tabs__nav-prev {
        display: none;
      }

      .el-tabs__nav-next {
        display: none;
      }

      .el-tabs__active-bar {
        background-color: $main-color;
        height: 0px;
      }

      .el-table__header-wrapper {
        th {
          font-weight: 500;
          font-size: 12px;
        }
      }

      .cell {
        padding: 0;
        color: #929292;
        font-size: 12px;
      }
    }

    .table-img {
      width: 28px;
      height: 28px;
      vertical-align: sub;
      margin-right: 8px;
    }

    .table-tag {
      font-size: 16px;
      font-weight: 500;
      color: #020202;
      margin-right: 2px;
    }

    .table-asset {
      font-size: 14px;
      color: #9b9b9b;
      font-weight: 400;
      color: #bdbdbd;
    }

    .table-price {
      font-size: 16px;
      font-weight: 500;
      color: #000000;
    }

    .price-change {
      font-size: 14px;
      font-weight: 500;
    }
  }

  .part01-btn {
    margin-top: 40px;
    // padding-bottom: 40px;
    text-align: center;
  }
}

.part02 {
  .title1 {
    font-size: 24px;
    color: #000;
    line-height: 30px;
    margin-top: 34px;
    margin-bottom: 22px;
    font-weight: 500;
  }

  .part02-btn {
    margin-top: 43px;
  }
}

.part03 {
  padding-bottom: 80px;

  .part03-img {
    height: 470px;
  }
}

.part04 {
  height: 540px;
  position: relative;

  .part04-img {
    position: absolute;
    z-index: 0;
  }

  .title {
    position: absolute;
    padding: 30px 20px;
    font-size: 32px;
    color: #ffffff;
    font-weight: bold;
    text-align: center;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    span {
      color: $main-color;
    }
  }

  .btn2 {
    box-shadow: none;
    margin-top: 20px;
    width: 40%;
    max-width: 280px;
  }
}

.part05 {
  padding: 80px 20px;
  position: relative;
  background-color: #fff;
  text-align: center;
  overflow: auto;

  .title1 {
    font-size: 24px;
    color: #060606;
    font-weight: 500;
  }

  .part05-top-img {
    position: absolute;
    top: 5rem;
    left: 6rem;
    width: 9rem;
    height: 7rem;
  }

  .card {
    flex-wrap: wrap;
    display: flex;
    padding: 4rem 0rem 0rem;
  }

  .card-item {
    text-align: left;
    width: 50%;

    &:nth-of-type(odd) {
      padding: 0 1.5rem 2rem 0;
    }

    &:nth-of-type(even) {
      padding: 0 0 2rem 1.5rem;
    }

    // float: left;
    img {
      width: auto;
      height: 58px;
    }

    .card-title {
      font-size: 18px;
      color: #060606;
      font-weight: 400;
      margin: 0.7rem 0 0.8rem;
    }

    .card-desc {
      font-size: 14px;
      color: #060606;
      line-height: 26px;
      font-weight: 400;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }

    .card-btn {
      font-size: 14px;
      color: $main-color;
    }

    .last-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}

.part06 {
  padding: 80px 20px;
  padding-bottom: 4rem;
  text-align: center;
  position: relative;
  background-image: url("../../assets/home/part06_b01.png");
  background-repeat: no-repeat;
  background-position: 98% bottom;
  background-size: 45%;

  .part06-top {
    width: 15%;
  }

  .part06-card {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2.5rem 0rem 0;

    .card-item {
      box-sizing: border-box;
      padding-top: 1.5rem;
      padding-bottom: 1.5rem;
      margin-bottom: 2rem;
      width: 100%;
      background: #ffffff;
      box-shadow: 0 0 10px 0 #eceeef;
      border-radius: 18px;

      img {
        width: auto;
        height: 10vw;
      }

      .card-title {
        font-size: 18px;
        font-weight: 400;
        color: #060606;
        margin: 1rem 0 0.6rem;
      }

      .card-desc {
        padding: 0 1.5rem;
        font-weight: 400;
        font-size: 14px;
        color: #060606;
        text-align: center;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
      }
    }
  }

  .part06-button {
    border: none;
    padding: 1rem 1.7rem;
    background: #01c19a;
    box-shadow: 4px 4px 10px 0 rgba(146, 146, 146, 0.5);
    border-radius: 4px;
    font-size: 14px;
    color: #ffffff;
    font-weight: 700;
    cursor: pointer;
  }
}

.part07 {
  text-align: center;
  background-color: #fff;
  padding: 80px 20px;

  .title-one {
    margin-bottom: 20px;
    line-height: 40px;
  }

  .part07-img {
    width: 100%;
  }

  .part07-list {
    padding-top: 5%;

    img {
      border-radius: 5%;
      // height: 45%;
      // width:auto;
    }

    .item-title {
      margin-top: 5%;
      margin-bottom: 5%;
      font-size: 18px;
      color: #060606;
      text-align: center;
      font-weight: 400;
    }
  }
}

.part08 {
  text-align: center;
  background-color: #fff;
  padding: 5% 0 40px 0;

  .title-one {
    font-size: 18px;
    font-weight: 700;
    padding-bottom: 24px;
  }

  .part08-collapse {
    margin: 2% 20px;
    text-align: left;
    font-size: 14px;
    color: #060606;

    .el-collapse-item-title {
      width: 90%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
      font-weight: 500;
    }

    :deep() {
      .el-collapse-item__content {
        font-weight: 400;
        font-size: 14px;
        color: #929292;
      }

      .el-collapse-item__arrow {
        transform: rotate(90deg);
      }

      .el-collapse-item__arrow.is-active {
        transform: rotate(270deg);
      }
    }

    // }
  }
}

.part09 {
  display: flex;
  padding: 80px 20px;

  .part09-left {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .btn2 {
      margin: 5% auto 0 0;
    }
  }

  .part09-right {
    img {
      width: 100%;
      height: auto;
    }
  }
}

.el-tabs__active-bar {
  background-color: $main-color;
}

.el-tabs__item.is-active {
  color: $main-color;
}

.el-tabs__item:hover {
  color: $main-color;
}

// @media screen and (min-width:1440px){
//     .home-con{
//         width:1440px !important;
//         margin: 0 auto;
//     }
// }
// @media screen and (min-width: 1024px) and (max-width: 1399px) {
//     .home-con{
//         width:1024px !important;
//         margin: 0 auto;
//     }
// }
// @media screen and (max-width:1024px){
//     .home-con{
//         width:100%;
//     }
// }
footer {
  background: #1d262f;
  width: 100%;
  height: 100%;

  div.footer-links {
    box-sizing: border-box;
    width: 100vw;
    // height: 40vh;
    background: #1d262f;
    border-bottom: none;

    .footer-logoinfo {
      display: inline-block;
      width: 100%;
      padding: 20px 0 0 20px;

      img.logo {
        width: 43%;
        margin-bottom: 12px;
      }

      button.labguage-chose {
        display: flex;
        align-items: center;

        img {
          width: 16px;
          margin-right: 6px;
          vertical-align: middle;
        }

        svg {
          margin-left: 4px;
        }

        font-size: 14px;
        color: #e3e3e3;
        background: none;
        border: 1px solid #5c6368;
        border-radius: 3px;
        padding: 0.5rem 1rem;
      }
    }

    .link-list {
      margin-top: 20px;
      padding: 0 20px;

      .part09-collapse {
        width: 100%;
        border: none;

        .list-item {
          height: 44px;
        }

        :deep() {
          .el-collapse {
            border: none;
          }

          .el-collapse-item__header {
            background-color: transparent;
            color: white;
            border: none;
            height: 52px;
          }

          .el-collapse-item-title {
            font-weight: 400;
            font-size: 18px;
          }

          .el-collapse-item__content {
            background-color: transparent;
            font-size: 14px;
            color: #909090;
            padding-left: 20px;
            padding-bottom: 0;
            padding-top: 8px;
          }

          .el-collapse-item__wrap {
            background-color: transparent;
            border: none;
          }

          .el-collapse-item__arrow {
            transform: rotate(90deg);
          }

          .el-collapse-item__arrow.is-active {
            transform: rotate(270deg);
          }
        }
      }
    }

    .icon-links {
      display: flex;
      align-items: center;
      padding: 6px 20px;
      // padding-top: 50px;
      width: 100%;
      vertical-align: center;
      flex-wrap: wrap;

      img {
        width: 24px;
        margin: 12px 12px 0 0;
      }
    }
  }

  div.footer-bottom {
    //width: 100vw;
    font-weight: 400;
    background: #161719;
    font-size: 16px;
    color: #808080;
    letter-spacing: 0;
    padding: 10px 5.3vw;
    box-sizing: border-box;

    span {
      display: block;
      font-size: 16px;
      color: #808080;
      font-weight: 400;
    }
  }
}
:deep(.el-select .el-input.is-focus .el-input__wrapper) {
  box-shadow: 0 0 0 1px #5c6368 !important;
  border-color: #5c6368;
}
:deep() {
  .el-select {
    --el-select-input-focus-border-color: #5c6368;
  }
  .el-select-dropdown__item{
    text-align: center;
  }
}

</style>
