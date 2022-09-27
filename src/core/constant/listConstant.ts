import {
    AccountType,
    CargoType,
    DeliveryAddressType,
    FactorStatus,
    MaintenanceType,
    PageTypeId,
    ProductType,
    RecieveTimeType,
    UpgradePlanType,
    UseCase,
    UserStatus
} from '@/core/enum/enums';
import {
    accountType,
    cargoType,
    dayOfWeek,
    deliveryAddressType,
    factorStatus,
    maintenanceType,
    pageTypeId,
    productType,
    receiveTimeType,
    upgradePlanType,
    useCase,
    userStatusType
} from "@/core/service/type.service";

export class ListsConstants {
    public maintenanceTypes = [
        {title: maintenanceType(MaintenanceType.Normal), value: MaintenanceType.Normal},
        {title: maintenanceType(MaintenanceType.Glacier1), value: MaintenanceType.Glacier1},
        {title: maintenanceType(MaintenanceType.Glacier2), value: MaintenanceType.Glacier2},
        {title: maintenanceType(MaintenanceType.Glacier3), value: MaintenanceType.Glacier3},
        {title: maintenanceType(MaintenanceType.Glacier4), value: MaintenanceType.Glacier4},
        {title: maintenanceType(MaintenanceType.Glacier5), value: MaintenanceType.Glacier5},
        {title: maintenanceType(MaintenanceType.Glacier6), value: MaintenanceType.Glacier6},
        {title: maintenanceType(MaintenanceType.Glacier7), value: MaintenanceType.Glacier7},
        {title: maintenanceType(MaintenanceType.Glacier8), value: MaintenanceType.Glacier8},
        {title: maintenanceType(MaintenanceType.Glacier9), value: MaintenanceType.Glacier9},
        {title: maintenanceType(MaintenanceType.Glacier10), value: MaintenanceType.Glacier10},
        {title: maintenanceType(MaintenanceType.Sensitive), value: MaintenanceType.Sensitive},
    ];

    public statuses = [
        {title: userStatusType(UserStatus.Accepted), value: UserStatus.Accepted},
        {title: userStatusType(UserStatus.NotAccepted), value: UserStatus.NotAccepted},
        {title: userStatusType(UserStatus.Deleted), value: UserStatus.Deleted},
        {title: userStatusType(UserStatus.Reported), value: UserStatus.Reported},
    ];


    public pageTypes = [
        {title: pageTypeId(PageTypeId.Work), value: PageTypeId.Work},
        {title: pageTypeId(PageTypeId.Hyper), value: PageTypeId.Hyper},
        {title: pageTypeId(PageTypeId.Consult), value: PageTypeId.Consult},
        {title: pageTypeId(PageTypeId.PersonalHumanTransportation), value: PageTypeId.PersonalHumanTransportation},
        {title: pageTypeId(PageTypeId.TaxiTransportation), value: PageTypeId.TaxiTransportation},
        {title: pageTypeId(PageTypeId.CargoTransportation), value: PageTypeId.CargoTransportation},
        {title: pageTypeId(PageTypeId.Inventory), value: PageTypeId.Inventory}
    ];

    public accountTypes = [
        {title: accountType(AccountType.Main), value: AccountType.Main},
        {title: accountType(AccountType.System), value: AccountType.System},
        {title: accountType(AccountType.Rental), value: AccountType.Rental},
        {title: accountType(AccountType.PayInPlace), value: AccountType.PayInPlace},
        {title: accountType(AccountType.Supporter), value: AccountType.Supporter}
    ];

    public upgradePlanTypes = [
        {title: upgradePlanType(UpgradePlanType.ConsultHome), value: UpgradePlanType.ConsultHome},
        {title: upgradePlanType(UpgradePlanType.CityHome), value: UpgradePlanType.CityHome},
        {title: upgradePlanType(UpgradePlanType.ProductSearch), value: UpgradePlanType.ProductSearch},
        {title: upgradePlanType(UpgradePlanType.PageSearch), value: UpgradePlanType.PageSearch},
        {title: upgradePlanType(UpgradePlanType.HashtagSearch), value: UpgradePlanType.HashtagSearch}
    ];

