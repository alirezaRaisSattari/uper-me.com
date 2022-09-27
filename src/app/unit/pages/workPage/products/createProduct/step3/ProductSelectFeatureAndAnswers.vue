<template>
  <div class="animate__animated animate__fadeIn">
    <loading v-if="State.featureLoad" />
    <div v-if="State.featureList.length > 0" class="pb-5 mb-5">
      <div
        v-for="(feature, index) in State.featureList"
        :key="index"
        class="d-flex justify-content-between align-items-center px-3 mt-3"
      >
        <p
          :class="feature.disable ? 'text-muted' : ''"
          :title="feature.name"
          class="w-25 text-right feature-name my-auto span-column"
        >
          {{ feature.name }}
        </p>
        <button
          :class="feature.disable ? 'text-muted' : ''"
          class="mt-3 py-2 px-5 submit-btn my-auto"
          @click="openAnswerDialog(feature.id, index)"
        >
          {{ $t("replies") }}
        </button>
        <i
          v-if="!feature.disable"
          class="fas fa-eye my-auto hover-pointer"
          @click="changeDisable(index)"
        ></i>
        <i
          v-if="feature.disable"
          class="fas fa-eye-slash hover-pointer"
          @click="changeDisable(index)"
        ></i>
        <Dialog
          v-if="featureId == feature.id"
          v-model:visible="displayAnswerDialog"
          :breakpoints="{
            '2800px': '65vw',
            '1280px': '65vw',
            '1000px': '65vw',
            '800px': '70vw',
            '510px': '98vw',
          }"
          :contentStyle="{
            background: 'rgb(255, 255, 255)',
            borderRadius: '12px',
            maxWidth: '510px',
            minHeight: '510px',
          }"
          :showHeader="false"
          :style="{ border: 'none', maxWidth: '510px', minHeight: '510px' }"
          header=""
          modal
          dismissableMask
        >
          <div
            class="d-flex justify-content-center align-items-center p-relative"
          >
            <h5 class="header-title m-0 shape-text">{{ feature.name }}</h5>
            <img
              alt=""
              class="header-shape"
              src="@/assets/img/svg/appbarShape.svg"
            />
            <span
              class="close-dialog hover-pointer"
              @click="displayAnswerDialog = false"
              >x</span
            >
          </div>
          <div class="px-3 pt-3">
            <div class="main-card p-2 my-3">
              <p class="w-100 text-right">{{ $t("addReply") }}</p>
              <input
                v-model="newAnswer"
                :placeholder="$t('replyMessage')"
                class="form-control py-3"
                maxlength="90"
                type="text"
              />
              <button
                class="btn w-100 rounded btn-color mt-2"
                @click="addNewAnswer"
              >
                {{ $t("submit") }}
              </button>
            </div>
            <div v-if="feature.answer.length > 0" class="mb-5">
              <div
                v-for="(answer, index) in feature.answer"
                :key="answer"
                :class="answer.id == null ? 'new-record' : ''"
                class="main-card p-2 my-3"
              >
                <div class="w-100 d-flex justify-content-between">
                  <span class="text-break">{{ answer.name }}</span>
                  <div class="custom-control custom-checkbox">
                    <input
                      :id="answer.id"
                      v-model="answer.isSelected"
                      class="custom-control-input"
                      maxlength="90"
                      name="example1"
                      type="checkbox"
                    />
                    <label
                      :for="answer.id"
                      class="custom-control-label"
                    ></label>
                  </div>
                </div>
                <div class="w-100 d-flex justify-content-between mt-3">
                  <span class="text-warning text-break">{{
                    $t("showAnswerForAll")
                  }}</span>
                  <div class="custom-control custom-checkbox">
                    <input
                      :id="index"
                      v-model="answer.isShowOuted"
                      class="custom-control-input"
                      maxlength="90"
                      name="example1"
                      type="checkbox"
                    />
                    <label :for="index" class="custom-control-label"></label>
                  </div>
                </div>
              </div>
            </div>
          </div>
           <div class="d-flex align-items-center justify-content-center my-4">
             <loading v-if="State.answerLoading" />
             <button
                 v-if="!State.answerLoading"
                 class="btn btn-danger text-light rounded-pill px-5 py-1"
                 type="submit"
                 @click="createAnswer"
             >
               {{ $t("submit") }}
             </button>
           </div>
        </Dialog>
      </div>
      <div class="new-ticket position-fixed mt-5">
        <button
          class="
            btn
            rounded-circle
            text-light
            align-items-center
            justify-content-center
            uper-card-1
            float-btn
          "
          style="font-size: 25px; background: var(--bg-orange-color)"
          @click="displayAddFeature = !displayAddFeature"
        >
          +
        </button>
      </div>
    </div>

    <div v-else>
      <div class="text-center mt-5">
        {{ $t("emptyList") }}
      </div>
      <div class="new-ticket position-fixed mt-5">
        <button
          class="
            btn
            rounded-circle
            text-light
            align-items-center
            justify-content-center
            uper-card-1
            float-btn
          "
          style="font-size: 25px; background: var(--bg-orange-color)"
          @click="displayAddFeature = !displayAddFeature"
        >
          +
        </button>
      </div>
    </div>
    <Dialog
      v-model:visible="displayAddFeature"
      :contentStyle="{
        background: 'rgb(255, 255, 255)',
        borderRadius: '12px',
        maxWidth: '510px',
        minHeight: '510px',
      }"
      :showHeader="false"
      :style="{ border: 'none', maxWidth: '510px', minHeight: '510px' }"
      dismissableMask
      header=""
      modal
    >
      <div class="d-flex justify-content-center p-relative">
        <h5 class="header-title mt-3">{{ $t("mainAccountType") }}</h5>

        <img
          alt=""
          class="header-shape"
          src="@/assets/img/svg/appbarShape.svg"
        />
      </div>
      <div class="p-3">
        <div class="main-card p-2">
          <p class="w-100 text-right">{{ $t("feature_name") }}</p>
          <input
            v-model="featureName"
            :placeholder="$t('feature')"
            class="form-control py-3"
            maxlength="90"
            type="text"
          />
        </div>
        <div class="main-card p-2 my-3">
          <p class="w-100 text-right">{{ $t("answer_name") }}</p>
          <input
            v-model="answerName"
            :placeholder="$t('replyMessage')"
            class="form-control py-3"
            maxlength="90"
            type="text"
          />
          <button
            class="btn w-100 rounded btn-color mt-2"
            @click="addAnswerName"
          >
            {{ $t("submit") }}
          </button>
        </div>
        <div v-if="answerNameList.length > 0" class="mb-5 pb-5">
          <p
            v-for="answer in answerNameList"
            :key="answer"
            class="main-card p-2 my-2 text-right"
          >
            {{ answer.name }}
          </p>
        </div>
      </div>
        <div class="d-flex align-items-center justify-content-center my-4">
          <button
              v-if="!State.createFeatureLoading"
              class="btn btn-danger text-light rounded-pill px-5 py-1"
              type="submit"
              @click="createFeature"
          >
            {{ $t("submit") }}
          </button>
        </div>
    </Dialog>
    <bottomBar>
      <button
        class="btn btn-danger text-light rounded-pill px-5 py-1"
        type="submit"
        @click="nextStepFunc"
      >
        {{ $t("submit") }}
      </button>
    </bottomBar>
  </div>
  <br />
  <br />
