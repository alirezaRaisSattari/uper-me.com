<template>
  <div>
    <h6 class="header-title mt-3">{{ $t("Add_new_address") }}</h6>
    <div class="d-flex justify-content-center">
      <img alt="" class="header-shape" src="@/assets/img/svg/appbarShape.svg"/>
    </div>

    <div class="px-2 mt-4">
      <Form
          v-slot="{ errors }"
          :validation-schema="formSchema"
          class="w-100"
          @submit="onSubmitLogin"
      >
        <Field
            id="addressTitle"
            v-model="title"
            :class="errors.addressTitle ? 'border-danger' : ''"
            :placeholder="$t('addressTitle')"
            class="form-control"
            name="addressTitle"
            type="text"
        />
        <div class="text-danger text-sm smart-text-align">
          {{ errors.addressTitle }}
        </div>

        <div class="main-card p-2 my-3">
          <div
              class="btn map-btn w-100 text-center"
              @click="newAddressDialog = !newAddressDialog"
          >
            {{ $t("editLocation") }}
          </div>
          <div
              class="
              w-100
              smart-text-align
              my-2
              text-sm
              d-flex
              justify-content-between
            "
          >
            <span>{{ $t("city") }} <i class="text-danger">*</i></span>
            <span>{{ State.cityName }}</span>
          </div>
          <div
              class="
              w-100
              smart-text-align
              my-2
              text-sm
              d-flex
              justify-content-between
            "
          >
            <span>{{ $t("area") }} <i class="text-danger">*</i></span>
            <span>{{ State.areaName }}</span>
          </div>
        </div>
        <div class="main-card p-2 my-3">
          <Field
              id="addressText"
              v-model="address"
              :class="errors.addressText ? 'border-danger' : ''"
              :placeholder="$t('text_address')"
              class="form-control my-2"
              name="addressText"
              type="text"
          />
          <div class="text-danger text-sm">{{ errors.addressText }}</div>
          <input
              v-model="postalCode"
              :placeholder="$t('postalCode')"
              class="form-control"
              type="number"
          />
          <div class="w-100 p-2 my-2 d-flex justify-content-between">
            <span>{{ $t("phones") }}</span>
            <i class="fa fa-phone" @click="addPhone">+</i>
          </div>
          <div v-if="phones.length !== 0" class="d-flex flex-column">
            <div
                v-for="(phon, index) in phones"
                :key="index"
                class="w-100 rounded border p-2 my-2"
            >
              <p class="w-100 px-2">
                <i class="fas fa-trash" @click="deletePhone(index)"></i>
              </p>
              <input
                  v-model="phon.title"
                  :placeholder="$t('phone_title')"
                  class="form-control my-2"
                  type="text"
              />
              <input
                  v-model="phon.number"
                  :placeholder="$t('mobileNumber')"
                  class="form-control my-2"
                  type="number"
              />
            </div>
          </div>
        </div>
      </Form>
    </div>
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
        :style="{ padding: '10px', border: 'none' }"
        dismissableMask
        header=""
        modal
    >
      <div class="p-3">
        <SelectLocationOnMap
            :callback="getCurrentLatlng"
            style="width: 100%; height: 200px"
        />
      </div>
    </Dialog>
    <bottomBar>
      <loading v-if="State.createLoading"></loading>
      <button
          v-else
          class="btn btn-danger text-light rounded-pill px-5 py-1"
          @click="createAddress"
      >
        {{ $t("submit") }}
      </button>
    </bottomBar>
  </div>
</template>

<script>
import {Field, Form} from "vee-validate";
import * as Yup from "yup";
import {i18n} from "@/main";
import {ref} from "vue";
import SelectLocationOnMap from "@/app/public/shared/mapComponent/SelectLocationOnMap.vue";
import {ToastService} from "@/core/service/toast.service";
import bottomBar from "@/app/public/shared/bottomBar/BottomBar.vue";
import {getSelectedPageId} from "@/core/service/utils.service";
import {newAddressState} from "./createNewAddressState";

export default {
  components: {Field, Form, SelectLocationOnMap, bottomBar},
  setup() {
    const State = ref(new newAddressState());
    const newAddressDialog = ref(false);
    const phones = ref([]);
    const latitude = ref(null);
    const longitude = ref(null);
    const title = ref("");
    const address = ref("");
    const postalCode = ref("");
    const cityId = ref(1);
    const areaId = ref(1);
    const formSchema = Yup.object().shape({
      addressTitle: Yup.string()
          .test(
              "len",
              i18n.global.tc("invalidAddressTitle"),
              (val) => val.length > 0
          )
          .default(""),
      addressText: Yup.string()
          .test(
              "len",
              i18n.global.tc("invalidAddressText"),
              (val) => val.length > 0
          )
          .default(""),
    });

    function getCurrentLatlng(location) {
      latitude.value = location.lat;
      longitude.value = location.lng;
      State.value.getLocationByLatLon(location, (city, area) => {
        newAddressDialog.value = false;
        cityId.value = city;
        areaId.value = area;
      });
    }

    function addPhone() {
      const phonesCount = phones.value.length;
      if (phonesCount === 0) phones.value.push({title: "", number: ""});
      if (phonesCount >= 3) {
        ToastService.getInstance().error(i18n.global.tc("Max3"));
        return;
      }
      if (
          !(phones.value[phonesCount - 1].title === "" ||
              phones.value[phonesCount - 1].number === "")
      ) {
        phones.value.push({title: "", number: ""});
      }
    }

    function deletePhone(index) {
      phones.value.splice(index, 1);
    }

    function createAddress() {
      if (
          latitude.value == null ||
          longitude.value == null ||
          title.value === "" ||
          address.value === ""
      ) {
        ToastService.getInstance().error(i18n.global.tc("invalidInfo"));

      } else {
        let model = {
          pageId: getSelectedPageId(),
          title: title.value,
          address: address.value,
          postalCode: postalCode.value.toString(),
          cityId: cityId.value,
          areaId: areaId.value,
          latitude: latitude.value,
          longitude: longitude.value,
          phones: phones.value,
        };
        State.value.createAddressFavorite(model, () => {
          ToastService.getInstance().success(
              i18n.global.tc("createAddressSuccessful")
          );
          title.value = "";
          address.value = "";
          postalCode.value = "";
          latitude.val = null;
          longitude.value = null;
          phones.value = [];
          State.value.cityName = "";
          State.value.areaName = "";
        });
      }
    }

    return {
      formSchema,
      newAddressDialog,
      getCurrentLatlng,
      phones,
      addPhone,
      deletePhone,
      createAddress,
      title,
      address,
      State,
      postalCode,
    };
  },
};
</script>

<style scoped>
.header-title {
  text-align: center;
  width: 100%;
  position: absolute;
}

.header-shape {
  width: 288px;
}

.main-card {
  border-radius: 10px;
  box-shadow: 0px 0px 3px 1px #8080808c;
}

.map-btn {
  background: #c5e4e7;
}
</style>