    public useCases = [
        {title: useCase(UseCase.PurchasePageCategoryCost), value: UseCase.PurchasePageCategoryCost},
        {title: useCase(UseCase.PurchasePostExtraFile), value: UseCase.PurchasePostExtraFile},
        {title: useCase(UseCase.PurchaseImmediatePlan), value: UseCase.PurchaseImmediatePlan},
        {title: useCase(UseCase.PurchaseSpecialDiscountPlan), value: UseCase.PurchaseSpecialDiscountPlan},
        {title: useCase(UseCase.PurchaseAmazingPropPlan), value: UseCase.PurchaseAmazingPropPlan},
        {title: useCase(UseCase.PayIntroductionAward), value: UseCase.PayIntroductionAward},
        {title: useCase(UseCase.PayPostLikeMiningAward), value: UseCase.PayPostLikeMiningAward},
        {title: useCase(UseCase.PayPostViewMiningAward), value: UseCase.PayPostViewMiningAward},
        {title: useCase(UseCase.PayProductLikeMiningAward), value: UseCase.PayProductLikeMiningAward},
        {title: useCase(UseCase.PayProductViewMiningAward), value: UseCase.PayProductViewMiningAward},
        {title: useCase(UseCase.PayProductCommentLikeMiningAward), value: UseCase.PayProductCommentLikeMiningAward},
        {title: useCase(UseCase.PayPageCommentLikeMiningAward), value: UseCase.PayPageCommentLikeMiningAward},
        {title: useCase(UseCase.PayPostCommentLikeMiningAward), value: UseCase.PayPostCommentLikeMiningAward},
        {
            title: useCase(UseCase.PayProductCommentReplyLikeMiningAward),
            value: UseCase.PayProductCommentReplyLikeMiningAward
        },
        {title: useCase(UseCase.PayReportMiningAward), value: UseCase.PayReportMiningAward},
        {title: useCase(UseCase.PaySupporterAward), value: UseCase.PaySupporterAward},
        {title: useCase(UseCase.PayFactor), value: UseCase.PayFactor},
        {title: useCase(UseCase.PayFactorAward), value: UseCase.PayFactorAward},
        {title: useCase(UseCase.PayUpgradeStoryConsultHomePlan), value: UseCase.PayUpgradeStoryConsultHomePlan},
        {title: useCase(UseCase.PayUpgradeStoryCityHomePlan), value: UseCase.PayUpgradeStoryCityHomePlan},
        {title: useCase(UseCase.PayUpgradeStoryProductSearchPlan), value: UseCase.PayUpgradeStoryProductSearchPlan},
        {title: useCase(UseCase.PayUpgradeStoryPageSearchPlan), value: UseCase.PayUpgradeStoryPageSearchPlan},
        {title: useCase(UseCase.PayUpgradeStoryHashtagSearchPlan), value: UseCase.PayUpgradeStoryHashtagSearchPlan},
        {title: useCase(UseCase.PurchaseEventProduct), value: UseCase.PurchaseEventProduct},
        {title: useCase(UseCase.PurchaseLadderProduct), value: UseCase.PurchaseLadderProduct},
        {title: useCase(UseCase.PurchaseVirtualPropPlan), value: UseCase.PurchaseVirtualPropPlan},
        {title: useCase(UseCase.PaySupsWage), value: UseCase.PaySupsWage},
        {title: useCase(UseCase.PayDefaultWage), value: UseCase.PayDefaultWage},
        {title: useCase(UseCase.PayDelivey), value: UseCase.PayDelivey},
    ];

