<template>
  <div>
    <main-supporter/>
    <div class="w-100 px-3 d-flex justify-content-around">
      <button
          :class="selectedCategory === 1 ? 'chang-bg' : ''"
          class="category my-1 rounded-pill"
          @click="check"
      >
        {{ $t("checking") }}
      </button>
      <button
          :class="selectedCategory === 2 ? 'chang-bg' : ''"
          class="category my-1 rounded-pill"
          @click="confirm"
      >
        {{ $t("accepted") }}
      </button>
      <button
          :class="selectedCategory === 3 ? 'chang-bg' : ''"
          class="category my-1 rounded-pill"
          @click="prepare"
      >
        {{ $t("preparation") }}
      </button>
      <button
          :class="selectedCategory === 4 ? 'chang-bg' : ''"
          class="category my-1 rounded-pill"
          @click="delivery"
      >
        {{ $t("deliveries") }}
      </button>
    </div>
    <div class="w-100 d-flex flex-column align-items-center mt-5">
      <span>{{ $t("emptyList") }}</span>
      <i class="fa fa-box-open mt-4" style="font-size: 135px"></i>
    </div>
  </div>
</template>

<script>
import mainSupporter from "./mainSupporter.vue";
import {ref} from "vue";

export default {
  name: "supporterShopping",
  components: {mainSupporter},
  setup() {
    const selectedCategory = ref();

    const check = () => {
      selectedCategory.value = 1;
    };
    const confirm = () => {
      selectedCategory.value = 2;
    };
    const prepare = () => {
      selectedCategory.value = 3;
    };
    const delivery = () => {
      selectedCategory.value = 4;
    };
    return {
      selectedCategory,
      check,
      confirm,
      prepare,
      delivery,
    };
  },
};
</script>

<style scoped>
.category {
  border: 1px solid #b7b4b4;
  background: #b7b4b4;
  padding: 5px 20px;
  font-size: 16px;
  outline: none !important;
}

.chang-bg {
  background: #b2da94;
  outline: none;
}
</style>
