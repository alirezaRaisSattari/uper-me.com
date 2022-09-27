<template>
  <Map
    @latLan="(data) => state.search(data)"
    @category="pageCategory.showDialog()"
    @previous="pre"
    @next="next"
    :markers="state.markers"
    :categories="state.categories"
  />
  <PageCategoriesDialog
    ref="pageCategory"
    :callback="
      (data) =>
        state.addCat(data.selectedLevel.categoryId, data.selectedLevel.title)
    "
  />
</template>

<script>
import Map from "@/app/unit/search/map/mapForSearch.vue";
import { searchInMapState } from "@/app/unit/search/map/searchInMapState";
import { ref } from "vue";
import PageCategoriesDialog from "@/app/unit/shared/pageCategories/PagesCategoriesScreen.vue";

export default {
  components: { Map, PageCategoriesDialog },
  setup() {
    const state = ref(new searchInMapState());
    const pageCategory = ref(null);
    return {
      pageCategory,
      state,
    };
  },
};
</script>

<style>
</style>
