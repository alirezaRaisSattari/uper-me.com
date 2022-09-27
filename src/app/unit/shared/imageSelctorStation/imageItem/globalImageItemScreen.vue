<template>
  <div class="single-image-controller">
    <div class="hide-input">
      <input ref="inputImage" accept="image/*" type="file" @change="onFileChange($event)"/>
    </div>
    <template v-if="imageData === null">
      <div class="main-pic-item p-0">
        <img :src="require('@/assets/img/svg/empty_images.svg')" alt="img" @click="pushPhoto()">
      </div>
    </template>
    <template v-else>
      <div class="main-pic-item p-0">
        <img :src="imageData.base64 ?? imageData.link" class="image-style" @click="toggle"/>
        <Menu ref="menu" :model="menuOptions" :popup="true" class="custom-menu"/>

      </div>
    </template>
  </div>
</template>

<script lang="ts">
import {ref} from 'vue';
import {convertFileTOBase64} from '@/core/service/utils.service';
import { CreateWorkPageOtherImageList } from '@/app/unit/pages/newCreateWorkPage/CreateWorkPage.model';
import { i18n } from '@/main';

export default {
  props: {
    item:Object,
    hasUpdate:{
      type:Boolean,
      required:false,
      default:true
    }
  },
  emits: ['callBack' , 'upgradeImage' , 'DeleteImage'],
  setup(props, {emit}) {
    const inputImage = ref();
    let imageData:CreateWorkPageOtherImageList = (props.item ?? null);
    const menu = ref();
    const toggle = (event) => {
      menu.value.toggle(event);
    };
    const pushPhoto = ()  => {
      inputImage.value.click();
    }

    const onFileChange = (e) => {
      if (e.target.files.length === 0) return;
      convertFileTOBase64(e.target.files[0], (base64) => {
        imageData.base64 = base64;
        emit("callBack", imageData);
      })
    }

    const deleteImage = ()  =>{
      imageData = null;
    }

    const menuOptions = props.hasUpdate ? ref([{
      label: i18n.global.tc('setAsMainPhoto'),
      icon: 'far fa-image',
      command: (event) => {
        emit('upgradeImage', props.item);
      }
    },
      {
        label: i18n.global.tc('delete'),
        icon: 'far fa-trash-alt',
        command: (event) => {
          emit('DeleteImage', props.item);
        }
      }
    ]) :  ref([
      {
        label: i18n.global.tc('delete'),
        icon: 'far fa-trash-alt',
        command: (event) => {
          emit('DeleteImage', props.item);
        }
      }
    ]);



    return {
      inputImage,
      imageData,
      pushPhoto,
      deleteImage,
      onFileChange,
      toggle,
      menuOptions,
      menu
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
  overflow: hidden;

  .main-pic-item {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
  }

  img {
    width: 90px;
    height: 90px;
    border-radius: 8px;
    object-fit: cover;
  }
}
</style>
