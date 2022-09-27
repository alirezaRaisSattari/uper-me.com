<template>
  <div class="con">
    <div class="d-flex justify-content-center align-items-center">
      <h5 class="header-title m-0 shape-text">{{ $t("offCodes") }}</h5>
      <img
        alt=""
        class="header-shape-page"
        src="@/assets/img/svg/appbarShape.svg"
      />
    </div>

    <div
      v-for="rebate in state.allRebates"
      :key="rebate"
      class="bg-light rebate smart-text-align uper-card-1"
      @click="state.selectedRebate = rebate"
    >
      <div class="d-flex">
        <div class="col-3 d-flex flex-column justify-content-center">
          <div class="d-flex justify-content-center">
            <p class="usedNumber m-0">{{ rebate.usedCount }}</p>
            <span class="usedNumberLine"></span>
          </div>
          <span class="text-center mx-auto">{{ $t("reuse") }}</span>
        </div>

        <div class="col-6">
          <span>{{ $t("name") }} : {{ rebate.title }}</span>
          <div class="d-flex mt-3 mb-2">
            <p class="off m-0 mt-1 px-3 py-0 text-light">
              {{ rebate.percent }} %
            </p>
            <p class="m-0 mr-2 mt-1">
              {{ $t("expireDays") }} :
              {{ DateService.getInstance().convertToJalali(rebate.expireddAt) }}
            </p>
          </div>
        </div>
        <div class="mr-5">
          <div @click="state.showDotsDialog = true">
            <i
              class="fas fa-ellipsis-v p-1 mr-5 mt-1 hover-pointer"
              style="font-size: 18px"
            ></i>
          </div>
          <p
            class="m-0 text-danger mt-2"
            v-if="
              DateService.getInstance().timeDifference(rebate.expireddAt) !==
              'نامعتبر'
            "
          >
            {{ $t("expired") }}
          </p>
          <a class="mt-2 hover-pointer" @click="copyCode(rebate.code)" v-else>{{
            $t("copy")
          }}</a>
        </div>
      </div>
    </div>
    <Dialog
      v-model:visible="state.showDotsDialog"
      :style="{ width: '30vw' }"
      class="edit-discount-dialog"
      dismissableMask
      modal
      style="width: 510px; height: auto"
    >
      <div class="d-flex flex-column">
        <div class="hover-pointer" v-for="(i, index) in itemList" :key="i">
          <div class="d-flex py-1" @click="updateRebate(index)">
            <i :class="i.class" class="mt-1 mx-2"></i>
            <p>{{ i.title }}</p>
          </div>
        </div>
      </div>
    </Dialog>

    <confirmDialog
      :header="$t('deleteReplyConfirmHeader')"
      :icon="'fa fa-exclamation-triangle'"
      :text="$t('deleteReplyConfirmBody')"
      :visible="showDeleteConfirm"
      @accept="deleteRebate"
      @reject="showDeleteConfirm = false"
      @times="showDeleteConfirm = false"
    />
  </div>
  <div
    class="float-btn hover-pointer d-flex justify-content-center"
    @click="createRebateCode"
  >
    <i class="my-auto fa fa-plus"></i>
  </div>
  <div class="has-fixed-footer"></div>
</template>

<script>
import { mainRebateCodeState } from "./mainRebateCodeState.ts";
import { DateService } from "@/core/service/date.service";
import router from "@/core/router/router";
import { ref, onMounted } from "vue";

import confirmDialog from "@/app/public/shared/confirmDialog/ConfirmDialog.vue";
import { i18n } from "@/main";
import { useRoute } from "vue-router";
import { ToastService } from "@/core/service/toast.service";

