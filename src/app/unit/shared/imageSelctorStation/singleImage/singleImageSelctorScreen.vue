<template>
  <div class="single-image-controller">
    <div class="hide-input">
      <input ref="inputImage" accept="image/*" type="file" @change="onFileChange($event)"/>
    </div>
    <template v-if="imageSrc === null">
      <div class="main-pic-item p-0">
        <img v-lazy="require('@/assets/img/svg/empty_images.svg')" alt="img" @click="pushPhoto()">
      </div>
    </template>
    <template v-else>
      <div class="main-pic-item p-0">
        <img v-lazy="imageSrc" class="image-style" @click="pushPhoto()"/>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import {ref} from 'vue';
import {convertFileTOBase64} from '@/core/service/utils.service';

export default {
  props: {
    imageSrc: String
  },
  emits: ['callBack'],
  setup(props, {emit}) {
    const inputImage = ref();
    const imageSrc = ref(props.imageSrc ?? null);

    function pushPhoto() {
      inputImage.value.click();
    }

    function onFileChange(e) {
      if (e.target.files.length === 0) return;
      convertFileTOBase64(e.target.files[0], (base64) => {
        imageSrc.value = base64;
        emit("callBack", imageSrc.value);
      })
    }

    function deleteImage() {
      imageSrc.value = null;
    }


    return {
      inputImage,
      imageSrc,
      pushPhoto,
      deleteImage,
      onFileChange
    }
  }
}
</script>

<style lang="scss" scoped>

.hide-input {
  height: 0px;
  width: 0px;
  overflow: hidden;
}

.single-image-controller {
  padding: 0 5px 5px;

  .main-pic-item {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
  }

  img {
    width: 120px;
    max-height: 100px;
    border-radius: 5px;
  }
}
</style>
