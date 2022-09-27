import { FactorRepository } from "@/core/repository/factor.repository";
import { getMainPageId, getSelectedPageId } from "@/core/service/utils.service";
import { shoppingHistoryModel } from "@/data/city/workpage/sellCart.model";
import { i18n } from "@/main";

export class shoppingHistoryPageState {
	loading = false
	endList = false;
	list = <shoppingHistoryModel[]>[];
    listReturnFactorStatus = [
        i18n.global.tc('checking') ,
        i18n.global.tc('accepted') ,
        i18n.global.tc('preparing') ,
        i18n.global.tc('delivered') ,
    ];
    listSendByUper = [
        i18n.global.tc('checking') ,
        i18n.global.tc('accepted') ,
        i18n.global.tc('preparing') ,
        i18n.global.tc('waitingForDelivery') ,
        i18n.global.tc('deliveryAccepted') ,
        i18n.global.tc('sending_1') ,
        i18n.global.tc('delivered') ,
    ];

    listReserve = [
        i18n.global.tc('checking') ,
        i18n.global.tc('accepted') ,
    ];

	getData() {
		this.loading = true;

		FactorRepository.getInstance().GetRecentForBuyer({
			body: {
				skip: this.list.length,
				take: 10,
				myPageId: (getSelectedPageId()),
               requestTime:new Date().toISOString(),
			}, onReceive: (res: shoppingHistoryModel[]) => {
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
    checkReturnedStatus(key) {
        switch (key) {
            case 9:
               return i18n.global.tc('returned');
            case 10:
               return i18n.global.tc('cancelBySeller');
            case 11:
               return i18n.global.tc('canceledByYou');
            case 12:
               return i18n.global.tc('settlement');
        }
    }

	 
  
}