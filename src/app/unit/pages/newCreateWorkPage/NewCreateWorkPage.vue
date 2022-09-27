<template>
  <div>
    <div class="d-flex justify-content-center align-items-center">
      <h5 class="header-title m-0 shape-text">{{ $t("addWorkPage") }}</h5>
      <img
          alt=""
          class="header-shape-page"
          src="@/assets/img/svg/frameup.svg"
      />
    </div>
    <div class="d-flex justify-content-center w-100 mt-1 fix-top">
      <swiper
          :free-mode="true"
          :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
          :space-between="0"
          class="slider"
          direction="horizontal"
          slides-per-view="auto"
      >
        <swiper-slide>
          <div class="main-list-selected">
            <div
                v-for="(item, index) of tabList"
                :key="index"
                class="main-select-page"
            >
              <div class="number-text">
                <div
                    :class="[{ 'active-select': state.step == item.id }, '']"
                    class="item-select-page"
                >
                  <span>{{ item.id }}</span>
                </div>
                <span class="d-block text-center">{{ item.text }}</span>
              </div>
              <div
                  v-if="item.id !== 6"
                  class="d-flex align-items-center space-line-select-page p-0"
              >
                <span class="line-select-page"></span>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <keep-alive>
      <MainInfoOfWorkPage
          v-if="state.step == 1"
          :model="state.model"
          @updateStepOne="upModel"
      />
    </keep-alive>
    <keep-alive>
      <SelectImagesOfWorkPage
          v-if="state.step == 2"
          :preImages="state.preImages"
          @updated="upModel"
      />
    </keep-alive>
    <keep-alive>
      <WorkPageTimes
          v-if="state.step == 3"
          :model="state.model"
          @updated="upModel"
      />
    </keep-alive>
    <keep-alive>
      <AddressOfWorkPage
          v-if="state.step == 4"
          :createModel="state.model"
          @updateStepFour="upModel"
      />
    </keep-alive>
    <keep-alive>
      <CategoryOfWorkPage
          v-if="state.step == 5"
          :model="state.model"
          @updateStepFive="upModel"
      />
    </keep-alive>
    <keep-alive>
      <SettingWorkPage v-if="state.step == 6" :model="state.model"/>
    </keep-alive>
    <Dialog
        v-model:visible="showModalCreating"
        :contentStyle="{
        background: 'rgb(255, 255, 255)',
        borderRadius: '12px',
        padding: '0px !important',
      }"
        :dismissableMask="false"
        :showHeader="false"
        header=""
        modal
    >
      <p class="text-center my-3">{{ $t("Sending") }}</p>
      <div class="progress border-radius-0px">
        <div
            aria-valuemax="100"
            aria-valuemin="0"
            aria-valuenow="100"
            class="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            style="width: 100%"
        ></div>
      </div>
      <hr class="w-100 my-1"/>
      <p class="smart-text-align p-2">
        <span v-if="state.creatingState == 1">{{ $t("uploadingImages") }}</span>
        <span v-if="state.creatingState == 2">{{
            $t("creatingFeatures")
          }}</span>
        <span v-if="state.creatingState == 3">{{
            $t("creatingWorkPage")
          }}</span>
      </p>
      <div class="d-flex w-100 justify-content-center">
        <div class="progress w-50">
          <div
              :style="{ width: state.averageUploadImagPercent + '%' }"
              aria-valuemax="100"
              aria-valuemin="0"
              aria-valuenow="100"
              class="
              progress-bar progress-bar-striped progress-bar-animated
              bg-success
            "
              role="progressbar"
          ></div>
        </div>
      </div>
      <p class="text-center my-2">{{ state.averageUploadImagPercent }} %</p>
      <p class="text-center">
        <Button :label="$t('close_alt2')" @click="showModalCreating = false" class="p-button-rounded p-button-success" />
      </p>
    </Dialog>
  </div>
</template>

