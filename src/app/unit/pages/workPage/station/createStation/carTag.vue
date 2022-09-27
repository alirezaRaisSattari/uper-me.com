<template>
  <div class="d-flex justify-content-center align-items-center w-100">
    <div class="blue-wrapper px-0 d-flex justify-content-center">
      <p style="display: block; font-size: 10px">IR Iran</p>
      <input
          id="input6"
          v-model="otpCodeModel.val6"
          class="input-number_blue text-center py-1"
          type="number"
      />
      <input
          id="input5"
          v-model="otpCodeModel.val5"
          class="input-number_blue text-center py-1"
          type="number"
      />
    </div>
    <div
        class="mt-0 d-flex justify-content-between white-wrapper bg-light"
        style="width: 73%"
    >
      <input
          id="input4"
          v-model="otpCodeModel.val4"
          class="input-number bg-light text-center py-1"
          type="number"
      />

      <input
          id="input3"
          v-model="otpCodeModel.val3"
          class="input-number bg-light text-center py-1"
          type="number"
      />
      <input
          id="inputLetter"
          v-model="otpCodeModel.letter"
          class="input-number bg-light text-center py-1"
          style="margin-inline: 30px"
          type="text"
          v-on:keypress="isLetter($event)"
      />
      <input
          id="input2"
          v-model="otpCodeModel.val2"
          class="input-number bg-light text-center py-1"
          type="number"
      />
      <input
          id="input1"
          v-model="otpCodeModel.val1"
          class="input-number bg-light text-center py-1"
          type="number"
      />
    </div>
  </div>
</template>

<script>
import {onMounted, ref, watch} from "vue";

export default {
  name: "carTag",
  props: {
    callBack: Function,
  },
  setup(props) {
    const otpCodeModel = ref({
      val1: "",
      val2: "",
      val3: "",
      val4: "",
      val5: "",
      val6: "",
      letter: "",
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
            document.getElementById("inputLetter").focus();
          } else if (e.length < 1) {
            document.getElementById("input1").focus();
          }
          if (e.length > 1) {
            otpCodeModel.value.val2 = otpCodeModel.value.val2.toString()[1];
          }
        }
    );

    watch(
        () => otpCodeModel.value.letter,
        (e) => {
          if (e.length === 1) {
            document.getElementById("input3").focus();
          } else if (e.length < 1) {
            document.getElementById("input2").focus();
          }
          if (e.length > 1) {
            otpCodeModel.value.letter = otpCodeModel.value.letter.toString()[1];
          }
        }
    );

    watch(
        () => otpCodeModel.value.val3,
        (e) => {
          if (e.length === 1) {
            document.getElementById("input4").focus();
          } else if (e.length < 1) {
            document.getElementById("inputLetter").focus();
          }
          if (e.length > 1) {
            otpCodeModel.value.val3 = otpCodeModel.value.val3.toString()[1];
          }
        }
    );

    watch(
        () => otpCodeModel.value.val4,
        (e) => {
          if (e.length === 1) {
            document.getElementById("input5").focus();
          } else if (e.length < 1) {
            document.getElementById("input3").focus();
          }
          if (e.length > 1) {
            otpCodeModel.value.val4 = otpCodeModel.value.val4.toString()[1];
          }
        }
    );

    watch(
        () => otpCodeModel.value.val5,
        (e) => {
          if (e.length === 1) {
            document.getElementById("input6").focus();
          } else if (e.length < 1) {
            document.getElementById("input4").focus();
          }
          if (e.length > 1) {
            otpCodeModel.value.val5 = otpCodeModel.value.val5.toString()[1];
          }
        }
    );

    watch(
        () => otpCodeModel.value.val6,
        (e) => {
          if (e.length === 1) {
            // document.getElementById("input6").focus();
          } else if (e.length < 1) {
            document.getElementById("input5").focus();
          }
          if (e.length > 1) {
            otpCodeModel.value.val6 = otpCodeModel.value.val6.toString()[1];
          }
        }
    );

    const isLetter = (e) => {
      let char = String.fromCharCode(e.keyCode); // Get the character
      if (/^[A-Za-z]+$/.test(char)) return true;
      // Match with regex
      else e.preventDefault(); // If not match, don't add to input text
    };

    // const isNumber=(e)=> {
    //   let char = String.fromCharCode(e.keyCode); // Get the character
    //   if(/^[A-Za-z]+$/.test(char)) return true; // Match with regex
    //   else e.preventDefault(); // If not match, don't add to input text
    // }

    onMounted(() => {
    });

    const checkLength = () => {
      otpCode.value =
          otpCodeModel.value.val1 +
          otpCodeModel.value.val2 +
          otpCodeModel.value.val3 +
          otpCodeModel.value.letter +
          otpCodeModel.value.val4 +
          otpCodeModel.value.val5 +
          otpCodeModel.value.val6;
      if (otpCode.value.length === 7) {
      }
    };

    return {
      otpCodeModel,

      isLetter,
    };
  },
};
</script>

<style scoped>
.input-number {
  width: 13%;
  border: none;
  outline: none !important;
  border-bottom: 2px solid #1466c7;
  background: #f2f3f5;
}

.input-number_blue {
  width: 34%;
  border: none;
  outline: none !important;
  border-bottom: 2px solid white;
  background: #2f51bd;
  color: white;
  margin-left: 5px;
  margin-bottom: 13px;
}

.blue-wrapper {
  background-color: #2f51bd;
  /*background-color: white;*/
  width: 105px;
  height: 57px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-inline: 7px;
  box-shadow: 0px 0px 0px 2px #d3d0d0e8;
  border-bottom-right-radius: 12px;
  border-top-right-radius: 12px;
  color: white;
  padding-top: 10px;
}

.white-wrapper {
  padding-bottom: 12px;
  padding-top: 9px;
  padding-inline: 13px;
  box-shadow: 0px 0px 0px 2px #d3d0d0e8;
  margin-inline: 5px;
}
</style>
