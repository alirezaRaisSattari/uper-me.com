<template>
  <div class="d-flex flex-column align-items-center">
    <div class="w-50 mt-4 d-flex justify-content-between">
      <input
          id="input4"
          v-model="val4"
          :class="displayButton ? 'p-disabled' : ''"
          autocomplete="off"
          class="input-number text-center py-1"
          type="number"
      />
    </div>

    <div class="mt-4 d-flex">
      <span>{{ time }}</span
      ><span v-if="time < 10">0</span> : 00
    </div>
  </div>
  <!--//////////////////////////////////////////////////-->

  <div
      v-if="!displayButton"
      class="d-flex flex-column rounded-container p-2 mt-4"
  >
    <p v-if="info.securityQuestion" class="rtl text-right">
      {{ $t("securityQuestion") }} : {{ info.securityQuestion }}
    </p>
    <div
        v-if="info.securityQuestion"
        class="
        d-flex
        justify-content-between
        align-items-center
        mx-1
        py-2
        input-holder
      "
    >
      <input
          v-model="questionAnswer"
          :placeholder="$t('securityQuestion')"
          class="input-style px-2 border-radius-10px form-control w-100"
          type="text"
      />
    </div>
    <p class="my-auto ml-auto">{{ $t("newPassword") }}</p>

    <div class="w-96 mx-auto d-flex first-div-input mb-3">
      <input
          v-model="confirmNewPassword"
          :placeholder="$t('newPassword')"
          :type="showPassword1 ? 'text' : 'password'"
          class="input-style px-2 border-radius-10px form-control w-100"
      />
      <i
          :class="showPassword1 ? 'fa-eye-slash' : 'fa-eye'"
          class="fa fa-eye eye-icon hover-pointer"
          @click="showPassword1 = !showPassword1"
      ></i>
    </div>
    <p class="my-auto ml-auto mt-3">{{ $t("repeat password") }}</p>
    <div class="w-96 mx-auto d-flex first-div-input">
      <input
          v-model="newPassword"
          :placeholder="$t('repeat password')"
          :type="showPassword2 ? 'text' : 'password'"
          class="input-style px-2 border-radius-10px form-control w-100"
      />
      <i
          :class="showPassword2 ? 'fa-eye-slash' : 'fa-eye'"
          class="fa eye-icon hover-pointer"
          @click="showPassword2 = !showPassword2"
      ></i>
    </div>
  </div>
  <div v-if="!displayButton" class="w-100 text-center">
    <button
        :class="state.submitDisable ? 'p-disabled' : ''"
        class="w-50 mt-3 p-2 submit-btn bg-custom"
        @click="submit"
    >
      {{ $t("submit") }}
    </button>
  </div>
  <div
      v-if="displayButton"
      class="w-100 text-center d-flex justify-content-around mt-3"
  >
    <button class="w-40 mt-3 p-2 submit-btn bg-custom" @click="returnToStepOne">
      {{ $t("enter-your-number-again") }}
    </button>
    <button
        :class="state.repeatDisable ? 'p-disabled' : ''"
        class="w-40 mt-3 p-2 submit-btn bg-custom"
        @click="submitMobileAgain"
    >
      {{ $t("send-verify-message-again") }}
    </button>
  </div>
</template>

<script>
import {Field} from "vee-validate";
import {onMounted, ref, watch} from "vue";
import {stepTowState} from "./confirmForgetPasswordState";
import router from "../../../../core/router/router";
import {ToastService} from "@/core/service/toast.service";
import {i18n} from "@/main";

export default {
  components: {Field},
  props: ["info", "mobileNumber", "phonePre"],
  setup(props, {emit}) {
    const state = ref(new stepTowState());
    const val4 = ref("");
    const time = ref(59);
    const newPassword = ref("");
    const confirmNewPassword = ref("");
    const questionAnswer = ref("");
    const displayButton = ref(false);
    const showPassword1 = ref(false);
    const showPassword2 = ref(false);

    const returnToStepOne = () => {
      emit("returnToFirstStep");
    };
    const timeOut = () => {
      const setTimeout = setInterval(() => {
        if (time.value > 0) time.value = time.value - 1;
        else {
          displayButton.value = true;
          val4.value = "";
        }
      }, 1000);
    };
    onMounted(() => {
      timeOut();
    });

    const submit = () => {
      if (
          val4.value.length === 0
      ) {
        ToastService.getInstance().error(i18n.global.tc("invalid otp code"));
        return;
      }
      if (confirmNewPassword.value.length === 0) {
        ToastService.getInstance().error(i18n.global.tc("password is not put"));
        return;
      }
      if (confirmNewPassword.value !== newPassword.value) {
        ToastService.getInstance().error(
            i18n.global.tc("passwordDoesNotMatch")
        );
        return;
      }
      // let otpCode = val1.value + val2.value + val3.value + val4.value;
      let otpCode =  val4.value;
      let model = {
        mobileNumber: Number(props.mobileNumber),
        mainPageId: props.info.mainPageId,
        otpCode: otpCode,
        newPassword: newPassword.value,
        answer: questionAnswer.value,
      };
      state.value.otpCodeConfirmation(model);
    };

    const submitMobileAgain = () => {
      let model = {
        prefixMobileNumber: props.phonePre,
        mobileNumber: Number(props.mobileNumber),
      };
      state.value.submitMobile(model);
    };

    watch(
        () => state.value.enterAgain,
        () => {
          if (state.value.enterAgain) {
            time.value = 59;
            displayButton.value = false;
            state.value.enterAgain = false;
          }
        }
    );
    return {
      questionAnswer,
      newPassword,
      confirmNewPassword,
      // val1,
      // val2,
      // val3,
      val4,
      time,
      displayButton,
      showPassword1,
      showPassword2,
      state,
      submit,
      returnToStepOne,
      submitMobileAgain,
    };
  },
};
</script>

<style scoped>
.input-number {
  border: none;
  outline: none !important;
  border-bottom: 2px solid rgb(201, 201, 201);
  background: transparent;
}

.input-style {
  background: #ffffff;
  border: none;
  height: 44px;
  outline: none;
}

.submit-btn {
  border-radius: 11px;
  box-shadow: 1px 0 4px #ada5a55e;
  border: 1px solid #c5c0c04d;
  font-size: 14px;
  outline: none !important;
}

.w-18 {
  width: 18%;
}

.bg-custom {
  background-color: rgb(194, 225, 228);
}

:focus-visible {
  outline: none;
}

.first-div-input {
  background: #ffffff;
  border: 1px solid #ced4da;
  border-radius: 4px;
  height: 46px;
}

.eye-icon {
  font-size: 20px;
  margin: 12px;
  margin-right: 10px;
}

.form-control:focus {
  border: none;
  outline: none;
  box-shadow: none;
}

.w-96 {
  width: 96%;
}
</style>
