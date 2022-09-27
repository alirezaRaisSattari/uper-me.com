import { ProductRepository } from "@/core/repository/product.repository";
import router from "@/core/router/router";
import { DataFormatterService } from "@/core/service/dataFormater.service";
import { WindowLoading } from "@/core/service/utils.service";
import { ladderProductModel } from "@/data/city/product/product.model";
import { useRoute } from "vue-router";

export class ladderProductPageState {
    route = useRoute();
    plans = <ladderProductModel[]>[];
    selectedPlan: ladderProductModel = <ladderProductModel>{}
    dialogAccount = false;

    getAllLadder() {
        const categoryId = this.route.query.catId;
        const countryId = this.route.query.countryId;
        const pId = this.route.query.pId;

        if (categoryId && countryId && pId) {
            WindowLoading.value = true;
            ProductRepository.getInstance().GetAllLadderPlans({
                body: {
                    skip: 0,
                    take: 1000,
                    categoryId: categoryId,
                    countryId: countryId,
                    currencyId: 1
                }, onReceive: (res: ladderProductModel[]) => {
                    this.plans = res;
                    WindowLoading.value = false;
                }, onError: (err) => {
                    WindowLoading.value = false;
                }
            })
        } else {
            router.back();
        }
    }

    confirmAccount(item: ladderProductModel) {
        this.selectedPlan = item;
        this.dialogAccount = true;
    }

    currencyFormatter(value) {
        return DataFormatterService.getInstance().formatCurrency(value);
    }

    onFinish() {
        // ToastService.getInstance().success(i18n.global.tc('successMassage'))

    }

}
