import { FollowRepository } from "@/core/repository/follow.repository";
import { Repository } from "@/core/repository/repository";

export class followerState extends Repository {
    followers = []
    foldersLoading = false

    getFollower(body) {
        FollowRepository.getInstance().GetFollowers({
            body: body,
            onReceive: (res) => {
                this.followers = res
            },
            onLoadChange: (load) => { this.foldersLoading = load }
        })
    }

}