<template>
	<div class="pb-5">
		<Dialog :showHeader="false" v-model:visible="state.showDialog" :contentStyle="{'border-radius':'10px'}" :style="{width: '95%','max-width':'512px' }" modal>
			<div class="details-input">
				<InputText type="text" v-model="state.postDataDelete.description" :placeholder="$t('description')" />
				<Button :label="$t('submit')"  @click="state.cancelAccsept()" autofocus />
			</div>
    	</Dialog>

		<Dialog :showHeader="false" v-model:visible="state.showSelectAReference" :contentStyle="{'border-radius':'10px'}" :style="{width: '95%','max-width':'512px' }" modal>
			<Header :title="$t('selectAReferenceItem')" />
			<div class="chose-box-controller">
				<div class="controller w-100 mt-2" v-for="item in state.factor.details" :key="item" :class="item.number && item.factorNumbers ? null :'mb-0'">
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
							<span>{{item.currencyId == 0 ? $filters.currency(item.uperPrice * item.number ?? 0) - (((item.uperPrice * item.number ?? 0) / 100) * (item.offPercent ?? 0))  :  ($filters.currency((item.defaultPrice * item.number) - (((item.defaultPrice * item.number) / 100) * (item.offPercent ?? 0))))}}
								<Currency :currencyId="item.currencyId " class="mx-1"/>
							</span>
						</div>
					</div>
					<div class="footer-controller-chose-box" >
						<CustomFooter @click="state.initAddItem(item)" :bg="'#00accc'" :color="'#fff'"  :title="$t('addToReturnedCard')" />
					</div>
				</div>
			</div>
			<Footer>
				<Button :label="$t('apply')" class="p-button-rounded p-button-info" />
				<Button :label="$t('cancel')" class="p-button-rounded p-button-danger"/>
			</Footer>
    	</Dialog>
		<Dialog :showHeader="false" v-model:visible="state.showAddAReference" :contentStyle="{'border-radius':'10px'}" :style="{width: '95%','max-width':'512px' }" modal>
			<Header :title="$t('selectAReferenceItem')" />
			<div class="form-add-reference">
				
			</div>
		</Dialog>
		
	
		<div class="box-sellerProfile" v-if="state.userData" >
			<div class="child">
				<img v-lazy="state.userData.profileImageUrl+'_sm.webp'" >
			</div>
			<div class="child">
				<span>{{state.userData.name}}</span>
				<span>{{state.userData.username}}</span>
			</div>
		</div>
		<Header :title="$t('factorDetails')"/>
		<div v-if="state.factor &&  state.retrunedData !== null">
				<div class="d-flex flex-column my-2">
				<div class="controller"  v-for="(item) in state.dataList" :key="item">
					<template v-if="item.value">
						<span class="smart-text-align">{{item.label}} :</span>
						<span>{{ item.currency != null ? $filters.currency(item.value , item.currency == 0) : item.value}}</span>
						<Currency v-if="item.currency != null" :currencyId="item.currency" class="mx-1"/>
					</template>
				</div>
			</div>
			<div class="list-contoller">
				 <swiper :direction="'horizontal'" :free-mode="true" :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
						:slides-per-view="'auto'" :space-between="15"
						class="slider">
					<swiper-slide  v-for="item in state.factor.details" :key="item" class="pt-2 mt-1" style="cursor: pointer">
							<div class="controller w-100" :class="state.factor.factor.productType == 2 || state.factor.factor.productType == 3 || state.factor.factor.productType == 4 ? '':'mt-0'" >
							<div class="header" v-if="(state.factor.factor.productType == 2 || state.factor.factor.productType == 3 || state.factor.factor.productType == 4) && state.checkExpire(item.endReserveTime)">
								<img :src="require('@/assets/img/svg/borderred.svg')" >
								<span>
									{{`${$filters.jalali(item.startReserveTime)} ${$t('from')} ${$filters.getJalaliTime(item.startReserveTime)} ${$t('to')} ${$filters.getJalaliTime(item.endReserveTime)}`}}
								</span>
							</div>
							<div class="child">
								<img v-lazy="item.mainImageUrl+'_sm.webp'" >
							</div>
							<div class="text-controller">
								<div class="child">
									<p>{{item.name}}</p>
								</div>
								<div class="child">
									<div class="off" v-if="item.offPercent > 0 ">
										<span>{{item.offPercent}} %</span>
										<span>{{state.factor.factor.currencyId == 0 ? $filters.currency(item.uperPrice) : $filters.currency(item.defaultPrice)}}
											<Currency :currencyId="state.factor.factor.currencyId" class="mx-1"/>
										</span>
									</div>
									<div class="d-flex flex-row" v-else>
										<span>{{state.factor.factor.currencyId == 0 ? $filters.currency(item.uperPrice) : $filters.currency(item.defaultPrice)}}</span>
										<Currency :currencyId="state.factor.factor.currencyId" class="mx-1"/>
									</div>
								</div>
								<div class="child" v-if="item.offPercent > 0 && state.factor.factor.factorStatus == 9">
									<span>{{`${$t('price')} :`}} {{ state.factor.factor.currencyId == 0 ? $filters.currency(item.uperPrice ?? 0) - (((item.uperPrice ?? 0) / 100) * (item.offPercent ?? 0))  :  ($filters.currency((item.defaultPrice ?? 0) - (((item.defaultPrice ?? 0) / 100) * (item.offPercent ?? 0))))}}</span>
								</div>
								<div class="child" v-if="state.factor.factor.factorStatus == 9 && item.returnedNumber">
									<span>{{`${$t('numberPurchased')} : ${item.returnedNumber}`}}</span>
								</div>
								<div class="child">
									<span>{{$t('count')}} : </span>
									<span>{{item.numbers}}</span>
								</div>
								<div class="child" v-if="!item.activityOffCodeValue">
									<span>{{$t('total')}} : </span>
									<span>{{state.factor.factor.currencyId == 0 ? $filters.currency(item.uperPrice * item.numbers ?? 0) - (((item.uperPrice * item.numbers ?? 0) / 100) * (item.offPercent ?? 0))  :  ($filters.currency((item.defaultPrice * item.numbers ?? 0) - (((item.defaultPrice * item.numbers ?? 0) / 100) * (item.offPercent ?? 0)))) }}
										<Currency :currencyId="state.factor.factor.currencyId " class="mx-1"/>
									</span>
								</div>
								<div class="child" v-else>
									<ActivityLevel />
									<span>{{ $filters.currency(item.activityOffCodeValue , state.factor.factor.currencyId == 0) }}
										<Currency :currencyId="state.factor.factor.currencyId " class="mx-1"/>
									<span>{{$t('yourActivityDiscount')}} </span>
									</span>
								</div>
								<div class="child" v-if="state.factor.factor.productType == 12">
									<Button icon="udownload mx-2" @click="state.downloadFile(item.fileLink , item.name)" iconPos="right" :label="$t('downloadFile')" class="p-button-outlined p-button-rounded p-button-success" />
								</div>
							</div>
						</div>
					</swiper-slide>
				</swiper>
			</div>
			<div v-if="state.factor.factor.cancellationDescription">
				<div class="cancel-controller">
					<div class="details-of-cancel">
						<div class="controller">
							<div class="child warning">
								<i class="pi pi-exclamation-triangle"></i>
								<p>{{$t('reasonOfCancelFactor')}}</p>
							</div>
							<div class="child">
								<p class="smart-text-align">{{state.factor.factor.cancellationDescription}}</p>
							</div>
						</div>
						<div class="controller">
							<i class="far fa-file-alt"></i>
						</div>
					</div>
				</div>
			</div>
			<template v-if="state.factor.factor.factorStatus == 8 && state.factor.factor.productType == 1 && state.checkExpire()">
				<Footer>
					<Button @click="state.refer()" :label="$t('refer')" class="p-button-rounded" />
				</Footer>
			</template>
		</div>
		<loading v-else class="mt-5"/>
	</div>
