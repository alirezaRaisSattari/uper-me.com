import {
    AccountType,
    CargoType,
    CreditLevel,
    DeliveryAddressType,
    FactorStatus,
    InternalPayType,
    LocationType,
    MaintenanceType,
    PageTypeId,
    ProductType,
    RecieveTimeType,
    SellType,
    StatusTypeId,
    UpgradePlanType,
    UseCase,
    UserStatus
} from "@/core/enum/enums";
import {i18n} from "@/main";

export function productType(type: number): string {
    switch (type) {
        case ProductType.Sell:
            return 'فروشی';
        case ProductType.Reserve:
            return 'رزرو';
        case ProductType.Fare:
            return 'کرایه';
        case ProductType.Service:
            return 'خدمات';
        case ProductType.BuyAd:
            return 'آگهی فروشی';
        case ProductType.ReserveAd:
            return 'آگهی رزرو';
        case ProductType.FareAd:
            return 'آگهی کرایه';
        case ProductType.ServiceAd:
            return 'آگهی خدمات';
        case ProductType.VirtualProduct:
            return 'مجازی';
        case ProductType.CurrencyProduct:
            return 'ارزی';
        case ProductType.ConsultProduct:
            return 'مشورت';
        default:
            return 'موجود نیست';
    }
}

export function pageTypeId(type: number): string {
    switch (type) {
        case PageTypeId.Work:
            return 'پیچ کاری';
        case PageTypeId.Hyper:
            return 'پیچ هایپر';
        case PageTypeId.Consult:
            return 'پیچ مشورت';
        case PageTypeId.PersonalHumanTransportation:
            return 'حمل و نقل انسان';
        case PageTypeId.TaxiTransportation:
            return 'حمل و نقل تاکسی';
        case PageTypeId.CargoTransportation:
            return 'حمل و نقل بار';
        case PageTypeId.Inventory:
            return 'انبار';
        default:
            return 'موجود نیست';
    }
}

export function maintenanceType(type: number): string {
    switch (type) {
        case MaintenanceType.Normal:
            return 'معمولی';
        case MaintenanceType.Glacier1:
            return 'یخچالی 1';
        case MaintenanceType.Glacier2:
            return 'یخچالی 2';
        case MaintenanceType.Glacier3:
            return 'یخچالی 3';
        case MaintenanceType.Glacier4:
            return 'یخچالی 4';
        case MaintenanceType.Glacier5:
            return 'یخچالی 5';
        case MaintenanceType.Glacier6:
            return 'یخچالی 6';
        case MaintenanceType.Glacier7:
            return 'یخچالی 7';
        case MaintenanceType.Glacier8:
            return 'یخچالی 8';
        case MaintenanceType.Glacier9:
            return 'یخچالی 9';
        case MaintenanceType.Glacier10:
            return 'یخچالی 10';
        case MaintenanceType.Sensitive:
            return 'حساس';
        default:
            return 'موجود نیست';
    }
}

export function userStatusType(type: number): string {
    switch (type) {
        case UserStatus.Accepted:
            return i18n.global.tc('accepted');
        case UserStatus.NotAccepted:
            return i18n.global.tc('notAccepted');
        case UserStatus.Deleted:
            return i18n.global.tc('deletedPage');
        case UserStatus.Reported:
            return i18n.global.tc('reported');
        default:
            return i18n.global.tc('noAccount');
    }
}

