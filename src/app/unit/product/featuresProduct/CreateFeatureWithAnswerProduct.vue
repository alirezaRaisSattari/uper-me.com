<template>
  <div class="col">
    <div class="d-flex flex-column shadow-sm rounded-lg border p-3 my-2">
      <p class="text-right">{{ $t('feature') }}</p>
      <input v-model="modelCreateFeature" :disabled="disableCreateFeature" :placeholder="$t('feature')"
             class="form-control border-dark py-2"
             type="text">
      <p class="text-right">{{ $t('answer') }}</p>
      <input v-model="modelCreateAnswer" :placeholder="$t('answer')" class="form-control border-dark py-2" type="text"
             @keyup.enter="createItem">
      <Button :label="$t('submit')" class="p-button-raised p-button-info my-2" @click="createItem"/>
    </div>
  </div>
  <div class="col">
    <div v-for="item of model.answers" v-if="model!==null"
         class="d-flex justify-content-center align-items-center shadow-sm rounded border p-2 my-2 ">
      <p class="mb-0 text-right">{{ item.name }}</p>
    </div>
  </div>
  <div v-if="model!==null" class="row justify-content-center align-items-center p-2 my-2 border-top">
    <Button :label="$t('record')" class="p-button-raised p-button-success" @click="createFeatureWithAnswer"/>
  </div>
</template>

<script>
import {ref} from "vue";
import {ToastService} from "../../../../core/service/toast.service";
import {ProductStore} from "../../../../core/store/product.store";
import {FeatureProductModel} from "./FeatureProductModel";

export default {
  name: "CreateFeatureWithAnswerProduct",
  emits: ['passData'],
  setup(props, {emit}) {
    const disableCreateFeature = ref();
    const modelCreateFeature = ref('')
    const modelCreateAnswer = ref('')
    const answers = ref([]);
    const model = ref(null)
    const objFeatureProductModel = ref(new FeatureProductModel())

    function createItem() {
      if (modelCreateFeature.value === '' || modelCreateAnswer.value === '') {
        ToastService.getInstance().error("ابتدا دو فیلد را پر کنید و مجدد امتحان کنید");
        return
      }
      disableCreateFeature.value = true;
      answers.value.push({name: modelCreateAnswer.value});
      model.value = {
        categoryId: ProductStore().categoryId,
        name: modelCreateFeature.value,
        answers: answers.value
      };
    }

    function createFeatureWithAnswer() {
      if (model.value === null) return;
      objFeatureProductModel.value.createCategoryFeatureWithAnswer(model.value, ProductStore().categoryId)

      emit('passData', false);
    }

    return {
      disableCreateFeature,
      modelCreateFeature,
      modelCreateAnswer,
      model,
      objFeatureProductModel,
      createFeatureWithAnswer,
      createItem
    }
  }
}
</script>

<style scoped>

</style>