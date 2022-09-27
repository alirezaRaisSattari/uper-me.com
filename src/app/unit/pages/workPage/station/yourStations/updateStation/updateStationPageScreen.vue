<template>
  <div>
    <div class="header">
      <svg height="46.5" viewBox="0 0 246.667 46.5" width="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
        </defs>
        <path id="Path_2" class="bg"
              d="M345.333,201.167l-246.667-.5,7.507,5,7.827,6L118.333,218,122,224l6.667,10.5L134,239.833l7.333,4.333,9.667,3H296.667l7.5-1.583,4.333-1.417,8.5-6.333,1.667-2,4.667-6.5L328,218l4-5.167,4.667-4.333L341,204.167Z"
              data-name="Path 2"
              transform="translate(-98.667 -200.667)"/>
      </svg>
      <div class="title">{{ `${$t('update')} ${$t('station')}` }}</div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col mt-3">
          <div class="form mt-5">
            <h6 class="smart-text-align">{{ $t('stationType') }}</h6>
            <div class="mt-3 d-flex">
              <div class="p-field-radiobutton d-flex">
                <RadioButton id="type1" v-model="state.postData.type" :disabled="true" :value="1" name="type"/>
                <label class="mx-2" for="type1">{{ $t('place') }}</label>
              </div>
              <div class="p-field-radiobutton d-flex">
                <RadioButton id="type2" v-model="state.postData.type" :disabled="true" :value="2" name="type"/>
                <label class="mx-2" for="type2">{{ $t('desk') }}</label>
              </div>
              <div class="p-field-radiobutton d-flex">
                <RadioButton id="type3" v-model="state.postData.type" :disabled="true" :value="3" name="type"/>
                <label class="mx-2" for="type3">{{ $t('chair') }}</label>
              </div>
              <div class="p-field-radiobutton d-flex">
                <RadioButton v-if="state.postData.type == 4" id="type4" v-model="state.postData.type" :disabled="true"
                             :value="4"
                             name="type"/>
                <RadioButton v-if="state.postData.type == 5 || state.postData.type !== 4" id="type4"
                             v-model="state.postData.type" :disabled="true"
                             :value="5"
                             name="type"/>
                <label class="mx-2" for="type4">{{ $t('vehicle') }}</label>
              </div>
            </div>
            <template v-if="(state.postData.type !== 4 && state.postData.type !== 5)">
              <div class="d-flex flex-column smart-text-align mb-2">
                <label for="title">{{ $t('title') }}</label>
                <InputText id="title" v-model="state.postData.title" :class="!state.validation ? 'p-invalid':''"
                           :placeholder="$t('title')" class="input-control" type="text"/>
              </div>
              <div class="d-flex flex-column smart-text-align mb-2">
                <label for="plateNumber">{{ $t('plaque') }}</label>
                <InputText id="plateNumber" v-model="state.postData.plateNumber"
                           :class="!state.validation ? 'p-invalid':''"
                           :placeholder="$t('plaque')" class="input-control" type="text"/>
              </div>
            </template>

            <template v-if="state.postData.type === 4 || state.postData.type === 5">
              <div class="d-flex flex-column smart-text-align mb-2">
                <Dropdown v-model="state.vehicleType" :disabled="true" :options="state.vehicles"
                          optionLabel="name" panelClass="smart-text-align" @change="state.changeVehicle()"/>
              </div>
              <div class="d-flex flex-column smart-text-align mb-2">
                <label for="title">{{ $t('vehicleName') }}</label>
                <InputText id="vehicleName" v-model="state.postData.title" :placeholder="$t('vehicleName')"
                           class="input-control"
                           type="text"/>
              </div>
              <div class="mb-2 d-flex flex-column">
                <label class="smart-text-align" for="title">{{ $t('plaque') }}</label>
                <div v-if="state.postData.type === 5" class="d-flex flex-row smart-text-align dl align-items-end">
                  <div class="mask1">
                    <CustomInputMask :id="'input'" :color="'#fff'"
                                     :maskList="state.maskList1"
                                     @callBackMask="(event) => state.callBackMask(event,1)"/>
                  </div>
                  <div class="mask2">
                    <CustomInputMask :id="'inputMask'" :color="'#039be5'"
                                     :maskList="state.maskList2"
                                     @callBackMask="(event) => state.callBackMask(event,2)"/>
                  </div>
                </div>
                <div v-if="state.postData.type === 4" class="d-flex flex-row smart-text-align dl align-items-end">
                  <div class="mask1">
                    <CustomInputMask :id="'inputMotor'" :color="'#fff'"
                                     :maskList="state.maskMotor"
                                     @callBackMask="(event) => state.callBackMask(event,1)"/>
                  </div>
                  <div class="mask2">
                    <CustomInputMask :id="'inputMo'" :color="'#039be5'"
                                     :maskList="state.maskMotor2"
                                     @callBackMask="(event) => state.callBackMask(event,2)"/>
                  </div>
                </div>
              </div>
            </template>

            <div class="card">
              <div class="d-flex flex-column smart-text-align mb-2">
                <label for="plateNumber">{{ $t('description') }}</label>
                <InputText id="plateNumber" v-model="state.postData.description" :placeholder="$t('description')"
                           class="input-control" type="text"/>
              </div>
              <SelectImageWorkPage v-if="state.imageData.mainPhoto !== ''" :data="state.imageData" :type="1"
                                   @images="(event) => callbackImage(event)"/>
            </div>
          </div>
          <div class="submit-form">
            <Button :label="$t('submit')" class="p-button-rounded p-button-danger"
                    @click="state.beforeCreateStation()"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from 'vue';
