<template>
  <div class="con">
    <div class="d-flex justify-content-center align-items-center">
      <h5 class="header-title m-0 shape-text">{{ $t("createOffCode") }}</h5>
      <img
        alt=""
        class="header-shape-page"
        src="@/assets/img/svg/appbarShape.svg"
      />
    </div>

    <Form
      v-slot="{ errors }"
      :validation-schema="Schema"
      class="w-100 mt-1 px-3"
      style="padding-bottom: 75px"
      @submit="createRebateCode"
    >
      <Field
        id="offCodeName"
        v-model="state.offCodeName"
        :class="errors.offCodeName ? 'border border-danger' : ''"
        :placeholder="$t('codeTitle')"
        class="form-control border-radius-10px px-2 py-3 inputs"
        name="offCodeName"
        type="text"
      />
      <div class="text-danger text-sm text-right w-100 my-2 px-2">
        {{ errors.offCodeName }}
      </div>

      <Field
        id="offPercent"
        v-model="state.percent"
        :class="errors.offPercent ? 'border border-danger' : ''"
        :placeholder="$t('offPercent')"
        class="form-control border-radius-10px px-2 py-3 inputs"
        name="offPercent"
        type="number"
      />
      <div class="text-danger text-sm text-right w-100 my-2 px-2">
        {{ errors.offPercent }}
      </div>

      <Field
        id="minValue"
        v-model="state.minimumFactorPrice"
        :class="errors.minValue ? 'border border-danger' : ''"
        :placeholder="$t('minValue')"
        class="form-control border-radius-10px px-2 py-3 inputs"
        name="minValue"
        type="number"
      />
      <div class="text-danger text-sm text-right w-100 my-2 px-2">
        {{ errors.minValue }}
      </div>

      <Field
        id="maxValueOff"
        v-model="state.maximumOffValue"
        :class="errors.maxValueOff ? 'border border-danger' : ''"
        :placeholder="$t('maxValueOff')"
        class="form-control border-radius-10px px-2 py-3 inputs"
        name="maxValueOff"
        type="number"
      />
      <div class="text-danger text-sm text-right w-100 my-2 px-2">
        {{ errors.maxValueOff }}
      </div>

      <div class="mt-3">
        <div class="d-flex smart-text-align">
          <div class="mx-1">{{ $t("OffCodeType") }}</div>
          <div style="color: red">*</div>
        </div>
        <div class="mt-1">
          <select
            v-model="state.offCodeType"
            class="select-box w-100 selectShadow smart-text-align"
            name="likeSelect"
          >
            <option :value="false">{{ $t("all") }}</option>
            <option :value="null">{{ $t("SpecificUsers") }}</option>
            <option :value="true">{{ $t("forFirstTime") }}</option>
          </select>
        </div>
      </div>

      <div v-if="state.offCodeType == null" class="mb-4 mt-4 text-center">
        <div class="col-12 px-2 text-center">
          <button
            class="btn enhance-button uper-card-1"
            type="button"
            @click="state.showFollowersFunc"
          >
            {{ $t("chooseUser") }}
          </button>
        </div>
      </div>

      <div v-if="state.selectedFollowers.length != 0">
        <div
          v-for="follower in state.selectedFollowers"
          class="follower bg-light d-flex pb-2"
          @click="state.selectedFollowers.push(follower)"
          :key="follower"
        >
          <div class="py-0 m-0">
            <img
              v-lazy="follower.profileImageUrl + '_sm.webp'"
              class="img-follower text-center"
            />
          </div>
          <div>
            <div class="smart-text-align">{{ follower.username }}</div>
            <div class="smart-text-align">{{ follower.name }}</div>
          </div>
        </div>
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

      <div class="d-flex justify-content-between">
        <div class="smart-text-align mx-1 py-2">{{ $t("currency") }}</div>
        <div class="w-50">
          <select
            v-model="state.currencyId"
            class="select-box w-100 selectShadow smart-text-align"
            name="likeSelect"
          >
            <option
              v-for="currency in state.allCurrencies"
              :key="currency"
              :value="currency.value"
            >
              {{ currency.name }}
            </option>
          </select>
        </div>
      </div>

      <Field
        id="usedCountLabel"
        v-model="state.quanitity"
        :class="errors.usedCountLabel ? 'border border-danger' : ''"
        :placeholder="$t('usedCountLabel')"
        class="form-control border-radius-10px px-2 py-3 inputs"
        name="usedCountLabel"
        type="number"
      />
      <div class="text-danger text-sm text-right w-100 my-2 px-2">
        {{ errors.usedCountLabel }}
      </div>

      <div class="d-flex mt-3 justify-content-between">
        <div class="smart-text-align mx-1 py-2">{{ $t("productType") }}</div>
        <div class="w-50">
          <select
            v-model="state.productType"
            class="select-box w-100 selectShadow smart-text-align"
            name="likeSelect"
          >
            <option
              v-for="type in state.allProductTypes"
              :key="type"
              :value="type.value"
            >
              {{ type.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="d-flex justify-content-between mt-3">
        <div class="smart-text-align">
          <div class="mx-1">{{ $t("chooseExpirationDate") }}</div>
          <DatePicker v-model="state.date" class="form-control m-2 w-100" />
        </div>
        <div class="smart-text-align">
          <div class="mx-1">{{ $t("chooseExpirationTime") }}</div>
          <Calendar
            v-model="state.time"
            :timeOnly="true"
            :timeshow="true"
            class="form-control my-2"
            placeholder=""
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

    <Dialog
      v-model:visible="state.showFollowers"
      :breakpoints="{
        '1000px': '52vw',
        '800px': '65vw',
        '600px': '91vw',
      }"
      :contentStyle="{
        background: 'rgb(255, 255, 255)',
        borderRadius: '12px',
        padding: '0px',
      }"
      :dismissableMask="true"
      :modal="true"
      :showHeader="false"
      :style="{
        width: '25vw',
        background: 'rgb(255, 255, 255)',
        borderRadius: '12px',
        padding: '0px',
      }"
    >
      <div style="width: 94%; margin-inline: auto">
        <div
          v-for="follower in state.allFollowers"
          :key="follower"
          class="follower bg-light d-flex pb-2"
          @click="state.selectedFollowers.push(follower)"
        >
          <div class="py-0 m-0">
            <img
              v-lazy="follower.profileImageUrl + '_sm.webp'"
              class="img-follower text-center"
            />
          </div>
          <div>
            <div class="smart-text-align">{{ follower.username }}</div>
            <div class="smart-text-align">{{ follower.name }}</div>
          </div>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>
