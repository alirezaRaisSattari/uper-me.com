<template>
  <get-phone-number v-if="step == 1" @step1="nextStep" />
  <otp-code
    v-if="step == 2"
    :phoneNumber="phoneNumber"
    :prefixNumber="prefixNumber"
    :introduceCode="introduceCode"
    @returnToFirstStep="step = 1"
    @step2="step++"
  />
  <get-info v-if="step == 3" />
</template>

<script>
import { onMounted, ref } from "vue";
import GetPhoneNumber from "./step1/getPhoneNumber.vue";
import OtpCode from "./step2/otpCode.vue";
import getInfo from "./step3/getInfo.vue";
import { LocalStorageService } from "@/core/service/localStorage.service";
import { AuthStore } from "@/core/store/auth.store";
import { PageStore } from "@/core/store/page.store";

export default {
  name: "registerScreen",
  components: {
    GetPhoneNumber,
    OtpCode,
    getInfo,
  },
  setup() {
    const step = ref(1);
    const phoneNumber = ref(0);
    const prefixNumber = ref(0);
    const refreshToken = ref("");
    const hashToken = ref("");
    const introduceCode = ref("");

    function nextStep(phone, prefix, IntroduceCode) {
      phoneNumber.value = phone.value;
      prefixNumber.value = prefix.value;
      introduceCode.value = IntroduceCode.value.toLowerCase();
      step.value++;
    }

    onMounted(() => {
      LocalStorageService.getInstance().clear();
      AuthStore().isLoggedIn = false;
      PageStore().selectedPageId = null;
    });

    function step2(HashToken, RefreshToken) {
      hashToken.value = HashToken;
      refreshToken.value = RefreshToken;
      step.value++;
    }

    return {
      introduceCode,
      refreshToken,
      prefixNumber,
      phoneNumber,
      hashToken,
      step2,
      step,
      nextStep,
    };
  },
};
</script>

<style scoped>
</style>