</template>

<script>
import { productFeatureAndAnswerState } from "./ProductSelectFeatureAndAnswers";
import { ref, onMounted } from "vue";
import { ToastService } from "@/core/service/toast.service";
import { i18n } from "@/main";
import bottomBar from "@/app/public/shared/bottomBar/BottomBar.vue";

export default {
  components: { bottomBar },
  props: {
    model: Object,
  },
  setup(props, { emit }) {
    const State = ref(new productFeatureAndAnswerState());
    const displayAddFeature = ref(false);
    const displayAnswerDialog = ref(false);
    const answerName = ref("");
    const featureName = ref("");
    const newAnswer = ref("");
    const listIndex = ref();
    const answerNameList = ref([]);
    const featureId = ref();

    // props.model.productDetails.categoryId = -585;

    function getFeatures() {
      State.value.getFeature(props.model.productDetails.categoryId);
    }

    onMounted(() => {
      getFeatures();
    });

    function addAnswerName() {
      if (answerName.value.length >= 3) {
        answerNameList.value.push({ name: answerName.value });
      } else
        ToastService.getInstance().warning(
          i18n.global.tc("answerIndexMinLengthValidation", {
            index: i18n.global.tc("name"),
          })
        );
      answerName.value = "";
    }

    function createFeature() {
      if (featureName.value.length == 0 || answerNameList.value.length == 0) {
        ToastService.getInstance().warning(
          i18n.global.tc("selectMinOneFeatureAndOneAnswer")
        );
        return;
      }
      if (featureName.value.length >= 3 && answerNameList.value.length > 0) {
        let model = {
          categoryId: props.model.productDetails.categoryId,
          name: featureName.value,
          answers: answerNameList.value,
        };
        State.value.createFeatureWithAnswer(model, () => {
          displayAddFeature.value = false;
          featureName.value = "";
          answerNameList.value = [];
          getFeatures();
        });
      } else
        ToastService.getInstance().warning(
          i18n.global.tc("answerIndexMinLengthValidation", {
            index: i18n.global.tc("name"),
          })
        );
    }

    function openAnswerDialog(id, index) {
      listIndex.value = index;
      if (!State.value.featureList[index].disable)
        displayAnswerDialog.value = !displayAnswerDialog.value;
      featureId.value = id;
    }

    function addNewAnswer() {
      if (newAnswer.value.length >= 3) {
        State.value.featureList[listIndex.value].answer.unshift({
          name: newAnswer.value,
          isSelected: true,
          isShowOuted: true,
          id: null,
        });
        newAnswer.value = "";
      } else {
        ToastService.getInstance().warning(
          i18n.global.tc("answerIndexMinLengthValidation", {
            index: i18n.global.tc("name"),
          })
        );
      }
    }

    function createAnswer() {
      const newAnswersList = [];
      State.value.featureList[listIndex.value].answer
        .filter((element) => element.id == null)
        .forEach((element) => {
          newAnswersList.push({ name: element.name });
        });
      let model = {
        answers: newAnswersList,
        featureId: featureId.value,
      };
      if (model.answers.length > 0) {
        State.value.createFeatureAnswerMulti([model], (res) => {
          displayAnswerDialog.value = false;
          State.value.featureList[listIndex.value].answer.forEach((element) => {
            if (element.id == null) {
              let resIndex = res[0].answers
                .map(function (e) {
                  return e.answerName;
                })
                .indexOf(element.name);
              element.id = res[0].answers[resIndex].answerId;
            }
          });
        });
      } else displayAnswerDialog.value = false;
    }

    function changeDisable(index) {
      State.value.featureList[index].disable =
        !State.value.featureList[index].disable;
    }

    function nextStepFunc() {
      if (true) {
      }
      let featureIsSelected = false;
      State.value.featureList.forEach((element) => {
        if (element.disable == false) {
          featureIsSelected = true;
        }
      });
      if (!featureIsSelected) {
        ToastService.getInstance().error(i18n.global.tc("catNotSelected"));
      } else {
        emit("updateStepThree", State.value.featureList);
      }
    }

    return {
      State,
      displayAddFeature,
      featureName,
      answerName,
      addAnswerName,
      createFeature,
      answerNameList,
      featureId,
      displayAnswerDialog,
      openAnswerDialog,
      newAnswer,
      addNewAnswer,
      createAnswer,
      nextStepFunc,
      changeDisable,
    };
  },
};
</script>

<style scoped>
div, p, span, button, input {
  font-size: 13px;
}


.submit-btn {
  border-radius: 11px;
  box-shadow: 1px 0 4px #ada5a55e;
  border: 1px solid #c5c0c04d;
  font-size: 14px;
  outline: none !important;
}

.feature-name {
  word-break: break-word;
}

@media (max-width: 510px) {
  .feature-name {
    font-size: 13px;
  }
}

.new-ticket {
  width: 510px;
  bottom: 3%;
  z-index: 20;
}

.main-card {
  border-radius: 10px;
  box-shadow: 1px 1px 4px #8080804f;
}

@media only screen and (max-width: 500px) {
  .new-ticket {
    width: 95%;
  }
}

.p-relative {
  position: relative;
}

.header-title {
  text-align: center;
  width: 100%;
  position: absolute;
}

.header-shape {
  width: 288px;
}

.btn-color {
  background: #c1e1e5;
}

.new-record {
  background: #c1e1e5;
}

.close-dialog {
  position: absolute;
  right: 18px;
  top: 7px;
  color: #dc3545;
  padding: 0 2px;
}

.float-btn {
  bottom: 70px !important;
}
</style>
