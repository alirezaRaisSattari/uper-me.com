<template>
  <div class="animate__animated animate__fadeIn">
    <div class="mx-3 my-2 smart-text-align">
      <p class="text-secondary m-0 p-0"><span class="text-info">⦿ </span> {{ dayData.titleDayOfWeek }}</p>
    </div>
    <hr>

    <div
        v-for="(item, index) in dayData.times"
        :key="index"
        class="d-flex justify-content-center"
    >
      <Button class="p-button-secondary m-1" label="x" @click="deleteTime(index)"/>
      <Button :label="item.startTime == '' ? $t('startTime') : item.startTime" class="p-button-info btn-w m-1"
              @click="openTime(index, true)"/>
      <Button :label="item.endTime == '' ? $t('endTime') : item.endTime" class="p-button-info btn-w m-1"
              @click="openTime(index, false)"/>
    </div>
    <div class="d-flex justify-content-center my-3">
      <Button :label="$t('addNewTime')" class="p-button-rounded p-button-help" icon="fa fa-plus"
              @click="pushNewTime()"/>
    </div>
    <div class="d-flex justify-content-center align-items-center">
      <div class="col-md-3 d-flex align-items-center justify-content-center">
        <label class="my-0 mx-1" for="statusType1">تعطیل</label>
        <input
            id="statusType1"
            :checked="dayData.statusType == 1"
            name="statusType"
            type="radio"
            @change="changeStatusType(1)"
        />
      </div>
      <div class="col-md-3 d-flex align-items-center justify-content-center">
        <label class="my-0 mx-1 px-3" for="statusType2" style="min-width: 102px">شبانه روزی</label>
        <input
            id="statusType2"
            :checked="dayData.statusType == 2"
            name="statusType"
            type="radio"
            @change="changeStatusType(2)"
        />
      </div>
      <div class="col-md-3 d-flex align-items-center justify-content-center">
        <label class="my-0 mx-1" for="statusType3">نامعلوم</label>
        <input
            id="statusType3"
            :checked="dayData.statusType == 3"
            name="statusType"
            type="radio"
            @change="changeStatusType(3)"
        />
      </div>
    </div>
    <div class="d-flex justify-content-center align-items-center">
      <span class="mx-2 my-2">{{ $t("setForAllDay") }}</span>
      <input v-model="isSelectForAllDay" type="checkbox"/>
    </div>

    <div class="d-flex justify-content-center">
      <Button :label="$t('record')" class="p-button-rounded p-button-secondary my-3 btn-w" @click="confirm"/>
    </div>

    <Dialog
        v-model:visible="showModalTime"
        :breakpoints="{
          '1200px': '45vw',
          '950px': '60vw',
          '320px': '100vw',
          '450px': '85vw',
      }"
        :showHeader="false"
        :style="{ background: 'rgb(255, 255, 255)' , borderRadius: '12px', maxWidth: '12rem' }"
        dismissableMask
        header=""
        modal
    >
      <SelectTimeDialog
          :model="selectedTimeModel"
          @updated="changeTime"
      ></SelectTimeDialog>
    </Dialog>
  </div>
</template>

<script lang="ts">
import {ref} from "vue";
import SelectTimeDialog from "./SelectTimeDialog.vue";
import {CreateWorkPageDatesTime} from "../CreateWorkPage.model";
import {ToastService} from "@/core/service/toast.service";
import {i18n} from "@/main";