export function internalPayType(type: number): string {
    switch (type) {
        case InternalPayType.UserChargeAccount:
            return 'شارژ حساب کاربر';
        case InternalPayType.OperatorChargeAccount:
            return 'شارژ حساب توسط اپراتور';
        case InternalPayType.TransferMoney:
            return 'انتقال وجه';
        case InternalPayType.PurchasePageCategoryCost:
            return 'خرید هزینه دسته بندی اصناف';
        case InternalPayType.PurchasePostExtraFile:
            return 'خرید فایل اضافی پست';
        case InternalPayType.PurchaseImmediatePlan:
            return 'خرید پلن فوری';
        case InternalPayType.PurchaseSpecialDiscountPlan:
            return 'خرید پلن تخفیفی ویژه';
        case InternalPayType.PurchaseAmazingPropPlan:
            return 'خرید پلن شگفت انگیز';
        case InternalPayType.PayIntroductionAward:
            return 'پرداخت آپر معرفی صفحه';
        case InternalPayType.PayPostLikeMiningAward:
            return 'پرداخت استخراج لایک پست';
        case InternalPayType.PayPostViewMiningAward:
            return 'پرداخت استخراج بازدید پست';
        case InternalPayType.PayProductLikeMiningAward:
            return 'پرداخت استخراج لایک محصول';
        case InternalPayType.PayProductViewMiningAward:
            return 'پرداخت استخراج بازدید محصول';
        case InternalPayType.PayProductCommentLikeMiningAward:
            return 'پرداخت استخراج لایک کامنت محصول';
        case InternalPayType.PayPageCommentLikeMiningAward:
            return 'پرداخت استخراج لایک کامنت صفحه';
        case InternalPayType.PayPostCommentLikeMiningAward:
            return 'پرداخت استخراج لایک کامنت پست';
        case InternalPayType.PayProductCommentReplyLikeMiningAward:
            return 'پرداخت استخراج لایک پاسخ کامنت محصول';
        case InternalPayType.PayReportMiningAward:
            return 'پرداخت استخراج گزارش اشکال';
        case InternalPayType.PayPostCreationSupporterAward:
            return 'پرداخت آپری پست ایجاد شده توسط پشتیبان';
        case InternalPayType.PayProductCreationSupporterAward:
            return 'پرداخت آپری محصول ایجاد شده توسط پشتیبان';
        case InternalPayType.PayProductPropCreationSupporterAward:
            return 'پرداخت آپری مشخصه محصول ایجاد شده توسط پشتیبان';
        case InternalPayType.PayStoryCreationSupporterAward:
            return 'پرداخت آپری استوری ایجاد شده توسط پشتیبان';
        case InternalPayType.PayFactor:
            return 'پرداخت فاکتور';
        case InternalPayType.PayFactorDepositorAward:
            return 'پرداخت آپری فاکتور به فروشنده';
        case InternalPayType.PayFactorReceiverAward:
            return 'پرداخت آپری فاکتور به خریدار';
        case InternalPayType.PayUpgradeStoryConsultHomePlan:
            return 'خرید پلن ارتقاء استوری صفحه اصلی مشورت';
        case InternalPayType.PayUpgradeStoryCityHomePlan:
            return 'خرید پلن ارتقاء استوری صفحه اصلی شهر';
        case InternalPayType.PayUpgradeStoryProductSearchPlan:
            return 'خرید پلن ارتقاء استوری جستجو محصول';
        case InternalPayType.PayUpgradeStoryPageSearchPlan:
            return 'خرید پلن ارتقاء استوری جستجو پیج';
        case InternalPayType.PayUpgradeStoryHashtagSearchPlan:
            return 'خرید پلن ارتقاء استوری جستجو هشتگ';
        case InternalPayType.PayUpgradePageStoryConsultPagePlan:
            return 'خرید پلن ارتقاء استوری صفحه در صفحه اصلی مشورت';
        case InternalPayType.PayUpgradePageStoryConsultProductPlan:
            return 'خرید پلن ارتقاء استوری صفحه در محصول مشورت';
        case InternalPayType.PayUpgradePageStoryConsultProductCommentPlan:
            return 'خرید پلن ارتقاء استوری صفحه در کامنت محصول';
        case InternalPayType.PayUpgradePageStoryConsultPageCommentPlan:
            return 'خرید پلن ارتقاء استوری صفحه در کامنت صفحه';
        case InternalPayType.PurchaseEventProduct:
            return 'ارتقاء محصول مناسبتی';
        case InternalPayType.PurchaseLadderProduct:
            return 'ارتقاء نردبان کردن محصول';
        case InternalPayType.PurchaseVirtualPropPlan:
            return 'پلن ارتقاء مشخصه مجازی';
        case InternalPayType.PrepareWithDelayPenalty:
            return 'جریمه آماده سازی با تاخیر';
        case InternalPayType.CancelBeforePrepare:
            return 'لغو قبل از آماده سازی';
        case InternalPayType.CancelAfterPrepare:
            return 'لغو بعد از آماده سازی';
        case InternalPayType.FactorBuyerSupervisorAward:
            return 'کارمزد دریافتی نمایندگی خریدار';
        case InternalPayType.FactorSellerSupervisorAward:
            return 'کارمزد دریافتی نمایندگی فروشنده';
        case InternalPayType.FactorSellerSupporterAward:
            return 'کارمزد دریافتی پشتیبان فروشنده';
        case InternalPayType.FactorBuyerSupporterAward:
            return 'کارمزد دریافتی پشتیبان خریدار';
        case InternalPayType.CancelBeforeAccept:
            return 'لغو قبل از تایید';
        default:
            return 'موجود نیست';
    }
}

