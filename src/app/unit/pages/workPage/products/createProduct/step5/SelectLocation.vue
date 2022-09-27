<template>
  <div>
    <confirmDialog
      :header="$t('addAddress')"
      :icon="'fa fa-exclamation-triangle'"
      :text="`${selectedCityName},${selectedLocation.areaName}`"
      :visible="openConfirmDialog"
      @accept="addAdress"
      @reject="openConfirmDialog = false"
    />
    <p class="w-100 smart-text-align px-3 my-4">
      {{ $t("available_product_address") }}
    </p>
    <div class="w-100 px-3 d-flex align-items-center justify-content-between">
      <span class="w-75 text-right">{{ $t("workPageAddress") }}</span>
      <div class="squaredThree w-25">
        <input
          id="squaredThree"
          v-model="selectPageAddress"
          name="check"
          type="checkbox"
          value="None"
          @click="
            !selectPageAddress
              ? selectThisLocation(State.pageInfo, 1)
              : () => {}
          "
        />
        <label for="squaredThree"></label>
      </div>
    </div>
    <div v-if="addedAddresses != 0">
      <div class="w-100 px-3 d-flex align-items-center justify-content-between">
        <span class="w-75 text-right"
          >{{ addedAddresses.cityName }},{{ addedAddresses.areaName }}</span
        >
        <div class="squaredThree w-25">
          <input
            id="index"
            v-model="addedAddresses.isSelected"
            name="check"
            type="checkbox"
            value="None"
            @click="
              !addedAddresses.isSelected
                ? selectThisLocation(addedAddresses, 2)
                : () => {}
            "
          />
          <label for="index"></label>
        </div>
      </div>
    </div>
    <div class="w-100 text-left px-3">
      <button
        class="btn rounded btn-color mt-4"
        @click="newAddressDialog = !newAddressDialog"
      >
        {{ $t("addNewAddress") }}
      </button>
    </div>
    <bottomBar>
      <button
        class="btn btn-danger text-light rounded-pill px-5 py-1"
        type="submit"
        @click="nextStepFunc"
      >
        {{ $t("submit") }}
      </button>
    </bottomBar>
    <Dialog
      v-model:visible="newAddressDialog"
      :breakpoints="{
        '1000px': '52vw',
        '800px': '65vw',
        '600px': '91vw',
      }"
      :contentStyle="{
        background: 'rgb(255, 255, 255)',
        borderRadius: '12px',
      }"
      :showHeader="false"
      :style="{ padding: '10px', border: 'none', width: '100%', 'max-width':'500px','min-height':'500px', 'border-radius':'10px' }"
      dismissableMask
      header=""
      modal
    >
      <div class="w-100 p-3">
        <SelectLocationOnMap
          :callback="getCurrentLatlng"
          style="width: 100%; height: 200px"
        />
        <p class="w-100 text-right m-1 mt-2">
          {{ $t("city") }} : {{ selectedCityName }}
        </p>
        <p class="w-100 text-right m-1 mt-2">
          {{ $t("area") }} : {{ selectedLocation.areaName }}
        </p>
      </div>
    </Dialog>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { LocationState } from "./SelectLocationState";
import {
  getSelectedPageData,
  getSelectedPageId,
} from "@/core/service/utils.service";
import SelectLocationOnMap from "@/app/public/shared/mapComponent/SelectLocationOnMap.vue";
import confirmDialog from "@/app/public/shared/confirmDialog/ConfirmDialog.vue";
import { ToastService } from "@/core/service/toast.service";
import { i18n } from "@/main";
import bottomBar from "@/app/public/shared/bottomBar/BottomBar.vue";
import { CacheService } from "@/core/service/cache.service";

export default {
  props: {
    model: Object,
  },
  components: { SelectLocationOnMap, confirmDialog, bottomBar },
  setup(props, { emit }) {
    const State = ref(new LocationState());
    const newAddressDialog = ref(false);
    const mapExist = ref(false);
    const openConfirmDialog = ref(false);
    const selectPageAddress = ref(true);
    const addedAddresses = ref([]);
    const selectedLocation = ref({});
    const selectedCityName = ref("");

    function getPageInfo() {
      let model = {
        myPageId: getSelectedPageId(),
        targetPageId: getSelectedPageId(),
        username: getSelectedPageData().username,
      };
      State.value.getFullPage(model);
    }

    onMounted(() => {
      getPageInfo();
    });

    function getCurrentLatlng(location) {
      mapExist.value = false;
      State.value.getLocationByLatLon(location, (obj, cityName) => {
        selectedLocation.value = obj;
        selectedCityName.value = cityName;
        openConfirmDialog.value = !openConfirmDialog.value;
      });
    }

    function addAdress() {
      newAddressDialog.value = false;
      openConfirmDialog.value = false;
      selectPageAddress.value = false;
      selectedLocation.value["isSelected"] = true;
      selectedLocation.value["cityName"] = selectedCityName.value;
      selectedLocation.value["areaName"] = selectedLocation.value.areaName;
      addedAddresses.value = selectedLocation.value;
    }

    function selectThisLocation(obj, index) {
      if (index == 1) {
        props.model.countryId = CacheService.getInstance().getCityById(
          obj.cityId
        ).countryId;
        addedAddresses.value.isSelected = false;
      } else {
        selectPageAddress.value = false;
        props.model.countryId = obj.countryId;
      }
      props.model.cityId = obj.cityId;
      props.model.areaId = obj.areaId;
    }

    function nextStepFunc() {
      if (selectPageAddress.value) {
        props.model.countryId = CacheService.getInstance().getCityById(
          State.value.pageInfo.cityId
        ).countryId;
        props.model.cityId = State.value.pageInfo.cityId;
        props.model.areaId = State.value.pageInfo.areaId;
      } else if (addedAddresses.value) {
        selectPageAddress.value = false;
        props.model.countryId = addedAddresses.value.countryId;
        props.model.cityId = addedAddresses.value.cityId;
        props.model.areaId = addedAddresses.value.areaId;
      }
      emit("updateStepFive", props.model);
    }

    return {
      State,
      newAddressDialog,
      selectedLocation,
      openConfirmDialog,
      selectedCityName,
      addedAddresses,
      selectPageAddress,
      nextStepFunc,
      getCurrentLatlng,
      addAdress,
      selectThisLocation,
    };
  },
};
</script>

<style scoped>
.squaredThree {
  width: 20px;
  position: relative;
  margin: 20px auto;
}

.squaredThree label {
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  background: #f58a00;
  border-radius: 2px;
}

.squaredThree label:after {
  content: "";
  width: 11px;
  height: 8px;
  position: absolute;
  top: 4px;
  left: 4px;
  border: 3px solid #fcfff4;
  border-top: none;
  border-right: none;
  background: transparent;
  opacity: 0;
  transform: rotate(-45deg);
}

.squaredThree input[type="checkbox"] {
  visibility: hidden;
}

.squaredThree input[type="checkbox"]:checked + label:after {
  opacity: 1;
}

.btn-color {
  background-color: rgb(197, 228, 231);
}
</style>
