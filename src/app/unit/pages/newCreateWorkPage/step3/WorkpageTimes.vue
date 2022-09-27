<template>
  <div class="animate__animated animate__fadeIn pb-5 p-2">
    <div
        v-for="(item, index) in times"
        :key="index"
        class="
        card
        uper-card-1
        w-100
        mx-auto
        my-1
        p-3
        smart-text-align
        hover-pointer hover-bg-primary
      "
        @click="openDay(index)"
    >
      <p class="text-secondary">
        <span class="text-info">⦿ </span> {{ item.titleDayOfWeek }}
      </p>
      <div v-if="item.statusType == 4">
        <p v-for="(time, index) in item.times" :key="time">
          <span>{{
              $t("shiftNumber") + " " + getShift(index + 1) + " : "
            }}</span>
          {{ time.startTime + ` ${$t("to")} ` + time.endTime }}
        </p>
      </div>
      <div v-if="item.statusType == 3">{{ $t("unknown") }}</div>
      <div v-if="item.statusType == 2">{{ $t("dormitory") }}</div>
      <div v-if="item.statusType == 1">{{ $t("closed") }}</div>
    </div>
    <Textarea
        v-model="description"
        :autoResize="true"
        :placeholder="$t('description')"
        class="
        w-100
        border-0
        bg-light
        text-decoration-none
        uper-card-1
        p-10px
        mt-2
      "
        cols="30"
        rows="2"
    />
    <bottomBar>
      <button
          class="btn dtn-bg text-light rounded-pill px-5 py-1"
          @click="confirm"
      >
        {{ $t("submit") }}
      </button>
    </bottomBar>

    <Dialog
        v-model:visible="showModalDay"
        :breakpoints="{
        '1200px': '45vw',
        '950px': '60vw',
        '320px': '100vw',
        '450px': '85vw',
      }"
        :contentStyle="{ background: 'rgb(255, 255, 255)'}"
        :showHeader="false"
        dismissableMask
        header=""
        modal
    >
      <TimesOfDayDialog
          :dayData="times[selectedDayIndex]"
          @updated="updateDay"
      ></TimesOfDayDialog>
    </Dialog>
  </div>
</template>

<script lang="ts">
import {ref} from "vue";
import TimesOfDayDialog from "./TimesOfDayDialog.vue";
import {ToastService} from "@/core/service/toast.service";
import {i18n} from "@/main";
import bottomBar from "@/app/public/shared/bottomBar/BottomBar.vue";
import Textarea from "primevue/textarea";

export default {
  props: ["model"],
  components: {
    TimesOfDayDialog,
    bottomBar,
    Textarea,
  },
  setup(props, {emit}) {
    const selectedDayIndex = ref(0);
    const model = ref(props.model);
    const times = ref(model.value.times);
    const showModalDay = ref(false);
    const description = ref("");

    function getShift(index) {
      switch (index) {
        case 1:
          return i18n.global.tc("first");
        case 2:
          return i18n.global.tc("seconds");
        case 3:
          return i18n.global.tc("third");
      }
    }

    function openDay(index) {
      selectedDayIndex.value = index;
      showModalDay.value = true;
    }

    function updateDay(e) {
      if (e.isSelectForAllDay) {
        for (let i = 0; i < times.value.length; i++) {
          times.value[i].statusType = e.data.statusType;
          times.value[i].times = e.data.times.slice();
        }
      } else {
        times.value[selectedDayIndex.value] = {...e.data};
      }
      times.value = times.value.slice();
      showModalDay.value = false;
    }

    function confirm() {
      let existStatusNull = times.value.find(
          (m) => m.statusType == 4 && m.times.length == 0
      );
      if (existStatusNull) {
        ToastService.getInstance().warning(
            i18n.global.tc("selectMinimumOneTimeForDay", {
              day: existStatusNull.titleDayOfWeek,
            })
        );
        return;
      }
      emit("updated", model.value);
    }

    return {
      selectedDayIndex,
      times,
      showModalDay,
      openDay,
      updateDay,
      description,
      confirm,
      getShift,
    };
  },
};
</script>

<style scoped>


p, span, div, Button, textarea {
  font-size: 13px !important;
}

.dtn-bg {
  background-color: #579bfc;
}

.p-dialog {
  border: 0 !important;
}

.btn-w {
  width: 128px;
}

.p-10px {
  padding: 10px !important;
}
</style>
