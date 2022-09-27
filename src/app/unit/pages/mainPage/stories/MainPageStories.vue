<template>
  <div
      v-if="mainPageStoriesState.loading"
      class="d-flex w-100 scroll-stories-list my-3"
  >
    <div v-for="item in 3" :key="item" class="story-box-sm">
      <div class="col-12 text-center px-1">
        <div class="d-flex justify-content-center">
          <Skeleton height="60px" shape="circle" width="60px"/>
        </div>
        <Skeleton class="mt-1" height="1rem" width="100%"/>
      </div>
    </div>
  </div>
  <template v-else>
    <Dialog
        v-model:visible="storyOptions"
        :breakpoints="{
        '2000px': '30vw',
        '1000px': '40vw',
        '800px': '60vw',
        '600px': '90vw',
      }"
        :contentStyle="{
        background: 'rgb(255, 255, 255)',
        borderRadius: '12px',
      }"
        :showHeader="false"
        :style="{ padding: '10px', border: 'none', width: 'auto' }"
        dismissableMask
        header=""
        modal
    >
      <div class="p-3">
        gng
        <div class="my-2 w-100 hover-pointer text-right" @click="deleteStory">
          <span>{{ $t("delete") }}</span>
        </div>
        <div class="my-2 w-100 hover-pointer text-right" @click="updateStory">
          <span>{{ $t("edit") }}</span>
        </div>
      </div>
    </Dialog>
    <Dialog
        v-if="mainPageStoriesState.stories[storysId]"
        v-model:visible="editStoryDialog"
        :breakpoints="{
        '2000px': '30vw',
        '1000px': '40vw',
        '800px': '60vw',
        '600px': '90vw',
      }"
        :contentStyle="{
        background: 'rgb(255, 255, 255)',
        borderRadius: '12px',
      }"
        :showHeader="false"
        :style="{ padding: '10px', border: 'none', width: 'auto' }"
        dismissableMask
        header=""
        modal
    >
      <updateStory :storyId="StoryId" :storyInfo="selectedStory"/>
    </Dialog>
    <Dialog
        v-if="mainPageStoriesState.stories[storysId]"
        v-model:visible="storyDialog"
        :breakpoints="{
        '2000px': '30vw',
        '1000px': '40vw',
        '800px': '60vw',
        '600px': '90vw',
      }"
        :contentStyle="{
        background: 'rgb(255, 255, 255)',
        borderRadius: '12px',
      }"
        :showHeader="false"
        :style="{ padding: '10px', border: 'none', width: 'auto' }"
        dismissableMask
        header=""
        modal
    >
      <div class="w-100 bg-light m-2">
        <div
            id="myBar"
            :style="{ width: `${barWidth}%` }"
            class="bg-secondary color-secondary"
        >
          ‎‎‎
        </div>
      </div>
      <div class="w-100 d-flex justify-content-between">
        <div class="w-50 text-right px-3">
          <img
              v-lazy="
              mainPageStoriesState.stories[0].pageDetails.profileImageUrl +
              '_sm.webp'
            "
              class="profile-style rounded-circle"
          />
          <span class="mx-2">{{
              mainPageStoriesState.stories[0].pageDetails.username
            }}</span>
        </div>
        <div class="w-50 text-left">
          <i
              class="hover-pointer m-3 fas fa-ellipsis-v ellipsis-size"
              @click="showStoryOptions(mainPageStoriesState.stories[storysId])"
          ></i>
        </div>
      </div>

      <img
          v-lazy="mainPageStoriesState.stories[storysId].fileUrl"
          alt=""
          class="object-fit-cover mx-auto story-style w-100"
      />
    </Dialog>
    <div class="d-flex w-100 scroll-stories-list my-3">
      <swiper
          :direction="'horizontal'"
          :free-mode="true"
          :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
          :slides-per-view="'auto'"
          :space-between="1"
          class="rtl w-100"
      >
        <swiper-slide
            v-for="(story, index) in mainPageStoriesState.stories"
            :key="story.storyId"
            class="w-auto"
        >
          <div class="story-box-sm my-1" @click="openStory(index)">
            <div class="col-12 text-center px-1">
              <img
                  v-lazy="story.fileUrl"
                  alt=""
                  class="img-story object-fit-cover"
              />
              <span :title="story.caption" class="span-column text-sm">{{
                  story.caption
                }}</span>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </template>
