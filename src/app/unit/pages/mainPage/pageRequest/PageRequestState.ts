import {FollowRepository} from "@/core/repository/follow.repository";
import {Repository} from "@/core/repository/repository";
import {BASE_TAKE} from "@/core/constant/constant";

export class followingState extends Repository {
    requests = [];
    users = [];
    foldersLoading: boolean;
    skipNum = 0;

    GetRequests(body) {
        body.skip = this.skipNum
        FollowRepository.getInstance().GetRequests({
            body: body,
            onReceive: (res) => {
                if (Array.isArray(res)) {
                    if (BASE_TAKE > res.length)
                    if (res.length == BASE_TAKE) {
                        this.skipNum += BASE_TAKE;
                    }
                    console.log(res,'sss')
                    res.forEach((e) => {
                        this.users.push({
                            pageId: Math.abs(e.sourcePageId),
                        });
                    });
                    this.requests.push(...res)
                }
            },
            onLoadChange: (load) => (this.foldersLoading = load),
        });
    }

    RejectRequest(body) {
        FollowRepository.getInstance().RejectRequest({
            body: body,
            onReceive: (res) => {
                this.requests.splice(body.index, 1);
            },
            onLoadChange: (load) => (this.foldersLoading = load),
        });
    }

    acceptRequest(body) {
        FollowRepository.getInstance().acceptRequest({
            body: body,
            onReceive: (res) => {
                this.requests.splice(body.index, 1);
            },
            onLoadChange: (load) => (this.foldersLoading = load),
        });
    }
}
