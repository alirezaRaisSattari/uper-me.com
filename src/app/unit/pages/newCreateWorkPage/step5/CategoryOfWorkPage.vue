<template>
  <div class="px-2 position-relative">
    <ConfirmDialog></ConfirmDialog>
    <PageCategoriesScreen ref="pageCategory" :callback="getCategory"/>
    <div v-if="state.categoryList.length == 0" class="mt-5">
      <div class="d-flex justify-content-center mt-5">
        <i class="fas fa-box-open fa-6x mt-5"></i>
      </div>
      <p class="text-center mt-5">{{ $t("emptyFolderList") }}</p>
    </div>
    <div v-else class="mb-5 pb-5">
      <div
          v-for="(item, index) in state.categoryList"
          :key="item"
          class="uper-card-1 p-3 my-2"
      >
        <div class="d-flex justify-content-between">
          <p class="my-auto">{{ item.catName }}</p>
          <i
              class="fas fa-trash-alt my-auto ml-3 hover-pointer"
              @click="deleteFromList(state.categoryList, index)"
          ></i>
        </div>
        <div class="d-flex justify-content-between align-content-center mt-4">
          <p class="my-auto">{{ $t("features") }}</p>
          <button
              class="btn show-btn rounded-pill px-5 py-2 my-auto"
              @click="displayAddFeatureFunc(item.catId, index)"
          >
            {{ $t("show") }}
          </button>
        </div>
      </div>
    </div>

    <bottomBar>
      <button
          class="btn dtn-bg text-light rounded-pill px-5 py-1"
          @click="nextStepFunc"
      >
        {{ $t("submit") }}
      </button>
    </bottomBar>

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
          @click="pageCategory.showDialog()"
      >
        +
      </button>
    </div>

    <Dialog
        v-model:visible="displayAddFeature"
        :breakpoints="{ '440px': '100vw' }"
        :contentStyle="{
        background: 'rgb(255, 255, 255)',
        borderRadius: '12px',
        maxWidth: '512px',
        minWidth: '360px',
        minHeight: '600px',
      }"
        :showHeader="false"
        dismissableMask
        header=""
        modal
    >
      <div
          class="
          d-flex
          justify-content-center
          align-items-center
          position-relative
        "
      >
        <h5 class="header-title m-0 shape-text">{{ $t("features") }}</h5>
        <img
            alt=""
            class="header-shape-page"
            src="@/assets/img/svg/appbarShape.svg"
        />
      </div>
      <loading v-if="state.loading"/>
      <div
          v-if="state.categoryList[categoryIndex].features.length == 0"
          class="mt-5"
      >
        <div class="d-flex justify-content-center mt-5">
          <i class="fas fa-box-open fa-6x mt-5"></i>
        </div>
        <p class="text-center mt-5">{{ $t("emptyFolderList") }}</p>
      </div>
      <div
          v-for="(item, index) in state.categoryList[categoryIndex].features"
          v-else
          :key="item"
          class="uper-card-1 d-flex justify-content-between p-3 m-2 my-3"
      >
        <div class="w-50 d-flex">
          <i
              class="fas fa-trash-alt my-auto ml-3 hover-pointer"
              @click="
              deleteFromList(state.categoryList[categoryIndex].features, index)
            "
          ></i>
          <p class="py-auto my-auto">{{ item.featureName }}</p>
        </div>
        <button
            class="show-btn rounded-pill px-5 py-2 my-auto"
            @click="displayAnswerFunc(index)"
        >
          {{ $t("replies") }}
        </button>
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
            @click="addFeaturesDialog = !addFeaturesDialog"
        >
          +
        </button>
      </div>
    </Dialog>

    <Dialog
        v-model:visible="addFeaturesDialog"
        :breakpoints="{
        '2800px': '65vw',
        '1280px': '65vw',
        '1000px': '65vw',
        '800px': '65vw',
        '600px': '91vw',
      }"
        :contentStyle="{
        background: 'rgb(255, 255, 255)',
        borderRadius: '12px',
        maxWidth: '512px',
      }"
        :showHeader="false"
        :style="{ border: 'none', maxWidth: '512px' }"
        dismissableMask
        header=""
        modal
    >
      <div class="p-2">
        <div class="p-3 m-2 smart-text-align">
          <p>{{ $t("feature-name") }}</p>
          <input
              v-model="newFeatureName"
              :placeholder="$t('feature')"
              class="form-control border-radius-10px py-3 inputs"
              type="text"
          />
        </div>
        <div class="p-3 m-2 smart-text-align">
          <div class="d-flex align-items-center justify-content-between w-100">
            {{ $t("answers") }}
            <i class="fa fa-plus hover-pointer" @click="addAnswer()"></i>
          </div>
          <div v-for="(item , index) in newAnswerNames" :key="index"
               class="d-flex justify-content-between align-items-center my-2 w-100">
            <input
                v-model="item.name"
                :placeholder="$t('answer')"
                class="form-control border-radius-10px py-3 inputs"
                type="text"
            />
            <i class="fa fa-trash text-danger mx-1 hover-pointer" @click="removeAnswer(index)"></i>
          </div>
        </div>
        <div class="w-100 text-center">
          <button
              class="btn rounded color-costum w-50 mt-3"
              @click="addFeatureToList"
          >
            {{ $t("apply") }}
          </button>
        </div>
      </div>
    </Dialog>

    <Dialog
        v-model:visible="displayAnswers"
        :breakpoints="{
        '2800px': '65vw',
        '1280px': '65vw',
        '1000px': '65vw',
        '800px': '70vw',
        '600px': '98vw',
      }"
        :contentStyle="{
        background: 'rgb(255, 255, 255)',
        borderRadius: '12px',
        maxWidth: '512px',
        minHeight: '500px',
      }"
        :showHeader="false"
        :style="{
        border: 'none',
        maxWidth: '512px',
        minHeight: '500px',
        position: 'relative',
      }"
        dismissableMask
        header=""
        modal
    >
      <div
          class="
          d-flex
          justify-content-center
          align-items-center
          position-ralative
        "
      >
        <h5 class="header-title m-0 shape-text">{{ $t("replies") }}</h5>
        <img
            alt=""
            class="header-shape-page"
            src="@/assets/img/svg/appbarShape.svg"
        />
      </div>
      <div class="h-100 pb-5 mb-5">
        <div
            v-if="
            state.categoryList[categoryIndex].features[featuresIndex].answers
              .length == 0
          "
            class="mt-5"
        >
          <div class="d-flex justify-content-center mt-5">
            <i class="fas fa-box-open fa-6x mt-5"></i>
          </div>
          <p class="text-center mt-5">{{ $t("emptyFolderList") }}</p>
        </div>
        <div
            v-for="(item, index) in state.categoryList[categoryIndex].features[
            featuresIndex
          ].answers"
            :key="item"
            class="uper-card-1 p-3 m-2 smart-text-align"
        >
          <div class="d-flex flex-column">
            <div class="w-100 my-2 text-right">
              <i
                  class="fas fa-trash-alt my-auto ml-3 hover-pointer"
                  @click="
                  deleteFromList(
                    state.categoryList[categoryIndex].features[featuresIndex]
                      .answers,
                    index
                  )
                "
              ></i>
              <span class="my-auto">{{ item.name }}</span>
            </div>
            <div class="d-flex justify-content-end w-75">
              <div class="d-flex w-50">
                <span class="mx-2 my-auto">انتخاب کردن</span>
                <Checkbox
                    :id="item"
                    v-model="item.isSelected"
                    :binary="true"
                    class="my-auto"
                />
              </div>
              <div class="d-flex w-50">
                <span class="my-auto mx-2"> {{ $t("showAnswerForAll") }}</span>
                <Checkbox
                    :id="item"
                    v-model="item.isShowOuted"
                    :binary="true"
                    class="my-auto"
                />
              </div>
            </div>
          </div>
        </div>
        <div
            v-if="
            state.categoryList[categoryIndex].features[featuresIndex].answers
              .length > 0
          "
            class="w-100 text-center answer-btn"
        >
          <button class="btn rounded color-costum w-50 mt-3" @click="addThis">
            {{ $t("submit") }}
          </button>
        </div>
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
            @click="addAnswerDialog = !addAnswerDialog"
        >
          +
        </button>
      </div>
    </Dialog>

    <Dialog
        v-model:visible="addAnswerDialog"
        :breakpoints="{
        '2800px': '65vw',
        '1280px': '65vw',
        '1000px': '65vw',
        '800px': '65vw',
        '600px': '91vw',
      }"
        :contentStyle="{
        background: 'rgb(255, 255, 255)',
        borderRadius: '12px',
        maxWidth: '512px',
      }"
        :showHeader="false"
        :style="{ border: 'none', maxWidth: '512px' }"
        dismissableMask
        header=""
        modal
    >
      <div class="p-2">
        <div class="p-3 m-2 smart-text-align">
          <div class="d-flex align-items-center justify-content-between w-100">
            {{ $t("answers") }}
            <i class="fa fa-plus hover-pointer" @click="addAnswer()"></i>
          </div>
          <div v-for="(item , index) in newAnswerNames" :key="index"
               class="d-flex justify-content-between align-items-center my-2 w-100">
            <input
                v-model="item.name"
                :placeholder="$t('answer')"
                class="form-control border-radius-10px py-3 inputs"
                type="text"
            />
            <i class="fa fa-trash text-danger mx-1 hover-pointer" @click="removeAnswer(index)"></i>
          </div>
        </div>

        <div class="w-100 text-center">
          <button
              class="btn rounded color-costum w-50 mt-3"
              @click="addAnswerToList"
          >
            {{ $t("apply") }}
          </button>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>
