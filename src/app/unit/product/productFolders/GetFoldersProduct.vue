<template>
  <!-- areopigoarejgioparejgiaeprpguihareighaghiuaghuiareuighu -->
  <div>
    <ConfirmDialog></ConfirmDialog>
    <h5 class="header-title mt-3">{{ $t("products") }}</h5>
    <div class="d-flex justify-content-center">
      <img alt="" class="header-shape" src="@/assets/img/svg/appbarShape.svg" />
    </div>
    <div class="w-100 d-flex justify-content-between p-3">
      <span>{{ $t("products") }} : {{ folderName }}</span>
      <p>
        <span
          class="mx-2 hover-pointer"
          @click="folderListDialog = !folderListDialog"
          >انتقال</span
        >
        <i
          class="hover-pointer fas fa-ellipsis-v ellipsis-size"
          style="font-size: 20px"
          @click="folderOption = !folderOption"
        ></i>
      </p>
    </div>
    <loading v-if="State.loadingProducts && !State.isNull" />
    <div v-if="State.isNull" class="mt-5 w-100">
      <div class="d-flex justify-content-center mt-5">
        <i class="fas fa-box-open fa-6x mt-5"></i>
      </div>
      <p class="text-center mt-5">{{ $t("emptyFolderList") }}</p>
    </div>
    <div class="d-flex flex-wrap justify-content-between p-3">
      <div
        v-for="product in State.allProducts"
        :key="product"
        class="folders my-2"
      >
        <router-link
          :to="'/product/' + product.productId + '/' + workPageId"
          class="text-decoration-none text-dark"
        >
          <img
            v-lazy="product.mainImageUrl + '_sm.webp'"
            class="w-100 h-75 product-image"
          />
        </router-link>
        <div
          class="
            w-100
            text-right
            p-2
            d-flex
            justify-content-between
            align-items-center
          "
        >
          <span>{{ product.name }}</span>
          <input
            v-model="product.isSelected"
            type="checkbox"
            @click="
              product.isSelected
                ? deselect(product.productId)
                : selectProduct(product.productId)
            "
          />
        </div>
      </div>
    </div>
    <Dialog
      v-model:visible="folderOption"
      :breakpoints="{
        '1000px': '52vw',
        '800px': '65vw',
        '600px': '91vw',
      }"
      :contentStyle="{ background: 'rgb(255, 255, 255)'}"
      :showHeader="false"
      :style="{}"
      dismissableMask
      header=""
      modal
    >
      <div class="p-3">
        <div
          class="w-100 py-2 text-right hover-pointer"
          @click="editFolder = !editFolder"
        >
          {{ $t("editFolderName") }}
        </div>
        <div class="w-100 py-2 text-right hover-pointer" @click="deleteFolder">
          {{ $t("deleteFolder") }}
        </div>
      </div>
    </Dialog>
    <Dialog
      v-model:visible="editFolder"
      :breakpoints="{
        '1000px': '52vw',
        '800px': '65vw',
        '600px': '91vw',
      }"
      :contentStyle="{ background: 'rgb(255, 255, 255)'}"
      :showHeader="false"
      :style="{}"
      dismissableMask
      header=""
      modal
    >
      <div class="p-3">
        <Form
          v-slot="{ errors }"
          :validation-schema="titleSchema"
          class="w-100"
          @submit="onSubmitLogin"
        >
          <div class="w-100 px-2 my-2">
            <Field
              id="title"
              v-model="FolderNewName"
              :placeholder="$t('folder_name')"
              class="px-2 form-control"
              name="title"
              type="text"
            />
            <div class="text-danger text-sm w-100 text-center">
              {{ errors.title }}
            </div>
          </div>
          <div class="w-100 px-2 my-2"></div>
          <div class="w-100 text-center mb-2">
            <Button
              :label="$t('submit')"
              :loading="loading"
              class="
                w-50
                btn
                mt-2
                rounded-pill
                py-1
                color-light
                bg-success
                text-light
                mt-2
              "
              @click="updateFolderName"
            />
          </div>
        </Form>
      </div>
    </Dialog>
    <Dialog
      v-model:visible="folderListDialog"
      :breakpoints="{
        '1000px': '52vw',
        '800px': '65vw',
        '600px': '91vw',
      }"
      :contentStyle="{ background: 'rgb(255, 255, 255)'}"
      :showHeader="false"
      :style="{}"
      dismissableMask
      header=""
      modal
    >
      <div class="pغ-3">
        <p
          v-for="folder in State.allFolders"
          :key="folder"
          class="w-100 uper-card-1 px-2 py-3 text-right hover-pointer"
          @click="moveToFolder(folder.folderId)"
        >
          {{ folder.name }}
        </p>
      </div>
    </Dialog>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { FoldersProduct } from "./GetFoldersProductState";
