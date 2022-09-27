import {Constant} from '../constant/constant';
import {Repository, ReturnResponse} from './repository';

export class ExplorerRepository extends Repository {
    private static instance: ExplorerRepository
    private baseUrl = Constant.ApiPrefix_Explorer

    public static getInstance(): ExplorerRepository {
        if (!ExplorerRepository.instance) ExplorerRepository.instance = new ExplorerRepository()
        return ExplorerRepository.instance
    }

    public searchByTitle(data: ReturnResponse) {
        data.url = `${this.baseUrl}HashTag/SearchByTitle/${data.urlContent}`;
        this.get(data)
    }
}
