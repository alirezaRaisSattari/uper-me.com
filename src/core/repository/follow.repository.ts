import {Constant} from '../constant/constant';
import {Repository, ReturnResponse} from './repository';

export class FollowRepository extends Repository {
    private static instance: FollowRepository
    public baseUrl = Constant.ApiPrefix_Follow


    public static getInstance(): FollowRepository {
        if (!FollowRepository.instance) FollowRepository.instance = new FollowRepository()
        return FollowRepository.instance
    }

    public getMyBlockList(data: ReturnResponse) {
        data.url = `${this.baseUrl}Block/GetBlockList`;
        this.post(data)
    }

    public unBlockMyUser(data: ReturnResponse) {
        data.url = `${this.baseUrl}Block/UnBlock`;
        this.post(data)
    }

    public GetFollowersByOwner(data: ReturnResponse) {
        data.url = `${this.baseUrl}Followers/GetFollowersByOwner`;
        this.post(data)
    }

    public GetFollowersByOthers(data: ReturnResponse) {
        data.url = `${this.baseUrl}Followers/GetFollowers`;
        this.post(data)
    }

    public GetFollowingsByOwner(data: ReturnResponse) {
        data.url = `${this.baseUrl}Followings/GetFollowingsByOwner`;
        this.post(data)
    }

    public GetFollowingsByOthers(data: ReturnResponse) {
        data.url = `${this.baseUrl}Followings/GetFollowings`;
        this.post(data)
    }

    public GetFollowerFolder(data: ReturnResponse) {
        data.url = `${this.baseUrl}FollowFolder/GetFollowersFolder`;
        this.post(data)
    }

    public GetFollowingFolder(data: ReturnResponse) {
        data.url = `${this.baseUrl}FollowFolder/GetFollowingFolder`;
        this.post(data)
    }

    public CreateFolder(data: ReturnResponse) {
        data.url = `${this.baseUrl}FollowFolder/Create`;
        this.post(data)
    }

    public newFollow(data: ReturnResponse) {
        data.url = `${this.baseUrl}Follow/Follow`;
        this.post(data)
    }


    public unFollow(data: ReturnResponse) {
        data.url = `${this.baseUrl}Follow/UnFollow`;
        this.post(data)
    }

    public GetFollowingFolderInfo(data: ReturnResponse) {
        data.url = `${this.baseUrl}Follow/GetFollowingsByFolder`;
        this.post(data)
    }

    public GetFollowerFolderInfo(data: ReturnResponse) {
        data.url = `${this.baseUrl}Follow/GetFollowersByFolder`;
        this.post(data)
    }

    public RejectRequest(data: ReturnResponse) {
        data.url = `${this.baseUrl}Follow/RejectRequest`;
        this.post(data)
    }

    public acceptRequest(data: ReturnResponse) {
        data.url = `${this.baseUrl}Follow/AcceptRequest`;
        this.post(data)
    }

    public GetRequests(data: ReturnResponse) {
        data.url = `${this.baseUrl}Follow/GetRequests`;
        this.post(data)
    }

    public getUsers(data: ReturnResponse) {
        data.url = `${this.baseUrl}Utils/GetPages`;

        this.post(data)
    }

    public deleteFollower(data: ReturnResponse) {
        data.url = `${this.baseUrl}Follow/RemoveFollower`;
        this.post(data)
    }

    public moveFollowers(data: ReturnResponse) {
        data.url = `${this.baseUrl}Follow/MoveFollowers`;
        this.post(data)
    }

    public moveFollowings(data: ReturnResponse) {
        data.url = `${this.baseUrl}Follow/MoveFollowings`;
        this.post(data)
    }

    public block(data: ReturnResponse) {
        data.url = `${this.baseUrl}Block/Block`;
        this.post(data)
    }

    public unblock(data: ReturnResponse) {
        data.url = `${this.baseUrl}Block/UnBlock`;
        this.post(data)
    }

    public followRequest(data: ReturnResponse) {
        data.url = `${this.baseUrl}Follow/Request`;
        this.post(data)
    }

    public cancelRequest(data: ReturnResponse) {
        data.url = `${this.baseUrl}Follow/CancelRequest`;
        this.post(data)
    }

    public deleteFolder(data: ReturnResponse) {
        data.url = `${this.baseUrl}FollowFolder/Delete/${data.urlContent.id}/${data.urlContent.PageId}`;
        this.delete(data)
    }

    public editFolder(data: ReturnResponse) {
        data.url = `${this.baseUrl}FollowFolder/Update`;
        this.post(data)
    }

    public GetFollowersForEmployees(data: ReturnResponse) {
        data.url = `${this.baseUrl}Follow/GetFollowersForEmployees`;
        this.post(data)
    }

    public GetFollowers(data: ReturnResponse) {
        data.url = `${this.baseUrl}Follow/GetFollowers`;
        this.post(data)
    }
    

    public GetFollowings(data: ReturnResponse) {
        data.url = `${this.baseUrl}Follow/GetFollowings`;
        this.post(data)
    }

}
