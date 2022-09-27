<template>
  <div>
    <h5 class="text-right font-15">{{ $t("mainPhoto") }}</h5>
    <div class="row dl">
      <div class="col-4 my-2">
        <div class="hide-input">
          <input ref="InputProfileImage" accept="image/*" type="file" @change="onFileChange($event, 1)"/>
          <input ref="InputOtherImage" accept="image/*" multiple type="file" @change="onFileChange($event, 2)"/>
          <input ref="InputDocImage" accept="image/*" type="file" @change="onFileChange($event, 3)"/>
        </div>
        <template v-if="urlProfile === ''">
          <div class="main-pic-item" @click="pushPhoto(1)">
            <span class="d-block font-24">
              <i class="far fa-image"></i>
            </span>
            <span class="d-block">{{ $t("addPhoto") }}</span>
          </div>
        </template>
        <template v-else>
          <div class="main-pic-item p-0">
            <img v-lazy="urlProfile" class="image-style" @click="pushPhoto(1)"/>
          </div>
        </template>
        <Button :label="$t('addPhoto')" class="p-button-raised custom-push-btn w-100" @click="pushPhoto(2)"/>
      </div>

      <div v-if="otherPhotoList.length !== 0" class="col-12 mt-2">
        <h5 class="text-right font-15">{{ $t("otherPhoto") }}</h5>
      </div>

      <div v-for="item in otherPhotoList" :key="item" class="col-4 my-2" let-index>
        <imageItem :item="item" @DeleteImage="(event) => DeleteImage(event , index)"
                   @upgradeImage="(event) => upgradeImage(event)"/>
      </div>

    </div>
    <div v-if="type === 4 || type === 5">
      <hr/>
      <div class="d-flex flex-row mb-3">
        <span class="text-right font-15 flex-50">{{ $t("documentsImages") }}</span>
        <Button :label="$t('addDocument')" class="p-button-raised custom-push-btn add-document" @click="pushPhoto(3)"/>
      </div>
      <div class="row dl mt-4">
        <div v-for="item in docPhotoList" :key="item" class="col-4 my-2" let-index>
          <imageItem :item="item" @DeleteImage="(event) => DeleteImage(event , index)"
                     @upgradeImage="(event) => upgradeImage(event)"/>
          <InputText v-model="item.docName" :placeholder="$t('documentName')" class="input-doc smart-text-align"
                     type="text"
                     @input="submit()"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {onMounted, ref, watch} from "vue";
import imageItem from "./imageItem/imageItemScreen.vue";
import {i18n} from "@/main";
import {ToastService} from "@/core/service/toast.service";
import {convertFileTOBase64} from "@/core/service/utils.service";

export default {
  components: {
    imageItem,
  },
  props: ["data", "type"],
  emits: ["images"],
  setup(props, {emit}) {
    const InputProfileImage = ref();
    const InputOtherImage = ref();
    const InputDocImage = ref();
    const mainPhoto = ref(null);
    const otherPhotoList = ref(props.data.otherPhotos ?? []);
    const docPhotoList = ref(props.data.docPhotoList ?? []);
    const urlProfile = ref(props.data.mainPhoto ?? "");
    const changedMain = ref(false);

    function submit() {
      let list = [];
      if (changedMain.value === true) {
        list.push({file: urlProfile.value});
      } else {
        list.push({link: urlProfile.value});
      }
      otherPhotoList.value.forEach(item => {
        list.push(item);
      });

      emit("images", {
        propList: {oderList: list, docPhotoList: docPhotoList.value}
      });
    }

    onMounted(() => {
      changedMain.value = false;
      if (props.data && props.data.mainPhoto !== '') {
        let list = [];
        list.push({link: urlProfile.value});
        otherPhotoList.value.forEach(item => {
          list.push(item)
        });

        emit("images", {
          propList: {oderList: list, docPhotoList: docPhotoList.value}
        });
      }
    })

    function pushPhoto(params) {

      switch (params) {
        case 1:
          changedMain.value = true;
          InputProfileImage.value.click();
          break;
        case 2:
          InputOtherImage.value.click();
          break;
        case 3:
          InputDocImage.value.click();
          break;
      }
    }

    function onFileChange(e, params) {
      if (e.target.files.length === 0) return;
      switch (params) {
        case 1:
          convertFileTOBase64(e.target.files[0], (base64) => {
            urlProfile.value = base64;
          })
          break;
        case 2:
          if (e.target.files.length + otherPhotoList.value.length <= 18) {
            for (let i = 0; i < e.target.files.length; i++) {
              convertFileTOBase64(e.target.files[i], (base64) => {
                otherPhotoList.value.push({
                  file: base64
                });
              })
            }
          } else {
            ToastService.getInstance().error(i18n.global.tc("Max18"));
          }
          break;
        case 3:
          convertFileTOBase64(e.target.files[0], (base64) => {
            docPhotoList.value.push({
              file: base64
            });
          })
          break;
      }
    }

    function upgradeImage(file) {
      urlProfile.value = file;
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

    watch(
        () => urlProfile.value,
        () => {
          submit();
        }
    );

    return {
      submit,
      mainPhoto,
      otherPhotoList,
      onFileChange,
      urlProfile,
      InputProfileImage,
      InputDocImage,
      pushPhoto,
      docPhotoList,
      InputOtherImage,
      upgradeImage,
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

.flex-50 {
  flex: 50%;
}

.add-document {
  position: absolute;
  padding: 10px 30px;
  box-shadow: 0 0 5px var(--bg-secondary) !important;
  left: 10px;
  margin: 0;

  &:focus {
    box-shadow: 0 0 5px #212121 !important;
  }
}

.input-doc {
  padding: 5px !important;
  box-shadow: 0 0 5px #212121 !important;
  margin: 10px 0;
  width: 100%;
  border-radius: 5px;

  &:focus {
    box-shadow: 0 0 5px #212121 !important;
  }
}
</style>
