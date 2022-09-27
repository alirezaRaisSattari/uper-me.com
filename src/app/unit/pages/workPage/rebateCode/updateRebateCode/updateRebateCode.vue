<template>
  <div class="con">
    <div class="d-flex justify-content-center align-items-center">
      <h5 class="header-title m-0 shape-text">{{ $t("editOffCode") }}</h5>
      <img
        alt=""
        class="header-shape-page"
        src="@/assets/img/svg/appbarShape.svg"
      />
    </div>

    <Form
      v-if="state.selectedRebate != null"
      v-slot="{ errors }"
      :validation-schema="Schema"
      class="w-100 mt-1 px-3"
      style="padding-bottom: 75px"
      @submit="updateRebateCode"
    >
      <div class="smart-text-align mx-2">
        <labe class="mt-4 mb-1" for="offCodeName"> {{ $t("codeTitle") }}</labe>
      </div>

      <Field
        id="offCodeName"
        v-model="state.selectedRebate.title"
        :class="errors.offCodeName ? 'border border-danger' : ''"
        class="form-control border-radius-10px px-2 py-3 inputs mb-2"
        name="offCodeName"
        type="text"
      />
      <div class="text-danger text-sm text-right w-100 my-2 px-2">
        {{ errors.offCodeName }}
      </div>

      <div class="smart-text-align mx-2">
        <labe class="mt-4 mb-1" for="offCodeName"> {{ $t("offPercent") }}</labe>
      </div>
      <Field
        id="offPercent"
        v-model="state.selectedRebate.percent"
        :class="errors.offPercent ? 'border border-danger' : ''"
        class="form-control border-radius-10px px-2 py-3 inputs mb-2"
        name="offPercent"
        type="number"
      />
      <div class="text-danger text-sm text-right w-100 my-2 px-2">
        {{ errors.offPercent }}
      </div>

      <div class="smart-text-align mx-2">
        <labe class="mt-4 mb-1" for="offCodeName"> {{ $t("minValue") }}</labe>
      </div>
      <Field
        id="minValue"
        v-model="state.selectedRebate.minimumFactorPrice"
        :class="errors.minValue ? 'border border-danger' : ''"
        class="form-control border-radius-10px px-2 py-3 inputs mb-2"
        name="minValue"
        type="number"
      />
      <div class="text-danger text-sm text-right w-100 my-2 px-2">
        {{ errors.minValue }}
      </div>

      <div class="smart-text-align mx-2">
        <labe class="mt-4 mb-1" for="offCodeName">
          {{ $t("maxValueOff") }}</labe
        >
      </div>
      <Field
        id="maxValueOff"
        v-model="state.selectedRebate.maximumOffValue"
        :class="errors.maxValueOff ? 'border border-danger' : ''"
        class="form-control border-radius-10px px-2 py-3 inputs mb-2"
        name="maxValueOff"
        type="number"
      />
      <div class="text-danger text-sm text-right w-100 my-2 px-2">
        {{ errors.maxValueOff }}
      </div>

      <div class="smart-text-align mx-2">
        <labe class="mt-4 mb-1" for="offCodeName">
          {{ $t("usedCountLabel") }}</labe
        >
      </div>
      <Field
        id="usedCountLabel"
        v-model="state.selectedRebate.usedCount"
        :class="errors.usedCountLabel ? 'border border-danger' : ''"
        class="form-control border-radius-10px px-2 py-3 inputs mb-2"
        name="usedCountLabel"
        type="number"
      />
      <div class="text-danger text-sm text-right w-100 my-2 px-2">
        {{ errors.usedCountLabel }}
      </div>

      <div class="mt-3 mx-4 d-flex justify-content-between">
        <div class="d-flex text-center col-6">
          <div class="mx-1">{{ $t("FactorStatus") }}</div>
          <div style="color: red">*</div>
        </div>

        <div class="d-flex col-6">
          <div class="mx-4">{{ $t("active") }}</div>
          <div class="switch">
            <input
              id="FactorStatus"
              v-model="state.status"
              checked
              class="input"
              type="checkbox"
            />
            <label class="slider" for="FactorStatus"></label>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-between mt-3">
        <div class="smart-text-align col-5 p-0 m-0">
          <div class="mx-1">{{ $t("chooseExpirationDate") }}</div>
          <DatePicker
            v-model="state.date"
            :placeholder="state.expireddAt[0]"
            class="form-control m-2 w-100"
          />
        </div>
        <div class="smart-text-align col-5 p-0 m-0">
          <div class="mx-1">{{ $t("chooseExpirationTime") }}</div>
          <Calendar
            v-model="state.time"
            :placeholder="state.expireddAt[1]"
            :timeOnly="true"
            :timeshow="true"
            class="form-control my-2"
          />
        </div>
      </div>

      <bottomBar>
        <button
          class="btn btn-danger text-light rounded-pill px-5 py-1"
          type="submit"
        >
          {{ $t("submit") }}
        </button>
      </bottomBar>
    </Form>
  </div>
