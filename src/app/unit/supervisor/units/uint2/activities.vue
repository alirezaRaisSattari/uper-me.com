<template>
  <div v-if="state.scores" class="px-2">
    <div class="w-100 uper-card-1 p-2 mt-5">
      <div class="d-flex justify-content-between">
        <ratingStar
            :rate="
            (state.scores.score1 +
              state.scores.score2 +
              state.scores.score3 +
              state.scores.score4 +
              state.scores.score5 +
              state.scores.score6) /
            6
          "
            style="cursor: pointer !important"
        />
        <div class="d-flex align-content-center">
          <span>{{ state.scores.count }} {{ $t("comment") }}</span>
          <i class="far fa-user mx-2 size-25"></i>
        </div>
        <p>
          <span>30 </span>
          <span> روز گذشته </span>
        </p>
      </div>
      <div class="w-100 d-flex flex-column mt-4">
        <div class="w-100 d-flex justify-content-between my-2">
          <span>{{ $t("usefulPhotoCaptions") }}</span>
          <ratingStar
              :rate="state.scores.score1"
              style="cursor: pointer !important"
          />
        </div>
        <div class="w-100 d-flex justify-content-between my-2">
          <span>{{ $t("patient") }}</span>
          <ratingStar
              :rate="state.scores.score2"
              style="cursor: pointer !important"
          />
        </div>
        <div class="w-100 d-flex justify-content-between my-2">
          <span>{{ $t("contributeToContentProduction") }}</span>
          <ratingStar
              :rate="state.scores.score3"
              style="cursor: pointer !important"
          />
        </div>
        <div class="w-100 d-flex justify-content-between my-2">
          <span>{{ $t("punctuality") }}</span>
          <ratingStar
              :rate="state.scores.score4"
              style="cursor: pointer !important"
          />
        </div>
        <div class="w-100 d-flex justify-content-between my-2">
          <span>{{ $t("description") }}</span>
          <ratingStar
              :rate="state.scores.score5"
              style="cursor: pointer !important"
          />
        </div>
        <div class="w-100 d-flex justify-content-between my-2">
          <span>{{ $t("feedback") }}</span>
          <ratingStar
              :rate="state.scores.score6"
              style="cursor: pointer !important"
          />
        </div>
      </div>
    </div>
  </div>
  <swiper
      :direction="'horizontal'"
      :free-mode="true"
      :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
      :slides-per-view="'auto'"
      :space-between="6"
      class="slider px-2"
  >
    <swiper-slide
        v-for="(categorie, index) in categories"
        :key="categorie"
        class="pt-2 mt-1"
        style="cursor: pointer"
    >
      <Chip @click="unit = index">
        <div class="py-1">
          {{ categorie.categoryTitle }}
        </div>
      </Chip>
    </swiper-slide>
  </swiper>
  <post v-if="unit == 0"/>
  <product v-if="unit == 1"/>
  <prop v-if="unit == 2"/>
  <story v-if="unit == 3"/>
</template>

<script>
import ratingStar from "@/app/public/shared/ratinstar/ratingStars.vue";
import {ref, onMounted, onBeforeMount} from "vue";
import {i18n} from "@/main";
import Chip from "primevue/chip";
import {activitiesState} from "./activitiesState";
import {useRoute} from "vue-router";
import post from "./units/unit1/post.vue";
import product from "./units/unit2/product.vue";
import prop from "./units/unit3/prop.vue";
import story from "./units/unit4/story.vue";

export default {
  components: {ratingStar, Chip, post, product, prop, story},
  setup() {
    const state = ref(new activitiesState());
    const route = useRoute();
    const unit = ref(0);
    onBeforeMount(() => {
      state.value.supporterPageId = route.params.supporterId;
    });
    onMounted(() => {
      state.value.SupervisorScore();
    });
    const items = ref([
      {
        title: i18n.global.tc("usefulPhotoCaptions"),
        rate: 3,
      },
      {
        title: i18n.global.tc("patient"),
        rate: 3,
      },
      {
        title: i18n.global.tc("contributeToContentProduction"),
        rate: 3,
      },
      {
        title: i18n.global.tc("punctuality"),
        rate: 3,
      },
      {
        title: i18n.global.tc("description"),
        rate: 3,
      },
      {
        title: i18n.global.tc("feedback"),
        rate: 3,
      },
    ]);
    const categories = ref([
      {
        categoryTitle: i18n.global.tc("post"),
      },
      {
        categoryTitle: i18n.global.tc("product"),
      },
      {
        categoryTitle: i18n.global.tc("prop"),
      },
      {
        categoryTitle: i18n.global.tc("story"),
      },
    ]);
    onMounted(() => {
    });
    return {
      items,
      categories,
      state,
      unit,
    };
  },
};
</script>

