<template>
  <NewFilterPageScreen
    ref="newFilterPageScreenRef"
    :model="state.filterModel"
    @confirmFilter="confirmFilter"
  />

  <div
    v-if="!state.loading && state.pages.length === 0"
    class="col-12 text-center pt-5 mt-5"
  >
    <i class="fas fa-box-open fa-5x"></i>
    <h4 class="text-center mt-3">{{ $t("noPages") }}</h4>
  </div>
  <loading
    v-else-if="state.loading && state.pages.length === 0"
    class="margin-loading"
  />

  <template v-else>
    <div v-for="page in state.pages" :key="page.id" class="p-1">
      <FourStoryList v-if="page.isStoryPack" :stories="page.stories" />

      <div
        v-else-if="page.id > 0"
        class="
          p-2
          w-100
          rounded
          page-card
          border-radius-10px
          hover-pointer
          position-relative
        "
        @click="openPage(page)"
      >
        <div class="d-flex justify-content-between align-items-center">
          <div class="position-relative">
            <img
              v-lazy="page.profileImageUrl + '_sm.webp'"
              alt=""
              class="img-fluid profile-main-page"
              src=""
            />
            <div v-if="page.creditLevel !== 3" class="credit-svg-main">
              <img
                v-if="page.creditLevel === 1"
                class="m-svg-main"
                src="@/assets/img/ic_crown_golden.svg"
                alt=""
              />
              <img
                v-if="page.creditLevel === 2"
                class="m-svg-main"
                src="@/assets/img/ic_crown_grey.svg"
                alt=""
              />
            </div>
          </div>
          <div class="col p-1">
            <h6 class="smart-text-align mr-2">{{ page.name }}</h6>
            <small class="smart-text-align mr-2 text-overflow-two-line">
              {{ page.username }}</small
            >
          </div>
          <Button
            v-if="page.isCached"
            class="p-button-rounded p-button-danger p-button-text"
            icon="fa fa-times"
            @click="removeCache($event, page.id)"
          />
        </div>
      </div>

      <div
        v-else
        class="
          d-flex
          flex-column
          p-2
          rounded
          page-card
          hover-pointer
          border-radius-10px
          position-relative
        "
        @click="openPage(page)"
      >
        <div class="d-flex justify-content-between align-items-center">
          <div class="position-relative">
            <img
              v-lazy="page.profileImageUrl + '_sm.webp'"
              alt=""
              class="img-fluid profile-main-page"
              src=""
            />
            <div v-if="page.creditLevel !== 3" class="credit-svg-main">
              <img
                v-if="page.creditLevel === 1"
                class="m-svg-main"
                src="@/assets/img/ic_crown_golden.svg"
                alt=""
              />
              <img
                v-if="page.creditLevel === 2"
                class="m-svg-main"
                src="@/assets/img/ic_crown_grey.svg"
                alt=""
              />
            </div>
          </div>
          <div class="col p-1">
            <h6 class="smart-text-align mr-2">{{ page.name }}</h6>
            <small
              v-if="page.area != null"
              class="smart-text-align mr-2 text-overflow-two-line text-muted"
              >{{ page.area.areaName }}</small
            >
          </div>
          <div
            class="
              d-flex
              flex-column
              justify-content-center
              align-items-center
              mt-1
            "
          >
            <i class="fa fa-star text-warning"></i>
            <span>{{ page.average }}</span>
          </div>
          &nbsp;
          <Button
            v-if="page.isCached"
            class="p-button-rounded p-button-danger p-button-text"
            icon="fa fa-times"
            @click="removeCache($event, page.id)"
          />
        </div>
        <div class="mt-1">
          <Swiper
            :direction="'horizontal'"
            :free-mode="true"
            :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
            :slides-per-view="'auto'"
            :space-between="0"
          >
            <SwiperSlide v-for="i in page.categories" :key="i.categoryId">
              <span class="category-span">{{ i.name }}</span>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
    <loading v-if="state.loading" class="my-5" />
  </template>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, ref } from "vue";
