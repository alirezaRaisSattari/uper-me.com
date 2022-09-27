// APP ***************************************
import App from '@/app/App.vue'
import router from '@/core/router/router'
import {createI18n} from 'vue-i18n'
import {createApp} from 'vue'
import {createPinia} from 'pinia'
import PrimeVue from 'primevue/config';
import SwiperCore, {A11y, Navigation, Pagination, Scrollbar} from 'swiper';
// COMPONENT ***************************************
import {Swiper, SwiperSlide} from "swiper/vue";
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Loading from '@/app/public/shared/loading/Loading.vue';
import Dialog from 'primevue/dialog';
import Menu from 'primevue/menu';
import Checkbox from 'primevue/checkbox';
import lazyPlugin from 'vue3-lazy'
/////
import ConfirmationService from 'primevue/confirmationservice';
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmPopup from 'primevue/confirmpopup';
/////
import ToastService from 'primevue/toastservice';
// import 'firebase/messaging';
// import firebaseMessaging from '@/core/service/firebase'
// CSS ***************************************
import '../src/assets/style/iziToast.min.css'
import '../src/assets/style/nprogress.css'
import '../src/assets/style/bootstrap.css'
import '../src/assets/style/fontello.css'
import 'swiper/swiper-bundle.css';
import '@/styles.scss'
import 'primevue/resources/themes/bootstrap4-light-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
// TS ***************************************
import {LanguageType} from './core/enum/enums'
import {getLanguageFromCache} from "@/core/service/utils.service"
// JS ***************************************
import './assets/js/iziToast.min'
import './assets/js/nprogress'
// JSON ***************************************
import en from '@/translation/en.json'
import fa from './translation/fa.json'
import {DataFormatterService} from './core/service/dataFormater.service'
import { DateService } from './core/service/date.service';


// ********************************************
// lottie

export const i18n = createI18n({
    messages: {
        en: en,
        fa: fa,
    },
    fallbackLocale: LanguageType.fa,
    locale: getLanguageFromCache(),
})

const pinia = createPinia()

export const application = createApp(App)
application.config.warnHandler = () => null;
// application.config.globalProperties.$messaging = firebaseMessaging

application.config.globalProperties.$function = {
    goTo(path) {
        router.push(path)
    },
    goBack(){
        router.back();
    }
}
application.config.globalProperties.$filters = {
    currency(value , decimalDigits = false) {
        return DataFormatterService.getInstance().formatCurrency(value , decimalDigits);
    },jalali(value , withTime: boolean = false) {
        return DateService.getInstance().convertToJalali(value , withTime)
    },getJalaliTime(value) {
        return DateService.getInstance().getJalaliTime(value)
    },getHours(value) {
        return DateService.getInstance().getHours(value)
    },getDayOrHours(minutes) {
        return DataFormatterService.getInstance().getDayOrHours(minutes)
    },timeDifference(date) {
        return DateService.getInstance().timeDifference(date);
    } 
}


application.use(router)
application.use(pinia)
application.use(i18n)
application.use(PrimeVue, {ripple: true})
application.use(ConfirmationService);
application.use(ToastService);
application.use(lazyPlugin, {
    loading: 'https://up-staticfiles.s3.ir-thr-at1.arvanstorage.com/loading.webp',
    error: 'https://up-staticfiles.s3.ir-thr-at1.arvanstorage.com/failed.webp'
});
application.component('loading', Loading)
application.component('Button', Button)
application.component('InputText', InputText)
application.component('Dialog', Dialog)
application.component('Menu', Menu)
application.component('Checkbox', Checkbox)
application.component('ConfirmDialog', ConfirmDialog)
application.component('ConfirmPopup', ConfirmPopup)
application.component('Swiper', Swiper)
application.component('SwiperSlide', SwiperSlide)

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
application.mount('#app')








