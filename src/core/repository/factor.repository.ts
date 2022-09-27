import { Constant } from '../constant/constant';
import { Repository, ReturnResponse } from './repository';

export class FactorRepository extends Repository {
    private static instance: FactorRepository
    public baseUrl = Constant.ApiPrefix_Factor


    public static getInstance(): FactorRepository {
        if (!FactorRepository.instance) FactorRepository.instance = new FactorRepository()
        return FactorRepository.instance
    }

    public SellerSendAddress(data: ReturnResponse) {
        data.url = `${this.baseUrl}SellerSendAddress/CreateAddress`;
        this.post(data)
    }

    public UperSendAddress(data: ReturnResponse) {
        data.url = `${this.baseUrl}UperSendAddress/CreateAddress`;
        this.post(data)
    }

    public BuyerReceiveAddress(data: ReturnResponse) {
        data.url = `${this.baseUrl}BuyerReceiveAddress/CreateAddress`;
        this.post(data)
    }


    public FactorOffCodeGetAll(data: ReturnResponse) {
        data.url = `${this.baseUrl}FactorOffCode/Get`;
        this.post(data)
    }

    public FactorOffCodeGetSingle(data: ReturnResponse) {
        data.url = `${this.baseUrl}FactorOffCode/GetSingle`;
        this.post(data)
    }

    public FactorOffCodeUpdate(data: ReturnResponse) {
        data.url = `${this.baseUrl}FactorOffCode/Update`;
        this.put(data)
    }

    public FactorOffCodeDelete(data: ReturnResponse) {
        data.url = `${this.baseUrl}FactorOffCode/Delete`;
        this.put(data)
    }

    public FactorOffCodeCreate(data: ReturnResponse) {
        data.url = `${this.baseUrl}FactorOffCode/Create`;
        this.post(data)
    }
    public GetForSeller(data: ReturnResponse) {
        data.url = `${this.baseUrl}SpecialFactor/GetForSeller`;
        this.post(data)
    }
    public GetForBuyer(data: ReturnResponse) {
        data.url = `${this.baseUrl}SpecialFactor/GetForBuyer`;
        this.post(data)
    }
    public FactorGetRecentForSeller(data: ReturnResponse) {
        data.url = `${this.baseUrl}Factor/GetRecentForSeller`;
        this.post(data)
    }
    public FactorGetFactorById(data: ReturnResponse) {
        data.url = `${this.baseUrl}Factor/GetFactorById`;
        this.post(data)
    }
    public CalculateEarningUper(data: ReturnResponse) {
        data.url = `${this.baseUrl}Factor/CalculateEarningUper`;
        this.post(data)
    }

    public factorCancel(data: ReturnResponse) {
        data.url = `${this.baseUrl}Factor/Cancel`;
        this.post(data);
    }

    public SellerPrepare(data: ReturnResponse) {
        data.url = `${this.baseUrl}Factor/SellerPrepare`;
        this.put(data);
    }

    public SellerSendAndBuyerReceiveReceipt(data: ReturnResponse) {
        data.url = `${this.baseUrl}Factor/SellerSendAndBuyerReceiveReceipt`;
        this.post(data);
    }

    public SellerAccept(data: ReturnResponse) {
        data.url = `${this.baseUrl}Factor/SellerAccept`;
        this.put(data);
    }
    public GetRecentForBuyer(data: ReturnResponse) {
        data.url = `${this.baseUrl}Factor/GetRecentForBuyer`;
        this.post(data)
    }
    public SpecialFactorGetForBuyer(data: ReturnResponse) {
        data.url = `${this.baseUrl}SpecialFactor/GetForBuyer`;
        this.post(data)
    }

    public SendingForSellerSend(data: ReturnResponse) {
        data.url = `${this.baseUrl}Factor/SendingForSellerSend`;
        this.post(data)
    }

    public GetRecentForSeller(data: ReturnResponse) {
        data.url = `${this.baseUrl}Factor/GetRecentForSeller`;
        this.post(data)
    }

    public ReturnedFactorGetSeller(data: ReturnResponse) {
        data.url = `${this.baseUrl}ReturnedFactor/GetSeller`;
        this.post(data)
    }
    public SellerFinalStep(data: ReturnResponse) {
        data.url = `${this.baseUrl}Factor/SellerFinalStep`;
        this.put(data)
    }

    public ReturnedFactorGetById(data: ReturnResponse) {
        data.url = `${this.baseUrl}ReturnedFactor/GetById/${data.urlContent}`;
        this.get(data)
    }
    public FactorGetById(data: ReturnResponse) {
        data.url = `${this.baseUrl}Factor/GetFactorById`;
        this.post(data)
    }
    public ReturnedFactorGetByIdForSeller(data: ReturnResponse) {
        data.url = `${this.baseUrl}ReturnedFactor/GetByIdForSeller/${data.urlContent}`;
        this.get(data)
    }
    public ReturnedFactorGetBuyer(data: ReturnResponse) {
        data.url = `${this.baseUrl}ReturnedFactor/GetBuyer`;
        this.post(data)
    }

