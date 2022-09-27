import {ProductRepository} from "@/core/repository/product.repository";
import {getSelectedPageId} from "@/core/service/utils.service";
import {ToastService} from "@/core/service/toast.service";
import {i18n} from "@/main";

export class UpdatePropPriceState {
    loadingDefault = false
    loadingUpper = false

    fetchDataDefault(inc, jobDone) {
        ProductRepository.getInstance().UpdateMultiDefaultPrice(
            {
                body: {
                    "workPageId": Math.abs(getSelectedPageId()),
                    "currencyId": 1,
                    "increase": inc
                },
                onReceive: res => {
                    jobDone(true)
                    ToastService.getInstance().success(i18n.global.tc('OperationSuccessful'))
                },
                onLoadChange: loadStatus => {
                    this.loadingDefault = loadStatus
                },
                onError: message => {
                }
            }
        );
    }

    fetchDataUper(inc, jobDone) {
        ProductRepository.getInstance().UpdateMultiUperPrice(
            {
                body: {
                    "workPageId": Math.abs(getSelectedPageId()),
                    "currencyId": 0,
                    "increase": inc
                },
                onReceive: res => {
                    jobDone(true)
                    ToastService.getInstance().success(i18n.global.tc('OperationSuccessful'))
                },
                onLoadChange: loadStatus => {
                    this.loadingUpper = loadStatus
                },
                onError: message => {
                }
            }
        );
    }

}
