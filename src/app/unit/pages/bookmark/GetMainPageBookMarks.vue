<template>
  <!-- nav -->


  <ul  class="nav nav-justified nav-tabs text-center p-0">
    <li
        v-for="unit in units"
        :key="unit.key"
        :class="currentUnit == unit.key ? 'text-info' : ''"
        class="nav-item hover-pointer border-0 user-select-none"
        @click="currentUnit = unit.key"
    >
      <div class="nav-link border-0" v-if="saved">
        <small>
          {{ unit.title }}
        </small>
      </div>
    </li>
  </ul>
  <!-- products -->
  <template v-if="currentUnit == 1">
    <div class="container">
      <p v-if="State.allProductFolders.length==0 && !State.loadingProductsFolders"
         class="my-2 text-Secondary w-100 text-center">{{ $t("noItems") }}</p>
      <!--  cards -->
      <div v-else id="scroll-follow-folder" class="row">
        <div
            v-for="folder in State.allProductFolders"
            :key="folder"
            class="
            col-5
            p-1
            mt-4
            my-2
            mx-auto
            card
            uper-card-1
            hover-pointer
            fit-height
            mb-auto
          "
          @click="getRouterProduct(folder.folderId,folder.name)"
        >
          <div class="height100">
            <div
                v-if="folder.products.length === 0"
                class="empty-list d-flex align-items-center"
            >
              <i class="mx-auto fas fa-box-open empty-icon"></i>
            </div>
            <img
                v-if="folder.products.length === 1"
                v-lazy="folder.products[0].mainImageUrl+'_sm.webp'"
                alt="img"
                class="resize-1img"
            />
            <div
                v-else-if="folder.products.length === 2"
                class="row m-auto resize-2div"
            >
              <div v-for="img in folder.products" :key="img" class="col-6 p-0">
                <img v-lazy="img.mainImageUrl + '_sm.webp'" alt="img" class="resize-2img"/>
              </div>
            </div>
            <div v-else class="row m-auto">
              <div v-for="img in folder.products" :key="img" class="col-6 p-0">
                <img v-lazy="img.mainImageUrl + '_sm.webp'" alt="img" class="resize-4img"/>
              </div>
            </div>
          </div>
          <p class="text-center mx-auto mt-auto text-break card-txt">
            {{ folder.name }}
          </p>
        </div>
      </div>
    </div>
    <loading v-if="State.loadingProductsFolders "/>
  </template>
  <!-- posts -->
  <template v-if="currentUnit == 2">
    <div class="container">
      <p v-if="State.allFolders.length==0 && !State.loadingFolders" class="my-2 text-Secondary w-100 text-center">
        {{ $t("noItems") }}</p>
      <!--  cards -->
      <div v-else id="scroll-follow-folder hover-pointer" class="row">
        <div
            v-for="folder in State.allFolders"
            :key="folder"
            class="
            col-5
            p-1
            mt-4
            my-2
            mx-auto
            card
            uper-card-1
            hover-pointer
            fit-height
            mb-auto
          "
            @click="getRout(folder.folderId,folder.name)"
        >
          <div class="height100">
            <div
                v-if="folder.posts.length === 0"
                class="empty-list d-flex align-items-center"
            >
              <i class="mx-auto fas fa-box-open empty-icon"></i>
            </div>
            <img
                v-if="folder.posts.length === 1"
                v-lazy="folder.posts[0].coverImageUrl"
                alt="img"
                class="resize-1img"
            />
            <div
                v-else-if="folder.posts.length === 2"
                class="row m-auto resize-2div"
            >
              <div v-for="img in folder.posts" :key="img" class="col-6 p-0">
                <img v-lazy="img.coverImageUrl" alt="img" class="resize-2img"/>
              </div>
            </div>
            <div v-else class="row m-auto">
              <div v-for="img in folder.posts" :key="img" class="col-6 p-0">
                <img v-lazy="img.coverImageUrl" alt="img" class="resize-4img"/>
              </div>
            </div>
          </div>
          <p class="text-center mx-auto mt-auto text-break card-txt">
            {{ folder.name }}
          </p>
        </div>
      </div>
    </div>
    <loading v-if="State.loadingFolders "/>
  </template>
</template>

<script>
import {ref, onMounted, onBeforeUnmount} from "vue";
import {i18n} from "@/main";
import {pageBookMarkes} from "./mainPageBookMarksState"
import {BASE_TAKE} from '@/core/constant/constant';
import {getSelectedPageId} from '@/core/service/utils.service';
import {ScrollController} from '@/core/service/scroll.service';
import router from '@/core/router/router';

export default {
  setup() {
    const saved = ref(getSelectedPageId());
    let scrollCtrl = new ScrollController(onScroll);
    const State = ref(new pageBookMarkes());
    const currentUnit = ref(1);

    const units = ref([
      {title: i18n.global.tc("products"), key: 1},
      {title: i18n.global.tc("posts"), key: 2},
    ]);

    function getFolders() {
      let model = {
        skip: 0,
        take: BASE_TAKE,
        pageId: getSelectedPageId(),
      };
      State.value.GetBookMarkFolder(model);
    }

    function getProductsFolders() {
      let model = {
        skip: 0,
        take: BASE_TAKE,
        pageId: Math.abs(getSelectedPageId()),
      };
      State.value.GetProductsFolder(model);
    }
    function onScroll() {
      getFolders();
      getProductsFolders();
    }

    onBeforeUnmount(() => {
      scrollCtrl.removeListen();
    });
    
    onMounted(() => {
      getFolders();
      getProductsFolders();
      scrollCtrl.startListen();
    });

    function getRout(id, name) {
      router.push(`/folder-items/${id}/${name}`)
    }
    function getRouterProduct(id,name){
      router.push(`/product-folder-items/${id}/${name}`)
    }

    return {
      State,
      units,
      currentUnit,
      getRout,
      getRouterProduct,
      saved
    };
  },
};
</script>
<style scoped>
.resize-1img {
  width: 100%;
  padding: 3px;
  border-radius: 7px;
  height: 201px;
}

.resize-2img {
  width: 100%;
  padding: 3px;
  border-radius: 7px;
  height: 50%;
}

.resize-2div {
  height: 201px;
}

.resize-4img {
  width: 100%;
  padding: 3px;
  border-radius: 7px;
  height: 100px;
}

@media (max-width: 430px) {
  .resize-1img {
    width: 100%;
    padding: 3px;
    border-radius: 7px;
    height: 140px;
  }

  .resize-2img {
    width: 100%;
    padding: 3px;
    border-radius: 7px;
    height: 50%;
  }

  .resize-2div {
    height: 140px;
  }

  .resize-4img {
    width: 100%;
    padding: 3px;
    border-radius: 7px;
    height: 70px;
  }

  .empty-list {
    height: 140px !important;
  }
}

.empty-list {
  height: 201px;
}

.height100 {
  height: 100%;
}

.empty-icon {
  font-size: 50px;
  color: black;
}

.fit-height {
  height: fit-content;
}
</style>
