import {Constant} from '../constant/constant';
import {Repository, ReturnResponse} from './repository';

export class AccountingRepository extends Repository {
    private static instance: AccountingRepository
    public baseUrl = Constant.ApiPrefix_Accounting

    public static getInstance(): AccountingRepository {
        if (!AccountingRepository.instance) AccountingRepository.instance = new AccountingRepository()
        return AccountingRepository.instance
    }

    public mediaAward(data: ReturnResponse) {
        data.url = `${this.baseUrl}InternalTransaction/GetSupporterMediaAward`;
        this.post(data)
    }//9412014851

    public GetWalletByIdAndType(data: ReturnResponse) {
        data.url = `${this.baseUrl}Account/GetByIdAndType`;
        this.post(data)
    }

    public GetPaymentGateWay(data: ReturnResponse) {
        data.url = `${this.baseUrl}PaymentGateWayAccount/GetPaymentGateWay`;
        this.post(data)
    }

    public ValidateTransactionWithTrf(data: ReturnResponse) {
        data.url = `${this.baseUrl}Account/ValidateTransactionWithTrf`;
        this.post(data)
    }

    public CalculateActivityLevel(data: ReturnResponse) {
        data.url = `${this.baseUrl}Account/CalculateActivityLevel/${data.urlContent.pageId}`;
        if (data.urlContent.pageId)
        this.get(data)
    }

    public GetMyAccountTransaction(data: ReturnResponse) {
        data.url = `${this.baseUrl}InternalTransaction/GetMyAccountTransaction`;
        this.post(data)
    }

    public UpdateAccount(data: ReturnResponse) {
        data.url = `${this.baseUrl}Account/UpdateAccount`;

        this.put(data)
    }

    public FilterWage(data: ReturnResponse) {
        data.url = `${this.baseUrl}Wage/Filter`;
        this.post(data);
    }

    public GetByAccountNumber(data: ReturnResponse) {
        data.url = `${this.baseUrl}Account/GetByAccountNumber`;
        this.post(data);
    }

    public TransferMoney(data: ReturnResponse) {
        data.url = `${this.baseUrl}InternalTransaction/TransferMoney`;
        this.post(data);
    }

    public CalculateWageBonus(data: ReturnResponse) {
        data.url = `${this.baseUrl}Wage/CalculateWageBonus`;
        this.post(data);
    }

    public GetFactorsOfSellerWorkPages(data: ReturnResponse) {
        data.url = `${this.baseUrl}Supervisor/GetFactorsOfSellerWorkPages`;
        this.post(data)
    }

    public GetSupporterMediaAward(data: ReturnResponse) {
        data.url = `${this.baseUrl}InternalTransaction/GetSupporterMediaAward`;
        this.post(data)
    }
}
