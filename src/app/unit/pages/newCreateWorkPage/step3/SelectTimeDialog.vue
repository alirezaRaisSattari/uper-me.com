<template>
  <div class="d-flex justify-content-center">
    <div
        class="
        col-6
        text-center
        d-flex
        flex-column
        justify-content-center
        align-items-center
        my-3
      "
    >
      <span class="mb-3">{{ $t("minute") }}</span>
      <button class="btn" @click="plusMinute">
        <i class="fa fa-plus"></i>
      </button>
      <input
          v-model="minute"
          class="input-number form-control no-outline shadow-none z-index-1 my-1"
          type="number"
      />
      <button class="btn" @click="minusMinute">
        <i class="fa fa-minus"></i>
      </button>
    </div>

    <div
        class="
        col-6
        text-center
        d-flex
        flex-column
        justify-content-center
        align-items-center
      "
    >
      <span class="mb-3">{{ $t("hour") }}</span>
      <button class="btn" @click="plusHour">
        <i class="fa fa-plus"></i>
      </button>
      <input
          v-model="hour"
          class="input-number form-control no-outline shadow-none z-index-1 my-1"
          type="number"
      />
      <button class="btn" @click="minusHour">
        <i class="fa fa-minus"></i>
      </button>
    </div>
  </div>

  <div class="d-flex justify-content-center">
    <Button
        :label="$t('record')"
        class="p-button-rounded p-button-secondary my-3 btn-w"
        @click="selectTime"
    />
  </div>
</template>

<script lang="ts">
import {ref} from "vue";

export default {
  props: ["model"],
  setup(props, {emit}) {
    const model = ref(props.model ?? {});
    const hour = ref(model.value.hour ?? 0);
    const minute = ref(model.value.minute ?? 0);

    function selectTime() {
      emit("updated", {
        hour: Number(hour.value),
        minute: Number(minute.value),
      });
    }

    function plusMinute() {
      minute.value++;
      checkHourMinute();
    }

    function minusMinute() {
      minute.value--;
      checkHourMinute();
    }

    function plusHour() {
      hour.value++;
      checkHourMinute();
    }

    function minusHour() {
      hour.value--;
      checkHourMinute();
    }

    function checkHourMinute() {
      if (hour.value < 0 || hour.value > 23)
        if (hour.value < 0) hour.value = 23;
        else hour.value = 0;
      if (minute.value < 0 || minute.value > 59)
        if (minute.value < 0) minute.value = 59;
        else minute.value = 0;
    }

    return {
      model,
      hour,
      minute,
      selectTime,
      plusMinute,
      plusHour,
      minusHour,
      minusMinute,
      checkHourMinute,
    };
  },
};
</script>

<style scoped>
.input-number {
  width: 50px;
  padding: 0;
  margin: 0;
  text-align: center;
}

.btn-w {
  width: 86px;
}

.no-outline {
  outline: none;
}

.z-index-1 {
  z-index: 1;
}
</style>
