<template>
  <div class="body">
    <div
        :style="'--rating:' + rate"
        aria-label="Rating of this product is 2.3 out of 5."
        class="Stars"
    ></div>
  </div>
</template>

<script>
export default {
  name: "ratingStars",
  props: {
    rate: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style>
:root {
  --star-size: 20px;
  --star-color: rgb(255, 255, 255);
  --star-background: #fc0;
}

.Stars {
  --percent: calc(var(--rating) / 5 * 100%);
  display: inline-block;
  font-size: var(--star-size);
  line-height: 1;
}

.Stars::before {
  content: "★★★★★";
  letter-spacing: 1px;
  background: linear-gradient(
      90deg,
      var(--star-background) var(--percent),
      var(--star-color) var(--percent)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: #00000029;
}

.body {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