</template>


<script lang="ts">
import {defineComponent, onMounted, ref, watch} from "vue";
import {MainPageStoriesState} from "@/app/unit/pages/mainPage/stories/MainPageStoriesState";
import Skeleton from "primevue/skeleton";
import {GetRecentStoryModel} from "@/data/city/mainpage/story.model";
import {getSelectedPageId} from "@/core/service/utils.service";
import ratio from "@/app/public/shared/ratio/ratio.vue";
import updateStory from "./updateStory.vue";
import {Swiper, SwiperSlide} from "swiper/vue";

export default defineComponent({
  name: "MainPageStories",
  components: {
    Skeleton,
    ratio,
    updateStory,
    Swiper, 
    SwiperSlide
  },
  props: {
    pageId: Number,
  },
  setup(props) {
    const mainPageStoriesState = ref(new MainPageStoriesState());
    const pageId = ref(props.pageId);
    const storyDialog = ref(false);
    const storysId = ref();
    const setTime = ref();
    const storyOptions = ref(false);
    const StoryId = ref();
    const editStoryDialog = ref(false);
    const selectedStory = ref();
    const barWidth = ref(1);
    const tem = ref(null);

    onMounted(() => {
      mainPageStoriesState.value.getRecentMainPageStory(<GetRecentStoryModel>{
        observerId: getSelectedPageId(),
        requestTime: new Date(),
        pageId: pageId.value,
        skip: 0,
        take: 50,
      });
    });

    function openStory(Id) {
      barWidth.value = 0;
      moveprogress();
      storysId.value = Id;
      let duration = 15000;
      storyDialog.value = !storyDialog.value;
      setTime.value = setInterval(() => {
        moveprogress();
        storysId.value += 1;
        if (storysId.value == mainPageStoriesState.value.stories.length) {
          endShowSrory();
        }
      }, duration);
    }

    function moveprogress() {
      var i = 0;
      if (i == 0) {
        i = 1;
        var width = 0;
        barWidth.value = 0;

        var id = setInterval(() => {
          if (barWidth.value >= 100) {
            clearInterval(id);
            i = 0;
          } else {
            barWidth.value = barWidth.value + 0.44;
          }
        }, 67);
      }
    }

    watch(
        () => storyDialog.value,
        (e) => {
          if (e == false) {
            endShowSrory();
          }
        }
    );

    function endShowSrory() {
      storyDialog.value = false;
      clearInterval(setTime.value);
    }

    function showStoryOptions(item) {
      selectedStory.value = item;
      StoryId.value = item.storyId;
      storyOptions.value = !storyOptions.value;
    }

    function deleteStory() {
      var pageId = Math.abs(getSelectedPageId());
      mainPageStoriesState.value.deleteStory(StoryId.value, pageId);
      storyOptions.value = false;
      mainPageStoriesState.value.getRecentMainPageStory(<GetRecentStoryModel>{
        observerId: getSelectedPageId(),
        requestTime: new Date(),
        pageId: props.pageId,
        skip: 0,
        take: 50,
      });
      storyDialog.value = false;
    }

    function updateStory() {
      storyDialog.value = false;
      storyOptions.value = false;
      editStoryDialog.value = !editStoryDialog.value;
    }

    return {
      mainPageStoriesState,
      pageId,
      storyDialog,
      storysId,
      openStory,
      setTime,
      endShowSrory,
      deleteStory,
      storyOptions,
      showStoryOptions,
      editStoryDialog,
      updateStory,
      StoryId,
      selectedStory,
      tem,
      barWidth,
    };
  },
});
</script>

<style scoped>
.scroll-stories-list {
  overflow-x: auto;
  overflow-y: hidden;
}

.img-story {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0px 0px 1px 1px rgb(199, 199, 199);
}

.story-box-sm {
  width: 90px;
}

.progressbar {
  height: 5px;
}

.p-progressbar-value {
  background: transparent;
}

#myBar {
  height: 1px;
}

.profile-style {
  widows: 45px;
  height: 45px;
}

.story-style {
  height: 450px;
}
</style>
