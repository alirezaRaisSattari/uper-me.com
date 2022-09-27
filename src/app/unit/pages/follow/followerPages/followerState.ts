import { FollowRepository } from "@/core/repository/follow.repository";
import { Repository } from "@/core/repository/repository";

export class followerState extends Repository {
    followersFolderList = []
    foldersLoading: boolean

    GetFollowerFolder(body) {
        FollowRepository.getInstance().GetFollowerFolder({
            body: body,
            onReceive: (res) => {
                if (Array.isArray(res)) {
                    this.followersFolderList.push(...res)
                }
            },
            onLoadChange: (load) => { this.foldersLoading = load }
        })
    }

    CreateFolder(body) {
        FollowRepository.getInstance().CreateFolder({
            body: body,
            onReceive: (res) => {
                this.followersFolderList.unshift({ folderTitle: body.title, followers: [], folderId: res.folderId })
            }
        })
    }

}