import {ProductRepository} from "@/core/repository/product.repository"
import {getSelectedPageId, slugify} from "@/core/service/utils.service"
import router from "../../../../../core/router/router";
import {ToastService} from "@/core/service/toast.service";
import {i18n} from "@/main";

export class upgradeProductState {
    skip = 0
    take = 10
    mainEventPage = null
    pageEventLoading = false;
    selectedPlan = null
    selectedAccount = null
    showPassWordModal = false
    passWord = null
    productId = null
    navigate = false
    pageId = null
    plans = []

    GetEventPagePlanItems(eventPageId) {
        ProductRepository.getInstance().GetEventPagePlanItems({
            urlContent: `${eventPageId}/${this.skip}/${this.take}`,
            onReceive: (res) => {

                this.plans = res
                this.GetEventPageById(eventPageId)
            }
        })
    }


    GetEventPageById(eventPageId) {

        ProductRepository.getInstance().GetEventPageById({
            body: [eventPageId],
            onLoadChange: (loadStatus) => this.pageEventLoading = loadStatus,
            onReceive: (res) => {

                this.mainEventPage = res[0]
            }
        })
    }

    CreateEventProduct() {

        ProductRepository.getInstance().CreateEventProduct({
            body: {
                eventPageId: this.mainEventPage.eventPageId,
                buyerWorkPageId: Math.abs(getSelectedPageId()),
                currencyId: this.selectedPlan.currencyId,
                accountNumber: this.selectedAccount.accountNumber,
                password: this.passWord,
                place: this.selectedPlan.place,
                planId: this.selectedPlan.planId,
                productId: Number(this.productId)
            },
            onReceive: (res) => {


                if (res != null) {
                    router.push({path: `/product/${this.productId}/${this.pageId}/${slugify('')}`})
                    ToastService.getInstance().success(i18n.global.tc('missionAccomplished'))
                }
            }
        })
    }


}
