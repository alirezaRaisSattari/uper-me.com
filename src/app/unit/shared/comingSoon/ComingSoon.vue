<template>
  <div class="d-flex h-100 align-items-center justify-content-center">
    <div class="card custom-notfound w-75">
      <div class="d-flex justify-content-center">
        <img
            alt=""
            class="image-uper uper-shadow translate-x"
            src="@/assets/img/uper.png"
        />
      </div>
      <div class="d-flex justify-content-center">
        <span class="nf404">4   0    4</span>
      </div>
      <br>
      <div class="d-flex justify-content-center">
        <span class="text-danger font-large-nf">این قسمت به زودی آماده میشود و در اپلیکیشن فعال می‌باشد ،جهت استفاده از آن اپلیکیشن را دانلود کنید</span>
      </div>
      <div class="d-flex justify-content-center px-3 my-3">
        <Button :label="$t('goBack')" class="px-5" @click="goHome()"/>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import router from "@/core/router/router";
import {defineComponent, ref} from "vue";

export default defineComponent({
  name: "ErrorScreen",
  props: {
    title: String,
    status: Number,
  },
  setup(props) {
    const title = ref(props.title ?? "");
    const status = ref(props.status ?? 404);

    const goHome = () => {
      router.push("/")
    }

    return {title, status, goHome};
  },
});
</script>

<style scoped>
.translate-x {
  margin-top: -3.7rem;
}

.custom-notfound {
  box-shadow: 2px 2px 4px rgba(64, 64, 64, 0.35);
  border-radius: 15px;
  border: none !important;
}

.nf404 {
  text-align: center;
  text-shadow: 0 0 2px black;
  font-size: 26px;
  color: #2c5a31;
}

.uper-shadow {
  box-shadow: 2px 2px 4px rgba(64, 64, 64, 0.50);
}

.font-large-nf {
  font-size: 20px;
}

.image-uper {
  border-radius: 50%;
  width: 7rem;
  height: 7rem;
}
</style>
