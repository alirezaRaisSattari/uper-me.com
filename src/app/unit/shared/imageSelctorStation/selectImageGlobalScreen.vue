<template>
  <div class="w-100">
      <div class="main-controller">
          <div class="controller">
              <div class="child">
                  <span class="font-14">{{ $t("mainPhoto") }}</span>
              </div>
              <div class="child">
                <template v-if="urlProfile.link === '' && urlProfile.base64 == null">
                    <div class="main-pic-item" @click="pushPhoto(1)">
                        <span class="d-block font-24">
                        <i class="far fa-image"></i>
                        </span>
                        <span class="d-block">{{ $t("addPhoto") }}</span>
                    </div>
                </template>
                <template v-else>
                    <div class="main-pic-item p-0">
                        <img :src="urlProfile.base64 == null ? urlProfile.link+'_sm.webp' : urlProfile.base64" class="image-style" @click="pushPhoto(1)"/>
                    </div>
                </template>
              </div>
          </div>
          <div class="controller">
              <div class="child">
                  <span>{{$t('addotherphotos')}}</span>
              </div>
              <div class="child">
                  <Button :label="$t('addotherphotos')" class="p-button-info" @click="pushPhoto(2)"/>
              </div>
          </div>
        <swiper :direction="'horizontal'" :free-mode="true" :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
                            :slides-per-view="'auto'" :space-between="15"
                            class="slider">
            <swiper-slide v-for="item in otherPhotoList" :key="item" class="pt-2 mt-1" style="cursor: pointer">
                <imageItem :item="item" :hasUpdate="false" @DeleteImage="(data) => DeleteImage(data)" />
            </swiper-slide>
        </swiper>
      </div>
      <div class="hide-input">
        <input ref="InputProfileImage" accept="image/*" type="file" @change="onFileChange($event, 1)"/>
        <input ref="InputOtherImage" accept="image/*" multiple type="file" @change="onFileChange($event, 2)"/>
      </div>
  </div>
</template>

<script lang="ts">
import {onMounted, reactive, ref, watch} from "vue";
import imageItem from "./imageItem/globalImageItemScreen.vue";
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
    const mainPhoto = ref(null);
    let otherPhotoList = ref(props.data.otherImage ?? []);
    const urlProfile = ref(props.data.mainImage ?? {});
    const changedMain = ref(false);

    const submit = ()  => {
        let list = [];
        list.push(urlProfile.value);
        list.push(...otherPhotoList.value);

        emit("images", {
            propList: {oderList: list}
        });
    }

    onMounted(() => {
      changedMain.value = false;
      if (props.data && props.data.mainImage.link !== '') {
        let list = [];
        list.push(urlProfile);
        list.push(...otherPhotoList.value)

        emit("images", {
          propList: {oderList: list}
        });
      }
    })

    const pushPhoto = (params) =>  {

      switch (params) {
        case 1:
          changedMain.value = true;
          InputProfileImage.value.click();
          break;
        case 2:
          InputOtherImage.value.click();
          break;
      }
    }

    const onFileChange = (e,  params)  => {
      if (e.target.files.length === 0) return;
      
      switch (params) {
        case 1:
          convertFileTOBase64(e.target.files[0], (base64) => {
            urlProfile.value.base64 = base64;
            urlProfile.value.link = "";
          })
          break;
        case 2:
          if (e.target.files.length + otherPhotoList.value.length <= 18) {
            for (let i = 0; i < e.target.files.length; i++) {
              convertFileTOBase64(e.target.files[i], (base64) => {
                otherPhotoList.value.push({
                  base64: base64,
                  progress:0,
                  link:''
                });
              })
            }
          } else {
            ToastService.getInstance().error(i18n.global.tc("Max18"));
          }
          break;
      }
    }

    const DeleteImage = (data)  => {
        otherPhotoList.value = otherPhotoList.value.filter(item =>  item.link !== data.link);
    }

    watch(
        () => otherPhotoList.value.length,
        () => {
          submit();
        }
    );

    watch(
        () => urlProfile.value.base64,
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
      pushPhoto,
      InputOtherImage,
      DeleteImage,
    };
  },
};
</script>

<style lang="scss" scoped>
.font-24 {
  font-size: 24px;
}

.hide-input {
  height: 0px;
  width: 0px;
  overflow: hidden;
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

.main-controller {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 10px;
    .controller {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        width: 100%;
        margin-bottom: 10px;
        .child {
            span {
                font-size: 14px;
                color:#212121;
            }

            button {
                background: #1380df;
                border: none;
                font-size: 14px;
            }
           
        }
    }
}

 .main-pic-item {
    height: 90px;
    width: 90px;
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
    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 0 14px var(--color-dark);
    }
    span {
        text-align: center;
    }
}

.swiper-container {
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
  list-style: none;
  padding-right: 0;
  /*width: 506px !important;*/
}

.swiper-slide {
  width: auto !important;
  padding: 3px !important;
}

.active-route {
  border-radius: 0 !important;
  border-bottom: 2px solid #131313 !important;
}
</style>
