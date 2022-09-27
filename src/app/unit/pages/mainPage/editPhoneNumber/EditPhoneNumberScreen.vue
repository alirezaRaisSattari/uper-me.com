<template>
  <div class="m-4">
    <div v-if="editMainPageState.validationEnable === false">
      <div class="form-group mt-4">
        <h6 class="smart-text-align">{{ $t("telephone") }}</h6>
        <InputText
            :value="userData.mobileNumber"
            class="form-control"
            disabled
            type="tel"
        />
      </div>
      <div class="form-group mt-2">
        <h6 class="smart-text-align">{{ $t("newMobileNumber") }}</h6>
        <InputText
            id="phoneNumber"
            v-model="newMobileNumber"
            class="form-control"
            type="tel"
        />
      </div>
      <Button
          :label="$t('changeMobileNumber')"
          class="btn btn-block btn-primary"
          @click="changeMobile"
      />
    </div>
    <div
        v-if="editMainPageState.validationEnable === true"
        class="form-group mt-4"
    >
      <h6 class="smart-text-align">{{ $t("verifyCode") }}</h6>
      <InputText v-model="verifyCode" class="form-control" type="text"/>
      <div class="form-group mt-2">
        <h6 class="smart-text-align">{{ $t("password") }}</h6>
        <InputText v-model="password" class="form-control" type="password"/>
      </div>
      <div v-if="editMainPageState.isSecurityQuestionExist">
        <div class="form-group mt-2">
          <h6 class="smart-text-align">
            {{ $t("securityQuestion") }} :
            {{ editMainPageState.securityQuestionText }}
          </h6>
          <InputText v-model="securityQuestion" class="form-control" type="text"/>
        </div>
      </div>

      <Button :label="$t('submit')" class="btn-block" @click="validateNewMobile"/>
    </div>
  </div>
</template>


<script lang="ts">
import {defineComponent, ref} from "vue";
import {EditPhoneNumberState} from "./EditPhoneNumberState";
import {getSelectedPageData} from "@/core/service/utils.service";

export default defineComponent({
  name: "MainPagePosts",
  setup() {
    const editMainPageState = ref(new EditPhoneNumberState());
    const userData = ref(getSelectedPageData());
    const verifyCode = ref("");
    const newMobileNumber = ref("");
    const password = ref("");
    const securityQuestion = ref("");

    function changeMobile() {
      editMainPageState.value.changeMobileNumber(newMobileNumber.value)
    }

    function validateNewMobile() {
      editMainPageState.value.validateNewMobileNumber(
          Number(newMobileNumber.value),
          securityQuestion.value,
          verifyCode.value,
          password.value
      )
    }

    return {
      editMainPageState,
      userData,
      verifyCode,
      newMobileNumber,
      password,
      securityQuestion,
      changeMobile,
      validateNewMobile
    };
  },
});
</script>

