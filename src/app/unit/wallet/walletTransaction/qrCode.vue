<template>
  <p style="color: white; font-size: 24px" @click="displayBasic = false">x</p>
  <ratio :ratio="'1/1'" class="p-3">
    <Qrcode :size="size" :value="code" class="main" level="H" />
  </ratio>
  <h4>{{ code }}</h4>
</template>
<script>
import { ref } from "vue";
import Qrcode from "@/app/public/shared/QrCode/QrCode.vue";
import ratio from "@/app/public/shared/ratio/ratio.vue";

export default {
  name: "qrCode",
  components: {
    Qrcode,
    ratio,
  },
  props: {
    code: {
      type: Number,
      required: true,
    },
  },
  setup() {
    const displayBasic = ref(true);

    return {
      displayBasic,
    };
  },
};
</script>

<style scoped>
.main {
  position: absolute;
  border-radius: 10px;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100% !important;
  height: 100% !important;
  object-fit: cover;
  display: flex;
}

.popup {
  max-width: 400px;
}

.bg-danger {
  background: rgb(76, 76, 76) !important;
}
</style>
