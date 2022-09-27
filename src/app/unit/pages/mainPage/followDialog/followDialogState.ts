import {FollowRepository} from "@/core/repository/follow.repository";
import {Repository} from "@/core/repository/repository";
import {BASE_TAKE} from "@/core/constant/constant";
import {elementIdScrolledToBottom} from "@/core/service/utils.service";

export class followDialogState extends Repository {
    followingFolderList = []
    foldersLoading: boolean
    loadingReply = false;
    skipNum = 0;
    repliesIsFinished = false;

    GetFollowingFolder(body) {
        if (this.loadingReply || this.repliesIsFinished) return
        this.loadingReply = true;
        body.skip = this.skipNum
        FollowRepository.getInstance().GetFollowingFolder({
            body: body,
            onReceive: (res) => {
                if (Array.isArray(res)) {
                    if (BASE_TAKE > res.length)
                        this.repliesIsFinished = true
                    if (res.length == BASE_TAKE) {
                        this.skipNum += BASE_TAKE;
                    }
                    this.followingFolderList.push(...res)
                    this.loadingReply = false
                    setTimeout(() => {
                        elementIdScrolledToBottom('scroll-follow-folder', () => {
                            this.GetFollowingFolder(body)
                        })
                    }, 10)
                }
            },
        })
    }

    CreateFolder(body) {
        FollowRepository.getInstance().CreateFolder({
            body: body,
            onReceive: (res) => {
                this.followingFolderList.unshift({folderTitle: body.title, followings: []})

            }
        })
    }

    moveFollowings(body) {
        FollowRepository.getInstance().moveFollowings({
            body: body,
        })
    }

}