import {FollowRepository} from "@/core/repository/follow.repository";
import {Repository} from "@/core/repository/repository";
import {getFollowingInFolder} from "@/data/city/mainpage/follow.model";
import {BASE_TAKE} from "@/core/constant/constant";
import router from "@/core/router/router";
import {ToastService} from "@/core/service/toast.service";
import {i18n} from "@/main";

export class followingFolderState extends Repository {
    folderInfoList = []
    folderName = '';
    followingLoading = false;
    skipNum = 0;
    followingIsFinished = false;
    openConfirmDialog = false

    GetFollowingFolderInfo(body) {
        body.skip = this.skipNum
        FollowRepository.getInstance().GetFollowingFolderInfo({
            body: <getFollowingInFolder>{...body},
            onReceive: (res) => {
                if (Array.isArray(res)) {
                    if (BASE_TAKE > res.length)
                        this.followingIsFinished = true
                    if (res.length == BASE_TAKE) {
                        this.skipNum += BASE_TAKE;
                    }
                    res.map((e) => {
                        e.select = false
                    })
                    this.folderInfoList.push(...res)
                } else this.followingIsFinished = true
            },
            onLoadChange: (load) => {
                this.followingLoading = load
            }
        })
    }

    unFollow(body, indexForDelete) {
        FollowRepository.getInstance().unFollow({
            body: body,
            onError: () => {
                this.openConfirmDialog = false
            },
            onReceive: () => {
                this.openConfirmDialog = false
                ToastService.getInstance().success(i18n.global.tc("unfollowed"));
                this.folderInfoList.splice(indexForDelete, 1);
            },
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
            onLoadChange: (load) => {
            }
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
