import { getSelectedPageId } from "@/core/service/utils.service";
import { FactorRepository } from "@/core/repository/factor.repository";
import { DateService } from "@/core/service/date.service";

export class UpdateRebateCodeState {
    pageId = getSelectedPageId()
    allRebates = []
    showDotsDialog = false
    selectedRebate
    offCodeName = null
    percent = null
    minimumFactorPrice = null
    maximumOffValue = null
    quanitity = null
    status = true
    expireddAt = []
    time = null
    workPageId = null
    singleRebate = null
    code = null
    date = null


    getSingleRebate() {
        const dateService = new DateService();
        FactorRepository.getInstance().FactorOffCodeGetSingle({
            body: {
                workPageId: this.workPageId,
                code: this.code
            },
            onReceive: (res) => {
                this.selectedRebate = res[0]
                this.expireddAt = dateService.convertToJalali(this.selectedRebate.expireddAt, true).split(" ")
                this.date = DateService.getInstance().convertJalaliToGregorian(this.expireddAt[0])
            }
        })
    }

    updateRebateCode() {

        FactorRepository.getInstance().FactorOffCodeUpdate({
            body: {
                code: this.code,
                pageId: this.pageId,
                status: this.status == true ? 1 : 2,
                title: this.selectedRebate.title,
                percent: this.selectedRebate.percent,
                minimumFactorPrice: this.selectedRebate.minimumFactorPrice,
                maximumOffValue: this.selectedRebate.maximumOffValue,
                quanitity: this.selectedRebate.usedCount,
                expiredAt: DateService.getInstance().getDateWithTime(this.date, this.time),

            },
        })
    }
}
