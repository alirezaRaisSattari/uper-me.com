<template>
  <div class="d-flex flex-column align-items-center">
    <h5 class="header-title mt-3">{{ $t("register") }}</h5>
    <div class="d-flex justify-content-center">
      <img alt="" class="header-shape" src="@/assets/img/svg/appbarShape.svg" />
    </div>
    <div class="w-100 my-3">
      <!-- load -->
      <div class="d-flex w-100">
        <div class="w-100 mx-2 d-flex first-div-input">
          <i class="pi pi-user introduce-code-icon"></i>
          <input
            maxlength="9"
            v-model="introduceCode"
            @input="checkIntroduceCode"
            :placeholder="$t('introduceCode')"
            class="w-100 first-input my-0"
          />
        </div>
      </div>
      <p
        class="text-sm text-right pr-3 text-danger"
        v-if="!signUp.introduceCodeCheck && introduceCode.length"
      >
        {{ $t("invalid introduce code") }}
      </p>
      <p class="text-sm text-right pr-3 text-danger"></p>
      <div class="d-flex w-100">
        <div class="w-100 mx-2 d-flex first-div-input">
          <i class="pi pi-mobile mobile-icon"></i>
          <input
            v-model="mobileNumber"
            :placeholder="$t('mobilePhone')"
            class="w-100 first-input"
            type="number"
            :disabled="!signUp.introduceCodeCheck"
          />
        </div>
        <Dropdown
          v-model="prefix"
          :options="signUp.mobilesPrefixVal"
          class="w-18 mx-2"
          optionLabel="prefix"
          optionValue="prefix"
        />
      </div>
    </div>
    <loading v-if="signUp.loading" />
    <button class="w-50 mt-3 p-2 submit-btn bg-custom text-center" @click="userSignUp">
      <i class="pi pi-spin pi-spinner" v-if="signUp.loading"  ></i>
      {{ $t("submit") }}
    </button>
  </div>
</template>

<script>
import { i18n } from "@/main";
import { ref, watch } from "vue";
import { RegisterState } from "./getPhoneNumberState";
import Dropdown from "primevue/dropdown";
import { ToastService } from "@/core/service/toast.service";
import _ from "lodash";
import {toEnglishDigits} from "@/core/service/utils.service";

export default {
  name: "registerScreen",
  components: { Dropdown },
  setup(props, { emit }) {
    const mobileNumber = ref("");
    const introduceCode = ref("");
    const signUp = ref(new RegisterState(nextStepFunc));
    const prefix = ref("98");

    function nextStepFunc() {
      emit("step1", mobileNumber, prefix, introduceCode);
    }

    signUp.value.mobilePrefix();

    function userSignUp() {
      if (!mobileNumber.value) {
        ToastService.getInstance().error(i18n.global.tc("invalidMobileNumber"));
        return;
      }
      if (
        !Math.round(
          mobileNumber.value / Math.pow(10, mobileNumber.value.length)
        ) &&
        mobileNumber.value.length === 11
      ) {
        mobileNumber.value %= Math.pow(10, 11);
      }
      mobileNumber.value = mobileNumber.value.toString();
      if (mobileNumber.value.length != 10) {
        ToastService.getInstance().error(i18n.global.tc("invalidMobileNumber"));
        return;
      }
      signUp.value.userSignUp({
        prefixMobileNumber: prefix.value,
        mobileNumber: mobileNumber.value,
        smsPanelTypes: Number(1),
      });
    }
    const checkIntroduceCode = _.debounce((e) => {
      if (e.target.value.length >= 4) {
        signUp.value.introduceCode("@" + e.target.value);
      }
    }, 1000);
    return {
      checkIntroduceCode,
      introduceCode,
      mobileNumber,
      signUp,
      prefix,
      userSignUp,
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

.header-shape {
  width: 288px;
}

.submit-btn {
  border-radius: 11px;
  box-shadow: 1px 0 4px #ada5a55e;
  border: 1px solid #c5c0c04d;
  font-size: 14px;
  outline: none !important;
}

.header-title {
  text-align: center;
  width: 100%;
  position: absolute;
}

.header-shape {
  width: 288px;
}

.border-radius {
  border-radius: 16px;
}

.input-mask {
  width: 273px;
}

.submit-btn {
  border-radius: 11px;
  box-shadow: 1px 0 4px #ada5a55e;
  border: 1px solid #c5c0c04d;
  font-size: 14px;
  outline: none !important;
}

.bg-custom {
  background-color: rgb(194, 225, 228);
}

:focus-visible {
  outline: none;
}

.prefix {
  border: none;
  outline: none !important;
}

.first-div-input {
  background: #ffffff;
  border: 1px solid #ced4da;
  border-radius: 4px;
  height: 46px;
}

.first-input {
  background: #ffffff;
  border: none;
  height: 44px;
}

.mobile-icon {
  font-size: 22px;
  margin: 9px;
  margin-right: 10px;
}

.introduce-code-icon {
  font-size: 20px;
  margin: 9px;
  margin-right: 10px;
}
.w-18 {
  width: 18%;
}
.p-dropdown .p-dropdown-label {
  width: 12px !important;
  overflow: inherit !important;
}
</style>
