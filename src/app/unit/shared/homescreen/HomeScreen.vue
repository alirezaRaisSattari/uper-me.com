<template>
  <div class="col-12 px-0 h-100 bg-white pb-5 mb-5 ">
    <div class="home-header pb-4">
      <div class="d-flex align-items-center justify-content-between mx-0">
        <router-link
          class="text-decoration-none"
          class-active="active"
          to="/setting"
        >
          <Button
            class="icon-font p-button-rounded p-button-secondary p-button-text"
            icon="usettings"
          />
        </router-link>
        <div class="d-flex">
          <Button
            v-if="isSupporter"
            :title="$t('supporter')"
            class="p-button-rounded p-button-secondary p-button-text"
            icon="fas fa-headset"
            @click="toSupporter"
          />
          <Button
            v-if="isAgency"
            :title="$t('agency')"
            class="p-button-rounded p-button-secondary p-button-text"
            icon="fas fa-laptop-house"
            @click="toAgency"
          />
          <router-link
            class="text-decoration-none"
            class-active="active"
            to="Ticket"
          >
            <Button
              class="
                icon-font
                p-button-rounded p-button-secondary p-button-text
              "
              icon="uticet"
            />
          </router-link>
        </div>
      </div>
      <!--      <loading v-if="homeScreenState.loading"/>-->
      <div class="w-100 d-flex align-items-center justify-content-center">
        <div class="box-slide mt-0 position-relative mb-5">
          <ratio :ratio="'16/9'" class="p-3">
            <swiper
              :pagination="false"
              :slides-per-view="1"
              :space-between="0"
              class="slider"
              @slideChange="onSwiper"
            >
              <swiper-slide v-if="homeScreenState.loading">
                <loading />
              </swiper-slide>
              <swiper-slide v-if="homeScreenState.banners.length === 0">
                <img
                  alt="empty_images"
                  class="w-100 image-slider object-fit-contain"
                  src="@/assets/img/svg/empty_images.svg"
                />
              </swiper-slide>
              <swiper-slide
                v-for="item in homeScreenState.banners"
                v-else-if="homeScreenState.banners.length !== 0"
                :key="item.bannerId"
              >
                <img
                  :alt="item.title"
                  v-lazy="item.webImageUrl"
                  class="d-block w-100 image-slider object-fit-cover"
                  @click="getRout(item)"
                />
              </swiper-slide>
            </swiper>
          </ratio>
          <div class="paganation-swiper">
            <div
              v-for="(item, index) in homeScreenState.banners"
              :key="index"
              class="pagination-dot"
              v-bind:class="{
                'active-pagination-dot': index == activeSwiperIndex,
              }"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div class="gridview-posts d-lg-none mt-5">
      <router-link
        v-for="item in units"
        :key="item.route"
        :to="item.route"
        class="text-decoration-none m-0 m-sm-1 m-md-2"
      >
        <div class="box-controler" >
        <div class="box-btn"  id="box-btn">
          <p class="text-center my-1">
            <i class="icon-font icon-size" :class="item.icon"></i>
          </p>

          <p class="text-center my-1 card-text-size">
            {{ $t(item.title) }}
          </p>
        </div>
        </div>
      </router-link>
     </div>
    </div>
</template>

<script lang="ts">
import {
  getMainPageId,
  getSelectedPageData,
  getSelectedPageId,
} from "@/core/service/utils.service";
import { defineComponent, onMounted, ref } from "vue";
import { HomeScreenState } from "./HomeScreenState";
import { GetAllBannersModel } from "@/data/setting/publicBanner.model";
import { bannerType, PageTypeId } from "@/core/enum/enums";
import router from "@/core/router/router";
import ratio from "@/app/public/shared/ratio/ratio.vue";
import { Swiper, SwiperSlide } from "swiper/vue";

