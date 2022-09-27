<template>
  <div class="d-flex align-items-center center">
    <div v-for="item in stories">
      <div class="story-box-sm">
        <div class="col-12 text-center px-1">
          <img
              v-lazy="item.fileUrl"
              alt=""
              class="img-story object-fit-cover"
          />
          <span :title="item.caption" class="span-column text-sm">{{
              item.caption
            }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FourStoryList",
  props: ['stories'],
  setup(props) {

  },
};
</script>

<style scoped>
.img-story {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0px 0px 1px 1px rgb(199, 199, 199);
}

.story-box-sm {
  width: 72px;
}
</style>
