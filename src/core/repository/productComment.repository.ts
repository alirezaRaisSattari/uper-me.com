import { Constant } from '../constant/constant';
import { Repository, ReturnResponse } from './repository';

export class ProductCommentRepository extends Repository {
    private static instance: ProductCommentRepository
    public baseUrl = Constant.ApiPrefix_ProductComment


    public static getInstance(): ProductCommentRepository {
        if (!ProductCommentRepository.instance) ProductCommentRepository.instance = new ProductCommentRepository()
        return ProductCommentRepository.instance
    }

    public GetWorkPageScoreItemByIdMoreDetails(data: ReturnResponse) {
        data.url = `http://api.productcomment.upermall.ir/api/v1/productcomment/ProductScoreItem/GetProductScoreItemByIdMoreDetails/${data.urlContent}`;
        this.get(data)
    }

    public getAllComments(data: ReturnResponse) {
        data.url = `${this.baseUrl}ProductComment/GetAllComments`;
        this.post(data)
    }

    public LikeOrDisLike(data: ReturnResponse) {
        data.url = `${this.baseUrl}ProductComment/LikeOrDisLike`;
        this.post(data)
    }

    public RemoveLikeOrDisLike(data: ReturnResponse) {
        data.url = `${this.baseUrl}ProductComment/RemoveLikeOrDisLike`;
        this.post(data)
    }

    public deleteComment(data: ReturnResponse) {
        data.url = `${this.baseUrl}ProductComment/Remove`;
        this.post(data)
    }

    public createComment(data: ReturnResponse) {
        data.url = `${this.baseUrl}ProductComment/Create`;
        this.post(data)
    }

    public GetOne(data: ReturnResponse) {
        data.url = `${this.baseUrl}ProductComment/GetOne`;
        this.post(data)

    }

    public GetAllReplies(data: ReturnResponse) {
        data.url = `${this.baseUrl}ProductComment/GetAllReplies`;
        this.post(data)

    }

    public GetAllComments(data: ReturnResponse) {
        data.url = `${this.baseUrl}ProductComment/GetAllComments`;
        this.post(data)

    }

    public commentProductMine(data: ReturnResponse) {
        data.url = `${this.baseUrl}Mining/Mine`;
        this.post(data);
    }

    public commentProductMiningTransaction(data: ReturnResponse) {
        data.url = `${this.baseUrl}Mining/MineTransaction`;
        this.post(data);
    }
    public MiningGetAll(data: ReturnResponse) {
        data.url = `${this.baseUrl}Mining/GetAll`;
        this.post(data);
    }
    public MiningGetActive(data: ReturnResponse) {
        data.url = `${this.baseUrl}Mining/GetActive/${data.urlContent}`;
        this.get(data);
    }
    public MiningMine(data: ReturnResponse) {
        data.url = `${this.baseUrl}Mining/Mine`;
        this.post(data);
    }
    public MiningMineTransaction(data: ReturnResponse) {
        data.url = `${this.baseUrl}Mining/MineTransaction`;
        this.post(data);
    }

    public commentProductGetActive(data: ReturnResponse) {
        data.url = `${this.baseUrl}Mining/GetActive/${data.urlContent}`;
        this.get(data);
    }
   
}
