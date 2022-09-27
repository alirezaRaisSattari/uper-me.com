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
        <span class="nf404">{{ status }}</span>
      </div>
      <div class="d-flex justify-content-center">
        <span class="text-danger font-large-nf">{{ $t(title) }}</span>
      </div>
      <div class="d-flex justify-content-center px-3 my-3">
        <Button :label="$t('goBack')" class="px-5"/>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
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

    return {title, status};
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
  text-shadow: 0 0 2px black;
  font-size: 90px;
  font-weight: 900 !important;
  color: #eaeaea;
}

.uper-shadow {
  box-shadow: 2px 2px 4px rgba(64, 64, 64, 0.35);
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
