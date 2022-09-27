import {ProductRepository} from "@/core/repository/product.repository";
import {MainEventProductModel} from "@/data/city/product/product.model";
import {useRoute} from "vue-router";

export class eventProductPageScreen {
    eventList = <MainEventProductModel[]>[];
    route = useRoute();

    getAllEvents() {
        ProductRepository.getInstance().GetAllEventPages({
            onReceive: (res: MainEventProductModel[]) => {
                this.eventList = res;
            }, onError: (err) => {
                console.log(err);
            }
        })
    }
}
