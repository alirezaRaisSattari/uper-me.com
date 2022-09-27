import {AccountingRepository} from "@/core/repository/accountingRepository";
import {ProductRepository} from "@/core/repository/product.repository";
import {ToastService} from "@/core/service/toast.service";
import {mainPageWalletModel} from "@/data/city/mainpage/accounting.model";
import {AddImmediateTagToProductModel} from "@/data/city/product/product.model";
import {i18n} from "@/main";

export class getAccount {
    loading = false
    accounts = null

    getAccount(body, callback: Function) {
        AccountingRepository.getInstance().GetWalletByIdAndType({
            body: <mainPageWalletModel>{...body},
            onLoadChange: (load) => this.loading = load,
            onReceive: (res) => {
                this.accounts = res;
                callback();
            }
        })
    }


    addTag(body, callBack: Function) {
        ProductRepository.getInstance().AddImmediateTagToProduct({
            body: <AddImmediateTagToProductModel>{...body},
            onReceive: (res => {
                ToastService.getInstance().success(i18n.global.tc('successMassage'));
                callBack();
            }), onError: (err => {
                callBack();
            })
        })
    }
}
