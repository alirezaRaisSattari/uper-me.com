<template>
  <swiper
      v-if="comments != null"
      :direction="'horizontal'"
      :free-mode="true"
      :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
      :space-between="15"
      slides-per-view="auto"
  >
    <swiper-slide v-for="comment in comments" :key="comment.commentId">
      <div class="ltr bg-white uper-card-1 m-1 my-card ">
        <div class="d-flex justify-content-between align-items-center p-2">
          <div class=" align-items-center ltr">
            <div class="d-flex align-items-center">
              <i
                  v-if="comment.commentStatus === 1"
                  class="far fa-smile-beam icon-size-25 face"
              ></i>
              <i
                  v-if="comment.commentStatus === 2"
                  class="far fa-meh icon-size-23 face"
              ></i>
              <i
                  v-if="comment.commentStatus === 3"
                  class="far fa-frown icon-size-23 face"
              ></i>
              <i
                  v-if="comment.commentStatus === 4"
                  class="fas fa-question icon-size-23 face"
              ></i>

              <p class="my-auto ml-2">
                {{ commentStatus[comment.commentStatus - 1].text }}
              </p>
            </div>
            <p class="date">{{ timePassed(comment.createDate) }}</p>
          </div>
          <p class="ml-auto text-right px-2">
            <span class="size-small text-right">{{
                comment.pageDetail.name
              }}</span>
            <br/>
            <span class="size-small text-right" style="color: #757575">{{
                comment.pageDetail.username
              }}</span>
          </p>
          <img
              v-lazy="comment.pageDetail.profileImageUrl + '_sm.webp'"
              class="rounded-circle"
              height="48"
              width="48"
          />
        </div>
        <hr class="mt-0 mb-0"/>
        <p class="p-2 smart-text-align">
          {{ comment.text }}
        </p>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
import {ref} from "vue";
import {DateService} from "@/core/service/date.service";
import {i18n} from "@/main";
import {Swiper, SwiperSlide} from "swiper/vue";

export default {
  props: {
    comments: [],
  },
  components: {Swiper, SwiperSlide},
  setup(props) {
    const comments = props.comments
    const timePassed = (time) => {
      return DateService.getInstance().timeDifference(time);
    };
    const commentStatus = ref([
      {text: i18n.global.tc("suggest")},
      {text: i18n.global.tc("noIdea")},
      {text: i18n.global.tc("IDontsuggest")},
      {text: i18n.global.tc("iHaveQuestion")},
    ]);

    return {timePassed, commentStatus, comments};
  },
};
</script>

<style scoped>

.date {
  margin-top: 5px;
  margin-left: 11px;
}

.my-card {
  max-width: 100%;
}

p {
  padding: 0;
  margin: 0;
  font-size: 14px !important;
  line-height: 1.9;
}
</style>
