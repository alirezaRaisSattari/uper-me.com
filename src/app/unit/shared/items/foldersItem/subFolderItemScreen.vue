<template>
  <ConfirmDialog></ConfirmDialog>
  <div class="main-item-control">
    <span class="startTime">{{ getTime(data.startTime) }}</span>
    <span class="startTime to">{{ $t('to') }}</span>
    <span class="startTime endTime">{{ getTime(data.endTime) }}</span>
    <svg height="26.284" viewBox="0 0 356.031 36.284" width="450" xmlns="http://www.w3.org/2000/svg">
      <path id="title-folder-item" class="head-title-folder"
            d="M375.063,88.1c.679.754,3.878,6.513,3.878,6.513l5.046,8.95,2.486,5.448,2.319,4.349,2.163,2.576,2.477,1.773,4.49,2.312,3.628,1.167H45.519l5.8-1.45,4.9-2.225,2.048-1.344,1.565-1.937,1.054-1.448,2.122-3.492,1.961-3.7,1.769-3.5.754-1.8,1.132-3.026.961-2.916,1.1-2.573,1.372-2.059,2.458-2.165L77.2,85.949a24.4,24.4,0,0,1,3.249-.88,28.225,28.225,0,0,1,5.816,0s276.861-.436,277.326.162c0,0,.6-.148,5.958.718,3.379.546,4.372.9,5.024,1.612A4.514,4.514,0,0,1,375.063,88.1Z"
            transform="translate(-45.519 -84.901)"/>
    </svg>
    <div class="p-button-raised p-button-text p-button-plain no-shadow d-flex align-items-center">
      <div class="right-side smart-text-align">
                <span class="label">
                    {{ $t('specifications') }} :
                    <span class="value">
                        {{ data.description }}
                    </span>
                </span>
        <span class="label">
                    {{ $t('cost') }} :
                    <span class="value">
                        {{ data.defaultPrice }}
                    </span>
                        <Currency :currency-id="1"/>
                </span>
      </div>
      <div class="left-side ">
        <Button aria-controls="overlay_menu" aria-haspopup="true"
                class="p-button-rounded p-button-text text-black-50 no-shadow"
                icon="pi pi-ellipsis-v" type="button" @click="toggle"/>
        <Menu id="overlay_menu" ref="menu" :model="items" :popup="true"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Currency from "@/app/public/shared/currency/Currency.vue";
import Menu from 'primevue/menu';
import {ref} from 'vue'
import {i18n} from '@/main';
import ConfirmDialog from 'primevue/confirmdialog';
import {useConfirm} from 'primevue/useconfirm';
import {ReservePropFolderRepository} from '@/core/repository/ReservePropFolder.repository';
import {useRoute} from 'vue-router';
import {WindowLoading} from '@/core/service/utils.service';

export default {
  props: {
    data: Object
  },
  emits: ['callBackDelete'],
  components: {
    Currency,
    Menu,
    ConfirmDialog
  },
  setup(props, {emit}) {
    const confirm = useConfirm();
    const route = ref(useRoute());

    function getTime(date: Date) {
      return String(date).split("T")[1].replace(":00", "")
    }

    const menu = ref();

    const items = ref([
      {
        label: 'Options',
        items: [{
          label: i18n.global.tc('update'),
          icon: 'fas fa-pencil-alt',
          command: () => {
          }
        },
          {
            label: i18n.global.tc('delete'),
            icon: 'far fa-trash-alt',
            command: () => {
              deleteConfirm(props.data.id);
            }
          }
        ]
      },
    ])
  //todo: in check beshe
    const deleteConfirm = (itemId) => {
      confirm.require({
        message: i18n.global.tc('deleteItemQuestion'),
        // header: i18n.global.tc('delete'),
        icon: 'pi pi-info-circle m-2',
        acceptClass: 'p-button-danger',
        acceptLabel: i18n.global.tc('yes'),
        rejectLabel: i18n.global.tc('no'),
        accept: () => {
          WindowLoading.value = true;
          ReservePropFolderRepository.getInstance().deleteReservePropFolder({
            body: {
              itemId: itemId,
              folderId: route.value.query.id,
              workPageId: route.value.query.wId
            }, onReceive: (res => {
              WindowLoading.value = false;
              emit('callBackDelete', true);
            }), onError: (err => {
              WindowLoading.value = false;
            })
          })
        },
      });
    }
    const toggle = (event) => {
      menu.value.toggle(event);
    };

    return {
      getTime,
      items,
      toggle,
      menu
    }
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
  max-width: 360px;
  display: flex;
  flex-direction: column;
  margin: auto;

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
    box-shadow: 0 0 3px #b5b5b5 !important;

    .left-side {
      display: flex;
      flex: 20%;
      justify-content: flex-end;
      position: relative;
      top: -20px;

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
</style>