export function useCase(type: number): string {
    switch (type) {
        case UseCase.PurchasePageCategoryCost:
            return 'خرید هزینه دسته بندی اصناف';
        case UseCase.PurchasePostExtraFile:
            return 'خرید فایل اضافی پست';
        case UseCase.PurchaseImmediatePlan:
            return 'خرید پلن فوری';
        case UseCase.PurchaseSpecialDiscountPlan:
            return 'خرید پلن تخفیفی ویژه';
        case UseCase.PurchaseAmazingPropPlan:
            return 'خرید پلن شگفت انگیز';
        case UseCase.PayIntroductionAward:
            return 'پرداخت آپر معرفی صفحه';
        case UseCase.PayPostLikeMiningAward:
            return 'پرداخت استخراج لایک پست';
        case UseCase.PayPostViewMiningAward:
            return 'پرداخت استخراج بازدید پست';
        case UseCase.PayProductLikeMiningAward:
            return 'پرداخت استخراج لایک محصول';
        case UseCase.PayProductViewMiningAward:
            return 'پرداخت استخراج بازدید محصول';
        case UseCase.PayProductCommentLikeMiningAward:
            return 'پرداخت استخراج لایک کامنت محصول';
        case UseCase.PayPageCommentLikeMiningAward:
            return 'پرداخت استخراج لایک کامنت صفحه';
        case UseCase.PayPostCommentLikeMiningAward:
            return 'پرداخت استخراج لایک کامنت پست';
        case UseCase.PayProductCommentReplyLikeMiningAward:
            return 'پرداخت استخراج لایک پاسخ کامنت محصول';
        case UseCase.PayReportMiningAward:
            return 'پرداخت استخراج گزارش اشکال';
        case UseCase.PaySupporterAward:
            return 'پرداخت آپری توسط پشتیبان';
        case UseCase.PayFactor:
            return 'پرداخت فاکتور';
        case UseCase.PayFactorAward:
            return 'پرداخت آپری فاکتور';
        case UseCase.PayUpgradeStoryConsultHomePlan:
            return 'خرید پلن ارتقاء استوری صفحه اصلی مشورت';
        case UseCase.PayUpgradeStoryCityHomePlan:
            return 'خرید پلن ارتقاء استوری صفحه اصلی شهر';
        case UseCase.PayUpgradeStoryProductSearchPlan:
            return 'خرید پلن ارتقاء استوری جستجو محصول';
        case UseCase.PayUpgradeStoryPageSearchPlan:
            return 'خرید پلن ارتقاء استوری جستجو پیج';
        case UseCase.PayUpgradeStoryHashtagSearchPlan:
            return 'خرید پلن ارتقاء استوری جستجو هشتگ';
        case UseCase.PurchaseEventProduct:
            return 'ارتقاء محصول مناسبتی';
        case UseCase.PurchaseLadderProduct:
            return 'ارتقاء نردبان کردن محصول';
        case UseCase.PurchaseVirtualPropPlan:
            return 'ارتقاء مشخصه مجازی';
        case UseCase.PaySupsWage:
            return 'پرداخت کارمزد پشتیبان ها و نمایندگی ها';
        case UseCase.PayDefaultWage:
            return 'پرداخت هزینه کارمزد پیش فرض';
        case UseCase.PayDelivey:
            return 'پرداخت هزینه پیک';
        default:
            return 'موجود نیست';
    }
}

export function upgradePlanType(type: number): string {
    switch (type) {
        case UpgradePlanType.ConsultHome:
            return 'صفحه اصلی مشورت';
        case UpgradePlanType.CityHome:
            return 'صفحه اصلی شهر';
        case UpgradePlanType.ProductSearch:
            return 'جستجو محصول';
        case UpgradePlanType.PageSearch:
            return 'جستجو صفحه';
        case UpgradePlanType.HashtagSearch:
            return 'جستجو هش تگ';
        default:
            return 'موجود نیست';
    }
}

export function accountType(type: number): string {
    switch (type) {
        case AccountType.Main:
            return 'اصلی';
        case AccountType.System:
            return 'سیستمی';
        case AccountType.Rental:
            return 'کرایه ای';
        case AccountType.PayInPlace:
            return 'پرداخت در محل';
        case AccountType.Supporter:
            return 'پشتیبان';
        default:
            return 'موجود نیست';
    }
}

