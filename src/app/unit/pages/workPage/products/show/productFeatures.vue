<template>
  <div
    id="featuresList"
    class="smart-text-align mx-auto bg-white uper-card-1 my-2"
  >
    <p class="color-blue px-2 pt-2 text-info mb-2">{{ $t("techSpec") }}</p>
    <div
      v-for="item in features.slice(0, itemCount)"
      class="d-flex align-items-center"
    >
      <p class="px-2 my-auto text-one-line-no-overflow">
        {{ item.featureName }}
      </p>
      <Swiper
        :direction="'horizontal'"
        :free-mode="true"
        :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
        :slides-per-view="'auto'"
        :space-between="0"
      >
        <SwiperSlide v-for="answer in item.answers" :key="answer">
          <Chip :label="answer.answerName" class="cheap-chip text-one-line" />
        </SwiperSlide>
      </Swiper>
    </div>
    <div
      class="d-flex align-items-center text-center hover-pointer mx-2"
      @click="captionToggle"
    >
      <i :class="!capToggle ? 'fas fa-chevron-down' : ''" class="text-sm"></i>
      <p class="mx-2">{{ !capToggle ? $t("more") : "" }}</p>
    </div>
    <br />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Chip from "primevue/chip";
import { Swiper, SwiperSlide } from "swiper/vue";

export default defineComponent({
  components: {
    Chip,
    Swiper,
    SwiperSlide,
  },
  props: {
    features: [],
  },
  setup(props) {
    const features = props.features;
    const capToggle = ref(false);
    const itemCount = ref(4);

    function captionToggle() {
      if (capToggle.value) {
        itemCount.value = 4;
      } else {
        itemCount.value = (<any>features).length;
      }
      capToggle.value = !capToggle.value;
    }

    return {
      features,
      capToggle,
      captionToggle,
      itemCount,
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
</style>
