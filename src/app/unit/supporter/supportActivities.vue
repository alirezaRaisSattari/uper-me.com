<template>
  <div class="d-flex flex-column">
    <main-supporter/>
    <div class="activities-card w-100 d-flex flex-column my-3">
      <div class="w-100 d-flex justify-content-between">
        <div class="d-flex mt-2 w-auto">
          <span class="mt-1">3.0</span>
          <ratingStars rate="3"/>
        </div>
        <div class="d-flex w-auto">
          <span>17 {{ $t("comment") }}</span>
          <i class="far fa-user mr-1" style="font-size: 15px"></i>
        </div>
        <div class="w-auto">
          <span>{{ $t("30Days") }}</span>
        </div>
      </div>
      <div class="d-flex flex-column my-2">
        <div
            v-for="rate in rates"
            :key="rate"
            class="w-100 d-flex justify-contetnt-between mt-2"
        >
          <span class="w-50 text-right">
            {{ rate.title }}
          </span>
          <div class="w-50 text-left">
            <ratingStars :rate="rate.value"/>
          </div>
        </div>
      </div>
    </div>
    <div class="p 2 my-4 mx-2 d-flex">
      <button class="cats mx-2" @click="postsCheck">
        {{ $t("post") }}
      </button>
      <button class="cats mx-2">{{ $t("product") }}</button>
      <button class="cats mx-2">{{ $t("props") }}</button>
      <button class="cats mx-2">{{ $t("story") }}</button>
    </div>
    <div class="w-100 d-flex flex-column align-items-center">
      <span>{{ $t("emptyList") }}</span>
      <i class="fa fa-box-open mt-4" style="font-size: 135px"></i>
    </div>
    <div>
      <currency/>
    </div>
  </div>
</template>

<script>
import mainSupporter from "./mainSupporter.vue";
import Rating from "primevue/rating";
import {ref} from "vue";
import {i18n} from "@/main";
import ratingStars from "@/app/public/shared/ratinstar/ratingStars.vue";

export default {
  name: "supportActivitie",
  components: {mainSupporter, Rating, ratingStars},

  setup() {
    const postEmpty = ref(false);
    const getBorder = ref();
    const rates = ref([
      {
        title: i18n.global.tc("usefulPhotoCaptions"),
        value: 3.5,
      },
      {
        title: i18n.global.tc("patient"),
        value: 2.5,
      },
      {
        title: i18n.global.tc("contributeToContentProduction"),
        value: 4.5,
      },
      {
        title: i18n.global.tc("punctuality"),
        value: 5,
      },
      {
        title: i18n.global.tc("description"),
        value: 1.5,
      },
      {
        title: i18n.global.tc("feedback"),
      },
    ]);
    const postsCheck = () => {
      getBorder.value = 1;
    };
    return {
      rates,
      postEmpty,
      getBorder,
      postsCheck,
    };
  },
};
</script>

<style scoped>
.activities-card {
  font-size: 14px;
  border-radius: 10px;
  width: calc(100% - 40px);
  padding: 10px;
  margin: 10px;
  box-shadow: 1px 2px 10px #afadad;
}

.cats {
  border: 1px solid #b7b4b4;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 14px;
}

.border-chang {
  border: 1px solid #9dc13e;
}

button {
  outline: none !important;
}
</style>
