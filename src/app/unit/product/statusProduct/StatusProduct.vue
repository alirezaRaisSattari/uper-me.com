<template>
  <ConfirmDialog></ConfirmDialog>
  <div class="col bg-white shadow-sm rounded border p-2">
    <div class="d-flex flex-column justify-content-center align-items-center">
      <p class="align-self-start mb-0">{{ $t("show_ware_status") }}</p>
      <div class="d-flex justify-content-center align-items-center border rounded my-2">
        <button v-for="item of showStatus" :class="[typeShowStatus===item.type? ' btn-yellow':' btn-gray','']"
                class="btn rounded-0"
                @click="btnShowStatus(item.type)">{{ item.name }}
        </button>
      </div>
    </div>
    <div class="d-flex flex-column justify-content-center align-items-center p-2">
      <p class="align-self-start mb-0">{{ $t("maintenanceType") }}</p>
      <select v-model="modelMaintenanceType" class="form-control m-3">
        <option v-for="item of maintenanceType" :value="item.type">{{ item.name }}</option>
      </select>
    </div>
  </div>

  <div class="col bg-white shadow-sm rounded border p-2 my-3">
    <div class="d-flex justify-content-between align-items-center p-2">
      <p class=" mb-0">{{ $t("choose_product_folder") }}</p>
      <Button :label="$t('addFolder')" class="p-button-info p-button-raised" @click="showAddFolder"/>
    </div>
    <hr>
    <div class="d-flex flex-column justify-content-center align-items-center p-2">
      <div class="d-flex justify-content-center w-100">
        <swiper
            :direction="'horizontal'"
            :free-mode="true"
            :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
            :slides-per-view="'auto'"
            :space-between="0"
            class="slider swiper-container"
        >
          <swiper-slide class="d-flex justify-content-center">
            <div v-for="(item) of listFolder" v-if="listFolder.length!==0"
                 :class="[indexFolderSelect===item.id? 'uper-card-1 cursor-none':'border-gray']"
                 class="col-3 select-folder"
                 @click="selectedFolder(item.id)">
              <i class="far fa-folder-open my-2"></i>
              <p class="mb-0">{{ item.name }}</p>
              <div class="d-flex justify-content-around align-items-center">
                <i class="fas fa-pen text-warning mx-1" @click="updateFolder(item.name)"></i>
                <i class="fas fa-trash text-danger mx-1" @click="deleteFolder(item.id,item.name)"></i>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>


  <div class="d-flex justify-content-center align-items-center">
    <Button :label="$t('continue')" class="p-button-raised p-button-danger my-3 " @click="btnContinue"/>
  </div>

  <Dialog v-model:visible="displayAddFolder" :breakpoints="{'600px': '30vw'}" :dismissableMask="true"
          :header="$t('addFolder')"
          :modal="true" :style="{width: '40vw'}">
    <AddFolder @passData="(value)=>addFolder(value)"/>
  </Dialog>

  <Dialog v-model:visible="displayUpdateProduct" :breakpoints="{'600px': '30vw'}" :dismissableMask="true"
          :header="$t('update')"
          :modal="true" :style="{width: '40vw'}">
    <UpdateFolderProduct :folder-id="indexFolderSelect" :name-folder="nameFolder"
                         @passData="(value)=>{displayUpdateProduct=value}"/>
  </Dialog>

</template>

<script>
import {i18n} from "../../../../main";
import {ShowStatusProduct} from "../../../../core/enum/enums";
import {onMounted, ref} from 'vue'
import Dialog from 'primevue/dialog';
import AddFolder from "./AddFolder";
import {ToastService} from "../../../../core/service/toast.service";
import {StatusProductModel} from "./StatusProductModel";
import ConfirmDialog from 'primevue/confirmdialog';
import {useConfirm} from "primevue/useconfirm"
import UpdateFolderProduct from "./updateFolder/UpdateFolderProduct";
import {Swiper, SwiperSlide} from "swiper/vue";

