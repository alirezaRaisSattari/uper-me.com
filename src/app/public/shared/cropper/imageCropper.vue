<template>
  <div>
    <div class="img-container">
      <img ref="image" v-lazy="src" crossorigin/>
    </div>
    <img v-lazy="destination" alt="" class="img-preview"/>
  </div>
</template>

<script>
import Cropper from "cropperjs";
import {onMounted, ref} from "vue";

export default {
  name: "ImageCropper",
  props: {
    src: String,
  },
  setup() {
    const cropper = ref([]);
    const destination = ref({});
    const image = ref(null);
    const canvas = ref();

    onMounted(() => {
      cropper.value = new Cropper(image.value, {
        zoomable: false,
        scalable: false,
        aspectRatio: 1,
        crop: () => {
          canvas.value = cropper.value.getCroppedCanvas();
          destination.value = canvas.value.toDataURL("image/png");
        },
      });
    });
    return {destination, image, cropper};
  },
};
</script>

<style scoped>
.img-container {
  width: 640px;
  height: 480px;
  float: left;
}

.img-preview {
  width: 200px;
  height: 200px;
  float: left;
  margin-left: 10px;
}
</style>