<template>
  <ratio ratio="1/1">
    <div class="w-100 h-100">
      <img v-if="listItem.itemType == 1 && listItem.item.mainFileIsImage" v-lazy="listItem.item.coverImageUrl"
           alt="" class="explore-image">
      <div v-else-if="listItem.itemType == 1 && !listItem.item.mainFileIsImage" class="video-box">
        <i class="fas fa-play icon-absolute"></i>
        <img v-lazy="listItem.item.coverImageUrl" class="explore-image"/>
      </div>
      <img v-else-if="isProduct()" v-lazy="listItem.item.mainImageUrl + '_sm.webp'"
           alt="" class="explore-image">
      <div v-else class="position-relative w-100 h-100">
        <i class="fas fa-shopping-cart icon-absolute"></i>
        <img v-lazy="listItem.item.mainImageUrl + '_sm.webp'"
             alt="" class="explore-image">
      </div>
    </div>
  </ratio>
</template>


<script lang="ts">
import {defineComponent} from "vue";
import ratio from "@/app/public/shared/ratio/ratio.vue";

export default defineComponent({
  name: "ExploreItem",
  components: {
    ratio,
  },
  props: ['listItem'],
  setup(props) {

    function isProduct() {
      return [5, 6, 7, 8, 14].find(m => m == props.listItem.item.productType);
    }

    return {
      isProduct,
    };
  },
});
</script>


<style lang="scss" scoped>
.explore-image {
  width: 100%;
  height: 99.5%;
  object-fit: cover;
}

body[dir="rtl"] .icon-absolute {
  position: absolute;
  right: 4px;
  top: 4px;
}

body[dir="ltr"] .icon-absolute {
  position: absolute;
  left: 4px;
  top: 4px;
}

.video-box {
  width: 100%;
  height: 100%;
  position: relative;
}

</style>
