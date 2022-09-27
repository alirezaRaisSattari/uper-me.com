<template>
  <div class="report-bar">
    <div class="bar-content">
      <input
        type="text"
        v-model="inputVal"
        :placeholder="$t('description')"
        class="input-bar"
        id="input"
      />
      <div class="bottom-bar">
        <swiper
          class="slider"
          :direction="'horizontal'"
          :free-mode="true"
          :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
          :slides-per-view="'auto'"
          :space-between="15"
        >
          <swiper-slide v-for="data in state.swiperData" :key="data">
            <button
              class="
                btn btn-light
                submit-button
                header-shadow
                btn-size btn-size2
              "
              @click="testValue(data.label)"
            >
              {{ data.label }}
            </button>
          </swiper-slide>
        </swiper>
      </div>
      <div
        class="
          w-100
          d-flex
          justify-content-start
          mt-3
          h-auto
          align-items-center
        "
        style="direction: rtl"
      >
        <div
          v-if="otherPhotoList.length == 0"
          class="
            add-pic
            d-flex
            align-items-center
            justify-content-center
            p-2
            w-25
            mt-3
            mx-2
            hover-pointer
            size-item
            p-button-raised p-button-secondary
            btn btn-light
            submit-button
            header-shadow
            color-report
            m-t
            no-shadow
          "
        >
          <span class="text-center my-auto hover-pointer">
            {{ $t("addmainphotos") }}
          </span>
          <input
            accept="image/*"
            class="w-100 h-100 hidden hover-pointer"
            type="file"
            @change="onFileChange($event)"
          />
        </div>
        <div v-for="item in otherPhotoList" :key="item" class="w-50 mx-auto">
          <ratio :ratio="'1/1'" class="my-auto">
            <img
              v-lazy="item" alt=""
              class="w-100 h-100 rounded main-image m-auto"
            />
          </ratio>
        </div>
      </div>
      <div class="bottom-bar-2">
        <Button
          :class="state.loading ? 'p-disabled' : ''"
          @click="reportApi()"
          :label="$t('submit')"
          class="
            size-item
            p-button-raised p-button-secondary
            btn btn-light
            submit-button
            header-shadow
            color-report
            m-t
            no-shadow
            sub-b
          "
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { reportMainPageState } from "./reportMainPage";
import ratio from "@/app/public/shared/ratio/ratio.vue";
import { ref } from "@vue/reactivity";
import { i18n } from "@/main";
import {
  convertFileTOBase64,
  getSelectedPageId,
} from "@/core/service/utils.service";
import { reportType } from "@/core/enum/enums";
import {
  FileUploaderService,
  ImageUploaderKeys,
} from "@/core/service/fileUploader.service";
export default {
  components: { ratio, reportMainPageState },
  props: { userData: Object },
  setup(props, {emit}) {
    const otherPhotoList = ref([]);
    const btn1 = ref(i18n.global.tc("inappropriatePhoto"));
    const inputVal = ref("");
    const state = ref(new reportMainPageState());

    function reportApi() {
      let model = {
        pageId: getSelectedPageId(),
        itemType: reportType.Page,
        itemId: props.userData.mainPageId,
        propId: null,
        title: "گزارش اشکال",
        description: inputVal.value,
        imageUrl: null,
      };
      if(!otherPhotoList.value || otherPhotoList.value.length==0){
        state.value.reportMainPage(model,()=>{
            emit('closeReportModal')
        });
      }
      else{FileUploaderService.getInstance().uploadImage(
        {
          file: otherPhotoList.value[0],
          onReceive: (res) => {
            model.imageUrl = res;
             state.value.reportMainPage(model,()=>{
                emit('closeReportModal')
             });
          },
        },
        ImageUploaderKeys.REPORT
      );}
    }

    function testValue(label) {
      inputVal.value = label;
    }
    function onFileChange(e) {
      if (e.target.files.length === 0) return;
      if (e.target.files.length + otherPhotoList.value.length <= 3) {
        for (let i = 0; i < e.target.files.length; i++) {
          convertFileTOBase64(e.target.files[i], (base64) => {
            otherPhotoList.value.push(base64);

          });
        }
      }
    }
    return {
      otherPhotoList,
      inputVal,
      state,
      btn1,
      onFileChange,
      testValue,
      reportApi,
    };
  },
};
</script>
<style lang="scss" scoped>
.report-bar {
  border: 1px solid gray;
  height: 60%;
  width: 100%;
  border-radius: 6px;
  padding: 51px 0px 51px 0px;
}
.bottom-bar {
  display: flex;
  flex-direction: row;
}
.bottom-bar-2 {
  display: flex;
  flex-direction: column;
}
.input-bar {
  padding: 5px 50px 5px 40px;
  text-align: center;
  border: 1px solid rgb(170, 167, 167);
  border-radius: 7px;
}
.color-report {
  background-color: #c1e1e5;
  width: 100% !important;
  font-size: 13px;
}
:focus-visible.input-bar {
  border-color: rgb(0, 140, 255);
}
.m-t {
  margin-top: 12px;
}
.mt-30 {
  margin-top: 30px;
}
.btn-size {
  font-size: 13px;
  border-radius: 12px;
  padding: 10px 0 10px 0px;
}
.btn-size1 {
  width: 380% !important;
}
.bottom-bar {
  margin-top: 12px;
}
.btn-size2 {
  width: 162%;
}
.bar-content {
  padding: 0 5px 0 5px !important;
}
.swipper {
  width: 300px;
}
.swiper-container {
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
  list-style: none;
  padding-right: 0;
  /*width: 506px !important;*/
}

.swiper-slide {
  width: auto !important;
  padding: 3px !important;
}

.active-route {
  border-radius: 0 !important;
  border-bottom: 2px solid #131313 !important;
}
.btn-size2 {
  width: 100%;
}
:hover.p-button-secondary {
  background-color: #aeced2 !important;
}
.grid-size {
  max-width: 33%;
  max-height: 33%;
}

.add-pic {
  background-color: rgb(193, 225, 229);
  border-radius: 8px;
  position: relative;
  width: 104% !important;
  height: 40px;
  color: #fff;
  font-size: 13px !important;
}

.selected-importance {
  border: none;
  border: 3px solid rgb(105 234 31);
  /* border: 3px solid rgb(193, 225, 229); */
}

.hidden {
  position: absolute;

  z-index: 9;
  opacity: 0;
}

.div-Importance {
  border-radius: 20px;
}

.img-importance {
  width: 25px;
  height: 25px;
}

.header-shadow {
  box-shadow: 0px 1px 9px #d0cfcfd4;
}

.submit-button {
  border-radius: 10px;
}

.main-image {
  z-index: 4;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: white;
  width: 50% !important;
  height: 50% !important;
  object-fit: contain;
}
.size-item {
  height: 20% !important;
  width: 94% !important;
}
.sub-b {
  border: 1px solid #c1e1e5;
  margin-right: 8px;
}
</style>
