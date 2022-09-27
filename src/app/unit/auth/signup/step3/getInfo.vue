<template>
  <div class="d-flex flex-column align-items-center justify-content-center">
    <div class="add-pic mt-5" @click="clickFileInput">
      <input
        id="fileInput"
        accept="image/*"
        class="w-100 h-100 p-hidden"
        type="file"
        @change="onFileChange($event, 1)"
      />
      <template v-if="urlProfile">
        <div class="add-pic p-0">
          <img v-lazy="urlProfile" alt="" class="image-style" />
        </div>
      </template>
      <i v-if="urlProfile === ''" class="fa fa-image image-icon"></i>
    </div>

    <Form
      autocomplete="off"
      v-slot="{ errors }"
      :validation-schema="loginSchema"
      class="w-100 mt-4"
      @submit="registerUserInformation"
    >
      <div class="col-12 smart-text-align">
        <Field
          id="name"
          v-model="state.dataModel.name"
          :class="{ 'is-invalid': errors.name }"
          :placeholder="$t('name')"
          class="form-control my-2"
          maxlength="80"
          name="name"
          autocomplete="false"
          style="text-align: right"
          type="text"
        />
        <div class="text-danger text-sm">
          {{ errors.name }}
        </div>

        <Field
          id="username"
          v-model="state.dataModel.username"
          :class="{ 'is-invalid': errors.username }"
          :placeholder="$t('username')"
          class="form-control my-2"
          maxlength="40"
          name="username"
          style="text-align: right"
          autocomplete="false"
          type="text"
          @input="usernameChanged()"
        />
        <div class="text-danger text-sm">{{ errors.username }}</div>
        <div
          v-if="!errors.username"
          class="col-12 col-lg-9 my-2 rtl text-right"
        >
          <span
            v-if="state.checkUsernameStatus == 1"
            class="mr-1 text-primary text-sm"
          >
            {{ $t("Check-username") }}
          </span>
          <span
            v-if="state.checkUsernameStatus == 2"
            class="mr-1 text-danger text-sm"
          >
            {{ $("username-exist") }}
          </span>
          <span
            v-if="state.checkUsernameStatus == 3"
            class="mr-1 text-danger text-sm"
          >
            {{ $t("invalidUserName") }}
          </span>
          <span
            v-if="state.checkUsernameStatus == 4"
            class="mr-1 text-success text-sm"
          >
            {{ $t("valid-username") }}
          </span>
          <span
            v-if="state.checkUsernameStatus == 5"
            class="mr-1 text-danger text-sm"
          >
            {{
              $t("userNameInvalidatin", {
                min: 4,
                max: 40,
              })
            }}
          </span>
        </div>
        <div
          class="
            d-flex
            align-items-center
            justify-content-between
            px-1justify-content-between px-1
            password-holder
          "
        >
          <Field
            id="password"
            v-model="state.dataModel.password"
            :class="{ 'is-invalid': errors.password }"
            :placeholder="$t('password')"
            :type="showPassword ? 'text' : 'password'"
            class="password-input"
            autocomplete="false"
            maxlength="30"
            name="password"
          />
          <i
            :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"
            class="fa text-primary hover-pointer mx-1"
            @click="toggleEye"
          ></i>
        </div>
        <div class="text-danger text-sm">
          {{ errors.password }}
        </div>
        <div
          class="
            d-flex
            align-items-center
            justify-content-between
            mt-2
            px-1
            password-holder
          "
        >
          <Field
            id="reWritePassword"
            v-model="state.dataModel.rePassword"
            :class="{ 'is-invalid': errors.reWritePassword }"
            :placeholder="$t('confirm_password')"
            autocomplete="false"
            :type="showPasswordRewrite ? 'text' : 'password'"
            class="password-input"
            maxlength="30"
            name="reWritePassword"
          />
          <i
            :class="showPasswordRewrite ? 'fa-eye-slash' : 'fa-eye'"
            class="fa text-primary hover-pointer mx-1"
            @click="toggleEyeRewrite"
          ></i>
        </div>
        <div class="text-danger text-sm">
          {{ errors.reWritePassword }}
        </div>
        <div class="col-12 text-center my-3 d-flex justify-content-around">
          <button
            :class="state.disableSubmit ? 'p-disabled' : ''"
            class="w-40 blue-custom my-2 submit-btn"
            type="submit"
          >
            <i class="pi pi-spin pi-spinner" v-if="state.disableSubmit"  ></i>
            <p class="m-auto text-light">
              <b>{{ $t("register") }}</b>
            </p>
          </button>

          <button class="w-40 orange-custom my-2 submit-btn" @click="cancel">

            <p class="m-auto text-light">
              <b>{{ $t("cancel") }}</b>
            </p>
          </button>
        </div>
      </div>
    </Form>
  </div>
