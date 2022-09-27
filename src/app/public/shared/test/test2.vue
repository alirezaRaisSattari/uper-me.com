<template>
  <input
    type="text"
    @input="(event) => $emit('update:text', event.target.value)"
    :value="text"
  />
  <button @click="refresh"></button>
  <p class="text-danger">child : {{ text }}</p>
</template>

<script>
export default {
  props: { text: String },
  setup(props, { emit }) {
    function refresh() {
      emit("update:text", "A val");
    }
    return {
      refresh,
    };
  },
};
</script>

<style>
</style>