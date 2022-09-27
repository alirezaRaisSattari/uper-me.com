<template>
  <div
      v-for="item of objFeatureProduct.listFeature"
      v-if="objFeatureProduct.listFeature.length !== 0"
      class="row justify-content-between align-items-center p-2 my-1"
  >
    <div
        class="
        col-11
        d-flex
        justify-content-between
        align-items-center
        bg-white
        rounded
        p-2
        border
        shadow-sm
      "
    >
      <p class="mb-0">{{ item.name }}</p>
      <Button
          :disabled="item.isDisable"
          :label="$t('showReplies')"
          class="p-button-raised"
          @click="showAnswer(item.id)"
      />
    </div>
    <i
        :class="[item.isShowFeature ? 'fas fa-eye' : 'fas fa-eye-slash', '']"
        class="col-1"
        @click="changeEye(item.id)"
    ></i>
  </div>

  <div class="my-2">
    <Button
        v-if="objFeatureProduct.listFeature.length !== 0"
        :label="$t('add')"
        class="p-button-info p-button-raised"
        @click="showCreateFeatureWithAnswer"
    />
  </div>

  <Dialog
      v-model:visible="displayCreateFeatureWithAnswer"
      :breakpoints="{ '600px': '30vw' }"
      :dismissableMask="true"
      :header="$t('createFeature')"
      :modal="true"
      :style="{ width: '40vw' }"
  >
    <CreateFeatureWithAnswerProduct
        @passData="(value, list) => listCreateItem(value, list)"
    />
  </Dialog>
  <ShowAnswerProduct
      v-if="displayShowAnswer"
      :feature-id="featureId"
      @passData="(value) => getAnswer(value)"
  />

  <div class="d-flex justify-content-center align-items-center">
    <Button
        :label="$t('continue')"
        class="p-button-raised p-button-danger my-3"
        @click="btnContinue"
    />
  </div>
</template>

<script lang="ts">
import {onMounted, ref} from "vue";
import {ProductStore} from "@/core/store/product.store";
import {FeatureProductModel} from "./FeatureProductModel";
import Dialog from "primevue/dialog";
import ShowAnswerProduct from "./ShowAnswerProduct.vue";
import CreateFeatureWithAnswerProduct from "./CreateFeatureWithAnswerProduct.vue";

export default {
  name: "FeaturesProduct",
  components: {
    CreateFeatureWithAnswerProduct,
    ShowAnswerProduct,
    Dialog,
  },
  emits: ["passAnswer", "passData"],
  setup(props, {emit}) {
    const clsChangeEye = ref("fas fa-eye");
    const objFeatureProduct = ref(new FeatureProductModel());
    const displayShowAnswer = ref(false);
    const displayCreateFeatureWithAnswer = ref(false);
    const listFeatureId = ref(19);
    const featureId = ref();
    const nameFeature = ref();
    onMounted(() => {
      if (ProductStore().categoryId === null) return;
      objFeatureProduct.value.getCategoryFeatureByCategoryId(
          ProductStore().categoryId,
          (item) => {
          }
      );
    });

    function changeEye(id) {
      let item = objFeatureProduct.value.listFeature.find(
          (val) => val.id === id
      );
      item.isShowFeature = item.isShowFeature === false;
      item.isDisable = item.isShowFeature === false;
    }

    function showAnswer(id) {
      featureId.value = id;
      displayShowAnswer.value = true;
    }

    function showCreateFeatureWithAnswer() {
      displayCreateFeatureWithAnswer.value = true;
    }

    function listCreateItem(value) {
      displayCreateFeatureWithAnswer.value = value;
      objFeatureProduct.value.getCategoryFeatureByCategoryId(
          ProductStore().categoryId,
          (item) => {
            objFeatureProduct.value.listFeature = item;
          }
      );
    }

    function showDialog() {
      ProductStore().listFeatureCreate =
          objFeatureProduct.value.listAnswerMulti;
    }

    function btnContinue() {
      emit("passData", {
        step: 4,
        modelFeature: objFeatureProduct.value.modelFeature,
      });
    }

    function getAnswer(value) {
      displayShowAnswer.value = value.display;
      if (value.productFeature) {
        objFeatureProduct.value.modelFeature = value.productFeature;
      }
    }

    return {
      objFeatureProduct,
      clsChangeEye,
      displayShowAnswer,
      displayCreateFeatureWithAnswer,
      listFeatureId,
      nameFeature,
      featureId,
      showAnswer,
      changeEye,
      btnContinue,
      showCreateFeatureWithAnswer,
      listCreateItem,
      showDialog,
      getAnswer,
    };
  },
};
</script>

<style scoped>
</style>
