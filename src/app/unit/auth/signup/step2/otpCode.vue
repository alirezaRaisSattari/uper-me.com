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
        @input="changeInput(4)"
      />
      <input
        id="input3"
        v-model="val3"
        :class="displayButton ? 'p-disabled' : ''"
        autocomplete="off"
        class="input-number text-center py-1"
        type="number"
        @input="changeInput(3)"
      />
      <input
        id="input2"
        v-model="val2"
        :class="displayButton ? 'p-disabled' : ''"
        autocomplete="off"
        class="input-number text-center py-1"
        type="number"
        @input="changeInput(2)"
      />
      <input
        id="input1"
        v-model="val1"
        :class="displayButton ? 'p-disabled' : ''"
        autocomplete="off"
        class="input-number text-center py-1"
        type="number"
        @input="changeInput(1)"
      />
    </div>

    <div class="mt-4 d-flex">
      <span>{{ time }}</span
      ><span v-if="time < 10">0</span> : 00
    </div>
  </div>
  <!--//////////////////////////////////////////////////-->

  <div v-if="!displayButton" class="w-100 text-center">

    <button
      :class="state.submitDisable ? 'p-disabled' : ''"
      class="w-50 mt-3 p-2 submit-btn bg-custom"
      @click="submit"
      id="submit-btn"
    >
      <i class="pi pi-spin pi-spinner" v-if="state.loading"  ></i>
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
      :class="disableSubmitAgain ? 'p-disabled' : ''"
      class="w-40 mt-3 p-2 submit-btn bg-custom"
      @click="submitMobileAgain"
    >
      {{ $t("send-verify-message-again") }}
    </button>
  </div>
</template>

<script>
import { Field } from "vee-validate";
import { onMounted, onUnmounted, ref, watch } from "vue";
import { stepTowState } from "./otpCodeState";
// import router from "../../../../core/router/router";
import { ToastService } from "@/core/service/toast.service";
import { i18n } from "@/main";

export default {
  components: { Field },
  props: ["prefixNumber", "phoneNumber", "introduceCode"],
  setup(props, { emit }) {
    const state = ref(new stepTowState(nextStepFunc));
    const val1 = ref("");
    const val2 = ref("");
    const val3 = ref("");
    const val4 = ref("");
    const time = ref(59);
    const disableSubmitAgain = ref(false);
    const displayButton = ref(false);

    const returnToStepOne = () => {
      emit("returnToFirstStep");
    };

    function nextStepFunc() {
      emit("step2", state.value.hashToken, state.value.refreshToken);
    }

    function changeInput(index) {
      let x = document.getElementById(`input${index}`);
      if (x) {
        if (x.value.toString().length === 1) {
          if (index == 4) {
            submit();
            document.getElementById(`submit-btn`)?.focus();
          } else {
            document.getElementById(`input${index + 1}`)?.focus();
          }
        }
      }
    }

    const timeOut = () => {
      const setTimeout = setInterval(() => {
        if (time.value > 0) time.value = time.value - 1;
        else {
          displayButton.value = true;
          val1.value = "";
          val2.value = "";
          val3.value = "";
          val4.value = "";
        }
      }, 1000);
    };
    onMounted(() => {
      timeOut();
    });

    const submit = () => {
      if (
        val1.value.length == 0 ||
        val2.value.length == 0 ||
        val3.value.length == 0 ||
        val4.value.length == 0
      ) {
        ToastService.getInstance().error(i18n.global.tc("invalidInfo"));
        return;
      }
      let otpCode = `${val1.value}${val2.value}${val3.value}${val4.value}`;
      let model = {
        mobileNumber: parseInt(props.phoneNumber),
        otpCode: parseInt(otpCode),
        prefix: props.prefixNumber,
        introduceCode: props.introduceCode,
      };
      state.value.userVerify(
        model.otpCode,
        model.prefix,
        model.mobileNumber,
        props.introduceCode
      );
    };

    const submitMobileAgain = () => {
      disableSubmitAgain.value = true;
      state.value.userSignUp({
        prefixMobileNumber: props.prefixNumber,
        mobileNumber: parseInt(props.phoneNumber),
        smsPanelTypes: 2,
      });
    };

    watch(
      () => state.value.enterAgain,
      () => {
        if (state.value.enterAgain) {
          time.value = 59;
          displayButton.value = false;
          state.value.enterAgain = false;
          disableSubmitAgain.value = false;
        }
      }
    );
    return {
      val1,
      val2,
      val3,
      val4,
      time,
      displayButton,
      state,
      submit,
      returnToStepOne,
      submitMobileAgain,
      disableSubmitAgain,
      changeInput,
    };
  },
};
</script>

<style scoped>
.input-number {
  width: 22%;
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
