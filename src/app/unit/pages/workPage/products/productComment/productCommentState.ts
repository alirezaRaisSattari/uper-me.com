import { getSelectedPageId } from "@/core/service/utils.service"
import { ProductRepository } from "@/core/repository/product.repository"
import { ProductCommentRepository } from "@/core/repository/productComment.repository"

export class productCommentState {
    userName = null
    fullProduct = null;
    productConsult = null;
    allComments = []
    scoreItemsDetail = null
    filterType = 1
    faceScore = null
    scoreLoading = true
    fullPageLoafing = false
    allCommentsLoading = false
    commentsFinished = false;
    commentsLoading = false
    skip = 0
    take = 10
    isNull: Boolean
    fullPageLoading = false
    productId = null
    productType = null
    workPageId = null
    numberOfCalls = 0

    getProductById() {
        ProductRepository.getInstance().getProductById({
            body: {
                productId: this.productId,
                workPageId: this.workPageId,
                myPageId: getSelectedPageId(),
            },
            onLoadChange: (loadStatus) => {
                this.fullPageLoading = loadStatus
            },
            onReceive: (res) => {
                this.fullProduct = res
                this.productConsult = this.fullProduct.result.productConsult
                this.GetWorkPageScoreItemByIdMoreDetails()
                this.getAllComments(true)

            }
        })
    }

    getAllComments(emptyList) {
        this.numberOfCalls++
        if (emptyList == true) this.allComments = []

        if (this.allCommentsLoading || this.commentsFinished || this.fullPageLoading) {
            return;
        }
        this.allCommentsLoading = true

        ProductCommentRepository.getInstance().getAllComments({
            body: {
                skip: this.skip,
                take: this.take,
                productId: this.fullProduct.productType == 14 ? null : Number(this.productId),
                consultProductId: this.fullProduct.productConsult ?? Number(this.productId),
                myPageId: getSelectedPageId(),
                filterType: Number(this.filterType),
                faceScore: this.faceScore == null ? null : Number(this.faceScore),
                requestTime: new Date()
            },
            onLoadChange: (loadStatus) => {
                this.commentsLoading = loadStatus
            },
            onReceive: (res) => {

                this.isNull = res == null;
                if (Array.isArray(res)) {
                    this.allComments.push(...res);
                    if (this.take > res.length) {
                        this.commentsFinished = true;
                        this.allCommentsLoading = false
                    }
                    if (res.length == this.take) {
                        this.skip += this.take;
                        this.allCommentsLoading = false
                    }
                    this.allCommentsLoading = false
                }
            }
        })
    }

    GetWorkPageScoreItemByIdMoreDetails() {
        ProductCommentRepository.getInstance().GetWorkPageScoreItemByIdMoreDetails({
            urlContent: Math.abs(this.productId),
            onLoadChange: (loadStatus) => {
                this.scoreLoading = loadStatus
            },
            onReceive: (res) => {
                this.scoreItemsDetail = res
            }
        })
    }

}
