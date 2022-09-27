import {Constant} from '../constant/constant';
import {Repository, ReturnResponse} from './repository';

export class ReportRepository extends Repository {
    private static instance: ReportRepository
    public baseUrl = Constant.ApiPrefix_Report

    public static getInstance(): ReportRepository {
        if (!ReportRepository.instance) ReportRepository.instance = new ReportRepository()
        return ReportRepository.instance
    }

    public CreateReport(data: ReturnResponse) {
        data.url = `${this.baseUrl}UserReport/CreateReport`;
        this.post(data)
    }

    public reportMineGet(data: ReturnResponse) {
        data.url = `${this.baseUrl}Mine/Get`;
        this.post(data)
    }

    public reportMineDo(data: ReturnResponse) {
        data.url = `${this.baseUrl}Mine/Do`;
        this.post(data)
    }
}
