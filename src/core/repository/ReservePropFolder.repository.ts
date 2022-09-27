import {Constant} from '../constant/constant';
import {Repository, ReturnResponse} from './repository';

export class ReservePropFolderRepository extends Repository {
    private static instance: ReservePropFolderRepository
    public baseUrl = Constant.ApiPrefix_Product

    public static getInstance(): ReservePropFolderRepository {
        if (!ReservePropFolderRepository.instance) ReservePropFolderRepository.instance = new ReservePropFolderRepository()
        return ReservePropFolderRepository.instance
    }

    public getAllReservePropFolder(data: ReturnResponse) {
        data.url = `${this.baseUrl}ReservePropFolderItem/GetAll`;
        this.post(data)
    }

    public createReservePropFolder(data: ReturnResponse) {
        data.url = `${this.baseUrl}ReservePropFolderItem/CreateMulti`;
        this.post(data)
    }

    public deleteReservePropFolder(data: ReturnResponse) {
        data.url = `${this.baseUrl}ReservePropFolderItem/Delete`;
        this.post(data)
    }
}