</template>


<script>
import { ref, onMounted, watch } from "vue";
import { UpdateRebateCodeState } from "./UpdateRebateCodeState.ts";
import * as Yup from "yup";
import { DateService } from "@/core/service/date.service";
import { Field, Form } from "vee-validate";
import { i18n } from "@/main";
import Calendar from "primevue/calendar";
import DatePicker from "@/app/unit/shared/datePicker/datePickerPageScreen";
import { useRoute } from "vue-router";

import bottomBar from "@/app/public/shared/bottomBar/BottomBar.vue";
import { ToastService } from "../../../../../../core/service/toast.service";

export default {
  name: "updateRebateCode",
  components: {
    bottomBar,
    Field,
    Form,
    DatePicker,
    Calendar,
  },
  setup() {
    const state = ref(new UpdateRebateCodeState());
    const dateService = ref(new DateService());
    const route = useRoute();

    const workPageId = ref(route.params.workPageId);
    const code = ref(route.params.code);

    function updateRebateCode() {
      state.value.updateRebateCode();
    }

    const Schema = Yup.object().shape({
      offPercent: Yup.string()
        .test(
          "len",
          i18n.global.tc("input100Validation", { min: 1 }),
          (val) => val.length >= 1 && val <= 100 && val >= 0
        )
        .default(""),
      minValue: Yup.string()
        .test(
          "len",
          i18n.global.tc("inputEmptyValidation", { min: 1 }),
          (val) => val.length >= 1
        )
        .default(""),
      maxValueOff: Yup.string()
        .test(
          "len",
          i18n.global.tc("inputEmptyValidation", { min: 1 }),
          (val) => val.length >= 1
        )
        .default(""),
      usedCountLabel: Yup.string()
        .test(
          "len",
          i18n.global.tc("input100Validation", { min: 1 }),
          (val) => val.length >= 1 && val <= 100 && val >= 0
        )
        .default(""),
      offCodeName: Yup.string()
        .test(
          "len",
          i18n.global.tc("inputEmptyValidation", { min: 1 }),
          (val) => val.length >= 1
        )
        .default(""),
    });

    onMounted(() => {
      state.value.workPageId = workPageId.value;
      state.value.code = code.value;
      state.value.getSingleRebate();
    });
    return {
      Schema,
      state,
      updateRebateCode,
      dateService,
      code,
      workPageId,
    };
  },
};
</script>

<style scoped>
.con {
  position: relative;
}

.select-box {
  height: 46px;
  border-radius: 11px;
  outline: none !important;
}

.enhance-button {
  background-color: white;
  height: 44px;
  width: 223px;
  padding-block: 11px;
  border-radius: 15px;
  margin-inline: auto;
  border: none !important;
  box-shadow: 0 2px 2px rgb(0 0 0 / 20%);
}

select {
  border: 1px solid #c2c2c2 !important;
}

.header-title {
  text-align: center;
  width: 100%;
  position: absolute;
}

.shape-text {
  position: absolute;
  top: 10px;
  font-size: 16px;
}

.shape-textfollower {
  position: absolute;

  left: 10px;
  font-size: 16px;
}

.inputs {
  border: 1px solid rgb(183, 183, 183);
  height: 46px;
}

.uper-card-1:hover {
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25), 0 3px 5px rgba(0, 0, 0, 0.18);
  border-radius: 8px;
  cursor: pointer !important;
}

.switch {
  display: block;
  margin-top: 9px;
}

.switch .slider {
  position: relative;
  display: inline-block;
  height: 11px;
  width: 32px;
  border-radius: 8px;
  cursor: pointer;
  background: #c5c5c5;
  transition: all 0.2s ease;
}

.switch .slider:after {
  background: #eeeeee;
  position: absolute;
  left: -8px;
  top: -8px;
  display: block;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  content: "";
  transition: all 0.2s ease;
}

.switch label {
  margin-right: 7px;
}

.switch .input {
  display: none;
}

.selectShadow {
  box-shadow: 0px 0px 5px #bdbaba;
}

.switch .input ~ .label {
  margin-left: 8px;
}

.switch .input:checked ~ .slider:after {
  left: 16px;
}

.switch .input:checked ~ .slider {
  background: #c1e1e5;
}

.switch .input:checked ~ .slider:after {
  background: #74bdc6;
}

.follower {
  margin-block: 20px;

  padding-top: 6px;
  /*padding-right: 10px;*/
  width: 100%;
  box-shadow: 0 0px 3px 4px #dfdfdf96;
  border-radius: 7px;
}

.img-follower {
  width: 69px;
  height: 69px;
  position: relative;
  border-radius: 50%;
  padding-top: 4px;
  margin-inline: 10px;
}
</style>
