import {Constant} from '../constant/constant';
import {Repository, ReturnResponse} from './repository';

export class PageCommentRepository extends Repository {
    private static instance: PageCommentRepository
    public baseUrl = Constant.ApiPrefix_WorkPageComment


    public static getInstance(): PageCommentRepository {
        if (!PageCommentRepository.instance) PageCommentRepository.instance = new PageCommentRepository()
        return PageCommentRepository.instance
    }

    public getAllComments(data: ReturnResponse) {
        data.url = `${this.baseUrl}PageComment/GetAllComments`;
        this.post(data)
    }

    public getCountOfReplies(data: ReturnResponse) { //
        data.url = `${this.baseUrl}PageComment/GetCount`;
        this.post(data)
    }

    public GetWorkPageScoreItemByIdMoreDetails(data: ReturnResponse) {
        data.url = `http://api.pagecomment.upermall.ir/api/v1/pagecomment/WorkPageScoreItem/GetWorkPageScoreItemByIdMoreDetails/${data.urlContent}`;
        this.get(data)
    }

    public deleteComment(data: ReturnResponse) {
        data.url = `${this.baseUrl}PageComment/Delete`;
        this.post(data)
    }

    public createComment(data: ReturnResponse) {
        data.url = `${this.baseUrl}PageComment/Create`;
        this.post(data)
    }

    public LikeOrDisLike(data: ReturnResponse) {
        data.url = `${this.baseUrl}PageComment/LikeOrDisLike`;
        this.post(data)
    }

    public RemoveLikeOrDisLike(data: ReturnResponse) {
        data.url = `${this.baseUrl}PageComment/RemoveLikeOrDisLike`;
        this.post(data)
    }

    public GetOne(data: ReturnResponse) {
        data.url = `${this.baseUrl}PageComment/GetOne`;
        this.post(data)

    }


    public GetAllReplies(data: ReturnResponse) {
        data.url = `${this.baseUrl}PageComment/GetAllReplies`;
        this.post(data)

    }

    public getAllCommentMining(data: ReturnResponse) {
        data.url = `${this.baseUrl}Mining/GetAll`;
        this.post(data);
    }


    public pageCommentMine(data: ReturnResponse) {
        data.url = `${this.baseUrl}Mining/Mine`;
        this.post(data);
    }

    public pageCommentMineTransaction(data: ReturnResponse) {
        data.url = `${this.baseUrl}Mining/MineTransaction`;
        this.post(data);
    }

    public getActiveMine(data: ReturnResponse) {
        data.url = `${this.baseUrl}Mining/GetActiveMineItem/${data.urlContent}`;
        this.get(data);
    }
    public MiningGetAll(data: ReturnResponse) {
        data.url = `${this.baseUrl}Mining/GetAll`;
        this.post(data);
    }

}
