<template>
  <header-app-screen :title="$t('addAddress')" />

  <div class="mt-4">
    <Form
      v-slot="{ errors }"
      :validation-schema="pageNameSchema"
      class="w-100 mt-1 px-3 animate__animated animate__fadeIn"
      @submit="nextStepFunc"
    >
      <div
        class="
          d-flex
          p-2
          flex-column
          justify-content-center
          align-content-center
          main-card
          m-2
          mt-2
          smart-text-align
        "
      >
        <div class="child text-left map-controller">
          <Button
            @click="displayMap = true"
            :label="state.areaName ? $t('edit-location') : $t('selectedMap')"
            class="w-100 map-btn"
          />
        </div>
        <p class="mt-1 mb-1">{{ state.areaName }}</p>

        <p class="mt-3 mb-1">{{ $t("addressAndDescription") }}</p>
        <Field
          id="pageName"
          :class="errors.pageName ? 'border border-danger' : ''"
          :placeholder="$t('addressAndDescription')"
          v-model="state.deliveryList.description"
          class="form-control border-radius-10px px-2 py-3 inputs"
          name="pageName"
          type="text"
        />
        <div class="text-danger text-sm text-right w-100 my-2 px-2">
          {{ errors.pageName }}
        </div>
      </div>

      <div class="main-address-controller">
        <div class="controller" v-if="state.deliveryList">
          <div class="phone-list-controller">
            <div class="header">
              <span>{{ $t("phones") }}</span>
              <Button
                @click="state.addPhone()"
                icon="fas fa-phone-alt"
                class="p-button-rounded p-button-text p-button-plain"
              />
            </div>
            <template
              v-if="
                state.deliveryList.phones &&
                state.deliveryList.phones.length > 0
              "
            >
              <div
                class="box-number"
                v-for="(item, index) in state.deliveryList.phones"
                :key="item"
              >
                <div class="child">
                  <Button
                    icon="pi pi-trash"
                    @click="state.deliveryList.phones.splice(index, 1)"
                    class="p-button-rounded p-button-text p-button-plain"
                  />
                  <InputText
                    type="text"
                    maxlength="30"
                    :class="
                      state.deliveryList.phones[index].title.length < 4 &&
                      !state.validation
                        ? 'p-invalid'
                        : null
                    "
                    v-model="state.deliveryList.phones[index].title"
                    :placeholder="$t('phone_title')"
                  />
                  <small
                    v-if="
                      state.deliveryList.phones[index].title.length < 4 &&
                      !state.validation
                    "
                    >{{ $t("invalid") }}</small
                  >
                  <InputText
                    type="text"
                    maxlength="11"
                    :class="
                      state.deliveryList.phones[index].number.length !== 11 &&
                      !state.validation
                        ? 'p-invalid'
                        : null
                    "
                    v-model="state.deliveryList.phones[index].number"
                    :placeholder="$t('mobileNumber')"
                  />
                  <small
                    v-if="
                      state.deliveryList.phones[index].number.length !== 11 &&
                      !state.validation
                    "
                    >{{ $t("invalid") }}</small
                  >
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div
        class="
          d-flex
          p-2
          flex-column
          justify-content-between
          align-content-center
          main-card
          m-2
          mt-2
          smart-text-align
        "
      >
        <div class="d-flex justify-content-between">
          <p class="my-auto mr-4 mt-1">{{ $t("later_receive") }}</p>
          <div
            class="
              mt-4
              d-flex
              justify-content-center
              align-content-center
              w-50
              rtl
              mb-3
            "
          >
            <button
              :class="state.deliveryList.isFree == true ? 'selected' : ''"
              class="button button-right py-2 width33 presenceBtn"
              type="button"
              @click="state.deliveryList.isFree = true"
            >
              {{ $t("have") }}
            </button>
            <button
              :class="state.deliveryList.isFree == false ? 'selected' : ''"
              class="button button-left width33 py-2 presenceBtn"
              type="button"
              @click="state.deliveryList.isFree = false"
            >
              {{ $t("notHave") }}
            </button>
          </div>
        </div>
        <div
          v-if="state.deliveryList.isFree"
          class="animate__animated animate__fadeIn"
        >
          <div class="d-flex justify-content-center">
            <Dropdown
              class="w-50 mx-auto text-center mt-4 mb-2"
              v-model="state.selectedDropDown"
              :options="state.dropDownList"
              optionLabel="label"
              optionValue="value"
              @change="null"
            />
          </div>
        </div>
      </div>
    </Form>
  </div>
  <Footer>
    <Button
      class="footer-btn"
      type="submit"
      :label="$t('submit')"
      @click="state.onSend()"
    />
  </Footer>
  <div class="has-fixed-footer"></div>
  <Dialog
    v-model:visible="displayMap"
    :breakpoints="{
      '1400px': '484px',
      '950': '484px',
      '510px': '320px',
    }"
    :dismissableMask="true"
    :modal="true"
  >
    <map-pointer-and-selection
      :latLong="state.aria.lat ? [state.aria.lat, state.aria.long] : null"
      @returned="
        (e) => {
          state.aria.lat = e.lat;
          state.aria.long = e.lng;
          state.getArea();
          displayMap = false;
        }
      "
    />
  </Dialog>
