<template>
<Header :title="$t('likes')"/>
  <loading v-if="state.loading"/>
  <div v-else>
    <Lottie v-if="state.list.length===0" :path="'https://up-staticfiles.s3.ir-thr-at1.arvanstorage.com/notFound.json'"
            :title="$t('noItem')"/>
  <div v-for=" item in state.list">
  <div class="view-like">
    <div><img class="img-mine" :src="item.profileImageUrl+'_sm.webp'" alt="">
      <img
          v-if="item.creditLevel === 1"
          alt=""
          class="position-absolute crown-like"
          height="25"
          src="@/assets/img/ic_crown_golden.svg"
          width="25"
      />
      <img
          v-if="item.creditLevel === 2"
          alt=""
          class="position-absolute crown-like"
          height="25"
          src="@/assets/img/ic_crown_grey.svg"
          width="25"
      />
   </div>
    <div class="text-like" >
      <P>{{item.userName}}</P>
      <P>{{item.name}}</P>
    </div>
  </div>
  </div>
  </div>
</template>
<script lang="ts">
import Lottie from "@/app/unit/shared/lottie/lottieWithTitleScreen.vue";
import Header from "@/app/unit/shared/headerApp/headerAppScreen.vue";
import {onBeforeUnmount, onMounted, ref} from "vue";
import {ViewLikeState} from "@/app/unit/pages/mainPage/posts/viewlLike/viewlike";
import {ScrollController} from "@/core/service/scroll.service";
export default ({
  components:{Header,Lottie},
  setup() {
    // let scrollCtrl = new ScrollController(onScroll);
    const state = ref(new ViewLikeState());
    // function onScroll() {
    //   if (!state.value.loading && !state.value.endList) {
    //     state.value.getData();
    //   }
    // }
    onMounted(()=>{
      state.value.viewlike()
    })
    // scrollCtrl.startListen();
    // onBeforeUnmount(() => {
    //   scrollCtrl.removeListen();
    // });

    return{
      // scrollCtrl,
      state
    };
  },
});
</script>
<style lang="scss" scoped>
.img-mine{border-radius: 50%;
  height: 80%;
  margin-top: 5px;
  margin-right: 3px;
}
.view-like{
  display: flex;
  flex-direction: row;
  width:95%;
border-radius: 5px;
  background-color: #ffffff;
  height:80px;
  border: 1px solid #ffffff;
  box-shadow: 0 0 4px rgb(0 0 0 / 25%);
  margin-left: 3px;
  margin-right: 11px;
  margin-top: 10px;
  position: relative;
}
.text{
  flex-direction: column;
}
.text-like{    padding: 7px 12px 0 0px;
}
.crown-like{    bottom: 10px;
  right: 44px;}
</style>