    public FactorGetAllSellAddress(data: ReturnResponse) {
        data.url = `${this.baseUrl}Factor/GetAllSellAddress/${data.urlContent}`;
        this.get(data)
    }
    public StationGetAll(data: ReturnResponse) {
        data.url = `${this.baseUrl}Station/GetAll/${data.urlContent}`;
        this.get(data)
    }
    public CalculateEarningUperByShoppingCart(data: ReturnResponse) {
        data.url = `${this.baseUrl}Factor/CalculateEarningUperByShoppingCart`;
        this.post(data)
    }
    public GiftCardGetMyGiftCardOfSeller(data: ReturnResponse) {
        data.url = `${this.baseUrl}GiftCard/GetMyGiftCardOfSeller/${data.urlContent}`;
        this.get(data)
    }
    public FactorOffCodeIsValid(data: ReturnResponse) {
        data.url = `${this.baseUrl}FactorOffCode/IsValid`;
        this.post(data)
    }
    public FactorCreate(data: ReturnResponse) {
        data.url = `${this.baseUrl}Factor/Create`;
        this.post(data)
    }
    public CalculateDeliveryPrice(data: ReturnResponse) {
        data.url = `${this.baseUrl}Factor/CalculateDeliveryPrice`;
        this.post(data)
    }
    public GetArriveTime(data: ReturnResponse) {
        data.url = `${this.baseUrl}Factor/GetArriveTime`;
        this.post(data)
    }
    public UpdateUperSendAddress(data: ReturnResponse) {
        data.url = `${this.baseUrl}UperSendAddress/UpdateAddress`;
        this.put(data)
    }
    public DeleteUperSendAddress(data: ReturnResponse) {
        data.url = `${this.baseUrl}UperSendAddress/DeleteAddress/${data.urlContent.pageId}`;
        this.delete(data)
    }
    public CreateUperSendAddress(data: ReturnResponse) {
        data.url = `${this.baseUrl}UperSendAddress/CreateAddress`;
        this.post(data)
    }
    public GetUperSendAddress(data: ReturnResponse) {
        data.url = `${this.baseUrl}UperSendAddress/GetAddress/${data.urlContent.pageId}`;
        this.get(data)
    }

    public UpdateSellerSendAddress(data: ReturnResponse) {
        data.url = `${this.baseUrl}SellerSendAddress/UpdateAddress`;
        this.put(data)
    }
    public CreateSellerSendAddress(data: ReturnResponse) {
        data.url = `${this.baseUrl}SellerSendAddress/CreateAddress`;
        this.post(data)
    }
    public GetSellerSendAddress(data: ReturnResponse) {
        data.url = `${this.baseUrl}SellerSendAddress/GetAllAddress/${data.urlContent.pageId}`;
        this.get(data)
    }
    public GetOneSellerSendAddress(data: ReturnResponse) {
        data.url = `${this.baseUrl}SellerSendAddress/GetAddress/${data.urlContent.pageId}/1`;
        this.get(data)
    }
    public DeleteSellerSendAddress(data: ReturnResponse) {
        data.url = `${this.baseUrl}SellerSendAddress/DeleteAddress/${data.urlContent.pageId}/1`;
        this.delete(data)
    }

    public UpdateBuyerReceiveAddress(data: ReturnResponse) {
        data.url = `${this.baseUrl}BuyerReceiveAddress/UpdateAddress`;
        this.put(data)
    }
    public CreateBuyerReceiveAddress(data: ReturnResponse) {
        data.url = `${this.baseUrl}BuyerReceiveAddress/CreateAddress`;
        this.post(data)
    }
    public GetBuyerReceiveAddress(data: ReturnResponse) {
        data.url = `${this.baseUrl}BuyerReceiveAddress/GetAddress/${data.urlContent.pageId}`;
        this.get(data)
    }
    public DeleteBuyerReceiveAddress(data: ReturnResponse) {
        data.url = `${this.baseUrl}BuyerReceiveAddress/DeleteAddress/${data.urlContent.pageId}`;
        this.delete(data)
    }
    public GiftCardGetMyGiftCards(data: ReturnResponse) {
        data.url = `${this.baseUrl}GiftCard/GetMyGiftCards/${data.urlContent}`;
        this.get(data)
    }
    public CalculateActivityLevelDiscount(data: ReturnResponse) {
        data.url = `${this.baseUrl}Factor/CalculateActivityLevelDiscount`;
        this.post(data)
    }
    public SpecialFactorAccept(data: ReturnResponse) {
        data.url = `${this.baseUrl}SpecialFactor/Accept`;
        this.put(data)
    }
    public SpecialFactorCancelForSeller(data: ReturnResponse) {
        data.url = `${this.baseUrl}SpecialFactor/CancelForSeller`;
        this.put(data)
    }
    public ReturnedFactorGetByIdForBuyer(data: ReturnResponse) {
        data.url = `${this.baseUrl}ReturnedFactor/GetByIdForBuyer/${data.urlContent}`;
        this.get(data)
    }

    public SpecialFactorCreateByBuyer(data: ReturnResponse) {
        data.url = `${this.baseUrl}SpecialFactor/CreateByBuyer`;
        this.post(data)
    }

}