export default defineComponent({
  name: "MainApp",
  components: { ratio, Swiper, SwiperSlide },
  setup() {
    const homeScreenState = ref(new HomeScreenState());
    const activeBannerIndex = ref(0);
    const activeSwiperIndex = ref(0);
    const isSupporter = ref(getSelectedPageData().isSupporter);
    const isAgency = ref(
      getSelectedPageId() < 0 &&
        getSelectedPageData().pageType === PageTypeId.Agency
    );
    const units = ref([
      { title: "transport", route: "/transport", icon: "udriver-settings" },
      {
        title: "chat",
        route: `/chat/${getSelectedPageData().username}`,
        icon: "uchat",
      },
      { title: "new", route: "/new", icon: "ua-new" },
      { title: "orderFood", route: "/food", icon: "uresturant--litlle" },
      { title: "mine", route: "/mining", icon: "ua-money" },
      { title: "consult", route: "/consult", icon: "uconsult5" },
    ]);

    onMounted(() => {
      homeScreenState.value.getPublicBanners(<GetAllBannersModel>{
        cityId: null,
        bannerType: bannerType.public,
      });
    });

    function getRout(item) {
      switch (item.bannerRefrenceType) {
        case 1:
          router.push("/product/" + item.referenceId + "/" + item.pageId);
          break;
        case 2:
          router.push("/page/" + item.pageId);
          break;
        case 3:
           let url:String = item.webUrl;
                if (url.includes('https://')) url.replace('https://' , '');
                if (url.includes('http://')) url.replace('http://' , '');

                Object.assign(document.createElement('a'), {
                    target: '_blank',
                    href: 'https://' + url,
            }).click();
          break;
        case 4:
           router.push("/eventPage?id=" + item.pageId);
          break;
        default:
           router.push("/product/" + item.referenceId + "/" + item.pageId);
          break;
      }
    }

    function onSwiper(swiper) {
      activeSwiperIndex.value = swiper.activeIndex;
    }

    function toAgency() {
      router.push("/supervisor");
    }

    function toSupporter() {
      router.push(`/supervisor/${getMainPageId()}/0`);
    }

    return {
      activeBannerIndex,
      activeSwiperIndex,
      homeScreenState,
      isSupporter,
      isAgency,
      units,
      toSupporter,
      onSwiper,
      toAgency,
      getRout,
    };
  },
});
</script>

<style scoped>
.slider {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  top: 8px;
  background-color: white;
  border:3px solid white
}

/*swiper-slider*/
.image-slider {
  height: 100%;
}

.gridview-posts {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: center;
  align-items: center;
  margin: 8px;
  background-color: white;
  padding-top: 60px;
}

.box-btn {
  background: linear-gradient(180deg, hsla(206, 35%, 91%, 1) 50%, hsla(206, 35%, 91%, 0) 100%, hsla(206, 35%, 91%, 1) 100%);
  color: #22707d;
  aspect-ratio: 1;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 3px 2px  #eeeeee ;
  border: 4px solid #ffffff;
  border-radius: 35px;
}

.home-header {
  width: 100%;
  height: 200px;
  box-shadow: 0 10px 24px -11px grey;
  background-color: #e0e9f0;
  border-bottom-left-radius: 150px;
  border-bottom-right-radius: 150px;
  padding: 0;
  position: relative;
}

.box-slide {
  width: 80%;
  height: 75%;
}

swiper-slide {
  margin: 0 !important;
}

.paganation-swiper {
  position: absolute;
  bottom: -15px;
  display: flex;
  width: 100%;
  justify-content: center;
}

.pagination-dot {
  width: 8px;
  height: 8px;
  margin: 2px;
  border-radius: 50px;
  background-color: grey;
  transition: all 0.3s ease-in-out;
}

.active-pagination-dot {
  background-color: #22707d;
  width: 22px;
}

.icon-size {
  font-size: 150% !important;
}

.card-text-size {
  font-size: 75% !important;
}

@media (max-width: 400px) {
  .gridview-posts {
    padding-top: 40px;
  }
}

@media (max-width: 330px) {
  .gridview-posts {
    padding-top: 20px;
  }
}
.content-box{
  background-color: #eeeeee;

}
.box-btn{
  background-color: #eeeeee;
  padding: 3px;
  padding-bottom: 10px !important;
}
.box-controler{
  background: linear-gradient(180deg, hsla(206, 35%, 91%, 1) 50%, hsla(206, 35%, 91%, 0) 100%, hsla(206, 35%, 91%, 1)  100%);
  padding: 4px;
  border-radius: 39px;

}
</style>
