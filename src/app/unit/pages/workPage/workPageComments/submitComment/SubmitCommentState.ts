import {PageCommentRepository} from "@/core/repository/pageComment.repository"
import {getSelectedPageId} from "@/core/service/utils.service"
import {ToastService} from "@/core/service/toast.service";
import router from "@/core/router/router";
import {UserRepository} from "@/core/repository/user.repository"
import {i18n} from "@/main";
import { EnumKeys } from "@/core/constant/constant";
import { LocalStorageService } from "@/core/service/localStorage.service";

export class SubmitCommentState {
    faceScore = 1
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

    fullPageUserName = ''

    addCommentPos(item) {
        if (item.length == 0) return
        let findIndex = this.positiveViews.map(e => e.value).indexOf(item);
        if (findIndex == -1) {
            this.positiveViewsVal.push(item)
            this.positiveViews.push({value: item})
        }

    }

    deleteCommentPos(index) {
        this.positiveViews.splice(index, index + 1)

    }

    addCommentNeg(item) {
        if (item.length == 0) return
        let findIndex = this.negativeViews.map(e => e.value).indexOf(item);
        if (findIndex == -1) {
            this.negativeViews.push({value: item})
            this.negativeViewsVal.push(item)
        }

    }

    deleteCommentNeg(index) {
        this.negativeViews.splice(index, index + 1)

    }

    getFullPage() {

        UserRepository.getInstance().getFullPage({
            body: {
                myPageId: getSelectedPageId(),
                username: this.fullPageUserName
            },
            onReceive: (res) => {
                // LocalStorageService.getInstance().setItem(EnumKeys.KeyMainPage, JSON.stringify(res))
                this.fullPage = res

                this.targetId = this.fullPage.id

            }
        })
    }

    createComment() {

        PageCommentRepository.getInstance().createComment({
            body: {
                parentId: null,
                sourcePageId: this.srcId,
                targetPageId: this.targetId,
                scoreItem: {
                    scoreItem1: this.scoreItem1,
                    scoreItem2: this.scoreItem2,
                    scoreItem3: this.scoreItem3,
                    scoreItem4: this.scoreItem4,
                    scoreItem5: this.scoreItem5
                },
                text: this.opinionTextBox,
                faceScore: this.faceScore,
                positivePoints: this.positiveViewsVal,
                negativePoints: this.negativeViewsVal,

            },
            onLoadChange: (loadStatus) => {
                this.createLoading = loadStatus
            },
            onReceive: (res) => { /// returns comment id

                if (res != null) {

                    ToastService.getInstance().success(i18n.global.tc('missionAccomplished'))
                    router.push(`/page/workPageComment/${this.fullPageUserName}`)
                }
            }
        })
    }
}
