<template>
	<div>
	<div v-if="factor.factor.sellerAddressType === 4">
		<div class="controller">
			<div class="header">
				<div class="child" >
					<span class="smart-text-align">{{$t('receiver')}} :</span>
					<span>{{factor.buyerDetails.name}}</span>
				</div>
			</div>
			<div class="body" >
				<div class="child">
					<span class="green">{{$t('destination')}} : </span>
					<span>
						{{factor.factor.buyerAddressObject.textAddress}}
					</span>
				</div>
				<div class="child" v-if="factor.buyerDetails">
					<img v-lazy="factor.buyerDetails.profileImageUrl+'_sm.webp'" alt="avatar">
					<swiper :direction="'horizontal'" :free-mode="false" :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
								:slides-per-view="'auto'" :space-between="0" class="slider w-100">
						<swiper-slide v-for="phone in factor.factor.buyerAddressObject.phones" :key="phone" class="pt-2 d-flex w-100 px-1">
							<span class="phone">{{phone.number}}
								<i class="pi pi-phone mr-2"></i>
							</span>
						</swiper-slide>
					</swiper>
				</div>
			</div>
	</div>
		</div>
	</div>
</template>

<script>
export default {
	props:{
		factor:Object
	},
	setup () {
		

		return {}
	}
}
</script>

<style lang="scss" scoped>
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
		}
		.body {
			display: flex;
			flex-direction: column;
			padding: 5px 0;
			align-items: flex-start;
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

		
</style>