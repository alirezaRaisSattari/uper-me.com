<template>
  <Form
      v-slot="{ errors }"
      :validation-schema="characteristicSchema"
      class="pb-5"
      @submit="change"
  >
    <div class="m-4">
      <div class="form-group">
        <h6 class="smart-text-align">{{ $t("lastPassword") }}</h6>
        <Field
            id="LastPassword"
            :class="{ 'is-invalid': errors.LastPassword }"
            class="form-control"
            name="LastPassword"
            type="password"
        />
        <div class="text-right text-danger text-sm">{{ errors.LastPassword }}</div>
      </div>

      <div class="form-group">
        <h6 class="smart-text-align">{{ $t("password") }}</h6>
        <Field
            id="password"
            :class="{ 'is-invalid': errors.password }"
            class="form-control"
            name="password"
            type="password"
        />
        <div class="text-right text-danger text-sm">{{ errors.password }}</div>
      </div>
      <div class="form-group">
        <h6 class="smart-text-align">{{ $t("confirm_password") }}</h6>
        <Field
            id="rePassword"
            :class="{ 'is-invalid': errors.rePassword }"
            class="form-control"
            name="rePassword"
            type="password"
        />
        <div class="text-right text-danger text-sm">{{ errors.rePassword }}</div>
      </div>
      <Button
          :label="$t('submit')"
          class="p-button-success btn-block btn-primary px-4"
          type="submit"
      />
    </div>
  </Form>
</template>

<script>
import {ref} from "vue";
import {i18n} from "@/main";
import {Field, Form} from "vee-validate";
import * as Yup from "yup";
import {ChangePasswordState} from "@/app/public/setting/changePassword/ChangePasswordState";
import {ToastService} from "@/core/service/toast.service";

export default {
  name: "SettingScreen",
  components: {
    Form,
    Field,
  },
  setup() {
    const _state = ref(new ChangePasswordState());

    function change(body) {
      if (password.value == rePassword.value) {
        _state.value.internalResetPassword(body);
      } else {
        ToastService.getInstance().warning(i18n.global.tc("passwordDoesNotMatch"));
      }
    }

    const characteristicSchema = Yup.object().shape({
      LastPassword: Yup.string().required(i18n.global.tc("input_is_empty")).default(""),
      password: Yup.string().required(i18n.global.tc("input_is_empty")).default(""),
      rePassword: Yup.string().required(i18n.global.tc("input_is_empty")).default(""),
    });
    // function change() {
    //   if (password.value == "" || lastPassword.value == "" || rePassword.value == "") {
    //     ToastService.getInstance().warning(i18n.global.tc("input_is_empty"));
    //     return;
    //   }
    //   if (password.value == rePassword.value) {
    // _state.value.internalResetPassword(lastPassword.value, password.value);
    //   } else {
    //     ToastService.getInstance().warning(i18n.global.tc("passwordDoesNotMatch"));
    //   }
    // }

    return {
      // LastPassword,
      // password,
      // rePassword,
      characteristicSchema,
      change,
    };
  },
};
</script>
