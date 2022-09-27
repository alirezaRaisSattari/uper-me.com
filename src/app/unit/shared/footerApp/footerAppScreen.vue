<template>
  <div class="submit-form pt-4">
    <Button :label="$t('submit')" class="p-button-rounded p-button-danger" @click="onSubmit()"/>
  </div>
</template>

<script>
export default {
  emits: ['onSubmit'],
  setup(props, {emit}) {
    const onSubmit = () => {
      emit('onSubmit', true);
    }
    return {onSubmit}
  }
}
</script>

<style lang="scss" scoped>
.submit-form {
  width: 508px;
  position: fixed;
  bottom: -32px;
  display: flex;
  justify-content: center;
  background: #fadadd;
  border-radius: 50px;
  box-shadow: 0 -4px 5px #a9a9a9 !important;
  padding: 20px 10px 42px;
  z-index: 9;
  @media screen and (max-width: 993px) {
    z-index: 100;
  }
  @media screen and (max-width: 500px) {
    left: 0;
    width: 100%;
    bottom: -26px;
  }

  button {
    padding: 13px 70px;
  }
}

</style>