import bottomBar from "@/app/public/shared/bottomBar/BottomBar.vue";
import DatePicker from "@/app/unit/shared/datePicker/datePickerPageScreen";
import { ref, onMounted, watch } from "vue";
import { CreateRebateCodeState } from "./CreateRebateCodeState";
import Calendar from "primevue/calendar";
import TimesOfDayDialog from "@/app/unit/pages/newCreateWorkPage/step3/TimesOfDayDialog.vue";
import SelectTimeDialog from "@/app/unit/pages/newCreateWorkPage/step3/SelectTimeDialog.vue";
import { Field, Form } from "vee-validate";
import PersianDate from "persian-date";

import "vue3-persian-datepicker/dist/datepicker.min.css";
import * as Yup from "yup";
import { i18n } from "@/main";
import { ToastService } from "../../../../../../core/service/toast.service";

export default {
  name: "createRebateCode",
  components: {
    bottomBar,
    Field,
    Form,
    DatePicker,
    SelectTimeDialog,
    TimesOfDayDialog,
    Calendar,
  },
  setup() {
    const state = ref(new CreateRebateCodeState());
    const jalal = new PersianDate();

    function createRebateCode() {
      if (state.value.productType == null) {
        ToastService.getInstance().error(i18n.global.tc("selectProductTye"));
        return;
      }

      state.value.createRebateCode();
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
          (val) => val.length >= 1 && val > 0
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

    watch(
      () => state.value.showFollowers,
      (e) => {
        if (e == false) {
          state.value.showSelectedFollowers = true;
        }
      }
    );

    onMounted(() => {
      state.value.date = new PersianDate([
        jalal.year(),
        jalal.month(),
        jalal.date(),
      ])
        .toLocale("en")
        .format("YYYY/MM/DD");
    });

    return {
      createRebateCode,
      Schema,
      state,
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
  margin-top: 20px;
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
