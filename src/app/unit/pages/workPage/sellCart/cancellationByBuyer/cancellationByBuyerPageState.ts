import { FactorRepository } from "@/core/repository/factor.repository";
import { getSelectedPageId } from "@/core/service/utils.service";
import { newSellCartModel } from "@/data/city/workpage/sellCart.model";
import { i18n } from "@/main";

export class cancellationByBuyerPageState {
	loading = false
	endList = false;
	list = <newSellCartModel[]>[];

	getData() {
		this.loading = true;

		FactorRepository.getInstance().GetRecentForSeller({
			body: {
				skip: this.list.length,
				take: 10,
				workPageId: Math.abs(getSelectedPageId()),
				requestTime: new Date(),
				factorStatus: 11,
			}, onReceive: (res: newSellCartModel[]) => {
				this.list.push(...res);
				this.loading = false;
				if (res.length < 10) {
					this.endList = true;
				}
			}, onError: (err) => {
				this.loading = false;
			}
		})
	}

	checkProduct(key) {
		switch (key) {
			case 1:
				return i18n.global.tc('sell');
			case 2:
				return i18n.global.tc('reserve');
			case 3:
				return i18n.global.tc('fare');
			case 4:
				return i18n.global.tc('service');
			case 12:
				return i18n.global.tc('virtualProduct');
			default:
				return i18n.global.tc('product');
		}
	}

	sellerTransferCheck(key) {
		switch (key) {
			case 1:
				return i18n.global.tc('hasNotDelivery');
			case 2:
				return i18n.global.tc('uperSend');
			case 3:
				return i18n.global.tc('inPlaceOfStore');
			case 4:
				return i18n.global.tc('sellerSend');
		}
	}
}