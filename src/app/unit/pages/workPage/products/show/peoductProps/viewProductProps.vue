<template>
  <div class="py-4">
    <div class="header-product-props">
      <svg
        height="46.5"
        viewBox="0 0 246.667 46.5"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs></defs>
        <path
          id="Path_2"
          class="bg"
          d="M345.333,201.167l-246.667-.5,7.507,5,7.827,6L118.333,218,122,224l6.667,10.5L134,239.833l7.333,4.333,9.667,3H296.667l7.5-1.583,4.333-1.417,8.5-6.333,1.667-2,4.667-6.5L328,218l4-5.167,4.667-4.333L341,204.167Z"
          data-name="Path 2"
          transform="translate(-98.667 -200.667)"
        />
      </svg>
      <div class="title">{{ $t("mainAccountType") }}</div>
    </div>
    <ConfirmDialog></ConfirmDialog>

    <loading v-if="State.loadingProps" />
    <div v-if="State.allProps === null" class="mt-5">
      <div class="d-flex justify-content-center mt-5">
        <i class="fas fa-box-open fa-6x mt-5"></i>
      </div>
      <p class="text-center mt-5">{{ $t("emptyFolderList") }}</p>
    </div>
    <div v-else class="d-flex flex-column mt-5 px-4 mr-2">
      <div v-for="prop in State.allProps.res" :key="prop">
        <SecondSliderItem
          :item="prop"
          :workPageDetailes="State.allProps.workPageDetails"
          @deleteSecondSliderItem="(event) => confirmDelete(event)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import { propsState } from "./viewProductPropsState";
import SecondSliderItem from "@/app/unit/shared/items/secondSliderItem/secondSliderItemScreen.vue";
import {
  getSelectedPageId,
  windowScrolledToBottom,
} from "@/core/service/utils.service";
import { useRoute } from "vue-router";
import { BASE_TAKE } from "@/core/constant/constant";
import { useConfirm } from "primevue/useconfirm";
import { i18n } from "@/main";
import ConfirmDialog from "primevue/confirmdialog";

export default {
  components: {
    ConfirmDialog,
    SecondSliderItem,
  },
  setup(prop, { emit }) {
    const route = useRoute();
    const workpageId = ref(route.params.workpageId);
    const productId = ref(route.params.productId);
    const productType = ref(route.params.productType);
    const State = ref(new propsState());
    const confirm = useConfirm();

    function GetProductProps() {
      let model = {
        skip: 0,
        take: BASE_TAKE,
        myPageId: Math.abs(getSelectedPageId()),
        workpageId: Number(workpageId.value),
        productId: Number(productId.value),
        productType: Number(productType.value),
        requestTime: new Date(),
      };
      State.value.GetProductProps(model);
    }

    onMounted(() => {
      GetProductProps();
      windowScrolledToBottom(() => {
        GetProductProps();
      });
    });
    //todo: in check beshe
    const confirmDelete = (data) => {
      confirm.require({
        message: i18n.global.tc("deleteItemQuestion"),
        // header: i18n.global.tc("removeItem"),
        icon: "pi pi-info-circle m-2",
        acceptClass: "p-button-danger",
        acceptLabel: i18n.global.tc("yes"),
        rejectLabel: i18n.global.tc("no"),
        accept: () => {
          State.value.deleteProp(data.data.workPageId, data.data.propId, () => {
            let list = [];
            for (let i = 0; i < State.value.allProps.res.length; i++) {
              const item = State.value.allProps.res[i];
              if (item.propId !== data.data.propId) {
                list.push(item);
              }
            }
            State.value.allProps.res = list;
          });
        },
      });
    };

    return {
      State,
      productType,
      confirmDelete,
    };
  },
};
</script>

<style lang="scss">
.header-product-props {
  display: flex;
  width: 100%;
  position: fixed;
  left: 0%;
  top: 0;
  z-index: 10;

  .bg {
    fill: #fadadd;
  }

  .title {
    position: absolute;
    top: 10px;
    width: 100%;
    text-align: center;
  }
}
</style>
