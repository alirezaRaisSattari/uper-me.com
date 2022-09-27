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
      <div class="title">{{ $t('yourStations') }}</div>
    </div>

    <div class="container">
      <div class="row pt-4">
        <div class="col mt-3">
          <DataTable :loading="state.dataView.loading" :rows="state.dataView.listStations.length"
                     :value="state.dataView.listStations"
                     dataKey="bankId" headerClass="d-none" responsiveLayout="scroll">
            <template #empty>
              <h6 class="smart-text-align border p-3">{{ $t('empty') }}</h6>
            </template>
            <template #loading>
              <h6 class="smart-text-align border p-3">{{ $t('loading') }}</h6>
            </template>
            <Column field="name">
              <template #body="{data}">
                <Button
                    class="p-button-outlined p-button-plain card-btn no-shadow justify-content-between flex-container"
                    type="button"
                    @click="state.goToPreview(data.id)">
                  <div class="left-side">
                    <span class="smart-text-align">
                     {{ data.title }}
                    </span>
                    <span class="smart-text-align mt-3">
                     {{ data.description }}
                    </span>
                  </div>
                  <div class="right-side reverse-smart-text-align">
                    <span class="title-image">{{ state.checkStatus(data.stationStatus) }}</span>
                    <span v-if="data.otherImageUrls.length > 0"
                          class="count mt-3">+{{ data.otherImageUrls.length }}</span>
                    <img v-lazy="data.mainImageUrl" alt="img">
                  </div>
                </Button>
              </template>
            </Column>
          </DataTable>
          <div class="d-flex justify-content-end p-2 footer-control">
            <Button class="p-button-raised p-button-rounded p-button-warning" icon="fa fa-map-marker-alt"
                    @click="state.checkOntAllow()"/>
          </div>
        </div>
      </div>
    </div>
  </div>
    <br>
    <br>
    <br>
    <br>
    <br>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from 'vue';
import {YourStationsState} from './YourStationsState'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

export default defineComponent({
  components: {
    DataTable,
    Column,
  },
  setup() {
    const state = ref(new YourStationsState())

    onMounted(() => {
      state.value.getList();
    })


    return {state}
  }
})
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  width: 100%;
  position: fixed;
  left: 0%;
  z-index: 10;

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

.card-btn {
  width: 100%;
  display: flex;
  flex-direction: row;
  box-shadow: 0 0 5px #cacaca !important;
  border: 1px solid #cacaca !important;

  &:hover {
    border: 1px solid #cacaca !important;
  }

  .left-side {
    display: flex;
    flex-direction: column;
    flex-grow: 8;

    span {
      display: block;
    }
  }

  .right-side {
    display: flex;
    flex-direction: column;
    flex-grow: 8;
    text-align: center !important;
    align-items: flex-end;
    img {
      width: 120px;
      height: 120px;
      border-radius: 10px;
    }

    .title-image {
      display: block;
      width: 90px;
      position: absolute;
      background: #3948AB;
      color: #fff;
      top: 0;
      left: 25px;
      border-bottom-right-radius: 10px;
      border-bottom-left-radius: 10px;
      font-size: 15px;
      padding: 3px;
    }

    .count {
      display: flex;
      width: 30px;
      height: 30px;
      align-items: center;
      justify-content: center;
      position: absolute;
      background: #D3D3D3;
      color: #212121;
      top: 8px;
      border-radius: 50px;
      left: 120px;
    }


    span {
      display: block;
    }

  }

  .footer-control {
    position: fixed;
    bottom: 60px;
    z-index: 10;

  }

  .p-button-rounded {
    font-size: 24px;
  }
}

.footer-control {
  position: fixed;
  bottom: 35px;
}
@media (max-width: 992px) {
.footer-control {
  position: fixed;
  bottom: 105px;
}
}
::v-deep(.p-datatable .p-datatable-tbody > tr) {
  background: transparent !important;
}

::v-deep(.p-datatable .p-datatable-tbody > tr > td) {
  border: none;
}

::v-deep(.p-datatable .p-datatable-thead > tr > th) {
  display: none;
}
</style>
