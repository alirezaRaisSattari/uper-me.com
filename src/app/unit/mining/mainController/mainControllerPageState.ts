import { AccountingRepository } from "@/core/repository/accountingRepository";
import { getSelectedPageId } from "@/core/service/utils.service";

export class mainControllerPageState {
    activityLevelValue = 0;

    getActivityLevel() {
        AccountingRepository.getInstance().CalculateActivityLevel({
            urlContent: {
                pageId:getSelectedPageId()
            },onReceive: (res) => {
                this.activityLevelValue = res;
            }
        })

    }

}