import {ref} from "vue";
import PageCategoriesScreen from "@/app/unit/shared/pageCategories/PagesCategoriesScreen";
import {CategoryOfWorkPageState} from "./CategoryOfWorkPageState";
import bottomBar from "@/app/public/shared/bottomBar/BottomBar.vue";
import {ToastService} from "@/core/service/toast.service";
import {i18n} from "@/main";
import {useConfirm} from "primevue/useconfirm";
import ConfirmDialog from "primevue/confirmdialog";

export default {
  components: {
    PageCategoriesScreen,
    bottomBar,
    ConfirmDialog,
  },
  props: ["model"],
  setup(props, {emit}) {
    const displayAddFeature = ref(false);
    const showFilterCategories = ref(false);
    const pageCategory = ref(null);
    const catId = ref();
    const state = ref(new CategoryOfWorkPageState());
    const categoryIndex = ref();
    const displayAnswers = ref(false);
    const featuresIndex = ref();
    const checked = ref(false);
    const addFeaturesDialog = ref(false);
    const newFeatureName = ref("");
    const newAnswerNames = ref([]);
    const addAnswerDialog = ref(false);
    const confirm = useConfirm();

    function getCategory(item) {
      if (item.postData.catName5 == null) {
        item.selectedLevel.categoryId = -Math.abs(item.selectedLevel.categoryId);
      }
      if (state.value.categoryList.length < 5) {
        state.value.categoryList.push({
          catName: item.selectedLevel.title,
          catId: item.selectedLevel.categoryId,
          features: [],
        });
      }
    }

    const displayAddFeatureFunc = (Id, index) => {
      catId.value = Id;
      categoryIndex.value = index;
      if (state.value.categoryList[categoryIndex.value].features.length == 0) {
        state.value.GetFeatureByCategoryId(catId.value, categoryIndex.value);
      }
      displayAddFeature.value = true;
    }

    const nextStepFunc = () => {
      if (state.value.categoryList.length == 0) {
        ToastService.getInstance().error(i18n.global.tc("oneCategoriesMin"));
        return;
      }
      let hasAnswer = false;
      console.log('state.value.categoryList')
      console.log(state.value.categoryList)
      for (let i = 0; i < state.value.categoryList.length; i++) {
        if (hasAnswer) break;
        for (let j = 0; j < state.value.categoryList[i].features.length; j++) {
          let notExistEmptyAnswer = state.value.categoryList[i].features[j].answers.find(m => m.isSelected == true);
          if (notExistEmptyAnswer) {
            hasAnswer = true;
            break;
          }
        }
      }
      if (!hasAnswer) {
        ToastService.getInstance().error(i18n.global.tc("selectMinOneFeatureAndOneAnswer"));
        return;
      }
      emit("updateStepFive", state.value.categoryList);
    }


    function displayAnswerFunc(index) {
      featuresIndex.value = index;
      displayAddFeature.value = false;
      displayAnswers.value = !displayAnswers.value;
    }

    function addThis() {
      displayAnswers.value = false;
    }

    function addFeatureToList() {
      if (newAnswerNames.value.length == 0) {
        ToastService.getInstance().error(i18n.global.tc("empty-answer"))
        return;
      }
      let existInvalid = newAnswerNames.value.findIndex(m => m.name.trim().length < 3);
      if (existInvalid != -1) {
        ToastService.getInstance().error(i18n.global.tc("answerIndexMinLengthValidation", {index: existInvalid + 1}))
        return;
      }
      if (newFeatureName.value.trim().length < 3) {
        ToastService.getInstance().error(i18n.global.tc("featureNameMinLength"))
        return;
      }
      const addFeatureModel = {
        categoryId: state.value.categoryList[categoryIndex.value].catId,
        answers: newAnswerNames.value,
        name: newFeatureName.value
      }
      state.value.addFeature(addFeatureModel, (val) => {
        state.value.categoryList[categoryIndex.value].features.push(val);
        newFeatureName.value = '';
        newAnswerNames.value = [];
        addFeaturesDialog.value = false;
      });
    }

    function addAnswerToList() {
      if (newAnswerNames.value.length == 0) {
        ToastService.getInstance().error(i18n.global.tc("empty-answer"))
        return;
      }
      let existInvalid = newAnswerNames.value.findIndex(m => m.name.trim().length < 3);
      if (existInvalid != -1) {
        ToastService.getInstance().error(i18n.global.tc("answerIndexMinLengthValidation", {index: existInvalid + 1}))
        return;
      }
      const data = {
        answers: newAnswerNames.value,
        featureId: state.value.categoryList[categoryIndex.value].features[featuresIndex.value].featureId,
      };
      state.value.addAnswers(data, (val) => {
        newAnswerNames.value = [];
        addAnswerDialog.value = false;
        state.value.categoryList[categoryIndex.value].features[featuresIndex.value].answers.push(...val);
      });
    }

    const deleteFromList = (list, index) => {
      confirm.require({
        message: i18n.global.tc("delete?"),
        acceptLabel: i18n.global.tc("yes"),
        rejectLabel: i18n.global.tc("no"),
        acceptClass: "p-button-danger ",

        accept: () => {
          list.splice(index, 1);
        },
        reject: () => {
        },
      });
    }

    function addAnswer() {
      let existInvalid = newAnswerNames.value.findIndex(m => m.name.trim().length < 3);
      if (existInvalid != -1) {
        ToastService.getInstance().error(i18n.global.tc("answerIndexMinLengthValidation", {index: existInvalid + 1}))
        return;
      }
      newAnswerNames.value.push({name: ''})
    }

    function removeAnswer(index) {
      newAnswerNames.value.splice(index, 1);
    }

    return {
      showFilterCategories,
      displayAddFeature,
      pageCategory,
      state,
      catId,
      categoryIndex,
      displayAnswers,
      featuresIndex,
      checked,
      addFeaturesDialog,
      newFeatureName,
      newAnswerNames,
      addAnswerDialog,
      addFeatureToList,
      displayAnswerFunc,
      displayAddFeatureFunc,
      nextStepFunc,
      getCategory,
      addThis,
      addAnswerToList,
      deleteFromList,
      addAnswer,
      removeAnswer,
    };
  },
};
</script>

<style scoped>

p, span {
  font-size: 13px;
}

.dtn-bg {
  background-color: #579bfc;
}


.answer-btn {
  position: absolute;
  bottom: 5%;
}

.new-ticket {
  width: 510px;
  bottom: 3%;
  z-index: 20;
}

@media only screen and (max-width: 500px) {
  .new-ticket {
    width: 95%;
  }
}

.color-costum {
  background-color: rgb(197, 228, 231);
}

.shape-text {
  position: absolute;
  top: 10px;
  font-size: 16px;
}

.header-title {
  text-align: center;
  width: 100%;
  position: absolute;
}

.header-shape {
  width: 288px;
}

.show-btn {
  border-radius: 11px;
  box-shadow: 1px 0 4px #ada5a55e;
  border: 1px solid #c5c0c04d;
  font-size: 14px;
  outline: none !important;
}

.float-btn {
  bottom: 70px !important;

}
</style>
