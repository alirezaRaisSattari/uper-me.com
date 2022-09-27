<template>
  <swiper
      :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
      :space-between="0"
      class="slider"
      direction="horizontal"
      free-mode
      slides-per-view="auto"
  >
    <swiper-slide
        v-for="(filterItem, index) in filterItems"
        :key="filterItem.title"
    >
      <div
          class="filter-item user-select-none border hover-pointer d-flex align-items-center"
          @click="open()"
      >
        <i
            v-if="selectedFilter(index)"
            class="fa fa-times hover-bg-primary mx-2"
            @click="
            $event.stopPropagation();
            cancelFilter(index);
          "
        >&nbsp;</i
        >
        {{ $t(filterItem.title) }}
      </div>
    </swiper-slide>
  </swiper>

  <Dialog
      v-model:visible="showDialog"
      :dismissableMask="false"
      :header="false"
      :modal="true"
      :style="{ width: '19rem !important' }"
  >
    <p class="text-center my-2">{{ $t("filters") }}</p>
    <div class="filter-item-box hover-pointer" @click="openCategory()">
      <div class="d-flex justify-content-between align-items-center">
        <div class="smart-text-align">
          <small class="text-muted">{{ $t("category") }}</small
          ><br/>
          <small v-if="selectedCategory != null">{{
              selectedCategory.catName
            }}</small>
        </div>
        <i class="fa fa-arrow-left"></i>
      </div>
    </div>

    <div class="filter-item-box hover-pointer" @click="openChooseArea()">
      <div class="d-flex justify-content-between align-items-center">
        <div class="smart-text-align">
          <small class="text-muted">{{ $t("area") }}</small
          ><br/>
          <small>{{ getAreasName() }}</small>
        </div>
        <i class="fa fa-arrow-left"></i>
      </div>
    </div>

    <div class="filter-item-box hover-pointer" @click="openChooseUsedType()">
      <div class="d-flex justify-content-between align-items-center">
        <div class="smart-text-align">
          <small class="text-muted">{{ $t("usedType") }}</small
          ><br/>
          <small>{{ usedTypeText() }}</small>
        </div>
        <i class="fa fa-arrow-left"></i>
      </div>
    </div>

    <div class="filter-item-box hover-pointer" @click="openChooseCreditLevel()">
      <div class="d-flex justify-content-between align-items-center">
        <div class="smart-text-align">
          <small class="text-muted">{{ $t("CreditLevel") }}</small
          ><br/>
          <small>{{ creditLevelText() }}</small>
        </div>
        <i class="fa fa-arrow-left"></i>
      </div>
    </div>

    <div class="filter-item-box hover-pointer" @click="openChooseProductType()">
      <div class="d-flex justify-content-between align-items-center">
        <div class="smart-text-align">
          <small class="text-muted">{{ $t("productType") }}</small
          ><br/>
          <small>{{ productTypeText() }}</small>
        </div>
        <i class="fa fa-arrow-left"></i>
      </div>
    </div>

    <div class="filter-item-box hover-pointer">
      <div class="d-flex justify-content-between align-items-center">
        <div class="smart-text-align">
          <small class="text-muted">{{ $t("immediate") }}</small
          ><br/>
        </div>
        <div class="switch px-2">
          <input
              id="index"
              v-model="filterModel.isImmediate"
              checked
              class="input"
              type="checkbox"
          />
          <label class="slider" for="index"></label>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <Button
          :label="$t('confirm')"
          class="px-5 mb-2"
          @click="confirmFilter()"
      />
    </div>
  </Dialog>

  <ProductCategoriesDialog
      v-if="showDialog"
      ref="productCategory"
      :callback="onSelectCategory"
  />

  <Dialog
      v-model:visible="showAreaDialog"
      :breakpoints="{ '440px': '100vw' }"
      :dismissableMask="true"
      :modal="true"
      :style="{ 'max-width': '19rem' }"
  >
    <div class="modal__content">
      <loading v-if="state.loadingArea" class="my-5 py-5"/>
      <template v-else>
        <div v-if="selectedAreaTab == 'city'" class="col-12 w-100 h-100 px-0">
          <div
              v-for="city in state.cities"
              class="d-flex justify-content-center align-items-center hover-pointer border-bottom py-2 px-5 user-select-none"
              @click="selectCity(city.id)"
          >
            <i
                v-if="showCheckCity(city.id)"
                class="fa fa-check mx-1 text-success"
            ></i>
            {{ city.cityName }}
          </div>
          <div class="d-flex justify-content-center">
            <Button
                v-if="showSelectArea()"
                :label="$t('selectArea')"
                class="my-1 px-5 no-warp"
                @click="getAreas()"
            />
          </div>
        </div>

        <div v-if="selectedAreaTab == 'area'" class="col-12 w-100 h-100 px-0">
          <div class="smart-text-align px-2 py-2">
            <i
                class="fa fa-arrow-right hover-pointer"
                @click="backToCities()"
            ></i
            >&nbsp;&nbsp;
            <span>{{ $t("area") }}</span>
          </div>
          <h4 v-if="state.areas.length == 0" class="text-center my-4">
            {{ $t("areaNotFound") }}
          </h4>
          <div
              v-for="area in state.areas"
              class="d-flex justify-content-center align-items-center hover-pointer border-bottom py-2 px-5 user-select-none"
              @click="selectArea(area.id)"
          >
            <i
                v-if="showCheckArea(area.id)"
                class="fa fa-check mx-1 text-success"
            ></i>
            {{ area.areaName }}
          </div>
        </div>
      </template>
    </div>
  </Dialog>

  <Dialog
      v-model:visible="showDialogUsedType"
      :breakpoints="{ '440px': '100vw' }"
      :dismissableMask="true"
      :modal="true"
      :style="{ 'max-width': '19rem' }"
  >
    <div class="modal__content">
      <div class="col-12 w-100 h-100 px-0">
        <div
            class="d-flex justify-content-center align-items-center hover-pointer border-bottom py-2 px-5 user-select-none"
            @click="selectUsedType(1)"
        >
          <i
              v-if="showCheckUsedType(1)"
              class="fa fa-check mx-1 text-success"
          ></i>
          {{ $t("new") }}
        </div>
        <div
            class="d-flex justify-content-center align-items-center hover-pointer border-bottom py-2 px-5 user-select-none"
            @click="selectUsedType(2)"
        >
          <i
              v-if="showCheckUsedType(2)"
              class="fa fa-check mx-1 text-success"
          ></i>
          {{ $t("secondhand") }}
        </div>
      </div>
    </div>
  </Dialog>

  <Dialog
      v-model:visible="showDialogCreditLevel"
      :breakpoints="{ '440px': '100vw' }"
      :dismissableMask="true"
      :modal="true"
      :style="{ 'max-width': '19rem' }"
  >
    <div class="modal__content">
      <div class="col-12 w-100 h-100 px-0">
        <div
            class="d-flex justify-content-center align-items-center hover-pointer border-bottom py-2 px-5 user-select-none"
            @click="selectCreditLevel(1)"
        >
          <i
              v-if="showCheckCreditLevel(1)"
              class="fa fa-check mx-1 text-success"
          ></i>
          {{ $t("goldCreditLevel") }}
        </div>
        <div
            class="d-flex justify-content-center align-items-center hover-pointer border-bottom py-2 px-5 user-select-none"
            @click="selectCreditLevel(2)"
        >
          <i
              v-if="showCheckCreditLevel(2)"
              class="fa fa-check mx-1 text-success"
          ></i>
          {{ $t("silverCreditLevel") }}
        </div>
        <div
            class="d-flex justify-content-center align-items-center hover-pointer border-bottom py-2 px-5 user-select-none"
            @click="selectCreditLevel(3)"
        >
          <i
              v-if="showCheckCreditLevel(3)"
              class="fa fa-check mx-1 text-success"
          ></i>
          {{ $t("bronzeCreditLevel") }}
        </div>
      </div>
    </div>
  </Dialog>

  <Dialog
      v-model:visible="showDialogProductType"
      :breakpoints="{ '440px': '100vw' }"
      :dismissableMask="true"
      :modal="true"
      :style="{ 'max-width': '19rem' }"
  >
    <div class="modal__content">
      <div class="col-12 w-100 h-100 px-0">
        <div
            class="d-flex justify-content-center align-items-center hover-pointer border-bottom py-2 px-5 user-select-none"
            @click="selectProductType(true)"
        >
          <i
              v-if="showCheckProductType(true)"
              class="fa fa-check mx-1 text-success"
          ></i>
          {{ $t("offer") }}
        </div>
        <div
            class="d-flex justify-content-center align-items-center hover-pointer border-bottom py-2 px-5 user-select-none"
            @click="selectProductType(false)"
        >
          <i
              v-if="showCheckProductType(false)"
              class="fa fa-check mx-1 text-success"
          ></i>
          {{ $t("request") }}
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import ProductCategoriesDialog from "@/app/unit/shared/productCategory/productCategoriesScreen.vue";
import {NewFilterProductScreenState} from "@/app/unit/search/product/NewFilterProductScreenState";
import {ToastService} from "@/core/service/toast.service";
import {i18n} from "@/main";
import {getProductTypeById} from "@/core/service/utils.service";
import {Swiper, SwiperSlide} from "swiper/vue";

