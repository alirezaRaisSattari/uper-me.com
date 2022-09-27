import {BASE_TAKE} from "@/core/constant/constant";
import {ProductRepository} from "@/core/repository/product.repository";
import {getProductLikers} from "@/data/city/product/product.model";

export class GetLikers {
    skipNum = 0;
    loadingLikers = false
    likersIsFinished = false
    isNull: Boolean
    allLikers = []

    getLikers(body) {
        if (this.loadingLikers || this.likersIsFinished) return;
        this.loadingLikers = true
        body.skip = this.skipNum
        ProductRepository.getInstance().GetLikers({
            body: <getProductLikers>{...body},
            onReceive: (res) => {
                this.allLikers = null
                this.isNull = res == null;
                if (Array.isArray(res)) {
                    this.allLikers = res;
                    if (BASE_TAKE > res.length)
                        this.likersIsFinished = true;
                    if (res.length == BASE_TAKE) {
                        this.skipNum += BASE_TAKE;
                    }
                    this.loadingLikers = false
                }
            }
        })
    }
}
