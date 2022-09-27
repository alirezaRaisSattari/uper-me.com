<template>
  <div>
    <Dialog v-model:visible="addDialog"
            :breakpoints="{ '950px': '60vw' ,'1200px': '45vw'   , '320px': '100vw' , '450px': '85vw'}"
            :dismissableMask="true" :header="$t('addPhone')"
            :modal="true"
            :style="{width: '30vw'}">
      <Form v-slot="{ errors }" :validation-schema="addressSchema"
            class="w-100" @submit="onSubmitAddPhone">

        <div class="row mx-0 mt-0 mb-0 justify-content-center ">
          <div class="col-12 col-sm-8">
            <label class="my-2 w-100 text-right" for="phone_Title">{{ $t("phone_title") }}</label>
            <Field id="phone_Title" v-model="uper.newPhone.title" :class="{ 'is-invalid': errors.phone_Title }"
                   :placeholder="$t('phone_title')"
                   class="form-control my-2"
                   name="phone_Title" type="text"/>
            <div class="text-danger text-sm text-center">{{ errors.phone_Title }}</div>
          </div>
          <div class="col-12 col-sm-8">
            <label class="mt-2 w-100 text-right" for="phone_number">{{ $t("phone_number") }}</label>
            <Field id="phone_number" v-model="uper.newPhone.phone" :class="{ 'is-invalid': errors.phone_number }"
                   :placeholder="$t('phone_number')"
                   class="form-control my-2"
                   name="phone_number" type="text"/>
            <div class="text-danger text-sm text-center">{{ errors.phone_number }}</div>
          </div>
        </div>
        <div class="col-12 col-sm-8">
          <Button :label="$t('add')" class="p-button-raised p-button-success dl col-8 col-sm-6 float-left my-2 mb-3 "
                  icon="pi pi-check" type="submit"/>
        </div>
      </Form>
    </Dialog>
    <div class="row m-0 mt-4">
      <div class="col-12">
        <Form v-slot="{ errors }" :validation-schema="addressSchemaMain"
              class="w-100" @submit="onSubmitAddress">

          <SelectLocationOnMap :callback="getCurrentLatlng">
          </SelectLocationOnMap>

          <label class="my-2 w-100 text-right" for="textAddress">{{ $t("addressAndDescription") }}</label>
          <Field id="textAddress" v-model="uper.postDataUpper.textAddress" :class="{ 'is-invalid': errors.textAddress }"
                 :placeholder="$t('addressAndDescription')"
                 class="form-control my-2"
                 name="textAddress" type="text"/>
          <div class="text-danger text-sm text-center">{{ errors.textAddress }}</div>

          <div class="row">
            <div class="col-9 col-md-10 pl-1 mt-2">
              <label v-if="uper.list.length > 0" class="my-2 w-100 text-right" for="phones">{{ $t("phones") }}</label>
              <swiper
                  id="phones"
                  :direction="'horizontal'"
                  :free-mode="true"
                  :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
                  :slides-per-view="'auto'"
                  :space-between="0"
                  class="slider"
              >
                <swiper-slide v-for="(phone , index) in uper.list" :key="index" class="pt-2 col-8 col-md-5 pr-0 pl-2">
                  <createItemList :index="index" :phone="phone" class="my-3" @delete="(event)=> uper.deletePhone(event)"
                                  @edit="(event) =>uper.editDetails(event)"/>
                </swiper-slide>
              </swiper>
            </div>
            <div class="col-3 col-md-2 my-2 col-md-2 my-2 d-flex  justify-content-center align-items-center px-1">
              <Button class="p-button-rounded p-button-success" icon="fas fa-plus" @click="addDialog = true"/>
            </div>
          </div>
          <div class="row m-0 mt-2">
            <div class="col-6 d-flex align-items-center">
              <span class="ml-3">{{ $t('later_receive') }}</span>
              <Checkbox v-model="uper.laterReceive" :binary="true"/>
            </div>
            <template v-if="uper.laterReceive">
              <div class="col-6 d-flex align-items-center">
                <Dropdown v-model="uper.postDataUpper.selectedLaterReceive" :options="uper.laterReceiveOption"
                          :placeholder="$t('selectTime')" optionLabel="label"/>
              </div>
            </template>
          </div>

          <div class="col-12 text-center dl my-3 px-0">
            <Button :label="$t('submit')" :loading="uper.loading[0]"
                    class="col-4 col-md-2 p-button-raised p-button-secondary my-2"
                    type="submit"/>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue';
import SelectLocationOnMap from "@/app/public/shared/mapComponent/SelectLocationOnMap.vue";
import createItemList from '@/app/public/shared/createPhoneItemList/createItemList';
import {Field, Form} from 'vee-validate';
import * as Yup from 'yup';
import {uperSendState} from './uperSendState';
import {i18n} from '@/main';
import {ToastService} from '@/core/service/toast.service';
import Dropdown from 'primevue/dropdown';
import {Swiper, SwiperSlide} from "swiper/vue";

export default {
  components: {
    SelectLocationOnMap,
    createItemList,
    Form,
    Field,
    Dropdown,
    Swiper, SwiperSlide
  },
  emits: ['sendData'],
  setup(props, {emit}) {
    let currentLocation = ref('');
    let mapExist = ref(false)
    const addDialog = ref(false)
    const uper = ref(new uperSendState((newItem) => {
      if (newItem === true) {
        addDialog.value = false;
      }
    }));

    function getCurrentLatlng(location) {
      mapExist.value = false;
      uper.value.getLocationByLatLon(location);
    }

    const addressSchema = Yup.object().shape({

      phone_Title: Yup.string()
          .required('Title is required')
          .test('len', i18n.global.tc('inputValidation', {
            min: 3,
            max: 20
          }), val => (val.length >= 3 && val.length <= 20))
          .default('')
      ,
      phone_number: Yup.string()
          .required('Phone is required')
          .test('len', i18n.global.tc('inputValidationMin', {
            min: 11
          }), val => (val.length >= 11 && val.length <= 11))
          .default('')
      ,
    });

    function onSubmitAddPhone(values) {
      uper.value.pushPhone()
    }

    const addressSchemaMain = Yup.object().shape({

      textAddress: Yup.string()
          .required('address is required')
          .test('len', i18n.global.tc('inputValidation', {
            min: 3,
            max: 20
          }), val => (val.length >= 3 && val.length <= 20))
          .default('')
      ,
    });

    function onSubmitAddress(values) {
      if (uper.value.postDataUpper.areaId !== 0 && uper.value.postDataUpper.phones.length > 0) {
        emit('sendData', {step: 3, postData: uper.value.postDataUpper});
      } else if (uper.value.postDataUpper.phones.length <= 0) {
        ToastService.getInstance().error(i18n.global.tc('please_enter_at_least_one_phoneNumber'));
      } else {
        ToastService.getInstance().error(i18n.global.tc('enterAddressAndInputs'));
      }
    }

    return {
      addDialog,
      currentLocation,
      getCurrentLatlng,
      uper,
      addressSchema,
      onSubmitAddPhone,
      addressSchemaMain,
      onSubmitAddress
    }
  }
}
</script>

<style lang="scss" scoped>

#mapContainer {
  height: 50vh;
}

.leaflet-marker-icon.leaflet-zoom-animated.leaflet-interactive {
  margin-top: 45px;
}

</style>
