import { FollowRepository } from "@/core/repository/follow.repository";
import { StoryRepository } from "@/core/repository/story.repository";
import { getSelectedPageId } from "@/core/service/utils.service";
import { StoryModel } from "@/data/city/mainpage/story.model";

export class MainPageState {
    isFollow = false;
    isRequested = false;
    isChangingFollowStatus = false;
    stories: StoryModel[] = []
    storyLoading = false

    newFollow(userData) {
        FollowRepository.getInstance().newFollow({
            body: {
                sourcePageId: getSelectedPageId(),
                targetPageId: userData.mainPageId,
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
                targetPageId: userData.mainPageId,
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
                targetPageId: userData.mainPageId,
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
                targetPageId: userData.mainPageId,
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
                targetPageId: userData.mainPageId,
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
                targetPageId: userData.mainPageId,
            }, onLoadChange: (val) => this.isChangingFollowStatus = val,
            onReceive: () => {
                userData.isRequested = false;
            }
        })
    }

    getRecentMainPageStory(data) {
        StoryRepository.getInstance().getRecentStory(
            {
                body: data,
                onReceive: (res) => {
                    if (Array.isArray(res)) {
                        this.stories = res
                    }
                },
                onLoadChange: (load) => this.storyLoading = load
            }
        )
    }
}
