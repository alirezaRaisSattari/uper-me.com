<template>
  <confirmDialog
      :header="$t('delete')"
      :icon="'fas fa-trash'"
      :status="'danger'"
      :text="$t('sureDeleteAddress')"
      :visible="openConfirmDialog"
      @accept="deleteAddresss"
      @reject="openConfirmDialog = false"
      @times="openConfirmDialog = false"
  />
  <div>
    <h6 class="header-title mt-3">{{ $t("shoppingAddressList") }}</h6>
    <div class="d-flex justify-content-center">
      <img alt="" class="header-shape" src="@/assets/img/svg/appbarShape.svg"/>
    </div>

    <loading v-if="State.loadingAddress"></loading>
    <div v-if="State.isNull" class="mt-5">
      <div class="d-flex justify-content-center mt-5">
        <i class="fas fa-box-open fa-6x mt-5"></i>
      </div>
      <p class="text-center mt-5">{{ $t("emptyFolderList") }}</p>
    </div>
    <div v-if="State.allAddress.length != 0" class="d-flex flex-column p-2">
      <div
          v-for="(address, index) in State.allAddress"
          :key="index"
          class="uper-card-1 d-flex flex-column smart-text-align p-1 my-2"
      >
        <div class="w-100 d-flex">
          <button class="btn open-map rounded text-light p-2 text-sm">
          </button>
          <div class="mx-1 w-85">
            <p class="w-100 d-flex justify-content-between py-1 m-0">
              <span>{{ address.title }}</span>
              <i
                  class="fa fa-ellipsis-v"
                  @click="openDetailes(address.addressId, index)"
              ></i>
            </p>
            <span class="m-0 text-sm smart-text-align text-muted"
            >{{ address.area.countryName }},{{ address.area.provinceName }},{{
                address.area.cityName
              }},{{ address.area.areaName }}</span
            >
          </div>
        </div>
        <hr/>
        <div class="d-flex-flex-column">
          <p class="w-100">{{ $t("address") }} : {{ address.address }}</p>
          <div class="w-100 d-flex">
            <p
                v-for="phone in address.phones"
                :key="phone"
                class="phone-card px-2 mx-2 rounded text-sm text-secondary"
            >
              <span class="mx-1">{{ phone.number }}</span
              ><i class="fas fa-phone"></i>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="new-ticket position-fixed mt-5">
      <router-link to="/create-address">
        <button
            class="
            btn
            rounded-circle
            px-3
            text-light
            bg-success
            align-items-center
            justify-content-center
            ml-4
            uper-card-1
            float-btn
          "
            style="font-size: 25px"
        >
          +
        </button>
      </router-link>
    </div>
    <Dialog
        v-model:visible="detailes"
        :breakpoints="{
        '1000px': '52vw',
        '800px': '65vw',
        '600px': '91vw',
      }"
        :contentStyle="{ background: 'rgb(255, 255, 255)'}"
        :showHeader="false"
        :style="{}"
        dismissableMask
        header=""
        modal
    >
      <div class="p-3">
        <div
            class="w-100 smart-text-align my-3 hover-pointer"
            @click="
            () => {
              displayEditModal = !displayEditModal;
              detailes = false;
            }
          "
        >
          {{ $t("update") }}
        </div>
        <div
            class="w-100 smart-text-align my-3 hover-pointer"
            @click="
            () => {
              detailes = false;
              openConfirmDialog = !openConfirmDialog;
            }
          "
        >
          {{ $t("delete") }}
        </div>
      </div>
    </Dialog>
    <Dialog
        v-model:visible="displayEditModal"
        :breakpoints="{
        '2800px': '65vw',
        '1280px': '65vw',
        '1000px': '65vw',
        '800px': '65vw',
        '600px': '91vw',
      }"
        :contentStyle="{
        background: 'rgb(255, 255, 255)',
        borderRadius: '12px',
      }"
        :showHeader="false"
        :style="{ border: 'none' }"
        dismissableMask
        header=""
        modal
    >
      <editAddress
          :selectedAddress="State.allAddress[addressIndex]"
          @close="displayEditModal = false"
      ></editAddress>
    </Dialog>
  </div>
</template>

<script>
import {ref, onMounted} from "vue";
import {AddressListState} from "./getAddressList";
import {BASE_TAKE} from "@/core/constant/constant";
import {
  getSelectedPageId,
  windowScrolledToBottom,
} from "@/core/service/utils.service";
import confirmDialog from "@/app/public/shared/confirmDialog/ConfirmDialog.vue";
import {ToastService} from "@/core/service/toast.service";
import {i18n} from "@/main";
import editAddress from "./editWorkePageAddress.vue";

export default {
  components: {confirmDialog, editAddress},
  setup() {
    const State = ref(new AddressListState());
    const detailes = ref(false);
    const addressId = ref();
    const openConfirmDialog = ref(false);
    const addressIndex = ref();
    const displayEditModal = ref(false);

    function getAllAdress() {
      let model = {
        skip: 0,
        take: BASE_TAKE,
        pageId: getSelectedPageId(),
      };
      State.value.getAddress(model);
    }

    onMounted(() => {
      getAllAdress();
      windowScrolledToBottom(() => {
        State.value.reftreshList = false;
        getAllAdress();
      });
    });

    function openDetailes(id, index) {
      addressIndex.value = index;
      addressId.value = id;
      detailes.value = !detailes.value;
    }

    function deleteAddresss() {
      State.value.deleteAddressFavorite(addressId.value, () => {
        openConfirmDialog.value = false;
        ToastService.getInstance().success(
            i18n.global.tc("deleteAddressSuccessful")
        );
        State.value.loadingAddress = false;
        State.value.addressIsFinished = false;
        getAllAdress();
      });
    }

    return {
      State,
      detailes,
      addressId,
      openDetailes,
      openConfirmDialog,
      deleteAddresss,
      addressIndex,
      displayEditModal,
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

.open-map {
  background: #43a8b6;
  width: 16%;
}

.w-85 {
  width: 84%;
}

.phone-card {
  background: #f8f7f2;
  border: 2px solid #d7d6d4;
}
</style>
