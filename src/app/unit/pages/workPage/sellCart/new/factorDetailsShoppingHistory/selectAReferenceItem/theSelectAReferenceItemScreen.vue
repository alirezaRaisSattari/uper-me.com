<template>
    <div>
        
    </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import {selectAReferenceItemState} from './theSelectAReferenceItemState'
export default {
    setup () {
        const state = ref(new selectAReferenceItemState());

        return {state}
    }
}
</script>

<style lang="scss" scoped>

</style>