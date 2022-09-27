import { FactorRepository } from "@/core/repository/factor.repository";
import { ProductRepository } from "@/core/repository/product.repository";
import { ToastService } from "@/core/service/toast.service";
import { getSelectedPageId } from "@/core/service/utils.service";
import { customMadeModel, GetForSellerModel } from "@/data/city/workpage/sellCart.model";
import { i18n } from "@/main";

export class customMadePageState {
	list = <customMadeModel[]>[];
	listFactorGetForSeller = <GetForSellerModel[]>[];
	dropDownList = [
		{ label: i18n.global.tc('offlineOrder'), value: 1 },
		{ label: i18n.global.tc('verbalCustom'), value: 2 }
	]
	selectedDropDown = this.dropDownList[0].value;
	loading = false;
	endList = false;
	verbal = {
		dialog: false,
		data:null
	};

	getData(key) {
		this.loading = true;
		switch (key) {
			case 1:
				ProductRepository.getInstance().GetForBuyer({
					body: {
						skip: this.list.length,
						take: 10,
						myPageId:getSelectedPageId()
					}, onReceive: (res: customMadeModel[]) => {
						this.list.push(...res);
						this.loading = false;
						if (res.length < 10) {
							this.endList = true;
						}
					}
				})
				break;
			case 2:
				FactorRepository.getInstance().GetForBuyer({
					body: {
						myPageId:getSelectedPageId(),
					}, onReceive: (res: GetForSellerModel[]) => {
						this.listFactorGetForSeller = res;
						this.loading = false;
					}
				})
				break;
		}
	}

	checkStatus(key) {
		switch (key) {
			case 1:
				return i18n.global.tc('created');
			case 2:
				return i18n.global.tc('canceledByTheSeller');
			case 3:
				return i18n.global.tc('agreed');
			case 5:
				return i18n.global.tc('returned');
			default:
				break;
		}
	}

	confirm(active) {

		if (active) {
			FactorRepository.getInstance().SpecialFactorAccept({
				body:{
					specialFactorId: this.verbal.data.specialFactorId,
					buyerPageId: this.verbal.data.buyerPageId,
					sellerPageId: this.verbal.data.sellerPageId
				},onReceive:(res)=>{
					ToastService.getInstance().info(i18n.global.tc('done'))	
				},onError:(err)=>{
					ToastService.getInstance().error(err.toString());
				}
			})
		} else {
			FactorRepository.getInstance().SpecialFactorCancelForSeller({
				body:{
					specialFactorId: this.verbal.data.specialFactorId,
					buyerPageId: this.verbal.data.buyerPageId,
					sellerPageId: this.verbal.data.sellerPageId
				},onReceive:(res)=>{
					ToastService.getInstance().info(i18n.global.tc('done'))	
				},onError:(err)=>{
					ToastService.getInstance().error(err.toString());
				}
			})
		}
	}

	initDialog(item){
		this.verbal.data = item;
		this.verbal.dialog = true;
	}

}