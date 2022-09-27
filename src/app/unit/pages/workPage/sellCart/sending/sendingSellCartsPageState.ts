import { BASE_TAKE } from "@/core/constant/constant";
import { FactorRepository } from "@/core/repository/factor.repository";
import { getSelectedPageId } from "@/core/service/utils.service";
import { sendingSellCartsModel } from "@/data/city/mainpage/factor.modal";
import { i18n } from "@/main";

export class sendingSellCartsPageState {
	list = <sendingSellCartsModel[]>[];
	loading = false;
	endList = false;
	statusKey = 4;
	swiperList = [
		{label:i18n.global.tc('readySells') , value: 4},
		{label:i18n.global.tc('waitingForDelivery') , value: 5},
		{label:i18n.global.tc('deliveryAccepted') , value: 6},
		{label:i18n.global.tc('deliveries') , value: 7},
	]

	getData() {
		FactorRepository.getInstance().GetRecentForSeller({
			body:{
				skip: this.list.length,
				take: BASE_TAKE,
				workPageId: Math.abs(getSelectedPageId()),
				requestTime:  new Date().toISOString(),
				factorStatus: this.statusKey,
			},
			onLoadChange:(load)=>this.loading = load,
			onReceive:(res:sendingSellCartsModel[])=>{
				if (res.length < BASE_TAKE) this.endList = true					
				this.list.push(...res);
			},
			onError:(err)=> {
				this.list = [];
				this.loading = false;
			}
		})
	}

	

	changeTab(key) {
		
		this.endList = false;
		this.statusKey = key;
		this.loading = true;
		this.list = [];
		this.getData();
	}
	
}