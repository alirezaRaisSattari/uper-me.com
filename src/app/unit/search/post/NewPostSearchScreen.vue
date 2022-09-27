<template>
  <div
      v-if="!state.loading && state.hashTags.length === 0"
      class="col-12 text-center pt-5 mt-5"
  >
    <i class="fas fa-box-open fa-5x"></i>
    <h4 class="text-center mt-3">{{ $t("noItem") }}</h4>
  </div>
  <loading
      v-else-if="state.loading && state.hashTags.length === 0"
      class="margin-loading"
  />

  <template v-else>
    <div
        v-for="tag in state.hashTags"
        :key="tag.id"
        class="my-1"
    >
      <FourStoryList v-if="tag.isStoryPack" :stories="tag.stories"/>

      <div
          v-else
          class="d-flex justify-content-between align-items-center rounded tag-card border-radius-10px p-2 hover-pointer"
          @click="openTag(tag)">
        <div class="tag-circle">#</div>
        <div class="col">
          <small class="smart-text-align mr-2 text-overflow-two-line">
            {{ tag.title }}</small>
          <small class="smart-text-align text-muted mr-2 text-overflow-two-line">
            {{ tag.numberOfPosts }} &nbsp; {{$t('post')}}</small>
          <small class="smart-text-align text-muted mr-2 text-overflow-two-line">
            {{ tag.numberOfProducts }} &nbsp; {{$t('product')}}</small>
        </div>
        <Button v-if="tag.isCached" class="p-button-rounded p-button-danger p-button-text"
                icon="fa fa-times" @click="removeCache($event,tag.hashTagId)"
        />
      </div>

    </div>
    <loading v-if="state.loading" class="my-5"/>
  </template>
</template>

<script lang="ts">
import {defineComponent, onBeforeUnmount, onMounted, ref} from "vue";
import {NewPostSearchState} from "./NewPostSearchState";
import {ScrollController} from "@/core/service/scroll.service";
import FourStoryList from "@/app/public/shared/fourStoryList/FourStoryList.vue";
import {LocalStorageService} from "@/core/service/localStorage.service";
import {EnumKeys} from "@/core/constant/constant";
import {PageStore} from "@/core/store/page.store";
import router from "@/core/router/router";

export default defineComponent({
  name: "NewPostSearchScreen",
  props: ["text"],
  components: {FourStoryList},
  setup(props) {
    let searchedText = ref(props.text.trim());
    let state = ref(new NewPostSearchState());
    let scrollCtrl = new ScrollController(onScroll);
    function onScroll() {
      search(true);
    }
    function onChangeTextFromParent(txt: string) {
      searchedText.value = txt.trim();
      if (searchedText.value.length > 2) search(false);
      else {
        state.value.hashTags = [];
      }
    }

    onMounted(() => {
      if (searchedText.value.length > 2) search(false);
      else getCache();
      scrollCtrl.startListen();
    });

    onBeforeUnmount(() => {
      scrollCtrl.removeListen();
    });

    function search(_isScroll: boolean) {
      state.value.searchTags(searchedText.value, _isScroll);
    }

    function getCache() {
      state.value.hashTags = getCachedItems(true).map(m => {
        m.isCached = true;
        return m;
      });
    }

    function getCachedItems(isFilter) {
      try {
        let tags = JSON.parse(LocalStorageService.getInstance().getItem(EnumKeys.KeySearchTagCache));
        if (Array.isArray(tags) && tags.length != 0) {
          if (isFilter) return tags.filter(m => m.searchedPageId == PageStore().selectedPageId);
          return tags;
        }
        LocalStorageService.getInstance().setItem(EnumKeys.KeySearchTagCache, []);
        return [];
      } catch (e) {
        LocalStorageService.getInstance().setItem(EnumKeys.KeySearchTagCache, []);
        return [];
      }
    }

    function openTag(tag) {
      if (PageStore().selectedPageId == null || PageStore().selectedPageId == undefined) {
        router.push(`/login`);
      }else{
      let x = getCachedItems(false);
      if (!x.find(m => m.hashTagId == tag.hashTagId && (m.searchedPageId == PageStore().selectedPageId))) {
        tag.searchedPageId = PageStore().selectedPageId;
        x.unshift(tag);
      } else {
        x.sort((x, y) => {
          return x.id == tag.hashTagId ? -1 : y.hashTagId == tag.hashTagId ? 1 : 0;
        });
      }
      LocalStorageService.getInstance().setItem(EnumKeys.KeySearchTagCache, JSON.stringify(x));
      router.push(`/explore/${tag.id}`);
      }
    }

    function removeCache(event, tagId: number) {
      event.stopPropagation();
      let x = getCachedItems(false);
      let itemIndex = x.findIndex(m => m.hashTagId == tagId && (m.searchedPageId == PageStore().selectedPageId));
      if (itemIndex != -1) {
        x.splice(itemIndex, 1);
        LocalStorageService.getInstance().setItem(EnumKeys.KeySearchTagCache, JSON.stringify(x));
        getCache();
      }
    }

    return {
      onChangeTextFromParent,
      state,
      searchedText,
      openTag,
      removeCache,
    };
  },
});
</script>

<style lang="scss" scoped>
.tag-card {
  box-shadow: 0px 0px 5px -2px grey !important;
}

.border-radius-10px {
  border-radius: 10px !important;
}

.margin-loading {
  margin-top: calc((100vh - 300px) / 2);
}

.tag-circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #97dedec9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 29px;
}
</style>
