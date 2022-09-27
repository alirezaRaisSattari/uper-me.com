<template>
	<div>
		<Header :title="$t('sellCards')"/>
		 <swiper :direction="'horizontal'" :free-mode="true" :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
				:slides-per-view="'auto'" :space-between="15"
				class="slider">
		<swiper-slide v-for="item in tabs" :key="item" class="pt-2 mt-1" style="cursor: pointer">
			<router-link :to="item.path">
			<Button :class="item.path === route.path ? 'active-route':''" :label="item.label"
					class="p-button-text p-button-plain no-shadow"/>
			</router-link>
		</swiper-slide>
		</swiper>
		<router-view />
	</div>
</template>

<script lang="ts">
import Header from '@/app/unit/shared/headerApp/headerAppScreen.vue'
import { i18n } from '@/main';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
export default {
	components:{
		Header
	},
	setup () {
		const route = ref(useRoute());

		const tabs = ref([
			{label: i18n.global.tc('custom'), path: '/customMade'},
			{label: i18n.global.tc('new'), path: '/newSellCarts'},
			{label: i18n.global.tc('accepted'), path: '/acceptedSellCarts'},
			{label: i18n.global.tc('sending'), path: '/sendingSellCarts'},
			{label: i18n.global.tc('deliveredFactors'), path: '/deliveredFactorsSellCarts'},
			{label: i18n.global.tc('settlements'), path: '/settlementsSellCarts'},
			{label: i18n.global.tc('returnedHistory'), path: '/returnedHistorySellCarts'},
			{label: i18n.global.tc('canceledByYou'), path: '/canceledByYouSellCarts'},
			{label: i18n.global.tc('canceledByBuyer'), path: '/canceledByBuyerSellCarts'},
		]);
		return {tabs, route}
	}
}
</script>

<style lang="scss" scoped>
.swiper-container {
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
  list-style: none;
  padding-right: 0;
  /*width: 506px !important;*/
}

.swiper-slide {
  width: auto !important;
  padding: 3px !important;
}


button {
	opacity: .5;
	&.active-route {
		border-radius: 0 !important;
		opacity: 1;
		border-bottom: 2px solid #303030 !important;
	}
}

::v-deep(.p-button-label) {
	color:#303030;
}
</style>