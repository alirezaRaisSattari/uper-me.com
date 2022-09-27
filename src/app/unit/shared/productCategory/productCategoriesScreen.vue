<template>
  <Dialog v-model:visible="show" :breakpoints="{'1400px': '50vw','950':'70vw','500px':'90vw'}" :dismissableMask="true"
          :modal="true" @hide="hideDialog">
    <template #header>
      <div class="row m-0 w-100">
        <div class="col-12 pt-2 smart-text-align">
          <h4>{{ $t("selectCategories") }}</h4>
        </div>
        <div class="col-12">
          <span class="form-search">
            <InputText
                v-model="productCategories.search"
                :placeholder="$t('search')"
                class="input-onSearch smart-text-align"
                type="text"
                v-on:keyup.enter="productCategories.onSearch()"
            />
            <Button
                :label="$t('search')"
                class="p-button-success search-btn-main-list"
                v-on:click="productCategories.onSearch()"
            />
          </span>
          <hr v-if="productCategories.catConfig.catName1 !== null" class="mb-0"/>
          <div
              v-if="productCategories.catConfig.catName1 !== null"
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
                    v-on:click="productCategories.reset()"
                />
              </swiper-slide>
              <swiper-slide>
                <Chip
                    :label="productCategories.catConfig.catName1.title"
                    class="p-mr-2 p-mb-2 mx-2 my-2"
                    v-on:click="
                      productCategories.back(productCategories.catConfig.catName1, 1)
                    "
                />
              </swiper-slide>
              <swiper-slide v-if="productCategories.catConfig.catName2 !== null">
                <Chip
                    :label="productCategories.catConfig.catName2.title"
                    class="p-mr-2 p-mb-2 mx-2 my-2"
                    v-on:click="
                      productCategories.back(productCategories.catConfig.catName2, 2)
                    "
                />
              </swiper-slide>
              <swiper-slide v-if="productCategories.catConfig.catName3 !== null">
                <Chip
                    :label="productCategories.catConfig.catName3.title"
                    class="p-mr-2 p-mb-2 mx-2 my-2"
                    v-on:click="
                      productCategories.back(productCategories.catConfig.catName3, 3)
                    "
                />
              </swiper-slide>
              <swiper-slide v-if="productCategories.catConfig.catName4 !== null">
                <Chip
                    :label="productCategories.catConfig.catName4.title"
                    class="p-mr-2 p-mb-2 mx-2 my-2"
                    v-on:click="
                      productCategories.back(productCategories.catConfig.catName4, 4)
                    "
                />
              </swiper-slide>
            </swiper>
          </div>
          <hr v-if="productCategories.list !== null" class="mb-0 mt-1 border-0"/>
        </div>
      </div>
    </template>
    <div id="pageCategoryDialog" class="container scroll-category">
      <div class="row mb-4">
        <div class="col">
          <div
              v-if="
              (productCategories.list !== null &&
                productCategories.blocked === false) ||
              (productCategories.list !== null &&
                productCategories.inPagination === true)
            "
              class="p-listbox p-component mt-1"
          >
            <div class="p-listbox-list-wrapper">
              <ul
                  v-if="productCategories.list !== null"
                  aria-multiselectable="multiple"
                  class="p-listbox-list-wrapper w-100 pl-0 py-2 mb-0"
                  role="listbox"
              >
                <li
                    v-for="item in productCategories.list"
                    :key="item.id"
                    class="p-listbox-item py-2"
                    v-on:click="productCategories.getChild(item)"
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
                <li class="p-listbox-item py-2">{{ $t('noResponse') }}</li>
              </ul>
            </div>
          </div>
          <loading v-if="productCategories.blocked === true"/>
        </div>
      </div>
    </div>
    <template #footer></template>
  </Dialog>
</template>

<script>
import {onMounted, onUnmounted, ref} from "vue";
import {productCategoriesState} from "./productCategoriesState";
import {elementRemoveEventListener} from "@/core/service/utils.service";
import Chip from 'primevue/chip';
import {Swiper, SwiperSlide} from "swiper/vue";

export default {
  name: 'ProductCategoriesScreen',
  components: {
    Chip, Swiper, SwiperSlide
  },
  props: {
    callback: Function,
  },
  emits: ['passData'],
  setup(props, {emit}) {
    const show = ref(false);
    const res = ref(null);

    function showDialog() {
      show.value = true;
      productCategories.value.reset();
    }


    function hideDialog() {
      show.value = false;
      emit('passData', false)
    }

    onMounted(() => {
      productCategories.value.reset();
    });

    onUnmounted(() => {
      elementRemoveEventListener("pageCategoryDialog");
    });

    const productCategories = ref(
        new productCategoriesState((obj) => {
          props.callback(obj);
          show.value = false;
        })
    );


    return {productCategories, showDialog, show, res, hideDialog};
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

.product-card-shadow {
  box-shadow: 0 0 5px 1px #cacaca;
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
