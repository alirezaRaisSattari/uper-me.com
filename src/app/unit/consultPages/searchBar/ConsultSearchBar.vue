<template>
  <div
      class="
      input-holder
      p-2
      mt-3
      d-flex
      justify-content-between
      align-items-center
    "
  >
    <input :placeholder="$t('search')" class="input-field w-75" type="text"/>
    <i class="fa fa-search icon w-25 text-left icon" style="font-size: 20px">
    </i>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.input-holder {
  width: 100%;
  text-align: center;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.icon {
  color: #ccc;
}

.input-field {
  border: none;
  outline: none !important;
  background: transparent;
}

input:focus {
  outline: none;
  border: 1px solid #ccc !important;
}
</style>