</template>

<script lang="ts">
import Header from '@/app/unit/shared/headerApp/headerAppScreen.vue'
import {ref , onMounted} from 'vue'
import {factorDetailsPageState} from './factorDetailsShoppingHistoryState'
import Currency from "@/app/public/shared/currency/Currency.vue";
import qrGenrator from '@/app/unit/shared/qr/qrGenratorScreen.vue';
import Footer from '@/app/unit/shared/footerApp/fixedFooterScreen.vue';
import CustomFooter from '@/app/unit/shared/footerApp/theCustomFooterScreen.vue';
import ActivityLevel from '@/app/unit/shared/icons/activityLevel/activityLevelJustIconScreen.vue'

export default {
	components:{
		Header,
		Currency,
		qrGenrator,
		Footer,
		CustomFooter,
		ActivityLevel
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
		max-height: 40px;
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
	flex-wrap: wrap;
	padding: 5px 10px;
	margin-bottom: 40px;
	.controller {
		margin: 0 5px;
		span {
			overflow: hidden;
			text-overflow: ellipsis;
			width: auto;
		}
		display: flex;
		flex-direction: column;
		background: #fff;
		border-radius: 8px;
		box-shadow: 0 0 5px #686868;
		margin-bottom: 8px;
		position: relative;
		padding:10px 0;
		cursor: pointer;
		margin-top: 30px;
		transition: .6s;
		min-height: 350px;
		max-width: 240px;
		.header {
			display: flex;
			position: absolute;
			top: -30px;
			justify-content: center;
			width: 100%;
			span {
				position: relative;
				z-index: 99;
				top: 10px;
				color: #fff;
				direction: rtl;
			}
		img {
			position: absolute;
			top: 0;
			width: 100%;
			height: 40px;
			}
	}
		&:hover {
			opacity: 0.9;
		}
		.text-controller {
			 display: flex;
			 flex-direction: column;
			 justify-content: space-between;
			 align-items: center;
			 height: 100%;
				.child {
					width: 100%;
					justify-content: center;
					padding: 0 10px;
					&:first-child {
						margin-top: 5px;
					}

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
					&:last-child {
						padding:  10px 20px;
					}
					button {
						width: 100%;
						padding: 8px;
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
					&:last-child {
						text-decoration-line: line-through; 
					}
					&:first-child {
						background: rgb(196, 48, 48);
						padding: 1px 10px;
						color:#fff;
						border-radius: 8px;
						margin: 0 5px;
					}
				}
			}
			img {
				width: 100%;
				height: 200px;
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
.box-sellerProfile {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
	position: absolute;
	top: 0;
	padding: 5px 10px;
	.child {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		span {
			font-size: 14px;
			&:last-child {
				color: #686868;
			}
		}
		img {
			width: 45px;
			height: 45px;
			border-radius: 50%;
		}
	}
}

.footer-controller {
  display: flex;
  flex-direction: row;
  padding: 25px 10px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  background: #fadadd;
  position: fixed;
  bottom: 0;
  z-index: 99;
  height: 90px;
  box-shadow: 0 0 4px #b5b5b5;
  width: 512px;

  @media (max-width:512px) {
    width: 100%;
  }
  .control {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    .items {
       display: flex;
       flex: 50%;
       justify-content: center;
    }
  }
  button {
   background: #f45868 !important;
   border: none !important;
   padding: 8px 30px;
   box-shadow: none !important;
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

.details-input {
  display: flex;
  flex-direction: column;
  padding: 50px 20px;
  span {
    font-size: 16px;
    color:#686868;
    margin-bottom: 15px;
    display: block;
    text-align: center;
  }

  input {
    width: 100% !important;
    padding: 10px !important;
    border-radius: 5px;
    border: 1px solid #b5b5b5 !important;
    margin-bottom: 10px;
    &::placeholder {
      color: #686868;
    }
  }
  button , .btn-upload {
    background: #c2e1e4 !important;
    box-shadow: none !important;
    border: none;
    padding: 10px;
    font-size: 14px;
    color:#212121 !important;
    border-radius: 8px;
  }
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
  padding: 3px 8px !important;
}


.chose-box-controller {
	display: flex;
	flex-direction: column;
	padding: 5px 10px;
	margin-bottom: 40px;
	min-height: 600px;
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
		margin-bottom: 50px;
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

	.footer-controller-chose-box {
		width: 100%;
		position: absolute;
		bottom: -45px;
	}
}

::v-deep(.activity-controller img) {
	width: 35px;
}
</style>
