<template>
  <div class="d-flex justify-content-center">
    <input class="form-control mb-2 costum-input " placeholder="place">
  </div>
  <div class="d-flex justify-content-center">
    <input class="form-control mb-2 costum-input " placeholder="place">
  </div>
  <div class="d-flex justify-content-center">
    <input class="form-control mb-2 costum-input " placeholder="place">
  </div>

  <div class="d-flex justify-content-center container">
    <div class="get-image-wrap bg-light  row">
      <div class="col-12 px-1 mx-0 d-flex mt-3 justify-content-between">  <!--main pic-->
        <div class="hide-input">
          <input ref="mainImageInp" accept="image/*" type="file" @change="onFileChange($event, 1)"/>
        </div>
        <div class="col-4">{{ $t("mainphotos") }}</div>
        <template v-if="mainPhotoFile === ''">
          <div class="col-8 reverse-smart-text-align px-0 mx-0">
            <div class="main-pic-item mx-2 " @click="pushPhotoPlace(1)">
              {{ $t("addPhoto") }}
            </div>
          </div>
        </template>

        <template v-else>
          <div class="main-pic-item p-0">
            <img v-lazy="mainPhotoFile" alt="" class="image-style" @click="pushPhotoPlace(1)"/>
          </div>
        </template>
      </div>

      <div class="col-12 mt-3 d-flex px-1 mx-0 justify-content-between">  <!--other pics-->
        <div class="hide-input">
          <input
              ref="InputOtherImage" accept="image/*" multiple type="file" @change="onFileChange($event, 2)"/>
        </div>
        <div class="col-4"> {{ $t("otherPhoto") }}</div>
        <div class="col-8 reverse-smart-text-align px-0 mx-0">
          <div class="other-pics mx-2 " @click="pushPhotoPlace(2)">
            {{ $t("otherPhoto") }}
          </div>
        </div>
      </div>
      <div class="row smart-text-align px-0 mx-0 w-100">
        <div v-for="item in otherPhotoFiles" :key="item" class="col-4 my-2">
          <imageItem :item="item" :type="2" @DeleteImage="(event) => DeleteImage(event)"
                     @upgradeImage="(event) => upgradeImage(event)"/>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {ref, onMounted} from "vue";
import {i18n} from "@/main";
import {ToastService} from "@/core/service/toast.service";
import {convertFileTOBase64} from "@/core/service/utils.service";
import imageItem from "../imageItemScreen";

export default {
  name: "noneVehicleSection",
  components: {
    imageItem
  },
  setup() {

    const mainImageInp = ref(null);
    const InputOtherImage = ref(null)
    const mainPhotoFile = ref("");
    const otherPhotoFiles = ref([]);

    function onFileChange(e, params) {
      if (e.target.files.length === 0) return;
      if (params === 1) {
        convertFileTOBase64(e.target.files[0], (base64) => {
          mainPhotoFile.value = base64;
        })
      } else {
        if (e.target.files.length + otherPhotoFiles.value.length <= 18) {
          for (let i = 0; i < e.target.files.length; i++) {
            convertFileTOBase64(e.target.files[i], (base64) => {
              otherPhotoFiles.value.push({file: base64});
            })
          }
        } else {
          ToastService.getInstance().error(i18n.global.tc("Max18"));
        }
      }
    }

    function pushPhotoPlace(params) {
      if (params === 1) {
        mainImageInp.value.click();
      } else {
        InputOtherImage.value.click();
      }
    }

    function upgradeImage(file) {
      mainPhotoFile.value = file;
    }

    function DeleteImage(file, i) {
      const list = [];
      for (let x = 0; x < otherPhotoFiles.value.length; x++) {
        if (file !== otherPhotoFiles.value[x].file) {
          list.push(otherPhotoFiles.value[x]);
        }
      }
      otherPhotoFiles.value = list;
    }

    onMounted(() => {

    })
    return {

      mainImageInp,
      pushPhotoPlace,
      InputOtherImage,
      onFileChange,
      mainPhotoFile,
      otherPhotoFiles,
      upgradeImage,
      DeleteImage
    }
  }
}
</script>

<style scoped>

.costum-input {
  width: 92%;
  height: 46px;
  border-radius: 7px;
}

.get-image-wrap {
  width: 97%;

  border-radius: 10px;
  box-shadow: 0px 0px 4px 2px #dfdfdfba;
  padding-bottom: 17px;
}

.hide-input {
  height: 0;
  width: 0;
  overflow: hidden;
}

.main-pic-item {
  width: 87%;
  height: 161px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /*box-shadow: 0 0 3px var(--color-dark);*/
  font-size: 15px;
  color: var(--color-medium-dark);
  border-radius: 10px;
  cursor: pointer;
  padding: 10px;
  background-color: #c9e7eaeb;
  transition: all 0.2s ease-in-out;
}

.main-pic-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 0 3px var(--color-dark);
}


.other-pics {
  width: 67%;
  height: 46px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* box-shadow: 0 0 3px var(--color-dark); */
  font-size: 15px;
  color: var(--color-medium-dark);
  border-radius: 10px;
  cursor: pointer;
  padding: 10px;
  background-color: #c9e7eaeb;
  transition: all 0.2s ease-in-out;
}

.other-pics:hover {
  transform: translateY(-3px);
  box-shadow: 0 0 3px var(--color-dark);
}

.image-style {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}


</style>
