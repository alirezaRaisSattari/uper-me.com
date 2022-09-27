<template>
  <div class="pb-5 mb-5">
    <!-- <h6 class="header mt-3">{{ $t("editStory") }}</h6>
    <div class="d-flex justify-content-center">
      <img class="header-shape" src="@/assets/img/svg/appbarShape.svg" alt="" />
    </div> -->
    <div class="w-100 uper-card-1 my-3 d-flex flex-column p-2">
      <p class="w-100 text-right">{{ $t("caption") }}</p>
      <input
        v-model="newCaption"
        :placeholder="storyInfo.caption ? storyInfo.caption : $t('caption')"
        class="my-2 form-control"
        type="text"
      />
      <button class="btn w-100 rounded btn-color" @click="updateCaption">
        {{ $t("submit") }}
      </button>
    </div>
    <div class="w-100 uper-card-1 my-3 d-flex flex-column p-2">
      <p class="w-100 text-right">{{ $t("expire_Days") }}</p>
      <datePicker
        v-model="newDate"
        :placeholder="
          storyInfo.expiredTime
            ? date.convertToJalali(storyInfo.expiredTime, false)
            : ''
        "
        :showCurrentDate="false"
        class="form-control my-2 w-100"
      />
      <Calendar
        v-model="newTime"
        :placeholder="
          storyInfo.expiredTime ? date.getJalaliTime(storyInfo.expiredTime) : ''
        "
        :timeOnly="true"
        :timeshow="true"
        class="form-control my-2"
      />
      <button class="btn w-100 rounded btn-color" @click="updateTime">
        {{ $t("submit") }}
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { MainPageStoriesState } from "./MainPageStoriesState";
import { getSelectedPageId } from "../../../../../core/service/utils.service";
import { ToastService } from "../../../../../core/service/toast.service";
import { DateService } from "../../../../../core/service/date.service";
import DatePicker from "@/app/unit/shared/datePicker/datePickerPageScreen";
import Calendar from "primevue/calendar";

export default {
  name: "updateStory",
  components: { DatePicker, Calendar },
  props: {
    storyInfo: {
      type: Object,
      required: true,
    },
    storyId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const state = ref(new MainPageStoriesState());
    const date = ref(new DateService());
    const newCaption = ref("");
    const newDate = ref(null);
    const newTime = ref(null);

    function updateCaption() {
      if (newCaption.value.length > 0) {
        let model = {
          storyId: props.storyId,
          caption: newCaption.value,
          pageId: Math.abs(getSelectedPageId()),
        };
        state.value.updateCaption(model);
      } else
        ToastService.getInstance().warning(i18n.global.tc("titleNotEmpty"));
    }

    function updateTime() {
      let model = {
        storyId: props.storyId,
        time: date.value.getDateWithTime(newDate.value, newTime.value),
        pageId: getSelectedPageId(),
      };
      state.value.updateTime(model);
    }
    return { newCaption, updateCaption, date, newDate, newTime, updateTime };
  },
};
</script>

<style scoped>
.header {
  text-align: center;
  width: 100%;
}

.header-shape {
  width: 288px;
}

.btn-color {
  background: #c1e1e5;
}

.width45 {
  width: 45%;
}
</style>
