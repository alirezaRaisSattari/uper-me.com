<template>
  <h6 class="header-title mt-3">{{ $t("forgotPassword") }}</h6>
  <div class="d-flex justify-content-center">
    <img alt="" class="header-shape" src="@/assets/img/svg/appbarShape.svg"/>
  </div>
  <div v-if="!state.ok" class="h-auto mt-4">
    <loading v-if="state.loading || state.prefixLoading"/>
    <div v-else class="d-flex w-100">
      <div class="w-100 mx-2 d-flex first-div-input">
        <i class="fa fa-mobile mobile-icon"></i>
        <input
            v-model="mobileNumber"
            :placeholder="$t('mobilePhone')"
            class="w-100 first-input"
            type="number"
        />
      </div>
      <Dropdown
          v-model="phonePre"
          :options="state.mobilesPrefix"
          class="w-18 mx-2"
          optionLabel="prefix"
          optionValue="prefix"
      />
    </div>
    <div class="w-100 text-center">
      <button class="w-50 mt-3 p-2 submit-btn bg-custom" @click="submit">
        {{ $t("submit") }}
      </button>
    </div>
  </div>
  <stepTow
      v-if="state.ok"
      :info="state.mobileInfo"
      :mobileNumber="mobileNumber"
      :phonePre="phonePre"
      @returnToFirstStep="
      state.ok = false;
      mobileNumber = Number;
    "
  />
</template>

<script>
import stepTow from "./confirmForgetPassword.vue";
import * as Yup from "yup";
import {Field, Form} from "vee-validate";
import {i18n} from "../../../../main";
import {forgetPasswordState} from "./forgetPassword";
import {ref, watch} from "vue";
import Dropdown from "primevue/dropdown";
import {ToastService} from "@/core/service/toast.service";

export default {
  name: "forgetPassword",
  components: {
    Dropdown,
    Form,
    Field,
    stepTow,
  },
  setup() {
    const unCorrectNumber = ref(false);
    const state = ref(new forgetPasswordState());
    const prefix = ref(Number);
    const mobileNumber = ref();
    const phonePre = ref("98");
    state.value.mobilePrefix();

    function getPhone(pre, phone) {
      prefix.value = pre;
      mobileNumber.value = phone;
    }

    const loginSchema = Yup.object().shape({
      userData: Yup.string()
          .test(
              "len",
              i18n.global.tc("inputValidation", {
                min: 11,
                max: 11,
              }),
              (val) => val.length == 11 && val.length == 10
          )
          .default(""),
    });

    //if first of number is zero
    const submit = () => {
      if (!phonePre.value) {
        ToastService.getInstance().error(i18n.global.tc("invalidPrefix"));
        return;
      }
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
        mobileNumber.value = mobileNumber.value % Math.pow(10, 11);
      }
      mobileNumber.value = mobileNumber.value.toString();
      if (mobileNumber.value.length != 10) {
        ToastService.getInstance().error(i18n.global.tc("invalidMobileNumber"));
        return;
      }
      let model = {
        prefixMobileNumber: phonePre.value,
        mobileNumber: parseInt(mobileNumber.value),
      };
      state.value.submitMobile(model);
    };

    return {
      unCorrectNumber,
      loginSchema,
      mobileNumber,
      state,
      phonePre,
      submit,
      getPhone,
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
  font-size: 29px;
  margin: 9px;
  margin-right: 10px;
}

.w-18 {
  width: 18%;
}
</style>