export default {
  name: "mainRebateCode",
  components: { confirmDialog },
  setup() {
    const state = ref(new mainRebateCodeState());
    const showDeleteConfirm = ref(false);
    const itemList = ref([
      {
        title: i18n.global.tc("edit"),
        function: (item) => {
          state.value.selectedRebate = item;
        },
        class: "fa fa-pen",
        rout: ``,
      },
      {
        title: i18n.global.tc("delete"),
        function: null,
        class: "fa fa-trash",
        rout: "/rebate-code",
      },
    ]);

    function updateRebate(index) {
      if (index == 0) {
        router.push(
          `/update-rebate-code/${state.value.selectedRebate.workPageId}/${state.value.selectedRebate.code}`
        );
      } else if (index == 1) {
        showDeleteConfirm.value = true;
      }
    }
    

    function deleteRebate() {
      state.value.deleteRebate();
      let deletedIndex = state.value.allRebates.findIndex((e) => {
        return e.code == state.value.selectedRebate.code;
      });
      state.value.allRebates.splice(deletedIndex, deletedIndex + 1);
      showDeleteConfirm.value = false;
      state.value.showDotsDialog = false;
    }

    function createRebateCode() {
      router.push("/create-rebate-code");
    }

    onMounted(() => {
      state.value.getAllRebates();
    });

    function copyCode(code) {
      navigator.clipboard.writeText(code);
      ToastService.getInstance().success(i18n.global.tc("textCopied"));
    }
    return {
      state,
      DateService,
      itemList,
      updateRebate,
      copyCode,
      showDeleteConfirm,
      deleteRebate,
      createRebateCode,
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

.rebate a {
  border-bottom: 3px solid #007bff;
  color: #007bff;
  margin-bottom: 11px;
}

.rebate a:hover {
  border-bottom: 3px solid #007bff;
  color: #007bff;
  margin-bottom: 11px;
}

.off {
  background-color: red;
  padding-inline: 4px;
  padding-block: 3px;
  padding-top: 3px;
  border-radius: 5px;
  height: 60%;
}

.usedNumber {
  font-size: 20px;
  padding-left: 5px;
  padding-right: 5px;
  width: fit-content;
}
.usedNumberLine {
  border-left: 2px solid #007bff;
  font-size: 20px;
  background: #007bff;
  width: 2px;
  height: 15px;
  margin-top: 7px;
}

.rebate {
  margin-block: 20px;
  font-size: 13px;
  padding-top: 6px;
  width: 95%;
  box-shadow: 0 0px 3px 4px #dfdfdf96;
  border-radius: 7px;
  margin-inline: auto;
  padding-inline: 11px;
}

.uper-card-1:hover {
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25), 0 3px 5px rgba(0, 0, 0, 0.18);
  border-radius: 8px;
}

.shape-text {
  position: absolute;
  top: 10px;
  font-size: 14px;
}

.con {
  position: relative;
}

.addRebate-btn-workPage {
  border-radius: 50%;
  border: none !important;
  width: 57px;
  height: 57px;
  padding-block: 18px;
  background-color: rgb(255, 159, 0) !important;
  cursor: pointer !important;
  position: fixed;
  left: 126px;
  bottom: 85px;
}

@media only screen and (min-width: 786px) {
  .addRebate-btn-workPage {
    border-radius: 50%;
    border: none !important;
    width: 57px;
    height: 57px;
    padding-block: 18px;
    background-color: rgb(255, 159, 0) !important;
    cursor: pointer !important;
    position: fixed;
    left: 300px;
    bottom: 85px;
  }
}

@media only screen and (min-width: 1200px) {
  .addRebate-btn-workPage {
    border-radius: 50%;
    border: none !important;
    width: 57px;
    height: 57px;
    padding-block: 18px;
    background-color: rgb(255, 159, 0) !important;
    cursor: pointer !important;
    position: fixed;
    left: 350px;
    bottom: 20px;
  }
}

@media only screen and (min-width: 1400px) {
  .addRebate-btn-workPage {
    border-radius: 50%;
    border: none !important;
    width: 57px;
    height: 57px;
    padding-block: 18px;
    background-color: rgb(255, 159, 0) !important;
    cursor: pointer !important;
    position: fixed;
    left: 510px;
    bottom: 20px;
  }
}
</style>
