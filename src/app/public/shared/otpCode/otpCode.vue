<template>
  <div class="d-flex flex-column align-items-center">
    <div class="w-50 mt-4 d-flex justify-content-between">
      <input
          id="input4"
          v-model="otpCodeModel.val4"
          :class="displayInput ? 'p-disabled' : ''"
          class="input-number text-center py-1"
          type="number"
      />
      <input
          id="input3"
          v-model="otpCodeModel.val3"
          :class="displayInput ? 'p-disabled' : ''"
          class="input-number text-center py-1"
          type="number"
      />
      <input
          id="input2"
          v-model="otpCodeModel.val2"
          :class="displayInput ? 'p-disabled' : ''"
          class="input-number text-center py-1"
          type="number"
      />
      <input
          id="input1"
          v-model="otpCodeModel.val1"
          :class="displayInput ? 'p-disabled' : ''"
          class="input-number text-center py-1"
          type="number"
      />
    </div>
    <div class="mt-4 ltr">
      <span>00:</span><span v-if="time < 10">0</span><span>{{ time }}</span>
    </div>
  </div>
</template>

<script>
import {onMounted, ref, watch} from "vue";

export default {
  name: "otpCode",
  props: {
    callBack: Function,
  },
  setup(props) {
    const otpCodeModel = ref({
      val1: "",
      val2: "",
      val3: "",
      val4: "",
    });
    const otpCode = ref("");

    const time = ref(59);
    const displayInput = ref(false);

    watch(
        () => otpCodeModel.value.val1,
        (e) => {
          if (e.length === 1) {
            document.getElementById("input2").focus();
          }
          if (e.length > 1) {
            otpCodeModel.value.val1 = otpCodeModel.value.val1.toString()[1];
          }
        }
    );
    watch(
        () => otpCodeModel.value.val2,
        (e) => {
          if (e.length === 1) {
            document.getElementById("input3").focus();
          } else if (e.length < 1) {
            document.getElementById("input1").focus();
          }
          if (e.length > 1) {
            otpCodeModel.value.val2 = otpCodeModel.value.val2.toString()[1];
          }
        }
    );
    watch(
        () => otpCodeModel.value.val3,
        (e) => {
          if (e.length === 1) {
            document.getElementById("input4").focus();
          } else if (e.length < 1) {
            document.getElementById("input2").focus();
          }
          if (e.length > 1) {
            otpCodeModel.value.val3 = otpCodeModel.value.val3.toString()[1];
          }
        }
    );
    watch(
        () => otpCodeModel.value.val4,
        (e) => {
          if (e.length < 1) {
            document.getElementById("input3").focus();
          }
          if (e.length > 1) {
            otpCodeModel.value.val4 = otpCodeModel.value.val4.toString()[1];
          }
          checkLength();
        }
    );
    const timeOut = () => {
      setInterval(() => {
        if (time.value > 0) time.value = time.value - 1;
        else {
          displayInput.value = true;
        }
      }, 1000);
    };

    onMounted(() => {
      timeOut();
    });

    const checkLength = () => {
      otpCode.value =
          otpCodeModel.value.val1 +
          otpCodeModel.value.val2 +
          otpCodeModel.value.val3 +
          otpCodeModel.value.val4;
      if (otpCode.value.length === 4) props.callBack(otpCode.value);
    };

    return {
      otpCodeModel,
      time,
      displayInput,
    };
  },
};
</script>

<style scoped>
.input-number {
  width: 22%;
  border: none;
  outline: none !important;
  border-bottom: 1px solid;
  background: #f2f3f5;
}
</style>
