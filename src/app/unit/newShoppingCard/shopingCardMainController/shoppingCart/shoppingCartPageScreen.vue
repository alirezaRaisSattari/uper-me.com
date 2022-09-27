<template>
  <div>
    <div class="shopping-cart-controller has-fixed-footer">
      <div class="header">
        <div class="child">
          <Dropdown panelClass="max-height-controller"  @change="state.changeCategory($event)" v-model="state.currency" :options="state.currencyTypes" :placeholder="$t('rou')" optionLabel="name" optionValue="value"/>
        </div>
        <div class="child">
          <Dropdown panelClass="max-height-controller" @change="state.changeCategory($event)" v-model="state.category" :options="state.categories" :placeholder="$t('rou')" optionLabel="name" optionValue="value"/>
        </div>
      </div>
      <div class="body-controller" v-if="state.shoppingCarts.length > 0">
			<div class="item" v-for="item in state.shoppingCarts" :key="item" >
				<div class="head" >
        <div class="controller" @click="$function.goTo(`/page/${item.sellerUsername}`)">
					<div class="child">
						<img v-lazy="`${item.sellerProfileImageUrl}_sm.webp`" >
						<img class="creditLevel" v-if="item.sellerCreditLevel == 1 || item.sellerCreditLevel == 2" v-lazy="item.sellerCreditLevel == 1 ? require('@/assets/img/ic_crown_golden.svg') : item.sellerCreditLevel == 2 ? require('@/assets/img/ic_crown_grey.svg') : null">
					</div>
					<div class="child smart-text-align">
						<span>{{item.sellerName}}</span>
						<span>{{item.sellerUsername}}</span>
					</div>
        </div>
        <div class="controller"  @click="state.initBeforeSend(item)">
          <div class="child star-controller">
              <i class="pi pi-star"></i>
              <span>{{item.sellerAverage}}</span>
            </div>
        </div>
				</div>
				<div class="middle"  @click="state.initBeforeSend(item)">
					<div class="child text-right">
						<span>{{$t('shoppingType')}} : <span>{{(state.getProductType(item.productType))}}</span></span>
					</div>
					<div class="child text-left">
            <span>{{$t('totalPrice')}} : <span>{{$filters.currency(item.totalPrice)}} <currency class="mx-1" :currencyId="item.currencyId"></currency></span></span>
					</div>
				</div>
				<div class="footer"  @click="state.initBeforeSend(item)">
					<div class="child">
						<Button icon="pi pi-chevron-left" class="p-button-rounded p-button-text p-button-plain no-shadow" />
					</div>
					<div class="child">
						<img v-for="image in item.items" :key="image" v-lazy="image.mainImageUrl+'_sm.webp'" >
					</div>
				</div>
			</div>
			<loading v-if="loading"/>
		</div>
    <div v-else class="empty-controller">
      <span>{{$t('noProductsInCart')}}</span>
      <img :src="require('@/assets/img/svg/emptyShoppingCart.svg')" >
    </div>
    </div>
  </div>
</template>

<script lang="ts">
import Dropdown from 'primevue/dropdown';
import {shoppingCartPageState} from './shoppingCartPageState';
import {onMounted, ref} from 'vue';
import { ScrollController } from '@/core/service/scroll.service';
import { getSelectedPageData } from '@/core/service/utils.service';
import currency from "@/app/public/shared/currency/Currency.vue";

export default {
  components: {
    Dropdown,
    currency
  },
  setup() {
    const state = ref(new shoppingCartPageState());
    let scrollCtrl = new ScrollController(onScroll);
    const workPageId = ref(getSelectedPageData().id);

    function onScroll() {
      if (!state.value.loading && !state.value.endList) {
        state.value.getData();
			}
    }

    onMounted(() => {
      state.value.getData();
      scrollCtrl.startListen();
    });

    return {
      state,
      workPageId
    }
  }
}
</script>

<style lang="scss" scoped>
.shopping-cart-controller {
  display: flex;
  flex-direction: column;

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px;

    .child {
      padding: 10px 15px;
      @media (max-width:350px) {
        padding: 0;
      }
      width: 50%;
    }
  }
}

::v-deep(.p-dropdown) {
  box-shadow: none !important;
  outline: none !important;
  border-radius: 25px;
  padding: 5px 25px 5px 0;

  @media (min-width: 500px) {
    width: 210px;
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
        justify-content: space-between;
				border-bottom: 1px solid #b5b5b5;
				padding-bottom: 8px;

        .controller {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
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
			}
			.middle {
				display: flex;
				flex-direction: row;
        margin-top: .5rem;
				.child {
					font-size: 14px;
					display: flex;
					flex-direction: column;
					width: 50%;
					
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
					img {
						width: 30px;
						height: 30px;
						border-radius: 5px;
						margin: 5px;
						cursor: pointer;
						object-fit: scale-down; /* or object-fit: contain; */
					}
					span {
						color:#686868;
						font-size: 14px;
						&:nth-child(2){
							color:#303030;
						}
					}
				}
			}

		}
	}
  .empty-controller {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 500px;
    img {
      width: 120px;
      height: 120px;
    }
    span { 
      font-style: 15px;
      margin-bottom: 10px;
    }
  }
::v-deep(.p-button-icon) {
	color:#7d7d7d;
}
.max-height-controller {
  max-height: 500px !important;
}
</style>
