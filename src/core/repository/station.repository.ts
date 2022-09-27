import {Constant} from '../constant/constant';
import {Repository, ReturnResponse} from './repository';

export class StationRepository extends Repository {
    private static instance: StationRepository
    public baseUrl = Constant.ApiPrefix_Factor


    public static getInstance(): StationRepository {
        if (!StationRepository.instance) StationRepository.instance = new StationRepository()
        return StationRepository.instance
    }

    public getAllStation(data: ReturnResponse) {
        data.url = `${this.baseUrl}Station/GetAll/${data.urlContent.workPageId}/${data.urlContent.myPageId}`;
        this.get(data)
    }

    public getByIdStation(data: ReturnResponse) {
        data.url = `${this.baseUrl}Station/GetById/${data.urlContent.id}`;
        this.get(data)
    }

    public CreateStation(data: ReturnResponse) {
        data.url = `${this.baseUrl}Station/Create`;
        this.post(data)
    }

    public AddListOfDocumentsToStation(data: ReturnResponse) {
        data.url = `${this.baseUrl}Station/AddListOfDocumentsToStation`;
        this.post(data)
    }

    public updateStation(data: ReturnResponse) {
        data.url = `${this.baseUrl}Station/UpdateStation`;
        this.put(data)
    }

    public updateDoc(data: ReturnResponse) {
        data.url = `${this.baseUrl}Station/UpdateDocument`;
        this.put(data)
    }

    public deleteStation(data: ReturnResponse) {
        data.url = `${this.baseUrl}Station/DeleteStation/${data.urlContent.stationId}/${data.urlContent.workPageId}`;
        this.delete(data)
    }

    public deleteDoc(data: ReturnResponse) {
        data.url = `${this.baseUrl}Station/DeleteListOFDocumentsFromStation`;
        this.post(data)
    }


}
