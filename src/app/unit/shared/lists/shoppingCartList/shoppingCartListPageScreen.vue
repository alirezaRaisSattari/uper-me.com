<template>
    <div class="has-fixed-footer">
        <div class="activity-controller">
            <ActivityLevel/>
        </div>

        <Header :title="$t('productLists')" />
        <div class="category-controller" v-if="state.listCustom.length > 0 && state.list.length > 0">
            <div class="controller">
                <Dropdown v-model="state.selectedCategory" :options="state.categories" optionLabel="name" optionValue="value"/>
            </div>
        </div>
        <div class="list-controller" v-if="state.selectedCategory == 1">
            <item  v-for="data in state.list" :productType="state.mainData.productType" @changeItems="(data) => state.changeItems(data)" 
                   :key="data" :currencyId="state.mainData.currencyId ?? 1" :data="data" @deleteActivityLevelCode="(data)=> state.deleteActivityLevelCode(data.code ,data.fPrice)"  @pushActivityLevelCode="(data) => state.pushActivityLevelCode(data.code,data.fPrice)" />
        </div>
        <div class="list-controller" v-else>
            <CustomItem :mainData="state.mainData" v-for="data in state.listCustom" :key="data" :data="data"  />
        </div>
        <div class="footer-controller">
             <Button @click="goToSend()" :label="$t('continueTheProcess')" class="p-button-rounded" />
             <span>{{$t('totalPrice')}} <span class="text-danger">{{$filters.currency(state.totalPrice , state.mainData && state.mainData.currencyId == 0)}}</span> <currency v-if="state.mainData" :currencyId="state.mainData.currencyId"></currency></span>
        </div>
    </div>
</template>

<script lang="ts">
import Header from '@/app/unit/shared/headerApp/headerAppScreen.vue';
import Item from './itemShoppingCartListScreen.vue';
import CustomItem from './customItemShoppingCartScreen.vue';
import {ref , onMounted} from 'vue';
import {ShoppingCartListState} from './shoppingCartListPageState';
import Dropdown from 'primevue/dropdown';
import currency from "@/app/public/shared/currency/Currency.vue";
import router from '@/core/router/router';
import ActivityLevel from '@/app/unit/shared/icons/activityLevel/activityLevelScreen.vue'

export default {
    components:{
        Header,
        Item,
        Dropdown,
        CustomItem,
        currency,
        ActivityLevel
    },
    setup () {
        const state = ref(new ShoppingCartListState());
        onMounted(()=>{
            state.value.getList();
        })

        const goToSend = () => {
            if (!(state.value.mainData.productType == 2 || state.value.mainData.productType == 12 )) {
                router.push(`/howToSend`);
            } else router.push('/shoppingCartChoseAddress')
        }

        return {
            state,
            goToSend
        }
    }
}
</script>

<style lang="scss" scoped>
.category-controller {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    .controller {
        width: 60%;
    }
}

::v-deep(.p-dropdown) {
    box-shadow: none !important;
    border-radius: 10px;
}

.footer-controller {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  box-shadow: 0 -1px 5px #b5b5b5;
  background: #fadadd;
  padding: 24px 10px;
  position: fixed;
  bottom: 0;
  z-index: 99;
  align-items: center;
  width: 512px;
  font-size: 14px;
  border-radius: 40px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  @media (max-width: 512px) {
    width: 100%;
  }

  button {
    background: #f15968 !important;
    border-radius: 25px;
    box-shadow: none !important;
    border: none;
    padding: 8px 50px !important;
  }
}

.py-4 {
    padding: 0 !important;
}
</style>