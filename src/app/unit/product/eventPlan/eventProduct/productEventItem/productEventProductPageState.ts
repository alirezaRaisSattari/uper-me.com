import {ProductRepository} from "@/core/repository/product.repository";
import {eventPagePlanItemModel, MainEventProductModel} from "@/data/city/product/product.model";
import {useRoute} from "vue-router";

export class productEventPageState {
    route = useRoute();
    selectedEvent: MainEventProductModel = <MainEventProductModel>{};
    eventLists: eventPagePlanItemModel[] = <eventPagePlanItemModel[]>[];

    getSelectedPlan() {
        ProductRepository.getInstance().GetEventPageById({
            body: [this.route.params.eventPageId],
            onReceive: (res: MainEventProductModel) => {
                this.selectedEvent = res;
                this.GetEventPagePlanItems();
            }, onError: (err) => {
                console.log(err);
            }
        })
    }

    GetEventPagePlanItems() {
        ProductRepository.getInstance().GetEventPagePlanItems({
            urlContent: `${this.route.params.eventPageId}/0/1000`,
            onReceive: (res: eventPagePlanItemModel[]) => {
                this.eventLists = res;
            }, onError: (err) => {
                console.log(err);
            }
        })
    }
}
