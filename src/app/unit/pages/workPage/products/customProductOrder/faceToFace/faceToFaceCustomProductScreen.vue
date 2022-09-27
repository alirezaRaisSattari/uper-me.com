<template>
    <div>
        <Header :title="$t('faceToFaceCustomProduct')" />
    </div>
  <div class="FaceToFace-card">
    <div class="card-p d-flex ">
      <p >{{$t('cost')}}</p>
      <div class="Stars"></div>
    </div>
    <div class="main-bar">
      <div class="card-input">
        <InputNumber class="FaceToFace-card-input" v-model="value"  :placeholder="$t('tomanprice')"/>
      </div>
      <div class="card-drop">
        <Dropdown panelClass="max-height-controller" v-model="state.selectCost" :options="state.Costs" optionLabel="name" optionValue="value"  :placeholder="$t('select')" />
      </div>
      <div class="card-area mt-3 w-100">
           <Textarea
               v-model="description"
               :autoResize="true"
               :placeholder="$t('description')"
               class="
                        w-100
                        text-decoration-none
                        uper-card-1
                        p-10px
                        mt-2
                        text-right
                        text-area-des
                     "
               cols="30"
               rows="2"
           />
      </div>
    </div>
  </div>
  <Footer>
      <Button @click="state.onSubmit()" class="btn-footer w-50" :label="$t('create')"/>
  </Footer>
</template>

<script lang="ts">
import Footer from '@/app/unit/shared/footerApp/fixedFooterScreen.vue'
import Header from '@/app/unit/shared/headerApp/headerAppScreen.vue';
import {FaceToFaceCustomProductState} from './faceToFaceCustomProductState';
import InputNumber from 'primevue/inputnumber';
import Dropdown from 'primevue/dropdown';
import { ref} from 'vue'
import Textarea from 'primevue/textarea';
export default {
    components:{
        Header,
        InputNumber,
        Dropdown,
        Textarea,
        Footer
    },
    setup () {
         const state = ref(new FaceToFaceCustomProductState());

        return {
          state,
        }
    }
}
</script>

<style lang="scss" scoped>
.FaceToFace-card{
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
  min-height: 150px;
  max-width: 100%;
  padding: 10px;
  color: #212121;
  margin: 8px 6px ;
  position: relative;
}
.FaceToFace-card-input{
  width: 98%;
  height: 40px;
  border: 1px solid #7d7d7d !important;
  border-radius: 5px;
}
.FaceToFace-card-drop{
  width: 98%;
}
.card-drop{
  width: 50%;
}
.card-input{
  width: 50%;
}
.main-bar{
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;

}
::v-deep(.p-dropdown-item) {
  font-size: 14px;
}
::v-deep(.p-dropdown-panel .p-dropdown-items .p-dropdown-item.p-highlight) {
  background: #f8f9fa !important;
}
::v-deep(.p-dropdown) {
  box-shadow: none !important;
  border-radius: 5px;
  border: 1px solid #7d7d7d !important;
  height: 50px ;
  .p-dropdown-label, .p-dropdown-item {
    font-size: 14px;
  }
}

.text-area-des{
  border: 1px solid #7d7d7d !important;
}

.Stars::before {
  content: "★";
  letter-spacing: 4px;
  font-size: 8px;
  background:
  red;
  -webkit-background-clip: text;
  -webkit-text-fill-color: #00000029;
}
</style>