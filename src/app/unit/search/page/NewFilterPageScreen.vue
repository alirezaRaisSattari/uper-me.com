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
        v-for="(filterItem ,index) in filterItems"
        :key="filterItem.title"
    >
      <div class="filter-item user-select-none border hover-pointer d-flex align-items-center" @click="open()">
        <i v-if="selectedFilter(index)" class="fa fa-times hover-bg-primary p-1"
           @click="$event.stopPropagation();cancelFilter(index)">&nbsp;</i>
        {{ $t(filterItem.title) }}
      </div>
    </swiper-slide>
  </swiper>

  <Dialog v-model:visible="showDialog"
          :dismissableMask="false"
          :header="false"
          :modal="true"

          :style="{'width': '19rem !important'}">

    <p class="text-center my-2">{{ $t('filters') }}</p>
    <div class="filter-item-box hover-pointer" @click="openCategory()">
      <div class="d-flex justify-content-between align-items-center">
        <div class="smart-text-align">
          <small class="text-muted">{{ $t('category') }}</small><br/>
          <small v-if="selectedCategory != null">{{ selectedCategory.catName }}</small>
        </div>
        <i class="fa fa-arrow-left"></i>
      </div>
    </div>

    <div class="filter-item-box hover-pointer" @click="openChooseCity()">
      <div class="d-flex justify-content-between align-items-center">
        <div class="smart-text-align">
          <small class="text-muted">{{ $t('city') }}</small><br/>
          <small>{{ getCityName() }}</small>
        </div>
        <i class="fa fa-arrow-left"></i>
      </div>
    </div>

    <div class="filter-item-box hover-pointer" @click="openChooseSellType()">
      <div class="d-flex justify-content-between align-items-center">
        <div class="smart-text-align">
          <small class="text-muted">{{ $t('sellType') }}</small><br/>
          <small>{{ sellTypeText() }}</small>
        </div>
        <i class="fa fa-arrow-left"></i>
      </div>
    </div>

    <div class="filter-item-box hover-pointer" @click="openChooseCreditLevel()">
      <div class="d-flex justify-content-between align-items-center">
        <div class="smart-text-align">
          <small class="text-muted">{{ $t('CreditLevel') }}</small><br/>
          <small>{{ creditLevelText() }}</small>
        </div>
        <i class="fa fa-arrow-left"></i>
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

  <PageCategoriesDialog
      v-if="showDialog"
      ref="pageCategory"
      :callback="onSelectCategory"
  />

  <Dialog
      v-model:visible="showCityDialog"
      :breakpoints="{ '440px': '100vw' }"
      :dismissableMask="true"
      :modal="true"
      :style="{ 'max-width': '19rem' }"
  >

    <div class="modal__content">
      <div class="col-12 w-100 h-100 px-0">
        <input type="text" v-model="searchCities" @input="filterCity()" class="input-serach-cities" :placeholder="$t('searchCities')" >
        <div
            v-for="city in state.cities"
            class="d-flex justify-content-center align-items-center hover-pointer border-bottom py-2 px-5 user-select-none"
            @click="selectCity(city.id)"
            :key="city"
        >

          <i v-if="showCheckCity(city.id)" class="fa fa-check mx-1 text-success"></i>
          {{ city.cityName }}
        </div>
      </div>

    </div>
  </Dialog>

  <Dialog
      v-model:visible="showDialogSellType"
      :breakpoints="{ '440px': '100vw' }"
      :dismissableMask="true"
      :modal="true"

      :style="{ 'max-width': '19rem' }"
  >
    <div class="modal__content">
      <div class="col-12 w-100 h-100 px-0">
        <div
            class="d-flex justify-content-center align-items-center hover-pointer border-bottom py-2 px-5 user-select-none"
            @click="selectSellType(1)"
        >
          <i v-if="showCheckSellType(1)" class="fa fa-check mx-1 text-success"></i>
          {{ $t('actual') }}
        </div>
        <div
            class="d-flex justify-content-center align-items-center hover-pointer border-bottom py-2 px-5 user-select-none"
            @click="selectSellType(2)"
        >
          <i v-if="showCheckSellType(2)" class="fa fa-check mx-1 text-success"></i>
          {{ $t('virtual') }}
        </div>
        <div
            class="d-flex justify-content-center align-items-center hover-pointer border-bottom py-2 px-5 user-select-none"
            @click="selectSellType(3)"
        >
          <i v-if="showCheckSellType(3)" class="fa fa-check mx-1 text-success"></i>
          {{ $t('both') }}
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
          <i v-if="showCheckCreditLevel(1)" class="fa fa-check mx-1 text-success"></i>
          {{ $t('goldCreditLevel') }}
        </div>
        <div
            class="d-flex justify-content-center align-items-center hover-pointer border-bottom py-2 px-5 user-select-none"
            @click="selectCreditLevel(2)"
        >
          <i v-if="showCheckCreditLevel(2)" class="fa fa-check mx-1 text-success"></i>
          {{ $t('silverCreditLevel') }}
        </div>
        <div
            class="d-flex justify-content-center align-items-center hover-pointer border-bottom py-2 px-5 user-select-none"
            @click="selectCreditLevel(3)"
        >
          <i v-if="showCheckCreditLevel(3)" class="fa fa-check mx-1 text-success"></i>
          {{ $t('bronzeCreditLevel') }}
        </div>
      </div>
    </div>
  </Dialog>


