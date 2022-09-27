import { Constant } from '../constant/constant';
import { Repository, ReturnResponse } from './repository';

export class PostRepository extends Repository {
    private static instance: PostRepository
    public baseUrl = Constant.ApiPrefix_Post

    public static getInstance(): PostRepository {
        if (!PostRepository.instance) PostRepository.instance = new PostRepository()
        return PostRepository.instance
    }

    public getPostByPageId(data: ReturnResponse) {
        data.url = `${this.baseUrl}Post/GetPostByPageId`;
        this.post(data)
    }

    public likePost(data: ReturnResponse) {
        data.url = `${this.baseUrl}PostLike/Like`;
        this.post(data)
    }

    public searchByName(data: ReturnResponse) {
        data.url = `${this.baseUrl}PostHashTags/SearchByName`;
        this.post(data)
    }

    public Postlike(data: ReturnResponse){
        data.url = `${this.baseUrl}PostLike/Get`;
        this.post(data)
    }

    public unlikePost(data: ReturnResponse) {
        data.url = `${this.baseUrl}PostLike/UnLike`;
        this.post(data)
    }

    public bookmarkOrUnBookmark(data: ReturnResponse) {
        data.url = `${this.baseUrl}BookMark/BookMark`;
        this.post(data)
    }

    public UnBookMark(data: ReturnResponse) {
        data.url = `${this.baseUrl}BookMark/UnBookMark`;
        this.post(data)
    }

    public GetDeletedOrReported(data: ReturnResponse) {
        data.url = `${this.baseUrl}Post/GetDeletedOrReported`;
        this.post(data)
    }

    public deletePost(data: ReturnResponse) {
        data.url = `${this.baseUrl}Post/Delete`;
        this.put(data)
    }

    public UpdatePostCaption(data: ReturnResponse) {
        data.url = `${this.baseUrl}Post/UpdatePostCaption`;
        this.put(data)
    }

    public GetFolderItems(data: ReturnResponse) {
        data.url = `${this.baseUrl}BookMark/GetFolderItems`;
        this.post(data)
    }

    public CreateBookMarkFolder(data: ReturnResponse) {
        data.url = `${this.baseUrl}BookMarkFolder/CreateBookMarkFolder
        `;
        this.post(data)
    }

    public MovePostBetweenFolders(data: ReturnResponse) {
        data.url = `${this.baseUrl}BookMarkFolder/MovePostBetweenFolders
        `;
        this.put(data)
    }

    //*************************************************  create post  ++++++++++++++++++++++++++++++++++++++++++++++++++++

    public createNewPostState(data: ReturnResponse) {
        data.url = `${this.baseUrl}Post/CreatePost`;
        this.post(data)
    }

    public findHashtags(data: ReturnResponse) {
        data.url = `${this.baseUrl}PostHashTags/SearchByName`;
        this.post(data)
    }

    public deleteBookmarkFolder(data: ReturnResponse) {
        data.url = `${this.baseUrl}BookMarkFolder/DeleteBookMarkFolder/${data.urlContent}`;
        this.delete(data)
    }

    public updateBookmarkFolder(data: ReturnResponse) {
        data.url = `${this.baseUrl}BookMarkFolder/UpdateBookMarkFolder`;
        this.put(data)
    }

    //***********************************************  comment of post  ++++++++++++++++++++++++++++++++++++++++++++++++++
    public getComment(data: ReturnResponse) {
        data.url = `${this.baseUrl}PostComment/GetAll`;
        this.post(data)
    }

    public createComment(data: ReturnResponse) {
        data.url = `${this.baseUrl}PostComment/Create`;
        this.post(data)
    }

    public deleteComment(data: ReturnResponse) {
        data.url = `${this.baseUrl}PostComment/DeletePostComment`;
        this.post(data)
    }

    public likeOrDislikeComment(data: ReturnResponse) {
        data.url = `${this.baseUrl}PostComment/LikeOrDisLike`;
        this.post(data)
    }

    public removeLikeOrDislikeComment(data: ReturnResponse) {
        data.url = `${this.baseUrl}PostComment/RemoveLikeOrDisLike`;
        this.post(data)
    }

    public getMainComment(data: ReturnResponse) {
        data.url = `${this.baseUrl}PostComment/GetOne`;
        this.post(data)
    }

    public GetBookMarkFolder(data: ReturnResponse) {
        data.url = `${this.baseUrl}BookMarkFolder/GetBookMarkFolder`;
        this.post(data)
    }

    public UpdatePostTurnOffCommenting(data: ReturnResponse) {
        data.url = `${this.baseUrl}Post/UpdatePostTurnOffCommenting`;
        this.put(data)
    }

    public getAllPostMining(data: ReturnResponse) {
        data.url = `${this.baseUrl}PostMining/GetAll/${data.urlContent}`
        this.get(data)
    }

    public minePost(data: ReturnResponse) {
        data.url = `${this.baseUrl}PostMining/Mine`;
        this.post(data);
    }

    public getActiveItem(data: ReturnResponse) {
        data.url = `${this.baseUrl}PostMining/GetActiveItem/${data.urlContent}`;
        this.get(data);
    }

    public mineTransaction(data: ReturnResponse) {
        data.url = `${this.baseUrl}PostMining/MineTransaction`;
        this.post(data);
    }

    public getCommentPostMining(data: ReturnResponse) {
        data.url = `${this.baseUrl}PostCommentMining/GetAll`;
        this.post(data);
    }

    public commentPostMine(data: ReturnResponse) {
        data.url = `${this.baseUrl}PostCommentMining/Mine`;
        this.post(data);
    }

    public commentPostMineTransaction(data: ReturnResponse) {
        data.url = `${this.baseUrl}PostCommentMining/MineTransaction`;
        this.post(data);
    }

    public commentPostMiningActive(data: ReturnResponse) {
        data.url = `${this.baseUrl}PostCommentMining/GetActiveItem/${data.urlContent}`;
        this.get(data);
    }

    public getSuggestion(data: ReturnResponse) {
        data.url = `${this.baseUrl}Suggestion/Suggestion`;
        this.post(data)
    }

    public GetExploreWithHashtagId(data: ReturnResponse) {
        data.url = `${this.baseUrl}Suggestion/GetExploreWithHashtagId`;
        this.post(data)
    }

    public GetPostByPostId(data: ReturnResponse) {
        data.url = `${this.baseUrl}Post/GetPostByPostId`;
        this.post(data)
    }

    public PostCommentMiningGetAll(data: ReturnResponse) {
        data.url = `${this.baseUrl}PostCommentMining/GetAll`;
        this.post(data)
    }
    public PostCommentMiningMine(data: ReturnResponse) {
        data.url = `${this.baseUrl}PostCommentMining/Mine`;
        this.post(data)
    }
    public PostCommentMiningMineTransaction(data: ReturnResponse) {
        data.url = `${this.baseUrl}PostCommentMining/MineTransaction`;
        this.post(data)
    }
    public PostCommentMiningGetActiveItem(data: ReturnResponse) {
        data.url = `${this.baseUrl}PostCommentMining/GetActiveItem/${data.urlContent}`;
        this.get(data)
    }
   
}