</template>

<script>
import { collectFromBuyerState } from "./collectFromBuyerState";
import Footer from "@/app/unit/shared/footerApp/fixedFooterScreen.vue";
import { onMounted, ref, watch } from "vue";
import { getSelectedPageId } from "@/core/service/utils.service";
import Textarea from "primevue/textarea";
import { Field, Form } from "vee-validate";
import * as Yup from "yup";
import { i18n } from "@/main";
import _ from "lodash";
import { ToastService } from "@/core/service/toast.service";
import MapPointerAndSelection from "@/app/public/shared/map/mapPointerAndSelection.vue";
import { useRoute } from "vue-router";
import Dropdown from "primevue/dropdown";
import HeaderAppScreen from "@/app/unit/shared/headerApp/headerAppScreen.vue";

export default {
  components: {
    Footer,
    Field,
    Form,
    Dropdown,
    Textarea,
    MapPointerAndSelection,
    HeaderAppScreen,
  },
  setup() {
    const state = ref(new collectFromBuyerState());
    const route = useRoute();
    const isEdit = ref(route.params.isEdit);
    console.log(isEdit.value);
    const displayMap = ref(false);

    onMounted(() => {
      if (isEdit.value == "edit") state.value.getAddress();
    });

    const pageNameSchema = Yup.object().shape({
      pageName: Yup.string()
        .test(
          "len",
          i18n.global.tc("inputValidation", { min: 4, max: 80 }),
          (val) => val.length >= 4 && val.length <= 80
        )
        .default(""),

      username: Yup.string()
        .test(
          "len",
          i18n.global.tc("userNameInvalidatin", {
            min: 4,
            max: 40,
          }),
          (val) => val.length >= 4 && val.length <= 40
        )
        .default(""),
    });
    // get folders
    return {
      pageNameSchema,
      displayMap,
      isEdit,
      state,
    };
  },
};
</script>

<style lang="scss" scoped>
:focus {
  outline: none !important;
}

.map-btn {
  background: rgb(251, 211, 194);
  background: -moz-linear-gradient(
    90deg,
    rgba(251, 211, 194, 1) 0%,
    rgba(178, 222, 217, 1) 100%
  );
  background: -webkit-linear-gradient(
    90deg,
    rgba(251, 211, 194, 1) 0%,
    rgba(178, 222, 217, 1) 100%
  );
  background: linear-gradient(
    90deg,
    rgba(251, 211, 194, 1) 0%,
    rgba(178, 222, 217, 1) 100%
  ) !important;
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#fbd3c2",endColorstr="#b2ded9",GradientType=1);
  border: none !important;
  color: #686868;
}
.p-button:enabled:hover {
  color: #333333;
}

.presenceBtn {
  background-color: rgb(238, 238, 238);
  color: rgb(133, 133, 133);
  border: 1px solid rgb(183, 183, 183);
}

.button-right {
  border-radius: 0px 7px 7px 0px;
}

.button-left {
  border-radius: 7px 0px 0px 7px;
}

.width33 {
  width: 33%;
}

.selected {
  background-color: #fadadd;
  color: black;
  text-shadow: 0px 0px black;
}

.inputs {
  border: 1px solid rgb(183, 183, 183);
}

.main-card {
  box-shadow: 1px 0px 9px #80808029;
  border-radius: 7px;
}
.main-address-controller {
  display: flex;
  flex-direction: column;
  padding: 10px;
  .controller {
    display: flex;
    flex-direction: column;
    padding: 10px;
    font-style: 14px;
    width: 100%;
    box-shadow: 0 0 5px #b5b5b5;
    margin-bottom: 10px;
    border-radius: 8px;
    &:first-child {
      button {
        background: #c5e4e7;
        border: none;
        color: #212121;
        font-size: 13px;
        padding: 5px;
        margin-bottom: 10px;
      }
    }

    .span {
      &.title {
        font-style: 15px;
        font-weight: bolder;
      }
    }
    .child {
      padding: 5px 0;
      &.map-controller {
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
        align-items: center;
      }
      input {
        border: 1px solid #c9c9c9;
        font-size: 14px;
        padding: 10px !important;
        width: 100%;
        color: #212121;
      }
    }
    .phone-list-controller {
      display: flex;
      flex-direction: column;
      .header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        span {
          font-size: 13px;
        }
      }
      .box-number {
        display: flex;
        flex-direction: column;
        border: 1px solid #c9c9c9;
        border-radius: 8px;
        align-items: flex-end;
        padding: 10px;
        margin-bottom: 10px;
        .child {
          width: 100%;
        }
        &:first-child {
          margin-bottom: 0;
        }
        text-align: left;
        input {
          border: 1px solid #c9c9c9;
          font-size: 14px;
          padding: 10px !important;
          width: 100%;
          color: #212121;
          margin-bottom: 8px;
        }

        small {
          color: #dc3545;
          display: flex;
          margin-bottom: 5px;
        }
      }
    }
  }
}

.footer-btn {
  background: #fe5252 !important;
  border-radius: 30px;
  border: none;
  font-size: 13px;
  padding: 8px 40px;
}

::v-deep(.p-invalid) {
  border-color: #dc3545 !important;
}
</style>
