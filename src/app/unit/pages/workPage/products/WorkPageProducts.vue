<template>
  <div>
    <swiper
      v-if="isMine()"
      :direction="'horizontal'"
      :free-mode="true"
      :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
      :slides-per-view="'auto'"
      :space-between="0"
      class="slider"
    >
      <swiper-slide v-for="(item, index) in allFilters" :key="item">
        <button
          :class="
            selectedFilter === index
              ? 'btn-success active-btn'
              : 'p-button-secondary deactive-btn'
          "
          class="btn btn-transition border"
          @click="changeFilter(index)"
        >
          <div class="d-flex align-items-center justify-content-center">
            <i class="mx-1" :class="item.icon"></i>
            <span class="span-column">{{
              selectedFilter === index ? $t(item.title) : ""
            }}</span>
          </div>
        </button>
      </swiper-slide>
    </swiper>

    <div class="w-100">
      <show-all-product
        :pageId="pageId"
        v-if="selectedFilter == 0"
      ></show-all-product>

      <show-deleted-product
        :pageId="pageId"
        v-if="selectedFilter == 1"
      ></show-deleted-product>

    <show-reported-product :pageId="pageId" v-if="selectedFilter == 2" ></show-reported-product>
      <storyproduct :pageId="pageId" v-if="selectedFilter == 3"></storyproduct>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import ShowAllProduct from "./workPageScreenTabs/ShowAllProducts.vue";
import ShowDeletedProducts from "./workPageScreenTabs/ShowDeletedProducts.vue";
import ShowReportedProducts from "./workPageScreenTabs/ShowReportedProducts.vue";
import { LocalStorageService } from "@/core/service/localStorage.service";
import { EnumKeys } from "@/core/constant/constant";
import { useRoute } from "vue-router";
import storyproduct from "@/app/unit/pages/story/upgrade/storyproducts.vue";

export default defineComponent({
  components: {
    storyproduct,
    Swiper,
    SwiperSlide,
    "show-all-product": ShowAllProduct,
    "show-deleted-product": ShowDeletedProducts,
    "show-reported-product": ShowReportedProducts,
  },
  props: ["pageId"],
  setup() {
    const selectedFilter = ref(0);
    const route = useRoute();
    const allFilters = ref([
      { title: "my_products", icon: "uproducts" },
      { title: "deleted_products", icon: "udelete-folder" },
      { title: "reported", icon: "ureport-bugs" },
      { title: "upgraded", icon: " uupgrade-product" },
      { title: "drafts", icon: "uproducts" },
    ]);

    function changeFilter(index) {
      selectedFilter.value = index;
    }
    const isMine = () => {
      try {
        let workPagesData = JSON.parse(
            String(LocalStorageService.getInstance().getItem(EnumKeys.KeyWorkPages))
        );
        if (!workPagesData) return  false;
        let x = workPagesData.find((e) => e.username == route.params.username);
        return x ?? false;
      }catch (e) {
        return  false;
      }

    };

    return {
      selectedFilter,
      allFilters,
      changeFilter,
      isMine,
      storyproduct
    };
  },
});
</script>

<style scoped>
.swiper-container {
  width: 100%;
  height: 53px;
  padding-bottom: 15px !important;
}

.swiper-slide {
  width: auto !important;
  padding: 3px;
}

.deactive-btn {
  width: 49px;
}
.active-btn {
  width: 100%;
}

.btn-transition {
  transition: width 1s ease-in-out;
}
</style>
