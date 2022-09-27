<template>
  <div class="main-pic-item p-0">
    <img v-lazy="item.file" alt="photo" aria-controls="overlay_menu"
         aria-haspopup="true" class="image-style" @click="toggle">
    <Menu ref="menu" :model="menuOptions" :popup="true" class="custom-menu"/>
  </div>
</template>

<script>
import {ref} from 'vue'
import {i18n} from "@/main";

export default {
  name: "ImageItemProduct",
  props: {
    item: Object
  },
  setup(props, {emit}) {
    const menu = ref();
    const toggle = (event) => {
      menu.value.toggle(event);
    };

    const menuOptions = ref([{
      label: i18n.global.tc('setAsMainPhoto'),
      icon: 'far fa-image',
      command: (event) => {
        emit('upgradeImage', props.item.file);
      }
    },
      {
        label: i18n.global.tc('delete'),
        icon: 'far fa-trash-alt',
        command: (event) => {
          emit('DeleteImage', props.item.file);
        }
      }
    ]);

    return {menu, toggle, menuOptions}

  }
}
</script>

<style lang="scss" scoped>

.image-style {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

.main-pic-item {
  width: 100%;
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 3px var(--color-dark);
  font-size: 15px;
  color: var(--color-medium-dark);
  border-radius: 10px;
  cursor: pointer;
  padding: 10px;
  transition: all 0.2s ease-in-out;
}

</style>