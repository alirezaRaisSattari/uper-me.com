import {ProductRepository} from "@/core/repository/product.repository"
import {getSelectedPageId} from "@/core/service/utils.service";

export class productSwiperState {
    newProducts
    loading = false


    getProducts() {
        ProductRepository.getInstance().GetSuggestionProduct({
            body: {
                pageID: getSelectedPageId()
            },
            onReceive: (res) => {
                this.newProducts = res
            },
            onLoadChange: (load) => {
                this.loading = load
            }
        })
    }
}
