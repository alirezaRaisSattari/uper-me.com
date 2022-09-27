<template>
	<div>
		<Header :title="$t('products')"/>
		<div class="body-controller">
			<div class="item" v-for="item in list" :key="item">
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
				<div class="middle">
					<div class="child text-right">
						<span>{{$t('customProduct')}} : <span>{{item.buyerCreator ? $t('byBuyer') : $t('bySeller')}}</span></span>
						<span>{{$t('totalPrice')}} : <span>{{$filters.currency(item.price , item.currencyId == 0)}}</span><currency class="mx-2" :currencyId="item.currencyId"/></span>
					</div>
					<div class="child text-left">
						<span>{{$t('status')}} : <span :class="!(item.customStatus == 2 || item.customStatus == 1) ? 'text-danger':null">{{item.customStatus == 1 ? $t('checking'):item.customStatus == 2 ? $t('accepted'):$t('rejected')}}</span></span>
						<span>{{$t('count')}} : <span>{{item.number}}</span></span>
					</div>
				</div>
				<div class="footer" @click="$function.goTo(`/customProductPerview/${item.customId}`)">
					<div class="child">
						<Button icon="pi pi-chevron-left" class="p-button-rounded p-button-text p-button-plain no-shadow" />
					</div>
					<div class="child">
						<img v-for="image in item.otherImage" :key="image" v-lazy="image" >
					</div>
				</div>
			</div>
			<loading v-if="loading"/>
			<Lottie v-if="list.length == 0 && !loading" :path="'https://up-staticfiles.s3.ir-thr-at1.arvanstorage.com/notFound.json'" :title="$t('noItem')"/>

		</div>
	</div>
</template>

<script lang="ts">
import Header from '@/app/unit/shared/headerApp/headerAppScreen.vue'
import {ref,onMounted} from 'vue'
import { ProductRepository } from '@/core/repository/product.repository';
import { getSelectedPageId } from '@/core/service/utils.service';
import { useRoute } from 'vue-router';
import { i18n } from '@/main';
import Currency from '@/app/public/shared/currency/Currency.vue';
import Lottie from "@/app/unit/shared/lottie/lottieWithTitleScreen.vue";

export default {
	components:{
		Header,
		Currency,
		Lottie
	},
	setup () {
		const list = ref([]);
		const loading = ref(false);
		const route = ref(useRoute());

		onMounted(() => {
			loading.value = true;
			ProductRepository.getInstance().GetCustomsForSeller({
				body:{
					skip: 0,
					take: 1000,
					workPageId: Math.abs(getSelectedPageId()),
					buyerPageId: route.value.params.buyerPageId
				},onReceive:(res:any[]) => {
					loading.value = false;
					list.value = res;
				},onError:(err) => {
					loading.value = false;
				}
			})
		})
		
		return {
			list,
			loading,
		}
	}
}
</script>

<style lang="scss" scoped>
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
				.child {
					display: flex;
					flex-direction: column;
					padding: 0 5px;
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
			.middle {
				display: flex;
				flex-direction: row;
				.child {
					&:first-child {
						width: 60%;
					}
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

	
::v-deep(.p-button-icon) {
	color:#7d7d7d;
}

</style>
