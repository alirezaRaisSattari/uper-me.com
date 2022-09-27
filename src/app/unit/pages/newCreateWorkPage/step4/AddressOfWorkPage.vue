<template>
  <div class="animate__animated animate__fadeIn pb-5">
    <div
      class="
        d-flex
        p-2
        flex-column
        justify-content-center
        align-content-center
        uper-card-1
        m-2
        mt-2
        smart-text-align
      "
    >
      <p class="m-3">{{ $t("locationType") }}</p>
      <div
        class="
          d-flex
          justify-content-center
          align-content-center
          w-75
          mx-auto
          rtl
          mb-3
        "
      >
        <button
          :class="model.locationType == 1 ? 'selected' : ''"
          class="button button-right py-2 width33 presenceBtn"
          type="button"
          @click="model.locationType = 1"
        >
          {{ $t("immobile") }}
        </button>
        <button
          :class="model.locationType == 2 ? 'selected' : ''"
          class="button width33 py-2 presenceBtn button-left"
          type="button"
          @click="model.locationType = 2"
        >
          {{ $t("mobile") }}
        </button>
      </div>

      <p class="m-3">{{ $t("status") }}</p>
      <div
        class="
          d-flex
          justify-content-center
          align-content-center
          w-75
          mx-auto
          rtl
          mb-3
        "
      >
        <button
          :class="model.statusType == 1 ? 'selected' : ''"
          class="button button-right py-2 width33 presenceBtn"
          type="button"
          @click="model.statusType = 1"
        >
          {{ $t("active") }}
        </button>
        <button
          :class="model.statusType == 2 ? 'selected' : ''"
          class="button width33 py-2 presenceBtn"
          type="button"
          @click="model.statusType = 2"
        >
          {{ $t("close") }}
        </button>
        <button
          :class="model.statusType == 3 ? 'selected' : ''"
          class="button button-left py-2 width33 presenceBtn"
          type="button"
          @click="model.statusType = 3"
        >
          {{ $t("underStructure") }}
        </button>
      </div>
      <input
        v-model="model.intrduceCode"
        :placeholder="$t('introduceCode')"
        class="m-3 border-radius-10px p-2 inputs"
        type="text"
      />
      <input
        v-model="model.supporterId"
        :placeholder="$t('backUp-id')"
        class="m-3 border-radius-10px p-2 inputs"
        type="number"
      />
    </div>
    <div
      class="
        d-flex
        p-2
        flex-column
        justify-content-center
        align-content-center
        uper-card-1
        m-2
        mt-4
        smart-text-align
        mb-5
      "
    >
      <div
        v-if="model.addresses.length == 0"
        class="d-flex justify-content-between align-content-center"
      >
        <p>{{ $t("selectAddress") }}</p>
        <button
          class="btn rounded btn-color"
          @click="displayAddressDialog = true"
        >
          {{ $t("addAddress") }}
        </button>
      </div>
      <div
        v-for="(item, index) in model.addresses"
        :key="item"
        class="uper-card-1 mt-3 p-3 mx-1"
      >
        <div class="d-flex justify-content-lg-between align-content-center">
          <i class="fas fa-map-marker-alt my-auto text-lg"></i>
          <div class="ml-auto mr-2">
            <p class="m-0">{{ item.title }}</p>
            <p class="m-0 color-custom">{{ item.cityName }}</p>
          </div>
          <i
            class="fas fa-ellipsis-v my-auto ml-2 text-lg"
            @click="initUpdateDialog(item, index)"
          ></i>
        </div>
        <hr />
        <div class="d-flex mb-3">
          <p class="color-custom my-0">{{ $t("address") }} :</p>
          <p class="mr-1 my-0">{{ item.address }}</p>
        </div>
        <div
          v-for="i in item.phones"
          :key="i"
          class="d-flex bg-custom fit-to-content rounded-custom p-1 pl-2"
        >
          <p class="my-auto mr-2">{{ i.number }}</p>
          <i class="fas fa-phone-alt my-auto"></i>
        </div>
      </div>
      <p class="m-3">{{ $t("displyWorkPage") }}</p>
      <div
        class="
          d-flex
          justify-content-center
          align-content-center
          w-75
          mx-auto
          rtl
          mb-3
        "
      >
        <button
          :class="model.isAddressShow ? 'selected' : ''"
          class="button button-right py-2 width33 presenceBtn"
          type="button"
          @click="model.isAddressShow = true"
        >
          {{ $t("yes") }}
        </button>
        <button
          :class="!model.isAddressShow ? 'selected' : ''"
          class="button width33 py-2 presenceBtn button-left"
          type="button"
          @click="model.isAddressShow = false"
        >
          {{ $t("no") }}
        </button>
      </div>
      <div class="d-flex justify-content-between">
        <a class="my-auto" @click="viewRules()">{{ $t("confirmTerms") }}</a>
        <Checkbox id="binary" v-model="confirmTerms" :binary="true" class="my-auto mx-2" />
      </div>
    </div>
  </div>
  <bottomBar>
    <button
      class="btn dtn-bg text-light rounded-pill px-5 py-1"
      @click="nextStepFunc"
    >
      {{ $t("submit") }}
    </button>
  </bottomBar>

    <Dialog dismissableMask v-model:visible="displayAddressOpt" :contentStyle="{
      background: 'rgb(255, 255, 255)',
      borderRadius: '12px',
    }" :showHeader="false" :style="{ border: 'none', maxWidth: '512px', width:'95%' }" header="" modal>
      <Button :label="$t('delete')" class="p-button-text w-100 p-button-rounded m-1" @click="onDeleteAddress()" />
      <Button :label="$t('edit')" class="p-button-text w-100 p-button-rounded m-1" @click="displayAddressDialog = true" />
    </Dialog>

  <Dialog
    v-model:visible="displayAddressDialog"
    :contentStyle="{
      background: 'rgb(255, 255, 255)',
      borderRadius: '12px',
    }" :showHeader="false" :style="{ border: 'none', maxWidth: '512px' , width:'95%' }"  modal>
      <div class="d-flex justify-content-center w-100">
        <div class="d-flex justify-content-center header w-100">
          <div class="d-flex justify-content-center w-100">
            <Header :title="$t('addNewAddress')" />
          </div>
        </div>
      </div>
    <address-dialog
      @onCreate="(data) => onCreateAddress(data)"
      @onUpdate="(data) => onUpdateAddress(data)"
      :addressData="selectedAddress"
      @onClose="(data) => onClose()"
    />
  </Dialog>
