import {BASE_TAKE} from "@/core/constant/constant";
import {ProductRepository} from "@/core/repository/product.repository";
import {createPageAmazingPropModel} from "@/data/city/product/product.model";

export class plansState {
    skipNum = 0;
    loadingPlans = false
    planIsFinished = false
    isNull: Boolean
    allPlans = null

    getAllPlans(body) {
        if (this.loadingPlans || this.planIsFinished) return;
        this.loadingPlans = true
        body.skip = this.skipNum
        ProductRepository.getInstance().getAmazingPlan({
            body: body,
            onReceive: (res) => {
                this.allPlans = null
                if (res == null)
                    this.isNull = true
                else this.isNull = false
                if (Array.isArray(res)) {
                    this.allPlans = res;
                    if (BASE_TAKE > res.length)
                        this.planIsFinished = true
                    if (res.length == BASE_TAKE) {
                        this.skipNum += BASE_TAKE;
                    }
                    this.loadingPlans = false
                }
            }
        })
    }

    createPageAmazingProp(body, created: Function) {
        ProductRepository.getInstance().createPageAmazingProp({
            body: <createPageAmazingPropModel>{...body},
            onReceive: (res) => {
                created()

            }

        })

    }
}
