import { FactorRepository } from "@/core/repository/factor.repository"
import { getSelectedPageId } from "@/core/service/utils.service"

export class mainRebateCodeState {
    pageId = getSelectedPageId()
    allRebates = []
    showDotsDialog = false
    selectedRebate
    allRebatesLoading = false


    getAllRebates() {
        FactorRepository.getInstance().FactorOffCodeGetAll({
            body: {
                pageId: Math.abs(this.pageId),
                status: null
            },
            onReceive: (res) => {
                this.allRebates = res
            }
        })
    }

    deleteRebate() {
        FactorRepository.getInstance().FactorOffCodeDelete({
            body: {
                pageId: Math.abs(this.pageId),
                code: this.selectedRebate.code
            },
        })
    }
}
