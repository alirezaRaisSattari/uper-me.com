<template>
  <Dialog
      v-model:visible="visible"
      :contentStyle="{
      background: 'rgb(255, 255, 255)',
      borderRadius: '4px',
    }"
      :modal="true"
      :showHeader="false"
      :style="{ padding: '0 !important', border: 'none', width: '550px' }"
      dismissableMask="false"
      header=""
  >
    <!-- <div :class="getCssClass(1)" class="w-100" style="height: 7px"></div> -->
    <p class="w-100 text-right px-3 my-2">
      <i class="fa fa-times" @click="times"></i>
    </p>

    <div>
      <div class="text-center">
        <img
            :class="image - notZoom"
            src="@/assets/img/uper.png"
            @click="zoom = true"
        />
      </div>
      <div>
        <swiper
            :direction="'horizontal'"
            :free-mode="false"
            :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
            :slides-per-view="'auto'"
            :space-between="0"
            class="slider w-100"
        >
          <swiper-slide
              v-for="img in images"
              :key="img"
              class="pt-2 d-flex justify-content-center w-100 px-4 bg-danger"
          >
            <img :alt="$t('workPageImage')" v-lazy="img.imageUrl" class="image"/>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </Dialog>
</template>

<script>
import {ref, watch, onMounted} from "vue";
import {Swiper, SwiperSlide} from "swiper/vue";

export default {
  name: "showMultiImageVeiwer",
  components: {Swiper, SwiperSlide},
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    // images,
    header: {
      type: String,
      required: false,
    },
    text: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: false,
    },
  },
  emits: ["accept", "reject"],
  setup(props, {emit}) {
    const zoom = ref(false);

    const times = () => {
      props.visible = false;
      emit("times");
    };

    watch(
        () => props.visible,
        (e) => {
          if (e == false) {
            emit("reject");
          }
        }
    );

    const images = ref([
      "@/assets/img/uper.png",
      "@/assets/img/uper.png",
      "@/assets/img/uper.png",
      "@/assets/img/uper.png",
    ]);

    return {
      times,
      images,
      zoom,
    };
  },
};
</script>

<style scoped>
.image {
  width: 38%;
  cursor: zoom-in;
}

.image-notZoom {
  width: 38%;
  cursor: zoom-in;
}

.image-Zoom {
  width: 38%;
  cursor: zoom-in;
}
</style>