const {MaintenanceTypeProduct} = require("../../../../core/enum/enums");
export default {
  name: "StatusProduct",
  components: {UpdateFolderProduct, AddFolder, Dialog, ConfirmDialog, Swiper, SwiperSlide},
  emits: ['passData'],
  setup(props, {emit}) {
    const confirm = useConfirm();
    const typeShowStatus = ref(null)
    const modelMaintenanceType = ref(null)
    const indexFolderSelect = ref(null)
    const listFolder = ref([])
    const displayAddFolder = ref(false);
    const isShow = ref();
    const nameFolder = ref();
    const refUpdateFolder = ref()
    const displayUpdateProduct = ref(false);
    const objStatusProduct = ref(new StatusProductModel());
    const showStatus = ref([
      {type: ShowStatusProduct.ShowProduct, name: i18n.global.tc("show_product")},
      {type: ShowStatusProduct.NotShowProduct, name: i18n.global.tc("not_show_product")}
    ])
    const maintenanceType = ref([
      {type: MaintenanceTypeProduct.Normal, name: i18n.global.tc("normal")},
      {type: MaintenanceTypeProduct.Glacier, name: i18n.global.tc("glacier")},
      {type: MaintenanceTypeProduct.Sensitive, name: i18n.global.tc("sensitive")},
      {type: MaintenanceTypeProduct.ExpressDelivery, name: i18n.global.tc("expressDelivery")},
      {type: MaintenanceTypeProduct.HotFood, name: i18n.global.tc("hotFood")}
    ])

    onMounted(() => {
      objStatusProduct.value.getAllFolderProduct(item => {
        item.forEach((i) => {
          listFolder.value.push({
            id: i.folderId,
            name: i.name
          })
        })
      });
    })

    function btnShowStatus(type) {
      typeShowStatus.value = type;
      isShow.value = type === 1;
    }

    function showAddFolder() {
      displayAddFolder.value = true;
    }

    function addFolder(value) {
      displayAddFolder.value = value.display;
      listFolder.value.push({
        name: value.name,
        id: value.id
      })
    }


    function selectedFolder(id) {
      if (listFolder.value.length !== 0) {
        indexFolderSelect.value = id;

      }
    }

    function updateFolder(name) {
      displayUpdateProduct.value = true;
      nameFolder.value = name;
    }

    function deleteFolder(id, name) {
      confirm.require({
        message: 'آیا میخواهید این پوشه را حذف کنید ؟',
        header: name,
        icon: 'pi pi-info-circle',
        acceptLabel: 'بله',
        rejectLabel: 'خیر',
        acceptClass: 'p-button-danger p-button-raised',
        rejectClass: 'p-button-raised',
        accept: () => {
          objStatusProduct.value.deleteFolderProduct(id);
        },
      })
    }

    function btnContinue() {
      if (listFolder.value.length === 0 || typeShowStatus.value === null || modelMaintenanceType.value === null || indexFolderSelect.value === null) {
        ToastService.getInstance().error("ابتدا فیلدهای زیر را پر کنید مجددا امتحان کنید");
        return;
      }
      emit('passData', {
        step: 5,
        statusProduct: {
          isShow: isShow.value,
          cargoType: modelMaintenanceType.value,
          folderId: indexFolderSelect.value
        }
      })
    }

    return {
      showStatus,
      modelMaintenanceType,
      maintenanceType,
      typeShowStatus,
      displayAddFolder,
      listFolder,
      indexFolderSelect,
      displayUpdateProduct,
      nameFolder,
      btnShowStatus,
      showAddFolder,
      addFolder,
      selectedFolder,
      btnContinue,
      updateFolder,
      deleteFolder
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-yellow {
  background-color: #ffa000;
}

.btn-gray {
  background-color: #eeeeee;
}

.select-folder {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin: 5px;
  transition: 0.3s;
  cursor: pointer;
  border: 1px solid darkgrey;
  border-radius: 10px;
}

.cursor-none {
  cursor: default;
}

.border-yellow {
  border: 1px solid #ffa000;
}

.border-gray {
  border: 1px solid #eeeeee;
}
</style>