export function factorStatus(type: number): string {
    switch (type) {
        case FactorStatus.Paying:
            return 'در حال پرداخت';
        case FactorStatus.SellerChecker:
            return 'منتظر تایید فروشنده';
        case FactorStatus.SellerAccepted:
            return 'تایید شده توسط فروشنده';
        case FactorStatus.SellerPrepared:
            return 'تهیه شده توسط فروشنده';
        case FactorStatus.WaitingForDelivery:
            return 'منتظر پاسخ پیک';
        case FactorStatus.DeliveryAccepted:
            return 'منتظر تایید پیک';
        case FactorStatus.Sending:
            return 'در حال ارسال';
        case FactorStatus.BuyerReceived:
            return 'تحویل گرفته شده توسط خریدار';
        case FactorStatus.SellBack:
            return 'برگردانده شده فروشنده';
        case FactorStatus.SellerCanceled:
            return 'لغو شده توسط فروشنده';
        case FactorStatus.BuyerCanceled:
            return 'لغو شده توسط خریدار';
        case FactorStatus.Final:
            return 'نهایی شده';
        default:
            return 'موجود نیست';
    }
}

export function deliveryAddressType(type: number): string {
    switch (type) {
        case DeliveryAddressType.HasNotDelivery:
            return 'تحویل ندارد';
        case DeliveryAddressType.UperSend:
            return 'ارسال آپری';
        case DeliveryAddressType.BuyerReceive:
            return 'دریافت توسط خریدار';
        case DeliveryAddressType.SellerSend:
            return 'ارسال فروشنده';
        default:
            return 'موجود نیست';
    }
}

export function cargoType(type: number): string {
    switch (type) {
        case CargoType.Normal:
            return 'تحویل ندارد';
        case CargoType.Special:
            return 'ارسال آپری';
        case CargoType.Airmail:
            return 'دریافت توسط خریدار';
        default:
            return 'موجود نیست';
    }
}

export function receiveTimeType(type: number): string {
    switch (type) {
        case RecieveTimeType.SixAmToNineAm:
            return 'شش صبح تا نه صبح';
        case RecieveTimeType.NineAmToTwelvePm:
            return 'نه صبح تا دوازده ظهر';
        case RecieveTimeType.TwelvePmToFifteenPm:
            return 'دوازده ظهر تا سه بعد ظهر';
        case RecieveTimeType.FifteenPmToEighteenPm:
            return 'سه بعد ظهر تا شش بعد ظهر';
        case RecieveTimeType.EighteenPmToTwentyOnePm:
            return 'شش بعد ظهر تا نه شب';
        case RecieveTimeType.TwentyOnePmToTwelveAm:
            return 'نه شب تا دوازده شب';
        default:
            return 'موجود نیست';
    }
}

export function creditLevel(type: number): string {
    switch (type) {
        case CreditLevel.Gold:
            return 'طلایی';
        case CreditLevel.Silver:
            return 'نقره ای';
        case CreditLevel.Bronze:
            return 'برنزی';
        default:
            return 'موجود نیست';
    }
}

export function getSellType(type: number): string {
    switch (type) {
        case SellType.Virtual:
            return i18n.global.tc("virtual");
        case SellType.Actual:
            return i18n.global.tc("actual");
        case SellType.Both:
            return i18n.global.tc("actualAndVirtual");
        default:
            return 'موجود نیست';
    }
}

export function locationType(type: number): string {
    switch (type) {
        case LocationType.Fixed:
            return 'ثابت';
        case LocationType.Mobile:
            return 'سیار';
        default:
            return 'موجود نیست';
    }
}

export function statusTypeId(type: number): string {
    switch (type) {
        case StatusTypeId.Open:
            return 'باز';
        case StatusTypeId.Close:
            return 'بسته';
        case StatusTypeId.UnderConstruction:
            return 'در حال ساخت';
        default:
            return 'موجود نیست';
    }
}

export function dayOfWeek(cell) {
    switch (cell) {
        case 0:
            return 'شنبه';
        case 1:
            return 'یک شنبه';
        case 2:
            return 'دو شنبه';
        case 3:
            return 'سه شنبه';
        case 4:
            return 'چهار شنبه';
        case 5:
            return 'پنج شنبه';
        case 6:
            return 'جمعه';
        default:
            return 'موجود نیست';
    }
}
