<template>
  <div class="py-4">
    <Dialog v-model:visible="state.addressDialog"
            :contentStyle="{background: 'rgb(255, 255, 255)',width:'400px',borderRadius: '8px','-ms-overflow-style':'none', 'scrollbar-width':'none'}"
            :dismissableMask="true"
            :showHeader="false" :style="{ margin: '0', border: 'none' }" modal>
      <div class="w-100 p-3">
        <SelectLocationOnMap :callback="getMap" style="width: 100%;height: 500px"/>
      </div>
    </Dialog>
    <ConfirmDialog></ConfirmDialog>
    <Header :title="$t('updateProduct')"/>
    <ProductUpdateFolder v-if="state.product && state.folders" :folders="state.folders"
      :selectedFolder="state.product.result.folderId"
      @addFolder="state.getAllFolders()"
      @changeFolder="(folderId) => state.product.result.folderId = folderId"/>
    <template v-if="state.product">
      <div class="form-body">
        <div class="child smart-text-align">
          <span>{{ $t('show_ware_status') }}</span>
          <div class="options">
            <Button v-for="item in state.options.show" :key="item"
                    :class="item.value === state.product.result.isShow ? 'selected':'un-selected'"
                    :label="item.name"
                    @click="state.product.result.isShow = item.value"/>
          </div>
        </div>
        <div class="child smart-text-align">
          <span>{{ $t('sellTypee') }}</span>
          <div class="options">
            <Button v-for="item in state.options.sellType" :key="item"
                    :class="item.value === state.product.result.sellType ? 'selected':'un-selected'"
                    :label="item.name"
                    @click="state.product.result.sellType = item.value"/>
          </div>
        </div>
        <div class="child">
          <div class="p-inputgroup smart-text-align">
            <InputText v-model="state.product.result.privateBarcode" :placeholder="$t('privateBarcode')"/>
            <span class="p-inputgroup-addon">
                <i class="fas fa-qrcode"></i>
            </span>
          </div>
        </div>
      </div>
      <div class="form-footer smart-text-align">
        <span>{{ $t('available_product_address') }}</span>
        <span>{{
            `${state.product.productArea.countryName} , ${state.product.productArea.cityName} , ${state.product.productArea.areaName}`
          }}</span>
        <div class="reverse-smart-text-align d-flex reverse-justify-content">
          <Button :label="`${$t('selectAddress')} ${$t('new')}`" class="p-button-raised p-button-plain"
                  @click="state.addressDialog = true"/>
        </div>
      </div>
    </template>
    <Submit @onSubmit="(event) => state.onUpdate()"/>
  </div>
</template>

<script lang="ts">
import Header from '@/app/unit/shared/headerApp/headerAppScreen.vue';
import Submit from '@/app/unit/shared/footerApp/footerAppScreen.vue';
import ProductUpdateFolder from '@/app/unit/shared/folderSwiper/foldersSwiperScreen.vue';
import {updateProductState} from "./updateProductState";
import {onMounted, ref} from "vue";
import SelectLocationOnMap from "@/app/public/shared/mapComponent/SelectLocationOnMap.vue";

export default {
  components: {
    Header,
    Submit,
    ProductUpdateFolder,
    SelectLocationOnMap
  },
  setup() {
    const state = ref(new updateProductState());
    onMounted(() => {
      state.value.getProductInfo();
      state.value.getAllFolders();
    });

    function getMap(item) {
      state.value.getLocationByLatLon(item);
    }

    return {
      state,
      getMap
    }
  }
}
</script>

<style lang="scss" scoped>
.form-body {
  margin: 15px 0;
  padding: 10px;
  box-shadow: 0 0 5px #b5b5b5;
  border-radius: 8px;
  display: flex;
  flex-direction: column;

  .child {
    padding: 10px;

    .options {
      padding: 15px 10px;
      display: flex;
      justify-content: center;
      align-items: center;

      button {
        border: 1px solid #b5b5b5;
        color: #212121;
        font-size: 14px;
        padding: 12px 20px;
        box-shadow: none !important;
        border-radius: 0;

        &:first-child {
          border-top-right-radius: 8px;
          border-bottom-right-radius: 8px;
        }

        &:last-child {
          border-top-left-radius: 8px;
          border-bottom-left-radius: 8px;
        }
      }

      .selected {
        background: #ff9f00;

      }

      .un-selected {
        background: #eeeeee;
        color: #9c9c9c;
      }
    }

    .p-inputgroup {
      border: 1px solid #b5b5b5;
      border-radius: 8px;
      overflow: hidden;

      input {
        padding: 15px 10px !important;
        font-size: 14px;
      }
    }
  }
}

.form-footer {
  margin: 15px 0 80px;
  padding: 10px;
  box-shadow: 0 0 5px #b5b5b5;
  border-radius: 8px;
  display: flex;
  flex-direction: column;

  button {
    background: #c3e5e7;
    color: #212121 !important;
    border: none;
    font-size: 14px;
    padding: 10px 20px;

    &:hover {
      background: #C3E5E796;
    }
  }
}

::v-deep(.p-inputgroup > .p-component + .p-inputgroup-addon, .p-inputgroup > .p-inputwrapper > .p-inputtext + .p-inputgroup-addon, .p-inputgroup > .p-float-label > .p-component + .p-inputgroup-addon) {
  background: transparent;
  border: none;
  border-right: 1px solid #b5b5b5;
  border-radius: 0;
  color: #099bb2;
  font-size: 25px;
}
</style>
