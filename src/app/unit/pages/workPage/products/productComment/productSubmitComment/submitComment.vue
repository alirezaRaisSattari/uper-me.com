<template>
  <Form
    v-slot="{ errors }"
    :validation-schema="pageNameSchema"
    class="w-100 mt-1 px-3"
    @submit="confirm"
  >
    <div style="margin-bottom: 83px">
      <div class="d-flex justify-content-center align-items-center">
        <h5 class="header-title m-0 shape-text">{{ $t("addComment") }}</h5>
        <img
          alt=""
          class="header-shape-page"
          src="@/assets/img/svg/appbarShape.svg"
        />
      </div>

      <div v-if="state.faceScore != 4" class="p-0 m-0">
        <div v-if="showPrivate == false" class="range-block mt-4 text-center">
          <div class="d-flex margin-auto w-50 text-center" @click="showDetail">
            <div class="mx-2">{{ $t("Scorepointsexclusively") }}</div>
            <i class="fas fa-angle-down" style="padding-top: 5px"></i>
          </div>
          <div class="input-range-main mt-4">
            <input
              id="mainSlider"
              v-model="mainSlider"
              class="slider margin-auto w-100"
              max="5"
              min="0"
              step="0.01"
              type="range"
              @change="changeMainSlider"
              @input="onRangeChange('mainSlider')"
            />
          </div>
        </div>

        <div v-if="showPrivate == true" class="range-block mt-4 text-center">
          <div
            class="d-flex margin-auto w-50 text-center"
            @click="showPrivate = !showPrivate"
          >
            <div class="mx-2">{{ $t("Scorepointspublicly") }}</div>
            <i class="fas fa-angle-up" style="padding-top: 5px"></i>
          </div>
          <div class="text-center my-3">{{ $t("week") }}</div>
          <div class="input-range-main mb-2 mt-3">
            <input
              id="weakSlider"
              v-model="state.scoreItem1"
              class="slider margin-auto w-100"
              max="5"
              min="0"
              step="0.01"
              type="range"
              @input="onRangeChange('weakSlider')"
            />
          </div>

          <div class="text-center mb-2 mt-3">{{ $t("good") }}</div>
          <div class="input-range-main mt-1">
            <input
              id="good1Slider"
              v-model="state.scoreItem2"
              class="slider margin-auto w-100"
              max="5"
              min="0"
              step="0.01"
              type="range"
              @input="onRangeChange('good1Slider')"
            />
          </div>

          <div class="text-center mb-2 mt-3">{{ $t("good") }}</div>
          <div class="input-range-main mt-1">
            <input
              id="good2Slider"
              v-model="state.scoreItem3"
              class="slider margin-auto w-100"
              max="5"
              min="0"
              step="0.01"
              type="range"
              @input="onRangeChange('good2Slider')"
            />
          </div>

          <div class="text-center mb-2 mt-3">{{ $t("soExcellent") }}</div>
          <div class="input-range-main mt-1">
            <input
              id="soExcellentSlider"
              v-model="state.scoreItem4"
              class="slider margin-auto w-100"
              max="5"
              min="0"
              step="0.01"
              type="range"
              @input="onRangeChange('soExcellentSlider')"
            />
          </div>

          <div class="text-center mb-2 mt-3">{{ $t("excellent") }}</div>
          <div class="input-range-main mt-1">
            <input
              id="excellentSlider"
              v-model="state.scoreItem5"
              class="slider margin-auto w-100"
              max="5"
              min="0"
              step="0.01"
              type="range"
              @input="onRangeChange('excellentSlider')"
            />
          </div>
        </div>
      </div>

      <div class="text-center mt-4">
        <div
          class="d-flex justify-content-center align-content-center mx-auto rtl"
          style="width: 96%"
        >
          <button
            :class="state.faceScore == 1 ? 'selected' : ''"
            class="button button-right py-2 width33 presenceBtn"
            type="button"
            @click="state.faceScore = 1"
          >
            <i class="far fa-smile-beam icon-size-23 face"></i>
            <div class="text-icon">{{ $t("Isuggest") }}</div>
          </button>
          <button
            :class="state.faceScore == 2 ? 'selected' : ''"
            class="button button-left py-2 width33 presenceBtn"
            type="button"
            @click="state.faceScore = 2"
          >
            <i class="far fa-meh icon-size-23 face"></i>
            <div class="text-icon">{{ $t("noIdea") }}</div>
          </button>
          <button
            :class="state.faceScore == 3 ? 'selected' : ''"
            class="button button-left py-2 width33 presenceBtn"
            type="button"
            @click="state.faceScore = 3"
          >
            <i class="far fa-frown icon-size-23 face"></i>
            <div class="text-icon">{{ $t("noIdea") }}</div>
          </button>
          <button
            :class="state.faceScore == 4 ? 'selected' : ''"
            class="button button-left py-2 width33 presenceBtn"
            type="button"
            @click="state.faceScore = 4"
          >
            <i class="fas fa-question icon-size-23 face"></i>
            <div class="text-icon">{{ $t("iHaveQuestion") }}</div>
          </button>
        </div>
      </div>

      <div class="width-96 mt-4">
        <Field
          id="opinionInput"
          v-model="state.opinionTextBox"
          :class="errors.opinionInput ? 'border border-danger' : ''"
          :placeholder="$t('yourComment')"
          class="form-control border-radius-10px py-3 w-100 inputs cus-input"
          contenteditable="true"
          name="opinionInput"
          style="word-break: break-word"
          type="text"
        />
        <div class="text-danger text-sm text-right w-100 my-1 px-2">
          {{ errors.opinionInput }}
        </div>

        <!--       <Textarea class="opinion-workPageComment" v-model="value2" :autoResize="true" rows="5" cols="60" />-->
      </div>

      <div v-if="state.faceScore != 4" class="p-0 m-0">
        <div class="width-96 mt-4 text-center">
          <div>{{ $t("positivePoints") }}</div>
          <div class="d-flex mt-1 justify-content-between">
            <input
              v-model="state.positiveView"
              class="form-control cus-input"
            />
            <div
              class="grey-cell"
              @click="
                state.addCommentPos(state.positiveView),
                  (state.positiveView = '')
              "
            >
              <i class="fas fa-plus"></i>
            </div>
          </div>
        </div>

        <div
          v-for="(pv, index) in state.positiveViews"
          class="width-96 mt-4 text-center"
          :key="pv"
        >
          <div class="d-flex mt-1 justify-content-between">
            <input
              v-model="pv.value"
              class="form-control cus-input"
              readonly
              type="text"
            />
            <div class="grey-cell" @click="state.deleteCommentPos(index)">
              <i class="far fa-trash-alt"></i>
            </div>
          </div>
        </div>

        <div class="width-96 mt-4 text-center">
          <div>{{ $t("negativePoints") }}</div>
          <div class="d-flex mt-1 justify-content-between">
            <input
              v-model="state.negativeView"
              class="form-control cus-input"
            />
            <div
              class="grey-cell"
              @click="
                state.addCommentNeg(state.negativeView),
                  (state.negativeView = '')
              "
            >
              <i class="fas fa-plus"></i>
            </div>
          </div>
        </div>

        <div
          v-for="(pv, index) in state.negativeViews"
          :key="pv"
          class="width-96 mt-4 text-center"
        >
          <div class="d-flex mt-1 justify-content-between">
            <input
              v-model="pv.value"
              class="form-control cus-input"
              readonly
              type="text"
            />
            <div class="grey-cell" @click="state.deleteCommentNeg(index)">
              <i class="far fa-trash-alt"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loading v-if="state.createLoading == true" />
    <bottomBar v-if="state.createLoading == false">
      <button
        class="btn btn-danger text-light rounded-pill px-5 py-1"
        type="submit"
      >
        {{ $t("addComment") }}
      </button>
    </bottomBar>
  </Form>
