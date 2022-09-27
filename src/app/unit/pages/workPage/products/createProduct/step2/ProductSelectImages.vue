<template>
  <div class="animate__animated animate__fadeIn">
    <div
      class="
        w-100
        d-flex
        justify-content-between
        mt-1
        h-auto
        align-items-center
        rtl
        hover-pointer
        p-2
      "
    >
      <p class="mt-2 mb-auto">{{ $t("addmainphotos") }}</p>
      <div
        :class="preImages.mainImage.base64 ? 'hidden' : ''"
        class="
          add-pic
          d-flex
          align-items-center
          justify-content-center
          p-2
          w-25
          mt-1
          hover-pointer
          user-select-none
        "
        @click="selectProfile"
      >
        <ratio :ratio="'1/1'">
          <span class="text-center my-auto hover-pointer text-dark">
            {{ $t("addmainphotos") }}
          </span>
          <input
            id="profile-image"
            accept="image/*"
            hidden
            type="file"
            class="d-none"
            @change="mainFile($event)"
          />
        </ratio>
      </div>
      <div v-if="preImages.mainImage.base64" class="mx-2 w-25">
        <ratio :ratio="'1/1'" class="mt-2" @click="selectProfile">
          <img
            v-lazy="preImages.mainImage.base64"
            alt=""
            class="rounded w-100 h-100 object-fit-contain"
          />
        </ratio>
      </div>
    </div>

    <div
      class="
        w-100
        d-flex
        justify-content-between
        mt-1
        h-auto
        align-items-center
        hover-pointer
        rtl
        p-2
      "
    >
      <p class="mt-2 mb-auto">{{ $t("add-another-photo") }}</p>
      <div
        class="
          add-pic
          d-flex
          align-items-center
          justify-content-center
          p-2
          w-25
          mt-1
          hover-pointer
          user-select-none
        "
        @click="selectImage"
      >
        <span class="text-center my-auto hover-pointer text-dark">
          {{ $t("add-another-photo") }}
        </span>
        <input
          id="other-images"
          accept="image/*"
          hidden
          multiple
          type="file"
          @change="otherFile($event)"
        />
      </div>
    </div>
    <div class="row mt-3 p-2 padding-bottom-55px">
      <div
        v-for="(item, imgIndex) in preImages.otherImages"
        :key="item"
        class="col-4"
        @click="displayImageOption = true"
      >
            <img
              v-lazy="item.base64"
              alt=""
              class="bg-light rounded w-100 h-100 object-fit-contain mt-1"
              @click="displayImageOptionFunc(imgIndex)"
            />
      </div>
    </div>
  </div>

  <Dialog
    v-model:visible="displayImageOption"
    :contentStyle="{
      background: 'rgb(255, 255, 255)',
      borderRadius: '12px',
    }"
    :showHeader="false"
    :style="{ border: 'none', maxWidth: '25rem' }"
    dismissableMask
    header=""
    modal
  >
    <div class="d-flex align-items-center ltr">
      <Button
        :label="$t('transfer-to-main-img')"
        class="p-button-text w-100 p-button-rounded m-2 mr-0"
        @click="replaceMainImg"
      />
    </div>

    <div class="d-flex align-items-center ltr">
      <Button
        :label="$t('delete')"
        class="p-button-text w-100 p-button-rounded m-2 mr-0"
        @click="deleteImg"
      />
    </div>
  </Dialog>
  <bottomBar>
    <button
      class="btn btn-danger text-light rounded-pill px-5 py-1"
      @click="nextStepFunc"
    >
      {{ $t("submit") }}
    </button>
  </bottomBar>
</template>

<script>
import ratio from "@/app/public/shared/ratio/ratio.vue";
import { convertFileTOBase64 } from "@/core/service/utils.service";
import { ref } from "vue";
import { ToastService } from "@/core/service/toast.service";
import { i18n } from "@/main";
import bottomBar from "@/app/public/shared/bottomBar/BottomBar.vue";

export default {
  components: { ratio, bottomBar },
  props: ["preImages"],
  setup(props, { emit }) {
    const mainPhotoList = ref([]);
    const otherPhotoList = ref([]);
    const displayImageOption = ref(false);
    const progress = ref();
    let selectedImageIndex = ref(null);
    console.log(props.preImages)
    const mainFile = (e) => {
      console.log("sdfsdfd");
      if (!e.target.files.length) return;
      if (e.target.files[0].size > 2 * 1024 * 1024) {
        ToastService.getInstance().warning(
          i18n.global.tc("maxisXfile").replaceAll("XXX", "2")
        );
        return;
      }
      convertFileTOBase64(e.target.files[0], (base64) => {
        props.preImages.mainImage.base64 = base64;
      });
    };

    const otherFile = (e) => {
      const imagesLen = props.preImages.otherImages.length;
      const newImagesLen = e.target.files.length;
      if (newImagesLen === 0) return;
      if (imagesLen >= 18) {
        ToastService.getInstance().error(i18n.global.tc("Max18"));
        return;
      }

      for (let i = 0; i < newImagesLen; i++) {
        if (e.target.files[i].size > 2 * 1024 * 1024) {
          ToastService.getInstance().warning(
            i18n.global.tc("maxisXfile").replaceAll("XXX", "2")
          );
          continue;
        }
        if (imagesLen + i == 18) break;
        convertFileTOBase64(e.target.files[i], (base64) => {
          props.preImages.otherImages.push({ base64 });
        });
      }
    };

    const nextStepFunc = () => {
      if (!props.preImages.mainImage.base64) {
        ToastService.getInstance().warning(i18n.global.tc("empty-main-img"));
        return;
      }
      emit("updateStepTwo", props.preImages);
    };

    const displayImageOptionFunc = (indexVal) => {
      displayImageOption.value = true;
      selectedImageIndex.value = indexVal;
    };

    const replaceMainImg = () => {
      props.preImages.mainImage.base64 =
        props.preImages.otherImages[selectedImageIndex.value].base64;
      displayImageOption.value = false;
    };

    const deleteImg = () => {
      props.preImages.otherImages.splice(selectedImageIndex.value , 1);
      displayImageOption.value = false;
    };

    function selectProfile() {
      document.getElementById("profile-image")?.click();
    }

    function selectImage() {
      document.getElementById("other-images")?.click();
    }

    return {
      progress,
      displayImageOption,
      mainPhotoList,
      otherPhotoList,
      displayImageOptionFunc,
      replaceMainImg,
      nextStepFunc,
      deleteImg,
      mainFile,
      otherFile,
      selectProfile,
      selectImage,
    };
  },
};
</script>

<style scoped>
div, p, span, button, input {
  font-size: 13px;
}

.add-pic {
  background-color: rgb(193, 225, 229);
  border-radius: 8px;
  position: relative;
}

.hidden {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
  opacity: 0;
}

.other-img {
  object-fit: contain;
  width: 100%;
}

.padding-bottom-55px {
  padding-bottom: 75px !important;
}
</style>
