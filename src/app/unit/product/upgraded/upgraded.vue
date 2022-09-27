<template>
  <div class="con">
    <div class="d-flex justify-content-center align-items-center">
      <h5 class="header-title m-0 shape-text">{{ $t("upgraded") }}</h5>
      <img
          alt=""
          class="header-shape-page"
          src="@/assets/img/svg/appbarShape.svg"
      />
    </div>
    <div class="d-flex mt-2" style="cursor: pointer !important">
<!--      <div-->
<!--          :class="selectedTab === 1 ? 'temp-bottom-border' : ''"-->
<!--          class="w-50 tabs text-center"-->
<!--          @click="upgradaProduct"-->
<!--      >-->
<!--        {{ $t("products") }}-->
<!--      </div>-->
<!--      <div-->

<!--          class="w-100 tabs text-center"-->
<!--          @click="selectStoryTab"-->
<!--      >-->
<!--        {{ $t("stories") }}-->
<!--      </div>-->
    </div>

    <div v-if="selectedTab == 2" class="">
      <div
          v-for="product in state.allProducts"
          :key="product"
          class="bg-light d-flex p-2 product mt-3 uper-card-1"
      >
        <div>
          <img v-lazy="product.imageUrl + '_sm.webp'" class="product-img m-1" />
        </div>
        <div class="smart-text-align mx-2">
          <div>{{ product.name }}</div>
          <div class="d-flex smart-text-align my-1">
            <div class="green">{{ product.cost }}</div>
            <Currency :currencyId="product.currencyId" class="mx-2" />
          </div>
          <div>{{ $t("stationNumber") }} :{{ product.place }}</div>
          <div>
            {{
              $filters.jalali(
                  product.createDate,
                  true
              )
            }}
          </div>
        </div>
      </div>
    </div>
<!--      <loading v-if="this.state.loading"/>-->
    <p class="no-item" v-if="state.allStories.length == 0">{{$t("noItem")}}</p>
    <div v-if="selectedTab == 1" class="text-center mt-3">
      <div class="text-center w-50 mx-auto">
        <select
            id="storySelect"
            v-model="state.storyType"
            class="select-box w-100 smart-text-align"
            name="storySelect"
            @change="storySelectChange"
        >
          <option :value="null">{{ $t("all") }}</option>
          <option value="1">{{ $t("consultHome") }}</option>
          <option value="2">{{ $t("cityHome") }}</option>
          <option value="3">{{ $t("productSearch") }}</option>
          <option value="4">{{ $t("pageSearch") }}</option>
          <option value="5">{{ $t("hashtagSearch") }}</option>
        </select>
      </div>
      <div
          v-for="(story, index) in state.allStories"
          class="bg-light d-flex p-2 product mt-3 uper-card-1"
          @click="openStory(index)"
      >
        <div>
          <img v-lazy="story.fileUrl" class="story-img m-1" />
          <div>{{ story.caption }}</div>
        </div>
        <div class="smart-text-align mx-2">
          <div>{{ returnStoryTypeText(story.type) }}</div>
          <div>sara</div>
        </div>
      </div>
    </div>
  </div>

  <Dialog
      v-if="state.allStories[storysId]"
      v-model:visible="storyDialog"
      :breakpoints="{
      '2000px': '30vw',
      '1000px': '40vw',
      '800px': '60vw',
      '600px': '90vw',
    }"
      :contentStyle="{
      background: 'rgb(255, 255, 255)',
      borderRadius: '12px',
    }"
      :showHeader="false"
      :style="{ padding: '10px', border: 'none', width: 'auto' }"
      dismissableMask
      header=""
      modal
  >
    <div class="w-100 bg-light m-2">
      <div
          id="myBar"
          :style="{ width: `${barWidth}%` }"
          class="bg-secondary color-secondary"
      >

      </div>
    </div>
    <img
        v-lazy="state.allStories[storysId].fileUrl"
        alt=""
        class="object-fit-cover mx-auto story-style w-100"
    />
  </Dialog>
<!--<upgrade v-if="route.params.unit "/>-->
</template>

