import httpClientBase from "@/core/service/http.service";
import {ToastService} from "@/core/service/toast.service";
import {i18n} from "@/main";
import {Constant, EnumKeys} from "../constant/constant";
import router from "../router/router";
import {LocalStorageService} from "../service/localStorage.service";
import {AuthStore} from "../store/auth.store";
import {PageStore} from "../store/page.store";

export class Repository {
    isRefreshingToken = false;

    private static validateResponse(res, data) {
        if (!(typeof res === 'object')) {
            ToastService.getInstance().error(i18n.global.tc('anErrorAccrue'))
            return false;
        }

        if (!(res.payload || res.message || res.statusCode)) {
            ToastService.getInstance().error(i18n.global.tc('anErrorAccrue'))
            return false;
        }
        
        if (res.statusCode != 200 && res.statusCode != 204) {
            if (res.statusCode == 410) {
                return true;
            }
            if (res.statusCode != 401) ToastService.getInstance().error(res.message)
            return false;
        }


        return true;
    }

    get(data: ReturnResponse) {
        data.onLoadChange?.call(true, true);

        httpClientBase.get(data.url ?? '')
            .then(value => value)
            .then(value => {
                let isValidate = Repository.validateResponse(value.data, data);
                data.onLoadChange?.call(false, false);
                if (isValidate) {
                    data.onReceive?.call(null, value.data.payload)
                    return
                } else {
                    if (value.data.statusCode == 401 || value.status === 401) {
                        data.onLoadChange?.call(true, true);
                        this.refreshToken(() => this.get(data))
                    }
                    data.onError?.call(null, value.data.message)
                }
            }).catch(e => {
            this.networkErrorHandler(e, data)
        });

    }

    post(data: ReturnResponse) {
        data.onLoadChange?.call(true, true);
        httpClientBase.post(data.url ?? '', data.body)
            .then(value => value)
            .then(value => {
                let isValidate = Repository.validateResponse(value.data, data);
                data.onLoadChange?.call(false, false);
                if (isValidate) {
                    data.onReceive?.call(null, value.data.payload)
                } else {
                    if (value.data.statusCode == 401 || value.status === 401) {
                        data.onLoadChange?.call(true, true);
                        this.refreshToken(() => this.post(data))
                    }
                    data.onError?.call(null, value.data.message)
                }
            }).catch(e => {
            this.networkErrorHandler(e, data)
        });
    }

    put(data: ReturnResponse) {
        data.onLoadChange?.call(true, true);
        httpClientBase.put(data.url ?? '', data.body)
            .then(value => value)
            .then(value => {
                let isValidate = Repository.validateResponse(value.data, data);
                data.onLoadChange?.call(false, false);
                if (isValidate) {
                    data.onReceive?.call(null, value.data.payload)
                } else {
                    if (value.data.statusCode == 401 || value.status === 401) {
                        data.onLoadChange?.call(true, true);
                        this.refreshToken(() => this.put(data))
                    }
                    data.onError?.call(null, value.data.message)
                }
            }).catch(e => {
            this.networkErrorHandler(e, data)
        });
    }

    delete(data: ReturnResponse) {
        data.onLoadChange?.call(true, true);
        httpClientBase.delete(data.url ?? '', { data: data.body })
            .then(value => value)
            .then(value => {
                let isValidate = Repository.validateResponse(value.data, data);
                data.onLoadChange?.call(false, false);
                if (isValidate) {
                    data.onReceive?.call(null, value.data.payload)
                } else {
                    if (value.data.statusCode === 401 || value.status === 401) {
                        data.onLoadChange?.call(true, true);
                        this.refreshToken(() => this.delete(data))
                    }
                    data.onError?.call(null, value.data.message)
                }
            }).catch(e => {
            this.networkErrorHandler(e, data)
        });
    }

    networkErrorHandler(e, data) {
        data.onLoadChange?.call(false, false);
        data.onError?.call(null, i18n.global.tc('serverError'))
        ToastService.getInstance().error(e.message)
    }

    private refreshToken(onRefreshSuccess) {
        if (this.isRefreshingToken) return;
        this.isRefreshingToken = true;
        const body = {refreshToken: LocalStorageService.getInstance().getItem(EnumKeys.KeyRefreshToken)};
        httpClientBase.post(Constant.ApiCheckRefreshToken, body)
            .then(value => value)
            .then(value => {
                let token = `Bearer ${value.data.payload.hashToken}`
                let refreshToken = value.data.payload.refreshToken
                LocalStorageService.getInstance().setItem(EnumKeys.KeyToken, token)
                LocalStorageService.getInstance().setItem(EnumKeys.KeyRefreshToken, refreshToken)
                onRefreshSuccess()
                this.isRefreshingToken = false;
            }).catch(e => {
            this.errorInRefreshToken()
        });
    }

    private errorInRefreshToken() {
        ToastService.getInstance().error(i18n.global.tc('errorInRefreshToken'))
        LocalStorageService.getInstance().clear()
        AuthStore().isLoggedIn = false
        PageStore().selectedPageId = null
        router.push('/login')
        this.isRefreshingToken = false;
    }
}

export class ReturnResponse {
    url?: string
    urlContent?: any
    body?: any
    onLoadChange?: (loadStatus: boolean) => void
    onError?: (message: String) => void
    onReceive?: (res: any) => void
}
