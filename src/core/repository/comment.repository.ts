import {Constant} from '../constant/constant';
import {Repository, ReturnResponse} from './repository';

export class PostCommentRepository extends Repository {
    private static instance: PostCommentRepository
    public baseUrl = Constant.ApiPrefix_PageComment

    public static getInstance(): PostCommentRepository {
        if (!PostCommentRepository.instance) PostCommentRepository.instance = new PostCommentRepository()
        return PostCommentRepository.instance
    }

    public getComment(data: ReturnResponse) {
        data.url = `${this.baseUrl}PostComment/GetCommentsByPostIdOrderByCommentId`;
        this.post(data)
    }

    public postComment(data: ReturnResponse) {
        data.url = `${this.baseUrl}PostComment/Create`;
        this.post(data)
    }

    public likeAndDislike(data: ReturnResponse) {
        data.url = `${this.baseUrl}PostComment/LikeOrDislikePostComment`;
        this.post(data)
    }

    public deleteComment(data: ReturnResponse) {
        data.url = `${this.baseUrl}PostComment/DeletePostComment`;
        this.post(data)
    }

    public getCommentReply(data: ReturnResponse) {
        data.url = `${this.baseUrl}PostCommentReply/GetReplyCommentByCommentIdOrderByReplyId`;
        this.post(data)
    }

    public postReply(data: ReturnResponse) {
        data.url = `${this.baseUrl}PostCommentReply/AddReplyToPostComment`;
        this.post(data)
    }

    public deleteReply(data: ReturnResponse) {
        data.url = `${this.baseUrl}PostCommentReply/DeleteReplyPostComment`;
        this.post(data)
    }

    public likeReply(data: ReturnResponse) {
        data.url = `${this.baseUrl}PostCommentReply/LikePostComment`;
        this.post(data)
    }

    public dislikeReply(data: ReturnResponse) {
        data.url = `${this.baseUrl}PostCommentReply/DislikePostComment`;
        this.post(data)
    }

   

}
