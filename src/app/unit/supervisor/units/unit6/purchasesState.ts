import {Constant} from "@/core/constant/constant";
import {UserRepository} from "@/core/repository/user.repository";
import {DateService} from "@/core/service/date.service";
import {getSelectedPageId} from "@/core/service/utils.service";

export class purchasesState {
    factorsLoading = false
    factors = []
    factorsIsFinished = false
    skipNum = 0

    getFactors(supporterPageId) {
        UserRepository.getInstance().GetFactorsOfBuyerWorkPages({
            body: {
                skip: 0,
                take: 100,
                status: 1,
                productType: null,
                currencyId: null,
                requestTime: new Date(),
                sortByAscending: true,
                supporterPageId: Number(supporterPageId),
                agencyPageId: getSelectedPageId() < 0 ? Math.abs(getSelectedPageId()) : null
            },
            onReceive: (res) => {
                if (Array.isArray(res)) {
                    if (Constant.TAKE_20 > res.length)
                        this.factorsIsFinished = true
                    if (res.length == Constant.TAKE_20) {
                        this.skipNum += Constant.TAKE_20;
                    }
                    res.forEach(e => {
                        e.time = DateService.getInstance().getJalaliTime(e.createdAt);
                        e.createDate = DateService.getInstance().convertToJalali(e.createdAt)
                    });
                    this.factors.push(...res)
                } else this.factorsIsFinished = true
            },
            onLoadChange: (load) => {
                this.factorsLoading = load
            },
        })
    }
}
