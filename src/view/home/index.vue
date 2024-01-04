<template>
  <div class="homeBox">
    <Header />
    <div class="bannerContainer">
      <div class="bg-img">
        <el-row style="height: 100%" class="max1290">
          <el-col :md="10" :sm="24" :xs="24" class="banner-left" style="height: 100%">
            <div class="banner-title">
              {{ $t("messages.home.banner_title") }}
            </div>
            <div class="banner-content">
              {{ $t("messages.home.banner_content") }}
            </div>
            <GetButton type="success" :text="$t('messages.home.banner_btn')" class="banner-btn"
              style="width: 226px; box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.5)"></GetButton>
            <div class="banner-more">
              <div class="banner-more-img">
                <img :src="registered_icon" alt="" />
              </div>
              <div>
                <div class="banner-more-title">
                  {{ $t("messages.home.banner_registered") }}
                </div>
                <div class="banner-learn-more" @click="dialogTableVisible = true">
                  {{ $t("messages.home.banner_more") }}
                  <el-icon class="more-arrow">
                    <Right />
                  </el-icon>
                </div>
                <el-dialog v-model="dialogTableVisible" class="alert-dialog">
                  <el-row :gutter="20">
                    <el-col :md="12" :xs="24" v-for="(item, index) in gridData" :key="index">
                      <div class="alert-box">
                        <div class="alert-title">{{ item.title }}</div>
                        <div class="alert-cont">{{ item.content1 }}</div>
                        <div class="alert-cont">{{ item.content2 }}</div>
                        <div class="alert-address">
                          <a href="https://asic.gov.au/" target="_blank">
                            {{ item.address }}
                            <el-icon class="more-arrow">
                              <Right />
                            </el-icon>
                          </a>
                        </div>
                      </div>
                    </el-col>
                    <el-col :md="12" :xs="24" v-for="(item, index) in gridData1" :key="index" class="gap">
                      <div class="alert-box">
                        <div class="alert-title">{{ item.title }}</div>
                        <div class="alert-cont">{{ item.content1 }}</div>
                        <div class="alert-cont">{{ item.content2 }}</div>
                        <div class="alert-cont">{{ item.content3 }}</div>
                        <div class="alert-cont">{{ item.content4 }}</div>
                        <div class="alert-address">
                          <a href="https://www.austrac.gov.au/" target="_blank">
                            {{ item.address }}
                            <el-icon class="more-arrow">
                              <Right />
                            </el-icon>
                          </a>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                  <div class="alert-box" style="margin-top: 50px">
                    <div style="font-weight: bold">
                      Ausun Overseas Pty Ltd Trading as Coinbyte
                    </div>
                    <div style="font-size: 12px">
                      Suite 801/50 Clarence Street, Sydney NSW 2000 Australia
                    </div>
                  </div>
                </el-dialog>
              </div>
            </div>
          </el-col>
          <el-col :md="14" :sm="0" :xs="0" style="height: 100%" class="banner-right">
            <img :src="banner_01" alt="" class="hacker-img" />
            <img :src="banner_code" alt="" class="banner-bg" />
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="homeContainer">
      <div class="part first-part" v-if="windowWidth > 768">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick" style="color: #01c19a" :stretch="true">
          <el-tab-pane class="first-tab-pan" label="Popular assets" name="1">
            <el-table :data="coinMarketCapData[`tab-${1}`]" style="width: 100%">
              <el-table-column label="Asset">
                <template v-slot="{ row }" class="clearfloat">
                  <el-icon class="crypto-star clearfloat">
                    <StarFilled />
                  </el-icon>
                  <div class="crypto-icon">
                    <img :src="row.image" alt="icon" />
                  </div>
                  <div class="table-tag">
                    {{ row.symbol.toUpperCase() }}
                    <div class="table-asset">
                      {{ row.name }}
                    </div>
                  </div>

                </template>
              </el-table-column>
              <el-table-column prop="current_price" label="Last price" align="right" width="150">
                <template v-slot="{ row }">
                  ${{ row.current_price.toFixed(2) }}
                </template>
              </el-table-column>

              <el-table-column prop="volume_change_24h" label="Change(24H)" sortable width="200" align="right">
                <template v-slot="{ row }">
                  <span v-if="row.market_cap_change_percentage_24h > 0" style="color: #01c19a">
                    {{ row.market_cap_change_percentage_24h.toFixed(2) }}%
                  </span>
                  <span v-else-if="row.market_cap_change_percentage_24h < 0" style="color: #f15958">
                    {{ row.market_cap_change_percentage_24h.toFixed(2) }}%
                  </span>
                </template>
              </el-table-column>

              <el-table-column prop="chart" label="Chart" align="center">
                <template v-slot="{ row }">
                  <div style="
                      height: 40px;
                      width: 140px;
                      margin: 0 auto;
                      position: relative;
                      bottom: -14px;
                    " :ref="(e) => setEchartRef(e, 1)" :rowId="row.id" :id="'echart' + row.id">
                    {{ row.volume_change_24h }}</div>
                </template>
              </el-table-column>

              <!-- <el-table-column prop="chart" label="Chart" align="center">
                <template #default="scope">
                  <div
                    style="
                      height: 40px;
                      width: 140px;
                      margin: 0 auto;
                      position: relative;
                      bottom: -14px;
                    "
                    :ref="setEchartRef"
                    :rowId="scope.row.id"
                    :id="'echart' + scope.row.id"
                  ></div>
                </template>
              </el-table-column> -->

              <el-table-column prop="" label="Trade" align="right" width="100">
                <template #default="scope">
                  <el-button class="table-buy" size="default" @click="handleBuy(scope.$index, scope.row)" plain>
                    <span>Buy</span>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>

          <el-tab-pane class="first-tab-pan" label="New assets" name="2">
            <!-- <el-table :data="tableData.slice(0, 7)" style="width: 100%" ref="tableChart">
              <el-table-column prop="asset" label="Asset">
                <template #default="scope">
                  <div style="display: flex; align-items: center">
                    <img
                      class="table-img"
                      style="width: 2rem"
                      :src="scope.row.img"
                      alt=""
                    />
                    <span class="table-tag">{{ scope.row.tag }}</span>
                    <span class="table-asset">{{ scope.row.asset }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="price" label="Last price" align="right">
                <template #default="scope">
                  <span class="table-price">{{ scope.row.price }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="change" label="Change(24H)" align="right">
                <template #default="scope">
                  <span
                    v-if="scope.row.change > 0"
                    style="color: #f15958"
                  >
                    <span class="table-change">
                      {{ scope.row.change }}
                    </span>
                    <el-icon color="#F15958">
                      <CaretBottom />
                    </el-icon>
                  </span>
                  <span
                    v-if="scope.row.change < 0"
                    style="color: #01c19a"
                  >
                    <span class="table-change">
                      {{ scope.row.change }}
                    </span>

                    <el-icon color="#01C19A"><CaretTop /></el-icon>
                  </span>
                </template>
              </el-table-column>
              <el-table-column prop="chart" label="Chart" align="center">
                <template #default="scope">
                  <div
                    style="
                      height: 40px;
                      width: 140px;
                      margin: 0 auto;
                      position: relative;
                      bottom: -14px;
                    "
                    :ref="setEchartRef"
                    :rowId="scope.row.id"
                    :id="'echart' + scope.row.id"
                  ></div>
                </template>
              </el-table-column>
              <el-table-column prop="" label="Trade" align="right" width="100">
                <template #default="scope">
                  <el-button
                    class="table-buy"
                    size="default"
                    @click="handleBuy(scope.$index, scope.row)"
                    plain
                  >
                    <span>Buy</span>
                  </el-button>
                </template>
              </el-table-column>
            </el-table> -->
            <el-table :data="coinMarketCapData[`tab-${2}`]" style="width: 100%">
              <el-table-column label="Asset">
                <template v-slot="{ row }" class="clearfloat">
                  <el-icon class="crypto-star clearfloat">
                    <StarFilled />
                  </el-icon>
                  <div class="crypto-icon">
                    <img :src="row.image" alt="icon" />
                  </div>
                  <div class="table-tag">
                    {{ row.symbol.toUpperCase() }}
                    <div class="table-asset">
                      {{ row.name }}
                    </div>
                  </div>

                </template>
              </el-table-column>
              <el-table-column prop="current_price" label="Last price" align="right" width="150">
                <template v-slot="{ row }">
                  ${{ row.current_price.toFixed(2) }}
                </template>
              </el-table-column>

              <el-table-column prop="volume_change_24h" label="Change(24H)" sortable width="200" align="right">
                <template v-slot="{ row }">
                  <span v-if="row.market_cap_change_percentage_24h > 0" style="color: #01c19a">
                    {{ row.market_cap_change_percentage_24h.toFixed(2) }}%
                  </span>
                  <span v-else-if="row.market_cap_change_percentage_24h < 0" style="color: #f15958">
                    {{ row.market_cap_change_percentage_24h.toFixed(2) }}%
                  </span>
                </template>
              </el-table-column>

              <el-table-column prop="chart" label="Chart" align="center">
                <template v-slot="{ row }">
                  <div style="
                      height: 40px;
                      width: 140px;
                      margin: 0 auto;
                      position: relative;
                      bottom: -14px;
                    " :ref="(e) => setEchartRef(e, 2)" :rowId="row.id" :id="'echart' + row.id">
                    {{ row.volume_change_24h }}</div>
                </template>
              </el-table-column>

              <!-- <el-table-column prop="chart" label="Chart" align="center">
                <template #default="scope">
                  <div
                    style="
                      height: 40px;
                      width: 140px;
                      margin: 0 auto;
                      position: relative;
                      bottom: -14px;
                    "
                    :ref="setEchartRef"
                    :rowId="scope.row.id"
                    :id="'echart' + scope.row.id"
                  ></div>
                </template>
              </el-table-column> -->

              <el-table-column prop="" label="Trade" align="right" width="100">
                <template #default="scope">
                  <el-button class="table-buy" size="default" @click="handleBuy(scope.$index, scope.row)" plain>
                    <span>Buy</span>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane class="first-tab-pan" label="Gains ranking" name="3">
            <el-table :data="coinMarketCapData[`tab-${3}`]" style="width: 100%">
              <el-table-column label="Asset">
                <template v-slot="{ row }" class="clearfloat">
                  <el-icon class="crypto-star clearfloat">
                    <StarFilled />
                  </el-icon>
                  <div class="crypto-icon">
                    <img :src="row.image" alt="icon" />
                  </div>
                  <div class="table-tag">
                    {{ row.symbol.toUpperCase() }}
                    <div class="table-asset">
                      {{ row.name }}
                    </div>
                  </div>

                </template>
              </el-table-column>
              <el-table-column prop="current_price" label="Last price" align="right" width="150">
                <template v-slot="{ row }">
                  ${{ row.current_price.toFixed(2) }}
                </template>
              </el-table-column>

              <el-table-column prop="volume_change_24h" label="Change(24H)" sortable width="200" align="right">
                <template v-slot="{ row }">
                  <span v-if="row.market_cap_change_percentage_24h > 0" style="color: #01c19a">
                    {{ row.market_cap_change_percentage_24h.toFixed(2) }}%
                  </span>
                  <span v-else-if="row.market_cap_change_percentage_24h < 0" style="color: #f15958">
                    {{ row.market_cap_change_percentage_24h.toFixed(2) }}%
                  </span>
                </template>
              </el-table-column>

              <el-table-column prop="chart" label="Chart" align="center">
                <template v-slot="{ row }">
                  <div style="
                      height: 40px;
                      width: 140px;
                      margin: 0 auto;
                      position: relative;
                      bottom: -14px;
                    " :ref="(e) => setEchartRef(e, 3)" :rowId="row.id" :id="'echart' + row.id">
                    {{ row.volume_change_24h }}</div>
                </template>
              </el-table-column>

              <!-- <el-table-column prop="chart" label="Chart" align="center">
                <template #default="scope">
                  <div
                    style="
                      height: 40px;
                      width: 140px;
                      margin: 0 auto;
                      position: relative;
                      bottom: -14px;
                    "
                    :ref="setEchartRef"
                    :rowId="scope.row.id"
                    :id="'echart' + scope.row.id"
                  ></div>
                </template>
              </el-table-column> -->

              <el-table-column prop="" label="Trade" align="right" width="100">
                <template #default="scope">
                  <el-button class="table-buy" size="default" @click="handleBuy(scope.$index, scope.row)" plain>
                    <span>Buy</span>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane class="first-tab-pan" label="Turnover ranking" name="4">
            <el-table :data="coinMarketCapData[`tab-${4}`]" style="width: 100%">
              <el-table-column label="Asset">
                <template v-slot="{ row }" class="clearfloat">
                  <el-icon class="crypto-star clearfloat">
                    <StarFilled />
                  </el-icon>
                  <div class="crypto-icon">
                    <img :src="row.image" alt="icon" />
                  </div>
                  <div class="table-tag">
                    {{ row.symbol.toUpperCase() }}
                    <div class="table-asset">
                      {{ row.name }}
                    </div>
                  </div>

                </template>
              </el-table-column>
              <el-table-column prop="current_price" label="Last price" align="right" width="150">
                <template v-slot="{ row }">
                  ${{ row.current_price.toFixed(2) }}
                </template>
              </el-table-column>

              <el-table-column prop="volume_change_24h" label="Change(24H)" sortable width="200" align="right">
                <template v-slot="{ row }">
                  <span v-if="row.market_cap_change_percentage_24h > 0" style="color: #01c19a">
                    {{ row.market_cap_change_percentage_24h.toFixed(2) }}%
                  </span>
                  <span v-else-if="row.market_cap_change_percentage_24h < 0" style="color: #f15958">
                    {{ row.market_cap_change_percentage_24h.toFixed(2) }}%
                  </span>
                </template>
              </el-table-column>

              <el-table-column prop="chart" label="Chart" align="center">
                <template v-slot="{ row }">
                  <div style="
                      height: 40px;
                      width: 140px;
                      margin: 0 auto;
                      position: relative;
                      bottom: -14px;
                    " :ref="(e) => setEchartRef(e, 4)" :rowId="row.id" :id="'echart' + row.id">
                    {{ row.volume_change_24h }}</div>
                </template>
              </el-table-column>

              <!-- <el-table-column prop="chart" label="Chart" align="center">
                <template #default="scope">
                  <div
                    style="
                      height: 40px;
                      width: 140px;
                      margin: 0 auto;
                      position: relative;
                      bottom: -14px;
                    "
                    :ref="setEchartRef"
                    :rowId="scope.row.id"
                    :id="'echart' + scope.row.id"
                  ></div>
                </template>
              </el-table-column> -->

              <el-table-column prop="" label="Trade" align="right" width="100">
                <template #default="scope">
                  <el-button class="table-buy" size="default" @click="handleBuy(scope.$index, scope.row)" plain>
                    <span>Buy</span>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>

        <div class="first-part-link">
          <div class="view-more">
            <span>View all crypto assets for trading ></span>
          </div>
        </div>
      </div>
      <div class="part part01" v-if="windowWidth <= 768">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick" style="color: #01c19a" stretch="true">
          <el-tab-pane class="first-tab-pan" label="Popular assets" name="1">
            <el-table :data="coinMarketCapData[`tab-${1}`]" style="width: 100%">
              <el-table-column label="Asset" width="150">
                <template v-slot="{ row }" class="clearfloat">
                  <el-icon class="crypto-star clearfloat">
                    <StarFilled />
                  </el-icon>
                  <div class="crypto-icon">
                    <img :src="row.image" alt="icon" />
                  </div>
                  <div class="table-tag">
                    {{ row.symbol }}
                    <div class="table-asset">
                      {{ row.name }}
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="current_price" label="Last price" align="right" width="150">
                <template v-slot="{ row }">
                  ${{ row.current_price.toFixed(2) }}
                </template>
              </el-table-column>

              <el-table-column prop="volume_change_24h" label="Change(24H)" sortable width="200" align="right">
                <template v-slot="{ row }">
                  <span v-if="row.market_cap_change_percentage_24h > 0" style="color: #01c19a">
                    {{ row.market_cap_change_percentage_24h.toFixed(2) }}%
                  </span>
                  <span v-else-if="row.market_cap_change_percentage_24h < 0" style="color: #f15958">
                    {{ row.market_cap_change_percentage_24h.toFixed(2) }}%
                  </span>
                </template>
              </el-table-column>


              <el-table-column prop="chart" label="Chart" align="center">
                <template #default="scope">
                  <div style="
                      height: 40px;
                      width: 140px;
                      margin: 0 auto;
                      position: relative;
                      bottom: -14px;
                    " :ref="(e) => setEchartRef(e, 1)" :rowId="scope.row.id" :id="'echart' + scope.row.id"></div>
                </template>
              </el-table-column>

              <el-table-column prop="" label="Trade" align="right" width="100">
                <template #default="scope">
                  <el-button class="table-buy" size="default" @click="handleBuy(scope.$index, scope.row)" plain>
                    <span>Buy</span>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <!-- <el-tab-pane label="Popular assets" name="first">
            <el-table :data="coinMarketCapData" style="width: 100%">
              <el-table-column prop="asset" label="Asset">
                <template #default="scope">
                  <div style="display: flex; align-items: center">
                    <img class="table-img" :src="scope.row.img" alt="" />
                    <span class="table-tag">{{ scope.row.tag }}</span>
                    <span class="table-asset">{{ scope.row.asset }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="price" label="Last price" align="right">
                <template #default="scope">
                  <span class="table-price">{{ scope.row.price }}</span>
                  <div class="price-change">
                    <span
                      v-if="scope.row.change.indexOf('-') > -1"
                      style="color: #f15958"
                      >{{ scope.row.change }}
                    </span>
                    <span
                      v-if="scope.row.change.indexOf('+') > -1"
                      style="color: #01c19a"
                      >{{ scope.row.change }}
                    </span>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane> -->
          <el-tab-pane label="New assets" name="2">
            <el-table :data="coinMarketCapData[`tab-${2}`]" style="width: 100%">
              <el-table-column label="Asset" width="150">
                <template v-slot="{ row }" class="clearfloat">
                  <el-icon class="crypto-star clearfloat">
                    <StarFilled />
                  </el-icon>
                  <div class="crypto-icon">
                    <img :src="row.image" alt="icon" />
                  </div>
                  <div class="table-tag">
                    {{ row.symbol }}
                    <div class="table-asset">
                      {{ row.name }}
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="current_price" label="Last price" align="right" width="150">
                <template v-slot="{ row }">
                  ${{ row.current_price.toFixed(2) }}
                </template>
              </el-table-column>

              <el-table-column prop="volume_change_24h" label="Change(24H)" sortable width="200" align="right">
                <template v-slot="{ row }">
                  <span v-if="row.market_cap_change_percentage_24h > 0" style="color: #01c19a">
                    {{ row.market_cap_change_percentage_24h.toFixed(2) }}%
                  </span>
                  <span v-else-if="row.market_cap_change_percentage_24h < 0" style="color: #f15958">
                    {{ row.market_cap_change_percentage_24h.toFixed(2) }}%
                  </span>
                </template>
              </el-table-column>


              <el-table-column prop="chart" label="Chart" align="center">
                <template #default="scope">
                  <div style="
                      height: 40px;
                      width: 140px;
                      margin: 0 auto;
                      position: relative;
                      bottom: -14px;
                    " :ref="(e) => setEchartRef(e, 2)" :rowId="scope.row.id" :id="'echart' + scope.row.id"></div>
                </template>
              </el-table-column>

              <el-table-column prop="" label="Trade" align="right" width="100">
                <template #default="scope">
                  <el-button class="table-buy" size="default" @click="handleBuy(scope.$index, scope.row)" plain>
                    <span>Buy</span>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="Gains ranking" name="3">
            <el-table :data="coinMarketCapData[`tab-${3}`]" style="width: 100%">
              <el-table-column label="Asset" width="150">
                <template v-slot="{ row }" class="clearfloat">
                  <el-icon class="crypto-star clearfloat">
                    <StarFilled />
                  </el-icon>
                  <div class="crypto-icon">
                    <img :src="row.image" alt="icon" />
                  </div>
                  <div class="table-tag">
                    {{ row.symbol }}
                    <div class="table-asset">
                      {{ row.name }}
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="current_price" label="Last price" align="right" width="150">
                <template v-slot="{ row }">
                  ${{ row.current_price.toFixed(2) }}
                </template>
              </el-table-column>

              <el-table-column prop="volume_change_24h" label="Change(24H)" sortable width="200" align="right">
                <template v-slot="{ row }">
                  <span v-if="row.market_cap_change_percentage_24h > 0" style="color: #01c19a">
                    {{ row.market_cap_change_percentage_24h.toFixed(2) }}%
                  </span>
                  <span v-else-if="row.market_cap_change_percentage_24h < 0" style="color: #f15958">
                    {{ row.market_cap_change_percentage_24h.toFixed(2) }}%
                  </span>
                </template>
              </el-table-column>


              <el-table-column prop="chart" label="Chart" align="center">
                <template #default="scope">
                  <div style="
                      height: 40px;
                      width: 140px;
                      margin: 0 auto;
                      position: relative;
                      bottom: -14px;
                    " :ref="(e) => setEchartRef(e, 3)" :rowId="scope.row.id" :id="'echart' + scope.row.id"></div>
                </template>
              </el-table-column>

              <el-table-column prop="" label="Trade" align="right" width="100">
                <template #default="scope">
                  <el-button class="table-buy" size="default" @click="handleBuy(scope.$index, scope.row)" plain>
                    <span>Buy</span>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="Turnover ranking" name="4">
            <el-table :data="coinMarketCapData[`tab-${4}`]" style="width: 100%">
              <el-table-column label="Asset" width="150">
                <template v-slot="{ row }" class="clearfloat">
                  <el-icon class="crypto-star clearfloat">
                    <StarFilled />
                  </el-icon>
                  <div class="crypto-icon">
                    <img :src="row.image" alt="icon" />
                  </div>
                  <div class="table-tag">
                    {{ row.symbol }}
                    <div class="table-asset">
                      {{ row.name }}
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="current_price" label="Last price" align="right" width="150">
                <template v-slot="{ row }">
                  ${{ row.current_price.toFixed(2) }}
                </template>
              </el-table-column>

              <el-table-column prop="volume_change_24h" label="Change(24H)" sortable width="200" align="right">
                <template v-slot="{ row }">
                  <span v-if="row.market_cap_change_percentage_24h > 0" style="color: #01c19a">
                    {{ row.market_cap_change_percentage_24h.toFixed(2) }}%
                  </span>
                  <span v-else-if="row.market_cap_change_percentage_24h < 0" style="color: #f15958">
                    {{ row.market_cap_change_percentage_24h.toFixed(2) }}%
                  </span>
                </template>
              </el-table-column>


              <el-table-column prop="chart" label="Chart" align="center">
                <template #default="scope">
                  <div style="
                      height: 40px;
                      width: 140px;
                      margin: 0 auto;
                      position: relative;
                      bottom: -14px;
                    " :ref="(e) => setEchartRef(e, 4)" :rowId="scope.row.id" :id="'echart' + scope.row.id"></div>
                </template>
              </el-table-column>

              <el-table-column prop="" label="Trade" align="right" width="100">
                <template #default="scope">
                  <el-button class="table-buy" size="default" @click="handleBuy(scope.$index, scope.row)" plain>
                    <span>Buy</span>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
        <div class="part01-link">
          <span>View all crypto assets for trading ></span>
        </div>
      </div>

      <div class="part second-part">
        <el-row v-if="windowWidth > 768" style="padding-top: 60px">
          <el-col :span="12" :xs="0" class="second-part-left">
            <img :src="home_25" alt="" />
          </el-col>
          <el-col :span="11" :offset="1" :xs="20" class="second-part-right">
            <div class="first-level-title">
              {{ $t("messages.home.second_title") }}
            </div>
            <div class="second-part-guild">
              {{ $t("messages.home.second_sign") }}
            </div>
            <div class="second-level-title">
              <a href="#" class="no-underline link-color">{{
                $t("messages.home.second_sign")
              }}</a>{{ $t("messages.home.second_also")
}}<a href="#" class="no-underline link-color">{{
  $t("messages.home.second_verify")
}}</a>{{ $t("messages.home.second_msg") }}
            </div>
            <div class="second-part-guild">
              {{ $t("messages.home.second_Deposit") }}
            </div>
            <div class="second-level-title">
              {{ $t("messages.home.second_Easily")
              }}<a href="#" class="no-underline link-color">{{
  $t("messages.home.second_deposit")
}}</a>{{ $t("messages.home.second_into") }}
            </div>
            <div class="second-part-guild">
              {{ $t("messages.home.second_tradeCry") }}
            </div>
            <div class="second-level-title">
              <a href="#" class="no-underline link-color">{{
                $t("messages.home.second_shop")
              }}</a>{{ $t("messages.home.second_and")
}}<a href="#" class="no-underline link-color">{{
  $t("messages.home.second_trade")
}}</a>{{ $t("messages.home.second_with") }}
            </div>
            <GetButton type="success" :text="$t('messages.home.second_btn')" class="start-btn" style="margin-top: 40px">
            </GetButton>
          </el-col>
        </el-row>
        <el-row v-if="windowWidth <= 768" class="right">
          <el-col :span="24" :xs="24" >
            <div class="first-level-title">
              {{ $t("messages.home.second_title") }}
            </div>
            <div class="second-part-guild">
              {{ $t("messages.home.second_sign") }}
            </div>
            <div class="second-level-title">
              <a href="#" class="no-underline link-color">
                {{ $t("messages.home.second_sign") }}</a>{{ $t("messages.home.second_also")
                }}<a href="#" class="no-underline link-color">{{
  $t("messages.home.second_verify")
}}</a>{{ $t("messages.home.second_msg") }}
            </div>
            <div class="second-part-guild">
              {{ $t("messages.home.second_Deposit") }}
            </div>
            <div class="second-level-title">
              {{ $t("messages.home.second_Easily")
              }}<a href="#" class="no-underline link-color">{{
  $t("messages.home.second_deposit")
}}</a>{{ $t("messages.home.second_into") }}
            </div>
            <div class="second-part-guild">
              {{ $t("messages.home.second_tradeCry") }}
            </div>
            <div class="second-level-title">
              <a href="#" class="no-underline link-color">{{
                $t("messages.home.second_shop")
              }}</a>{{ $t("messages.home.second_and")
}}<a href="#" class="no-underline link-color">{{
  $t("messages.home.second_trade")
}}</a>{{ $t("messages.home.second_with") }}
            </div>
            <GetButton type="success" :text="$t('messages.home.second_btn')" class="start-btn"
              style="padding: 12px 16px !important"></GetButton>
            <img :src="home_25" alt="" style="margin-top: 40px" />
          </el-col>
        </el-row>
      </div>
      <div class="part third-part">
        <el-row v-if="windowWidth > 768">
          <el-col :span="11" :offset="1" class="third-part-left">
            <div class="first-level-title third-part-title">
              {{ $t("messages.home.third_title") }}
              <span>{{ $t("messages.home.third_titlespan") }}</span>
            </div>
            <div class="second-level-title third-down">
              <a href="#" class="no-underline link-color">{{
                $t("messages.home.third_msgname")
              }}</a>
              {{ $t("messages.home.third_msg") }}
            </div>
            <div class="second-level-title third-down">
              {{ $t("messages.home.third_service") }}
            </div>
            <GetButton type="success" :text="$t('messages.home.second_btn')" class="start-btn" style="margin-top: 40px">
            </GetButton>
            <div style="width: 100px" class="third-down">
              <img :src="part03_b1" alt="" />
            </div>
          </el-col>
          <el-col :span="9" :offset="2" class="third-part-img third-part-right">
            <img :src="part03_im1" alt="" />
          </el-col>
        </el-row>
        <el-row v-if="windowWidth <= 768">
          <el-col :span="22">
            <div class="first-level-title third-part-title">
              {{ $t("messages.home.third_title") }}
              <span>{{ $t("messages.home.third_titlespan") }}</span>
            </div>
            <div class="second-level-title third-down">
              <a href="#" class="no-underline link-color">{{
                $t("messages.home.third_msgname")
              }}</a>
              {{ $t("messages.home.third_msg") }}
            </div>
            <div class="second-level-title third-down">
              {{ $t("messages.home.third_service") }}
            </div>
            <GetButton type="success" :text="$t('messages.home.second_btn')" class="start-btn"></GetButton>

            <div class="third-part-img">
              <img :src="part03_im1" alt="" />
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="forth-part" v-if="windowWidth > 985">
        <img class="forth-img" :src="part04" alt="" />
        <img class="forth-img-pc forth-part-bottom" :src="pc" alt="" />
        <div class="forth-title max1290 forth-part-top">
          <div>
            {{ $t("messages.home.forth_dynamic") }}<br />
            <span>{{ $t("messages.home.forth_multiple") }}</span>
            {{ $t("messages.home.forth_and") }}
            <span>{{ $t("messages.home.forth_widgets") }}</span>
            {{ $t("messages.home.forth_limitations") }}<br />
            {{ $t("messages.home.forth_innovative") }}
          </div>
          <div>
            <GetButton class="trade-btn" type="success" :text="$t('messages.home.forth_trade')" />
          </div>
        </div>
      </div>
      <div class="forth-part" v-if="windowWidth <= 985">
        <img class="forth-img" :src="part04" alt="" />
        <div class="forth-title max1290">
          <div>
            {{ $t("messages.home.forth_dynamic") }}<br />
            <span>{{ $t("messages.home.forth_multiple") }}</span>
            {{ $t("messages.home.forth_and") }}
            <span>{{ $t("messages.home.forth_widgets") }}</span>
            {{ $t("messages.home.forth_limitations") }}<br />
            {{ $t("messages.home.forth_innovative") }}
          </div>
          <div>
            <GetButton class="trade-btn" type="success" :text="$t('messages.home.forth_trade')" />
          </div>
        </div>
      </div>

      <div class="part fifth-part">
        <div class="first-level-title">
          {{ $t("messages.home.fifth_why") }}
          <span>{{ $t("messages.home.fifth_CoinByte") }}</span>?
        </div>
        <div class="fifth-second-title">
          {{ $t("messages.home.fifth_exchange") }}
        </div>
        <img :src="part05_b1" alt="" class="fifth-part-top-img" />
        <div class="fifth-part-card">
          <div class="card-item" v-for="(item, index) in cardList" :key="index">
            <img :src="item.src" alt="" />
            <div class="card-title">{{ item.title }}</div>
            <div class="card-desc">{{ item.desc }}</div>
            <div v-if="item.btn" class="card-btn">{{ item.btn }} &gt;</div>
          </div>
          <div class="card-item">
            <img class="last-img" :src="part05_b2" alt="" />
          </div>
        </div>
      </div>

      <div class="bg-gray" v-if="windowWidth > 768">
        <div class="sixth-part part">
          <img class="sixth-part-top" :src="part06_icon01" alt="" />
          <div class="first-level-title" style="margin-top: 8px">
            <span>{{ $t("messages.home.sixth_Premium") }}</span>{{ $t("messages.home.sixth_support") }}
          </div>
          <div class="sixth-part-card">
            <div class="card-item" v-for="(item, index) in cardSupport" :key="index">
              <img class="item-img" :src="item.src" alt="" />
              <div class="card-title">{{ item.title }}</div>
              <div class="card-desc">{{ item.desc }}</div>
            </div>
            <div class="card-item" style="visibility: hidden"></div>
          </div>
          <GetButton type="success" class="sixth-part-top-btn" :text="t('messages.home.sixth_btn')" style="
              margin-top: 40px;
              box-shadow: 4px 4px 10px 0 rgba(146, 146, 146, 0.5);
            " />
        </div>
      </div>
      <div class="bg-gray" v-if="windowWidth <= 768">
        <div class="sixth-part">
          <img class="sixth-part-top" :src="part06_icon01" alt="" />
          <div class="first-level-title">
            <span>{{ $t("messages.home.sixth_Premium") }}</span>{{ $t("messages.home.sixth_support") }}
          </div>
          <div class="sixth-part-card">
            <div class="card-item" v-for="(item, index) in minCardList2" :key="index">
              <img :src="item.src" alt="" />
              <div class="card-title">{{ item.title }}</div>
              <div class="card-desc">{{ item.desc }}</div>
            </div>
            <!-- <div class="card-item" style="visibility: hidden"></div> -->
          </div>
          <GetButton class="sixth-btn" type="success" :text="t('messages.home.sixth_btn')" />
        </div>
      </div>

      <div class="seventh-part max1290" v-if="windowWidth > 768">
        <div class="first-level-title">
          {{ $t("messages.home.seventh_explore")
          }}<span>{{ $t("messages.home.seventh_coin") }}</span>
        </div>
        <el-row class="seventh-part-list" type="flex" justify="space-between" :gutter="40">
          <el-col :span="7" class="seventh-part-listItem">
            <div class="seventh-part-img">
              <img :src="part07_pic01" alt="" />
            </div>
            <div class="item-title">
              {{ $t("messages.home.seventh_how") }}
            </div>
          </el-col>
          <el-col :span="7" class="seventh-part-listItem">
            <div class="seventh-part-img">
              <img :src="part07_pic02" alt="" />
            </div>
            <div class="item-title">
              {{ $t("messages.home.seventh_start") }}
            </div>
          </el-col>
          <el-col :span="7" class="seventh-part-listItem">
            <div class="seventh-part-img">
              <img :src="part07_pic03" alt="" />
            </div>
            <div class="item-title">
              {{ $t("messages.home.seventh_earn") }}
            </div>
          </el-col>
        </el-row>
        <div class="view-more">
          <span>{{ $t("messages.home.seventh_more") }} &gt;</span>
        </div>
      </div>

      <div class="seventh-part max1290" v-if="windowWidth <= 768">
        <div class="first-level-title">
          {{ $t("messages.home.seventh_explore")
          }}<span>{{ $t("messages.home.seventh_coin") }}</span>
        </div>
        <el-row class="seventh-part-list" type="flex" justify="space-between" :gutter="40">
          <el-col :span="24" class="listItem">
            <div class="seventh-part-img">
              <img :src="part07_pic01" alt="" />
            </div>
            <div class="item-title">
              {{ $t("messages.home.seventh_how") }}
            </div>
          </el-col>
          <el-col :span="24" class="listItem">
            <div class="seventh-part-img">
              <img :src="part07_pic02" alt="" />
            </div>
            <div class="item-title">
              {{ $t("messages.home.seventh_start") }}
            </div>
          </el-col>
          <el-col :span="24" class="listItem">
            <div class="seventh-part-img">
              <img :src="part07_pic03" alt="" />
            </div>
            <div class="item-title">
              {{ $t("messages.home.seventh_earn") }}
            </div>
          </el-col>
        </el-row>
        <div class="view-more" style="margin-top: 0px">
          <span>{{ $t("messages.home.seventh_more") }} &gt;</span>
        </div>
      </div>
      <faq></faq>
      <div class="bottom-part">
        <joinCrypto />
      </div>
    </div>

    <Footer v-if="windowWidth > 769" />
    <FooterMobile v-if="windowWidth <= 769"></FooterMobile>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onUnmounted, onMounted, watch as vueWatch } from "vue";
import Header from "../../layout/Header/Header.vue";
import Footer from "../../layout/Footer/Footer.vue";
import FooterMobile from "../../layout/Footer/FooterMobile.vue";
import joinCrypto from "../../layout/joinStarted/joinCrypto.vue";
import faq from "../../layout/FAQ/faq.vue";
import GetButton from "../../components/GetButton.vue";
import { getCoinMarketCap, getLastCoinMarketCap } from "../../api/market";
import { queryCurrenciesType } from "../../api/currencies";
//icon
import { Right, CaretBottom, CaretTop } from "@element-plus/icons";
import type { TabsPaneContext } from "element-plus";
// img
import registered_icon from "../../assets/home/registered_icon.png";
import banner_01 from "../../assets/home/banner_01.png";
import banner_code from "../../assets/home/banner_code.png";
import part03_im1 from "../../assets/home/part03_im1.png";
import part03_b1 from "../../assets/home/part03_b1.png";
import part07_pic01 from "../../assets/home/part07_pic01.png";
import part07_pic02 from "../../assets/home/part07_pic02.png";
import part07_pic03 from "../../assets/home/part07_pic03.png";
import home_25 from "../../assets/home/编组 25.png";
import part04 from "../../assets/home/part04.png";
import pc from "../../assets/home/pc.png";
import part05_b1 from "../../assets/home/part05_b1.png";
import part05_b2 from "../../assets/home/part05_b2.png";
import part05_icon01 from "../../assets/home/part05_icon01.png";
import part05_icon02 from "../../assets/home/part05_icon02.png";
import part05_icon03 from "../../assets/home/part05_icon03.png";
import part05_icon04 from "../../assets/home/part05_icon04.png";
import part05_icon05 from "../../assets/home/part05_icon05.png";
import part05_icon06 from "../../assets/home/part05_icon06.png";
import part05_icon07 from "../../assets/home/part05_icon07.png";
import part06_icon01 from "../../assets/home/part06_icon01.png";
import part06_icon02 from "../../assets/home/part06_icon02.png";
import part06_icon03 from "../../assets/home/part06_icon03.png";
import part06_icon04 from "../../assets/home/part06_icon04.png";
import part06_icon05 from "../../assets/home/part06_icon05.png";
import part06_icon06 from "../../assets/home/part06_icon06.png";

import * as echarts from "echarts";


import BTC from "../../assets/home/part01_BTC.png";
import ETH from "../../assets/home/part01_ETH.png";
import USDT from "../../assets/home/crypto_icon_usdt.png";
import USDC from "../../assets/home/crypto_icon_usdc.png";
import BNB from "../../assets/home/BNB.png";
import XRP from "../../assets/home/xrp.png";
import ADA from "../../assets/home/crypto_icon_ada.png";
import DOGE from "../../assets/home/dogecoin.png";
import MATIC from "../../assets/home/polygon.png";
import SOL from "../../assets/home/solana.png";

import { storeToRefs } from "pinia";
import { tradeStore } from "../../store/trade";
import { getProfile } from "../../api/user";
import { useUserInfoStore } from "../../store/user";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { watch } from "fs";
// add animal
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger)

const router = useRouter();

const { t } = useI18n();

const useTradeStore = tradeStore()
const { currencySlug, currencyName, currencyIcon } = storeToRefs(useTradeStore)
// 货币类型\
interface Coin {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  image: string;
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

const coinMarketCapData = ref<any>([]);

onMounted(async () => {
  refreshData();
  refreshData(2);
  refreshData(3);
  refreshData(4);
  setInterval(() => {
    refreshData();
    refreshData(2);
    refreshData(3);
    refreshData(4);
  }, 60000 * 5);

 gsap.from(".banner-left", {
    scrollTrigger: {
      trigger: ".banner-left",
      start: "top center", // 当触发元素的顶部到达视口中心时开始动画
      end: "bottom bottom", // 当触发元素的底部离开视口底部时结束动画
      toggleActions: "play none none reverse",
    },
      x: -200, // 动画的目标值
      duration: 1.2, // 动画的持续时间
  });
  gsap.from(".banner-right", {
    scrollTrigger: {
      trigger: ".banner-right",
      start: "top center", // 当触发元素的顶部到达视口中心时开始动画
      end: "bottom bottom", // 当触发元素的底部离开视口底部时结束动画
      toggleActions: "play none none reverse",
    },
      x: 200, // 动画的目标值
      duration: 1.2, // 动画的持续时间
  });
  
  gsap.from(".first-part", {
    scrollTrigger: {
      trigger: ".first-part",
      toggleActions: "play none none reverse",
    },
      y: 200, // 动画的目标值
      duration: 0.8, // 动画的持续时间
  });

  gsap.from(".second-part-left", {
    scrollTrigger: {
      trigger: ".second-part-left",
      start: "top-=560",
      end: "bottom bottom",
      toggleActions: "play none none reverse",
    },
    autoAlpha: 0, // 从完全透明和不可见开始
    x: -200, // 从左边200px的位置开始
    ease: "power2.out", // 使用Power2缓动函数
    duration: 1.5,
  });

  // 右边部分的动画
  gsap.from(".second-part-right", {
    scrollTrigger: {
      trigger: ".second-part-right",
      start: "top-=750",
      end: "bottom bottom",
      toggleActions: "play none none reverse",
    },
    autoAlpha: 0, // 从完全透明和不可见开始
    y: 200, // 从右边200px的位置开始
    ease: "power2.out", // 使用Power2缓动函数
    duration: 1.5,
  });
 
  gsap.from(".third-part-left", {
    scrollTrigger: {
      trigger: ".third-part-left",
      start: "top center",
      end: "bottom bottom",
      toggleActions: "play none none reverse",
    },
    autoAlpha: 0, // 从完全透明和不可见开始
    y: 200, // 从下边200px的位置开始
    ease: "power2.out", // 使用Power2缓动函数
    duration: 1.5,
  });

  // 右边部分的动画
  gsap.from(".third-part-right", {
    scrollTrigger: {
      trigger: ".third-part-right",
      start: "top center",
      end: "bottom",
      toggleActions: "play none none reverse",
    },
    autoAlpha: 0, // 从完全透明和不可见开始
    x: 200, // 从右边200px的位置开始
    ease: "power2.out", // 使用Power2缓动函数
    duration: 1.5,
  });
  
  gsap.from(".forth-part-top", {
    scrollTrigger: {
      trigger: ".forth-part-top",
      start: "top center", // 当触发元素的顶部到达视口中心时开始动画
      end: "bottom bottom", // 当触发元素的底部离开视口底部时结束动画
      toggleActions: "play none none reverse",
    },
    y: -100, // 动画的目标值
    opacity: 0, // 从完全透明开始
    scale: 0, // 从无到有
    // rotation: 180, // 旋转180度
    duration: 1.8, // 动画的持续时间
  });
  gsap.from(".forth-part-bottom", {
    scrollTrigger: {
      trigger: ".forth-part-bottom",
      start: "top 90%", // 当触发元素的顶部到达视口中心时开始动画
      end: "bottom bottom", // 当触发元素的底部离开视口底部时结束动画
      toggleActions: "play none none reverse",
    },
    scale: 1.4, 
    duration: 1, // 动画的持续时间
  });
  gsap.from(".fifth-part-card", {
    scrollTrigger: {
      trigger: ".fifth-part-card", // 修改这里
      start: "top center",
      end: "bottom bottom",
      toggleActions: "play none none reverse",
    },
    autoAlpha: 0, // 从完全透明和不可见开始
    ease: "power2.out", // 使用Power2缓动函数
    duration: 1.5,
  });
  gsap.fromTo(".sixth-part-top", {
    scale: 0.8, // 开始时的缩放比例
    rotation: 0, // 开始时的旋转角度
  }, {
    scrollTrigger: {
      trigger: ".sixth-part-top",
      start: "top center",
      end: "bottom bottom",
      toggleActions: "play none none reverse",
    },
    scale: 1.2, // 结束时的缩放比例
    rotation: 360, // 结束时的旋转角度
    repeat: -1, // 无限重复动画
    yoyo: true, // 在每次迭代结束时反向动画
    ease: "power2.inOut", // 使用Power2缓动函数
    duration: 2, // 动画的持续时间
  });
  gsap.to(".sixth-part-top-btn", {
    scale: 1.1, // 缩放到 slightly larger
    repeat: -1, // 无限重复动画
    yoyo: true, // 在每次迭代结束时反向动画
    duration: 0.5, // 每次缩放的持续时间
    ease: "sine.inOut" // 使用 sine 缓动函数，为动画添加自然的加速和减速
  });
  
  gsap.from(".seventh-part-listItem", {
    scrollTrigger: {
      trigger: ".seventh-part-listItem",
      start: "top-=450", // 当元素顶部到达视口底部时开始动画
      end: "bottom bottom", // 当元素底部离开视口顶部时结束动画
      toggleActions: "play none reverse none", // 在滚动离开和滚动回来时反向播放动画
      markers: false, // 设置为true可以在页面上看到触发点
    },
    opacity: 0, // 开始时的不透明度
    y: 50, // 从50px的Y轴位置开始
    scale: 0.95, // 开始时的缩放比例
    duration: 1, // 动画持续时间
    ease: "back.out(1.7)", // 使用back缓动效果，括号内的数字越大，回弹越大
    stagger: {
      amount: 0.3, // 整体动画的持续时间，用于计算每个元素的延迟
      from: "start", // 从第一个元素开始逐个播放动画
    }
  });

});

const coinSymbolToName: {
  [key: string]: string
} = {
  BTC: 'bitcoin',
  ETH: 'ethereum',
  XRP: 'ripple',
  LTC: 'litecoin',
  DOT: 'polkadot',
  SOL: 'solana',
  DOGE: 'dogecoin',
  LINK: 'chainlink',
  USDC: 'usdcoin',
  BCH: 'bitcoincash',
  NEO: 'neo',
  USDT: 'tether',
  TRX: 'tron',
  EOS: 'eos',
  NANO: 'nano',
  MIOTA: 'iota',
  ENJ: 'enjincoin',
  CRV: 'curvedaotoken',
  VIOLET: 'violetcoin',
  FRONT: 'frontier'
  // 添加更多的加密货币
};

async function refreshData(typeId: number = 1) {
  try {
    const coins: any = await queryCurrenciesType(
      {
        typeId: typeId
      }
    );
    const symbols = coins.data.content.map((v: any) => v.alias && v.alias.toLowerCase());
    const response = await getLastCoinMarketCap(
      {
        symbols: symbols.join(',')
      }
    );
    const resJson = JSON.parse(response.data);
    // const arr = [];
    // // object for getting
    // for (let key in resJson.data) {
    //   arr.push(resJson.data[key][0])
    // }
    coinMarketCapData.value[`tab-${typeId}`] = resJson;
    const symbolsSlug = coinMarketCapData.value[`tab-${typeId}`].map((v: any) => v.id)
    const chartRes = await getCoinMarketCap({
      symbols: symbolsSlug.join(','),
      days: 1,
      interval: 2
    });
    coinMarketCapData.value[`tab-${typeId}`].forEach((v: any) => {
      // getChart(v.id).then((res) => {
      //   v.data = res;
      // })
      v.data = getChart(chartRes.data[v.id]);
      v.isUp = v.data[0] < v.data[v.data.length - 1];
    });
    console.log(coinMarketCapData.value)
  } catch (error) {
    console.error(error);
  }
}

const activeName = ref("1");

// vueWatch(activeName, (value) => {
//   refreshData(Number(value));
// })

function getChart(chartJson: any) {

  const jsonData: any = JSON.parse(chartJson);

  const mapData = jsonData['prices'].map((item: any) => {
    // const localTime = moment();
    // const offsetInMinutes = localTime.utcOffset();
    // const offsetInHours = offsetInMinutes / 60;
    // item[0] = moment(item[0]).add(offsetInHours, 'hours').valueOf()

    // return {
    //   time: Math.floor(item[0] / 1000),
    //   value: item[1],
    // };

    return item[1];
  });

  // const newArray = mapData.reduce((result:any, value:any, index:any) => {
  //   if (index % 10 === 0) {
  //     result.push(value);
  //   }
  //   return result;
  // }, []);
  // console.log(mapData)
  return mapData;
}


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

const dialogTableVisible = ref(false);

const gridData = [
  {
    title: "ASIC registered",
    content1: "Australian Securities andInvestment Commission",
    content2: "ACN 637345290",
    address: "ASIC website",
  },
];
const gridData1 = [
  {
    title: "AUSTRAC registered",
    content1: "Australian Transaction Reports & Analysis Centre",
    content2: "100576214",
    content3: "Digital Currency Exchange DCE100662269-001",
    content4: "Remittance Service Provider IND100662269-001",
    address: "AUSTRAC website",
  },
];
const tableChart = <any>ref(null);
const handleSelect = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath);
};
// tabs

