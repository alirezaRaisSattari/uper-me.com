<template>
  <div>
    <div class="d-flex flex-row mb-3">
      <span class="text-right font-15">{{ $t("documentsImages") }}</span>
      <div class="hide-input">
        <input ref="InputOtherImage" accept="image/*" type="file" @change="onFileChange($event, 2)"/>
      </div>
      <Button :label="$t('addDocument')" class="p-button-raised custom-push-btn add-document" @click="pushPhoto(2)"/>
    </div>
    <div class="row dl mt-4">
      <div v-for="item in otherPhotoList" :key="item" class="col-4 my-2" let-index>
        <imageItem :item="item" @DeleteImage="(event) => DeleteImage(event , index)"
                   @upgradeImage="(event) => upgradeImage(event)"/>
        <InputText v-model="item.docName" :placeholder="$t('documentName')" class="input-doc smart-text-align"
                   type="text"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {ref, watch} from "vue";
import imageItem from "../imageItem/imageItemScreen.vue";
import {i18n} from "@/main";
import {ToastService} from "@/core/service/toast.service";
import {convertFileTOBase64} from "@/core/service/utils.service";

export default {
  components: {
    imageItem,
  },
  props: ["data"],
  emits: ["images"],
  setup(props, {
    emit
  }) {
    const InputProfileImage = ref();
    const InputOtherImage = ref();
    const mainPhoto = ref(null);
    const otherPhotoList = ref(props.data.otherPhotos ?? []);

    function submit() {
      let list = [];
      otherPhotoList.value.forEach(item => {
        list.push(item)
      });
      emit("images", {
        propList: list
      });
    }

    function pushPhoto(params) {
      if (params === 1) {
        InputProfileImage.value.click();
      } else {
        InputOtherImage.value.click();
      }
    }

    function onFileChange(e, params) {
      if (e.target.files.length === 0) return;


      if (e.target.files.length + otherPhotoList.value.length <= 18) {
        for (let i = 0; i < e.target.files.length; i++) {
          convertFileTOBase64(e.target.files[i], (base64) => {
            otherPhotoList.value.push({
              file: base64,
              docName: ''
            });
          })
        }
      } else {
        ToastService.getInstance().error(i18n.global.tc("Max18"));
      }
    }

    function DeleteImage(file, i) {
      const list = [];
      for (let x = 0; x < otherPhotoList.value.length; x++) {
        if (file !== otherPhotoList.value[x].file) {
          list.push(otherPhotoList.value[x]);
        }
      }
      otherPhotoList.value = [];
      otherPhotoList.value = list;

    }

    watch(
        () => otherPhotoList.value.length,
        () => {
          submit();
        }
    );

    return {
      submit,
      mainPhoto,
      otherPhotoList,
      onFileChange,
      InputProfileImage,
      pushPhoto,
      InputOtherImage,
      DeleteImage,
    };
  },
};
</script>

<style lang="scss" scoped>
.main-pic-item {
  width: 100%;
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 10px var(--color-dark);
  font-size: 15px;
  color: var(--color-medium-dark);
  border-radius: 10px;
  cursor: pointer;
  padding: 10px;
  transition: all 0.2s ease-in-out;
}

.font-24 {
  font-size: 24px;
}

.main-pic-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 0 14px var(--color-dark);
}

.hide-input {
  height: 0px;
  width: 0px;
  overflow: hidden;
}

.custom-push-btn {
  box-shadow: 0 0 5px var(--color-dark);
  background: transparent;
  border: none;
  color: var(--color-dark);
  margin-top: 15px;
}

.custom-push-btn:hover {
  background: var(--bg-secondary);
  box-shadow: 0 0 5px var(--bg-secondary);
}

.image-style {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

.add-document {
  position: absolute;
  padding: 10px 30px;
  box-shadow: 0 0 5px var(--bg-secondary) !important;
  left: 10px;
  margin: 0;

  &:focus {
    box-shadow: none !important;
  }
}

.input-doc {
  padding: 5px !important;
  box-shadow: 0 0 5px #212121;
  margin: 10px 0;
  width: 100%;
  border-radius: 5px;

  &:focus {
    box-shadow: 0 0 5px #212121 !important;
  }
}
</style>
