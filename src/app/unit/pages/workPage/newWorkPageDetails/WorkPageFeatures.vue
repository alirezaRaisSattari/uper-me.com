<template>
  <div id="featuresList" class="smart-text-align mx-auto bg-white uper-card-1 my-2">
    <div class="d-flex justify-content-between align-items-center">
      <span class="text-info p-2">{{ $t('techSpec') }}</span>
      <Button icon="fa fa-chevron-left" class="p-button-rounded p-button-text m-1" @click="displayDialog = true" />
    </div>
    <div v-for="item in getFourFeatures" class="d-flex align-items-center">
      <div class="col-4">
        <span class="text-sm">{{ item.featureName }}</span>
      </div>
      <div class="col-8 border-bottom py-2">
        <small v-for="(answer,i) in item.answers">{{ answer.answerName }}&nbsp<span v-if="i < (item.answers.length - 1)" >,</span></small>
      </div>
    </div>
    <br>
    <Dialog
        v-model:visible="displayDialog"
        :contentStyle="{ 'border-radius': '10px' }"
        :modal="true"
        :showHeader="false"
        :breakpoints="{
        // '2000px': '30vw',
        // '1000px': '40vw',
        // '800px': '70vw',
        '6000px': '100vw',
        '1000px': '80vw',
      }"
        dismissableMask
    >
      <div class="">
        <div v-for="item in features" class="d-flex align-items-center">
          <div class="col-4">
            <span class="span-column">{{ item.featureName }}</span>
          </div>
          <div class="col-8 border-bottom py-2">
            <small v-for="(answer,i) in item.answers">{{ answer.answerName }}&nbsp<span v-if="i < (item.answers.length - 1)" >,</span></small>
          </div>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, ref} from "vue";
import Chip from "primevue/chip";
import {Swiper, SwiperSlide} from "swiper/vue";

export default defineComponent({
  components: {Chip, Swiper, SwiperSlide},
  props: {
    features: [],
  },
  setup(props) {
    const features = ref([]);
    const displayDialog = ref(false)

    onMounted(() => {
      for (let i = 0; i < props.features.length; i++) {
        if (Array.isArray(props.features[i].features) && props.features[i].features.length) {
          features.value = features.value.concat(props.features[i].features);
        }
      }
    });

    const getFourFeatures = computed(()=>{
      return features.value.slice(0,4);
    });

    return {
      features,
      displayDialog,
      getFourFeatures,
    }
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
