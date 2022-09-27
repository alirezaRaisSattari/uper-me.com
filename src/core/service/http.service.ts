import axios from 'axios'
import {Constant, EnumKeys} from '../constant/constant'
import moment from 'moment'
import CryptoJS from 'crypto-js'
import {capitalizeFirstLetter, getLanguageFromCache} from "@/core/service/utils.service";
import {LocalStorageService} from "@/core/service/localStorage.service";

let instance = axios.create({
    headers: {
        'Content-type': 'application/json',
        'Accept-Language': `${capitalizeFirstLetter(getLanguageFromCache())}`,
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache',
    },
})

instance.defaults.timeout = 15000

instance.interceptors.request.use(function (config) {
    if (config.url != Constant.ApiCheckRefreshToken) {

        config.headers.Authorization = LocalStorageService.getInstance().getItem(EnumKeys.KeyToken) ?? '';
    }
    config.headers['set-cookie'] = getCookieKey()
    return config;
});

function getCookieKey() {
    return CryptoJS
        .TripleDES
        .encrypt(
            JSON.stringify(
                {
                    Epoch: parseFloat(String(moment.now())),
                    Audience: 'Uper-Co-Audience',
                    Issuer: 'Uper-Co-Issuer'
                }
            ),
            CryptoJS.enc.Utf8.parse("sblw-3hn8-sqoy19"),
            {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            }
        )
}

export default instance;
