<template>
	<div class="pb-5">
		<Header :title="$t('factorDetails')"/>
		<div v-if=" state.retrunedData !== null">
				<div class="d-flex flex-column ">
				<div class="controller"  v-for="(item) in state.dataList" :key="item">
					<template v-if="item.value">
						<span class="smart-text-align">{{item.label}} :</span>
						<span>{{ item.currency != null ? $filters.currency(item.value) : item.value}}</span>
						<Currency v-if="item.currency != null" :currencyId="item.currency" class="mx-1"/>
					</template>
				</div>
			</div>
			<div class="list-contoller">
				<div class="controller w-100 mt-2" v-for="item in state.retrunedData.items" :key="item">
					<div class="child">
						<img v-lazy="item.mainImageUrl+'_sm.webp'" >
					</div>
					<div class="text-controller">
						<div class="child">
							<p>{{item.name}}</p>
						</div>
						<div class="child">
							<div class="off" v-if="item.offPercent > 0 ">
								<span>{{item.currencyId == 0 ? $filters.currency(item.uperPrice) : $filters.currency(item.defaultPrice)}}
								</span>
								<span>{{item.offPercent}} %</span>
							</div>
							<div class="d-flex flex-row" v-else>
								<span>{{$t('cost')}} : </span>
								<span>{{item.currencyId == 0 ? $filters.currency(item.uperPrice) : $filters.currency(item.defaultPrice)}}</span>
								<Currency :currencyId="item.currencyId" class="mx-1"/>
							</div>
						</div>
						<div class="child" v-if="item.offPercent > 0 ">
							<span>{{`${$t('price')} :`}} {{ item.currencyId == 0 ? $filters.currency(item.uperPrice ?? 0) - (((item.uperPrice ?? 0) / 100) * (item.offPercent ?? 0))  :  ($filters.currency((item.defaultPrice ?? 0) - (((item.defaultPrice ?? 0) / 100) * (item.offPercent ?? 0))))}}</span>
						</div>
						<div class="child" v-if="item.number">
							<span>{{ `${$t('count')} ${$t('returned')}`}} : </span>
							<span>{{item.number}}</span>
						</div>
						<div class="child" v-if="item.factorNumbers">
							<span>{{`${$t('numberPurchased')} : ${item.factorNumbers}`}}</span>
						</div>
						<div class="child" v-if="item.number && item.factorNumbers">
							<span>{{$t('returnedAllCost')}} : </span>
							<span>{{item.currencyId == 0 ? $filters.currency(item.uperPrice * item.number ?? 0) - (((item.uperPrice * item.number ?? 0) / 100) * (item.offPercent ?? 0))  :  ($filters.currency((item.defaultPrice * item.number) - (((item.defaultPrice * item.number) / 100) * (item.offPercent ?? 0)))) 
							}}
								<Currency :currencyId="item.currencyId " class="mx-1"/>
							</span>
							<span v-if="item.hashToken == 'expired'">
							<span class="red">{{$t('expired')}}</span>
							</span>
							<span v-else-if="item.hashToken">
								<Button  @click="state.qrShowDialog = true" icon="fas fa-qrcode" class="p-button-rounded p-button-text p-button-plain no-shadow" />
								<qrGenrator :showDialog="state.qrShowDialog" :value="state.retrunedData.details.hashToken" @onClose="(event) => state.qrShowDialog = false" />
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-else>
			<loading v-if="state.loading" class="mt-5"/>
		</div>
	</div>
</template>

<script lang="ts">
import Header from '@/app/unit/shared/headerApp/headerAppScreen.vue'
import {ref , onMounted} from 'vue'
import {factorDetailsPageState} from './factorDetailsReturnedHistoryState'
import Currency from "@/app/public/shared/currency/Currency.vue";
import FactorDetailsMidlleItem from '@/app/unit/shared/items/factorDetailsMidlleItem/factorDetailsMidlleItemScreen.vue';
import FactorDetailsFooter from '@/app/unit/shared/items/factorDetailsForterSellCart/factorDetailsForterSellCartScreen.vue';
import qrGenrator from '@/app/unit/shared/qr/qrGenratorScreen.vue';

export default {
	components:{
		Header,
		Currency,
		FactorDetailsMidlleItem,
		FactorDetailsFooter,
		qrGenrator
	},
	setup () {
		const state = ref(new factorDetailsPageState());
		const preparationShow = ref(false)
		onMounted(() => {
			state.value.getData()
		})
		
		return {
			state,
			preparationShow
		}
	}
}
</script>

<style lang="scss" scoped>
.img-controller {
	display: flex;
	width: 100%;
	justify-content: center;
	img {
		width: 150px;
		height: 150px;
		border-radius: 8px;
		margin-top: 10px;
	}
}
.controller { 
	display: flex;
	flex-direction: row;
	padding: 8px 10px 0;
	position: relative;
	&:first-child {
		width: 85%;
	}
	
	span {
		color:#686868;
		font-size: 14px;
		display: flex;
		white-space: nowrap !important;
		align-items: center;
		&:nth-child(1) {
			padding: 0 5px;
		}
	}
	p {
		overflow: hidden;
		text-overflow: ellipsis;
		max-height: 50px;
		margin: 0 0 5px;
		font-size: 14px;
		padding: 0 8px;
		text-align: center;
	}
}