</template>

<script lang="ts">
import { ref } from "vue";
import addressDialog from "./addressDialog/addressDialog.vue";
import Checkbox from "primevue/checkbox";
import { ToastService } from "@/core/service/toast.service";
import { i18n } from "@/main";
import bottomBar from "@/app/public/shared/bottomBar/BottomBar.vue";
import Header from "@/app/unit/shared/headerApp/headerAppScreen.vue";
export default {
  components: { addressDialog, Checkbox, bottomBar, Header },
  props: ["createModel"],
  setup(props, { emit }) {
    const confirmTerms = ref(false);
    const displayAddressDialog = ref(false);
    const displayAddressOpt = ref(false);
    const model = ref({ ...props.createModel });
    const selectedAddress = ref({
      data: null,
      index: 0,
    });
    const nextStepFunc = () => {
      if (model.value.addresses.length == 0) {
        ToastService.getInstance().warning(
          i18n.global.tc("addressNotSelected")
        );
      } else if (!confirmTerms.value) {
        ToastService.getInstance().warning(
          i18n.global.tc("please_accept_terms_and_conditions")
        );
      } else {
        emit("updateStepFour", model.value);
      }
    };

    const onCreateAddress = (addressModel) => {
      model.value.addresses.push(addressModel);
      displayAddressDialog.value = false;
    };

    const onUpdateAddress = (data) => {
      model.value.addresses[selectedAddress.value.index] = data;
      displayAddressDialog.value = false;
      displayAddressOpt.value = false;
      onClose();
    };

    const onDeleteAddress = () => {
      model.value.addresses.splice(selectedAddress.value.index, 1);
      displayAddressOpt.value = false;
      onClose();
    };

    const initUpdateDialog = (data, index) => {
      displayAddressOpt.value = true;
      selectedAddress.value.data = data;
      selectedAddress.value.index = index;
    };

    const onClose = () => {
      displayAddressDialog.value = false;
      selectedAddress.value.data = null;
      selectedAddress.value.index = 0;
    };

    return {
      confirmTerms,
      displayAddressOpt,
      displayAddressDialog,
      nextStepFunc,
      onDeleteAddress,
      onUpdateAddress,
      onCreateAddress,
      model,
      initUpdateDialog,
      selectedAddress,
      onClose,
    };
  },
};
</script>

<style scoped>
p, input, Textarea, Field, button, a {
  font-size: 13px;
}

.dtn-bg {
  background-color: #579bfc;
}

:focus {
  outline: none !important;
}

.presenceBtn {
  background-color: rgb(238, 238, 238);
  color: rgb(133, 133, 133);
  border: 1px solid rgb(183, 183, 183);
}

.button-right {
  border-radius: 0px 7px 7px 0px;
}

.button-left {
  border-radius: 7px 0px 0px 7px;
}

.width33 {
  width: 33%;
}

.inputs {
  border: 1px solid rgb(183, 183, 183);
}

.btn-color {
  background-color: rgb(197, 228, 231);
}

.header {
  width: fit-content;
  top: 0%;
}

.color-custom {
  color: rgb(133, 133, 133);
}

.fit-to-content {
  width: fit-content;
}

.selected {
  background-color: rgb(255, 159, 0);
  color: black;
  text-shadow: 0px 0px black;
}

.right-0 {
  right: 3%;
  top: 2%;
  z-index: 9;
}

.bg-custom {
  border: 1px solid rgb(200, 200, 200);
  background-color: rgb(235, 235, 235);
  border-radius: 19px;
}

.text-lg {
  font-size: 18px;
}
</style>