import {
  getSelectedPageId,
  windowScrolledToBottom,
} from "@/core/service/utils.service";
import { BASE_TAKE } from "@/core/constant/constant";
import { Field, Form } from "vee-validate";
import * as Yup from "yup";
import { i18n } from "@/main";
import { ToastService } from "@/core/service/toast.service";
import ConfirmDialog from "primevue/confirmdialog";
import { useConfirm } from "primevue/useconfirm";

export default {
  components: { Field, Form, ConfirmDialog },
  setup() {
    const State = ref(new FoldersProduct());
    const router = useRoute();
    const folderId = ref(router.params.folderId);
    const folderName = ref(router.params.folderName);
    const workPageId = Math.abs(getSelectedPageId());
    const folderOption = ref(false);
    const editFolder = ref(false);
    const folderListDialog = ref(false);
    const FolderNewName = ref("");
    const confirm = useConfirm();
    const selectedProducts = ref([]);

    function getProducts() {
      let model = {
        skip: 0,
        take: BASE_TAKE,
        workPageId: Math.abs(getSelectedPageId()),
        myPageId: null,
        productType: null,
        name: null,
        folderId: folderId.value,
        requestTime: new Date(),
      };
      State.value.getproducts(model);
    }

    function getAllFolders() {
      let model = {
        skip: 0,
        take: BASE_TAKE,
        workPageId: Math.abs(getSelectedPageId()),
      };
      State.value.getAllFolders(model);
    }

    onMounted(() => {
      getAllFolders();
      getProducts();
      windowScrolledToBottom(() => {
        getAllFolders();
        getProducts();
      });
    });
    const titleSchema = Yup.object().shape({
      title: Yup.string()
        .test(
          "len",
          i18n.global.tc("foldersNameInvalidatin", {
            min: 4,
            max: 14,
          }),
          (val) => val.length >= 4 && val.length <= 14
        )
        .default(""),
    });

    function deleteFolder() {
      confirm.require({
        message: i18n.global.tc("delete?"),
        acceptLabel: i18n.global.tc("yes"),
        rejectLabel: i18n.global.tc("no"),
        acceptClass: "p-button-danger",
        accept: () => {
          State.value.deleteProductFolder(folderId.value, workPageId);
        },
        reject: () => {},
      });
    }

    function updateFolderName() {
      if (FolderNewName.value.length >= 4 && FolderNewName.value.length <= 14) {
        let model = {
          folderId: folderId.value,
          name: FolderNewName.value,
          workPageId: workPageId,
        };
        State.value.updateProductFolderName(model);
      } else
        ToastService.getInstance().warning(
          i18n.global.tc("foldersNameInvalidatin", {
            min: 4,
            max: 14,
          })
        );
      FolderNewName.value = "";
      folderOption.value = false;
      editFolder.value = false;
    }

    function selectProduct(id) {
      selectedProducts.value.push(id);
    }

    function deselect(id) {
      selectedProducts.value.splice(selectedProducts.value.indexOf(id), 1);
    }

    function moveToFolder(id) {
      confirm.require({
        message: i18n.global.tc("to-transfer-item"),
        icon: "fas fa-info-circle",
        acceptLabel: i18n.global.tc("yes"),
        rejectLabel: i18n.global.tc("no"),
        acceptClass: "p-button-danger",
        accept: () => {
          if (selectedProducts.value.length > 0) {
            let model = {
              productIds: selectedProducts.value,
              destinationFolderId: id,
              workPageId: workPageId,
            };
            State.value.moveToFolder(model, () => {
              State.value.loadingProducts = false;
              State.value.ProductsIsFinished = false;
              getProducts();
            });
          } else
            ToastService.getInstance().warning(
              i18n.global.tc("noItemsSelected")
            );
          folderListDialog.value = false;
        },
        reject: () => {
          folderListDialog.value = false;
        },
      });
    }

    return {
      folderName,
      titleSchema,
      State,
      folderId,
      workPageId,
      folderOption,
      folderListDialog,
      editFolder,
      FolderNewName,
      deleteFolder,
      updateFolderName,
      selectProduct,
      deselect,
      moveToFolder,
    };
  },
};
</script>
<style scoped>
.header-title {
  text-align: center;
  width: 100%;
  position: absolute;
}

.header-shape {
  width: 288px;
}

.folders {
  width: 48%;
  border-radius: 10px;
  box-shadow: 1px 2px 8px #8080806e;
}

.product-image {
  border-radius: 10px 10px 0 0;
}
</style>
