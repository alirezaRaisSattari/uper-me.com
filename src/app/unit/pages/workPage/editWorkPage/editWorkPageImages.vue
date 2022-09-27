<template>
  <div>
    <div class="p-3 text-right uper-card-1 bg-white">
      {{ $t("addTicket") }}
    </div>
    <div class="mx-2">
      <p class="mt-2 text-right">
        {{ $t("importanceOfTheTopic") }}
      </p>

      <div class="d-flex justify-content-center">
        <div
          id="3"
          :class="state.ticketPriority == 3 ? 'selected-importance' : 'border'"
          class="
            d-flex
            flex-column
            align-items-center
            justify-content-center
            btn
            w-25
            py-3
            mx-2
            div-Importance
          "
          @click="state.ticketPriority = 3"
        >
          <img alt="" class="img-importance mt-2" src="@/assets/img/low.svg" />
          <span class="text-center my-2">
            {{ $t("low") }}
          </span>
        </div>

        <div
          id="2"
          :class="state.ticketPriority == 2 ? 'selected-importance' : 'border'"
          class="
            d-flex
            flex-column
            align-items-center
            justify-content-center
            btn
            w-25
            mx-2
            py-3
            div-Importance
          "
          @click="state.ticketPriority = 2"
        >
          <img
            alt=""
            class="img-importance mt-2"
            src="@/assets/img/medium.svg"
          />

          <span class="text-center my-2">
            {{ $t("medium") }}
          </span>
        </div>

        <div
          id="1"
          :class="state.ticketPriority == 1 ? 'selected-importance' : 'border'"
          class="
            d-flex
            flex-column
            align-items-center
            justify-content-center
            btn
            w-25
            mx-2
            py-3
            div-Importance
          "
          @click="state.ticketPriority = 1"
        >
          <img alt="" class="img-importance mt-2" src="@/assets/img/high.svg" />
          <span class="text-center my-2">
            {{ $t("high") }}
          </span>
        </div>
      </div>
      <p class="text-right my-3">
        {{ $t("selectUnit") }}
      </p>

      <Form v-slot="{ errors }" :validation-schema="loginSchema">
        <input
          v-model="state.ticketSubject"
          :class="{ 'is-invalid': errors.ticketSubject }"
          :placeholder="$t('updateWorkPageImages')"
          class="form-control py-4 px-2 mt-4 p-disabled"
          name="ticketSubject"
          type="text"
        />
        <Field
          v-model="state.descriptionTicket"
          :class="{ 'is-invalid': errors.ticketDescription }"
          :placeholder="$t('ticketDescription')"
          class="form-control py-4 px-2 mt-3 mb-2"
          name="ticketDescription"
          style="text-align: right"
          type="text"
        />
        <div class="text-danger text-sm">
          {{ errors.ticketDescription }}
        </div>
      </Form>
      <div
        class="
          w-100
          d-flex
          justify-content-start
          mt-3
          h-auto
          align-items-center
        "
        style="direction: rtl"
      >
        <div
          class="
            add-pic
            d-flex
            align-items-center
            justify-content-center
            p-2
            w-25
            mt-3
            mx-2
            hover-pointer
          "
        >
          <ratio :ratio="'1/1'">
            <span class="text-center my-auto hover-pointer">
              {{ $t("addmainphotos") }}
            </span>
            <input
              accept="image/*"
              class="w-100 h-100 hidden hover-pointer"
              multiple
              type="file"
              @change="onFileChange($event)"
            />
          </ratio>
        </div>
        <div
          v-for="item in otherPhotoList"
          :key="item"
          class="
            d-flex
            align-items-center
            justify-content-center
            w-25
            mt-3
            mx-2
          "
        >
          <ratio :ratio="'1/1'" class="my-auto">
            <img v-lazy="item" alt="" class="w-100 h-100 rounded main-image" />
          </ratio>
        </div>
      </div>
    </div>
    <div class="row d-flex justify-content-center py-2 mx-2">
      <button
        class="btn btn-light w-25 submit-button header-shadow mb-5"
        type="button"
        @click="submitTicket()"
      >
        {{ $t("submit") }}
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { Field, Form } from "vee-validate";
import * as Yup from "yup";
import { i18n } from "@/main";
import { ToastService } from "@/core/service/toast.service";
import { convertFileTOBase64 } from "@/core/service/utils.service";
import { editWorkPageImagesState } from "./editWorkPageImagesState";
import ratio from "@/app/public/shared/ratio/ratio.vue";
import { ImageUploaderKeys } from "@/core/service/fileUploader.service";

export default {
  name: "createticket",
  components: {
    ref,
    Form,
    Field,
    ratio,
  },
  setup() {
    const state = ref(new editWorkPageImagesState());
    const InputOtherImage = ref();
    const otherPhotoList = ref([]);
    const otherPhotoLink = ref();
    const ticketSubject = ref("");
    const descriptionTicket = ref("");
    const mainImage = ref();

    function sendValue(i) {
      state.value.ticketUnit = i;
    }

    function onFileChange(e) {
      if (e.target.files.length === 0) return;

      if (e.target.files.length + otherPhotoList.value.length <= 3) {
        for (let i = 0; i < e.target.files.length; i++) {
          convertFileTOBase64(e.target.files[i], (base64) => {
            otherPhotoList.value.push(base64);
          });
        }
      } else {
        ToastService.getInstance().error(i18n.global.tc("Max3"));
      }
    }

    const loginSchema = Yup.object().shape({
      ticketDescription: Yup.string()
        .required("Title is required")
        .test(
          "len",
          i18n.global.tc("minimum-three-character", {
            min: 3,
          }),
          (val) => val.length >= 3
        )
        .default(""),
    });

    function submitTicket() {
      if (state.value.ticketPriority == null) {
        ToastService.getInstance().error(
          i18n.global.tc("chooseImportanceOfTheTopic")
        );
        return;
      }
      if (state.value.descriptionTicket.length < 3) {
        ToastService.getInstance().error(i18n.global.tc("characterLimit"));
        return;
      }
      if (!otherPhotoList.value.length) {
        ToastService.getInstance().error(
          i18n.global.tc("chooseAtLeastOnePhoto")
        );
        return;
      }
      state.value.uploadImages(
        otherPhotoList.value,
        (link) => {
          state.value.filesUrl = link;
        },
        ImageUploaderKeys.TICKET
      );
    }

    return {
      descriptionTicket,
      InputOtherImage,
      otherPhotoList,
      loginSchema,
      mainImage,
      state,
      onFileChange,
      submitTicket,
      sendValue,
    };
  },
};
</script>

<style scoped>
.grid-size {
  max-width: 33%;
  max-height: 33%;
}

.add-pic {
  background-color: rgb(193, 225, 229);
  border-radius: 8px;
  position: relative;
}

.selected-importance {
  border: none;
  border: 3px solid rgb(105 234 31);
  /* border: 3px solid rgb(193, 225, 229); */
}

.hidden {
  position: absolute;

  z-index: 9;
  opacity: 0;
}

.div-Importance {
  border-radius: 20px;
}

.img-importance {
  width: 25px;
  height: 25px;
}

.header-shadow {
  box-shadow: 0px 1px 9px #d0cfcfd4;
}

.submit-button {
  border-radius: 10px;
}

.main-image {
  z-index: 4;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: white;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
