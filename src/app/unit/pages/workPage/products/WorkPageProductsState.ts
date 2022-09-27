import {ProductRepository} from "@/core/repository/product.repository";
import {getSelectedPageId} from "@/core/service/utils.service";
import {i18n} from "@/main";
import {BASE_TAKE} from "@/core/constant/constant";
import {GetAllProduct} from "@/data/city/product/product.model";

export class WorkPageProductsState {

    loadingProductFolders = false
    loadingProducts = false
    productsIsFinished = false
    listProductsIsEmpty = false
    showProductsHeader = true;
    searchInput = ''
    // searchSelect = {name: i18n.global.tc('all'), folderId: null}
    searchSelect = null
    workPageId = null
    model = null
    foundProducts = []
    noContent = false
    allOption = {name: i18n.global.tc('all'), folderId: null}

    skipNum = 0
    skipFilter = 0
    take = 10

    productFolders = []
    // products: GetProductModel[] = []
    products = []

    search() {
        this.showProductsHeader = false

    }

    getProductFolderByPageId(pageId) {
        ProductRepository.getInstance().getProductFolderByPageId(
            {
                body: {
                    skip: 0,
                    take: 100,
                    workPageId: Math.abs(pageId)
                },
                onReceive: (res) => {
                    if (Array.isArray(res)) {
                        this.productFolders = res
                        this.productFolders.unshift({name: i18n.global.tc('all'), folderId: null})
                        this.loadProducts(null, pageId, false);
                    }
                },
                onLoadChange: (load) => this.loadingProductFolders = load
            }
        )
    }

    changeSelect() {
        this.loadProducts(this.searchSelect, this.workPageId, false)
    }


    loadProducts(folderId: number, workPageId: number, isScroll: boolean) {
        if (this.loadingProducts) {

            return
        }
        if (this.listProductsIsEmpty && isScroll) {

            return
        }
        if (!isScroll) {

            this.skipNum = 0
            this.products = []
            this.listProductsIsEmpty = false
        }
        if (folderId == null) {

            let model = <GetAllProduct>{
                take: BASE_TAKE,
                skip: this.skipNum,
                myPageId: getSelectedPageId(),
                workPageId: Math.abs(this.workPageId),
                orderByDescending: true,
                requestTime: new Date(),
                name: this.searchInput !== '' ? this.searchInput : null,
                productType: null,
                folderId: null
            }
            if (this.searchInput.length === 0 && this.showProductsHeader === false) {
                this.getAllProducts(model);
            }

            if (this.searchInput.length >= 3 && this.showProductsHeader === false) {
                this.getAllProducts(model);
            } else if (this.showProductsHeader === true) {
                this.getAllProducts(model);
            }

        } else {
            
            let model = <GetAllProduct>{
                take: BASE_TAKE,
                skip: this.skipNum,
                myPageId: getSelectedPageId(),
                workPageId: Math.abs(this.workPageId),
                orderByDescending: true,
                requestTime: new Date(),
                name: this.searchInput !== '' ? this.searchInput : null,
                productType: null,
                folderId: folderId
            }

            if (this.searchInput.length === 0 && this.showProductsHeader === false) {
                this.getAllProducts(model);
            }

            if (this.searchInput.length >= 3 && this.showProductsHeader === false) {
                this.getAllProducts(model);
            } else if (this.showProductsHeader === true) {
                this.getAllProducts(model);
            }

        }
    }

    getAllProducts(model) {
        ProductRepository.getInstance().getAllProducts(
            {
                body: model,
                onReceive: (res) => this.afterReceivedProducts(res),
                onLoadChange: (load) => this.loadingProducts = load
            }
        )
    }

    afterReceivedProducts(res: any) {
        if (!Array.isArray(res) || res.length === 0) {
            this.listProductsIsEmpty = true
            res = []
        }
        this.products = this.products.concat(res.filter(e=> e.productStatus !== 3 || e.productStatus !== 4))
        this.skipNum = this.products.length
    }


}
