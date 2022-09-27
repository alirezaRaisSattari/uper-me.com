import {AccountingRepository} from "@/core/repository/accountingRepository";
import {mainPageWalletModel} from "@/data/city/mainpage/accounting.model";
import _ from "lodash";
import {getSelectedPageId} from "@/core/service/utils.service";

export class wallet {
    accounts = []
    objectList = []
    currencies = []
    loading = false
    activityLevelValue = 0
    getWorkAccounts(body) {
        AccountingRepository.getInstance().GetWalletByIdAndType({
            body: <mainPageWalletModel>{...body},
            onLoadChange: (load) => this.loading = load,
            onReceive: (res) => {

                this.accounts = res
                _.remove(this.accounts, (element) => element.currencyId == 0 && element.accountType == 3);
                if (getSelectedPageId() > 0) {
                    _.remove(this.accounts, (element) => element.accountType == 2);
                }

                this.accounts.forEach(
                    account => {
                        this.currencies.push(account.currencyId)
                    }
                )
                this.currencies = [...new Set(this.currencies)];
                this.currencies.forEach(
                    currency => {
                        this.objectList[currency] = Array()
                    }
                )
                this.currencies.forEach(
                    currency => {
                        this.objectList[currency] = this.accounts.filter(m => m['currencyId'] == currency)
                    }
                )
            }

        })
    }

    activityLevel(pageId) {
        AccountingRepository.getInstance().CalculateActivityLevel({
            urlContent: {pageId},
            onReceive: (res) => {
                this.activityLevelValue = res;
            }
        })

    }

}
