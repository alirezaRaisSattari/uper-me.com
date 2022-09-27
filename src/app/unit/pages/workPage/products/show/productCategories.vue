<template>
  <Swiper
    :direction="'horizontal'"
    :free-mode="true"
    :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
    :slides-per-view="'auto'"
    :space-between="0"
  >
    <SwiperSlide v-for="item in categories" :key="item">
      <Chip v-if="item">
        <div class="d-flex align-items-center py-2">
          <p class="text-one-line">{{ item }}</p>
          <i class="fas fa-chevron-left text-sm pr-3"></i>
        </div>
      </Chip>
    </SwiperSlide>
  </Swiper>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Chip from "primevue/chip";
import { Swiper, SwiperSlide } from "swiper/vue";

export default defineComponent({
  components: {
    Chip,
    Swiper,
    SwiperSlide,
  },
  props: {
    categories: [],
  },
  setup(props) {
    const categories = [
      (<any>props.categories)[0].title1,
      (<any>props.categories)[0].title2,
      (<any>props.categories)[0].title3,
      (<any>props.categories)[0].title4,
      (<any>props.categories)[0].title5,
    ];
    return {
      categories,
    };
  },
});
</script>
<style lang="scss" scoped>
p {
  padding: 0;
  margin: 0;
  font-size: 14px;
}

.swiper-container {
  width: 100%;
  height: 44px;
  direction: rtl;
  padding-bottom: 15px !important;
}

.swiper-slide {
  width: auto !important;
  padding: 3px;
}

.swiper-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

::v-deep(.p-chip-text) {
  font-size: 12px;
}

::v-deep(.p-chip) {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
}
</style>
