import {AccountingRepository} from "@/core/repository/accountingRepository";
import {mainPageWalletModel} from "@/data/city/mainpage/accounting.model";

export class getAccount {
    loading = false
    accounts = null
    selectSelected = false

    getAccount(body) {
        AccountingRepository.getInstance().GetWalletByIdAndType({
            body: <mainPageWalletModel>{...body},
            onLoadChange: (load) => this.loading = load,

            onReceive: (res) => {


                this.accounts = res.filter(e => {    // this.accounts just contains account with accountType==1
                    return e.accountType == 1
                })
                this.selectSelected = true

            }
        })
    }
}
