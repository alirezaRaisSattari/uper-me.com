import { FollowRepository } from "@/core/repository/follow.repository";
import { Repository } from "@/core/repository/repository";

export class followingState extends Repository {
    followingFolderList = []
    foldersLoading: boolean

    GetFollowingFolder(body) {
        FollowRepository.getInstance().GetFollowingFolder({
            body: body,
            onReceive: (res) => {
                if (res) {
                    this.followingFolderList.push(...res)
                }
            },
            onLoadChange: (load) => { this.foldersLoading = load }
        })
    }

    CreateFolder(body) {
        FollowRepository.getInstance().CreateFolder({
            body: body,
            onReceive: (res) => {
                this.followingFolderList.unshift({ folderTitle: body.title, followings: [], folderId: res.folderId })
            }
        })
    }

}