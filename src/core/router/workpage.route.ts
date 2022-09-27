import { RouteRecordRaw } from "vue-router";
import { canActivatedGuard } from "@/core/router/router";

const EditDetails = () => import('@/app/unit/pages/workPage/editWorkPage/editWorkPageDetails.vue')
const workPageEmployee = () => import('@/app/unit/pages/workPage/workPageEmployee/WorkPageEmployee.vue')
const AddEmployee = () => import('@/app/unit/pages/workPage/workPageEmployee/AddEmployee.vue')
const getEmployeePermission = () => import('@/app/unit/pages/workPage/workPageEmployee/GetEmployeePermission.vue')
const chooseStation = () => import('@/app/unit/pages/workPage/station/chooseStation/chooseStation.vue')
const hostBooth = () => import('@/app/unit/pages/workPage/station/hostBooth/hostBooth.vue')
const yourStations = () => import('@/app/unit/pages/workPage/station/yourStations/yourStations.vue')
const WorkPageDetails = () => import('@/app/unit/pages/workPage/newWorkPageDetails/workPageDetailScreen.vue')
const PagesCort = () => import('@/app/unit/pages/workPage/pagesCort/PagesCort.vue')
const FinancialServices = () => import('@/app/unit/pages/workPage/financialServices/FinancialServices.vue')
const mainRebateCode = () => import('@/app/unit/pages/workPage/rebateCode/mainRebateCode.vue')
const createRebateCode = () => import('@/app/unit/pages/workPage/rebateCode/createRebateCode/createRebateCode.vue')
const updateRebateCode = () => import('@/app/unit/pages/workPage/rebateCode/updateRebateCode/updateRebateCode.vue')
const editWorkPageTime = () => import('@/app/unit/pages/workPage/editWorkPage/editShift/MainEditShift.vue')
const editWorkPageImages = () => import('@/app/unit/pages/workPage/editWorkPage/editWorkPageImages.vue')
const myArchiveWorkPage = () => import('@/app/unit/pages/mainPage/archives/myArchives.vue')
const AddressList = () => import('@/app/unit/pages/workPage/WorkPageAddressList/AddressList.vue')
const AddAddressGlobal = () => import('@/app/unit/shared/addAddressGlobal/addAddressGlobalPageScreen.vue')
const createNewAddress = () => import('@/app/unit/pages/workPage/WorkPageAddressList/createNewAddress.vue')
const StationPreview = () => import('@/app/unit/pages/workPage/station/yourStations/perview/stationsPerviewPageScreen.vue')
const CreateStation = () => import('@/app/unit/pages/workPage/station/yourStations/createStation/createStationPageScreen.vue')
const UpdateStation = () => import('@/app/unit/pages/workPage/station/yourStations/updateStation/updateStationPageScreen.vue')
const PageComment = () => import('@/app/unit/pages/workPage/pageComment/PageComment.vue')
const workPageComment = () => import('@/app/unit/pages/workPage/workPageComments/workPageComment.vue')
const workPageSubmitComment = () => import('@/app/unit/pages/workPage/workPageComments/submitComment/submitComment.vue')
const MainPageBlockUser = () => import('@/app/unit/pages/mainPage/blockList/MainPageBlockList.vue')
const workPageReplyComment = () => import('@/app/unit/pages/workPage/workPageComments/replyComment/replyComment.vue')
const upgradeStory = () => import('@/app/unit/pages/story/upgrade/upgrade.vue')
const deliverySetting = () => import('@/app/unit/pages/workPage/deliverySettings/deliverySettingScreen.vue')
const uperDelivery = () => import('@/app/unit/pages/workPage/deliverySettings/units/unit1/uperDelivery.vue')
const sellerDelivery = () => import('@/app/unit/pages/workPage/deliverySettings/units/unit2/sellerDelivery.vue')
const collectFromBuyer = () => import('@/app/unit/pages/workPage/deliverySettings/units/unit3/collectFromBuyer.vue')

export const workPageRoutes: Array<RouteRecordRaw> = [
    { path: '/rebate-code', component: mainRebateCode },
    { path: '/create-rebate-code', component: createRebateCode },
    { path: '/work-page-time/:id/:username', component: editWorkPageTime },
    { path: '/update-rebate-code/:workPageId/:code', component: updateRebateCode },
    { path: '/my-archive-items', component: myArchiveWorkPage },
    { path: '/edit-workPage-details', component: EditDetails, beforeEnter: [canActivatedGuard] },
    { path: '/page/station', component: chooseStation },   // main in station = chooseStation
    { path: '/page/hostBooth', component: hostBooth },   // hostBooth in station
    { path: '/page/yourStations', component: yourStations },   // yourStations in station
    { path: '/work-page-employee', component: workPageEmployee, beforeEnter: [canActivatedGuard] },
    { path: '/add-employee', component: AddEmployee, beforeEnter: [canActivatedGuard] },
    { path: '/employee-permission/:staffId', component: getEmployeePermission, beforeEnter: [canActivatedGuard] },
    { path: '/cort', component: PagesCort, beforeEnter: [canActivatedGuard] },
    { path: '/financial', component: FinancialServices, beforeEnter: [canActivatedGuard] },
    { path: '/update-images', component: editWorkPageImages, beforeEnter: [canActivatedGuard] },
    { path: '/address-list', component: AddressList, beforeEnter: [canActivatedGuard] },
    { path: '/addAddressGlobal', component: AddAddressGlobal, beforeEnter: [canActivatedGuard] },
    { path: '/create-address', component: createNewAddress, beforeEnter: [canActivatedGuard] },
    { path: '/stationPreview/:id', component: StationPreview, beforeEnter: [canActivatedGuard] },
    { path: '/createStation', component: CreateStation, beforeEnter: [canActivatedGuard] },
    { path: '/updateStation/:id', component: UpdateStation, beforeEnter: [canActivatedGuard] },
    { path: '/page/work-page-block-list', component: MainPageBlockUser, beforeEnter: [canActivatedGuard] },
    { path: '/page/page-comment', component: PageComment, beforeEnter: [canActivatedGuard] },
    { path: '/page/workPageComment/:userName', component: workPageComment },
    { path: '/page/workPageSubmitComment/:userName', component: workPageSubmitComment },
    { path: '/page/workPageReplyComment/:userName/:commentId', component: workPageReplyComment },
    { path: '/work-page-details/:username/:id', component: WorkPageDetails },
    { path: '/story/upgrade', component: upgradeStory },
    { path: '/deliverySetting', component: deliverySetting },
    { path: '/deliverySetting/uperDelivery/:isEdit', component: uperDelivery, beforeEnter: [canActivatedGuard] },
    { path: '/deliverySetting/sellerDelivery/:isEdit', component: sellerDelivery, beforeEnter: [canActivatedGuard] },
    { path: '/deliverySetting/collectFromBuyer/:isEdit', component: collectFromBuyer, beforeEnter: [canActivatedGuard] },
]
