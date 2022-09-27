<template>
  <!-- {{state}} -->
  <galleria
    :gallery="state.stories"
    :storyIndex="storyIndex"
    :visible="storyDialog"
    @close="storyDialog = false"
    @openOption="Option"
  ></galleria>
  <div class="d-flex w-100 scroll-stories-list my-3">
    <swiper
      :direction="'horizontal'"
      :free-mode="true"
      :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
      :slides-per-view="'auto'"
      :space-between="15"
      class="smart-text-align w-100"
    >
      <swiper-slide v-for="item in storiesButton" :key="item" class="w-auto">
        <div
          class="story-box-sm hover-pointer"
          v-if="isShowStoriesButton && isMine"
          @click="item.onTap()"
        >
          <div class="col-12 text-center px-1">
            <div class="story-btn mx-auto">
              <i class="w-100" @click="router.push('/upgradeditems')" :class="item.class"></i>
            </div>
            <span :title="item.text" class="span-column text-sm">{{
              $t(item.text)
            }}</span>
          </div>
        </div>
      </swiper-slide>

      <swiper-slide
        v-for="(story, index) in state.stories"
        :key="story.storyId"
        class="w-50"
      >
        <div class="story-box-sm hover-pointer" @click="openStory(index)">
          <div class="col-12 text-center px-1 hover-pointer">
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
      <div
        class="my-2 w-100 hover-pointer text-right"
        @click="openConfirmDialog = !openConfirmDialog"
      >
        <span>{{ $t("delete") }}</span>
      </div>
      <div
        class="my-2 w-100 hover-pointer text-right"
        @click="editStoryDialog = !editStoryDialog"
      >
        <span>{{ $t("edit") }}</span>
      </div>
    </div>
  </Dialog>
  <confirmDialog
    :header="$t('delete')"
    :icon="'far fa-trash-alt'"
    :status="'danger'"
    :text="$t('deleteStoryMessage')"
    :visible="openConfirmDialog"
    @accept="deleteStory"
    @reject="openConfirmDialog = false"
    @times="openConfirmDialog = false"
  />
  <Dialog
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
    <div class="pb-5 mb-5">
      <div class="w-100 uper-card-1 my-3 d-flex flex-column p-2">
        <p class="w-100 text-right">{{ $t("caption") }}</p>
        <input
          v-model="newCaption"
          :placeholder="state.stories[selectedStoryIndex].caption"
          class="my-2 form-control"
          type="text"
        />
        <button class="btn w-100 rounded btn-color" @click="updateCaption">
          {{ $t("submit") }}
        </button>
      </div>
      <div class="w-100 uper-card-1 my-3 d-flex flex-column p-2">
        <p class="w-100 text-right">
          {{ $t("expire_Days") }}
        </p>
        <DatePicker :show="showDatePicker" @callBackDate="getDate" />
        <input
          v-model="newDate"
          :placeholder="
            date.convertToJalali(state.stories[selectedStoryIndex].expiredTime)
          "
          class="my-2 form-control"
          type="text"
          @click="showDatePicker = !showDatePicker"
        />

        <button class="btn w-100 rounded btn-color" @click="updateTime">
          {{ $t("submit") }}
        </button>
      </div>
    </div>
  </Dialog>
</template>

<script>
import { ref, watch } from "vue";
import galleria from "./galleria.vue";
import { storyState } from "./storyState";
import { getMainPageId, getSelectedPageId } from "@/core/service/utils.service";
import confirmDialog from "@/app/public/shared/confirmDialog/ConfirmDialog.vue";
import { DateService } from "@/core/service/date.service";
import DatePicker from "@/app/unit/shared/singleDatePicker/singleDatePicker.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import router from "@/core/router/router";
import upgraded from "@/app/unit/product/upgraded/upgraded";
import { LocalStorageService } from "@/core/service/localStorage.service";
import { EnumKeys } from "@/core/constant/constant";
import { useRoute } from "vue-router";

export default {
  props: ["pageId", "isWork"],
  components: { galleria, confirmDialog, DatePicker, Swiper, SwiperSlide },
  setup(props, { emit }) {
    const pageId = ref(getSelectedPageId());
    const openConfirmDialog = ref(false);
    const state = ref(new storyState());
    const date = ref(new DateService());
    const editStoryDialog = ref(false);
    const showDatePicker = ref(false);
    const selectedStoryIndex = ref();
    const storyOptions = ref(false);
    const storyDialog = ref(false);
    const isShowStoriesButton = ref(props.isWork ?? false);
    const newCaption = ref("");
    const storyIndex = ref();
    const newDate = ref();
    const storyId = ref();
    const storiesButton = ref([
      {
        class: "uupgrade-product",
        text: "upgraded",
        onTap: () => {},
      },
      {
        class: "ureport-bugs",
        text: "reported",
        onTap: () => {},
      },
    ]);
    const isMine = ref(getSelectedPageId() === props.pageId);

    let model = {
      skip: 0,
      take: 30,
      observerId: getSelectedPageId(),
      pageId: props.pageId,
      requestTime: new Date(),
    };
    state.value.getRecentMainPageStory(model);

    function openStory(index) {
      storyIndex.value = index;
      storyDialog.value = !storyDialog.value;
    }

    function Option(id) {
      storyId.value = id;
      storyOptions.value = !storyOptions.value;
      selectedStoryIndex.value = state.value.stories
        .map((e) => {
          return e.storyId;
        })
        .indexOf(id);
    }

    function deleteStory() {
      state.value.deleteStory(storyId.value, pageId.value , () => {
        emit("updateStory");
        storyId.value = false
        storyOptions.value = false;
        openConfirmDialog.value = false;
        state.value.stories.splice(storyIndex.value,1)
        storyDialog.value = false
      });
    }

    function getDate(date) {
      newDate.value = date;
    }

    function updateCaption() {
      if (newCaption.value !== "") {
        let model = {
          storyId: storyId.value,
          caption: newCaption.value,
          pageId: pageId.value,
        };
        state.value.updateCaption(model, () => {
          emit("updateStory");
          storyOptions.value = false;
          editStoryDialog.value = false;
        });
      }
    }

    function updateTime() {
      let model = {
        storyId: storyId.value,
        time: DateService.getInstance().convertJalaliToGregorian(newDate.value),
        pageId: pageId.value,
      };
      state.value.updateTime(model, () => {
        emit("updateStory");
        storyOptions.value = false;
        editStoryDialog.value = false;
      });
    }

    return {
      selectedStoryIndex,
      openConfirmDialog,
      editStoryDialog,
      showDatePicker,
      updateCaption,
      storyOptions,
      storyDialog,
      deleteStory,
      newCaption,
      updateTime,
      storyIndex,
      openStory,
      storyId,
      newDate,
      upgraded,
      getDate,
      Option,
      router,
      state,
      date,
      isMine,
      storiesButton,
      isShowStoriesButton,
    };
  },
};
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
  border: 3px solid #ff9700;
}

.story-btn {
  width: 60px;
  height: 60px;
  border: 3px solid #eca649;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.story-box-sm {
  width: 75px;
}

.btn-color {
  background: #c1e1e5;
}
.w-50{
  width: 64px !important;
}
</style>
