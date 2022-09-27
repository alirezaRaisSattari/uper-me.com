<template>
  <div class="d-flex uper-card-1 bg-white p-2 smart-text-align">
    <div>
      <p class="text-info">{{ $t('totalDescription') }}</p>
      <p :class="!capToggle ? 'text-overflow-two-line' : ''" class="mt-2">
        {{ data['caption'] }}
      </p>
      <div class="d-flex align-items-center text-center hover-pointer" @click="captionToggle">
        <i :class="!capToggle ? 'fas fa-chevron-down' : ''" class="text-sm"></i>
        <p class="mx-2">{{ !capToggle ? $t('more') : '' }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  props: {
    caption: String,
  },
  setup(props) {

    const data = ref({
      "caption": props.caption,
    });

    const capToggle = ref(false)

    function captionToggle() {
      capToggle.value = !capToggle.value
    }

    return {
      data,
      captionToggle,
      capToggle,
    };
  },
};
</script>
<style lang="scss" scoped>
p {
  padding: 0;
  margin: 0;
  font-size: 14px;
  line-height: 1.9;
}
</style>