const handleClick = (tab: TabsPaneContext, event: Event) => {
  // console.log(tab, event);
};

const tableData = [
  {
    id: 1,
    img: BTC,
    tag: "BTC",
    asset: "Bitcoin",
    price: "$22,678.00",
    change: "-2.58%",
    type: "up",
    data: [30, 20, 30, 10, 50, 60],
  },
  {
    id: 2,
    img: ETH,
    tag: "ETH",
    asset: "Ethereum",
    price: "$1,570",
    change: "+0.25%",
    type: "up",
    data: [30, 20, 30, 10, 50, 60],
  },
  {
    id: 3,
    img: USDT,
    tag: "USDT",
    asset: "OKB",
    price: "$15.44",
    change: "+0.88%",
    type: "up",
    data: [30, 20, 30, 10, 50, 60],
  },
  {
    id: 4,
    img: BNB,
    tag: "BNB",
    asset: "OKC Token",
    price: "$15.56",
    change: "-0.02%",
    type: "up",
    data: [30, 20, 30, 10, 50, 60],
  },
  {
    id: 5,
    img: USDC,
    tag: "USDC",
    asset: "Litecoin",
    price: "$56.57",
    change: "-2.58%",
    type: "down",
    data: [20, 20, 60],
  },
  {
    id: 6,
    img: XRP,
    tag: "XRP",
    asset: "Polkadot",
    price: "$7.40",
    change: "-1.67%",
    type: "down",
    data: [10, 20, 30],
  },
  {
    id: 7,
    img: ADA,
    tag: "ADA",
    asset: "Cardano",
    price: "$0.49",
    change: "+0.20%",
    type: "up",
    data: [10, 0, 30, 0, 50, 10, 90],
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
const createChart = (dom: HTMLDivElement, data: Array<any>, color: string) => {
  let myChart = echarts.init(dom);
  function colorRgba(sHex: any, p: any) {
    // 十六进制颜色值的正则表达式
    var reg =
      /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{4}|[0-9a-fA-f]{6}|[0-9a-fA-f]{8})$/;
    /* 16进制颜色转为RGB格式 */
    var sColor = sHex.toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4 || sColor.length === 5) {
        var sColorNew = "#";
        for (var i = 1; i < sColor.length; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      //  处理六位的颜色值
      var sColorChange = [];
      for (var i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
      }
      return "rgba(" + sColorChange.join(",") + "," + p + ")";
    } else {
      return sColor;
    }
  }
  const options: echarts.EChartsOption = {
    grid: {
      left: "0",
      top: "0",
      right: "0",
      bottom: "0",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      //不显示x轴线
      show: false,
    },
    yAxis: {
      type: "value",
      show: false,
      // min:function(value){
      //   return Math.floor(value.min / 10) * 10;
      // }
    },
    series: [
      {
        data: data,
        //单独修改当前线条的颜色
        lineStyle: {
          color: color,
          width: 1.5,
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: colorRgba(color, 0.2),
            },
            {
              offset: 1,
              color: colorRgba(color, 0.1),
            },
          ]),
        },
        type: "line",
        // smooth: true,
        symbol: "none",
      },
    ],
  };
  myChart.setOption(options);
};
const echartDomRef = [];

