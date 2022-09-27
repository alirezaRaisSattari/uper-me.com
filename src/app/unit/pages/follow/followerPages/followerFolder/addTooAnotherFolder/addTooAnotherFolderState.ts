import {FollowRepository} from "@/core/repository/follow.repository";
import {Repository} from "@/core/repository/repository";
import {BASE_TAKE} from "@/core/constant/constant";
import {elementIdScrolledToBottom} from "@/core/service/utils.service";
import {ToastService} from "@/core/service/toast.service";
import {i18n} from "@/main";

export class addTooAnotherFolderState extends Repository {
    followerFolderList = []
    foldersLoading: boolean
    loadingReply = false;
    skipNum = 0;
    repliesIsFinished = false;

    GetFollowerFolder(body) {
        if (this.loadingReply || this.repliesIsFinished) return
        this.loadingReply = true;
        body.skip = this.skipNum
        FollowRepository.getInstance().GetFollowerFolder({
            body: body,
            onReceive: (res) => {
                if (Array.isArray(res)) {
                    if (BASE_TAKE > res.length)
                        this.repliesIsFinished = true
                    if (res.length == BASE_TAKE) {
                        this.skipNum += BASE_TAKE;
                    }
                    this.followerFolderList.push(...res)
                    this.loadingReply = false
                    setTimeout(() => {
                        elementIdScrolledToBottom('scroll-follow-folder', () => {
                            this.GetFollowerFolder(body)
                        })
                    }, 10)
                }
            },
            onLoadChange: (load) => this.foldersLoading = load
        })
    }

    CreateFolder(body) {
        FollowRepository.getInstance().CreateFolder({
            body: body,
            onReceive: (res) => {
                this.followerFolderList.unshift({folderTitle: body.title, followers: [], folderId: res.folderId})
                ToastService.getInstance().success(i18n.global.tc("success"));
            }
        })
    }

    moveFollowers(body) {
        FollowRepository.getInstance().moveFollowers({
            body: body,
            onReceive: () => {
                ToastService.getInstance().success(
                    i18n.global.tc("sended")
                );
            }
        })
    }


}