<style lang="scss" scoped>
.size-25 {
  font-size: 25px;
}

.swiper-container {
  // width: 100%;
  height: 44px;
  direction: rtl;
  padding-bottom: 15px !important;
  margin-top: 10px;
}

.swiper-slide {
  // width: auto !important;
  padding: 3px;
}

.swiper-slide img {
  // width: 100%;
  height: 100%;
  object-fit: cover;
}

::v-deep(.p-chip-text) {
  font-size: 12px;
}

::v-deep(.p-chip) {
  background-color: #ffffff;
  border-radius: 11px;
  box-shadow: 1px 0px 7px rgb(0 0 0 / 28%);
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

.text-custom {
  color: rgb(0 0 0 / 30%);
}

.row {
  display: flex;
  flex-wrap: wrap;
}

.col {
  flex: 1 0 16%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.swiper-img {
  border-radius: 15px;
  border: 1px solid rgb(203, 202, 202);
}

.w-60px {
  width: 60px;
}

.m-1px {
  margin-top: 1px;
}

.border-radius-2px {
  border-radius: 2px;
}

@media (min-width: 990px) {
  .close-btn {
    display: none;
  }
}

.close-btn {
  width: fit-content;
}

.user-profile-image {
  width: 40px;
  height: 40px;
  border-radius: 30px;
}

.main-postImg {
  width: 25px;
  height: 25px;
  border-radius: 25px;
}

.comment-input {
  background-color: rgb(255, 255, 255);
  border: none;
  width: 85%;
  color: black;
}

.comment-input:focus {
  outline: none;
}

.size-too-small {
  font-size: 13px;
}

.size-small {
  font-size: 14px;
}

.size-medium {
  font-size: 22px;
}

.last-icon {
  font-size: 19px;
}

.eye-icon-color {
  color: rgb(100, 100, 100);
}

.more-color {
  color: rgb(120, 120, 120);
  margin-top: -14px;
}

::placeholder {
  color: rgb(0, 0, 0);
  opacity: 1;
}

.info {
  margin-top: -7px;
}

.caption {
  word-break: break-word;
  margin-top: -13px;
  text-justify: inter-word;
}

.swiper-container {
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
  list-style: none;
  padding-right: 0;
  /*width: 506px !important;*/
}

.swiper-slide {
  width: auto !important;
  padding: 3px !important;
}

.newProduct-card {
  border-radius: 10px;
  box-shadow: 0 0 2px 2px #dfdfdf96;
  max-width: 180px;
  min-width: 180px;
}

.newProductImg {
  width: 100%;
  min-height: 180px;
  max-height: 180px;
  border-radius: 10px;
}

.offPercent {
  background-color: #e81818;
  width: 36px;
  height: 27px;
  border-radius: 4px;
}

p {
  padding: 0;
  margin: 0;
  font-size: 14px;
}

.lined-txt {
  text-decoration: line-through;
}

.font-21 {
  font-size: 21px;
}

.long-caption {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
}

.header-shadow {
  box-shadow: 0px 1px 9px #d0cfcfd4;
}

.icon {
  border: 1px solid black;
  border-radius: 50%;
  padding: 3px 10px;
  font-size: 20px;
}

.switch {
  display: block;
  margin-top: 24px;
}

.switch .slider {
  position: relative;
  display: inline-block;
  height: 11px;
  width: 32px;
  border-radius: 8px;
  cursor: pointer;
  background: #c5c5c5;
  transition: all 0.2s ease;
}

.switch .slider:after {
  background: #eeeeee;
  position: absolute;
  left: -8px;
  top: -8px;
  display: block;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  content: "";
  transition: all 0.2s ease;
}

.switch label {
  margin-right: 7px;
}

.switch .input {
  display: none;
}

.switch .input ~ .label {
  margin-left: 8px;
}

.switch .input:checked ~ .slider:after {
  left: 16px;
}

.switch .input:checked ~ .slider {
  background: #4cd27ba6;
}

.switch .input:checked ~ .slider:after {
  background: #4cd27b;
}

.submit-btn {
  border-radius: 11px;
  box-shadow: 1px 0 4px #ada5a55e;
  border: 1px solid #c5c0c04d;
  font-size: 14px;
  outline: none !important;
}

.main {
  z-index: 4;
  position: absolute;
  background-color: white;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.border-radius {
  border-radius: 8px;
}
</style>
