<template>
	<div>
		 <Dialog v-model:visible="state.verbal.dialog" :breakpoints="{'500px': '100vw' ,'960px': '75vw', '5000px':'512px'}"
          :contentStyle="{background: 'rgb(255, 255, 255)',height:'190px',borderRadius: '8px','-ms-overflow-style':'none', 'scrollbar-width':'none'}"
          :dismissableMask="true" :position="'bottom'"
          :showHeader="false" :style="{ margin: '0', border: 'none' }" modal>
		  	<div class="item-dialog has-fixed-footer" v-if="state.verbal.data">
				<div class="head">
					<div class="child">
						<img v-lazy="`${state.verbal.data.profileImageUrl}_sm.webp`" >
						<img class="creditLevel" v-if="state.verbal.data.creditLevel == 1 || state.verbal.data.creditLevel == 2" v-lazy="state.verbal.data.creditLevel == 1 ? require('@/assets/img/ic_crown_golden.svg') : state.verbal.data.creditLevel == 2 ? require('@/assets/img/ic_crown_grey.svg') : null">
					</div>
					<div class="child smart-text-align w-100">
						<div class="controller">
							<div class="child">
								<span>{{state.verbal.data.name}}</span>
								<span>{{state.verbal.data.username}}</span>
							</div>
							<div class="child reverse-smart-text-align">
								<span>{{$filters.jalali(state.verbal.data.modifiedAt)}}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="footer">
					<div class="child">
						<span>{{$t('status')}} </span>
						<span>: {{state.checkStatus(state.verbal.data.specialFactorStatus)}}</span>
					</div>
					<div class="child">
						<span>{{$t('cost')}} </span>
						<span>: {{state.verbal.data.price}}</span>
						<currency class="mx-2" :currencyId="state.verbal.data.currencyId"></currency>
					</div>
				</div>
				<div class="description-controller">
					<span>{{$t('description')}} : {{state.verbal.data.description}}</span>
				</div>
			</div>
			<Footer>
					<Button :label="$t('accept')" class="p-button-rounded p-button-danger" @click="state.confirm(true)" />
					<Button :label="$t('cancel')" class="p-button-rounded p-button-danger" @click="state.confirm(false)" />
			</Footer>
		 </Dialog>
		<div class="main-list-controller has-fixed-footer">
			<div class="head-controller">
				<div class="child">
					<Dropdown v-model="state.selectedDropDown" :options="state.dropDownList" :placeholder="$t('virtualCustom')" optionLabel="label" optionValue="value"  @change="state.getData(state.selectedDropDown)"/>
				</div>
			</div>
			<div class="body-controller">
				<template v-if="state.selectedDropDown == 1">
					<div class="item" v-for="item in state.list" :key="item" >
						<div class="head" @click="$function.goTo(`/page/${item.pageUtils.username}`)">
							<div class="child">
								<img v-lazy="`${item.pageUtils.profileImageUrl}_sm.webp`" >
								<img class="creditLevel" v-if="item.pageUtils.creditLevel == 1 || item.pageUtils.creditLevel == 2" v-lazy="item.pageUtils.creditLevel == 1 ? require('@/assets/img/ic_crown_golden.svg') : item.pageUtils.creditLevel == 2 ? require('@/assets/img/ic_crown_grey.svg') : null">
							</div>
							<div class="child smart-text-align">
								<span>{{item.pageUtils.name}}</span>
								<span>{{item.pageUtils.username}}</span>
							</div>
						</div>
						<div class="footer" @click="$function.goTo(`/customMadeProduct/${item.buyerPageId}`)">
							<div class="child">
								<Button icon="pi pi-chevron-left" class="p-button-rounded p-button-text p-button-plain no-shadow" />
							</div>
							<div class="child">
								<div class="img-controller" v-for="image in item.images" :key="image" :style="{'background-image':`url(${image.mainImageUrl}_sm.webp)`}"></div>
							</div>
						</div>
					</div>
					<loading v-if="state.loading"/>
				</template>
				<template v-if="state.selectedDropDown === 2">
					<div class="item" v-for="item in state.listFactorGetForSeller" :key="item" @click="item.specialFactorStatus == 1 ? state.initDialog(item) : null">
						<div class="head">
							<div class="child">
								<img v-lazy="`${item.profileImageUrl}_sm.webp`" >
								<img class="creditLevel" v-if="item.creditLevel == 1 || item.creditLevel == 2" v-lazy="item.creditLevel == 1 ? require('@/assets/img/ic_crown_golden.svg') : item.creditLevel == 2 ? require('@/assets/img/ic_crown_grey.svg') : null">
							</div>
							<div class="child smart-text-align w-100">
								<div class="controller">
									<div class="child">
										<span>{{item.name}}</span>
										<span>{{item.username}}</span>
									</div>
									<div class="child reverse-smart-text-align">
										<span>{{$filters.jalali(item.modifiedAt)}}</span>
									</div>
								</div>
							</div>
						</div>
						<div class="footer">
							<div class="child">
								<span>{{$t('status')}} </span>
								<span>: {{state.checkStatus(item.specialFactorStatus)}}</span>
							</div>
							<div class="child">
								<span>{{$t('cost')}} </span>
								<span>: {{$filters.currency(item.price , item.currencyId == 0)}}</span>
								<currency class="mx-2" :currencyId="item.currencyId"></currency>
							</div>
						</div>
						<div class="description-controller">
							<span>{{$t('description')}} : {{item.description}}</span>
						</div>
					</div>
					<loading v-if="state.loading"/>
				</template>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Dropdown from 'primevue/dropdown';
import { ref,onMounted , onBeforeUnmount} from "vue";
import {customMadePageState} from './customMadePageState'
import currency from "@/app/public/shared/currency/Currency.vue";
import Footer from "@/app/unit/shared/footerApp/fixedFooterScreen.vue"
import {ScrollController} from '@/core/service/scroll.service';
export default {
	components : {
		Dropdown,
		currency,
		Footer
	},
	setup () {
		
		const state = ref(new customMadePageState());		
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
			@media (max-width:376px) {
				width: 75%;
			}
		}
	}
	.body-controller {
		display: flex;
		flex-direction: column;
		padding: 5px 10px 10px;
	}
}
		.item , .item-dialog {
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
				.child {
					display: flex;
					flex-direction: column;
					padding: 0 5px;
					&:last-child{
						
						width: calc(100% - 55px) !important;
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
						width: 100%;
						.child {
							display: flex;
							flex-direction: column;
							max-width: 50%;
							overflow: hidden;
						}
					}
					span {
						color:#303030;
						font-size: 14px;
						display: block;
						overflow: hidden;
						text-overflow: ellipsis !important;
						white-space: nowrap !important;
						
					}
				}
			}
			.footer {
				display: flex;
				flex-direction: row-reverse;
				justify-content: space-between;
				font-size: 14px;
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
						font-size: 13px;
						&:nth-child(2){
							color:#303030;
						}
					}
				}

			}
				.description-controller {
					overflow: hidden;
					text-overflow: ellipsis;
					width: 100%;
					display: block;
    				white-space: nowrap !important;
					font-size: 14px;
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


.footer-controller {
	display: flex;
	flex-direction: row;
	justify-content: space-between;

}
</style>