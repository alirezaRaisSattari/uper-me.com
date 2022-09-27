import {Constant} from '../constant/constant';
import {Repository, ReturnResponse} from './repository';

export class MLRepository extends Repository {
    private static instance: MLRepository
    public baseUrl = Constant.ApiPrefix_ML


    public static getInstance(): MLRepository {
        if (!MLRepository.instance) MLRepository.instance = new MLRepository()
        return MLRepository.instance
    }

    public getMessages(data: ReturnResponse) {
        data.url = `${this.baseUrl}Messages/GetMessages/${data.urlContent}`;
        this.get(data)
    }

    public report(data: ReturnResponse) {
        data.url = `${this.baseUrl}Messages/Report/${data.urlContent}`;
        this.put(data)
    }

    public sendMessage(data: ReturnResponse) {
        data.url = "http://ml.upermall.ir/predict";
        this.post(data)
    }
}
