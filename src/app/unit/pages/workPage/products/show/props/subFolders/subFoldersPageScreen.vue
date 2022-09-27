<template>
  <div class="py-5">
    <div class="header-product-props">
      <svg height="46.5" viewBox="0 0 246.667 46.5" width="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
        </defs>
        <path id="Path_2" class="bg"
              d="M345.333,201.167l-246.667-.5,7.507,5,7.827,6L118.333,218,122,224l6.667,10.5L134,239.833l7.333,4.333,9.667,3H296.667l7.5-1.583,4.333-1.417,8.5-6.333,1.667-2,4.667-6.5L328,218l4-5.167,4.667-4.333L341,204.167Z"
              data-name="Path 2"
              transform="translate(-98.667 -200.667)"/>
      </svg>
      <div class="title">{{ $t('reserveFolderList') }}</div>
    </div>
    <DataTable :value="list" class="filter-userManage"
               dataKey="id">
      <template #empty>
        <h5 class="smart-text-align mt-3">
          {{ $t('noResultsFound') }}
        </h5>
      </template>
      <Column header="">
        <template #body="{data}">
          <SubItem :data="data" @callBackDelete="(id) => removeItem(id)"/>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script lang="ts">
import {ReservePropFolderRepository} from '@/core/repository/ReservePropFolder.repository'
import {onMounted, ref} from "vue";
import {useRoute} from 'vue-router';
import {ReserveTimeFolderModel} from "@/data/city/workpage/pageReserveTimeFolder.ts";
import {WindowLoading} from '@/core/service/utils.service';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Currency from "@/app/public/shared/currency/Currency.vue";
import SubItem from "@/app/unit/shared/items/foldersItem/subFolderItemScreen.vue"
import {ToastService} from '@/core/service/toast.service';
import {i18n} from '@/main';

export default {
  components: {
    DataTable,
    Column,
    Currency,
    SubItem
  },
  setup(props, {emit}) {
    const route = ref(useRoute());
    const list = ref(<ReserveTimeFolderModel[]>[])
    onMounted(() => {
      WindowLoading.value = true;
      ReservePropFolderRepository.getInstance().getAllReservePropFolder({
        body: {
          "folderId": route.value.query.id,
          "workPageId": route.value.query.wId
        }, onReceive: ((res: ReserveTimeFolderModel[]) => {
          list.value = res;
          WindowLoading.value = false;
        }), onError: (err => {
          WindowLoading.value = false;
        })
      })
    })

    function getTime(date: Date) {
      return String(date).split("T")[1].replace(":00", "")
    }

    const removeItem = (id) => {
      list.value = list.value.filter(val => val.id !== id);
      ToastService.getInstance().success(i18n.global.tc('successMassage'))
    }

    return {list, getTime, removeItem}
  }
}
</script>

<style lang="scss" scoped>

.header-product-props {
  display: flex;
  width: 100%;
  position: fixed;
  left: 0%;
  top: 0;
  z-index: 10;

  .bg {
    fill: #fadadd;
  }

  .title {
    position: absolute;
    top: 10px;
    width: 100%;
    text-align: center;
    font-size: 14px;
  }

}

.main-item-control {
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 470px;

  @media (max-width: 500px) {
    max-width: 360px;

  }

  .startTime {
    position: absolute;
    font-size: 13px;
    color: #fafafa;
    left: 60%;
    padding-top: 5px;
  }

  .to {
    left: 48%;
    padding-top: 2px !important;
  }

  .endTime {
    right: 60%;
  }

  .p-button-plain {
    background: #fff;
    box-shadow: 0 0 3px #b5b5b5 !important;

    .left-side {
      display: flex;
      flex: 20%;

      .p-button {
        position: relative;
        z-index: 10;
      }
    }

    .right-side {
      display: flex;
      flex-direction: column;
      flex: 80%;
      padding: 10px;

      span.label {
        margin-bottom: 10px;
        color: #686868;
        font-size: 14px;

        span.value {
          color: #212121;
          font-size: 14px;
          margin: 0 5px;
        }
      }

    }
  }


  .head-title-folder {
    fill: #f55;
  }
}

::v-deep(th) {
  display: none;
}

::v-deep(svg) {
  padding: 0;
  width: 100%;
}

::v-deep(.p-datatable .p-datatable-tbody > tr > td) {
  border: none !important;
  background: #fafafa;
}
</style>
