import {FollowRepository} from "@/core/repository/follow.repository";
import {Repository} from "@/core/repository/repository";
import router from "@/core/router/router";
import {Constant} from "@/core/constant/constant";
import {ToastService} from "@/core/service/toast.service";
import {i18n} from "@/main";

export class followerFolderState extends Repository {
    folderInfoList = []
    followerLoading = false;
    folderName = "";
    skipNum = 0;
    repliesIsFinished = false;
    deleteLoading = false;
    openConfirmDialog = false

    GetFollowerFolderInfo(body) {

        if (this.followerLoading || this.repliesIsFinished) return
        body.skip = this.skipNum
        FollowRepository.getInstance().GetFollowerFolderInfo({
            body: body,
            onReceive: (res) => {
                if (Array.isArray(res)) {
                    if (Constant.TAKE_20 > res.length)
                        this.repliesIsFinished = true
                    if (res.length == Constant.TAKE_20) {
                        this.skipNum += Constant.TAKE_20;
                    }
                    res.map((e) => {
                        e.select = false
                    })
                    this.folderInfoList.push(...res)
                } else this.repliesIsFinished = true
            },
            onLoadChange: (load) => {
                this.followerLoading = load
            }
        })
    }

    deleteFollower(body, indexForDelete) {
        FollowRepository.getInstance().deleteFollower({
            body: body,
            onError: () => {
                this.openConfirmDialog = false
            },
            onReceive: () => {
                this.openConfirmDialog = false
                ToastService.getInstance().success(i18n.global.tc("delete accomplished"));
                this.folderInfoList.splice(indexForDelete, 1);
            }
        })
    }

    deleteFolder(folderId, myPageId) {
        FollowRepository.getInstance().deleteFolder({
            urlContent: {
                id: folderId,
                PageId: myPageId
            },
            onReceive: () => {
                ToastService.getInstance().success(i18n.global.tc("delete accomplished"));
                router.back();
            },
            onLoadChange: (load) => this.deleteLoading = load
        })
    }

    editFolder(body) {
        FollowRepository.getInstance().editFolder({
            body: body,
            onReceive: () => {
                this.folderName = body.title
            }
        })
    }

}