<script>
import { i18n } from "@/main";
import { ref, onMounted } from "vue";
import { UpgradedState } from "./upgradedState";
import Currency from "@/app/public/shared/currency/Currency.vue";
import {useRoute} from "vue-router";
import router from "@/core/router/router";
import Loading from "@/app/public/shared/loading/Loading";
export default {
  name: "upgraded",
  components: {Loading, Currency  },
  setup() {
    const route = useRoute()
    const selectedTab = ref(1);
    const state = ref(new UpgradedState());
    const storysId = ref();
    const storyDialog = ref(false);
    const setTime = ref();
    const barWidth = ref(1);

    function selectPostTab() {
      // products
      if (selectedTab.value != 1) {
        selectedTab.value = 1;
        state.value.skipProduct = 0;
        state.value.getForBuyer(false); // isScroll==false --> first time
      }
    }

    function upgradaProduct() {
      selectedTab.value = 1;
      router.push('/upgradeditems/1')
    }

    function selectStoryTab() {
      // stories
      state.value.storyType = null;
      state.value.skipStory = 0;
      selectedTab.value = 2;
      state.value.getUpgradePageStoriesForBuyer(true); // isScroll==false --> first time
    }

    function storySelectChange() {
    }

    function returnStoryTypeText(type) {
      if (type == null) return i18n.global.tc("all");
      else if (type === 1) return i18n.global.tc("consultHome");
      else if (type === 2) return i18n.global.tc("cityHome");
      else if (type === 3) return i18n.global.tc("productSearch");
      else if (type === 4) return i18n.global.tc("pageSearch");
      else if (type === 5) return i18n.global.tc("hashtagSearch");


      function openStory(Id) {
        barWidth.value = 0;
        moveprogress();
        storysId.value = Id;
        let duration = 15000;
        storyDialog.value = !storyDialog.value;
        setTime.value = setInterval(() => {
          moveprogress();
          storysId.value += 1;
          if (storysId.value === state.value.allStories.length) {
            endShowSrory();
          }
        }, duration);
      }

      function moveprogress() {
        var i = 0;
        if (i == 0) {
          i = 1;
          var width = 0;
          barWidth.value = 0;

          var id = setInterval(() => {
            if (barWidth.value >= 100) {
              clearInterval(id);
              i = 0;
            } else {
              barWidth.value = barWidth.value + 0.44;
            }
          }, 67);
        }
      }

      function endShowSrory() {
        storyDialog.value = false;
        clearInterval(setTime.value);
      }

      onMounted(() => {
        state.value.getForBuyer(false);
        state.value.getUpgradePageStoriesForBuyer(false);
        // isScroll==false --> first time
      });
      return {
        selectedTab,
        barWidth,
        storysId,
        state,
        upgradaProduct,
        returnStoryTypeText,
        storySelectChange,
        selectStoryTab,
        selectPostTab,
        moveprogress,
        storyDialog,
        endShowSrory,
        route,
        router
      };
    }
  },
};
</script>

<style scoped>
.header-title {
  text-align: center;
  width: 100%;
  position: absolute;
}

.temp-bottom-border {
  border-bottom: 3px solid #206fc4;
}

.shape-text {
  position: absolute;
  top: 10px;
  font-size: 16px;
}

.tabs {
  height: 41px;
  padding-block: 8px;
}

.product-img {
  width: 107px;
  height: 107px;
  border-radius: 10px;
}

.product {
  box-shadow: 0 0px 3px 4px #dfdfdf96;
  width: 96%;
  margin-inline: auto;
  border-radius: 7px;
}

.uper-card-1:hover {
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25), 0 3px 5px rgba(0, 0, 0, 0.18);
  border-radius: 8px;
  cursor: pointer !important;
}

.green {
  color: #1fc21f;
}

.select-box {
  height: 34px;
  border-radius: 58px;
  outline: none !important;
}

select {
  border: 2px solid #c2c2c2 !important;
}

.story-img {
  width: 73px;
  height: 73px;
  border-radius: 50%;
}

#myBar {
  height: 1px;
}

.story-style {
  height: 450px;
}
.no-item{
  text-align: center;
  margin-top: 50px;
}
</style>
