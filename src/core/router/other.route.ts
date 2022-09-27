import { canActivatedGuard } from "@/core/router/router";
import { RouteRecordRaw } from "vue-router";

const NewSearchMainScreen = () => import('@/app/unit/search/main/NewSearchMainScreen.vue');
const ConsultPage = () => import('@/app/unit/consultPages/consultPage.vue');
const ShoppingCard = () => import('@/app/unit/newShoppingCard/shoppingCard.vue');
//ShoppingCard
const ShoppingCardMain = () => import('@/app/unit/newShoppingCard/shopingCardMainController/shopingCardMainControllerPageScreen.vue');
const customCard = () => import('@/app/unit/newShoppingCard/shopingCardMainController/customShopping/customShoppingPageScreen.vue');
const customShopCard = () => import('@/app/unit/newShoppingCard/shopingCardMainController/customShopping/customMadeProduct/customShopMadeProductPageScreen.vue');
const customShopMadeProductPerview = () => import('@/app/unit/newShoppingCard/shopingCardMainController/customShopping/customMadeProduct/customShopMadeProductPerview/customShopMadeSingleProductScreen.vue');
const shoppingCart = () => import('@/app/unit/newShoppingCard/shopingCardMainController/shoppingCart/shoppingCartPageScreen.vue');
const ShoppingCardPayment = () => import('@/app/unit/newShoppingCard/shopingCardMainController/payment/shoppingCardPaymentPageScreen.vue');
const shoppingHistory = () => import('@/app/unit/newShoppingCard/shopingCardMainController/shoppingHistory/shoppingHistoryPageScreen.vue');
const returnedHistory = () => import('@/app/unit/newShoppingCard/shopingCardMainController/returnedHistory/returnedHistoryPageScreen.vue');
const freeVouchers = () => import('@/app/unit/newShoppingCard/shopingCardMainController/freeVouchers/freeVouchersPageScreen.vue');
const factorDetails2 = () => import('@/app/unit/pages/workPage/sellCart/new/factorDetails2/factorDetails2pageScreen.vue') //ralia just test
//end ShoppingCar
const Wallet = () => import('@/app/unit/wallet/walletScreen.vue')
const ShoppingCartList = () => import('@/app/unit/shared/lists/shoppingCartList/shoppingCartListPageScreen.vue')
const shoppingCartChoseAddress = () => import('@/app/unit/newShoppingCard/shopingCardMainController/selectAddress/selectAddressPageScreen.vue')
const HowToSend = () => import('@/app/unit/shared/lists/shoppingCartList/howToSend/howToSendPageScreen.vue')
const Locations = () => import('@/app/unit/shared/locations/locationsPageScreen.vue')
const WalletTransaction = () => import('@/app/unit/wallet/walletTransaction/walletTransactionScreen.vue')
const ComingSoon = () => import('@/app/unit/shared/comingSoon/ComingSoon.vue')
const ExploreScreen = () => import('@/app/unit/search/explore/ExploreScreen.vue')
const TestComponent = () => import('@/app/public/shared/test/test.vue')
const IncreaseCashScreen = () => import('@/app/public/shared/payRedirects/increaseCashScreen.vue')
const PayStatusScreen = () => import('@/app/public/shared/payRedirects/payStatusScreen.vue')
const supervisor = () => import('@/app/unit/supervisor/supervisorScreen.vue')
const selectSupporter = () => import('@/app/unit/supervisor/selectSupporter/selectSupporter.vue')
const ExploreVertical = () => import('@/app/unit/search/ExploreVertical/ExploreVertical.vue')
const AddFileFromPost = () => import('@/app/unit/pages/addFileFromPost/addFileFromPostPageScreen.vue')
const TheEventPage = () => import('@/app/unit/pages/theEventPage/theEventPageScreen.vue')

export const otherRoutes: Array<RouteRecordRaw> = [
    { path: '/consult', component: ConsultPage, name: 'consultPage', beforeEnter: [canActivatedGuard] },
    { path: '/explore/:tagId?', component: ExploreScreen },
    { path: '/search/:categoryId?', component: NewSearchMainScreen },
    { path: '/paystatus', component: PayStatusScreen },
    { path: '/increasecash', component: IncreaseCashScreen },
    { path: '/search/:unit/:catId', component: NewSearchMainScreen },
    { path: '/qrcode', component: ComingSoon },
    { path: '/chat', component: ComingSoon },
    { path: '/customMadeShopCard/:wid', component: customShopCard },
    { path: '/customShopMadeProductPerview/:customId', component: customShopMadeProductPerview },
    { path: '/shopping-cart', component: ShoppingCard, beforeEnter: [canActivatedGuard] },
    { path: '/eventPage', component: TheEventPage },
    {
        path: '/shopping-cart-main',
        redirect: 'shoppingCart',
        component: ShoppingCardMain,
        beforeEnter: [canActivatedGuard],
        children: [
            { path: '/custom', component: customCard, beforeEnter: [canActivatedGuard] },
            { path: '/shoppingCart', component: shoppingCart, beforeEnter: [canActivatedGuard] },
            { path: '/shoppingHistory', component: shoppingHistory, beforeEnter: [canActivatedGuard] },
            { path: '/returnedHistory', component: returnedHistory, beforeEnter: [canActivatedGuard] },
            { path: '/freeVouchers', component: freeVouchers, beforeEnter: [canActivatedGuard] },
        ]
    },
    { path: '/ralia', component: factorDetails2 }, //just test ralia
    { path: '/supervisor', component: selectSupporter, beforeEnter: [canActivatedGuard] },
    { path: '/supervisor/:supporterId/:unit', component: supervisor, beforeEnter: [canActivatedGuard] },
    { path: '/wallet', component: Wallet, beforeEnter: [canActivatedGuard] },
    { path: '/shoppingCart/:id', component: ShoppingCartList, beforeEnter: [canActivatedGuard] },
    { path: '/shoppingCartChoseAddress', component: shoppingCartChoseAddress, beforeEnter: [canActivatedGuard] },
    { path: '/howToSend', component: HowToSend, beforeEnter: [canActivatedGuard] },
    { path: '/locations', component: Locations, beforeEnter: [canActivatedGuard] },
    { path: '/addFileFromPost/:id', component: AddFileFromPost, beforeEnter: [canActivatedGuard] },
    { path: '/shoppingCardPayment', component: ShoppingCardPayment, beforeEnter: [canActivatedGuard] },
    { path: '/wallet/transaction/:accountNumber', component: WalletTransaction, beforeEnter: [canActivatedGuard] },
    { path: '/test', component: TestComponent },

]
