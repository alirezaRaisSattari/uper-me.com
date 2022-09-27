<template>
  <Galleria
    v-model:activeIndex="storyIndex"
    v-model:visible="visible"
    :autoPlay="true"
    :circular="true"
    :fullScreen="true"
    :responsiveOptions="responsiveOptions"
    :showItemNavigators="gallery.length > 1 ? true : false"
    :showThumbnails="false"
    :transitionInterval="15000"
    :value="gallery"
    containerStyle="max-width: 850px"
  >
    <template #item="slotProps">
      <div class="main p-relative">
        <div class="time-bar">
          <div id="bar">&nbsp; &nbsp; &nbsp;</div>
        </div>
        <!-- header -->
        <div
          class="
            d-flex
            justify-content-between
            w-100
            align-items-center
            mt-2
            px-2
            story-header
          "
        >
          <div class="d-flex">
            <img
              :src="slotProps.item.pageDetails.profileImageUrl + '_sm.webp'"
              alt=""
              class="user-profile-image"
            />
            <span class="ml-auto my-auto mr-1 text-light text-sm">
              <span
                class="d-flex size-small smart-text-align justify-content-end text-sm"
                @click="$function.goTo(`/page/${slotProps.item.pageDetails.username}`)"
                >{{ slotProps.item.pageDetails.username }}</span
              >
            </span>
          </div>
          <div
              v-if="slotProps.item.pageDetails.pageId === pageId"
            class="hover-pointer"
          >
            <i
              class="fas fa-ellipsis-v text-dark"
              @click="openStoryOptionDialog(slotProps.item.storyId)"
            ></i>
          </div>
        </div>
        <!-- end header -->
        <img
          :alt="slotProps.item.caption"
          :src="slotProps.item.fileUrl"
          style="
          display: block;
          height: 100vh;
          width:100%;
          object-fit: fill !important ;
          z-index: 1;
        "
        />
      </div>
    </template>
    <template #thumbnail="slotProps">
      <img
        :alt="slotProps.item.caption"
        :src="slotProps.item.fileUrl"
        style="display: block"
      />
    </template>
  </Galleria>
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
        <input v-model="newCaption" class="my-2 form-control" type="text" />
        <button class="btn w-100 rounded btn-color" @click="updateCaption">
          {{ $t("submit") }}
        </button>
      </div>
      <div class="w-100 uper-card-1 my-3 d-flex flex-column p-2">
        <p class="w-100 text-right">{{ $t("expire_Days") }}</p>
        <datePicker
          v-model="newDate"
          :showCurrentDate="false"
          class="form-control my-2 w-100"
        />

        <Calendar
          v-model="newTime"
          :placeholder="
            images[activeIndex].expiredTime
              ? date.getJalaliTime(images[activeIndex].expiredTime)
              : ''
          "
          :timeOnly="true"
          :timeshow="true"
          class="form-control my-2"
        />
        <button class="btn w-100 rounded btn-color" @click="updateTime">
          {{ $t("submit") }}
        </button>
      </div>
    </div>
  </Dialog>
</template>

<script>
import Galleria from "primevue/galleria";
import Calendar from "primevue/calendar";
import { ref, onMounted, watch } from "vue";
import { getSelectedPageId } from "@/core/service/utils.service";
import { DateService } from "@/core/service/date.service";

export default {
  components: { Galleria, Calendar },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    gallery: Array,
    storyIndex: Number,
    openOption: Function,
  },

  setup(props, { emit }) {
    const images = ref([]);
    const barWidth = ref(1);
    const activeIndex = ref();
    const storiesCount = ref();
    const pageId = ref(getSelectedPageId());
    const editStoryDialog = ref(false);
    const storyId = ref();
    const date = ref(new DateService());

    const responsiveOptions = ref([
      {
        breakpoint: "1024px",
        numVisible: 5,
      },
      {
        breakpoint: "768px",
        numVisible: 3,
      },
      {
        breakpoint: "560px",
        numVisible: 1,
      },
    ]);

    function moveprogress() {
      barWidth.value = 0;
      const id = setInterval(() => {
        if (barWidth.value >= 100 || !props.visible) {
          emit("close");
          clearInterval(id);
        } else {
          barWidth.value = barWidth.value + 0.4499;
          document.getElementById("bar").style.width = barWidth.value + "%";
        }
      }, 67);
    }

    onMounted(() => {
      images.value = props.gallery;
      storiesCount.value = props.gallery.length;
    });
    watch(
      () => props.visible,
      (e) => {
        if (e) {
          moveprogress();
        }
        if (!e) {
          emit("close");
        }
      }
    );

    watch(
      () => props.storyIndex,
      (e) => {
        barWidth.value = 0;
      }
    );

    function openStoryOptionDialog(Id) {
      storyId.value = Id;
      emit("openOption", Id);
    }

    return {
      images,
      responsiveOptions,
      activeIndex,
      pageId,
      openStoryOptionDialog,
      editStoryDialog,
      date,
    };
  },
};
</script>

<style scoped>
.time-bar {
  position: absolute;
  top: 5px;
  background: #0807079e;
  width: 98%;
  right: 3px;
  border-radius: 24px;
  height: 2px;
}

#bar {
  height: 2px;
  background-color: #fff;
  border-radius: 24px;
}

.user-profile-image {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.story-header {
  position: absolute;
  top: 8px;
}
</style>
