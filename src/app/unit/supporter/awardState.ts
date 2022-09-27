import {AccountingRepository} from "@/core/repository/accountingRepository";
import {BASE_TAKE} from "@/core/constant/constant";

export class supporterAward {
    skipNum = 0;
    loadingAwards = false
    awardsIsFinished = false
    allAwards = []
    isNull: Boolean

    getAward(body) {
        if (this.loadingAwards || this.awardsIsFinished) return;
        this.loadingAwards = true
        body.skip = this.skipNum
        AccountingRepository.getInstance().mediaAward({
            body: {...body},
            onReceive: (res) => {
                this.allAwards = null
                if (res == null)
                    this.isNull = true
                else this.isNull = false
                if (Array.isArray(res)) {
                    this.allAwards = res;
                    if (BASE_TAKE > res.length)
                        this.awardsIsFinished = true
                    if (res.length == BASE_TAKE) {
                        this.skipNum += BASE_TAKE;
                    }
                    this.loadingAwards = false
                }
            }
        })
    }
}
