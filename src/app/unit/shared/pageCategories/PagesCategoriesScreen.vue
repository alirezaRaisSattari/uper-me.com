<template>
  <Dialog
      v-model:visible="show"
      :breakpoints="{ '1400px': '50vw', '950': '70vw', '500px': '90vw' }"
      :dismissableMask="true"
      :modal="true"
      @hide="test()"
  >
    <template #header>
      <div class="row m-0 w-100">
        <div class="col-12 pt-2 smart-text-align">
          <h4>{{ $t("selectCategories") }}</h4>
        </div>
        <div class="col-12">
          <span class="form-search">
            <InputText
                v-model="pagesCategories.search"
                :placeholder="$t('search')"
                class="input-onSearch smart-text-align"
                type="text"
                v-on:keyup.enter="pagesCategories.onSearch()"
            />
            <Button
                :label="$t('search')"
                class="p-button-success search-btn-main-list"
                v-on:click="pagesCategories.onSearch()"
            />
          </span>
          <hr v-if="pagesCategories.catConfig.catName1 !== null" class="mb-0"/>
          <div
              v-if="pagesCategories.catConfig.catName1 !== null"
              class="d-flex align-items-center"
          >
            <swiper
                :direction="'horizontal'"
                :free-mode="true"
                :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
                :slides-per-view="'auto'"
                :space-between="0"
                class="slider"
            >
              <swiper-slide class="pt-2">
                <Button
                    class="p-button-rounded p-button-outlined p-button-plain"
                    icon="fas fa-home"
                    v-on:click="pagesCategories.reset()"
                />
              </swiper-slide>
              <swiper-slide>
                <Chip
                    :label="pagesCategories.catConfig.catName1.title"
                    class="p-mr-2 p-mb-2 mx-2 my-2"
                    v-on:click="
                    pagesCategories.back(pagesCategories.catConfig.catName1, 1)
                  "
                />
              </swiper-slide>
              <swiper-slide v-if="pagesCategories.catConfig.catName2 !== null">
                <Chip
                    :label="pagesCategories.catConfig.catName2.title"
                    class="p-mr-2 p-mb-2 mx-2 my-2"
                    v-on:click="
                    pagesCategories.back(pagesCategories.catConfig.catName2, 2)
                  "
                />
              </swiper-slide>
              <swiper-slide v-if="pagesCategories.catConfig.catName3 !== null">
                <Chip
                    :label="pagesCategories.catConfig.catName3.title"
                    class="p-mr-2 p-mb-2 mx-2 my-2"
                    v-on:click="
                    pagesCategories.back(pagesCategories.catConfig.catName3, 3)
                  "
                />
              </swiper-slide>
              <swiper-slide v-if="pagesCategories.catConfig.catName4 !== null">
                <Chip
                    :label="pagesCategories.catConfig.catName4.title"
                    class="p-mr-2 p-mb-2 mx-2 my-2"
                    v-on:click="
                    pagesCategories.back(pagesCategories.catConfig.catName4, 4)
                  "
                />
              </swiper-slide>
            </swiper>
          </div>
          <hr v-if="pagesCategories.list !== null" class="mb-0 mt-1 border-0"/>
        </div>
      </div>
    </template>
    <div id="pageCategoryDialog" class="container scroll-category">
      <div class="row mb-4">
        <div class="col">
          <div
              v-if="
              (pagesCategories.list !== null &&
                pagesCategories.blocked === false) ||
              (pagesCategories.list !== null &&
                pagesCategories.inPagination === true)
            "
              class="p-listbox p-component mt-1"
          >
            <div class="p-listbox-list-wrapper">
              <ul
                  v-if="pagesCategories.list !== null"
                  aria-multiselectable="multiple"
                  class="p-listbox-list-wrapper w-100 pl-0 py-2 mb-0"
                  role="listbox"
              >
                <li
                    v-for="item in pagesCategories.list"
                    :key="item.id"
                    class="p-listbox-item py-2"
                    v-on:click="pagesCategories.getChild(item)"
                >
                  <div class="cover-icon">
                    <i class="fas fa-chevron-left"></i>
                  </div>
                  {{ item.title }}
                </li>
              </ul>
              <ul
                  v-else
                  aria-multiselectable="multiple"
                  class="p-listbox-list-wrapper w-100 pl-0 py-2 mb-0"
                  role="listbox"
              >
                <li class="p-listbox-item py-2">{{ $t("noResponse") }}</li>
              </ul>
            </div>
          </div>
          <loading v-if="pagesCategories.blocked === true"/>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script>
