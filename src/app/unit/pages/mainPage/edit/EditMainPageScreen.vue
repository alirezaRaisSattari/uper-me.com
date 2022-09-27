<template>
  <div class="d-flex flex-column align-items-center w-100 h-100 px-2">
    <loading v-if="editMainPageState.loading === true" />

    <Dialog
      v-model:visible="editPhoneNumberDialog"
      :breakpoints="{
        '1400px': '45vw',
        '320px': '100vw',
        '450px': '85vw',
        '700px': '70vw',
        '950px': '60vw',
      }"
      :dismissableMask="true"
      :header="$t('change-phone-number')"
      :modal="true"
      class="d-flex flex-column p-2"
    >
      <div class="p-3">
        <input
          v-model="userData.mobileNumber"
          class="form-control m-0"
          disabled
          type="tel"
        />
        <div class="w-100 d-flex my-3"></div>

        <input
          v-model="password"
          :placeholder="$t('password')"
          class="form-control mt-2"
          type="password"
        />
        <button
          class="btn w-100 mt-2 btn-color text-dark"
          @click="confirmNewPhone"
        >
          {{ $t("submit") }}
        </button>
      </div>
    </Dialog>
    <Dialog
      v-model:visible="confirmPhoneNumberDialog"
      :breakpoints="{
        '1400px': '45vw',
        '320px': '100vw',
        '450px': '85vw',
        '700px': '70vw',
        '950px': '60vw',
      }"
      :dismissableMask="true"
      :header="$t('change-phone-number')"
      :modal="true"
      class="d-flex flex-column p-2"
    >
      <div class="w-100 d-flex flex-column p-3">
        <otpCode :callBack="getOtpCode" />
        <p class="w-100 text-right">
          {{ ` ${editMainPageState.securityQuestionText}? ` }}
        </p>
        <input
          v-if="editMainPageState.securityQuestionText !== ''"
          v-model="reply"
          :placeholder="$t('reply')"
          class="form-control"
          type="text"
        />
        <button
          class="btn w-100 mt-2 btn-color text-dark"
          @click="verifyPhoneNumber"
        >
          {{ $t("submit") }}
        </button>
      </div>
    </Dialog>
    <div class="d-flex flex-column align-items-center p-2 main-card w-100 mt-4">
      <p class="w-100 text-right">{{ $t("user-info") }}</p>
      <div>
        <input
          ref="InputProfileImage"
          :class="userData.profileUrl === '' ? ' my-2' : ''"
          accept="image/*"
          class="hidden"
          type="file"
          @change="onFileChange($event, 1)"
        />
        <template v-if="urlProfile"> </template>
        <i v-if="userData.profileUrl === ''" class="fa fa-image image-icon"></i>
      </div>
      <div>
        <img
          v-if="userData.profileUrl !== ''"
          :src="
            urlProfile === '' ? userData.profileUrl + '_sm.webp' : urlProfile
          "
          alt=""
          class="image-style my-2 hover-pointer"
          srcset=""
        />
        <i class="upencil icon-upencil" @click="pushPhoto(1)"> </i>
      </div>
      <p class="mb-0 text-right w-100 px-2">{{ $t("name") }}</p>
      <input
        v-model="newName"
        :placeholder="userData.name"
        class="form-control mb-2"
        type="text"
      />
      <p class="mb-0 text-right w-100 px-2">{{ $t("username") }}</p>
      <input
        v-model="newUserName"
        :placeholder="userData.username"
        class="form-control mb-2"
        type="text"
      />
      <button
        class="btn w-100 mt-2 btn-color text-dark"
        @click="changeUserInfo"
      >
        {{ $t("submit") }}
      </button>
    </div>
    <div class="d-flex flex-column align-items-center p-2 main-card w-100 mt-4">
      <p class="w-100 text-right">{{ $t("pageType") }}</p>
      <div class="w-100 d-flex justify-content-between px-2 mt-3">
        <span class="text-secondary"> {{ $t("pageType") }}</span>
        <div class="d-flex align-items-center">
          <span class="mx-1">{{ $t("public") }}</span>
          <div class="switch">
            <input
              id="index"
              v-model="userData.isPublic"
              checked
              class="input"
              type="checkbox"
            />
            <label class="slider" for="index"></label>
          </div>
        </div>
      </div>
      <button
        class="btn w-100 mt-2 btn-color text-dark"
        @click="isPublicStatus"
      >
        {{ $t("submit") }}
      </button>
    </div>
    <div class="d-flex flex-column align-items-center p-2 main-card w-100 mt-4">
      <p class="w-100 text-right">{{ $t("flowing-status") }}</p>
      <div class="w-100 mt-2 px-2">
        <div class="w-100 d-flex justify-content-between align-items-center">
          <span class="mx-1">{{ $t("showFollowers") }}</span>
          <div class="switch">
            <input
              id="flowersState"
              v-model="userData.showFollowers"
              checked
              class="input"
              type="checkbox"
            />
            <label class="slider" for="flowersState"></label>
          </div>
        </div>
      </div>
      <div class="w-100 mt-2 px-2">
        <div class="w-100 d-flex justify-content-between align-items-center">
          <span class="mx-1">{{ $t("showFollowings") }}</span>
          <div class="switch">
            <input
              id="flowingState"
              v-model="userData.showFollowing"
              checked
              class="input"
              type="checkbox"
            />
            <label class="slider" for="flowingState"></label>
          </div>
        </div>
      </div>
      <button class="btn w-100 mt-2 btn-color text-dark" @click="ShowMembers">
        {{ $t("submit") }}
      </button>
    </div>
    <div class="d-flex flex-column align-items-center p-2 main-card w-100 mt-4">
      <p class="w-100 text-right">{{ $t("bio") }}</p>
      <Textarea
        v-model="userData.bio"
        :autoResize="true"
        :placeholder="$t('bio')"
        class="form-control mt-2"
      ></Textarea>
      <button class="btn w-100 mt-2 btn-color text-dark" @click="updateBio">
        {{ $t("submit") }}
      </button>
    </div>
    <div
      class="
        d-flex
        flex-column
        align-items-center
        p-2
        main-card
        w-100
        mt-4
        mb-4
      "
    >
      <p class="w-100 text-right">{{ $t("mobileNumber") }}</p>

      <input
        id="phoneNumber"
        v-model="userData.mobileNumber"
        :placeholder="$t('mobileNumber')"
        class="form-control"
        disabled
        type="tel"
      />

      <button
        class="btn w-100 mt-2 btn-color text-dark"
        @click="openEditPhoneDialog"
      >
        {{ $t("change-phone-number") }}
      </button>
    </div>
  </div>
  <div class="has-fixed-footer"></div>
