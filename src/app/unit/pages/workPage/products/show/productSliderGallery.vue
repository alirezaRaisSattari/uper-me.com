<template>
  <Galleria
      v-model:visible="visible"
      :circular="true"
      :fullScreen="true"
      :showItemNavigators="true"
      :value="gallery"
  >
    <template #item="slotProps">
      <img :src="slotProps.item" class="main"/>
    </template>
    <template #thumbnail="slotProps">
      <img v-lazy="slotProps.item" class="mx-2" style="display: block; width:100px; height:100px;"/>
    </template>
  </Galleria>
</template>

<script>
import {ref, watch} from "vue";
import Galleria from "primevue/galleria";
import ratio from "@/app/public/shared/ratio/ratio.vue";

export default {
  components: {Galleria, ratio},
  props: {
    gallery: Array,
    visible: Boolean,
  },
  setup(props, {emit}) {
    function imageclick(index) {
      this.activeIndex = index;
      this.displayCustom = true;
    }

    watch(
        () => props.visible,
        (e) => {
          if (!e) {
            emit("close");
          }
        }
    );
    return {};
  },
};
</script>

<style scoped>
.main {
  z-index: 4;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: white;
  width: 500px;
  height: 500px;
  object-fit: contain;
}
@media (max-width: 450px) {
  .main{
    width: 150px;
  }
}
.wrapperOne {
  width: 580px !important;
}

.test {
  display: flex !important;
  flex-direction: row-reverse !important;
  justify-content: center !important;
  align-items: center !important;
}

/*TODO dont assign this styles in page*/
::v-deep(.p-galleria .p-galleria-thumbnail-container) {
  display: flex !important;
  flex-direction: row-reverse !important;
  justify-content: center !important;
  align-items: center !important;
}

/*TODO dont assign this styles in page*/
::v-deep(p-galleria-thumbnail-items) {
  display: flex !important;
  flex-direction: row-reverse !important;
}

.p-galleria-thumbnail-container {
  background: red !important;
}
</style>