import {onMounted, onUnmounted, ref} from "vue";
import {PagesCategoriesState} from "./PagesCategoriesState";
import {elementRemoveEventListener} from "@/core/service/utils.service";
import Chip from "primevue/chip";
import Button from "primevue/button";
import {Swiper, SwiperSlide} from "swiper/vue";

export default {
  name: "PageCategoriesScreen",
  components: {
    Chip,
    Button, Swiper, SwiperSlide
  },
  props: {
    callback: Function,
  },
  emits: ["passData"],
  setup(props, {emit}) {
    const show = ref(false);
    const res = ref(null);

    function showDialog() {
      show.value = true;
      pagesCategories.value.reset();
    }

    function hideDialog() {
      emit("passData", false);
    }

    onMounted(() => {
      pagesCategories.value.reset();
    });

    onUnmounted(() => {
      elementRemoveEventListener("pageCategoryDialog");
    });

    const pagesCategories = ref(
        new PagesCategoriesState((obj) => {
          props.callback(obj);
          show.value = false;
          emit("passData", show.value);
        })
    );

    return {pagesCategories, showDialog, show, res, test: hideDialog};
  },
};
</script>

<style scoped>
.main-list {
  background: #1e1e1e;
  padding: 10px;
  border-radius: 5px;
}

.form-search {
  width: 100%;
  margin-bottom: 10px;
  display: flex;
}

.main-list span input {
  width: 100%;
  text-align: center;
}

.search-btn-main-list {
  font-size: 14px !important;
  text-align: center !important;
  margin-right: 10px !important;
}

.p-listbox .p-listbox-list .p-listbox-item {
  margin: 0;
  padding: 0.5rem 1rem;
  border: 0 none;
  color: rgba(255, 255, 255, 0.87);
  transition: box-shadow 0.2s;
  border-radius: 0;
}

ul {
  list-style-type: none;
  padding: 5px 10px 5px 10px !important;
  text-align: center;
}

li {
  cursor: pointer;
  text-align: right;
  padding: 0 10px;
}

.input-onSearch {
  width: 100%;
  border: 2px solid #a9a9a9 !important;
  border-radius: 20px !important;
  padding: 5px 10px !important;
  text-align: right;
  font-size: 14px;
}

.swiper-container {
  width: 100%;
  height: 54px;
  padding-bottom: 15px !important;
}

.swiper-slide {
  width: auto !important;
  padding: 3px;
}

.product-name {
  line-height: 1.8;
}

.product-user-status {
  position: absolute;
  bottom: 5px;
  width: 90%;
  text-align: center;
  border-radius: 10px;
  left: 5%;
}

.product-icon-position {
  position: absolute;
  top: 10px;
}

body[dir="rtl"] .product-icon-position {
  right: 10px;
}

body[dir="ltr"] .product-icon-position {
  left: 10px;
}

.scroll-category {
  overflow-y: auto;
  height: 100%;
}

.cover-icon {
  float: left;
  padding: 5px 0 0;
}

body[dir="rtl"] .p-listbox-item {
  text-align: right !important;
}

body[dir="ltr"] .p-listbox-item {
  text-align: left !important;
}

body[dir="ltr"] .search-btn-main-list {
  margin-left: 10px !important;
  margin-right: 0 !important;
}

body[dir="rtl"] .cover-icon {
  float: left !important;
}

body[dir="ltr"] .cover-icon {
  float: right !important;
}

body[dir="ltr"] .cover-icon {
  transform: rotate(180deg) !important;
  padding: 0 0 5px !important;
}
</style>
