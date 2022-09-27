<template>
	<div>
		<div class="main-controller">
			<div class="header">
				<swiper :direction="'horizontal'" :free-mode="false" :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
						:slides-per-view="'auto'" :space-between="0" class="slider">
					<swiper-slide v-for="item in state.swiperList" :key="item" class="pt-2 d-flex w-100 px-1">
						<Button :label="item.label" class="p-button-rounded" :class="item.value == state.statusKey ? 'active':null" @click="state.changeTab(item.value)"/>
					</swiper-slide>
				</swiper>
			</div>
			<ListItem :list="state.list" :loading="state.loading" />
		</div>
	</div>
</template>

<script lang="ts">
import {ref , onMounted, onBeforeUnmount} from 'vue';
import {sendingSellCartsPageState} from './sendingSellCartsPageState'
import { ScrollController } from '@/core/service/scroll.service';
import ListItem from '@/app/unit/shared/items/factorSellCartListItem/factorSellCartListItemScreen.vue'
export default {
	components:{
		ListItem
	},
	setup () {
		const state = ref(new sendingSellCartsPageState())
		let scrollCtrl = new ScrollController(onScroll);

		function onScroll() {
			if (!state.value.loading && !state.value.endList) {
				state.value.getData();
			}
		}

		onMounted(() => {
			scrollCtrl.startListen();
			state.value.getData();
		})

		onBeforeUnmount(() => {
			scrollCtrl.removeListen();
		});
		
		return {state}
	}
}
</script>

<style lang="scss" scoped>
.swiper-slide {
	width: auto !important;
	padding-bottom: 8px;
}
.main-controller {
	display: flex;
	flex-direction: column;
	padding: 10px;
	.header {
		
		button {
			background: #fff;
			box-shadow: 0 0 3px #b5b5b5 !important;
			font-size: 14px;
			border: none;
			margin: 0 5px;
			&.active {
				background: #eee;
			}
		}
	}

}
</style>