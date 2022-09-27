<template>
  <gallery :gallery="images" :visible="visible" @close="visible = false" />
  <h6 class="page-number px-2 m-2">
    {{ activeindex }}/
    {{ images.length }}
  </h6>
  <swiper
    :pagination="{ clickable: true }"
    :slides-per-view="1"
    :space-between="0"
    class="h-100 w-100 swiper-dir"
    style="border-radius: 6px; background-color: #ffffff"
    @activeIndexChange="getActiveIndex"
  >
    <swiper-slide v-for="img in images" :key="img" @click="visible=!visible">
      <img v-lazy="img" alt="" class="h-100 w-100 object-fit-cover max-size"/>
    </swiper-slide>
  </swiper>
</template>
<script>
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/swiper.scss";
import { ref, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import gallery from "./productSliderGallery.vue";

export default {
  props: {
    mainImage: Object,
    otherImages: Object,
  },
  components: { Swiper, SwiperSlide, gallery },
  setup(props) {
    const activeindex = ref(1);
    const visible = ref(false);
    const images = ref([props.mainImage, ...props.otherImages]);

    function getActiveIndex(e) {
      activeindex.value = e.activeIndex + 1;
    }

    return {
      activeindex,
      images,
      visible,
      getActiveIndex,
    };
  },
};
</script>
<style scoped>
.page-number {
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 5px;
  position: absolute;
  z-index: +5;
  color: #2d3748;
}

.swiper-slide {
  margin-left: 0 !important;
  margin-right: 0 !important;
  direction: rtl !important;
}

.max-size {
  max-width: 512px;
  max-height: 512px;
}
</style>
