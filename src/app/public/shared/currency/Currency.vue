<template>
  <img v-if="currency === 1" v-bind="$attrs"
       :class="
        scaleNum === 2
          ? 'scale-5in4'
          : scaleNum === 3
          ? 'scale-2in1'
          : scaleNum === 4
          ? 'scale-7in4'
          : scaleNum === 5
          ? 'scale-2in1'
          : ''"
       alt="" src="@/assets/img/svg/toman.svg">
  <img v-if="currency === -1" v-bind="$attrs"
       :class="
        scaleNum === 2
          ? 'scale-5in4'
          : scaleNum === 3
          ? 'scale-2in1'
          : scaleNum === 4
          ? 'scale-7in4'
          : scaleNum === 5
          ? 'scale-2in1'
          : ''"
       alt="" src="@/assets/img/svg/englishToman.svg">
  <img v-if="currency === 0" v-bind="$attrs"
       :class="
        scaleNum === 2
          ? 'scale-5in4'
          : scaleNum === 3
          ? 'scale-2in1'
          : scaleNum === 4
          ? 'scale-7in4'
          : scaleNum === 5
          ? 'scale-2in1'
          : ''"
       alt="" src="@/assets/img/svg/uperCoin.svg">
</template>
<script lang="ts">
import {defineComponent, onMounted, ref} from "vue";
import {i18n} from "@/main";

export default defineComponent({
  name: "Currency",
  props: ['currencyId', 'scale'],
  setup(props) {
    const currency = ref<number>(null)
    if (props.currencyId == 1) {
      currency.value = i18n.global.locale == 'en' ? -1 : 1;
    }
    if (props.currencyId == 0) {
      currency.value = 0;
    }

    const scaleNum = ref(null);
    onMounted(() => {

      switch (props.scale) {
        case 1:
          scaleNum.value = 1;
          break;
        case 1.25:
          scaleNum.value = 2;
          break;
        case 1.5:
          scaleNum.value = 3;
          break;
        case 1.75:
          scaleNum.value = 4;
          break;
        case 2:
          scaleNum.value = 5;

          break;
      }
    })
    return {
      currency,
      scaleNum,
    };
  },
});
</script>

<style scoped>
img {
  width: 17px;
  height: 17px;
}

.scale-5in4 {
  transform: scale(1.25);
}

.scale-2in1 {
  transform: scale(1.5)
}

.scale-7in4 {
  transform: scale(1.75)
}

.scale-2in1 {
  transform: scale(2)
}


</style>