</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import PageCategoriesDialog from "@/app/unit/shared/pageCategories/PagesCategoriesScreen.vue";
import {ToastService} from "@/core/service/toast.service";
import {i18n} from "@/main";
import {NewFilterPageState} from "@/app/unit/search/page/NewFilterPageState";
import {Swiper, SwiperSlide} from "swiper/vue";
import _ from "lodash";

export default defineComponent({
  name: "NewFilterPageScreen",
  props: ["model"],
  components: {
    PageCategoriesDialog,
    Swiper, SwiperSlide
  },
  setup(props, {emit}) {

    const state = ref(new NewFilterPageState());
    const searchCities = ref('')
    const filterItems = ref([
      {title: "category"},
      {title: "city"},
      {title: "sellType"},
      {title: "credit"},
    ]);
    const cityName = ref()
    const filterCity = ()=>{
     state.value.cities = state.value.cities.filter(value => value.cityName.includes(searchCities.value))
    }
    //
    // })
    const showDialog = ref(false);
    const pageCategory = ref(null);
    const selectedCategory = ref(null);
    const saveCategory = ref(null);
    const showCityDialog = ref(false);
    const showDialogSellType = ref(false);
    const showDialogCreditLevel = ref(false);
    const filterModel = ref({...props.model});

    function open() {
      filterModel.value = {...props.model};
      filterModel.value.categoryIds = (props.model.categoryIds ?? []).slice();
      filterModel.value.sellTypes = (props.model.sellTypes ?? []).slice();
      filterModel.value.creditLevels = (props.model.creditLevels ?? []).slice();
      filterModel.value.cityIds = (props.model.cityIds ?? []).slice();
      if (Array.isArray(props.model.categoryIds) && props.model.categoryIds.length !== 0) {
        if (saveCategory.value != null && props.model.categoryIds[0] === saveCategory.value.catId) {
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
          catId1: e.selectedLevel.catId1
        };
      } else {
        x = {
          catId: e.selectedLevel.categoryId,
          catName: e.selectedLevel.title,
          catId1: e.selectedLevel.catId1
        };
      }
      selectedCategory.value = x;
      if (saveCategory.value == null || (selectedCategory.value != null && saveCategory.value.catId === selectedCategory.value.catId)) {
        saveCategory.value = selectedCategory.value;
      }
      filterModel.value.categoryIds = [selectedCategory.value.catId];
    }

    function openCategory() {
      pageCategory.value.showDialog();
    }

    function openChooseCity() {
      showCityDialog.value = true;
      state.value.getCities();
    }

    function selectCity(cityId) {
      if (Array.isArray(filterModel.value.cityIds)) {
        let x = filterModel.value.cityIds.findIndex(m => m === cityId);
        if (x !== -1) {
          filterModel.value.cityIds.splice(x, 1);
          return;
        }
      }
      filterModel.value.cityIds = filterModel.value.cityIds ?? [];
      if (filterModel.value.cityIds.length === 3) {
        ToastService.getInstance().warning(i18n.global.tc('Max3'));
        return;
      }
      filterModel.value.cityIds.push(cityId);
    }

    function showCheckCity(cityId) {
      if (Array.isArray(filterModel.value.cityIds)) {
        let x = filterModel.value.cityIds.find(m => m === cityId);
        if (x) return true;
      }
      return false;
    }

    function getCityName() {
      if (
          !Array.isArray(filterModel.value.cityIds) || filterModel.value.cityIds.length === 0
      ) {
        return '';
      }

      let cities = [];
      for (let i = 0; i < filterModel.value.cityIds.length; i++) {
        let x = state.value.cities.find(m => m.id === filterModel.value.cityIds[i]);
        if (x) {
          cities.push(x);
        } else {

        }
      }
      return cities.map(m => m.cityName).toString().replace('[', '').replace(']', '');

    }

    function openChooseSellType() {
      showDialogSellType.value = true;
    }

    function selectSellType(sellType) {
      if (Array.isArray(filterModel.value.sellTypes)) {
        let x = filterModel.value.sellTypes.findIndex(m => m === sellType);
        if (x !== -1) {
          filterModel.value.sellTypes.splice(x, 1);
          return;
        }
      }
      filterModel.value.sellTypes = filterModel.value.sellTypes ?? [];
      if (filterModel.value.sellTypes.length === 3) {
        return;
      }
      filterModel.value.sellTypes.push(sellType);
      filterModel.value.sellTypes = filterModel.value.sellTypes.sort();
    }

    function showCheckSellType(sellType) {
      if (Array.isArray(filterModel.value.sellTypes)) {
        let x = filterModel.value.sellTypes.find(m => m === sellType);
        if (x) return true;
      }
      return false;
    }

    function sellTypeText() {
      if (Array.isArray(filterModel.value.sellTypes) && filterModel.value.sellTypes.length !== 0) {
        return filterModel.value.sellTypes.map(m => {
          return m === 1 ? i18n.global.tc('actual') :
              m === 2 ? i18n.global.tc('virtual') :
                  i18n.global.tc('both');
        }).toString().replace('[', '').replace(']', '');
      }
      return '';
    }

    function openChooseCreditLevel() {
      showDialogCreditLevel.value = true;
    }

    function selectCreditLevel(creditLevel) {
      if (Array.isArray(filterModel.value.creditLevels)) {
        let x = filterModel.value.creditLevels.findIndex(m => m === creditLevel);
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
        let x = filterModel.value.creditLevels.find(m => m === creditLevel);
        if (x) return true;
      }
      return false;
    }

    function creditLevelText() {
      if (Array.isArray(filterModel.value.creditLevels) && filterModel.value.creditLevels.length !== 0) {
        return filterModel.value.creditLevels.map(m => {
          return m === 1 ? i18n.global.tc('goldCreditLevel') :
              m === 2 ? i18n.global.tc('silverCreditLevel') :
                  i18n.global.tc('bronzeCreditLevel');
        }).toString().replace('[', '').replace(']', '');
      }
      return '';
    }

    function confirmFilter() {
      showDialog.value = false;
      emit('confirmFilter', filterModel.value);
    }

    function closeDialog() {
      selectedCategory.value = null;
      showDialog.value = false;
    }

    function selectedFilter(index) {
      if (index === 0) {
        return Array.isArray(props.model.categoryIds) && props.model.categoryIds.length !== 0;
      } else if (index === 1) {
        return Array.isArray(props.model.cityIds) && props.model.cityIds.length !== 0;
      } else if (index === 2) {
        return Array.isArray(props.model.sellTypes) && props.model.sellTypes.length !== 0;
      } else if (index === 3) {
        return Array.isArray(props.model.creditLevels) && props.model.creditLevels.length !== 0;
      }
    }

    function cancelFilter(index) {
      if (index === 0) {
        selectedCategory.value = null;
        props.model.categoryIds = null;
        filterModel.value.categoryIds = null;
      } else if (index === 1) {
        props.model.cityIds = null;
        filterModel.value.cityIds = null;
      } else if (index === 2) {
        props.model.sellTypes = null;
        filterModel.value.sellTypes = null;
      } else if (index === 3) {
        props.model.creditLevels = null;
        filterModel.value.creditLevels = null;
      }
      emit('confirmFilter', filterModel.value);
    }

    return {
      // cityName,
      filterCity,
      searchCities,
      filterItems,
      showDialog,
      onSelectCategory,
      pageCategory,
      openCategory,
      selectedCategory,
      openChooseCity,
      showCityDialog,
      state,
      showCheckCity,
      selectCity,
      getCityName,
      showDialogSellType,
      openChooseSellType,
      selectSellType,
      showCheckSellType,
      sellTypeText,
      openChooseCreditLevel,
      selectCreditLevel,
      showCheckCreditLevel,
      creditLevelText,
      showDialogCreditLevel,
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
.input-serach-cities {
  width:100%;
}
.filter-item {
  margin: 3px;
  padding: 1px 8px;
  border-radius: 38px;
  box-shadow: 00px 0px 4px -1px grey;
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
  box-shadow: 0px 0px 3px 0px grey;
  margin: 9px;
  border-radius: 10px;
}

</style>