</template>


<script lang="ts">
import { defineComponent, ref } from "vue";
import { EditMainPageState } from "./EditMainPageState";
import {
  convertFileTOBase64,
  getSelectedPageData,
  isMobile,
} from "@/core/service/utils.service";
import { UpdateMainPageDetailsModel } from "@/data/city/mainpage/mainPage.model";
import otpCode from "@/app/public/shared/otpCode/otpCode.vue";
import { ToastService } from "@/core/service/toast.service";
import { i18n } from "@/main";
import Textarea from "primevue/textarea";

export default defineComponent({
  name: "MainPagePosts",
  components: { otpCode, Textarea },
  setup() {
    const editMainPageState = ref(new EditMainPageState());
    const userData = ref(getSelectedPageData());
    const InputProfileImage = ref();
    const urlProfile = ref("");
    const editPhoneNumberDialog = ref(false);
    const confirmPhoneNumberDialog = ref(false);
    const password = ref("");
    const newPhone = ref();
    const reply = ref("");
    const otpCode = ref();
    const newUserName = ref("");
    const newName = ref("");

    function updateBio() {
      editMainPageState.value.updateUserBio(userData.value.bio);
    }

    function getOtpCode(otp) {
      otpCode.value = otp;
    }

    function phonePrefix(prefix, mobile) {
      userData.value.mobilePrefix = prefix;
      newPhone.value = mobile;
    }

    function isPublicStatus() {
      let model = {
        isPublic: userData.value.isPublic,
        followInfo: null,
      };
      editMainPageState.value.updatePageStatus(model);
    }

    function ShowMembers() {
      let membersModel = {
        isPublic: null,
        followInfo: {
          showFollowers: userData.value.showFollowers,
          showFollowing: userData.value.showFollowing,
        },
      };
      editMainPageState.value.updateMembersStatus(membersModel);
    }

    function changeUserInfo() {
      if (
        newName.value != null ||
        newUserName.value != null ||
        urlProfile.value !== ""
      ) {
        if (urlProfile.value !== "") {
          editMainPageState.value.uploadImages(urlProfile.value, (url) => {
            urlProfile.value = url;
            let userInfoModel = <UpdateMainPageDetailsModel>{
              profileImageUrl:
                urlProfile.value !== ""
                  ? urlProfile.value
                  : userData.value.profileUrl,
              name: newName.value !== "" ? newName.value : userData.value.name,
              username:
                newUserName.value !== ""
                  ? newUserName.value
                  : userData.value.username,
            };
            editMainPageState.value.updateMainPageDetails(userInfoModel);
          });
          return;
        }

        let userInfoModel = <UpdateMainPageDetailsModel>{
          profileImageUrl:
            urlProfile.value !== ""
              ? urlProfile.value
              : userData.value.profileUrl,
          name: newName.value !== "" ? newName.value : userData.value.name,
          username:
            newUserName.value !== ""
              ? newUserName.value
              : userData.value.username,
        };
        editMainPageState.value.updateMainPageDetails(userInfoModel);
      } else
        ToastService.getInstance().warning(
          i18n.global.tc("Information does not change")
        );
    }

    function onFileChange(e, params) {
      if (e.target.files.length === 0) return;

      if (params === 1) {
        convertFileTOBase64(e.target.files[0], async (base64) => {
          urlProfile.value = base64;
        });
      }
    }

    function pushPhoto(params) {
      InputProfileImage.value.click();
    }

    const openEditPhoneDialog = () => {
      editPhoneNumberDialog.value = !editPhoneNumberDialog.value;
    };

    const confirmNewPhone = () => {
      let newMobile = {
        prefixMobileNumber: userData.value.mobilePrefix,
        newMobileNumber: newPhone.value,
        password: password.value,
      };

      editMainPageState.value.newPhoneNumber(newMobile, () => {
        editPhoneNumberDialog.value = !editPhoneNumberDialog.value;
        confirmPhoneNumberDialog.value = !confirmPhoneNumberDialog.value;
      });

    };

    function verifyPhoneNumber() {
      let verifyModel = {
        newMobileNumber: newPhone.value,
        prefix: userData.value.mobilePrefix,
        answer: reply.value,
        otpCode: otpCode.value,
      };
      editMainPageState.value.verifyNewPhoneNumber(verifyModel);
    }

    return {
      confirmPhoneNumberDialog,
      editPhoneNumberDialog,
      editMainPageState,
      InputProfileImage,
      urlProfile,
      password,
      newPhone,
      userData,
      reply,
      newUserName,
      newName,
      openEditPhoneDialog,
      verifyPhoneNumber,
      confirmNewPhone,
      isPublicStatus,
      changeUserInfo,
      onFileChange,
      ShowMembers,
      phonePrefix,
      getOtpCode,
      pushPhoto,
      updateBio,
    };
  },
});
</script>

<style scoped>
.image-style {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  z-index: 8;
}

.hidden {
  opacity: 0;
  z-index: 9;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  position: absolute;
  right: 0;
  top: 0;
}

.image-icon {
  position: absolute;
  right: 22%;
  top: 23%;
  font-size: 54px;
  color: #fff;
}

.main-card {
  background: rgb(249 249 249);
  box-shadow: 0 0 3px 1px rgba(180, 180, 180, 0.66);
  border-radius: 8px;
}

.btn-color {
  background: #7262ab;
  color: #fff !important;
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

::v-deep(.p-inputtextarea) {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem !important;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da !important;
  border-radius: 0.25rem !important;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.icon-upencil {
  position: relative;
  left: 93px;
  top: 34px;
  background-color: white;
  border-radius: 50%;
  padding: 4px 6px 1px 5px;
  cursor: pointer;
}
</style>
