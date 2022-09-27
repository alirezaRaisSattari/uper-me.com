<template>

  <div class="pb-5">
    <h5 class="header-title mt-3">{{ $t("folders") }}</h5>
    <div class="d-flex justify-content-center">
      <img alt="" class="header-shape" src="@/assets/img/svg/appbarShape.svg"/>
    </div>
    <div class="d-flex flex-wrap justify-content-between p-3">
      <loading v-if="State.loadingFolders && State.isNull"/>
      <div
          v-for="folder in State.allFolders"
          :key="folder"
          class="folders my-2"
      >
        <router-link
            :to="'/folders-product/' + folder.folderId + '/' + folder.name"
            class="
            d-flex
            flex-column
            align-items-center
            justify-content-between
            text-decoration-none text-dark
            py-5
          "
        >
          <div v-if="folder.images && folder.images.length === 0">
            <div class="row">
              <div class="col-12 custom-padding">
                <i class="mx-auto fas fa-box-open empty-icon"></i>
              </div>
            </div>
          </div>
          <div class="row m-auto mb-2 text-center align-items-center justify-content-center" >
            <div v-for="img in folder.images" :key="img" class="p-0 img-product">
              <img v-lazy="img.mainImageUrl + '_sm.webp'" alt="img" class="resize-4img"/>
            </div>
          </div>
          <span class="my-4">{{ folder.name }}</span>
        </router-link>
      </div>

    </div>

    <FloatBtn icon="icon-font uadd" @click="newFolderDialog = !newFolderDialog"/>

    <Dialog
        v-model:visible="newFolderDialog"
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
                v-model="newFolderName"
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
                @click="createNewFolder"
            />
          </div>
        </Form>
      </div>
    </Dialog>
  </div>
</template>

<script>
import {onBeforeUnmount, onMounted, ref} from "vue";
import {GetFolders} from "./getAllProductFoldersState";
import {BASE_TAKE} from "@/core/constant/constant";
import {
  getSelectedPageId,
} from "@/core/service/utils.service";
import {Field, Form} from "vee-validate";
import * as Yup from "yup";
import {i18n} from "@/main";
import {ToastService} from "@/core/service/toast.service";
import FloatBtn from "@/app/public/shared/floatBtn/floatBtn.vue";
import {ScrollController} from '@/core/service/scroll.service';

export default {
  components: {Field, Form, FloatBtn},
  setup() {
    const State = ref(new GetFolders());
    const newFolderName = ref("");
    const newFolderDialog = ref(false);
    let scrollCtrl = new ScrollController(onScroll);

    function onScroll() {
      getAllFolders()
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
      scrollCtrl.startListen();
    });

    onBeforeUnmount(() => {
      scrollCtrl.removeListen();
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

    function createNewFolder() {
      newFolderDialog.value = false;
      if (newFolderName.value.length >= 4 && newFolderName.value.length <= 14) {
        let model = {
          name: newFolderName.value,
          workPageId: Math.abs(getSelectedPageId()),
        };
        State.value.createNewProductFolder(model, () => {
          State.loadingFolders = false;
          State.FoldersIsFinished = false;
          getAllFolders();
        });
      } else
        ToastService.getInstance().warning(
            i18n.global.tc("foldersNameInvalidatin", {
              min: 4,
              max: 14,
            })
        );
      newFolderName.value = "";
    }

    return {
      State,
      titleSchema,
      newFolderName,
      newFolderDialog,
      createNewFolder,
    };
  },
};
</script>

<style scoped>

.resize-4img {
  width: 100%;
  padding: 3px;
  border-radius: 7px;
}

.img-product {
  width: 80px;
  min-height: 100px;
  max-height: 100px;
}

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

.new-ticket {
  width: 510px;
  bottom: 6%;
  z-index: 20;
}

@media only screen and (max-width: 500px) {
  .new-ticket {
    width: 95%;
  }
}
</style>


