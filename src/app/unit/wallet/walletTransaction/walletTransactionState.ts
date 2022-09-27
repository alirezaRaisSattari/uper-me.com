import {AccountingRepository} from "@/core/repository/accountingRepository";
import {BASE_TAKE} from "@/core/constant/constant";
import {updateTransactionModel} from "@/data/city/mainpage/accounting.model";
import {getSelectedPageId} from "@/core/service/utils.service";
import {ToastService} from "@/core/service/toast.service";
import {i18n} from "@/main";

export class TransactionState {
    skipNum = 0;
    loadingTransactions = false
    transactionsFinished = false
    isNull: Boolean
    allTransactions = []
    transactionInfo = []

    getAllTransactions(body, isFilter) {
        if (this.loadingTransactions || this.transactionsFinished) return;
        this.loadingTransactions = true
        body.skip = this.skipNum
        AccountingRepository.getInstance().GetMyAccountTransaction({
            body: body,
            onReceive: (res) => {
                if (res) {
                    if (res == null) {
                        this.transactionsFinished = true
                        this.loadingTransactions = false
                    }
                    if (isFilter) {
                        this.allTransactions = []
                    }
                    this.allTransactions.push(...res);
                    this.isNull = res == null;
                    if (Array.isArray(res)) {
                        if (BASE_TAKE > res.length)
                            this.transactionsFinished = true
                        if (res.length == BASE_TAKE) {
                            this.skipNum += BASE_TAKE;
                        }
                        this.loadingTransactions = false
                    }
                } else{
                    ToastService.getInstance().info(i18n.global.tc('notFound'))
                    this.allTransactions = []
                }
            }
        })

    }

    updateTransaction(body) {
        AccountingRepository.getInstance().UpdateAccount({
            body: <updateTransactionModel>{...body},
            onReceive: (res) => {
                if (this.transactionInfo != []) {
                    this.getInfoByAccountNumber(body.accountNumber)
                }
            }
        })

    }

    getInfoByAccountNumber(body) {
        AccountingRepository.getInstance().GetByAccountNumber({
            body: {
                accountNumber: body,
                pageId: getSelectedPageId()
            },
            onReceive: (res) => {

                this.transactionInfo = []
                this.transactionInfo.push(res)
            }
        })

    }
}
