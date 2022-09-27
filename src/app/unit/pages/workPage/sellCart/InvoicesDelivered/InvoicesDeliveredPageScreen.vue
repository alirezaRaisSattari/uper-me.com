<template>
	<div>
		<div class="main-controller">
			<ListItem :list="state.list" :loading="state.loading" />
		</div>
	</div>
</template>

<script lang="ts">
import {ref , onMounted, onBeforeUnmount} from 'vue';
import {InvoicesDeliveredState} from './InvoicesDeliveredPageState'
import { ScrollController } from '@/core/service/scroll.service';
import ListItem from '@/app/unit/shared/items/factorSellCartListItem/factorSellCartListItemScreen.vue'
export default {
	components:{
		ListItem
	},
	setup () {
		const state = ref(new InvoicesDeliveredState())
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