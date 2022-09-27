<template>
	<div>
		<div class="main-controller">
		<div class="list-controller">
			<div class="item" v-for="item in state.list" :key="item">
				<div class="head" @click="(item.factorStaus !== 6 && item.factorStaus !== 5) ? $function.goTo(`/factorDetailsShoppingHistory/${item.factorId}?uId=${item.username}`) : null">
					<div class="controller">
						<div class="child w-auto">
							<img v-lazy="`${item.profileImageUrl}_sm.webp`" >
							<img class="creditLevel" v-if="item.creditLevel == 1 || item.creditLevel == 2" v-lazy="item.creditLevel == 1 ? require('@/assets/img/ic_crown_golden.svg') : item.creditLevel == 2 ? require('@/assets/img/ic_crown_grey.svg') : null">
						</div>
						<div class="child smart-text-align">
							<span>{{item.name}}</span>
							<span>{{item.username}}</span>
						</div>
					</div>
					<div class="controller">
						<div class="child align-items-end">
							<span>{{$filters.jalali(item.modifiedAt , true)}}</span>
							<span>{{`UF_${item.factorId}`}}</span>
						</div>
					</div>
					<div class="controller">
						<div class="child align-items-end">
							<span>{{`${$t('totalPrice')} : ${$filters.currency(item.finalPrice , item.currencyId == 0)}`}} <currency :currencyId="item.currencyId" /></span>
						</div>
					</div>
				</div>
				<div class="footer" @click="(item.factorStaus !== 6 && item.factorStaus !== 5 ) ? $function.goTo(`/factorDetailsShoppingHistory/${item.factorId}?uId=${item.username}`) : null">
					<div class="child">
						<div class="img-controller" v-for="image in item.imageUrls" :key="image" :style="{'background-image':`url(${image}_sm.webp)`}"></div>
					</div>
          <div class="child flex-column">
            <span>{{`${$t('shoppingType')} : ${state.checkProduct(item.productType)}`}}</span>
            <span>{{`${$t('sendType')} : ${state.sellerTransferCheck(item.sellerAddressType)}`}}</span>
          </div>
				</div>
				<div class="under-footer">
					<template v-if="item.factorStaus < 9 || item.factorStaus == 14" >
							<template v-if="item.productType == 2 || item.productType == 12" >
								<swiper :direction="'horizontal'" :free-mode="true" :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
										:slides-per-view="'auto'" :space-between="15"
										class="slider">
									<swiper-slide v-for="(label , index) in state.listReserve" :key="label" class="pt-2 mt-1 swiper-controller" style="cursor: pointer">
										<div class="item-return-Factor" :class="(index == 0 || index < item.factorStaus  - 1) ? 'active':null">
										<span>{{label}}</span>
										</div>
									</swiper-slide>
								</swiper>
							</template>
					<template v-else>
					<template v-if="item.sellerAddressType == 4  || item.sellerAddressType == 3">
							<swiper :direction="'horizontal'" :free-mode="true" :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
								:slides-per-view="'auto'" :space-between="15"
								class="slider">
								<template v-if="item.factorStaus == 14" >
								<swiper-slide v-for="(label , index) in state.listReturnFactorStatus" :key="label" class="pt-2 mt-1 swiper-controller" style="cursor: pointer">
									<div class="item-return-Factor" :class="(index == 0 || index < 4) ? 'active':null">
									<span>{{label}}</span>
									</div>
								</swiper-slide>
								</template>
								<template v-else >
								<swiper-slide v-for="(label , index) in state.listReturnFactorStatus" :key="label" class="pt-2 mt-1 swiper-controller" style="cursor: pointer">
									<div class="item-return-Factor" :class="(index == 0 || index < item.factorStaus - 1) ? 'active':null">
									<span>{{label}}</span>
									</div>
								</swiper-slide>
								</template>
							</swiper>
						</template>
						<template v-if="item.sellerAddressType == 2 || item.sellerAddressType == 1">
							<swiper :direction="'horizontal'" :free-mode="true" :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
								:slides-per-view="'auto'" :space-between="15"
								class="slider">
								<template v-if="item.factorStaus == 14" >

									<swiper-slide v-for="(label , index) in state.listSendByUper" :key="label" class="pt-2 mt-1 swiper-controller" style="cursor: pointer">
										<div class="item-return-Factor" :class="(index == 0 || index < 3) ? 'active':null">
										<span>{{label}}</span>
										</div>
									</swiper-slide>

								</template>
								<template v-else >
								
									<swiper-slide v-for="(label , index) in state.listSendByUper" :key="label" class="pt-2 mt-1 swiper-controller" style="cursor: pointer">
									<div class="item-return-Factor" :class="(index == 0 || index <= (item.factorStaus - 2)) ? 'active':null">
										<span>{{label}}</span>
									</div>
									</swiper-slide>

								</template>
							</swiper>
						</template>
						</template>
					</template>
					<template v-else >
						<div class="canceled-by-operation">
							<span>{{state.checkReturnedStatus(item.factorStaus)}}</span>
						</div>
					</template>
				</div>
			</div>
		</div>
		<loading v-if="loading"/>
		<template v-if="!loading && state.list.length == 0">
			<div class="emty-controller">
				<span>{{$t('noNewFactors')}}</span>
				<img class="img-emty" :src="require('@/assets/img/svg/emptyFactor.svg')" >
			</div>
		</template>
		</div>
	</div>
