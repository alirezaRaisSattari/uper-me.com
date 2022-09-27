<template>
  <div class="float-btn d-flex" @click="submitComment">
    <p class="mr-auto my-auto p-0">{{ text }}</p>
    <i :class="icon" class="ml-auto mr-1 my-auto m-0 p-0"></i>
  </div>
</template>

<script>
export default {
  props: ["text", "icon"],
};
</script>

<style>
</style>