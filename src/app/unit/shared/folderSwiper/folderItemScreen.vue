<template>
  <div>
    <div :class="selected === folder.folderId ? 'selected':''" class="item-folder" @click="onSelect()">
      <template v-if="folder.images && folder.images.length > 0">
        <template v-for="src in folder.images" :key="src">
          <div :style="{'background-image':`url(${src.mainImageUrl + '_sm.webp'})`}" class="img"></div>
        </template>
        <span>{{ folder.name }}</span>
      </template>
      <template v-else>
        <div class="img icon">
          <i :class="selected === folder.folderId ? 'pi pi-folder-open':'pi pi-folder'"></i>
          <span>{{ folder.name }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    folder: Object,
    selected: Number
  },
  emits: ['callBack'],
  setup(props, {emit}) {

    const onSelect = () => {
      emit('callBack', props.folder.folderId);
    }
    return {onSelect}
  }
}
</script>

<style lang="scss" scoped>
.item-folder {
  width: 130px;
  height: 130px;
  display: flex;
  flex-wrap: wrap;
  border-radius: 10px;
  box-shadow: 0 0 3px #b5b5b5;
  margin: 10px 5px;
  cursor: pointer;
  overflow: hidden;

  .img {
    display: flex;
    flex: 1;
    width: 100%;
    max-width: 50%;
    min-width: 50%;
    height: 50px;
    background-position: center;
    background-size: 100%;
    background-repeat: no-repeat;
    min-height: 50%;
    border: 1px solid #fafafa;

    &:nth-child(1) {
      border-top-right-radius: 10px;
    }

    &:nth-child(2) {
      border-top-left-radius: 10px;
    }

    &:nth-child(3) {
      border-bottom-right-radius: 10px;
    }

    &:nth-child(4) {
      border-bottom-left-radius: 10px;
    }
  }

  .icon {
    width: 100%;
    height: 95%;
    min-width: 100% !important;
    justify-content: center;
    align-items: center;

    i {
      font-size: 25px;
    }
  }

  span {
    position: absolute;
    bottom: 11px;
    left: 10px;
    width: 87%;
    text-align: center;
    font-size: 14px;
    background: #eeeeeeb8;
    border-bottom-right-radius: 7px;
    border-bottom-left-radius: 7px;
    padding: 3px 5px 4px;
    color: #303030;
  }
}

.selected {
  box-shadow: 0 0 3px #ff9f00;
  border: 1px solid #ff9f00;
}
</style>
