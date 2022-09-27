import {Constant} from "@/core/constant/constant";
import {UserRepository} from "@/core/repository/user.repository";
import {DateService} from "@/core/service/date.service";
import {getSelectedPageId} from "@/core/service/utils.service";

export class rewardsSate {
    factors = []
    skipNum = 0;
    factorsIsFinished = false;
    factorsLoading = false

    getFactors(supporterPageId) {
        if (this.factorsLoading || this.factorsIsFinished) return
        UserRepository.getInstance().GetSupporterMediaAward({
            body: {
                skip: this.skipNum,
                take: Constant.TAKE_20,
                agencyPageId: getSelectedPageId() < 0 ? Math.abs(getSelectedPageId()) : null,
                supporterPageId: supporterPageId
            },
            onReceive: (res) => {
                if (Array.isArray(res)) {
                    if (Constant.TAKE_20 > res.length)
                        this.factorsIsFinished = true
                    if (res.length == Constant.TAKE_20) {
                        this.skipNum += Constant.TAKE_20;
                    }

                    res.forEach(e => {
                        e.time = DateService.getInstance().getJalaliTime(e.createDate);
                        e.createDate = DateService.getInstance().convertToJalali(e.createDate)

                    });
                    this.factors.push(...res)
                } else this.factorsIsFinished = true
            },
            onLoadChange: (load) => {
                this.factorsLoading = load
            }
        });

    }
}
