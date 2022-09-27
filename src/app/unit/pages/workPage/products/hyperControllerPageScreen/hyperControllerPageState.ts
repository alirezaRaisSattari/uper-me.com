import { ProductRepository } from "@/core/repository/product.repository";
import { scrollToTop } from "@/core/service/scroll.service";
import { getSelectedPageId, WindowLoading } from "@/core/service/utils.service";
import { hyperControllerModel, hyperProductModel } from "@/data/city/product/product.model";
import { useRoute } from "vue-router";

export class hyperControllerPageState {
    route = useRoute();
    headListHyper = [
        { src: 'mavvadQazaei', id: 186 },
        { src: 'proteini', id: 185 },
        { src: 'labaniat', id: 184 },
        { src: 'vegetables', id: 179 },
        { src: 'noshidani', id: 187 },
        { src: 'conserv', id: 183 },
        { src: 'shoyande', id: 180 },
        { src: 'shirini', id: 181 },
        { src: 'attari', id: 417 },
        { src: 'lavazemMasrafiVaFarhangi', id: 190 },
    ]
    hyperList = <hyperControllerModel[]>[];
    paginat = {
        main: 0,
        sub: 0,
        underSub: 0,
        loading: false
    }

    selectedHeadCategory = this.headListHyper[0];
    listSubCategories = [];
    listUnderSub = [];
    selectedSub = null;
    selectedUnderSub = null;

    products = <hyperProductModel[]>[];

    getHyperProducts() {
        scrollToTop();
        ProductRepository.getInstance().getHyperProducts({
            body: {
                skip: 0,
                take: 1000,
                myPageId: getSelectedPageId(),
                workPageId: this.route.params.wpid,
                categoryId: 274,
                requestTime: new Date
            }, onReceive: (res: hyperControllerModel[]) => {
                this.hyperList = res;

                this.paginat.loading = false;
            }, onError: (err) => {
            }
        })
    }

    getSubCategories(item) {
        this.selectedHeadCategory = item;
        WindowLoading.value = true;
        scrollToTop();
        ProductRepository.getInstance().getSubCategoryByLevel({
            body: {
                level: 4,
                id: item.id
            }, onReceive: (res) => {
                WindowLoading.value = false;
                this.listSubCategories = res;
                this.selectedSub = res[0];
                this.getUnderSub(res[0]);
                this.paginat.loading = false;
            }, onError: (err) => {
                WindowLoading.value = false;
            }
        })
    }

    getUnderSub(item) {
        this.selectedSub = item;
        WindowLoading.value = true;
        scrollToTop();
        ProductRepository.getInstance().getCategoryByLevel({
            body: {
                level: 5,
                id: item.categoryId
            }, onReceive: (res) => {
                WindowLoading.value = false;
                this.listUnderSub = res;
                this.selectedUnderSub = res[0];

                this.getAllProducts(res[0]);
                this.paginat.loading = false;

            }, onError: (err) => {
                WindowLoading.value = false;
            }
        })
    }

    getAllProducts(item) {
        this.selectedUnderSub = item;
        scrollToTop();
        ProductRepository.getInstance().getHyperProducts({
            body: {
                skip: 0,
                take: 1000,
                myPageId: getSelectedPageId(),
                workPageId: this.route.params.wpid,
                categoryId: item.categoryId,
                requestTime: new Date
            }, onReceive: (res: hyperProductModel[]) => {
                this.products = res;
                this.paginat.loading = false;

            }
        })
    }
}