    public factorStatuses = [
        {title: factorStatus(FactorStatus.Paying), value: FactorStatus.Paying},
        {title: factorStatus(FactorStatus.SellerChecker), value: FactorStatus.SellerChecker},
        {title: factorStatus(FactorStatus.SellerAccepted), value: FactorStatus.SellerAccepted},
        {title: factorStatus(FactorStatus.SellerPrepared), value: FactorStatus.SellerPrepared},
        {title: factorStatus(FactorStatus.WaitingForDelivery), value: FactorStatus.WaitingForDelivery},
        {title: factorStatus(FactorStatus.DeliveryAccepted), value: FactorStatus.DeliveryAccepted},
        {title: factorStatus(FactorStatus.Sending), value: FactorStatus.Sending},
        {title: factorStatus(FactorStatus.BuyerReceived), value: FactorStatus.BuyerReceived},
        {title: factorStatus(FactorStatus.SellBack), value: FactorStatus.SellBack},
        {title: factorStatus(FactorStatus.SellerCanceled), value: FactorStatus.SellerCanceled},
        {title: factorStatus(FactorStatus.BuyerCanceled), value: FactorStatus.BuyerCanceled},
        {title: factorStatus(FactorStatus.Final), value: FactorStatus.Final}
    ];

    deliveryAddressTypes = [
        {title: deliveryAddressType(DeliveryAddressType.HasNotDelivery), value: DeliveryAddressType.HasNotDelivery},
        {title: deliveryAddressType(DeliveryAddressType.UperSend), value: DeliveryAddressType.UperSend},
        {title: deliveryAddressType(DeliveryAddressType.BuyerReceive), value: DeliveryAddressType.BuyerReceive},
        {title: deliveryAddressType(DeliveryAddressType.SellerSend), value: DeliveryAddressType.SellerSend},
    ];

    cargoTypes = [
        {title: cargoType(CargoType.Normal), value: CargoType.Normal},
        {title: cargoType(CargoType.Special), value: CargoType.Special},
        {title: cargoType(CargoType.Airmail), value: CargoType.Airmail},
    ];

    receiveTimes = [
        {title: receiveTimeType(RecieveTimeType.SixAmToNineAm), value: RecieveTimeType.SixAmToNineAm},
        {title: receiveTimeType(RecieveTimeType.NineAmToTwelvePm), value: RecieveTimeType.NineAmToTwelvePm},
        {title: receiveTimeType(RecieveTimeType.TwelvePmToFifteenPm), value: RecieveTimeType.TwelvePmToFifteenPm},
        {title: receiveTimeType(RecieveTimeType.FifteenPmToEighteenPm), value: RecieveTimeType.FifteenPmToEighteenPm},
        {
            title: receiveTimeType(RecieveTimeType.EighteenPmToTwentyOnePm),
            value: RecieveTimeType.EighteenPmToTwentyOnePm
        },
        {title: receiveTimeType(RecieveTimeType.TwentyOnePmToTwelveAm), value: RecieveTimeType.TwentyOnePmToTwelveAm},
    ];

    daysOfWeek = [
        {title: dayOfWeek(0), value: 0},
        {title: dayOfWeek(1), value: 1},
        {title: dayOfWeek(2), value: 2},
        {title: dayOfWeek(3), value: 3},
        {title: dayOfWeek(4), value: 4},
        {title: dayOfWeek(5), value: 5},
        {title: dayOfWeek(6), value: 6},
    ];

    public productTypes = [
        {title: productType(ProductType.Sell), value: ProductType.Sell},
        {title: productType(ProductType.Reserve), value: ProductType.Reserve},
        {title: productType(ProductType.Fare), value: ProductType.Fare},
        {title: productType(ProductType.Service), value: ProductType.Service},
        {title: productType(ProductType.BuyAd), value: ProductType.BuyAd},
        {title: productType(ProductType.ReserveAd), value: ProductType.ReserveAd},
        {title: productType(ProductType.FareAd), value: ProductType.FareAd},
        {title: productType(ProductType.ServiceAd), value: ProductType.ServiceAd},
        {title: productType(ProductType.VirtualProduct), value: ProductType.VirtualProduct},
        {title: productType(ProductType.CurrencyProduct), value: ProductType.CurrencyProduct},
        {title: productType(ProductType.ConsultProduct), value: ProductType.ConsultProduct},
    ];

}

