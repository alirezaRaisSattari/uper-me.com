import {UserRepository} from "@/core/repository/user.repository"
import {PageCommentRepository} from "@/core/repository/pageComment.repository"
import {getSelectedPageId} from "@/core/service/utils.service"
import { EnumKeys } from "@/core/constant/constant";
import { LocalStorageService } from "@/core/service/localStorage.service";

export class workPageCommentState {
    userName = null
    fullPage = null;
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

    numberOfCalls = 0

    getFullPage() {
        UserRepository.getInstance().getFullPage({
            body: {
                myPageId: getSelectedPageId(),
                username: this.userName
            },
            onLoadChange: (loadStatus) => {
                this.fullPageLoading = loadStatus
            },
            onReceive: (res) => {
                // LocalStorageService.getInstance().setItem(EnumKeys.KeyMainPage, JSON.stringify(res))
                this.fullPage = res
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

        PageCommentRepository.getInstance().getAllComments({
            body: {
                skip: this.skip,
                take: this.take,
                targetPageId: this.fullPage.id,
                myPageId: getSelectedPageId(),
                filterType: Number(this.filterType),
                faceScore: this.faceScore == null ? null : Number(this.faceScore),
                requestTime: new Date()
            },
            onLoadChange: (loadStatus) => {
                this.commentsLoading = loadStatus
            },

            onReceive: (res) => {

                if (res == null)
                    this.isNull = true
                else this.isNull = false
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
        PageCommentRepository.getInstance().GetWorkPageScoreItemByIdMoreDetails({
            urlContent: Math.abs(getSelectedPageId()),
            onLoadChange: (loadStatus) => {
                this.scoreLoading = loadStatus
            },
            onReceive: (res) => {
                this.scoreItemsDetail = res

            }
        })
    }

}


