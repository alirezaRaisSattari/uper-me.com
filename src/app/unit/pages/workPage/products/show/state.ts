import { ProductRepository } from "@/core/repository/product.repository";
import { BASE_TAKE } from "@/core/constant/constant";
import { getSelectedPageId } from "@/core/service/utils.service";
import { AccountingRepository } from "@/core/repository/accountingRepository";
import { PropRepository } from "@/core/repository/prop.repository";
import { ToastService } from "@/core/service/toast.service";
import { i18n } from "@/main";
import { ProductCommentRepository } from "@/core/repository/productComment.repository";

export class ProductState {
    product = null
    props = null
    likeLoading = false
    newProducts = null
    popularProducts = null
    bestSellProducts = null
    comments = null

    isProductReceived = false;
    isPropsReceived = false;
    isNewProductsReceived = false;
    isPopularProductsReceived = false;
    isBestSellProductsReceived = false;
    iscommentsReceived = false;

    skip = 0
    take = 100

    getProductById(productId, workPageId, myPageId) {
        ProductRepository.getInstance().getProductById(
            {
                body: {
                    productId: Number(productId),
                    workPageId: Number(workPageId),
                    myPageId: Number(myPageId),
                },
                onReceive: res => {
                    if (res != null) {
                        this.isProductReceived = true
                        this.product = res
                        this.getProductProps({
                            skip: 0,
                            take: BASE_TAKE,
                            myPageId: Math.abs(getSelectedPageId()),
                            workpageId: this.product.result.workPageId,
                            productId: productId,
                            productType: this.product.result.productType,
                            requestTime: new Date(),
                        })

                        this.getPopularProducts({
                            skip: this.skip,
                            take: this.take,
                            workPageId: this.product.result.workPageId,
                            myPageId: getSelectedPageId(),
                            productType: this.product.result.productType,
                            categoryId: this.product.result.categoryId,
                            requestTime: new Date()
                        })

                        this.getNewProducts({
                            skip: this.skip,
                            take: this.take,
                            workPageId: this.product.result.workPageId,
                            myPageId: getSelectedPageId(),
                            productType: this.product.result.productType,
                            categoryId: this.product.result.categoryId,
                            requestTime: new Date()
                        })

                        this.getBestSellingProducts({
                            skip: 0,
                            take: 100,
                            workPageId: this.product.result.workPageId,
                            myPageId: getSelectedPageId(),
                            productType: this.product.result.productType,
                            categoryId: this.product.result.categoryId,
                            requestTime: new Date(),
                        })
                        if (this.product.result.productConsult != null)
                            this.getComments({
                                skip: 0,
                                take: 5,
                                productId:
                                    parseInt(productId) === 14 ? null : parseInt(productId),
                                consultProductId: parseInt(this.product.result.productConsult),
                                myPageId: Math.abs(getSelectedPageId()),
                                filterType: 1,
                                faceScore: null,
                                requestTime: new Date(),
                            })

                    }
                },
                onLoadChange: loadStatus => {
                    if (!loadStatus) this.product = null
                    this.isProductReceived = loadStatus
                }
            }
        )
    }

    getProductProps(body) {
        ProductRepository.getInstance().GetProductProps({
            body: { ...body },
            onLoadChange: (load) => {
                if (!load) this.props = null
                this.isPropsReceived = load
            },
            onReceive: (res) => {
                if (res != null) {
                    this.props = res
                }
            }
        })
    }

    calculateWage(body, calculated: Function) {
        AccountingRepository.getInstance().CalculateWageBonus({
            body: body,
            onReceive: (res) => {
                calculated(res.value)
            }
        })
    }

    deleteProp(workPageId, propId) {
        PropRepository.getInstance().deleteProp({
            urlContent: {
                workPageId: Math.abs(workPageId),
                propId: propId
            }, onReceive: (res => {
                ToastService.getInstance().success(i18n.global.tc('deleted'));
            })
        })
    }

    getPopularProducts(body) {
        ProductRepository.getInstance().GetPopularProducts({
            body: body,
            onLoadChange: (loadStatus) => {
                this.isPopularProductsReceived = loadStatus
            },
            onReceive: (res) => {
                if (res !== null)
                    this.popularProducts = res
            }
        })
    }

    getNewProducts(body) {
        ProductRepository.getInstance().GetNewProducts({
            body: body,
            onLoadChange: (loadStatus) => {
                this.isNewProductsReceived = loadStatus
            },
            onReceive: (res) => {
                if (res !== null)
                    this.newProducts = res
            }
        })
    }

    getBestSellingProducts(body) {
        ProductRepository.getInstance().GetBestSellerProducts({
            body: body,
            onLoadChange: (load) => {
                this.isBestSellProductsReceived = load
            },
            onReceive: (res) => {
                if (res !== null)
                    this.bestSellProducts = res
            }
        })
    }

    getComments(body) {
        ProductCommentRepository.getInstance().GetAllComments({
            body: body,
            onReceive: (res) => {
                if (res !== null)
                    this.comments = res
            },
            onLoadChange: loadStatus => this.iscommentsReceived = loadStatus
        })
    }
    like(body) {
        ProductRepository.getInstance().Like({
            body: { ...body },
            onLoadChange: (load) => {
                this.likeLoading = load
            }
        })
    }

    unLike(body) {
        ProductRepository.getInstance().UnLike({
            body: { ...body },
        })
    }
}
