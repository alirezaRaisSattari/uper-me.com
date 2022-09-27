<template>
  <div class="px-2 my-5">
    <input
      v-model="description"
      :placeholder="$t('description')"
      class="form-control"
      type="text"
    />
    <div class="w-100 my-2 d-flex">
      <span
        id="txt1"
        class="mx-2 p-2 text-card hover-pointer"
        @click="setText('txt1')"
        >{{ $t("inappropriatePhoto") }}</span
      >
      <span
        id="txt2"
        class="mx-2 p-2 text-card hover-pointer"
        @click="setText('txt2')"
        >{{ $t("inappropriateContent") }}</span
      >
    </div>
    <div
      v-if="urlProfile.length === 0"
      class="
        w-100
        add-pic
        d-flex
        align-items-center
        justify-content-center
        p-2
        w-25
        mt-3
        hover-pointer
      "
    >
      <span class="text-center my-auto hover-pointer">
        {{ $t("addPhoto") }}
      </span>
      <input
        accept="image/*"
        class="w-100 h-100 hidden hover-pointer"
        multiple
        type="file"
        @change="onFileChange($event, 1)"
      />
    </div>
    <div v-else class="w-100 my-2 text-center">
      <img v-lazy="urlProfile" alt="" class="selected-image rounded" />
    </div>
    <button class="w-100 my-3 btn add-pic" @click="createReport">
      {{ $t("submit") }}
    </button>
  </div>
</template>

<script>
import { ref } from "vue";
import {
  convertFileTOBase64,
  getSelectedPageId,
} from "@/core/service/utils.service";
import { ReportSate } from "./ReportProblemState";
import { i18n } from "@/main";

export default {
  props: {
    postId: Number,
  },
  emits: ["close"],
  setup(props, { emit }) {
    const State = ref(new ReportSate());
    const description = ref("");
    const urlProfile = ref("");
    const setText = (string) => {
      description.value = document.getElementById(string).innerHTML;
    };

    function onFileChange(e, params) {
      if (e.target.files.length === 0) return;

      if (params === 1) {
        convertFileTOBase64(e.target.files[0], (base64) => {
          urlProfile.value = base64;
        });
      }
    }

    function createReport() {
      if (urlProfile.value != "") {
        State.value.uploadImages(urlProfile.value, (url) => {
          let model = {
            pageId: getSelectedPageId(),
            itemType: 2,
            itemId: props.postId,
            title: i18n.global.tc("report"),
            description: description.value,
            imageUrl: url,
          };
          State.value.CreateReport(model);
        });
      } else {
        let model = {
          pageId: getSelectedPageId(),
          itemType: 2,
          itemId: props.postId,
          title: i18n.global.tc("report"),
          description: description.value,
          imageUrl: null,
        };
        State.value.CreateReport(model, () => {
          emit("close");
        });
      }
    }

    return {
      description,
      setText,
      onFileChange,
      urlProfile,
      State,
      createReport,
    };
  },
};
</script>

<style scoped>
.text-card {
  box-shadow: 1px 2px 0px #80808073;
  text-align: right;
  font-size: 10px;
  border-radius: 4px;
}

.add-pic {
  background-color: rgb(193, 225, 229);
  border-radius: 8px;
  position: relative;
}

.hidden {
  position: absolute;
  z-index: 9;
  opacity: 0;
}

.selected-image {
  width: 100px;
  height: 100px;
}
</style>
