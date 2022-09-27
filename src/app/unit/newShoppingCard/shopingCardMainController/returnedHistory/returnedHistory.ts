import {BASE_TAKE} from "@/core/constant/constant";
import {FactorRepository} from "@/core/repository/factor.repository";
import {getSelectedPageId} from "@/core/service/utils.service";
import {shoppingHistoryModel} from "@/data/city/workpage/shopingHistory.model";
import {i18n} from "@/main";
import {FactorStatus, ReturnedFactorStatus} from "@/core/enum/enums";

export class returnedHistory {
    list = <shoppingHistoryModel[]>[];
    loading = false;
    endList = false;

    slider = {
        show: false,
        list: [],
    };

    listSendByUper = [
        i18n.global.tc('checking') ,
        i18n.global.tc('accepted') ,
        i18n.global.tc('waitingForDelivery') ,
        i18n.global.tc('deliveryAccepted') ,
        i18n.global.tc('sending_1') ,
        i18n.global.tc('delivered') ,
    ];
    getData() {
        FactorRepository.getInstance().ReturnedFactorGetBuyer({
            body: {
                skip: this.list.length,
                take: BASE_TAKE,
                PageId: getSelectedPageId(),
            },
            onLoadChange: check => this.loading = check,
            onReceive: (res: shoppingHistoryModel[]) => {

                if (res){
                    this.list.push(...res);
                    if (res.length < BASE_TAKE) this.endList = true;
                }else{
                    this.endList = true
                }

            },
            onError: (err) => {
                console.log(err);
            },
        });
    }

    checkProduct(key) {
        switch (key) {
            case 1:
                return i18n.global.tc("sell");
            case 2:
                return i18n.global.tc("reserve");
            case 3:
                return i18n.global.tc("fare");
            case 4:
                return i18n.global.tc("service");
            case 12:
                return i18n.global.tc("virtualProduct");
            default:
                return i18n.global.tc("product");
        }
    }

    sellerTransferCheck(key) {
        switch (key) {
            case 1:
                return i18n.global.tc("hasNotDelivery");
            case 2:
                return i18n.global.tc("uperSend");
            case 3:
                return i18n.global.tc("inPlaceOfStore");
            case 4:
                return i18n.global.tc("sellerSend");
        }
    }

    FactorStatus(key) {
        switch (key) {
            case 1:
                return 1;
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
                return "active";
            case 9:
                return i18n.global.tc("returned");
            case 10:
                return i18n.global.tc("canceledByBuyer");
            case 11:
                return i18n.global.tc("canceledByYou");
            case 12:
                return i18n.global.tc("settlement");
        }
    }

    initSlider(list) {
        this.slider.list = list;
        this.slider.show = true;
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
