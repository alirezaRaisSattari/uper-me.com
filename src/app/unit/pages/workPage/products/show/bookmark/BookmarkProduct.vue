<template>
  <div class="d-flex flex-column justify-content-center align-items-center p-2">
    <Button :label="$t('addFolder')" class="p-button-success p-button-raised align-self-start"
            @click="addFolder"/>
  </div>
  <p class="text-right m-2">{{ $t('select_folder') }}</p>

  <div class="row justify-content-center align-items-center m-2">
    <swiper :direction="'horizontal'"
            :free-mode="true"
            :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
            :slides-per-view="'auto'"
            :space-between="0"
            class="rtl">
      <swiper-slide v-for="(item,index) of state.folderBookmarks" :key="index" class="col-3"
                    @click="state.isSelected=item.folderId">
        <div :class="state.isSelected===item.folderId? 'border-warning':'hover-pointer'"
             class="d-flex justify-content-center uper-card-1 border p-4 m-1">
          <p class="mb-0">{{ item.name }}</p>
        </div>
      </swiper-slide>
    </swiper>
  </div>
  <div v-if="state.isSelected!==null" class="d-flex flex-column justify-content-center align-items-center p-2">
    <Button :label="$t('submit')" class="p-button-success p-button-raised align-self-end"
            @click="submit"/>
  </div>
  <Dialog
      v-model:visible="state.showDialogCreateUpdate"
      :breakpoints="{'1000px': '52vw','800px': '65vw','600px': '91vw',}"
      :dismissableMask="true"
      :header="$t('addFolder')"
      :modal="true">
    <div class="d-flex flex-column justify-content-center align-items-center p-2">
      <input v-model="nameAddFolder" :placeholder="$t('folder_name')" class="form-control" maxlength="40"
             type="text" @keyup.enter="state.createFolderBookmark(nameAddFolder)">
      <Button :label="$t('record')" class="p-button-success p-button-raised my-2"
              @click="state.createFolderBookmark(nameAddFolder)"/>
    </div>
  </Dialog>
</template>

<script>
import {onMounted, ref} from "vue";
import {StateBookmarkProduct} from "@/app/unit/pages/workPage/products/show/bookmark/StateBookmarkProduct";
import {Swiper, SwiperSlide} from "swiper/vue";

export default {
  name: "BookmarkProduct",
  emits: ['passValue'],
  props: {
    productId: Number
  },
  components: {Swiper, SwiperSlide},

  setup(props, {emit}) {
    const state = ref(new StateBookmarkProduct());
    const nameAddFolder = ref('');
    onMounted(() => {
      state.value.getFolderBookmark();
    })

    function addFolder() {
      state.value.showDialogCreateUpdate = true;
    }

    function submit() {
      state.value.bookmarkProduct(props.productId)
      emit('passValue', {showDialog: false, statusBookmark: true})
    }

    return {
      nameAddFolder,
      state,
      addFolder,
      submit
    }
  }
}
</script>

<style scoped>

</style>
