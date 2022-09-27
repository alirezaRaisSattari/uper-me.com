<template>
  <div>
    <h5 class="smart-text-align font-15">{{ $t("mainPhoto") }}</h5>
    <div class="row dl">
      <div class="col-4 my-2">
        <div class="hide-input">
          <input
              ref="InputProfileImage"
              accept="image/*"
              type="file"
              @change="onFileChange($event, 1)"
          />
          <input
              ref="InputOtherImage"
              accept="image/*"
              multiple
              type="file"
              @change="onFileChange($event, 2)"
          />
        </div>
        <template v-if="mainPhotoFile === ''">
          <div :disabled="disableBtn" class="main-pic-item" @click="pushPhoto(1)">
            <span class="d-block font-24">
              <i class="far fa-image"></i>
            </span>
            <span class="d-block text-center">{{ $t("addPhoto") }}</span>
          </div>
        </template>
        <template v-else>
          <div class="main-pic-item p-0">
            <img v-lazy="mainPhotoFile" alt="" class="image-style" @click="pushPhoto(1)"/>
          </div>
        </template>
        <Button
            :label="$t('addPhoto')"
            class="p-button-raised custom-push-btn w-100"
            @click="pushPhoto(2)"

        />
      </div>

      <div v-if="otherPhotoFiles.length !== 0" class="col-12 mt-2">
        <span class="smart-text-align font-15">{{ $t("otherPhoto") }}</span>
      </div>

      <div v-for="item in otherPhotoFiles" :key="item" class="col-4 my-2">
        <ImageItemProduct :item="item" @DeleteImage="(event) => DeleteImage(event)"
                          @upgradeImage="(event) => upgradeImage(event)"/>
      </div>

      <div v-if="objImageProductModel.progress.valueNow !== 0" class="col-12">
        <div class="progress">
          <div :aria-valuemax="objImageProductModel.progress.valueMax"
               :aria-valuemin="objImageProductModel.progress.valueMin"
               :aria-valuenow="objImageProductModel.progress.valueNow"
               class="progress-bar progress-bar-animated progress-bar-striped bg-info"
               role="progressbar"
               style="width: 50%"></div>
        </div>
      </div>
      <div class="col-12 text-center mt-2 mb-4">
        <Button
            :label="$t('submit')"
            class="p-button-raised p-button-success" iconPos="right"
            type="submit"
            @click="goNextStep"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import ImageItemProduct from "./imageItem/ImageItemProduct";
import {ImageProductModel} from "./ImageProductModel";
import {convertFileTOBase64} from "../../../../core/service/utils.service";
import {ToastService} from "../../../../core/service/toast.service";
import {i18n} from "../../../../main";
import {ProductStore} from "../../../../core/store/product.store";

export default {
  name: "ImagesProduct",
  components: {ImageItemProduct},
  props: ['data'],
  emits: ['passData', 'insertLevel'],
  setup(props, {emit}) {
    const InputProfileImage = ref()
    const InputOtherImage = ref()
    const otherPhotoFiles = ref(props.data.otherPhotos ?? []);
    const mainPhotoFile = ref(props.data.mainPhoto ?? "");
    const objImageProductModel = ref(new ImageProductModel())
    const disableBtn = ref(false);

    onMounted(() => {
      if (ProductStore().images.mainPhoto !== '') {
        disableBtn.value = true
        emit('passData', {
          postData: {
            mainPhoto: ProductStore().images.mainPhoto,
            otherPhotos: ProductStore().images.otherImages
          },
          step: 3,
        });
      }
    })

    function upgradeImage(file) {
      mainPhotoFile.value = file;
    }

    function DeleteImage(file) {
      const list = []
      for (let i = 0; i < otherPhotoFiles.value.length; i++) {
        if (file !== otherPhotoFiles.value[i].file)
          list.push(otherPhotoFiles.value[i])
      }
      otherPhotoFiles.value = list;
    }

    function onFileChange(e, params) {
      if (e.target.files.length === 0) return
      if (params === 1) {
        convertFileTOBase64(e.target.files[0], (base64) => {
          mainPhotoFile.value = base64;
        })
      } else {
        if (e.target.files.length + otherPhotoFiles.value.length <= 18) {
          for (let i = 0; i < e.target.files.length; i++) {
            convertFileTOBase64(e.target.files[i], (base64) => {
              otherPhotoFiles.value.push({file: base64})
            })
          }
        } else
          ToastService.getInstance().error(i18n.global.tc("Max18"))
      }
    }

    function pushPhoto(params) {
      if (params === 1)
        InputProfileImage.value.click()
      else
        InputOtherImage.value.click()
    }

    function goNextStep() {
      if (mainPhotoFile.value === '') {
        ToastService.getInstance().warning(i18n.global.tc("mainPhotoNotSelected"))
        return;
      }
      objImageProductModel.value.uploadMainImage(mainPhotoFile.value, (link) => {
        let image = link;
        if (otherPhotoFiles.value.length !== 0) {

          objImageProductModel.value.uploadOtherImages(otherPhotoFiles.value, (links) => {
            let images = [];
            links.map(link => {
              images.push(link)
            })
            emit('passData', {
              postData: {
                mainPhoto: image,
                otherPhotos: images
              },
              step: 3,
            });
          })
        }
      })

    }

    return {
      InputOtherImage,
      InputProfileImage,
      mainPhotoFile,
      otherPhotoFiles,
      objImageProductModel,
      disableBtn,
      upgradeImage,
      DeleteImage,
      onFileChange,
      pushPhoto,
      goNextStep
    }
  }
}
</script>

<style lang="scss" scoped>
.main-pic-item {
  width: 100%;
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 3px var(--color-dark);
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
  box-shadow: 0 0 3px var(--color-dark);
}

.hide-input {
  height: 0;
  width: 0;
  overflow: hidden;
}

.custom-push-btn {
  box-shadow: 0 0 2px var(--color-dark);
  background: transparent;
  border: none;
  color: var(--color-dark);
  margin-top: 15px;
}

.custom-push-btn:hover {
  background: var(--bg-secondary);
  box-shadow: 0 0 2px var(--bg-secondary);
}

.image-style {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
</style>