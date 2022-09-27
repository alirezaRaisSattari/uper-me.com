<template>
  <div class="d-flex justify-content-center align-items-center">
    <h6 class="header-title m-0 shape-text">{{ $t("supervisor") }}</h6>
    <img
        alt=""
        class="header-shape-page"
        src="@/assets/img/svg/appbarShape.svg"
    />
  </div>
  <div class="col-6 text-center mt-3">
    <select
        id="likeSelect"
        v-model="state.selectedUnit"
        class="select-box w-100 smart-text-align p-1"
        name="likeSelect"
        @change="changeRoute"
    >
      <option v-for="(unit, index) in state.units" :key="unit" :value="index">
        {{ unit.label }}
      </option>
    </select>
  </div>
  <members v-if="state.selectedUnit == 0"/>
  <activities v-if="state.selectedUnit == 1"/>
  <incom v-if="state.selectedUnit == 2"/>
  <rewards v-if="state.selectedUnit == 3"/>
  <sells v-if="state.selectedUnit == 4"/>
  <purchases v-if="state.selectedUnit == 5"/>
</template>

<script>
import {onMounted, ref} from "vue";
import {supervisorState} from "./supervisorState.ts";
import members from "./units/uint1/members.vue";
import Activities from "./units/uint2/activities.vue";
import Incom from "./units/uint3/incom.vue";
import rewards from "./units/unit4/rewards.vue";
import Sells from "./units/unit5/sells.vue";
import Purchases from "./units/unit6/purchases.vue";
import router from "@/core/router/router";
import {useRoute} from "vue-router";

export default {
  components: {members, Activities, Incom, rewards, Sells, Purchases},
  setup() {
    const state = ref(new supervisorState());
    const route = useRoute();
    const supporterPageId = ref(route.params.supporterId);
    state.value.selectedUnit = ref(route.params.unit);

    function changeRoute() {
      router.push(
          `/supervisor/${supporterPageId.value}/${state.value.selectedUnit}`
      );
    }

    return {
      state,
      changeRoute,
    };
  },
};
</script>

<style scoped>
.header-title {
  text-align: center;
  width: 100%;
  position: absolute;
}

.select-box {
  height: 48px;
  border-radius: 58px;
  outline: none !important;
}

select {
  border: 2px solid #c2c2c2 !important;
}

.image-icon {
  position: absolute;
  right: 22%;
  top: 23%;
  font-size: 54px;
  color: #fff;
  /* z-index: 99; */
}

.image-style {
  width: 55px;
  height: 55px;
}

.img-style {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  z-index: 8;
}
</style>