export default defineComponent({
  name: "NewFilterProductScreen",
  props: ["model"],
  components: {
    ProductCategoriesDialog, Swiper, SwiperSlide
  },
  setup(props, {emit}) {
    const state = ref(new NewFilterProductScreenState());
    const filterItems = ref([
      {title: "category"},
      {title: "area"},
      {title: "usedType"},
      {title: "credit"},
      {title: "productType"},
      {title: "immediate"},
    ]);
    const showDialog = ref(false);
    const productCategory = ref(null);
    const selectedCategory = ref(null);
    const showAreaDialog = ref(false);
    const selectedAreaTab = ref("city");
    const showDialogUsedType = ref(false);
    const saveCategory = ref(null);
    const showDialogCreditLevel = ref(false);
    const showDialogProductType = ref(false);
    const productTypeIsOffer = ref(null);
    const filterModel = ref({...props.model});

    function open() {
      filterModel.value = {...props.model};
      filterModel.value.categoryIds = (props.model.categoryIds ?? []).slice();
      filterModel.value.cityIds = (props.model.cityIds ?? []).slice();
      filterModel.value.areaIds = (props.model.areaIds ?? []).slice();
      filterModel.value.creditLevels = (props.model.creditLevels ?? []).slice();

      if (
          Array.isArray(props.model.categoryIds) &&
          props.model.categoryIds.length !== 0
      ) {
        if (
            saveCategory.value != null &&
            props.model.categoryIds[0] === saveCategory.value.catId
        ) {
          selectedCategory.value = saveCategory.value;
        }
      }
      showDialog.value = true;
    }

    function onSelectCategory(e) {
      let x;
      if (e.selectedLevel.catId4 == null) {
        x = {
          catId: -Math.abs(e.selectedLevel.categoryId),
          catName: e.selectedLevel.title,
          catId1: e.selectedLevel.catId1,
        };
      } else {
        x = {
          catId: e.selectedLevel.categoryId,
          catName: e.selectedLevel.title,
          catId1: e.selectedLevel.catId1,
        };
      }
      selectedCategory.value = x;
      if (
          saveCategory.value == null ||
          (selectedCategory.value != null && saveCategory.value.catId === selectedCategory.value.catId)
      ) {
        saveCategory.value = selectedCategory.value;
      }
      filterModel.value.categoryIds = [selectedCategory.value.catId];
    }

    function openCategory() {
      productCategory.value.showDialog();
    }

    function openChooseArea() {
      showAreaDialog.value = true;
      state.value.getCities();
    }

    function selectCity(cityId) {
      filterModel.value.areaIds = [];
      if (Array.isArray(filterModel.value.cityIds)) {
        let x = filterModel.value.cityIds.findIndex((m) => m === cityId);
        if (x !== -1) {
          filterModel.value.cityIds.splice(x, 1);
          return;
        }
      }
      filterModel.value.cityIds = filterModel.value.cityIds ?? [];
      if (filterModel.value.cityIds.length === 3) {
        ToastService.getInstance().warning(i18n.global.tc("Max3"));
        return;
      }
      filterModel.value.cityIds.push(cityId);
    }

    function showCheckCity(cityId) {
      if (Array.isArray(filterModel.value.cityIds)) {
        let x = filterModel.value.cityIds.find((m) => m === cityId);
        if (x) return true;
      }
      return false;
    }

    function showSelectArea() {
      return Array.isArray(filterModel.value.cityIds) &&
          filterModel.value.cityIds.length === 1;
    }

    function getAreas() {
      if (!showSelectArea()) return;
      selectedAreaTab.value = "area";
      state.value.getAreas(filterModel.value.cityIds[0]);
    }

    function backToCities() {
      selectedAreaTab.value = "city";
    }

    function selectArea(areaId) {
      if (Array.isArray(filterModel.value.areaIds)) {
        let x = filterModel.value.areaIds.findIndex((m) => m === areaId);
        if (x !== -1) {
          filterModel.value.areaIds.splice(x, 1);
          return;
        }
      }
      filterModel.value.areaIds = filterModel.value.areaIds ?? [];
      if (filterModel.value.areaIds.length === 3) {
        ToastService.getInstance().warning(i18n.global.tc("Max3"));
        return;
      }
      filterModel.value.areaIds.push(areaId);
    }

    function showCheckArea(areaId) {
      if (Array.isArray(filterModel.value.areaIds)) {
        let x = filterModel.value.areaIds.find((m) => m === areaId);
        if (x) return true;
      }
      return false;
    }

    function getAreasName() {
      if (
          (!Array.isArray(filterModel.value.cityIds) &&
              !Array.isArray(filterModel.value.areaIds)) ||
          (filterModel.value.cityIds.length === 0 &&
              filterModel.value.areaIds.length === 0)
      ) {
        return "";
      }

      if (filterModel.value.areaIds.length === 0) {
        let cities = [];
        for (let i = 0; i < filterModel.value.cityIds.length; i++) {
          let x = state.value.cities.find(
              (m) => m.id === filterModel.value.cityIds[i]
          );
          if (x) {
            cities.push(x);
          } else {

          }
        }
        return cities
            .map((m) => m.cityName)
            .toString()
            .replace("[", "")
            .replace("]", "");
      }

      let areas = [];
      for (let i = 0; i < filterModel.value.areaIds.length; i++) {
        let x = state.value.areas.find(
            (m) => m.id === filterModel.value.areaIds[i]
        );
        if (x) {
          areas.push(x);
        } else {

        }
      }
      return areas
          .map((m) => m.areaName)
          .toString()
          .replace("[", "")
          .replace("]", "");
    }

    function openChooseUsedType() {
      showDialogUsedType.value = true;
    }

    function selectUsedType(usedType) {
      if (filterModel.value.usedType === usedType) {
        filterModel.value.usedType = null;
      } else {
        filterModel.value.usedType = usedType;
      }
    }

    function showCheckUsedType(usedType) {
      return filterModel.value.usedType === usedType;
    }

    function usedTypeText() {
      if (filterModel.value.usedType === 1) return i18n.global.tc("new");
      else if (filterModel.value.usedType === 2)
        return i18n.global.tc("secondhand");
      return "";
    }

    function openChooseCreditLevel() {
      showDialogCreditLevel.value = true;
    }

    function selectCreditLevel(creditLevel) {
      if (Array.isArray(filterModel.value.creditLevels)) {
        let x = filterModel.value.creditLevels.findIndex(
            (m) => m === creditLevel
        );
        if (x !== -1) {
          filterModel.value.creditLevels.splice(x, 1);
          return;
        }
      }
      filterModel.value.creditLevels = filterModel.value.creditLevels ?? [];
      if (filterModel.value.creditLevels.length === 3) {
        return;
      }
      filterModel.value.creditLevels.push(creditLevel);
      filterModel.value.creditLevels = filterModel.value.creditLevels.sort();
    }

    function showCheckCreditLevel(creditLevel) {
      if (Array.isArray(filterModel.value.creditLevels)) {
        let x = filterModel.value.creditLevels.find((m) => m === creditLevel);
        if (x) return true;
      }
      return false;
    }

    function creditLevelText() {
      if (
          Array.isArray(filterModel.value.creditLevels) &&
          filterModel.value.creditLevels.length !== 0
      ) {
        return filterModel.value.creditLevels
            .map((m) => {
              return m === 1
                  ? i18n.global.tc("goldCreditLevel")
                  : m === 2
                      ? i18n.global.tc("silverCreditLevel")
                      : i18n.global.tc("bronzeCreditLevel");
            })
            .toString()
            .replace("[", "")
            .replace("]", "");
      }
      return "";
    }

    function openChooseProductType() {
      if (selectedCategory.value == null) {
        ToastService.getInstance().warning(
            i18n.global.tc("categoryNotSelected")
        );
        return;
      }
      showDialogProductType.value = true;
    }

    function selectProductType(isOffer) {
      if (productTypeIsOffer.value === isOffer) {
        productTypeIsOffer.value = null;
        filterModel.value.productType = null;
      } else {
        productTypeIsOffer.value = isOffer;
        filterModel.value.productType = getProductTypeById(
            selectedCategory.value.catId1,
            !isOffer,
            false
        );
      }
    }

    function showCheckProductType(isOffer) {
      return productTypeIsOffer.value === isOffer;
    }

    function productTypeText() {
      if (productTypeIsOffer.value === true) return i18n.global.tc("offer");
      else if (productTypeIsOffer.value === false)
        return i18n.global.tc("request");
      return "";
    }

    function confirmFilter() {
      showDialog.value = false;
      emit("confirmFilter", filterModel.value);
    }

    function closeDialog() {
      selectedCategory.value = null;
      selectedAreaTab.value = "city";
      productTypeIsOffer.value = null;
      showDialog.value = false;
    }

    function selectedFilter(index) {
      if (index === 0) {
        return Array.isArray(props.model.categoryIds) &&
            props.model.categoryIds.length !== 0;
      } else if (index === 1) {
        return (Array.isArray(props.model.areaIds) &&
                props.model.areaIds.length !== 0) ||
            (Array.isArray(props.model.cityIds) &&
                props.model.cityIds.length !== 0);
      } else if (index === 2) {
        return props.model.usedType != null;
      } else if (index === 3) {
        return Array.isArray(props.model.creditLevels) &&
            props.model.creditLevels.length !== 0;
      } else if (index === 4) {
        return props.model.productType != null;
      } else if (index === 5) {
        return props.model.isImmediate === true;
      }
    }

    function cancelFilter(index) {
      if (index === 0) {
        selectedCategory.value = null;
        props.model.categoryIds = null;
        filterModel.value.categoryIds = null;
      } else if (index === 1) {
        props.model.cityIds = null;
        props.model.areaIds = null;
        filterModel.value.cityIds = null;
        filterModel.value.areaIds = null;
      } else if (index === 2) {
        props.model.usedType = null;
        filterModel.value.usedType = null;
      } else if (index === 3) {
        props.model.creditLevels = null;
        filterModel.value.creditLevels = null;
      } else if (index === 4) {
        props.model.productType = null;
        filterModel.value.productType = null;
        productTypeIsOffer.value = false;
      } else if (index === 5) {
        props.model.isImmediate = null;
        filterModel.value.isImmediate = null;
      }
      emit("confirmFilter", filterModel.value);
    }

    return {
      filterItems,
      showDialog,
      onSelectCategory,
      productCategory,
      openCategory,
      selectedCategory,
      openChooseArea,
      showAreaDialog,
      state,
      showCheckCity,
      selectCity,
      showSelectArea,
      getAreas,
      selectedAreaTab,
      backToCities,
      selectArea,
      showCheckArea,
      getAreasName,
      showDialogUsedType,
      openChooseUsedType,
      selectUsedType,
      showCheckUsedType,
      usedTypeText,
      openChooseCreditLevel,
      selectCreditLevel,
      showCheckCreditLevel,
      creditLevelText,
      showDialogCreditLevel,
      showDialogProductType,
      openChooseProductType,
      selectProductType,
      showCheckProductType,
      productTypeText,
      confirmFilter,
      filterModel,
      open,
      closeDialog,
      selectedFilter,
      cancelFilter,
    };
  },
});
</script>

<style lang="scss" scoped>
.filter-item {
  margin: 3px;
  padding: 1px 8px;
  border-radius: 38px;
  box-shadow: 00px 0 4px -1px grey;
  font-size: 14px !important;
}

.swiper-container {
  width: 100%;
  height: 44px;
  padding-bottom: 15px !important;
}

.swiper-slide {
  width: auto !important;
  padding: 3px;
}

.filter-item-box {
  padding: 10px;
  box-shadow: 0 0 3px 0 grey;
  margin: 9px;
  border-radius: 10px;
}
</style>
