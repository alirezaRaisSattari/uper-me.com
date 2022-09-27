<template>
  <div class="base">
    <div class="items" v-for="item in state.list" :key="item" @click="$function.goTo(`/factorDetailsReturnedHistoryAlt/${item.factorId}`)">
      <div class="item p-ripple">
        <div class="head" >
					<div class="controller">
						<div class="child w-auto">
							<img v-lazy="`${item.sellerProfileImageUrl}_sm.webp`" >
							<img class="creditLevel" v-if="item.sellerCreditLevel == 1 || item.sellerCreditLevel == 2" v-lazy="item.sellerCreditLevel == 1 ? require('@/assets/img/ic_crown_golden.svg') : item.sellerCreditLevel == 2 ? require('@/assets/img/ic_crown_grey.svg') : null">
						</div>
						<div class="child smart-text-align">
							<span>{{item.sellerName}}</span>
							<span>{{item.sellerUserName}}</span>
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
							<span>{{`${$t('totoalpriceback')} : ${ item.finalPrice > 0 ? $filters.currency(item.finalPrice) : $t('free')}`}} <currency v-if="item.finalPrice > 0" :currencyId="item.currencyId" /></span>
            </div>
          </div>
				</div>
        <div class="item-bottom">
          <div class="item-bottom-left">
            <swiper id="phones" :direction="'horizontal'" :free-mode="true"
              :scrollbar="{ el: '.swiper-scrollbar', draggable: true }" :slides-per-view="'auto'" :space-between="0"
              class="item-bottom-left-swiper">
              <swiper-slide v-for="pictures in item.itemsImages" :key="pictures">
                <img :src="pictures + '_sm.webp'" alt="" @click="state.initSlider(item.imageUrls)" />
              </swiper-slide>
            </swiper>
          </div>
        </div>
        	<div class="under-footer">
					<template v-if="item.returnFactorStatus < 9 && item.returnFactorStatus !== 2" >
								<swiper :direction="'horizontal'" :free-mode="true" :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
										:slides-per-view="'auto'" :space-between="15"
										class="slider">
									<swiper-slide v-for="(label , index) in state.listSendByUper" :key="label" class="pt-2 mt-1 swiper-controller" style="cursor: pointer">
										<div class="item-return-Factor" :class="(index == 0 || index < item.returnFactorStatus  - 1) ? 'active':null">
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

    <galleriaSlider v-if="state.slider.show" :images="state.slider.list" :displayBasic="state.slider.show"
      @timeClose="state.slider.show = false" />
  </div>
  <loading v-if="state.loading" />
  <Lottie v-if="(!state.list || state.list.length == 0) && !state.loading" :path="'https://up-staticfiles.s3.ir-thr-at1.arvanstorage.com/notFound.json'" :title="$t('emptyList')"/>
</template>

<script>
import {returnedHistory} from "./returnedHistory";
import {onBeforeUnmount, onMounted, ref} from "vue";
import {ScrollController} from "@/core/service/scroll.service";
import Ripple from "primevue/ripple";
import currency from "@/app/public/shared/currency/Currency.vue";
import galleriaSlider from "@/app/public/shared/galleriaSlider/galleriaSlider.vue";
import { i18n } from "@/main";
import Lottie from "@/app/unit/shared/lottie/lottieWithTitleScreen.vue";

export default {
  directives:{
  ripple: Ripple,},
  components: {
    currency,
    galleriaSlider,
    Lottie
  },
  setup() {
    const list = ref([
      {label:i18n.global.tc("Check")},
      {label:i18n.global.tc("accepted")},
      {label:i18n.global.tc("waitingForDelivery")},
      {label:i18n.global.tc("deliveryAccepted")},
      {label:i18n.global.tc("Sending")},
      {label:i18n.global.tc("delivered")}
    ])
    let scrollCtrl = new ScrollController(onScroll);
    const state = ref(new returnedHistory());
    const shoppingHistory = ref([]);
    const displaySlider = ref(false);
    function onScroll() {
      if (!state.value.loading && !state.value.endList) {
        state.value.getData();
      }
    }

    onMounted(() => {
      state.value.getData();
    });
    scrollCtrl.startListen();
    onBeforeUnmount(() => {
      scrollCtrl.removeListen();
    });

    return {
      state,
      shoppingHistory,
      scrollCtrl,
      displaySlider,
      list}
  }
}
</script>

<style lang="scss" scoped>
.swiper-container {
  width: 100%;
  padding: 5px;
}

.swiper-slide {
  width: auto !important;
  padding: 0 !important;
  &:last-child {
    .line {
      display: none;
    }
  }
}

.base {
  display: flex;
  flex-direction: column;
  height: auto;
  padding: 0 10px 60px 10px;

  .items {
    width: 100%;
    padding-top: 10px;
   
    .item {
      cursor: pointer;
      position: relative;
      display: flex;
      flex-direction: column;
      border: 1px solid #cecece6b;
      border-radius: 10px;
      //margin-bottom: 15px;
      box-shadow: 0 1px 5px 1px #cecece4a;
      padding: 5px;
      transition: .6s;
       &:hover {
      background: #eee !important;
    }


      &-top {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        border-bottom: 1px solid #e2e2e2;
        padding-bottom: 10px;

        &-right {
          display: flex;
          flex-direction: row;
          margin-top: 5px;
          margin-bottom: 5px;

          &-pics {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            border: 1px solid #929292;
            margin-left: 10px;
            cursor: pointer;

            img:nth-child(1) {
              width: 100%;
              border-radius: 50%;
            }

            img:nth-child(2) {
              width: 20px;
              position: absolute;
              margin: 41px -20px 0 0;
            }
          }

          &-txt {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-size: 14px;
          }
        }

        &-left {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: center;

          &-txt {
            color: #2c2c2c;
            margin: 10px 0 0 3px;
            font-size: 14px;

            img {
              width: 20px;
            }
          }
        }
      }

      &-bottom {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;

        &-right {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-right: 5px;
          width: 100%;

          &-txt {
            font-size: 14px;
            margin: 5px 0;
          }
        }

        &-left {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;

          &-swiper {
            img {
              width: 100%;
              height: 70px;
              cursor: pointer;
            }
          }
        }
      }

      &-btn {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;

        button {
          width: 150px;
          height: 40px;
          color: #ffff;
          outline: none;
          border: none;
          background-color: #f15b67;
          margin: 0;
          border-radius: 0 0 0 10px;
          cursor: pointer;
        }
      }

      &-swiper {
        img {
          width: 100%;
          height: 70px;
          cursor: pointer;
        }

        &-status {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          cursor: pointer;

          p {
            background-color: #f6596a;
            border-radius: 20px;
            color: #ffff;
            margin: 0;
            font-size: 14px;
            width: 91px;
            height: 40px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            border: 1px solid #f6596a;
            cursor: pointer;
          }
        }


      }

      &-txt {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        text-align: center;

        p {
          font-size: 14px;
        }
      }
    }
  }
}
.return-btn{
  border-radius: 15px;
  border: none;
  background-color: #f6596a;
  color: white;
  font-size: 14px;
  padding: 5px 9px 5px 9px;
  }
.line {
  width: 30px;
  height: 5px;
  background-color: #f6596a;
  border: 1px solid #f6596a;
}

.div-returned-btn{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

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
							background: #fea200;
							&::after {
								background: #fea200;
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
          span {
            position: relative;
            bottom: 5px;
          }
				}
			}
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
</style>
