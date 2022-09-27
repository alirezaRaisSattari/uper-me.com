<template>
  <div class="m-4">
    <Form
      v-slot="{ errors }"
      :validation-schema="pageNameSchema"
      autocomplete="off"
      class="w-100 mt-1 px-3"
      @submit="change"
    >
      <input
        autocomplete="false"
        name="hidden"
        style="display: none"
        type="text"
      />
      <div class="form-group">
        <h6 class="smart-text-align">{{ $t("securityQuestion") }}</h6>

        <Field
          id="securityQuestion"
          v-model="changeQuestionModel.question"
          :class="errors.securityQuestion ? 'border border-danger' : ''"
          autocomplete="off"
          class="form-control border-radius-10px py-3 inputs"
          name="securityQuestion"
          type="text"
          @input=""
        />
        <div class="text-danger text-sm text-right w-100 my-1 px-2">
          {{ errors.securityQuestion }}
        </div>
      </div>

      <div class="form-group">
        <h6 class="smart-text-align">{{ $t("answerQuestion") }}</h6>

        <Field
          id="answerQuestion"
          v-model="changeQuestionModel.answer"
          :class="errors.answerQuestion ? 'border border-danger' : ''"
          autocomplete="off"
          class="form-control border-radius-10px py-3 inputs"
          name="answerQuestion"
          type="text"
          @input=""
        />
        <div class="text-danger text-sm text-right w-100 my-1 px-2">
          {{ errors.answerQuestion }}
        </div>
      </div>

      <div class="form-group">
        <h6 class="smart-text-align">{{ $t("password") }}</h6>

        <Field
          id="password"
          v-model="changeQuestionModel.password"
          :class="errors.password ? 'border border-danger' : ''"
          autocomplete="new-password"
          class="form-control border-radius-10px py-3 inputs"
          name="password"
          type="text"
          @input=""
        />
        <div class="text-danger text-sm text-right w-100 my-1 px-2">
          {{ errors.password }}
        </div>
      </div>
      <Button
        :label="$t('submit')"
        class="p-button-primary btn-block"
        type="submit"
      />
    </Form>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { ToastService } from "@/core/service/toast.service";
import { ChangeSecurityQuestionState } from "@/app/public/setting/changeSecurityQuestion/ChangeSecurityQuestionState";
import { i18n } from "@/main";
import { Field, Form } from "vee-validate";
import * as Yup from "yup";

export default defineComponent({
  name: "SettingScreen",
  components: { Field, Form },
  setup() {
    const _state = ref(new ChangeSecurityQuestionState());
    const changeQuestionModel = ref({
      question: "",
      answer: "",
      password: "",
    });

    const pageNameSchema = Yup.object().shape({
      securityQuestion: Yup.string()
        .test(
          "len",
          i18n.global.tc("inputValidation", { min: 4, max: 100 }),
          (val) => val.length >= 4 && val.length <= 100
        )
        .default(""),
      answerQuestion: Yup.string()
        .test(
          "len",
          i18n.global.tc("inputValidation", { min: 4, max: 100 }),
          (val) => val.length >= 4 && val.length <= 100
        )
        .default(""),
      password: Yup.string()
        .test(
          "len",
          i18n.global.tc("inputValidation", { min: 4, max: 14 }),
          (val) => val.length >= 4 && val.length <= 14
        )
        .default(""),
    });

    function change() {
      if (
        changeQuestionModel.value.question == "" ||
        changeQuestionModel.value.answer == ""
      ) {
        ToastService.getInstance().warning(i18n.global.tc("input_is_empty"));
      } else {
        if (
          changeQuestionModel.value.question.length <= 4 ||
          changeQuestionModel.value.answer.length <= 4
        ) {
          ToastService.getInstance().warning(i18n.global.tc("minimumLength"));
          return;
        }
        _state.value.change(
          changeQuestionModel.value.question,
          changeQuestionModel.value.answer,
          changeQuestionModel.value.password
        );
      }
    }

    return {
      changeQuestionModel,
      pageNameSchema,
      change,
    };
  },
});
</script>
