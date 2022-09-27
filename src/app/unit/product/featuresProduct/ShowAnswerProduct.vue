<template>
  <Dialog v-model:visible="displayShowAnswer" :breakpoints="{'600px': '30vw'}" :dismissableMask="true"
          :header="objFeatureProduct.nameFeature"
          :modal="true"
          :style="{width: '40vw'}"
          @hide="hideDialog" @show="showDialog">
    <div class="d-flex flex-column justify-content-center align-items-center shadow-sm rounded bg-white border p-2 m-2">
      <p class="align-self-start mb-0">{{ $t('addReply') }}</p>
      <input v-model="modelAddAnswer" :placeholder="$t('replyMessage')" class="form-control my-2" type="text">
      <Button :label="$t('record')" class="col p-button-raised p-button-info p-3" @click="createAnswer"/>
    </div>
    <div v-for="item of objFeatureProduct.listAnswerMulti" class="shadow-sm rounded border p-2 m-2">
      <div class="d-flex justify-content-between align-items-center">
        <p class="mb-0">{{ item.name }}</p>
        <Checkbox v-model="item.isSelected" :binary="true" @click="selectAnswer(item.id)"/>
      </div>
      <div class="d-flex justify-content-between align-items-center my-1">
        <p class="mb-0 text-warning">{{ $t('showAnswerForAll') }}</p>
        <Checkbox v-model="item.isShowOuted" :binary="true"/>
      </div>
    </div>
    <template #footer>
      <Button :label="$t('submit')" class="col p-button-raised p-button-success p-3" @click="chooseAnswer"/>
    </template>
  </Dialog>

</template>

<script>
import {onMounted, ref} from "vue";
import Checkbox from 'primevue/checkbox';
import {FeatureProductModel} from "./FeatureProductModel";
import {ToastService} from "../../../../core/service/toast.service";
import {ProductStore} from "../../../../core/store/product.store";
import {Dialog} from 'primevue/dialog'

export default {
  name: "ShowAnswerProduct",
  components: {
    Checkbox
  },
  props: {
    featureId: {
      type: Number,
      required: true
    }
  },
  emits: ['passData'],
  setup(props, {emit}) {
    const modelAddAnswer = ref('')
    const modelGlobalCheckBox = ref()
    const modelShowAnswer = ref()
    const objFeatureProduct = ref(new FeatureProductModel())
    const displayShowAnswer = ref(true)

    function createAnswer() {
      if (modelAddAnswer.value === '') {
        ToastService.getInstance().error("ابتدا پاسخ را وارد کنید و مجدد امتخان کنید");
        return
      }
      objFeatureProduct.value.createCategoryFeatureMultiAnswer(modelAddAnswer.value, props.featureId, ProductStore().categoryId);
    }

    function showDialog() {
      objFeatureProduct.value.getCategoryFeatureByCategoryId(ProductStore().categoryId, (item) => {
        objFeatureProduct.value.getAnswer(props.featureId, item);
      })
    }

    function hideDialog() {
      emit('passData', {display: false});
    }

    function selectAnswer(id) {
      const answer = objFeatureProduct.value.listAnswerMulti.find((i) => i.id === id)
      answer.isSelected = true;
      if (answer.isSelected === true) {
        answer.isShowOuted = true
        objFeatureProduct.value.modelFeature.push({
          featureId: props.featureId,
          answerId: answer.id,
          isShowOuted: answer.isShowOuted,
        })

      }
    }

    function chooseAnswer() {
      emit('passData', {display: false, productFeature: objFeatureProduct.value.modelFeature});
    }

    return {
      modelAddAnswer,
      modelGlobalCheckBox,
      modelShowAnswer,
      displayShowAnswer,
      objFeatureProduct,
      createAnswer,
      showDialog,
      hideDialog,
      selectAnswer,
      chooseAnswer
    }
  }
}
</script>

<style scoped>

</style>