export default {
  props: ["dayData"],
  components: {
    SelectTimeDialog,
  },
  setup(props, {emit}) {
    const dayData = ref({...props.dayData});
    dayData.value.times = props.dayData.times.slice();
    const startTime = ref();
    const endTime = ref();
    const showModalTime = ref(false);

    const selectedTimeIndex = ref(0);
    const selectedTimeIsStart = ref(false);
    const selectedTimeModel = ref(null);
    const isSelectForAllDay = ref(false);

    function openTime(index, isStart: boolean) {
      selectedTimeIndex.value = index;
      selectedTimeIsStart.value = isStart;

      if (isStart) {
        if (dayData.value.times[index].startTime == "") {
          selectedTimeModel.value = {hour: 0, minute: 0};
        } else {
          selectedTimeModel.value = {
            hour: Number(dayData.value.times[index].startTime.split(":")[0]),
            minute: Number(dayData.value.times[index].startTime.split(":")[1]),
          };
        }
      } else {
        if (dayData.value.times[index].endTime == "") {
          selectedTimeModel.value = {hour: 0, minute: 0};
        } else {
          selectedTimeModel.value = {
            hour: Number(dayData.value.times[index].endTime.split(":")[0]),
            minute: Number(dayData.value.times[index].endTime.split(":")[1]),
          };
        }
      }

      showModalTime.value = true;
    }

    function changeTime(e) {
      if (selectedTimeIsStart.value) {
        dayData.value.times[selectedTimeIndex.value].startTime = `${getLessTen(
            e.hour
        )}:${getLessTen(e.minute)}`;
      } else {
        dayData.value.times[selectedTimeIndex.value].endTime = `${getLessTen(
            e.hour
        )}:${getLessTen(e.minute)}`;
      }
      showModalTime.value = false;
    }

    function getLessTen(val) {
      return val < 10 ? `0${val}` : val;
    }

    function pushNewTime() {
      if (dayData.value.times.length == 3) {
        ToastService.getInstance().warning(i18n.global.tc("Max3"));
        return;
      }
      dayData.value.statusType = 4;
      dayData.value.times.push(new CreateWorkPageDatesTime());
    }

    function deleteTime(index) {
      dayData.value.times.splice(index, 1);
    }

    function changeStatusType(statusType) {
      dayData.value.statusType = statusType;
      dayData.value.times = [];
    }

    function confirm() {
      if (dayData.value.statusType == 4) {
        for (let i = 0; i < dayData.value.times.length; i++) {
          const x = dayData.value.times[i];
          if (x.startTime == "" && x.endTime == "") {
            dayData.value.times.splice(i, 1);
          }
        }

        for (let i = 0; i < dayData.value.times.length; i++) {
          const x = dayData.value.times[i];
          if (x.startTime == "" || x.endTime == "") {
            ToastService.getInstance().warning(
                i18n.global.tc("timeIndexIsInvalid", {index: i + 1})
            );
            break;
          } else {
            let validate = validateOnTime(dayData.value.times[i], i + 1);
            if (typeof validate == "string") {
              ToastService.getInstance().warning(validate);
              break;
            }
          }
          if (i == dayData.value.times.length - 1) {
            emit("updated", {
              isSelectForAllDay: isSelectForAllDay.value,
              data: dayData.value,
            });
          }
        }
      } else {
        emit("updated", {
          isSelectForAllDay: isSelectForAllDay.value,
          data: dayData.value,
        });
      }
    }

    function validateOnTime(time: CreateWorkPageDatesTime, index: number) {
      let start = stringToMinutes(time.startTime);
      let end = stringToMinutes(time.endTime);

      if (start == end) {
        return `زمان های تایم ${index} نمی تواند برابر باشند`;
      }

      if (start > end) {
        return `زمان شروع ${index} باید کوچکتر از زمان پایان ${index} باشد`;
      }

      if (dayData.value.times.length == 0) {
        return;
      }

      for (let i = 0; i < index - 1; i++) {
        let lastStart = stringToMinutes(dayData.value.times[i].startTime);
        let lastEnd = stringToMinutes(dayData.value.times[i].endTime);
        if (
            (start >= lastStart && start <= lastEnd) ||
            (end <= lastEnd && end >= lastStart)
        ) {
          return "این شیفت همپوشانی دارد";
        }

        if (start < lastEnd) {
          return `تایم ${index} باید بعد از تایم ${index - 1} باشد`;
        }

        if (dayData.value.times.length - 1 == i) {
          return;
        }
      }
    }

    function stringToMinutes(time: string) {
      let x = time.split(":");
      return Number(x[0]) * 60 + Number(x[1]);
    }

    return {
      startTime,
      endTime,
      dayData,
      showModalTime,
      openTime,
      pushNewTime,
      changeTime,
      deleteTime,
      getLessTen,
      selectedTimeIndex,
      selectedTimeModel,
      confirm,
      changeStatusType,
      isSelectForAllDay,
    };
  },
};
</script>

<style scoped>
.btn-w {
  min-width: 100px;
}

</style>