import Rating from "primevue/rating";
import FourStoryList from "@/app/public/shared/fourStoryList/FourStoryList.vue";
import { NewProductSearchState } from "./NewPageSearchState";
import NewFilterPageScreen from "./NewFilterPageScreen.vue";
import { ScrollController } from "@/core/service/scroll.service";
import { i18n } from "@/main";
import { LocalStorageService } from "@/core/service/localStorage.service";
import { EnumKeys } from "@/core/constant/constant";
import Ripple from "primevue/ripple";
import router from "@/core/router/router";
import { PageStore } from "@/core/store/page.store";
import { Swiper, SwiperSlide } from "swiper/vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "NewPageSearchScreen",
  directives: {
    ripple: Ripple,
  },
  components: {
    Rating,
    NewFilterPageScreen,
    FourStoryList,
    Swiper,
    SwiperSlide,
  },
  props: ["text"],
  setup(props) {
    let searchedText = ref(props.text.trim());
    let state = ref(new NewProductSearchState());
    let newFilterPageScreenRef = ref(null);
    let scrollCtrl = new ScrollController(onScroll);
    let route = useRoute();

    function onScroll() {
      search(true);
    }

    function onChangeTextFromParent(txt: string) {
      searchedText.value = txt.trim();
      if (searchedText.value.length > 2) search(false);
      else {
        state.value.pages = [];
        if (getIsFilter()) {
          search(false);
        }
      }
    }

    function confirmFilter(e) {
      state.value.filterModel = { ...e };
      state.value.filterModel.categoryIds = (e.categoryIds ?? []).slice();
      state.value.filterModel.sellTypes = (e.sellTypes ?? []).slice();
      state.value.filterModel.creditLevels = (e.creditLevels ?? []).slice();
      state.value.filterModel.cityIds = (e.cityIds ?? []).slice();
      search(false);
    }

    onMounted(() => {
      if (searchedText.value.length > 2) search(false);
      else getCache();
      scrollCtrl.startListen();

      if (route.params.categoryId)
        confirmFilter({ categoryIds: [route.params.categoryId] });
    });

    onBeforeUnmount(() => {
      scrollCtrl.removeListen();
    });

    function search(_isScroll: boolean) {
      state.value.isFilter = getIsFilter();
      state.value.search(searchedText.value, _isScroll);
    }

    function getIsFilter() {
      return (
        selectedFilter(0) ||
        selectedFilter(1) ||
        selectedFilter(2) ||
        selectedFilter(3)
      );
    }

    function selectedFilter(index) {
      if (index == 0) {
        return (
          Array.isArray(state.value.filterModel.categoryIds) &&
          state.value.filterModel.categoryIds.length != 0
        );
      } else if (index == 1) {
        return (
          Array.isArray(state.value.filterModel.cityIds) &&
          state.value.filterModel.cityIds.length != 0
        );
      } else if (index == 2) {
        return (
          Array.isArray(state.value.filterModel.sellTypes) &&
          state.value.filterModel.sellTypes.length != 0
        );
      } else if (index == 3) {
        return (
          Array.isArray(state.value.filterModel.creditLevels) &&
          state.value.filterModel.creditLevels.length != 0
        );
      }
    }

    function getSellType(sellType: number, pageType: number = 1) {
      return (
        i18n.global.tc("sellType") +
        " : " +
        (pageType == 3
          ? i18n.global.tc("consult")
          : sellType == 1
          ? i18n.global.tc("actual")
          : sellType == 2
          ? i18n.global.tc("virtual")
          : i18n.global.tc("actualAndVirtual"))
      );
    }

    function getCache() {
      state.value.pages = getCachedItems(true).map((m) => {
        m.isCached = true;
        return m;
      });
    }

    function getCachedItems(isFilter) {
      try {
        let pages = JSON.parse(
          LocalStorageService.getInstance().getItem(EnumKeys.KeySearchPageCache)
        );
        if (Array.isArray(pages) && pages.length != 0) {
          if (isFilter)
            return pages.filter(
              (m) => m.searchedPageId == PageStore().selectedPageId
            );
          return pages;
        }
        LocalStorageService.getInstance().setItem(
          EnumKeys.KeySearchPageCache,
          []
        );
        return [];
      } catch (e) {
        LocalStorageService.getInstance().setItem(
          EnumKeys.KeySearchPageCache,
          []
        );
        return [];
      }
    }

    function openPage(page) {
      let x = getCachedItems(false);
      if (
        !x.find(
          (m) =>
            m.id == page.id && m.searchedPageId == PageStore().selectedPageId
        )
      ) {
        page.searchedPageId = PageStore().selectedPageId;
        x.unshift(page);
      } else {
        x.sort((x, y) => {
          return x.id == page.id ? -1 : y.id == page.id ? 1 : 0;
        });
      }
      LocalStorageService.getInstance().setItem(
        EnumKeys.KeySearchPageCache,
        JSON.stringify(x)
      );
      router.push(`/page/${page.username}`);
    }

    function removeCache(event, pageId: number) {
      event.stopPropagation();
      let x = getCachedItems(false);
      let itemIndex = x.findIndex(
        (m) => m.id == pageId && m.searchedPageId == PageStore().selectedPageId
      );
      if (itemIndex != -1) {
        x.splice(itemIndex, 1);
        LocalStorageService.getInstance().setItem(
          EnumKeys.KeySearchPageCache,
          JSON.stringify(x)
        );
        getCache();
      }
    }

    return {
      onChangeTextFromParent,
      state,
      searchedText,
      confirmFilter,
      newFilterPageScreenRef,
      getSellType,
      openPage,
      removeCache,
    };
  },
});
</script>

<style lang="scss" scoped>
.page-card {
  box-shadow: 0 0 5px -2px grey !important;
}

.border-radius-10px {
  border-radius: 10px !important;
}

.margin-loading {
  margin-top: calc((100vh - 300px) / 2);
}

body[dir="rtl"] .credit-svg {
  position: absolute;
  right: 5px;
  top: 5px;
}

body[dir="ltr"] .credit-svg {
  position: absolute;
  left: 5px;
  top: 5px;
}

.m-svg {
  width: 25px;
  height: 25px;
}

.profile-main-page {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

body[dir="rtl"] .credit-svg-main {
  position: absolute;
  left: -3px;
  bottom: -2px;
}

body[dir="ltr"] .credit-svg-main {
  position: absolute;
  right: 5px;
  bottom: 5px;
}

.m-svg-main {
  width: 25px;
  height: 25px;
}

.category-span {
  border-radius: 22px;
  padding-inline: 8px;
  color: #adb5bd;
  padding-bottom: 6px;
  font-size: 13px;
  border: 1px solid #eaecef;
}

.swiper-container {
  width: 100%;
  height: 36px;
  direction: rtl;
}

.swiper-slide {
  width: auto !important;
  padding: 3px;
}

.swiper-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.close-icon {
  position: absolute;
  top: 10px;
  z-index: 10;
}

body[dir="rtl"] .close-icon {
  left: 10px;
}

body[dir="ltr"] .close-icon {
  right: 10px;
}
</style>
