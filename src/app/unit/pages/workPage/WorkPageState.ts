import {FollowRepository} from "@/core/repository/follow.repository";
import {getSelectedPageId} from "@/core/service/utils.service";
import {ScoreItemDetails} from "@/data/city/workpage/pagcomment.model";

export class WorkPageState {

    loadingScoreItem = false
    loadScoreItemHasError = false
    scoreItemDetails: ScoreItemDetails = null
    isChangingFollowStatus = false


    scoreItemAverage(): number {
        let x = 0
        x += this.scoreItemDetails.scoreItem1 ?? 0
        x += this.scoreItemDetails.scoreItem2 ?? 0
        x += this.scoreItemDetails.scoreItem3 ?? 0
        x += this.scoreItemDetails.scoreItem4 ?? 0
        x += this.scoreItemDetails.scoreItem5 ?? 0
        return x / 5
    }

    newFollow(userData) {
        FollowRepository.getInstance().newFollow({
            body: {
                sourcePageId: getSelectedPageId(),
                targetPageId: -Math.abs(userData.id),
            }, onLoadChange: (val) => this.isChangingFollowStatus = val,
            onReceive: () => {
                userData.isIFollowHim = true;
                userData.followerCount += 1;
            }
        })
    }

    unFollow(userData) {
        FollowRepository.getInstance().unFollow({
            body: {
                sourcePageId: getSelectedPageId(),
                targetPageId: -Math.abs(userData.id),
            }, onLoadChange: (val) => this.isChangingFollowStatus = val,
            onReceive: () => {
                userData.isIFollowHim = false;
                userData.followerCount -= 1;
            }
        })
    }

    block(userData) {
        FollowRepository.getInstance().block({
            body: {
                sourcePageId: getSelectedPageId(),
                targetPageId: -Math.abs(userData.id),
            }, onLoadChange: (val) => this.isChangingFollowStatus = val,
            onReceive: () => {
                userData.isIBlockHim = true;
                userData.isHeFollowMe = false;
                userData.isIFollowHim = false;
                userData.isRequested = false;
            }
        })
    }

    unblock(userData) {
        FollowRepository.getInstance().unblock({
            body: {
                sourcePageId: getSelectedPageId(),
                targetPageId: -Math.abs(userData.id),
            }, onLoadChange: (val) => this.isChangingFollowStatus = val,
            onReceive: () => {
                userData.isIBlockHim = false;
            }
        })
    }

    followRequest(userData) {
        FollowRepository.getInstance().followRequest({
            body: {
                sourcePageId: getSelectedPageId(),
                targetPageId: -Math.abs(userData.id),
            }, onLoadChange: (val) => this.isChangingFollowStatus = val,
            onReceive: () => {
                userData.isRequested = true;
            }
        })
    }

    cancelRequest(userData) {
        FollowRepository.getInstance().cancelRequest({
            body: {
                sourcePageId: getSelectedPageId(),
                targetPageId: -Math.abs(userData.id),
            }, onLoadChange: (val) => this.isChangingFollowStatus = val,
            onReceive: () => {
                userData.isRequested = false;
            }
        })
    }

}
