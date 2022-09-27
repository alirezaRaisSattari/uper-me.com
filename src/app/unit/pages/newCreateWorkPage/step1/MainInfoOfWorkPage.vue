<template>
  <div class="animate__animated animate__fadeIn">
    <Form
      v-slot="{ errors }"
      :validation-schema="pageNameSchema"
      class="w-100 mt-1 px-3"
      style="padding-bottom: 75px"
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
        <p class="m-3">{{ $t("sellType") }}</p>
        <div
          class="
            d-flex
            justify-content-center
            align-content-center
            w-75
            mx-auto
            rtl
            mb-3
          "
        >
          <button
            :class="model.sellType === 1 ? 'selected' : ''"
            class="button button-right py-2 width33 presenceBtn"
            type="button"
            @click="model.sellType = 1"
          >
            {{ $t("virtual") }}
          </button>
          <button
            :class="model.sellType === 2 ? 'selected' : ''"
            class="button width33 py-2 presenceBtn"
            type="button"
            @click="model.sellType = 2"
          >
            {{ $t("actual") }}
          </button>
          <button
            :class="model.sellType === 3 ? 'selected' : ''"
            class="button button-left py-2 width33 presenceBtn"
            type="button"
            @click="model.sellType = 3"
          >
            {{ $t("both") }}
          </button>
        </div>

        <Field
          id="pageName"
          v-model="model.name"
          :class="errors.pageName ? 'border border-danger' : ''"
          :placeholder="$t('pageName')"
          class="form-control border-radius-10px px-2 py-3 inputs"
          name="pageName"
          type="text"
        />
        <div class="text-danger text-sm text-right w-100 my-2 px-2">
          {{ errors.pageName }}
        </div>

        <Field
          id="username"
          v-model="model.username"
          :class="errors.username ? 'border border-danger' : ''"
          :placeholder="$t('username')"
          class="form-control border-radius-10px py-3 inputs"
          name="username"
          type="text"
          @input="usernameCheckFunc"
        />
        <div class="text-danger text-sm text-right w-100 my-1 px-2">
          {{ errors.username }}
        </div>

        <div
          v-if="!errors.username"
          class="col-12 col-lg-9 my-2 rtl text-right"
        >
          <span
            v-if="state.checkUsernameStatus == 1"
            class="mr-1 text-primary text-sm"
          >
            {{ $t("Check-username") }}
          </span>
          <span
            v-if="state.checkUsernameStatus == 2"
            class="mr-1 text-danger text-sm"
          >
            {{ $("username-exist") }}
          </span>
          <span
            v-if="state.checkUsernameStatus == 3"
            class="mr-1 text-danger text-sm"
          >
            {{ $t("invalidUserName") }}
          </span>
          <span
            v-if="state.checkUsernameStatus == 4"
            class="mr-1 text-success text-sm"
          >
            {{ $t("valid-username") }}
          </span>
          <span
            v-if="state.checkUsernameStatus == 5"
            class="mr-1 text-danger text-sm"
          >
            {{
              $t("userNameInvalidatin", {
                min: 4,
                max: 40,
              })
            }}
          </span>
        </div>

        <div class="m-1 border-radius-10px p-2 inputs bg-light">
          <Textarea
            v-model="model.bio"
            :autoResize="true"
            :placeholder="$t('aboutUs')"
            class="w-100 border-0 bg-light text-decoration-none"
            cols="30"
            rows="1"
          />
        </div>
      </div>

      <div
        class="
          d-flex
          flex-column
          justify-content-center
          align-content-center
          main-card
          m-2
          mt-4
          smart-text-align
        "
      >
        <p class="m-3">{{ $t("pagePrivacy") }}</p>
        <div
          class="
            d-flex
            justify-content-center
            align-content-center
            w-75
            mx-auto
            rtl
          "
        >
          <button
            :class="model.isPublic ? 'selected' : ''"
            class="button button-right py-2 width33 presenceBtn"
            type="button"
            @click="model.isPublic = true"
          >
            {{ $t("public") }}
          </button>
          <button
            :class="!model.isPublic ? 'selected' : ''"
            class="button button-left py-2 width33 presenceBtn"
            type="button"
            @click="model.isPublic = false"
          >
            {{ $t("private") }}
          </button>
        </div>
        <input
          v-model="model.websiteUrl"
          :placeholder="$t('website')"
          class="m-3 border-radius-10px p-2 inputs"
          type="text"
        />
      </div>
      <bottomBar bgcolor="'#579bfc'">
        <button
          class="btn text-light rounded-pill px-5 py-1 dtn-bg"
          type="submit"
        >
          {{ $t("submit") }}
        </button>
      </bottomBar>
    </Form>
  </div>
</template>

<script>
import Textarea from "primevue/textarea";
import { ref } from "vue";
import { Field, Form } from "vee-validate";
import * as Yup from "yup";
import { i18n } from "@/main";
import {
  CheckUserNameStatus,
  MainInfoOfWorkPageState,
} from "./MainInfoOfWorkPageState";
import bottomBar from "@/app/public/shared/bottomBar/BottomBar.vue";
import _ from "lodash";
import { ToastService } from "@/core/service/toast.service";

export default {
  components: { Textarea, Form, Field, bottomBar },
  props: ["model"],
  setup(props, { emit }) {
    const state = ref(new MainInfoOfWorkPageState());

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

    const usernameCheckFunc = _.debounce(() => {
      props.model.username = props.model.username.toLowerCase();
      state.value.checkUsernames(props.model.username);
    }, 500);

    const nextStepFunc = () => {
      if (state.value.checkUsernameStatus != CheckUserNameStatus.ok) {
        ToastService.getInstance().warning(i18n.global.tc("invalidUserName"));
        return;
      }
      emit("updateStepOne", props.model);
    };

    return {
      pageNameSchema,
      state,
      usernameCheckFunc,
      nextStepFunc,
    };
  },
};
</script>

<style scoped>
p,
input,
Textarea,
Field,
button {
  font-size: 13px;
}
:focus {
  outline: none !important;
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
  background-color: rgb(255, 159, 0);
  color: black;
  text-shadow: 0px 0px black;
}

.dtn-bg {
  background-color: #579bfc;
}

.inputs {
  border: 1px solid rgb(183, 183, 183);
}

.main-card {
  box-shadow: 1px 0px 9px #80808029;
  border-radius: 7px;
}
</style>
