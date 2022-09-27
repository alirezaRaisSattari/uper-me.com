<template>
  <div class="m-2 padding-bottom-80px">

  </div>

</template>

<script lang="ts">
import {defineComponent, onMounted, reactive} from "vue";
import {useRoute} from "vue-router";
import {SellCardState} from "@/app/unit/product/sellCard/sellCardState";


export default defineComponent({
  components: {},
  setup() {
    const _state = reactive(new SellCardState())
    const route = reactive(useRoute())

    onMounted(
        () => {
        }
    )


    return {
      _state,
    }
  },
});
</script>
<style lang="scss" scoped>
.image-slider-border {
  border: 3px solid #43a9b5;
  border-radius: 10px;
}

.padding-bottom-80px {
  padding-bottom: 80px;
}

p {
  padding: 0;
  margin: 0;
  font-size: 14px;
}

::v-deep(.p-button-label) {
  font-size: 14px;
}

</style>
