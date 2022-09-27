<template>
  <div class=" img-wrap uper-card-1 p-0  ">

    <img v-lazy="item.file" alt="" aria-controls="overlay_menu"
         aria-haspopup="true" class="image-style" @click="toggle">
    <Menu ref="menu" :model="menuOptions" :popup="true" class="custom-menu"/>
  </div>
</template>

<script>
import {onMounted, ref} from 'vue'
import {i18n} from "@/main";

export default {
  props: {
    item: Object,
    type: Number
  },
  emits: ['upgradeImage', 'DeleteImage'],
  setup(props, {emit}) {
    const menu = ref();
    const toggle = (event) => {
      menu.value.toggle(event);
    };

    const menuOptions = ref(null);

    if (props.type == 2) { // used in imageItem in createStation in workPage (it is necessary!!)
      menuOptions.value = [

        {
          label: i18n.global.tc('delete'),
          icon: 'far fa-trash-alt',
          command: (event) => {
            emit('DeleteImage', props.item.file);
          }
        }
      ]

    } else {// used in imageItem in select image  in create workPage
      menuOptions.value = [{
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
            emit('DeleteImage', props.item.file.data);
          }
        }
      ]

    }

    return {menu, toggle, menuOptions}

  }
}
</script>

<style lang="scss" scoped>

.image-style {
  height: 85%;
  width: 88%;
  border-radius: 10px;
}

.uper-card-1:hover {
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25), 0 3px 5px rgba(0, 0, 0, 0.18);
  border-radius: 8px;
}


.img-wrap {
  width: 113px;
  height: 118px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /*box-shadow: 0 0 3px var(--color-dark);*/
  font-size: 15px;

  color: var(--color-medium-dark);
  border-radius: 10px;
  cursor: pointer;
  padding: 10px;
  background-color: #edf0f0db;
  transition: all 0.2s ease-in-out;
}

</style>
