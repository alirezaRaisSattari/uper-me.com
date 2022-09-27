import {RouteRecordRaw} from "vue-router";

const LoginScreen = () => import('@/app/unit/auth/login/LoginScreen.vue');
const forgetPassword = () => import('@/app/unit/auth/forgetPassword/forgetPassword.vue');
const RegisterScreen = () => import('@/app/unit/auth/signup/RegisterScreen.vue');
// const GetInformationOfUser = () => import('@/app/unit/auth/getInformation/GetInformationScreen.vue');
// const OtpCode = () => import('@/app/unit/auth/otpcode/receiveCode.vue')

export const authRoutes: Array<RouteRecordRaw> = [
    {path: '/login', component: LoginScreen, name: 'Login'},
    {path: '/register', component: RegisterScreen, name: 'Register'},
    // {path: '/get-information', component: GetInformationOfUser, name: 'GetInformationOfUser'},
    {path: '/forget-password', name: 'forgetPassword', component: forgetPassword},
    // {path: '/otp-code/:prefix/:mobile', component: OtpCode},

]