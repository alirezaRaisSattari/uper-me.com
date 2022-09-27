<template>
	<div>
		<div class="main-list-controller has-fixed-footer">
			<div class="head-controller">
				<div class="child">
					<Dropdown v-model="state.selectedDropDown" :options="state.dropDownList" :placeholder="$t('virtualCustom')" optionLabel="label" optionValue="value"  @change="state.getData(state.selectedDropDown)"/>
				</div>
			</div>
			<div class="body-controller">
				<template v-if="state.selectedDropDown === 1">
					<div class="item" v-for="item in state.list" :key="item" >
						<div class="head" @click="$function.goTo(`/page/${item.pageUtils.username}`)">
            				<div class="controller">
							<div class="child">
								<img v-lazy="`${item.pageUtils.profileImageUrl}_sm.webp`" >
								<img class="creditLevel" v-if="item.pageUtils.creditLevel === 1 || item.pageUtils.creditLevel === 2" v-lazy="item.pageUtils.creditLevel === 1 ? require('@/assets/img/ic_crown_golden.svg') : item.pageUtils.creditLevel === 2 ? require('@/assets/img/ic_crown_grey.svg') : null">
							</div>
							<div class="child smart-text-align">
								<span>{{item.pageUtils.name}}</span>
								<span>{{item.pageUtils.username}}</span>
							</div>
						</div>
						<div class="controller">
							<div class="child star-controller">
								<i class="pi pi-star"></i>
								<span>{{item.scoreItem.average}}</span>
							</div>
						</div>
						</div>
						<div class="footer flex-reverse-row" @click="$function.goTo(`/customMadeShopCard/${item.workPageId}`)">
							<div class="child">
								<div class="img-controller" v-for="image in item.images" :key="image" :style="{'background-image':`url(${image.mainImageUrl}_sm.webp)`}"></div>
							</div>
							<div class="child">
								<Button icon="pi pi-chevron-left" class="p-button-rounded p-button-text p-button-plain no-shadow" />
							</div>
						</div>
					</div>
					<loading v-if="state.loading"/>
					<empty-box-screen v-if="!state.loading && state.list.length == 0" :title="$t('noProducts')" />
				</template>
				<template v-if="state.selectedDropDown === 2">
					<div class="item" v-for="item in state.listFactorGetForSeller" :key="item">
						<div class="head">
							<div class="child">
								<img v-lazy="`${item.profileImageUrl}_sm.webp`" >
								<img class="creditLevel" v-if="item.creditLevel === 1 || item.creditLevel === 2" v-lazy="item.creditLevel === 1 ? require('@/assets/img/ic_crown_golden.svg') : item.creditLevel === 2 ? require('@/assets/img/ic_crown_grey.svg') : null">
							</div>
							<div class="child smart-text-align w-100">
								<div class="controller">
									<div class="child">
										<span>{{item.name}}</span>
										<span>{{item.username}}</span>
									</div>
									<div class="child">
										<span>{{$filters.jalali(item.modifiedAt)}}</span>
									</div>
								</div>
							</div>
						</div>
						<div class="footer ">
            	<div class="child w-100 mt-2">
								<span>{{$t('description')}} </span>
								<span>: {{item.description}}</span>
							</div>
							<div class="child">
								<span>{{$t('status')}} </span>
								<span>: {{state.checkStatus(item.specialFactorStatus)}}</span>
							</div>
							<div class="child">
								<span>{{$t('cost')}} </span>
								<span>: {{$filters.currency(item.price)}}</span>
								<currency class="mx-2" :currencyId="item.currencyId"></currency>
							</div>
						
						</div>
					</div>
					<loading v-if="state.loading"/>
					<empty-box-screen v-if="!state.loading && !state.listFactorGetForSeller" :title="$t('noProducts')" />
				</template>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Dropdown from 'primevue/dropdown';
import { ref,onMounted , onBeforeUnmount} from "vue";
import {customShoppingPageState} from './customShoppingPageState'
import currency from "@/app/public/shared/currency/Currency.vue";
import {ScrollController} from '@/core/service/scroll.service';
import EmptyBoxScreen from '@/app/unit/shared/icons/emptyBoxScreen.vue';
export default {
	components : {
		Dropdown,
		currency,
		EmptyBoxScreen
	},
	setup () {
		
		const state = ref(new customShoppingPageState());		
    	let scrollCtrl = new ScrollController(onScroll);
		
		function onScroll() {
			if (!state.value.loading && !state.value.endList) {
				state.value.getData(state.value.selectedDropDown)
			}
		}
	
		onMounted(() => {
			state.value.getData(state.value.selectedDropDown)
			scrollCtrl.startListen();

		})

		onBeforeUnmount(() => {
			scrollCtrl.removeListen();
		});

		return {state}
	}
}
</script>

<style lang="scss" scoped>
.main-list-controller {
	display: flex;
	flex-direction: column;
	padding: 10px;
	.head-controller {
		display: flex;
		justify-content: center;
		width: 100%;
		padding: 0 10px 5px;
		.child {
			width: 50%;
		}
	}
	.body-controller {
		display: flex;
		flex-direction: column;
		padding: 5px 10px 10px;
		.item {
			display: flex;
			flex-direction: column;
			padding: 8px;
			background: #fff;
			margin-bottom: 8px;
			box-shadow: 0 0 5px #b5b5b5;
			border-radius: 8px;
			cursor: pointer;
			.head {
				display: flex;
				flex-direction: row;
				border-bottom: 1px solid #b5b5b5;
				padding-bottom: 8px;
        justify-content: space-between;
        .controller {
          display: flex;
          flex-direction: row;
        }
				.child {
					display: flex;
					flex-direction: column;
					padding: 0 5px;
          &.star-controller {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            i {
              color:#ff9900;
              margin: 0 10px;
            }
          }
					img {
						width: 45PX;
						height: 45PX;
						border-radius: 50%;
						border: 1px solid #686868;
						&.creditLevel {
							position: absolute;
							width: 20px;
							height: 20px;
							margin-top: 30px;
							margin-right: 25px;
							background-color: #fff;
						}
					}
					.controller {
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						.child {
							display: flex;
							flex-direction: column;
						}
					}
					span {
						color:#303030;
						font-size: 14px;
					}
				}
			}
			.footer {
				display: flex;
        flex-wrap: wrap-reverse;
				justify-content: space-between;
				padding: 8px 0 0;
				.child {
					display: flex;
					flex-direction: row;
					overflow: hidden;
					.img-controller {
						background-size: cover;
						background-position: center;
						background-repeat: no-repeat;
						width: 30px;
						height: 30px;
						border-radius: 5px;
						margin: 5px;
						cursor: pointer;
					}
					span {
						color:#686868;
            overflow: hidden;
            text-overflow: ellipsis;
						font-size: 14px;
						&:nth-child(2){
							color:#303030;
						}
					}
				}
			}

		}
	}
}

::v-deep(.p-button-icon) {
	color:#7d7d7d;
}

::v-deep(.p-dropdown-item) {
		font-size: 14px;
}
::v-deep(.p-dropdown-panel .p-dropdown-items .p-dropdown-item.p-highlight) {
		background: #7D7D7D7A !important;
}
::v-deep(.p-dropdown) {
	box-shadow: none !important;
	border-radius: 40px;
	border: 1px solid #7d7d7d !important;
	.p-dropdown-label , .p-dropdown-item {
		font-size: 14px;
	}

}



</style>
