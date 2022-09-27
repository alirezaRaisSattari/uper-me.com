import { FactorRepository } from "@/core/repository/factor.repository";
import { ProductRepository } from "@/core/repository/product.repository";
import { getSelectedPageId } from "@/core/service/utils.service";
import { customMadeModel, GetForSellerModel } from "@/data/city/workpage/sellCart.model";
import { i18n } from "@/main";

export class customShoppingPageState {
	list = <customMadeModel[]>[];
	listFactorGetForSeller = <GetForSellerModel[]>[];
	dropDownList = [
		{ label: i18n.global.tc('virtualCustom'), value: 1 },
		{ label: i18n.global.tc('verbalCustom'), value: 2 }
	]
	selectedDropDown = this.dropDownList[0].value;
	loading = false;
	endList = false;
	getData(key) {
		this.loading = true;
		switch (key) {
			case 1:
				ProductRepository.getInstance().GetForBuyer({
					body: {
						skip: this.list.length,
						take: 10,
						myPageId: getSelectedPageId()
					}, onReceive: (res: customMadeModel[]) => {
						this.list.push(...res);
						this.loading = false;
						if (res.length < 10) {
							this.endList = true;
						}
					},onError:(err)=>{
						this.loading = false;
					}
				})
				break;
			case 2:
				FactorRepository.getInstance().SpecialFactorGetForBuyer({
					body: {
						myPageId: getSelectedPageId(),
					}, onReceive: (res: GetForSellerModel[]) => {
						this.listFactorGetForSeller = res;
						this.loading = false;
					
					},onError:(err)=>{
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

}
