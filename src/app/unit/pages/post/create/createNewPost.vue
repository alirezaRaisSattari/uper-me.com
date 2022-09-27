```<template>
  <ConfirmDialog></ConfirmDialog>

  <!-- ****************************************************  step1(get images)  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
  <div v-show="step1">
  <Header :title="$t('createPost')"/>
    <div class="d-flex m-3 justify-content-start align-content-center">
      <Button
        class="my-auto p-button-rounded p-button-help p-button-outlined"
        icon="fas fa-photo-video"
      />
      <p class="my-auto p-0 m-0 px-2">{{ $t("files") }}</p>
    </div>
    <div
      class="
        add-pic
        d-flex
        align-items-center
        justify-content-start
        p-2
        mt-3
        hover-pointer
      "
    >
      <!-- input -->
      <div class="">
        <Button
          :label="$t('addFile')"
          class="p-button-outlined p-button-rounded"
          icon="fas fa-plus"
          @click="clickFileInput"
        />
        <input
          id="fileInput"
          accept="image/*,video/*"
          class="w-100 h-100 hover-pointer p-hidden"
          multiple
          type="file"
          @change="onFileChange($event)"
        />
      </div>
    </div>
    <div class="mt-3 row m-0 p-0">
      <div
        v-for="(item, index) in postImgsForUI"
        :key="item"
        class="col-3 m-0 p-0 p-1 mt-4 hover-pointer"
      >
        <ratio :ratio="'1/1'" @click="previewFunc(index)">
          <i
            v-if="!item.isImage"
            class="fas fa-play position-absolute z-index-10 play-icon"
          ></i>
          <img
            v-if="item.isImage"
            v-lazy="item.base64"
            alt=""
            class="main mx-auto border-radius"
          />
          <video
            v-else
            :id="`video${index}`"
            class="main mx-auto border-radius"
            @loadeddata="thumbnail"
          >
            <source :src="item.base64" type="video/mp4" />
          </video>
        </ratio>
        <p :class="showProgressUploading ? '' : 'p-hidden'">
          {{ state.postImgsForUpload[index].progress }}
        </p>
      </div>
    </div>
    <br /><br /><br />
    <div class="d-flex justify-content-end m-3">
    </div>
    <Footer>
      <Button
          :label="$t('submit')"

          iconPos="right"
          @click="nextStepFunc"
          class="footer w-25"
      />
    </Footer>
  </div>
  <!-- ****************************************************  step2  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
  <div v-show="!step1">
    <div class="d-flex m-3 justify-content-start align-content-center">
      <Button
        class="my-auto p-button-rounded p-button-help p-button-outlined"
        icon="fas fa-paragraph"
      />
      <p class="my-auto p-0 m-0 px-2">{{ $t("newPost") }}</p>
    </div>
    <div class="m-3 bg-transparent border-bottom">
      <Textarea
        v-model="state.captionTxt"
        :autoResize="true"
        :placeholder="$t('captionHint')"
        class="input-edit bg-transparent w-100"
        cols="30"
        modelValue="modelValue"
        rows="5"
      />
    </div>
    <div class="d-flex m-3 justify-content-start align-content-center">
      <Button
        class="my-auto p-button-rounded p-button-help p-button-outlined"
        icon="fab fa-slack-hash"
      />
      <p class="my-auto p-0 m-0 px-2">{{ $t("hashTag") }}</p>
    </div>
    <div class="mx-3 border-bottom">
      <input
        id="username"
        v-model="hashtagText"
        :placeholder="$t('typeHashtagError')"
        autocomplete="off"
        class="
          new-height
          width-92
          mr-2
          bg-transparent
          border-0
          no-outline
          input-edit
        "
        maxlength="50"
        type="text"
      />
      <button
        class="fa-pull-right input-button mr-1 mt-2 hover-pointer"
        @click="addNewHashtag"
      >
        <i class="fas fa-plus my-1 mx-auto plus-icon"></i>
      </button>
    </div>
    <br />
    <div>
      <loading v-if="state.hashtagLoading" />
    </div>
    <div>
      <swiper
        v-if="state.hashtagList.length != 0"
        :direction="'horizontal'"
        :free-mode="true"
        :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
        :space-between="0"
        slides-per-view="auto"
      >
        <swiper-slide v-for="item in state.hashtagList" :key="item">
          <div class="d-flex align-items-center smart-text-align px-3">
            <p
              class="p-1 border-info my-auto hover-pointer"
              @click="addAHashtagFunc(item)"
            >
              <b>{{ item.title }}</b>
            </p>
          </div>
        </swiper-slide>
      </swiper>
      <swiper
        :direction="'horizontal'"
        :free-mode="true"
        :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
        :space-between="5"
        slides-per-view="auto"
      >
        <swiper-slide v-for="item in hashtags" :key="item">
          <div class="d-flex align-items-center smart-text-align px-3">
            <p class="p-1 pt-3 my-auto">
              <b>{{ item.title }}</b>
            </p>
            <button
              class="fa-pull-right input-button mr-1 mt-2 hover-pointer"
              @click="removeHashtagFunc(item.id)"
            >
              <i class="fas fa-minus my-1 mx-auto"></i>
            </button>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>

  <br /><br />
  <div v-show="!step1">
    <div class="d-flex justify-content-between align-items-center m-3">
      <h6 class="mb-3">{{ $t("turnOffCommenting") }}</h6>
      <div class="switch my-1">
        <input
          id="index"
          v-model="state.turnOnCommenting"
          checked
          class="input"
          type="checkbox"
        />
        <label class="slider" for="index"></label>
      </div>
    </div>

    <br /><br /><br />
    <div class="d-flex justify-content-center m-3">
    </div>
    <Footer>
      <Button
          :label=" &nbsp; $t('submit') &nbsp;"
          class="mx-3 footer"
          icon="pi pi-check"
          iconPos="right"
          @click="sendAll"
      />
      <Button
          :label="&nbsp;$t('lastStep')&nbsp;"
          class="mx-3 footer"
          icon="pi pi-check"
          iconPos="right"
          @click="step1 = true"
      />
    </Footer>
  </div>

  <Dialog
    v-model:visible="displaySendLoading"
    :breakpoints="{
      '2800px': '65vw',
      '1280px': '65vw',
      '1000px': '65vw',
      '800px': '65vw',
      '600px': '91vw',
    }"
    :contentStyle="{ background: 'rgb(255, 255, 255)' }"
    :showHeader="false"
    :style="{ border: 'none' }"
    header=""
    modal
  >
    <p class="text-center">{{ $t("creatingPost") }}</p>
    <loading />
  </Dialog>
  <Dialog
    v-model:visible="displaypreview"
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
    <div class="d-flex justify-content-lg-start">
      <i
        class="fas fa-ellipsis-v ml-auto mx-4 mt-3 font-size-22 hover-pointer"
        @click="displayDetails = true"
      ></i>
    </div>
    <hr />
    <div class="mt-4 mb-0">
      <ratio :ratio="'1/1'">
        <img
          v-if="selectedFile.isImage"
          v-lazy="selectedFile.base64"
          alt=""
          class="previewMain mx-auto border-radius"
        />
        <video
          v-else
          :id="`video${index}`"
          autoplay
          class="previewMain mx-auto border-radius"
          controls
          @loadeddata="thumbnail"
        >
          <source :src="selectedFile.base64" type="video/mp4" />
        </video>
      </ratio>
    </div>
  </Dialog>
  <Dialog
    v-model:visible="displayDetails"
    :breakpoints="{
      '1000px': '52vw',
      '800px': '65vw',
      '600px': '91vw',
    }"
    :contentStyle="{ background: 'rgb(255, 255, 255)' }"
    :showHeader="false"
    :style="{ borderRadius: '100px' }"
    dismissableMask
    header=""
    modal
  >
    <div class="d-flex align-items-center ltr">
      <Button
        :label="$t('delete')"
        class="p-button-text w-100 p-button-rounded m-2 mr-0"
        @click="deleteConfirmation()"
      />
      <i
        class="fa fa-trash icon-size iconOfDialog mr-2"
        @click="deleteConfirmation()"
      ></i>
    </div>
  </Dialog>
</template>

<script>
import Textarea from "primevue/textarea";
import Header from "@/app/unit/shared/headerApp/headerAppScreen.vue"
import {
  convertFileTOBase64,
  getSelectedPageData,
} from "@/core/service/utils.service";
import { onMounted, ref, watch } from "vue";
import ratio from "../../../../public/shared/ratio/ratio";
import InputSwitch from "primevue/inputswitch";
import { createNewPostState } from "./createNewPostState";
import { BASE_TAKE } from "@/core/constant/constant";
import { ToastService } from "@/core/service/toast.service";
import { i18n } from "@/main";
import ConfirmDialog from "primevue/confirmdialog";
import { useConfirm } from "primevue/useconfirm";
import { Swiper, SwiperSlide } from "swiper/vue";
import Footer from "@/app/unit/shared/footerApp/fixedFooterScreen.vue"
export default {
  name: "createNewPost",
  components: {
    ratio,
    Textarea,
    InputSwitch,
    ConfirmDialog,
    Swiper,
    SwiperSlide,
    Header,
    Footer
  },
  setup() {
    const captionTxt = ref("");
    const confirm = useConfirm();
    const InputOtherImages = ref([]);
    const postImgsForUpload = ref([]);
    const turnOnCommenting = ref(true);
    const state = ref(new createNewPostState());
    const hashtagText = ref("");
    const hashtags = ref([]);
    const postImgsForUI = ref([]);
    const videoLength = ref([]);
    const news = ref();
    const displaySendLoading = ref(false);
    const showProgressUploading = ref(false);
    const availableHash = ref(null);
    const step1 = ref(true);
    const displaypreview = ref(false);
    const selectedFile = ref({});
    const displayDetails = ref(false);
    const data = new getSelectedPageData();
    state.value.username = data.username;

    // first step: cover image
    // second step: upload image
    // last step: call API

    const sendAll = () => {
      displaySendLoading.value = true;
      showProgressUploading.value = true;

      if (!state.value.postImgsForUpload[0].isImage) {
        let video = document.getElementById("video0");
        video.currentTime = 5;
        var canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas
          .getContext("2d")
          .drawImage(video, 0, 0, canvas.width, canvas.height);
        news.value = canvas.toDataURL("image/webp");
        state.value.uploadCover(news.value, (link) => {
          state.value.coverImage = link;
        });
      } else {
        state.value.uploadAll();
      }
      hashtags.value.map((e) => {
        if (e.id === -1) state.value.newHashtags.push(e.title);
        else state.value.oldHashtags.push(e.id);
      });
    };

    watch(
      () => hashtagText.value,
      () => {
        if (hashtagText.value.length > 2) {
          let model2 = {
            skip: 0,
            take: 100,
            name: hashtagText.value,
          };
          state.value.findHashtags(model2);
        } else state.value.hashtagList = [];
      }
    );

    function onFileChange(e) {
      if (e.target.files.length === 0) return;
      if (e.target.files.length + postImgsForUI.value.length >= 10) {
        ToastService.getInstance().error(i18n.global.tc("extra-number"));
        return;
      }
      for (let i = 0; i < e.target.files.length; i++) {
        if ((e.target.files[i].size / 1024 / 1024).toFixed(4) >= 40) return;

        let format = e.target.files[i].name.split(".");
        format = format[format.length - 1];
        let isImage = false;
        switch (format) {
          case "jpg":
          case "webp":
          case "png":
          case "jpeg":
          case "tiff":
          case "bmp":
            isImage = true;
            break;
          case "mp4":
          case "mov":
          case "wmv":
          case "avi":
          case "flv":
            isImage = false;
            break;
          default:
            isImage = null;
            ToastService.getInstance().error(i18n.global.tc("invalid"));
            return;
        }
        if (isImage === true) {
          convertFileTOBase64(e.target.files[i], (base64) => {
            postImgsForUI.value.push({ base64, isImage, isHover: false });
            state.value.postImgsForUpload.push({
              base64,
              isImage,
              link: null,
              progress: 0,
            });
          });
        } else if (isImage === false) {
          let base64 = URL.createObjectURL(e.target.files[i]);
          postImgsForUI.value.push({ base64, isImage, isHover: false });
          state.value.postImgsForUpload.push({
            base64: e.target.files[i],
            isImage,
            link: null,
            progress: 0,
          });
        }
      }
      setTimeout(() => {
        videoLength.value = [];
        for (let i = 0; i < state.value.postImgsForUpload.length; i++) {
          if (state.value.postImgsForUpload[i].isImage)
            videoLength.value.push(-1);
          else {
            videoLength.value.push(
              new Date(document.getElementById(`video${i}`).duration * 1000)
                .toISOString()
                .substr(11, 8)
            );
          }
        }
      }, 100);
    }

    const addAHashtagFunc = (text) => {
      if (!hashtags.value.find((val) => text.title == val.title))
        hashtags.value.push(text);
      else ToastService.getInstance().error(i18n.global.tc("is-Repetitious"));
    };

    const removeHashtagFunc = (Id) => {
      let index = hashtags.value
        .map(function (e) {
          return e.id;
        })
        .indexOf(Id);
      hashtags.value.splice(index, 1);
    };

    const addNewHashtag = () => {
      availableHash.value = null;
      if (hashtagText.value.length <= 2) {
        ToastService.getInstance().error(i18n.global.tc("too-short"));
        return;
      }
      if (hashtagText.value.split(" ").length !== 1) {
        ToastService.getInstance().error(i18n.global.tc("invalid-hashtag"));
        return;
      }
      state.value.hashtagList.forEach((e) => {
        if (e.title == hashtagText.value) availableHash.value = e;
      });
      let isRepetitious = hashtags.value.find(
        (e) => e.title == hashtagText.value
      );
      if (isRepetitious) {
        ToastService.getInstance().error(i18n.global.tc("is-Repetitious"));
      } else if (availableHash.value) {
        hashtags.value.push(availableHash.value);
      } else {
        hashtags.value.push({ id: -1, title: hashtagText.value });
      }
      hashtagText.value = "";
    };

    const deleteFile = (index) => {
      postImgsForUI.value.splice(index, 1);
    };

    const clickFileInput = () => {
      document.getElementById("fileInput").click();
    };
    const nextStepFunc = () => {
      if (state.value.postImgsForUpload.length === 0) {
        ToastService.getInstance().error(i18n.global.tc("file-list-is-empty"));
        return;
      }
      step1.value = false;
    };

    const previewFunc = (index) => {
      selectedFile.value = postImgsForUI.value[index];
      selectedFile.value.index = index;
      displaypreview.value = true;
    };

    const deleteConfirmation = () => {
      confirm.require({
        message: i18n.global.tc("delete?"),
        header: i18n.global.tc("warning"),
        acceptClass: "p-button-danger",
        acceptLabel: i18n.global.tc("yes"),
        rejectLabel: i18n.global.tc("cancel"),
        accept: () => {
          postImgsForUI.value.splice(selectedFile.value.index, 1);
          state.value.postImgsForUpload.splice(selectedFile.value.index, 1);
          displaypreview.value = false;
          displayDetails.value = false;
        },
        reject: () => {
          displayDetails.value = false;
        },
      });
    };
    return {
      showProgressUploading,
      displaySendLoading,
      turnOnCommenting,
      InputOtherImages,
      displaypreview,
      displayDetails,
      postImgsForUI,
      selectedFile,
      hashtagText,
      videoLength,
      captionTxt,
      hashtags,
      postImgsForUpload,
      state,
      step1,
      news,
      deleteConfirmation,
      removeHashtagFunc,
      addAHashtagFunc,
      clickFileInput,
      addNewHashtag,
      onFileChange,
      nextStepFunc,
      previewFunc,
      deleteFile,
      confirm,
      sendAll,
    };
  },
};
</script>

<style scoped>
.add-pic {
  background-color: transparent;
  border-radius: 8px;
  position: relative;
}

.no-outline {
  outline: none;
}

.hidden {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 9;
  opacity: 0;
}

.plus-icon{
  padding: 4px;
}

.main {
  z-index: 4;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: white;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.previewMain {
  z-index: 4;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: white;
  width: 100%;
  height: 100%;
  object-fit: contain;
  box-shadow: none !important;
}

.border-radius {
  box-shadow: 0 0 3px 1px rgb(205 207 208);
  border-radius: 8px;
}

.back-ground {
  background-color: white;
}

.width-95 {
  width: 95% !important;
}

.width-92 {
  width: 90% !important;
}

.input-button {
  border-radius: 11px;
  border: 1px solid;
}

.new-height {
  height: 50px;
}

.swiper-slide {
  width: auto !important;
  margin-bottom: 8px;
}

button:focus {
  outline: none !important;
}

.switch {
  display: block;
  margin-top: 24px;
}

.switch .slider {
  position: relative;
  display: inline-block;
  height: 11px;
  width: 32px;
  border-radius: 8px;
  cursor: pointer;
  background: #c5c5c5;
  transition: all 0.2s ease;
}

.switch .slider:after {
  background: #eeeeee;
  position: absolute;
  left: -8px;
  top: -8px;
  display: block;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  content: "";
  transition: all 0.2s ease;
}

.switch label {
  margin-right: 7px;
}

.switch .input {
  display: none;
}

.switch .input ~ .label {
  margin-left: 8px;
}

.switch .input:checked ~ .slider:after {
  left: 16px;
}

.switch .input:checked ~ .slider {
  background: #c1e1e5;
}

.switch .input:checked ~ .slider:after {
  background: #74bdc6;
}

.div-Of-duration {
  background-color: rgb(140, 140, 140);
  width: fit-content;
  margin-top: -179px;
  height: 31px;
  z-index: 10;
}

.thumnail {
  z-index: 10;
  background-color: transparent;
  display: none;
}

.thumnail:hover {
  background-color: rgba(0, 0, 0, 0.55);
  display: block;
  border-radius: 8px;
}

.thumnail:hover .font-size-33 {
  visibility: visible !important;
  opacity: 1 !important;
}

.font-size-33 {
  font-size: 33px;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0.2s, opacity 0.2s ease-in-out;
}

.z-index-10 {
  z-index: 10;
}

.play-icon {
  top: 5px;
  right: 5px;
}

.font-size-22 {
  font-size: 22px;
}

.profileImg {
  width: 55px;
  border-radius: 55px;
  border: 2px solid #707070;
}

.icon-size {
  font-size: 30px;
}

.ellipsis-size {
  font-size: 20px;
}

.folder-name {
  text-shadow: 0px 0px black;
  font-size: 17px;
}
.input-edit {
  border: 1px solid rgb(200, 200, 200) !important;
  padding: 7px !important;
  border-radius: 5px;
}
.footer{
  border-radius: 15px;
  background-color: red;
  border: none;
}
.footer:hover{
  background-color: red;
}
.border-bottom{
  border-bottom: 1px solid black !important;
  padding-bottom: 25px;
}
</style>
