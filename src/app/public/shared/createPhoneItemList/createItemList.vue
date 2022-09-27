<template>
  <div class="main-list-phone">
    <div class="option-buttons">
      <Button
          class="p-button-rounded p-button-warning p-button-text m-0 p-0 warning-text"
          icon="fas fa-pen"
          v-on:click="editDialog = true"
      />

      <Dialog
          v-model:visible="editDialog"
          :breakpoints="{
          '950px': '60vw',
          '1200px': '45vw',
          '320px': '100vw',
          '450px': '85vw',
        }"
          :dismissableMask="true"
          :header="$t('addAddress')"
          :modal="true"
          :style="{ width: '30vw' }"
      >
        <Form
            v-slot="{ errors }"
            :validation-schema="addressSchema"
            class="w-100"
            @submit="onSubmitEditAddress"
        >
          <div class="row mx-0 mb-0 justify-content-center">
            <div class="col-12 col-sm-8">
              <label class="my-2 w-100 text-right" for="phone_Title">{{
                  $t("phone_title")
                }}</label>
              <Field
                  id="phone_Title"
                  v-model="edit.title"
                  :class="{ 'is-invalid': errors.phone_Title }"
                  :placeholder="$t('phone_title')"
                  class="form-control my-2"
                  name="phone_Title"
                  type="text"
              />
              <div class="text-danger text-sm text-center">
                {{ errors.phone_Title }}
              </div>
            </div>
          </div>
          <div class="row mx-0 mb-0 justify-content-center">
            <div class="col-12 col-sm-8">
              <label class="mt-2 w-100 text-right" for="phone_number">{{
                  $t("phone_number")
                }}</label>
              <Field
                  id="phone_number"
                  v-model="edit.number"
                  :class="{ 'is-invalid': errors.phone_number }"
                  :placeholder="$t('phone_number')"
                  class="form-control my-2"
                  name="phone_number"
                  type="text"
              />
              <div class="text-danger text-sm text-center">
                {{ errors.phone_number }}
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-center my-3">
            <Button
                :label="$t('edit')"
                class="p-button-raised p-button-success dl"
                icon="fas fa-pen"
                type="submit"
            />
          </div>
        </Form>
      </Dialog>

      <Button
          class="p-button-rounded p-button-danger p-button-text m-0 p-0 danger-text"
          icon="far fa-trash-alt"
          @click="deleteById($event)"
      />
    </div>
    <label class="mb-1" for="pTitle">{{ $t("title") }} :</label>
    <p id="pTitle" class="big-text">{{ phone.title }}</p>
    <label class="mb-1" for="pPhone">{{ $t("telephone") }} :</label>
    <p id="pPhone" class="mb-1">{{ phone.number }}</p>
  </div>
</template>

<script>
import {ref} from "vue";
import {useConfirm} from "primevue/useconfirm";
import {Field, Form} from "vee-validate";
import * as Yup from "yup";
import {i18n} from "@/main";

export default {
  components: {
    Form,
    Field,
  },
  props: {
    phone: Object,
    index: Number,
  },
  emits: ["edit", "delete"],
  setup(props, {emit}) {
    //! #########################################################
    const addressSchema = Yup.object().shape({
      phone_Title: Yup.string()
          .required("Title is required")
          .test(
              "len",
              i18n.global.tc("inputValidation", {
                min: 3,
                max: 20,
              }),
              (val) => val.length >= 3 && val.length <= 20
          )
          .default(""),
      phone_number: Yup.string()
          .required("Phone is required")
          .test(
              "len",
              i18n.global.tc("inputValidationMin", {
                min: 11,
              }),
              (val) => val.length >= 11 && val.length <= 11
          )
          .default(""),
    });
    //! #########################################################

    const editDialog = ref(false);
    const edit = ref({
      id: props.index,
      title: props.phone.title,
      number: props.phone.number,
    });

    function onSubmitEditAddress(values) {
      emit("edit", {
        title: values.phone_Title,
        number: values.phone_number,
        index: props.index,
      });
      editDialog.value = false;
    }

    const confirm = useConfirm();
    const deleteById = (event) => {
      confirm.require({
        target: event.currentTarget,
        message: i18n.global.tc("delete?"),
        icon: "fas fa-info-circle",
        acceptLabel: i18n.global.tc("yes"),
        rejectLabel: i18n.global.tc("no"),
        acceptClass: "p-button-danger",
        accept: () => {
          emit("delete", props.index);
        },
        reject: () => {
        },
      });
    };

    return {addressSchema, onSubmitEditAddress, editDialog, edit, deleteById};
  },
};
</script>

<style lang="scss" scoped>
.main-list-phone {
  border: 1px solid #a9a9a9;
  border-radius: 10px;
  padding: 5px 10px;
  text-align: right;
  font-size: 14px;
  background: #fff;
}

.big-text {
  clear: both;
  overflow: hidden;
  white-space: nowrap;
}

.option-buttons {
  position: absolute;
  left: 5px;
}

.option-buttons .p-button-icon {
  font-size: 15px;
}

.p-button.p-component.p-button-icon-only.p-button-rounded.p-button-danger.p-button-text.m-0.p-0.danger-text {
  color: #d32f2f !important;
}

.p-button.p-component.p-button-icon-only.p-button-rounded.p-button-warning.p-button-text.m-0.p-0.warning-text {
  color: #fbc02d !important;
}
</style>
