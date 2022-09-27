<template>
upgrade
</template>

<script>
import { upgradeState } from "./upgradeState";
export default {
  setup() {
    const state = ref(new upgradeState());

    return {
      state,
    };
  },
};
</script>

<style>
</style>