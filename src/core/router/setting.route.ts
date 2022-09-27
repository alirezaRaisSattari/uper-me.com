import {RouteRecordRaw} from "vue-router";
import {canActivatedGuard} from "@/core/router/router";

const SettingScreen = () => import('@/app/public/setting/SettingScreen.vue');
const ChangePasswordScreen = () => import('@/app/public/setting/changePassword/ChangePasswordScreen.vue');
const ChangeSecurityQuestionScreen = () => import('@/app/public/setting/changeSecurityQuestion/ChangeSecurityQuestionScreen.vue');
const SessionScreen = () =>  import('@/app/public/setting/session/sessionPageScreen.vue');
export const settingRoutes: Array<RouteRecordRaw> = [
    {path: '/setting', component: SettingScreen},
    {path: '/setting/change-password', component: ChangePasswordScreen, beforeEnter: [canActivatedGuard]},
    {path: '/setting/change-security-question',component: ChangeSecurityQuestionScreen,beforeEnter: [canActivatedGuard]},
    {path: '/setting/changePassword', component: ChangePasswordScreen, beforeEnter: [canActivatedGuard]},
    {path: '/setting/session', component: SessionScreen, beforeEnter: [canActivatedGuard]},
]