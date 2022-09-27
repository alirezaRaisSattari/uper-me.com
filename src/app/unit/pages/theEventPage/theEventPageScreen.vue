<template>
    <div>
        <div class="banner-controller">
            <div class="head-banner" v-if="state.eventData">
                <img :src="state.eventData[0].profileImageUrl" >
            </div>
        </div>
        <div class="list-controller"  >
            <div class="col-6 mt-1 mb-2 px-1 px-md-2" v-for="item in state.list" :key="item">
                <ProductItem  :product="item"  />
                <loading v-if="state.loading"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import { theEventPageScreen } from "./theEventPageState"
import { ScrollController } from '@/core/service/scroll.service';
import ProductItem from './theEventProductItemsScreen.vue'
export default {
    components:{
        ProductItem
    },
    setup () {
        const state = ref(new theEventPageScreen());
        let scrollCtrl = new ScrollController(onScroll);
        function onScroll() {
            state.value.getProducts();
        }
        onMounted(()=>{
            state.value.getEvent();
            scrollCtrl.startListen();
        })
        return {state}
    }
}
</script>

<style lang="scss" >
.banner-controller {
    position: relative;
    display: flex;
    width: 100%;
    .head-banner {
        display: flex;
        width: 100%;
        position: fixed;
        left: 0%;
        justify-content: center;
        top: 0;
        z-index: 10;
        img {
            width: 100%;
            max-width: 512px;
            height: 90px;
            border-bottom-left-radius: 20px;
            border-bottom-right-radius: 20px;
        }
    }
}

.list-controller {
    display: flex;
    flex-wrap: wrap;
    margin-top: 90px;
    padding: 10px;
}
</style>