// const setEchartRef: any = (el: HTMLDivElement) => {
//   // console.log(el);
//   if (el) {
//     echartDomRef.push(el);
//     const data = tableData.find(
//       (e) => e.id === Number(el.getAttribute("rowId"))
//     )?.data;
//     const type = tableData.find(
//       (e) => e.id === Number(el.getAttribute("rowId"))
//     )?.type;
//     let color = type == "up" ? "#01C19A" : "#F15958";
//     createChart(el, data as Array<any>, color);
//   }
// };

const setEchartRef: any = (el: HTMLDivElement, typeId: number = 1) => {
  if (el) {
    echartDomRef.push(el);
    const foundData = coinMarketCapData.value[`tab-${typeId}`].find(
      (e: any) => {
        return e.id === el.getAttribute("rowId");
      }
    );
    const data = foundData.data;
    const type = foundData.isUp ? 'up' : 'down';

    let color = type == "up" ? "#01C19A" : "#F15958";
    createChart(el, data as Array<any>, color);
  }
};

const handleBuy = (index: number, row: Coin) => {
  console.log(index, row);
  currencySlug.value = row.symbol?.toUpperCase()
  currencyName.value = row.name
  currencyIcon.value = row.image
  router.push('/trade/' + row.symbol);
};
const forthList = [
  {
    number: 1,
    message: "View real-time cryptocurrency prices",
  },
  {
    number: 2,
    message:
      "Buy and sell BTC, ETH, XRP, OKB and other digital assets with ease",
  },
  {
    number: 3,
    message: "Get live price-change alerts for cryptocurrencies you follow",
  },
  {
    number: 4,
    message: "Check BTC spot, futures and options prices",
  },
  {
    number: 5,
    message: "Compare cryptocurrency prices across exchanges",
  },
];
const cardList = [
  {
    src: part05_icon01,
    title: t("messages.home.fifth_regulation"),
    desc: t("messages.home.fifth_regulationMsg"),
  },
  {
    src: part05_icon02,
    title: t("messages.home.fifth_fiat"),
    desc: t("messages.home.fifth_fiatMsg"),
  },
  {
    src: part05_icon03,
    title: t("messages.home.fifth_Totally"),
    desc: t("messages.home.fifth_TotallyMsg"),
  },
  {
    src: part05_icon04,
    title: t("messages.home.fifth_Institutional"),
    desc: t("messages.home.fifth_InstitutionalMsg"),
    btn: t("messages.home.fifth_btncheck"),
  },
  {
    src: part05_icon05,
    title: t("messages.home.fifth_API"),
    desc: t("messages.home.fifth_APIMsg"),
    btn: t("messages.home.fifth_btnAPI"),
  },
  {
    src: part05_icon06,
    title: t("messages.home.fifth_2FA"),
    desc: t("messages.home.fifth_2FAMsg"),
  },
  {
    src: part05_icon07,
    title: t("messages.home.fifth_Fast"),
    desc: t("messages.home.fifth_FastMsg"),
  },
];

