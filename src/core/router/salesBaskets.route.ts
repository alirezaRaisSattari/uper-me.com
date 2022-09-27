import {RouteRecordRaw} from "vue-router";
import {canActivatedGuard} from "@/core/router/router";

const SalesBasketsRouter = () => import("@/app/unit/pages/workPage/sellCart/mainController/mainWorkPageSellCartControllerScreen.vue");
const Custom = () => import("@/app/unit/pages/workPage/sellCart/customMade/customMadePageScreen.vue");
const CustomProduct = () => import("@/app/unit/pages/workPage/sellCart/customMade/products/customMadeProductPageScreen.vue");
const NewSellCarts = () => import("@/app/unit/pages/workPage/sellCart/new/newSellCartPageScreen.vue");
const AcceptedSellCarts = () => import("@/app/unit/pages/workPage/sellCart/accepted/acceptedSellCartPageScreen.vue");
const SendingSellCarts = () => import("@/app/unit/pages/workPage/sellCart/sending/sendingSellCartsPageScreen.vue");
const DeliveredFactorsSellCarts = () => import("@/app/unit/pages/workPage/sellCart/InvoicesDelivered/InvoicesDeliveredPageScreen.vue");
const SettlementsSellCarts = () => import("@/app/unit/pages/workPage/sellCart/cleared/clearedSellCartPageScreen.vue");
const ReturnedHistorySellCarts = () => import("@/app/unit/pages/workPage/sellCart/referenceRecords/referenceRecordsPageScreen.vue");
const CanceledByYouSellCarts = () => import("@/app/unit/pages/workPage/sellCart/cancelByYou/cancelByYouSellCartPageScreen.vue");
const CanceledByBuyerSellCarts = () => import("@/app/unit/pages/workPage/sellCart/cancellationByBuyer/cancellationByBuyerPageScreen.vue");
const CustomProductPerview = () => import("@/app/unit/pages/workPage/sellCart/customMade/products/singleProduct/customMadeSingleProductScreen.vue");
const FactorDetails = () => import("@/app/unit/pages/workPage/sellCart/new/factorDetails/factorDetailsPageScreen.vue");
const SimpleFactorDetails = () => import("@/app/unit/pages/workPage/sellCart/new/factorDetails/simpleFactorDetails.vue");
const FactorDetailsDeliveredFactors = () => import("@/app/unit/pages/workPage/sellCart/new/factorDetailsDeliveredFactors/factorDetailsDeliveredFactorsPageScreen.vue");
const FactorDetailsReturnedHistory = () => import("@/app/unit/pages/workPage/sellCart/new/factorDetailsReturnedHistory/factorDetailsRturnedHistoryPageScreen.vue");
const FactorDetailsReturnedHistoryAlt = () => import("@/app/unit/pages/workPage/sellCart/new/factorDetailsReturnedHistoryAlt/factorDetailsRturnedHistoryAltPageScreen.vue");
const factorDetailsShoppingHistory = () => import("@/app/unit/pages/workPage/sellCart/new/factorDetailsShoppingHistory/factorDetailsShoppingHistoryScreen.vue");
const ReceiptOfDeliveryToCustomer = () => import("@/app/unit/pages/workPage/sellCart/new/factorDetails/receiptOfDeliveryToCustomer/receiptOfDeliveryToCustomerPageScreen.vue");


export const salesBasketsRouter: Array<RouteRecordRaw> = [
    {
        path: "/salesBaskets", redirect: '/customMade', component: SalesBasketsRouter, children: [
            {path: "/customMade", component: Custom , beforeEnter: [canActivatedGuard]},
            {path: "/newSellCarts", component: NewSellCarts , beforeEnter: [canActivatedGuard]},
            {path: "/acceptedSellCarts", component: AcceptedSellCarts , beforeEnter: [canActivatedGuard]},
            {path: "/sendingSellCarts", component: SendingSellCarts , beforeEnter: [canActivatedGuard]},
            {path: "/deliveredFactorsSellCarts", component: DeliveredFactorsSellCarts , beforeEnter: [canActivatedGuard]},
            {path: "/settlementsSellCarts", component: SettlementsSellCarts , beforeEnter: [canActivatedGuard]},
            {path: "/returnedHistorySellCarts", component: ReturnedHistorySellCarts , beforeEnter: [canActivatedGuard]},
            {path: "/canceledByYouSellCarts", component: CanceledByYouSellCarts , beforeEnter: [canActivatedGuard]},
            {path: "/canceledByBuyerSellCarts", component: CanceledByBuyerSellCarts , beforeEnter: [canActivatedGuard]},
        ],
    },
    {path: "/customMadeProduct/:buyerPageId", component: CustomProduct , beforeEnter: [canActivatedGuard]},
    {path: "/customProductPerview/:customId", component: CustomProductPerview , beforeEnter: [canActivatedGuard]},
    {path: "/factorDetails/:factorId", component: FactorDetails , beforeEnter: [canActivatedGuard]},
    {path: "/showFactorDetails/:factorId", component: SimpleFactorDetails , beforeEnter: [canActivatedGuard]},
    {path: "/factorDetailsDeliveredFactors/:factorId", component: FactorDetailsDeliveredFactors , beforeEnter: [canActivatedGuard]},
    {path: "/factorDetailsReturnedHistory/:factorId", component: FactorDetailsReturnedHistory , beforeEnter: [canActivatedGuard]},
    {path: "/factorDetailsReturnedHistoryAlt/:factorId", component: FactorDetailsReturnedHistoryAlt , beforeEnter: [canActivatedGuard]},
    {path: "/factorDetailsShoppingHistory/:factorId", component: factorDetailsShoppingHistory , beforeEnter: [canActivatedGuard]},
    {path: "/receiptOfDeliveryToCustomer/:factorId", component: ReceiptOfDeliveryToCustomer , beforeEnter: [canActivatedGuard]},
];