</template>

<script>
import { i18n } from "@/main";
import { onUnmounted, ref } from "vue";
import { convertFileTOBase64 } from "@/core/service/utils.service";
import { Field, Form } from "vee-validate";
import * as Yup from "yup";
import { getInfoState } from "./getInfoState";
import { ToastService } from "@/core/service/toast.service";
import router from "@/core/router/router";
import _ from "lodash";
import { LocalStorageService } from "@/core/service/localStorage.service";
import { AuthStore } from "@/core/store/auth.store";
import { PageStore } from "@/core/store/page.store";

export default {
  name: "userInformation",
  components: {
    Field,
    Form,
  },
  setup() {
    const urlProfile = ref("");
    const showPassword = ref(false);
    const showPasswordRewrite = ref(false);
    const state = ref(new getInfoState());

    function onFileChange(e, params) {
      if (e.target.files.length === 0) return;
      if (params === 1) {
        convertFileTOBase64(e.target.files[0], (base64) => {
          urlProfile.value = base64;
        });
      }
    }

    const loginSchema = Yup.object().shape({
      name: Yup.string()
        .required()
        .test(
          "len",
          i18n.global.tc("inputValidation", {
            min: 4,
            max: 80,
          }),
          (val) => val.length >= 4 && val.length <= 80
        )
        .default(""),
      username: Yup.string()
        .required()
        .matches(
          /^[aA-zZ0-9\s]+$/,
          "Only english alphabets are allowed for this field "
        )
        .test(
          "len",
          i18n.global.tc("inputValidation", {
            min: 2,
            max: 40,
          }),
          (val) => val.length >= 2 && val.length <= 40
        )
        .default(""),
      password: Yup.string()
        .required()
        .test(
          "len",
          i18n.global.tc("inputValidation", {
            min: 4,
            max: 14,
          }),
          (val) => val.length >= 4 && val.length <= 14
        )
        .default(""),
      reWritePassword: Yup.string()
        .required()
        .test(
          "len",
          i18n.global.tc("inputValidation", {
            min: 4,
            max: 14,
          }),
          (val) => val.length >= 4 && val.length <= 14
        )
        .default(""),
    });

    function toggleEye() {
      showPassword.value = !showPassword.value;
    }

    function toggleEyeRewrite() {
      showPasswordRewrite.value = !showPasswordRewrite.value;
    }

    function registerUserInformation() {
      if (state.value.lockBtnSignUpForApi) return;
      // event.preventDefault();
      ToastService.getInstance().success('اطلاعات با موفقیت ارسال شد')
      if (urlProfile.value.length == 0) {
        ToastService.getInstance().warning(
          i18n.global.tc("profileImageNotSelected")
        );
        return;
      }
      if (state.value.dataModel.password != state.value.dataModel.rePassword) {
        ToastService.getInstance().warning(i18n.global.tc("passwordNotSame"));
        return;
      }
      state.value.disableSubmit = true;
      state.value.uploadProf(urlProfile.value);
    }

    function clickFileInput() {
      document.getElementById("fileInput").click();
    }

    function cancel() {
      router.push("login");
    }

    const usernameChanged = _.debounce(() => {
      if (state.value.dataModel.username.length > 2) {
        state.value.checkUsername(state.value.dataModel.username);
      }
    }, 500);

    return {
      showPasswordRewrite,
      usernameChanged,
      showPassword,
      loginSchema,
      urlProfile,
      state,
      registerUserInformation,
      toggleEyeRewrite,
      clickFileInput,
      onFileChange,
      toggleEye,
      cancel,
    };
  },
};
</script>

<style scoped>
.add-pic {
  text-align: center;
  background-color: rgb(193, 225, 229);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  position: relative;
}

.image-style {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.password-holder {
  height: 40px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  background: #fff;
}

.password-input {
  border: navajowhite;
  width: 96%;
  outline: none;
}

.hidden {
  position: absolute;

  z-index: 9;
  opacity: 0;
}

.image-icon {
  position: absolute;
  right: 22%;
  top: 23%;
  font-size: 54px;
  color: #fff;
}

.blue-custom {
  background-color: rgb(0, 172, 204);
}

.orange-custom {
  background-color: rgb(255, 159, 0);
}

.submit-btn {
  border-radius: 11px;
  box-shadow: 1px 0 4px #ada5a55e;
  border: 1px solid #c5c0c04d;
  font-size: 14px;
  outline: none !important;
  height: 45px;
}

.w-40 {
  width: 35%;
}
</style>