</template>

<script>
import { SubmitCommentState } from "./SubmitCommentState";
import bottomBar from "@/app/public/shared/bottomBar/BottomBar.vue";
import { Field, Form } from "vee-validate";
import { ref, onMounted } from "vue";

import { i18n } from "@/main";
import { useRoute } from "vue-router";
import Textarea from "primevue/textarea";
import * as Yup from "yup";
import Slider from "primevue/slider";

export default {
  name: "submitComment",
  components: { bottomBar, Field, Form, Textarea, Slider },
  setup() {
    const state = ref(new SubmitCommentState());
    const route = useRoute();
    const step = ref(0.1);
    //const targetId = ref(route.params.targetId)
    const userName = ref(route.params.userName);
    const productId = ref(route.params.productId);
    const workPageId = ref(route.params.workPageId);
    state.value.TPageId = route.params.workPageId;
    const positiveView = ref(null);
    const negativeView = ref(null);
    const showPrivate = ref(false);
    const mainSlider = ref(2.5);

    const pageNameSchema = Yup.object().shape({
      opinionInput: Yup.string()
        .test(
          "len",
          i18n.global.tc("inputValidation", { min: 3, max: 1998 }),
          (val) => val.length >= 3 && val.length <= 1998
        )
        .default(""),
    });
    const confirm = () => {
      state.value.createComment();
    };

    function changeMainSlider() {
      state.value.scoreItem1 = mainSlider.value;
      state.value.scoreItem2 = mainSlider.value;
      state.value.scoreItem3 = mainSlider.value;
      state.value.scoreItem4 = mainSlider.value;
      state.value.scoreItem5 = mainSlider.value;
    }

    function showDetail() {
      mainSlider.value = 2.5;
      showPrivate.value = !showPrivate.value;
      changeMainSlider();
    }

    function onRangeChange(id, allowed = false) {
      let mainRangeSlider = document.getElementById(id);
      let val =
        (mainRangeSlider.value - mainRangeSlider.getAttribute("min")) /
          mainRangeSlider.getAttribute("max") -
        mainRangeSlider.getAttribute("min");
      mainRangeSlider.style.backgroundImage = `-webkit-gradient(linear,right top ,left top ,color-stop(${val},#f5c434),color-stop(${val},#c7c7c7))`;
    }

    onMounted(() => {
      state.value.productId = productId.value;
      state.value.workPageId = workPageId.value;

      //   state.value.fullPageUserName=userName.value

      //   changeMainSlider()
      state.value.getProductById();
    });

    return {
      state,
      positiveView,
      negativeView,
      confirm,
      pageNameSchema,
      showPrivate,
      changeMainSlider,
      mainSlider,
      step,
      onRangeChange,
      showDetail,
    };
  },
};
</script>

