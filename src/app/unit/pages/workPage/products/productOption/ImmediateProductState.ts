import { BASE_TAKE } from "@/core/constant/constant";
import { ProductRepository } from "@/core/repository/product.repository";

export class ImmediatePlans {
    skipNum = 0;
    loadingPlans = false
    plansFinished = false
    allplans = null
    isNull: Boolean

    getPlans(body) {
        if (this.loadingPlans || this.plansFinished) return;
        this.loadingPlans = true
        body.skip = this.skipNum

        ProductRepository.getInstance().GetAllImmediatePlans({
            body: body,
            onReceive: (res) => {
                this.allplans = null
                if (res == null)
                    this.isNull = true
                else this.isNull = false
                if (Array.isArray(res)) {
                    this.allplans = res;
                    if (BASE_TAKE > res.length)
                        this.plansFinished = true
                    if (res.length == BASE_TAKE) {
                        this.skipNum += BASE_TAKE;
                    }
                    this.loadingPlans = false
                }
            }
        })
    }

}
