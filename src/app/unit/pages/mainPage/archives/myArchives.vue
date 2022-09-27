<template>
  <div class="d-flex flex-column align-items-center">
    <div class="w-75 mt-2">
      <select v-model="unit" class="form-control px-2">
        <option selected value="1">{{ $t("myArchivePosts") }}</option>
        <option value="2">{{ $t("myArchiveStories") }}</option>
      </select>
    </div>
  </div>
  <archivePosts v-if="unit == 1" />
  <archiveStories v-if="unit == 2" />
</template>

<script>
  import archivePosts from "./posts/archivePosts.vue";
  import archiveStories from "./stories/archiveStories.vue";
  import ratio from "@/app/public/shared/ratio/ratio.vue";
  import {
    ref
  } from "@vue/reactivity";

  export default {
    name: "myArchives",
    components: {
      archivePosts,
      ratio,
      archiveStories,
    },
    setup() {
      const unit = ref(1);
      return {
        unit,
      };
    },
  };
</script>

<style scoped>
  .img {
    width: 23%;
    height: 100px;
  }

  .post-image {
    width: 100%;
    height: 170px;
    object-fit: contain;
    border-radius: 8px;
  }

  .image-style {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  @media (min-width: 990px) {
    .close-btn {
      display: none;
    }
  }

  .close-btn {
    width: fit-content;
  }

  .caption {
    word-break: break-word;
    margin-top: -13px;
  }

  .show-post {
    background: red;
    height: 400px;
  }

  .image-holder {
    width: 32%;
    height: auto;
    margin: 0;
  }

  .border-radius {
    border-radius: 8px;
  }

  .main {
    z-index: 4;
    position: absolute;
    background-color: white;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>