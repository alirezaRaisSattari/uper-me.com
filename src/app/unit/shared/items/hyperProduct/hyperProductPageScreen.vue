<template>
	<div>
		<div class="item-controller" >
			<div class="add-to-cart" v-if="!showAddToCart">
				<div class="panel">
					<div class="contorller">
						<Button :label="productCount > 0 ? productCount : null " :icon="productCount == 0 ? 'pi pi-plus':''" class="p-button-rounded p-button-danger p-button-outlined no-shadow"  @click="productCount < 99 ? changeCount(1) : null"/>
						<Button icon="pi pi-plus" class="p-button-rounded p-button-danger p-button-outlined no-shadow"  @click="productCount < 99 ? changeCount(1) : null"/>
						<span>{{productCount}}</span>
						<Button :icon="productCount == 1 ? 'pi pi-trash':'pi pi-minus'" class="p-button-rounded p-button-danger p-button-outlined no-shadow"  @click="productCount > 0 ? changeCount(2) : null"/>
					</div>
				</div>
			</div>
			<img v-lazy="item.mainImageUrl+'_sm.webp'" @click="goToProduct(item)">
			<div class="text-controller smart-text-align" @click="goToProduct(item)">
			<span class="w-100">{{ item.name }}</span>
			<span>
			</span>
			<template v-if="item.offPercent > 0">
				<span>{{ $filters.currency(item.defaultPrice - (item.defaultPrice * item.offPercent / 100)) }} <Currency
					:currencyId="item.currencyId" class="mx-2"/></span>
				<div class="percent-controller">
				<span>{{ $filters.currency(item.defaultPrice) }} </span>
				<span>{{ item.offPercent }} %</span>
				</div>
			</template>
			<template v-else>
				<template v-if="item.defaultPrice > 0">
					<span>{{ $filters.currency(item.defaultPrice) }} <Currency :currencyId="item.currencyId" class="mx-2"/></span>
				</template>
				<template v-else>
					<span>{{$t('agreement')}}</span>
				</template>
			</template>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import router from '@/core/router/router'
import { useRoute } from 'vue-router'
import {ref } from 'vue'
import { ProductRepository } from '@/core/repository/product.repository'
import { ShoppingCartUpdateItemsModel } from '@/data/city/product/product.model'
import {getSelectedPageId, slugify} from '@/core/service/utils.service'
export default {
	props:{
		item:Object,
		showAddToCart:Boolean
	},
	setup (props) {
		const route = ref(useRoute());
		const productCount = ref(props.item.shopingCartItemsNumber);
		function goToProduct(item) {
			router.push(`/product/${item.productId}/${route.value.params.wpid}/${slugify(item.name)}`)
		}
		function changeCount(key) {
			if (key == 1) {
				productCount.value++
			} else {
				productCount.value--
			}
			updateCard();
		}
		function updateCard() {
			
			ProductRepository.getInstance().ShoppingCartUpdateItems({
				 body: <ShoppingCartUpdateItemsModel>{
					sellerWorkPageId: Math.abs(Number(route.value.params.wpid)),
					buyerPageId: Math.abs(getSelectedPageId()),
					propId: Number(props.item.propId),
					numbers: productCount.value,
					currencyId: props.item.currencyIdvalue
				},onReceive:(res)=> {
				} , onError:(err)=>{
					console.log(err);
					
				}
			})
		}

		


		return {
			goToProduct,
			productCount,
			updateCard,
			changeCount,
		}
	}
}
</script>

<style lang="scss" scoped>
  .item-controller {
          display: flex;
          flex-direction: column;
          border-radius: 10px;
          box-shadow: 0 0 5px #b5b5b5;
          cursor: pointer;
		  .add-to-cart {
			  position: absolute;
				padding: 5px;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				.contorller {
					width: 30px;
					transition: 0.5s;
					display: flex;
					flex-direction: row;
					overflow: hidden;
					border-radius: 10px;
					background: #fff;
					padding: 3px;
					span {
						display: none;
						color: #686868;
						padding: 5px 5px 0;
						margin-right: 30px;
						width: 30px;
						justify-content: center;
					}
					button {
						width: 30px ;
						height: 30px ;
						font-size: 14px;
						 
						&:nth-child(1) , &:nth-child(2){
							position: absolute;
						}
						&:last-child , &:nth-child(2){
							display: none;
						}
					}
					&:hover {
						transition: 0.5s;
						width:  95px;
						transition: 0.5s;
						span {
							display: flex;
						}
						button {
							&:nth-child(1) {
								display: none;
							}
							
							&:last-child , &:nth-child(2){
								display: flex;
							}
						}
					}
				}
		  }

          img {
            width: 100%;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
          }

          .text-controller {
            padding: 5px;
            height: 108px;
            max-height: 108px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: space-around;

            span {
				margin-top: 5px;
				display: flex;
				font-size: 14px;
				text-overflow: ellipsis;
				overflow: hidden;
            }

            .percent-controller {
              display: flex;
              flex-direction: row;

              span {
                display: block !important;
                font-size: 13px;

                &:first-child {
                  -webkit-text-decoration-line: line-through; /* Safari */
                  text-decoration-line: line-through;
                  color: #686868;
                }

                &:last-child {
                  background: #dc3545;
                  color: #fff;
                  border-radius: 5px;
                  padding: 0px 5px;
                  margin: 0 5px;
                  font-size: 12px;
                  direction: ltr;
                  letter-spacing: 5px;
                  height: 17px;
                  position: relative;
                  top: 5px;
                }
              }
            }
          }
        }
</style>