import {updateStationPageState} from './updateStationPageState'
import RadioButton from 'primevue/radiobutton';
import SelectImageWorkPage from '@/app/unit/shared/imageSelctorStation/selectImageWorkPageScreen.vue';
import {CreateWorkPageOtherImageList} from '@/app/unit/pages/newCreateWorkPage/CreateWorkPage.model';
import Dropdown from 'primevue/dropdown';
import InputMask from 'primevue/inputmask';
import CustomInputMask from '@/app/unit/shared/customInputMask/customInputMaskScreen.vue';
import SelectImageStationsDocScreen
  from '@/app/unit/shared/imageSelctorStation/SelectImageStationsDoc/SelectImageStationsDocScreen.vue';

export default defineComponent({
  components: {
    RadioButton,
    SelectImageWorkPage,
    Dropdown,
    InputMask,
    CustomInputMask,
    SelectImageStationsDocScreen
  },
  setup() {
    const state = ref(new updateStationPageState((callback) => {

    }))
    const imageTabData = ref({});

    onMounted(() => {
      state.value.getDetails();
    });

    async function callbackImage(event) {
      let list = [];

      event.list.oderList.forEach(item => {
        const image = <CreateWorkPageOtherImageList>{
          base64: item.file ? item.file : '',
          progress: 0,
          link: item.link ? item.link : ''
        }
        list.push(image);
      });
      state.value.station.images = list;
    }

    return {state, imageTabData, callbackImage}
  }
})
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  position: fixed;
  top: 0;
  width: 500px;
  z-index: 10;
  @media screen and (max-width: 500px) {
    width: 100%;
  }

  .bg {
    fill: #fadadd;
  }

  .title {
    position: absolute;
    top: 10px;
    width: 100%;
    text-align: center;
  }

}

label {
  font-size: 15px;
}

.input-control {
  padding: 10px !important;
  color: #212121;
  border: 1px solid #eee !important;
}

.card {
  width: 100%;
  padding: 10px;
  margin-bottom: 80px;
}

.submit-form {
  width: 477px;
  position: fixed;
  bottom: -32px;
  display: flex;
  justify-content: center;
  background: #fadadd;
  border-radius: 50px;
  box-shadow: 0 -4px 5px #a9a9a9 !important;
  padding: 20px 10px 42px;
  @media screen and (max-width: 993px) {
    z-index: 100;
  }
  @media screen and (max-width: 500px) {
    left: 0;
    width: 100%;
    bottom: -26px;
  }

  button {
    padding: 13px 70px;
  }
}

::v-deep(.p-dropdown .p-dropdown-label) {
  text-align: right !important;
}


.plateNumber {
  margin: 0 10px;
  width: 80%;
  text-align: center;
  font-size: 30px;
  color: #212121;
}

.plateId {
  background: #007bff;
  width: 20%;
  text-align: center;
  font-size: 30px;
  color: #fff;
}

.mask1 {
  flex: 80%;
  border-radius: 10px;
  margin-right: 5px;
}

.mask2 {
  flex: 20%;
  border-radius: 10px;
}

.add-document {
  position: absolute;
  padding: 10px 30px;
  left: 10px;

  &:focus {
    box-shadow: none !important;
  }
}

.p-invalid {
  border: 1px solid red !important;
}
</style>
