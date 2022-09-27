<template>
  <div class="consultpage-dir">
    <div class="text-center app-back m-auto mt-2">
      <SearchBar class="mt-3"></SearchBar>

      <div class="w-100 d-flex mt-3 p-0"> <!--swiper background-->
        <swiper
            :direction="'horizontal'"
            :free-mode="false"
            :pagination="{ clickable: true }"
            :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
            :slides-per-view="'1'"
            :space-between="10"
            class="slider w-100 mr-5"
        >
          <swiper-slide
              v-for="item in consultPage.banners"
              :key="item"
              class="pt-2 w-100 d-flex justify-content-center"
              @click="handleClickBanner(item.bannerRefrenceType,item)"
          >
            <img v-lazy="item.webImageUrl" alt="" class="slider-img w-100 mx-2"/>
          </swiper-slide>
        </swiper>
      </div>
      <div class="story-div mb-4"><!--story background-->
        <Story
            :storyList="consultPage.stories"
            @getNewStoriesEvent="handlegetNewStoriesEvent"
        ></Story>
      </div>
      <div class="mt-5 m-auto"><!--consultPages background-->
        <div
            v-for="i in consultPage.ConsultPosts"
            :key="i.id"
            class="d-flex justify-content-center my-2"
            @click="clickConsultPage(i)"
        >
          <ConsultPosts :page="i"></ConsultPosts>
        </div>
      </div>
      <div
          v-if="consultPage.postsLoading"
          class="spinner-border text-secondary"
          role="status"
      >
        <span class="sr-only"></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {ToastService} from "@/core/service/toast.service";
import router from "@/core/router/router";
import {onMounted, ref} from "vue";
import {consultPageState} from "@/app/unit/consultPages/consultPageState";
import Slider from "@/app/unit/consultPages/banners/consultBannerSlider.vue";
import SearchBar from "@/app/unit/consultPages/searchBar/ConsultSearchBar.vue";
import Story from "@/app/unit/consultPages/stories/ConsultStories.vue";
import ConsultPosts from "@/app/unit/consultPages/posts/ConsultPosts.vue";
import {GetAllBannersModel} from "@/data/setting/publicBanner.model";
import {bannerType} from "@/core/enum/enums";
import {GetAllUpgradeStoryByTypeModel} from "@/data/city/mainpage/story.model";
import {Swiper, SwiperSlide} from "swiper/vue";
import {slugify} from "@/core/service/utils.service";

export default {
  name: "consultPage",
  components: {Slider, Swiper, SwiperSlide, SearchBar, ConsultPosts, Story},
  setup() {
    const consultPostsSkipval = ref(0);
    const storySkipval = ref(0);
    let apiCalled = ref(false);
    const consultPage = ref(new consultPageState());

    function getBanners() {
      consultPage.value.getBanners(<GetAllBannersModel>{
        bannerType: bannerType.consult,
        cityId: null,
      });
    }

    function handleClickBanner(type, item) {
      if (type >= 5 || type == 1) {
        router.push(`/product/${item.referenceId}/${item.pageId}/${slugify(item.name)}`)
      } else if (type == 4) {//event page
        ToastService.getInstance().warning("Event Page is not ready yet! ")
      } else if (type == 2) {// page
        //router.push(`/page/${item.title}`)  // /page/:userName --> there is no userName in data that is sent by api :|
      } else if (type == 3) {// web
        window.open(item.webUrl);
      }
    }

    function clickConsultPage(page) {
      router.push(`/page/${page.userName}`)
    }

    function getStories(skip: Number) {
      consultPage.value.getStories(<GetAllUpgradeStoryByTypeModel>{
        requestTime: new Date(),
        type: 1,
        skip: skip,
        take: 2,
      });
    }

    function getConsultPosts(skipVal: Number) {
      consultPage.value.getConsultPosts(skipVal);
      apiCalled.value = false;
    }

    function windowScrolledToBottom(callBack) {
      window.addEventListener(
          "scroll",
          (e) => {
            if (
                document.documentElement.scrollHeight -
                document.documentElement.scrollTop >=
                document.documentElement.clientHeight &&
                document.documentElement.scrollHeight -
                document.documentElement.scrollTop <=
                document.documentElement.clientHeight + 100
            ) {
              callBack();
            }
          },
          false
      );
    }

    function handlegetNewStoriesEvent() {
      storySkipval.value += 2;
      consultPage.value.handleGetNewStories(storySkipval.value);
    }

    onMounted(() => {
      getBanners();

      getStories(0);
      getConsultPosts(consultPostsSkipval.value);
      windowScrolledToBottom(() => {
        consultPostsSkipval.value += 20;
        if (!consultPage.value.ConsultPostsEmpty)
          if (!apiCalled.value) {
            consultPage.value.postsLoading = true;
            getConsultPosts(consultPostsSkipval.value);
            apiCalled.value = true;
          }
      });
    });

    return {
      consultPage,
      handlegetNewStoriesEvent,
      handleClickBanner,
      clickConsultPage
    };
  },
};
</script>

<style scopred>
.swipers {
  width: 90%;
  height: 90%;
}

.story-div {
  max-width: 510px;
  max-height: 100px;
}

.slider-img {
  height: 230px;
  border-radius: 10px;
  box-shadow: 0 2px 5px #80808066;
  object-fit: contain;
}

.swiper-container {
  width: 100%;
  position: relative !important;
  height: 280px;
}

.swiper-pagination {
  position: absolute;
  top: 90% !important;
  z-index: 999 !important;
}

body[dir="rtl"] .swiper-container {
  padding-left: 48px;
}

body[dir="ltr"] .swiper-container {
  padding-right: 48px;
}
</style>
