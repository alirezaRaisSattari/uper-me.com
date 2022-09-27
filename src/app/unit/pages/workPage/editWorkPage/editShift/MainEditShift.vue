<template>
  <div>
    <div class="d-flex justify-content-center align-items-center">
      <h5 class="header-title m-0 shape-text">{{ $t("EditWorkTime") }}</h5>
      <img
          alt=""
          class="header-shape-page"
          src="@/assets/img/svg/appbarShape.svg"
      />
    </div>
    <loading v-if="state.loadAllTimes==true"/>
    <editShift
        v-if="state.model!=null && state.loadAllTimes==false"
        :model="state.model"
        @updated="upModel"
    />
  </div>
</template>

<script>
import {ref, onMounted} from "vue";
import {useRoute} from "vue-router";
import {MainEditShiftState} from "./MainEditShiftState";
import editShift from "./editShift.vue"
import WorkPagePosts from "../../posts/WorkPagePosts";
import WorkPageProducts from "../../products/WorkPageProducts";
import Skeleton from "primevue/skeleton";
import multiImageVeiwer from "../../../../../public/shared/multiImageViewer/multiImageVeiwer";

export default {
  name: "MainEditShift",
  components: {
    editShift
  },
  setup() {
    const route = useRoute()
    const id = ref(route.params.id)
    const username = ref(route.params.username)
    const state = ref(new MainEditShiftState())

    function upModel(upModel) {

      state.value.loadAllTimes = true
      state.value.updateWorkPageTime()
    }

    onMounted(() => {
      state.value.id = id.value
      state.value.username = username.value

      state.value.getAllTimes()
    })
    return {
      state,
      upModel
    }
  }
}
</script>

<style scoped>
.header-title {
  text-align: center;
  width: 100%;
  position: absolute;
}

.shape-text {
  position: absolute;
  top: 10px;
  font-size: 16px;
}


</style>
