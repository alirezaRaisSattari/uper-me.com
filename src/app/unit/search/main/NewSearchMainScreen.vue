<template>
  <div class="d-flex h-100 w-100 align-content-center justify-content-center">
    <div class="bg-transparent w-100 ">
      <div class="d-flex align-items-center justify-content-end position-relative">
        <input
            id="searchInput"
            v-model="searchedText"
            :placeholder="$t('search')"
            autocomplete="off"
            class="search-input"
            type="text"
            @input="onInputChangeDebounce"
        />

        <i class="fa fa-search hover-pointer p-2 position-absolute text-muted"></i>
        <!--        <Button icon="" class="p-button-rounded p-button-secondary p-button-outlined" />-->
      </div>

      <ul class="nav nav-justified nav-tabs text-center p-0">
        <li
            v-for="unit in units"
            :key="unit.text"
            :class="currentUnit === unit.key ? 'text-info' : ''"
            class="nav-item hover-pointer border-0 user-select-none"
            @click="currentUnit = unit.key"
        >
          <div class="nav-link border-0">
            <small>
              {{ $t(unit.text) }}
            </small>
          </div>
        </li>
      </ul>

      <div v-if="currentUnit === 1" class="pb-60">
        <NewPageSearchScreen ref="SearchPageRef" :text="searchedText"></NewPageSearchScreen>
      </div>
      <div v-if="currentUnit === 2" class="pb-60">
        <NewProductSearchScreen ref="SearchProductRef" :text="searchedText"></NewProductSearchScreen>
      </div>
      <div v-if="currentUnit === 3" class="pb-60">
        <NewPostSearchScreen ref="SearchPostRef" :text="searchedText"></NewPostSearchScreen>
      </div>
      <div v-if="currentUnit === 4" class="pb-60">
        <searchInMap ref="SearchPostRef" :text="searchedText"></searchInMap>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import {defineComponent, onMounted, ref} from "vue";
import _ from "lodash";
import NewPageSearchScreen from "@/app/unit/search/page/NewPageSearchScreen.vue";
import NewProductSearchScreen from "@/app/unit/search/product/NewProductSearchScreen.vue";
import NewPostSearchScreen from "@/app/unit/search/post/NewPostSearchScreen.vue";
import searchInMap from "@/app/unit/search/map/searchInMap.vue";

export default defineComponent({
  name: "NewSearchMainScreen",
  components: {
    NewPageSearchScreen,
    NewProductSearchScreen,
    NewPostSearchScreen,
    searchInMap,
  },
  setup() {
    const searchedText = ref("");
    const currentUnit = ref(1);
    const startSearch = ref(false);
    const SearchPageRef = ref(null);
    const SearchProductRef = ref(null);
    const SearchPostRef = ref(null);

    const units = ref([
      {key: 1, text: "pages"},
      {key: 2, text: "products"},
      {key: 3, text: "posts"},
      {key: 4, text: "map"},
    ]);

    const onInputChangeDebounce = _.debounce(() => {
      if (currentUnit.value === 1) {
        SearchPageRef.value.onChangeTextFromParent(searchedText.value);
      } else if (currentUnit.value === 2) {
        SearchProductRef.value.onChangeTextFromParent(searchedText.value);
      } else if (currentUnit.value === 3) {
        SearchPostRef.value.onChangeTextFromParent(searchedText.value);
      }
    }, 700);

    onMounted(() => {
      document.getElementById("searchInput").focus();
    });

    return {
      onInputChangeDebounce,
      searchedText,
      currentUnit,
      units,
      startSearch,
      SearchPageRef,
      SearchProductRef,
      SearchPostRef,
    };
  },
});
</script>


<style lang="scss" scoped>
.router-link-active * {
  background-color: #e3e3e3;
}

.h-90 {
  height: 86%;
}

.map-button {
  bottom: 15px;
  right: 15px;
  position: absolute;
  z-index: 1000;
}

.map-parent {
  height: calc(100vh - 180px);
}

@media (min-width: 992px) {
  .map-parent {
    height: calc(100vh - 128px) !important;
  }
}

.p-button {
  margin-right: 0.5rem;
}

.p-buttonset {
  .p-button {
    margin-right: 0;
  }
}

.sizes {
  .button {
    margin-bottom: 0.5rem;
    display: block;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

@media screen and (max-width: 640px) {
  .p-button {
    margin-bottom: 0.5rem;

    &:not(.p-button-icon-only) {
      display: flex;
      width: 100%;
    }
  }

  .p-buttonset {
    .p-button {
      margin-bottom: 0;
    }
  }
}

.input-padding {
  padding: 10px !important;
}

.search-result {
  border-radius: 7px !important;
  width: 100%;

  box-shadow: 0 3px 12px 0 rgb(210 210 210);
}

.search-input {
  width: 100%;
  border: none !important;
  border-bottom: 0.5px solid grey !important;
  border-radius: 0;
  background-color: transparent;
  padding: 10px 5px !important;
  outline: none !important;
}

</style>
