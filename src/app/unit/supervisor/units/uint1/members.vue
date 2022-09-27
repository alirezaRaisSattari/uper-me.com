<template>
  <loading v-if="state.loading"/>
  <div v-else-if="state.membersDetails">
    <div
        v-for="member in state.membersDetails.pages"
        :key="member"
        class="uper-card-1 my-3 py-0"
    >
      <div class="d-flex align-content-center">
        <img
            v-lazy="member.profileImageUrl + '_sm.webp'"
            class="image-style rounded-circle border mt-2 mr-2"
        />

        <div class="px-2 h-100 my-auto pt-1 text-right">
          <span class="media-controller mt-1">{{ member.name }}</span>
          <br/>
          <span class="media-controller my-auto">{{ member.userName }}</span>
        </div>
      </div>
      <Swiper
          :direction="'horizontal'"
          :free-mode="true"
          :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
          :slides-per-view="'auto'"
          :space-between="5"
      >
        <SwiperSlide v-for="item in member.categories" :key="item">
          <Chip v-if="item">
            <div class="d-flex align-items-center py-2">
              <p class="text-one-line text-custom">
                <b>{{ item.categoryTitle }}</b>
              </p>
            </div>
          </Chip>
        </SwiperSlide>
      </Swiper>
      <hr class="mb-0 mt-2"/>
      <div class="main-controller">
        <div class="child text-break">
          <div class="d-flex flex-column">
            <div>&nbsp;</div>
            <div>
              <p class="mx-auto text-center mt-2">{{ $t("today") }}</p>
            </div>
            <div>
              <p class="mx-auto text-center">{{ $t("yesterday") }}</p>
            </div>
            <div>
              <p class="mx-auto text-center">{{ $t("tow days ago") }}</p>
            </div>
          </div>
        </div>
        <div class="child text-break">
          <div class="d-flex flex-column">
            <p class="mx-auto text-center">{{ $t("post") }}</p>
            <p class="mx-auto text-center mt-2">
              {{ state.getPost_day(member.pageId, 1) }}
            </p>
            <p class="mx-auto text-center">
              {{ state.getPost_day(member.pageId, 2) }}
            </p>
            <p class="mx-auto text-center">
              {{ state.getPost_day(member.pageId, 3) }}
            </p>
          </div>
        </div>
        <div class="child text-break">
          <div class="d-flex flex-column">
            <p class="mx-auto text-center">{{ $t("product") }}</p>
            <p class="mx-auto text-center mt-2">
              {{ state.getProduct_day(member.pageId, 1) }}
            </p>
            <p class="mx-auto text-center">
              {{ state.getProduct_day(member.pageId, 2) }}
            </p>
            <p class="mx-auto text-center">
              {{ state.getProduct_day(member.pageId, 3) }}
            </p>
          </div>
        </div>
        <div class="child text-break">
          <div class="d-flex flex-column">
            <p class="mx-auto text-center">{{ $t("purchases") }}</p>
            <p class="mx-auto text-center mt-2">
              {{ state.getBuy_day(member.pageId, 1) }}
            </p>
            <p class="mx-auto text-center">
              {{ state.getBuy_day(member.pageId, 2) }}
            </p>
            <p class="mx-auto text-center">
              {{ state.getBuy_day(member.pageId, 3) }}
            </p>
          </div>
        </div>
        <div class="child text-break">
          <div class="d-flex flex-column">
            <p class="mx-auto text-center">{{ $t("sells") }}</p>
            <p class="mx-auto text-center mt-2">
              {{ state.getSell_day(member.pageId, 1) }}
            </p>
            <p class="mx-auto text-center">
              {{ state.getSell_day(member.pageId, 2) }}
            </p>
            <p class="mx-auto text-center">
              {{ state.getSell_day(member.pageId, 3) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import {membersState} from "./membersState";
import {useRoute} from "vue-router";
import Chip from "primevue/chip";

export default {
  components: {
    Chip,
  },
  setup() {
    const route = useRoute();
    const state = ref(new membersState());
    onMounted(() => {
      state.value.supporterPageId = route.params.supporterId;
      state.value.getMembers();
    });
    return {
      state,
    };
  },
};
</script>

<style lang="scss" scoped>
p {
  padding: 0;
  margin: 0;
  font-size: 14px;
}

.swiper-container {
  width: 100%;
  height: 44px;
  direction: rtl;
  padding-bottom: 15px !important;
  margin-top: 10px;
}

.swiper-slide {
  width: auto !important;
  padding: 3px;
}

.swiper-slide img {
  width: 100%;
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
  // background-color: red;
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-controller {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  max-width: 100%;

  .child {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 20%;
    padding: 10px;
  }
}
</style>
