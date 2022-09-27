<template>
  <div class="d-flex flex-column justify-content-center align-items-center p-3">
    <input v-model="modelNameAddFolder" :placeholder="$t('folderName')" autofocus class="form-control my-2"
           type="text" @keyup.enter="createFolder">
    <Button :label="$t('apply')" class="p-button-raised p-button-success" @click="createFolder"/>
  </div>
</template>

<script>
import {ref} from "vue";
import {ToastService} from "../../../../core/service/toast.service";
import {StatusProductModel} from "./StatusProductModel";

export default {
  name: "AddFolder",
  emits: ['passData'],
  setup(props, {emit}) {
    const modelNameAddFolder = ref('')
    const objStatusProductModel = ref(new StatusProductModel())

    function createFolder() {
      if (modelNameAddFolder.value === '') {
        ToastService.getInstance().error("ابتدا نام پوشه را وارد کنید و مجدد امتحان کنید");
        return
      }
      objStatusProductModel.value.createFolderProduct(modelNameAddFolder.value, (id) => {
        emit('passData', {display: false, name: modelNameAddFolder.value, id: id})
      });
    }

    return {
      modelNameAddFolder,
      createFolder
    }
  }
}
</script>

<style scoped>

</style>