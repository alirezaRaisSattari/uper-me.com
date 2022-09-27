<template>
  <div>
    <Galleria
        :value="images"
        containerStyle="max-width: 100%"
        :fullScreen="true"
        :showItemNavigators="showPrev"
        v-model:visible="displayBasic"
        :showThumbnails="false"
    >
      <template #item="slotProps">
        <img :src="slotProps.item + '_sm.webp'"/>
      </template>
      <!-- <template #thumbnail="slotProps">
        <img :src="slotProps.item + '_sm.webp'" style="display: block" />
      </template> -->
    </Galleria>
  </div>
</template>


<script>
import Galleria from "primevue/galleria";
import {ref, watch} from "@vue/runtime-core";

export default {
  components: {
    Galleria,
  },

  props: ["images", "displayBasic"],
  emits: ["timeClose"],

  setup(props, {emit}) {
    function imageclick(index) {
      this.activeIndex = index;
      this.displayCustom = true;
    }

    const displayBasic = ref(props.displayBasic);
    const showPrev = ref(true);
    if (props.images.length == 1) showPrev.value = false;

    watch(
        () => displayBasic.value,
        (e) => {
          if (!displayBasic.value) {
            setTimeout(() => {
              emit("timeClose", true);
            }, 300);
          }
        }
    );

    return {
      images: props.images,
      responsiveOptions: [
        {
          breakpoint: "1024px",
          numVisible: 5,
        },
        {
          breakpoint: "768px",
          numVisible: 3,
        },
        {
          breakpoint: "560px",
          numVisible: 1,
        },
      ],
      showPrev,
      displayBasic,
    };
  },
};
</script>

<style scoped>
::v-deep(.p-galleria-mask.p-component-overlay) {
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 10;
  width: 100% !important;
}

::v-deep(.p-galleria) {
  direction: ltr;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  width: 100%;
}

::v-deep(.p-galleria-content) {
  width: 100%;
}

::v-deep(.p-galleria-thumbnail-container) {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

::v-deep(.p-galleria-item-container) {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
}

::v-deep(.p-galleria-item img) {
  width: 50%;
  /* position: absolute;
    bottom: -100px; */
}

::v-deep(.p-galleria-thumbnail-item-content) {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

::v-deep(.p-galleria-thumbnail-item-content img) {
  width: 50%;
}
</style>
