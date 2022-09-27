import { Repository } from "@/core/repository/repository";
import { FollowRepository } from "@/core/repository/follow.repository";

export class followingState extends Repository {
    followings = []
    foldersLoading = false

    getFollowing(body) {
        FollowRepository.getInstance().GetFollowings({
            body: body,
            onReceive: (res) => {
                this.followings = res
            },
            onLoadChange: (load) => { this.foldersLoading = load }
        })
    }

}