</template>

<script lang="ts">
import {ref , onMounted, onBeforeUnmount} from 'vue';
import {shoppingHistoryPageState} from './shoppingHistoryPageState'
import { ScrollController } from '@/core/service/scroll.service';
import currency from "@/app/public/shared/currency/Currency.vue";

export default {
	components:{
		currency
	},
	setup () {
		const state = ref(new shoppingHistoryPageState())
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

	.list-controller {
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
				flex-wrap: wrap;
				border-bottom: 1px solid #b5b5b5;
				padding-bottom: 8px;
				.controller {
					width: 50%;
					display: flex;
					&:last-child {
			            width: 100%;
					}
					.child {
						display: flex;
						flex-direction: column;
						padding: 0 5px;
						width: 100%;
						
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
								width: 100%;
							}
						}
						span {
							color:#303030;
							font-size: 14px;
						}
					}
				}
			}
			.footer {
				display: flex;
				flex-direction: row-reverse;
				justify-content: space-between;
				padding: 8px 0 0;
				.child {
					display: flex;
					flex-direction: row;
					overflow: hidden;
					width: 40%;
					&:last-child {
            width: 60%;
          }
					.img-controller {
						background-size: cover;
						background-position: center;
						background-repeat: no-repeat;
						overflow: hidden;
						width: 30px;
						height: 30px;
						border-radius: 5px;
						margin: 5px;
						cursor: pointer;
						justify-content: flex-end;
					}
					
					span {
						font-size: 14px;
						color:#303030;
					}
				}
			}
			.under-footer {
				display: flex;
				flex-direction: row;
				width: 100%;
				justify-content: flex-end;
        		margin-top: 10px;

				.swiper-controller {

					.item-return-Factor {
						background: #c9c9c9;
						padding: 5px;
						font-size: 14px;
						color:#fafafa;
						border-radius: 30px;
						position: relative;
						margin-left: 15px !important;
						
						&::after {
							content: "";
							width: 30px;
							height: 5px;
							display: block;
							left: -30px;
							position: absolute;
							top: 15px;
							background: #c9c9c9;
						}
						
						&.active {
							color:#fafafa;
							background: #ef5c67;
							&::after {
								background: #ef5c67;
							}
						}
						
					}
					&:last-child {
						.item-return-Factor { 
							margin-left: 0 !important;
							&::after {
								display: none;
							}
						}
					}

				}
				.canceled-by-operation {
					background: #ef5c67;
					color: #fafafa;
					padding: 10px;
					font-size: 14px;
					border-bottom-left-radius: 10px;
					position: relative;
					top: 10px;
					left: -10px;
					z-index: 10;
				}
			}

		}
	}

.emty-controller {
	.img-emty {
		width: 120px;
		height: 120px;
	}
	span {
		font-size: 14px;
		margin-bottom: 10px;
	}
	display: flex;
	justify-content: center;
	flex-direction:column;
	align-items: center;
	height: 200px;
}

.swiper-container {
  margin-left: auto !important;
  margin-right: 0 !important;
  overflow: hidden;
  list-style: none;
  padding-right: 0;
  /*width: 506px !important;*/
}

.swiper-slide {
  width: auto !important;
  padding: 3px !important;
}

.active-route {
  border-radius: 0 !important;
  border-bottom: 2px solid #131313 !important;
}
</style>