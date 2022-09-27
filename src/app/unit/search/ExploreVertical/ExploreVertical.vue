<template>
  <loading v-if="state.loading"/>

  <div class="all" v-for="item in state.suggestions">
     <p> {{item }}</p>
    <br>
    <p>____________________________________</p>
    <br>
  </div>

</template>

<script>
import {ExploreState} from '../explore/ExploreState';
import {onMounted, ref} from "vue";
import {ScrollController} from "../../../../core/service/scroll.service";
import {isLoggedIn} from "../../../../core/service/utils.service";

export default {
  name: "ExploreVertical",
  setup() {
    const state = ref(new ExploreState())
    let scrollCtrl = new ScrollController(onScroll);

    function onScroll() {
      if (!state.value.loading) {
        state.value.getSuggestion(true);
      }
    }

    onMounted(() => {
      if (isLoggedIn()) {
        state.value.getSuggestion(false);
        scrollCtrl.startListen();
      }
    });



    return {
      state,
      onScroll
    }
  }
}
</script>

<style scoped>


</style>