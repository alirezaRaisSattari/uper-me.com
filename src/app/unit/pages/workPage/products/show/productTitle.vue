<template>
  <Dialog
    v-model:visible="displayDialog"
    :contentStyle="{ 'border-radius': '10px' }"
    :modal="true"
    :showHeader="false"
    :style="{ 'max-width': '500px' }"
    dismissableMask
  >
    <div class="main-product-title-menu">
      <div
        v-for="item in menu"
        :key="item"
        v-ripple
        class="item-menu p-ripple"
        @click="item.clickEvent"
      >
        <Dialog
          v-model:visible="displayReport"
          :contentStyle="{ borderRadius: '7px' }"
          :dismissableMask="true"
          :header="false"
          :modal="true"
          :showHeader="false"
          style="width: 18rem; border-radius: 15px !important"
        >
          <Report
            :userData="userData"
            @closeReportModal="displayReport = false"
            :itemId="pageId"
            :itemType="reportTypeItem"
          />
        </Dialog>
        <i :class="item.icon" class="smart-text-align"></i>
        <span class="smart-text-align">{{ item.label }}</span>
      </div>
    </div>
  </Dialog>
  <div class="row justify-content-between align-items-center p-0 m-0">
    <img
      v-lazy="data['src']"
      alt="product-image-profile"
      class="rounded-circle img-fluid product-image-profile"
    />
    <p class="col-8 smart-text-align text-one-line">
      {{ data["persianName"] }}
    </p>
    <i
      :class=" isbookmarked ? ' fas fa-bookmark ' : 'far fa-bookmark' "
      @click="data['bookMarkCallBack']"
    ></i>
    <i
      class="col-1 fas fa-ellipsis-v text-center"
      @click="!displayDialog ? (displayDialog = true) : ''"
    ></i>
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import { i18n } from "@/main";
import Ripple from "primevue/ripple";
import { useRoute } from "vue-router";
import router from "@/core/router/router";
import { getSelectedPageId } from "@/core/service/utils.service";
import Report from "@/app/public/shared/report/report.vue";
import {ProductStatus, reportType} from "@/core/enum/enums";

export default {
  components: { Report },
  directives: {
    ripple: Ripple,
  },
  props: {
    persianName: String,
    src: String,
    bookMarkCallBack: Function,
    optionsCallBack: Function,
    product: Object,
    isbookmarked : Boolean,
  },
  setup: function (props) {
    const pageId = ref(getSelectedPageId());
    const reportTypeItem = ref(reportType.Page);
    const displayReport = ref(false);
    const displayDialog = ref(false);
    const route = ref(useRoute());
    const isMine = props.product.workPageId == -getSelectedPageId();
    const menu = ref([
      {
        icon: "far fa-edit",
        check: () => isMine && !props.product.immediateExpireDate && props.product.productStatus != ProductStatus.Deleted,
        label: i18n.global.tc("Edit_product"),
        clickEvent() {
          router.push(`/edit-product/${route.value.params.productId}`);
        },
      },
      {
        icon: "fas fa-stopwatch",
        check: () => isMine && !props.product.immediateExpireDate&& props.product.productStatus != ProductStatus.Deleted,
        label: i18n.global.tc("addImmediateTag"),
        clickEvent() {
          router.push(
            `/immediate/${props.product.categoryId}/${route.value.params.productId}`
          );
        },
      },
      {
        icon: "fas fa-chalkboard-teacher",
        check: () => isMine && !props.product.immediateExpireDate&& props.product.productStatus != ProductStatus.Deleted,
        label: i18n.global.tc("UpgradeTheProductToOccasion"),
        clickEvent() {
          router.push(
            `/upgradeProduct/${route.value.params.productId}?pId=${route.value.params.productId}`
          );
        },
      },
      {
        icon: "fas fa-swimming-pool",
        check: () => isMine && !props.product.immediateExpireDate&& props.product.productStatus != ProductStatus.Deleted,
        label: i18n.global.tc("ladderProduct"),
        clickEvent() {
          router.push(
            `/product/ladderProduct?pId=${route.value.params.productId}&catId=${props.product.categoryId}&countryId=${props.product.countryId}`
          );
        },
      },
      {
        icon: "fas fa-swimming-pool",
        check: () => isMine && props.product.productStatus == ProductStatus.Deleted,
        label: i18n.global.tc("restore"),
        clickEvent() {
          // TODO Restore Product
        },
      },
      {
        icon: "far fa-flag",
        check: () => props.product.productStatus != ProductStatus.Deleted&& props.product.productStatus != ProductStatus.Reported,
        label: i18n.global.tc("report"),
        clickEvent: () => {
          displayReport.value = true;
        },
      },
    ]);
    onMounted(() => {
      menu.value = menu.value.filter((m) => m.check());
      props.bookMarkCallBack
    });

    const data = ref({
      persianName: props.persianName,
      src: props.src,
      bookMarkCallBack: props.bookMarkCallBack,


      optionsCallBack: props.optionsCallBack,
    });

    const goTo = (path) => {
      router.push(path);
    };

    return {
      pageId,
      displayReport,
      data,
      reportTypeItem,
      displayDialog,
      menu,
      goTo,
    };
  },
};
</script>
<style lang="scss" scoped>
.product-image-profile {
  width: 48px;
  height: 48px;
  border: 2px solid #707070;
}

p {
  padding: 0;
  margin: 0;
  font-size: 14px;
}

i {
  font-size: 16px;
  cursor: pointer;
  padding: 0;
  margin: 0;
}

.main-product-title-menu {
  display: flex;
  flex-direction: column;
  padding: 10px 20px;

  .item-menu {
    display: flex;
    flex-direction: row;
    padding: 10px 0;
    cursor: pointer;

    i {
      flex: 5%;
      align-items: flex-end;
      font-size: 20px;
      position: relative;
      top: 2px;
    }

    span {
      flex: 95%;
      align-items: flex-end;
      margin: 0 15px;
    }
  }
}
</style>
