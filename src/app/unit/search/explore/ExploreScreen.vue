<template>
  <div class="search-box" @click="routeToSearch()">
    <small class="text-muted">{{ $t("search") }}</small>
    <i class="fa fa-search text-muted"></i>
  </div>
  <div
      v-if="!state.loading && state.suggestions.length == 0"
      class="col-12 text-center pt-5 mt-5"
  >
    <i class="fas fa-box-open fa-5x"></i>
    <h4 class="text-center mt-3">{{ $t("noItem") }}</h4>
  </div>
  <loading
      v-else-if="state.loading && state.suggestions.length == 0"
      class="margin-loading"
  />
  <div v-else class="col-12 p-0 pb-60 bg-dark">
    <div
        v-for="(pack, packIndex) in state.suggestions"
        :class="{'reverse-direction':packIndex % 2 != 0}"
    >
      <section
          :class="pack.items.length <= 3 ? 'grid-auto-rows-50' : pack.items.length <= 6 ? 'grid-auto-rows-33' : ''"
      >
        <div
            v-for="(suggest, index) in pack.items"
            :class="index == 0 ? 'bigger' : ''"
            class="box"
        >
          <ExploreItem :list-item="suggest" class="ExploreItem" @click="exploreItemClick(suggest)"/>
        </div>
      </section>
    </div>
    <loading v-if="state.loading" class="my-5"/>
  </div>
</template>


<script lang="ts">
import {defineComponent, onBeforeUnmount, onMounted, ref,} from "vue";
import ratio from "@/app/public/shared/ratio/ratio.vue";
import ExploreItem from "./ExploreItem.vue";
import {ExploreState} from "./ExploreState";
import {ScrollController} from "@/core/service/scroll.service";
import router from "@/core/router/router";
import {isLoggedIn, slugify} from "@/core/service/utils.service";
import {useRoute} from "vue-router";

export default defineComponent({
  name: "NewSearchMainScreen",
  components: {
    ratio,
    ExploreItem,
  },
  setup() {
    const state = ref(new ExploreState());
    let scrollCtrl = new ScrollController(onScroll);
    const route = useRoute();
    const tagId = ref(Number(route.params.tagId));
    function onScroll() {
      state.value.getSuggestion(true,tagId.value);
    }

    onMounted(() => {
      // if(getSelectedPageData() == null || getSelectedPageData() == {}) {
      if (isLoggedIn()) {
        const storedArray = localStorage.getItem("exploreitems");

        const our = JSON.parse(storedArray)
        if (Array.isArray(our) && our.length != 0){
          state.value.suggestions = our;
        }  else {
          state.value.getSuggestion(false,tagId.value)
        }
        scrollCtrl.startListen();
      } else {
        routeToSearch()
      }
      // }

    });

    onBeforeUnmount(() => {
      scrollCtrl.removeListen();
    });

    function routeToSearch() {
      router.push("/search");
    }

    function exploreItemClick(item) {
      switch (item.itemType) {
        case 1:
          router.push(`/post/mp/${item.item.pageDetails?.pageId}/${item.item.postId}/${item.item.pageDetails?.username}`);
          break;
        case 3:
          router.push(`/product/${item.item.productId}/${item.item.pageDetails.sellerPageId}/${slugify(item.item.name)}`);
          break;
      }
    }

    return {
      state,
      routeToSearch,
      exploreItemClick,
    };
  },
});
</script>


<style lang="scss" scoped>

.ExploreItem {
  cursor: pointer;
}

section {
  display: grid;
  grid-gap: 1px;
  grid-auto-flow: row dense;
  grid-template-columns: repeat(3, 33.2%);
  grid-auto-rows: 23.8% 25.9%;
}

.translate-from-top {
  transform: translateY(-30px);
}

.bigger {
  grid-area: 1 / 1 / span 2 / span 2;
}

.grid-auto-rows-50 {
  grid-auto-rows: 50% !important;
}

.grid-auto-rows-33 {
  grid-auto-rows: 33% !important;
}

.search-box {
  border: 0.5px solid #c3c3c3;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 3px;
  margin: 3px;
}

.box {
  width: 100%;
  height: 100%;
}

.search-box:hover {
  cursor: text !important;
}
</style>
