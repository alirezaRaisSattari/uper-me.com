<template>
	<div>
		<div class="list-controller">
			<div class="item" v-for="item in list" :key="item">
				<div class="head" @click="(item.factorStaus !== 6 && item.factorStaus !== 5 && item.factorStaus !== 12) ? $function.goTo(`/factorDetailsReturnedHistory/${item.factorId}`) : null">
					<div class="controller">
						<div class="child w-auto">
							<img v-lazy="`${item.buyerProfileImageUrl}_sm.webp`" >
							<img class="creditLevel" v-if="item.buyerCreditLevel == 1 || item.buyerCreditLevel == 2" v-lazy="item.buyerCreditLevel == 1 ? require('@/assets/img/ic_crown_golden.svg') : item.buyerCreditLevel == 2 ? require('@/assets/img/ic_crown_grey.svg') : null">
						</div>
						<div class="child smart-text-align">
							<span>{{item.buyerName}}</span>
							<span>{{item.buyerUserName}}</span>
						</div>
					</div>
					<div class="controller">
						<div class="child align-items-end">
							<span>{{$filters.jalali(item.modifiedAt , true)}}</span>
							<span>{{`UF_${item.factorId}`}}</span>
							<span>{{`${$t('totalPrice')} : ${$filters.currency(item.finalPrice)}`}} <currency :currencyId="item.currencyId" /></span>
						</div>
					</div>
				</div>
				<div class="footer" @click="(item.factorStaus !== 6 && item.factorStaus !== 5 && item.factorStaus !== 12) ? $function.goTo(`/factorDetailsReturnedHistory/${item.factorId}`) :$function.goTo(`/customMadeProduct/${item.buyerPageId}`)">
					<div class="child">
						<div class="img-controller" v-for="image in item.itemsImages" :key="image" :style="{'background-image':`url(${image}_sm.webp)`}"></div>
					</div>
				</div>
				<div class="under-footer">
					<template v-if="item.returnFactorStatus !== 2" >
						<swiper :direction="'horizontal'" :free-mode="true" :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
								:slides-per-view="'auto'" :space-between="15"
								class="slider">
							<swiper-slide v-for="(label , index) in listReturnFactorStatus" :key="label" class="pt-2 mt-1 swiper-controller" style="cursor: pointer">
								<div class="item-return-Factor" :class="(index == 0 || index < item.returnFactorStatus - 1) ? 'active':null">
									<span>{{label}}</span>
								</div>
							</swiper-slide>
						</swiper>
					</template>
					<template v-else >
						<div class="canceled-by-operation">
							<span>{{$t('cancelByTheOperator')}}</span>
						</div>
					</template>
				</div>
			</div>
		</div>
		<loading v-if="loading"/>
		<template v-if="!loading && list.length == 0">
			<div class="emty-controller">
				<span>{{$t('noNewFactors')}}</span>
				<img class="img-emty" :src="require('@/assets/img/svg/emptyFactor.svg')" >
			</div>
		</template>
	</div>
</template>

<script lang="ts">
import currency from "@/app/public/shared/currency/Currency.vue";
import { i18n } from '@/main';
import { ref } from 'vue-demi';
export default {
	components:{
		currency
	},
	props:{
		list:Array,
		loading:Boolean
	},
	setup () {
		
	  const checkProduct = (key) => {
		switch (key) {
			case 1:
				return i18n.global.tc('sell');
			case 2:
				return i18n.global.tc('reserve');
			case 3:
				return i18n.global.tc('fare');
			case 4:
				return i18n.global.tc('service');
			case 12:
				return i18n.global.tc('virtualProduct');
			default:
				return i18n.global.tc('product');
		}
	  }

		const sellerTransferCheck = (key) => {
			switch (key) {
				case 1:
					return i18n.global.tc('hasNotDelivery');
				case 2:
					return i18n.global.tc('uperSend');
				case 3:
					return i18n.global.tc('inPlaceOfStore');
				case 4:
					return i18n.global.tc('sellerSend');
			}
		}


		const listReturnFactorStatus = ref([
			i18n.global.tc('checking'),
			i18n.global.tc('accepted'),
			i18n.global.tc('waitingForDelivery'),
			i18n.global.tc('deliveryAccepted'),
			i18n.global.tc('sending_1'),
			i18n.global.tc('delivered'),
		])

		return {
			sellerTransferCheck,
			checkProduct,
			listReturnFactorStatus
		}
	}
}
</script>

<style lang="scss" scoped>
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
				flex-direction: row;
				border-bottom: 1px solid #b5b5b5;
				padding-bottom: 8px;
				.controller {
					width: 50%;
					display: flex;
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
					width: 100%;
					
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
							background: #fda203;
							&::after {
								background: #fda203;
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

.active-route {
  border-radius: 0 !important;
  border-bottom: 2px solid #131313 !important;
}
</style>
