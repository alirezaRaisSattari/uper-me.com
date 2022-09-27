<template>
  <Dialog v-model:visible="displayBasic" :header="$t('selectDate')" class="showDialog">
    <div>
      <div class="d-flex">
        <div class="col-4 p-0">
          <span>{{ $t("selectDate") }}</span>
        </div>
        <div class="col-8 d-flex justify-content-start m-1">
          <div class="border">
            <datePicker v-model="date" class="w-100"/>
          </div>
        </div>
      </div>
      <div class="d-flex">
        <div class="col-4 p-0">
          <span>{{ $t("selectTime") }}</span>
        </div>
        <div class="col-8 d-flex justify-content-start m-1">
          <div class="border">
            <Calendar
                id="time12"
                v-model="time"
                :timeOnly="true"
                hourFormat="12"
                type="text"
            />
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <Button
          :label="$t('cancel')"
          class="p-button-text"
          icon="pi pi-times"
          @click="closeBasic"
      />
      <Button :label="$t('submit')" autofocus icon="pi pi-check" @click="closeBasic"/>
    </template>
  </Dialog>
</template>

<script>
import {ref} from "vue";
import Calendar from "primevue/calendar";
import datePicker from "@/app/unit/shared/datePicker/datePikerCustom";
import Dialog from "primevue/dialog";

export default {
  components: {
    Calendar,
    datePicker,
    Dialog,
  },
  setup(props, {emit}) {
    const time = ref();
    const date = ref();
    const displayBasic = ref(false);
    const openBasic = () => {
      displayBasic.value = true;
    };
    const closeBasic = () => {
      displayBasic.value = false;
      emit('displaydate', date, time)
    };

    return {time, openBasic, displayBasic, closeBasic, date};
  },
};
</script>

<style scoped></style>