<script>
import SelectImagesOfWorkPage from "./step2/SelectImagesOfWorkPage.vue";
import {NewCreateWorkPageState} from "./NewCreateWorkPageState";
import CategoryOfWorkPage from "./step5/CategoryOfWorkPage.vue";
import MainInfoOfWorkPage from "./step1/MainInfoOfWorkPage.vue";
import AddressOfWorkPage from "./step4/AddressOfWorkPage.vue";
import SettingWorkPage from "./step6/settingWorkPage.vue";
import WorkPageTimes from "./step3/WorkpageTimes.vue";
import {ref} from "vue";
import {i18n} from "../../../../main";
import {Swiper, SwiperSlide} from "swiper/vue";
import {ToastService} from "@/core/service/toast.service";
import router from "@/core/router/router";

export default {
  components: {
    SelectImagesOfWorkPage,
    CategoryOfWorkPage,
    MainInfoOfWorkPage,
    AddressOfWorkPage,
    SettingWorkPage,
    WorkPageTimes,
    Swiper, SwiperSlide
  },
  setup() {
    const state = ref(new NewCreateWorkPageState());
    const showModalCreating = ref(false);

    const tabList = ref([
      {id: 1, text: i18n.global.tc("information")},
      {id: 2, text: i18n.global.tc("photos")},
      {id: 3, text: i18n.global.tc("workTime")},
      {id: 4, text: i18n.global.tc("address")},
      {id: 5, text: i18n.global.tc("features")},
      {id: 6, text: i18n.global.tc("setting")},
    ]);

    const upModel = (e) => {
      switch (state.value.step) {
        case 1:
          state.value.model.name = e.name;
          state.value.model.bio = e.bio;
          state.value.model.username = e.username;
          state.value.model.getSellType = e.sellType;
          state.value.model.websiteUrl = e.websiteUrl;
          state.value.model.isPublic = e.isPublic;
          if (state.value.step - 1 == state.value.progressStep)
            state.value.progressStep++;
          break;
        case 2:
          state.value.preImage = e;
          if (state.value.step - 1 == state.value.progressStep)
            state.value.progressStep++;
          break;
        case 3:
          if (state.value.step - 1 == state.value.progressStep)
            state.value.progressStep++;
          break;
        case 4:
          if (state.value.step - 1 == state.value.progressStep)
            state.value.progressStep++;
          break;
        case 5:
          if (state.value.step - 1 == state.value.progressStep)
            state.value.progressStep++;
          state.value.categories = e;
          break;
      }
      if (state.value.step != 5) state.value.step++;
      else if (state.value.step == 5) {
        showModalCreating.value = true;
        state.value.createWorkPage({
          error: () => {
            // 00000000
          },
          success: () => {
            showModalCreating.value = false;
            ToastService.getInstance().success('صفحه با موفقیت ساخته شد')
            router.replace('/');
            // 00000000
          },
        });
      }
    };

    return {
      state,
      upModel,
      tabList,
      showModalCreating,
    };
  },
};
</script>

<style scoped>
.fix-top {
  max-width: 463px;
}

.swiper-container {
  width: 100%;
  padding-bottom: 5px !important;
}

.swiper-slide {
  width: auto !important;
}

.item-select-page {
  width: 40px;
  background: #ffffff;
  color: #212121;
  border-radius: 50%;
  height: 40px;
  margin-bottom: 5px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 5px;
  margin-right: 20px;
  padding: 8px 10px;
  cursor: pointer;
  transition: 0.3s;
}

.item-select-page.active-select {
  background: var(--bg-orange-color);
  color: #fff;
  box-shadow: 0 0 5px var(--bg-orange-color);
}

.main-select-page {
  font-size: 14px;
  display: flex;
}

.space-line-select-page {
  display: block;
}

.line-select-page {
  width: 35px;
  background: #a9a9a9;
  height: 3px;
  margin-bottom: 20px;
  margin-right: 5px;
}

.main-list-selected {
  display: flex;
  overflow: hidden;
  padding: 5px 0;
}

.number-text {
  width: 70px;
}

.shape-text {
  position: absolute;
  top: 10px;
  font-size: 16px;
}

.border-radius-0px {
  border-radius: 0px !important;
}

.header-title {
  text-align: center;
  width: 100%;
  position: absolute;
}

.header-shape {
  width: 288px;
}
</style>