const cardSupport = [
  {
    src: part06_icon02,
    title: t("messages.home.sixth_chat"),
    desc: t("messages.home.sixth_rated"),
  },
  {
    src: part06_icon03,
    title: t("messages.home.sixth_Educational"),
    desc: t("messages.home.sixth_Arrange"),
  },
  {
    src: part06_icon04,
    title: t("messages.home.sixth_Client"),
    desc: t("messages.home.sixth_Invaluable"),
  },
  {
    src: part06_icon05,
    title: t("messages.home.sixth_Knowledge"),
    desc: t("messages.home.sixth_resources"),
  },
  {
    src: part06_icon06,
    title: t("messages.home.sixth_Apply"),
    desc: t("messages.home.sixth_Verify"),
  },
];
const minCardList2 = [
  {
    src: part06_icon02,
    title: t("messages.home.sixth_chat"),
    desc: t("messages.home.sixth_rated"),
  },
  {
    src: part06_icon03,
    title: t("messages.home.sixth_Educational"),
    desc: t("messages.home.sixth_Arrange"),
  },
  {
    src: part06_icon04,
    title: t("messages.home.sixth_Client"),
    desc: t("messages.home.sixth_Invaluable"),
  },
  {
    src: part06_icon05,
    title: t("messages.home.sixth_Knowledge"),
    desc: t("messages.home.sixth_minResources"),
  },
  {
    src: part06_icon06,
    title: t("messages.home.sixth_Apply"),
    desc: t("messages.home.sixth_minVerify"),
  },
];

//Get client profile data
const userInfoStore = useUserInfoStore();

onMounted(() => {
  if (userInfoStore.isLogin) {
    getProfile().then((res) => {
      console.log(res.data);
      userInfoStore.updateUserInfo(res.data);
    });
  }
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>