<style scoped>
@media (max-width: 440px){
  .text-icon{
    font-size: 10px !important;
  }}
.header-title {
  text-align: center;
  width: 100%;
  position: absolute;
}

.shape-text {
  position: absolute;
  top: 10px;
  font-size: 16px;
}

.margin-auto {
  margin-inline: auto;
}

.range-block {
  margin-inline: auto;
  width: 96%;
}

.width-96 {
  width: 96%;
  margin-inline: auto;
}

.input-range-main {
  width: 100%;
}

.presenceBtn {
  background-color: rgb(238, 238, 238);
  color: rgb(133, 133, 133);
  border: 1px solid rgb(183, 183, 183);
  width: 140px;
  height: 77px;
}

.width33 {
  width: 33%;
}

.selected {
  background-color: rgb(255, 159, 0);
  color: black;
  text-shadow: 0px 0px black;
}

.face {
  font-size: 34px;
}

.grey-cell {
  background-color: #e1e2e2;
  width: 15%;
  padding-block: 12px;
  border: 1px solid #c2c5c5;
  border-radius: 8px;
  height: 45px;
}

.cus-input {
  width: 84%;
  height: 45px;
  border-radius: 8px;
}

input[type="range"]::-webkit-slider-thumb {
  width: 20px;
  -webkit-appearance: none;
  height: 20px;
  cursor: pointer;
  border-radius: 10px;
  background: #f5c434;
}

input[type="range"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  border-radius: 8px;
  height: 8px;
  background-image: -webkit-gradient(
    linear,
    right top,
    left top,
    color-stop(0.5, #f5c434),
    color-stop(0.5, #c7c7c7)
  );
}
</style>
