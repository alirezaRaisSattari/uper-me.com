<template>
  <div class="animate__animated animate__fadeIn">
    <div>
      <div
        class="
          d-flex
          p-3
          flex-column
          justify-content-center
          align-content-center
          m-2
          mt-2
          smart-text-align
          main-card
        "
      >
        <p>{{ $t("show_ware_status") }}</p>
        <div
          class="
            d-flex
            justify-content-center
            align-content-center
            button-grupe
            mx-auto
            rtl
            mb-3
          "
        >
          <button
            :class="model.isShow ? 'selected' : ''"
            class="button width45 button-right py-2 presenceBtn"
            type="button"
            @click="showProductStatusFunc(true)"
          >
            {{ $t("show_product") }}
          </button>
          <button
            :class="!model.isShow ? 'selected' : ''"
            class="button width45 py-2 presenceBtn button-left"
            type="button"
            @click="showProductStatusFunc(false)"
          >
            {{ $t("not_show_product") }}
          </button>
        </div>
        <p>{{ $t("maintenanceType") }}</p>
        <select
          v-model="model.productDetails.cargoType"
          :placeholder="$t('maintenanceType')"
          class="w-100 px-2 form-control"
        >
          <option
            v-for="type in maintenanceTypeList"
            :key="type.value"
            :value="type.value"
          >
            {{ type.title }}
          </option>
        </select>
      </div>
      <div
        class="
          d-flex
          p-3
          flex-column
          justify-content-center
          align-content-center
          m-2
          mt-4
          smart-text-align
          main-card
        "
      >
        <div class="w-100 d-flex justify-content-between">
          <p class="w-50 text-right my-auto">
            {{ $t("choose_product_folder") }}
          </p>
          <button
            class="btn rounded btn-color"
            @click="folderNameDialog = !folderNameDialog"
          >
            {{ $t("addFolder") }}
          </button>
        </div>
        <div v-if="State.allFolders != null" class="p-2 d-flex">
          <swiper
              :direction="'horizontal'"
              :free-mode="true"
              :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
              :slides-per-view="'auto'"
              :space-between="0"
              class="slider swiper-container"
          >
            <swiper-slide v-for="folder in State.allFolders" :key="folder">
              <div
                :class="
                  model.folderId == folder.folderId ? 'selected-folder' : ''
                "
                class="
                  folder
                  d-flex
                  flex-column
                  align-items-center
                  px-2
                  border-radius-10px
                  py-2
                  h-100
                  ml-2
                "
                @click="getFolderId(folder.folderId)"
              >
                <i class="far fa-folder-open mt-4" style="font-size: 35px"></i>
                <span class="mt-4 text-break text-center">{{
                  folder.name
                }}</span>
              </div>
            </swiper-slide>
          </swiper>
        </div>
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
        v-model:visible="folderNameDialog"
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
        <h5 class="header-title mt-3">{{ $t("createNewFolder") }}</h5>
        <div class="d-flex justify-content-center">
          <img
            alt=""
            class="header-shape"
            src="@/assets/img/svg/appbarShape.svg"
          />
        </div>
        <div class="p-4 pt-0 text-center">
          <input
            v-model="foldersName"
            :placeholder="$t('folder_name')"
            class="form-control"
            type="text"
          />
          <button class="btn rounded btn-color mt-4" @click="createFolder">
            {{ $t("submit") }}
          </button>
        </div>
      </Dialog>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { i18n } from "@/main";
import { ProductStatusesState } from "./ProductStatusesState";
import { getSelectedPageId } from "@/core/service/utils.service";
import { ToastService } from "@/core/service/toast.service";
import bottomBar from "@/app/public/shared/bottomBar/BottomBar.vue";
import { Swiper, SwiperSlide } from "swiper/vue";

export default {
  props: {
    model: Object,
  },
  components: { bottomBar, Swiper, SwiperSlide },
  emits: ["updateStepTwo"],
  setup(props, { emit }) {
    const State = ref(new ProductStatusesState());
    const folderNameDialog = ref(false);
    const foldersName = ref("");
    const maintenanceTypeList = ref([
      {
        title: i18n.global.tc("normal"),
        value: 1,
      },
      {
        title: i18n.global.tc("sensitive"),
        value: 2,
      },
      {
        title: i18n.global.tc("glacier"),
        value: 3,
      },
      {
        title: i18n.global.tc("hotFood"),
        value: 4,
      },
    ]);

    function showProductStatusFunc(val) {
      props.model.isShow = val;
    }

    function getFolders() {
      let model = {
        skip: 0,
        take: 100,
        workPageId: Math.abs(getSelectedPageId()),
      };
      State.value.getFolders(model);
    }

    onMounted(() => {
      getFolders();
    });

    function createFolder() {
      if (foldersName.value.length > 0) {
        let model = {
          name: foldersName.value,
          workPageId: Math.abs(getSelectedPageId()),
        };
        State.value.CreateProductFolder(model, () => {
          folderNameDialog.value = false;
          getFolders();
          ToastService.getInstance().success(
            i18n.global.tc("createSuccessful")
          );
        });
      } else ToastService.getInstance().warning(i18n.global.tc("emptyName"));
    }

    function getFolderId(id) {
      props.model.folderId = id;
    }

    function nextStepFunc() {
      if (props.model.folderId == null) {
        ToastService.getInstance().warning(i18n.global.tc("chooseFolder"));
      } else if (props.model.productDetails.cargoType == null) {
        ToastService.getInstance().warning(i18n.global.tc("chooseCargoType"));
      } else emit("updateStepFour", props.model);
    }

    return {
      State,
      maintenanceTypeList,
      folderNameDialog,
      foldersName,
      showProductStatusFunc,
      createFolder,
      getFolderId,
      nextStepFunc,
    };
  },
};
</script>

<style scoped>
div, p, span, button, input {
  font-size: 13px;
}

.swiper-slide {
  flex-shrink: 0;
  width: auto !important;
  height: 100%;
  position: relative;
  transition-property: transform;
}


.header-title {
  text-align: center;
  width: 100%;
  position: absolute;
}

.header-shape {
  width: 288px;
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

.width45 {
  width: 45%;
  font-size: 14px;
}

.main-card {
  border-radius: 8px;
  box-shadow: 0px 1px 5px #8080807d;
}

.btn-color {
  background-color: rgb(197, 228, 231);
}

.folder {
  border: 1px solid #b7b7b7;
  width: 120px;
}

.selected {
  background-color: rgb(255, 159, 0);
  color: black;
  text-shadow: 0px 0px black;
  border: none;
  outline: none !important;
}

.button-grupe {
  width: 75%;
}

@media (max-width: 510px) {
  .button-grupe {
    width: 100%;
  }
}

@media (max-width: 300px) {
  .width45 {
    font-size: 10px;
  }
}

.selected-folder {
  border: 2px solid rgb(255, 159, 0);
}
</style>
