<template>
  <div class="main-pic-item p-0">
    <img v-lazy="item.file ? item.file:item.link" aria-controls="overlay_menu" aria-haspopup="true"
         class="image-style" @click="toggle">
    <Menu ref="menu" :model="menuOptions" :popup="true" class="custom-menu"/>
  </div>
</template>

<script>
import {ref} from 'vue'
import {i18n} from "@/main";

export default {
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
        emit('upgradeImage', props.item.file !== '' ? props.item.file : props.item.link);
      }
    },
      {
        label: i18n.global.tc('delete'),
        icon: 'far fa-trash-alt',
        command: (event) => {
          emit('DeleteImage', props.item.file !== '' ? props.item.file : props.item.link);
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

</style>
