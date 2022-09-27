<template>
  <div class="d-flex flex-column justify-content-center align-items-center p-3">
    <input v-model="modelNameUpdateFolder" :placeholder="nameFolder" autofocus class="form-control my-2"
           type="text" @keyup.enter="updateFolder">
    <Button :label="$t('update')" class="p-button-raised p-button-success" @click="updateFolder"/>
  </div>
</template>

<script>
import {ref} from "vue";
import {StatusProductModel} from "../StatusProductModel";

export default {
  name: "UpdateFolderProduct",
  props: {
    folderId: Number,
    nameFolder: String
  },
  emits: ['passData'],
  setup(props, {emit}) {

    const modelNameUpdateFolder = ref();
    const objStatusProductModel = ref(new StatusProductModel())

    function updateFolder() {
      objStatusProductModel.value.updateFolderProduct(props.folderId, modelNameUpdateFolder.value);
      emit('passData', false);
    }

    return {
      modelNameUpdateFolder,
      updateFolder
    }
  }
}
</script>

<style scoped>

</style>