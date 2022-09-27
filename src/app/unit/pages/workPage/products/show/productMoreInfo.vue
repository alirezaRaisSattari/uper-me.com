<template>
  <div class="d-flex bg-white my-card align-items-center justify-content-between smart-text-align p-2 my-2">
    <p class="text-one-line ">{{ $t(title) }}</p>
    <i class="fas fa-chevron-left text-sm pr-3"></i>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import Chip from "primevue/chip";

export default defineComponent({
  components: {
    Chip,
  },
  props: {
    title: String
  },
  setup(props) {

    const title = props.title
    return {title}
  },
});
</script>
<style lang="scss" scoped>
p {
  padding: 0;
  margin: 0;
  font-size: 14px;
}

.my-card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
}

</style>
