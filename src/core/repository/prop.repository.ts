import {Constant} from '../constant/constant';
import {Repository, ReturnResponse} from './repository';

export class PropRepository extends Repository {
    private static instance: PropRepository
    public baseUrl = Constant.ApiPrefix_Product;

    public static getInstance(): PropRepository {
        if (!PropRepository.instance) PropRepository.instance = new PropRepository()
        return PropRepository.instance
    }

    public deleteProp(data: ReturnResponse) {
        data.url = `${this.baseUrl}Prop/Delete/${data.urlContent.workPageId}/${data.urlContent.propId}`;
        this.delete(data)
    }


}
