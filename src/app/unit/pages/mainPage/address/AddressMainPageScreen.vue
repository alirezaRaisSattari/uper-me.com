<template>
  <div class="d-flex flex-column justify-content-center align-items-center">
    <img alt="app-bar" class="svg-img" src="@/assets/img/appbarShape1.svg" />
    <p class="m-0 position-absolute">{{ $t("addressList") }}</p>
  </div>
  <div v-if="objAddressMainPageState.listAddress !== null">
    <div
      v-for="(item, index) of objAddressMainPageState.listAddress"
      :key="index"
      class="
        d-flex
        flex-column
        justify-content-center
        bg-white
        uper-card-1
        p-2
        my-2
      "
    >
      <div class="d-flex justify-content-between">
        <div class="d-flex justify-content-center">
          <div
            class="
              p-1
              px-2
              bg-lightblue
              border-radius-10px
              d-flex
              flex-column
              my-auto
              ml-2
              justify-content-center
              hover-pointer
            "
            @click="showMapFunc(item.lat, item.lan)"
          >
            <img
              class="map-svg mx-auto"
              src="@/assets/img/svg/pageAddressMarker.svg"
              alt=""
            />
            <p class="text-light text-sm-cus my-0 mx-auto">
              {{ $t("showOnMap") }}
            </p>
          </div>
          <div class="d-flex flex-column justify-content-center my-auto">
            <p class="my-auto">{{ item.title }}</p>
            <p class="text-muted my-auto">{{ item.title }}</p>
          </div>
        </div>
        <i
          class="fas fa-ellipsis-v hover-pointer"
          @click="showDialog(item.addressId, index)"
        ></i>
      </div>
      <hr />
      <div class="d-flex flex-column justify-content-center align-items-center">
        <div class="align-self-start d-flex justify-content-start">
          <p class="text-muted mx-1">{{ $t("address") }} :</p>
          <p>{{ item.address }}</p>
        </div>
        <div v-if="item.phones.length !== 0" class="container-fluid row">
          <div
            v-for="phone of item.phones"
            class="
              d-flex
              justify-content-center
              align-items-center
              rounded-pill
              border
              p-2
              m-1
            "
            :key="phone"
          >
            <p class="m-1">{{ phone.number }}</p>
            <i class="fas fa-phone-alt m-1"></i>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    class="float-btn hover-pointer d-flex justify-content-center"
    @click="router.push('/addAddressGlobal')"
  >
    <i class="my-auto fa fa-plus"></i>
  </div>

  <Dialog
    v-model:visible="showMap"
    :breakpoints="{
      '1400px': '484px',
      '950': '484px',
      '510px': '320px',
    }"
    :dismissableMask="true"
    :modal="true"
  >
    <MapPointer :latLan="[[latStore, lanStore]]" :locationName="getInfo" />
  </Dialog>
  <Dialog
    v-model:visible="show"
    :breakpoints="{ '1400px': '50vw', '950': '70vw', '500px': '90vw' }"
    :dismissableMask="true"
    :modal="true"
  >
    <div class="d-flex flex-column justify-content-center">
      <div
        v-for="item of menu"
        class="
          d-flex
          justify-content-between
          hover-pointer hover-bg-primary
          p-2
        "
        @click="itemMenu(item.id)"
        :key="item"
      >
        <p class="my-2">{{ item.name }}</p>
        <Button
          :class="[item.id === 1 ? 'p-button-warning' : 'p-button-danger']"
          :icon="item.icon"
          class="p-button-raised p-button-rounded p-button-outlined"
        />
      </div>
    </div>
  </Dialog>

  <Dialog
    v-model:visible="showCreateAddress"
    :breakpoints="{ '1400px': '50vw', '950': '70vw', '500px': '90vw' }"
    :dismissableMask="true"
    :header="$t('addAddress')"
    :modal="true"
  >
    <CreateAddressMainPageScreen
      :values="{
        model: statusComponents,
        item: itemAddress,
      }"
      @passData="(response) => getInfo(response)"
    />
  </Dialog>
  <div class="has-fixed-footer"></div>
</template>

<script>
import { onMounted, ref } from "vue";
import { i18n } from "../../../../../main";
import CreateAddressMainPageScreen from "./createAddress/CreateAddressMainPageScreen";
import { AddressMainPageState } from "./AddressMainPageState";
import MapPointer from "@/app/public/shared/map/mapPointer.vue";
import router from "@/core/router/router";
export default {
  name: "AddressMainPageScreen",
  components: { CreateAddressMainPageScreen, MapPointer },
  setup() {
    const showMap = ref(false);
    const show = ref(false);
    const showCreateAddress = ref(false);
    const objAddressMainPageState = ref(new AddressMainPageState());
    const refCreateAddress = ref();
    const latStore = ref(0);
    const lanStore = ref(0);
    const deleteItem = ref({
      addressId: 0,
      index: 0,
    });
    const menu = ref([
      { id: 1, icon: "fas fa-edit", name: i18n.global.tc("edit") },
      { id: 2, icon: "fas fa-trash", name: i18n.global.tc("delete") },
    ]);
    const statusComponents = ref();
    const indexListAddress = ref();
    const itemAddress = ref({});
    onMounted(() => {
      objAddressMainPageState.value.getAddressFavorite();
    });

    function showDialog(id, index) {
      indexListAddress.value = index;
      deleteItem.value = {
        addressId: id,
        index: index,
      };
      show.value = true;
    }

    function itemMenu(id) {
      show.value = false;
      if (id === 1) {
        showCreateAddress.value = true;
        statusComponents.value = false;
        itemAddress.value = objAddressMainPageState.value.listAddress.find(
          (i) => i.addressId === deleteItem.value.addressId
        );
      } else {
        objAddressMainPageState.value.deleteItem(deleteItem.value);
      }
    }

    function showCreate() {
      showCreateAddress.value = true;
      statusComponents.value = true;
    }

    function getInfo(item) {
      if (statusComponents.value === true) {
        showCreateAddress.value = item.show;
        objAddressMainPageState.value.listAddress.push(item.response);
      } else {
        objAddressMainPageState.value.listAddress.forEach((i) => {
          if (i.addressId === item.response.addressId) {
            objAddressMainPageState.value.listAddress[indexListAddress.value] =
              item.response;
          }
        });
        showCreateAddress.value = item.show;
      }
    }

    const showMapFunc = (Lat, Lan) => {
      latStore.value = Lat;
      lanStore.value = Lan;
      showMap.value = true;
    };

    return {
      router,
      show,
      menu,
      showMap,
      showCreateAddress,
      objAddressMainPageState,
      refCreateAddress,
      statusComponents,
      itemAddress,
      latStore,
      lanStore,
      showMapFunc,
      showCreate,
      showDialog,
      itemMenu,
      getInfo,
    };
  },
};
</script>

<style lang="scss" scoped>
.box-number-mobil {
  border: 1px solid lightgray;
  background-color: darkgrey;
  padding: 10px;
}

.bg-lightblue {
  background-color: #43a9b5;
  height: fit-content;
  width: fit-content;
}

.map-svg {
  width: 55px;
}

.text-sm-cus {
  font-size: 9px;
}
</style>
