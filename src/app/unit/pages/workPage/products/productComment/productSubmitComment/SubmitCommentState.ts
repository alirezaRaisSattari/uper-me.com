import { getSelectedPageId } from "@/core/service/utils.service"
import { ToastService } from "@/core/service/toast.service";
import router from "@/core/router/router";
import { i18n } from "@/main";
import { ProductRepository } from "@/core/repository/product.repository";
import { ProductCommentRepository } from "@/core/repository/productComment.repository"

export class SubmitCommentState {
    faceScore = 1
    TPageId = 0
    positiveViews = []
    positiveViewsVal = []
    negativeViews = []
    negativeViewsVal = []
    opinionTextBox = ''
    srcId = getSelectedPageId()   /// + or  -
    targetId = null
    parentId = null
    scoreItem1 = 2.5
    scoreItem2 = 2.5
    scoreItem3 = 2.5
    scoreItem4 = 2.5
    scoreItem5 = 2.5
    fullPage = null;
    positiveView = ''
    negativeView = ''
    createLoading = false
    productId = null
    workPageId = null
    fullPageLoading = false
    fullProduct = null
    productConsult = null;

    fullPageUserName = ''

    addCommentPos(item) {
        if (item.length == 0) return
        let findIndex = this.positiveViews.map(e => e.value).indexOf(item);

        if (findIndex == -1) {
            this.positiveViewsVal.push(item)
            this.positiveViews.push({ value: item })
        }

    }

    deleteCommentPos(index) {
        this.positiveViews.splice(index, index + 1)

    }

    addCommentNeg(item) {
        if (item.length == 0) return
        let findIndex = this.negativeViews.map(e => e.value).indexOf(item);
        if (findIndex == -1) {
            this.negativeViews.push({ value: item })
            this.negativeViewsVal.push(item)
        }

    }

    deleteCommentNeg(index) {
        this.negativeViews.splice(index, index + 1)

    }

    // getFullPage(){
    //
    //     UserRepository.getInstance().getFullPage({
    //         body:{
    //             myPageId: getSelectedPageId(),
    //             username:this.fullPageUserName
    //         },
    //         onReceive:(res)=>{
    //             this.fullPage=res
    //
    //             this.targetId=this.fullPage.id
    //
    //         }
    //     })
    // }

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
            }
        })
    }

    createComment() {

        ProductCommentRepository.getInstance().createComment({
            body: {
                parentId: null,
                sourcePageId: this.srcId,
                targetPageId: this.TPageId,
                productId: Number(this.productId),
                consultProductId: Number(this.productId),
                scoreItem: {
                    scoreItem1: this.scoreItem1,
                    scoreItem2: this.scoreItem2,
                    scoreItem3: this.scoreItem3,
                    scoreItem4: this.scoreItem4,
                    scoreItem5: this.scoreItem5
                },
                text: this.opinionTextBox,
                faceScore: this.faceScore,
                positivePoints: this.positiveViewsVal.length != 0 ? this.positiveViewsVal : null,
                negativePoints: this.negativeViewsVal.length != 0 ? this.negativeViewsVal : null,
            },

            onLoadChange: (loadStatus) => {
                this.createLoading = loadStatus
            },
            onReceive: (res) => { /// returns comment id

                if (res != null) {

                    ToastService.getInstance().success(i18n.global.tc('missionAccomplished'))
                    router.push(`/page/productComment/${this.productId}/${this.workPageId}`)
                }
            }
        })
    }
}
