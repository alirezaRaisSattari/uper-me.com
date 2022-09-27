import {AccountingRepository} from "@/core/repository/accountingRepository";
import {ToastService} from "@/core/service/toast.service";
import {monyTransferModel} from "@/data/city/mainpage/accounting.model";
import {i18n} from "@/main";

export class monyTransfer {
    targetAccountInfo = null

    getByAccountNumber(body: Number, get: Function) {
        AccountingRepository.getInstance().GetByAccountNumber({
            body: body,
            onReceive: (res) => {
                this.targetAccountInfo = res
                get()
            }
        })
    }

    TransferMoney(body, transferd: Function) {
        AccountingRepository.getInstance().TransferMoney({
            body: <monyTransferModel>{...body},
            onReceive: (res) => {
                transferd()
                ToastService.getInstance().success(i18n.global.tc("successfulTransfer"));
            }
        })
    }
}