.transferee {
	padding: 10px;
	border: none;
	.controller {
		display: flex;
		flex-direction: column;
		border-radius: 8px;
		border: 2px solid #258F25;
		padding: 5px;
		.header {
			display: flex;
			flex-direction: row;
			padding-bottom: 5px;
			border-bottom: 2px solid #258F25;
			.child {
				display: flex;
				flex-direction: row;
				font-size: 14px;
				span {
						color:#686868;
						font-size: 14px;
						overflow: hidden;
						text-overflow: ellipsis;
						display: flex;
						white-space: nowrap !important;
						align-items: center;
						&:nth-child(1) {
							padding: 0 5px;
						}
				}
			}
		}

		.body {
			display: flex;
			flex-direction: column;
			padding: 5px 0;
      		align-items: flex-start !important;
			.child {
				display: flex;
				flex-direction: row;
				font-size: 14px;
				align-items: center;
				justify-items: center;
				padding: 5px 0;
				img {
					width: 45px;
					height: 45px;
					border-radius: 50%;
				}
				span {
					color:#696969;
					&.green {
						color:#258F25;
					}
					&:last-child {
						color:#212121;
					}
					&.phone {
						border-radius: 10px;
						color:#686868;
						border: 2px solid #686868;
						display: flex;
						padding: 5px;
						margin: 0 10px;
						cursor: pointer;
					}
				}

			}
		}
	}
}

.list-contoller {
	display: flex;
	flex-direction: column;
	padding: 5px 10px;
	margin-bottom: 40px;
	.controller {
		span {
			overflow: hidden;
			text-overflow: ellipsis;
			width: auto;
		}
		display: flex;
		flex-direction: row;
		background: #fff;
		border-radius: 8px;
		box-shadow: 0 0 3px #b5b5b5;
		margin-bottom: 8px;
		position: relative;
		padding:10px 0;
		cursor: pointer;
		margin-top: 30px;
		transition: .6s;
		.header {
			display: flex;
			position: absolute;
			top: -30px;
			justify-content: center;
			width: 100%;
				span {
				position: relative;
				z-index: 99;
				top: 4px;
				color: #fff;
				direction: rtl;
			}
		img {
			position: absolute;
			top: 0;
			width: 100%;
			height: 30px;
			}
	}
		&:hover {
			opacity: 0.9;
		}
		.text-controller {
			 display: flex;
			 flex-direction: column;
			 justify-content: space-between;
			 .child {
				 &.name {
					display: block;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap !important;
					width: 100%;
					max-width: 240px;
					span {
						display: block;
						width: 100%;
						
					}
				 }
			 }
			
		}
		.child {
			display: flex;
			flex-direction: row;
			font-size: 14px;
			.off {
				display: flex;
				flex-direction: row;
				span {
					display: flex;
					flex-direction: row;
					width: auto;
					&:first-child {
						text-decoration-line: line-through; 
					}
					&:last-child {
						background: rgb(196, 48, 48);
						padding: 1px 10px;
						color:#fff;
						border-radius: 8px;
						margin: 0 5px;
					}
				}
			}
			img {
				width: 90px;
				height: 90px;
				border-radius: 8px;
				margin: 0 10px;
			}
		}
	}
}
.red {
	color: red;
}

.main-accspted-controller {
	padding: 10px;
	display: flex;
	flex-direction: row;
	.accspted-controller {
				display: flex;
				flex-direction: row;
				flex:40%;
				background: #3992cc;
				border-radius: 10px;
				max-width: 50%;
				min-height: 100%;
				&.active {
					flex:auto !important;
					width: 42px;
				}
				.child {
					img {
						width: 40px;
						height: 40px;
						border-radius: 50%;
					}
					display: flex;
					flex-direction: column;
					font-size: 14px;
					color: #fff;
					justify-content: space-between;
					padding: 5px;
						&:first-child {
							width: 40px;
							display: flex;
							align-items: center;
								span {
										ms-transform: rotate(90deg); /* IE 9 */
										transform: rotate(90deg);
										width: 70px;
										position: relative;
										top: 30px;
								}
							}
				}
			}

			.text-accspted {
				display: flex;
				justify-content: flex-start;
				span {
					ms-transform: rotate(90deg); /* IE 9 */
					transform: rotate(90deg);
					position: relative;
					right: 20px;
				}
			}
}

.cancel-controller {
	display: flex;
	flex-direction: column;
	padding: 0 10px 40px;
	position: relative;
	top: -30px;
	.btn-canceledByYou-controller {
		display: flex;
		justify-content: center;
		button {
			font-size: 14px;
			background: #f45868 !important;
			border-color: #f45868 !important;
		}
	}
	.details-of-cancel {
		border: 1px solid #c9c9c9;
		border-radius: 3px;
		padding: 5px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-top: 10px;
		.controller {
			display: flex;
			flex-direction: column;
			&:last-child {
				font-size: 25px;
				justify-content: center;
			}
			.child {
				display: flex;
				flex-direction: row;
				align-content: center;
				justify-content: flex-start;
				font-size: 14px;
				&.warning {
					color: #f7971a;
					i {
						position: relative;
						top: 3px;
						font-size: 20px;
					}
				}

			}
		}
	}
}

</style>
