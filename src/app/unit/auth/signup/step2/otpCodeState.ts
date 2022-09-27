import { EnumKeys } from "@/core/constant/constant"
import { UserRepository } from "@/core/repository/user.repository"
import { LocalStorageService } from "@/core/service/localStorage.service"
import { RegisterSendSmsModel } from "@/data/auth/login.model"
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import {toEnglishDigits} from "@/core/service/utils.service";

export class stepTowState {
    loading = false
    enterAgain = false
    hashToken = ""
    refreshToken = ""
    fpPromise = FingerprintJS.load()
    visitorId

    constructor(private onCreate) {
        ; (async () => {
            const fp = await this.fpPromise
            const result = await fp.get()
            this.visitorId = result.visitorId
        })()
    }

    userVerify(otp, prefix, mobile, introduceCode) {
        UserRepository.getInstance().verifyCode({
            body: {
                mobileNumber: mobile,
                prefix: prefix,
                otpCode: otp,
                introduceCode: `@${introduceCode}`,
                session: {
                    deviceType: 2,
                    fireBaseToken: this.visitorId,
                    deviceName: window.navigator.userAgent.slice(0, 248),
                    serialNumber: this.visitorId
                },
            },
            onLoadChange: (load) => this.loading = load,
            onReceive: (res) => {
                if (res.hashToken !== null) {
                    LocalStorageService.getInstance().setItem(EnumKeys.KeyToken, 'Bearer ' + res.hashToken)
                    LocalStorageService.getInstance().setItem(EnumKeys.KeyRefreshToken, res.refreshToken)
                    this.onCreate()
                }
            }
        })
    }

    userSignUp(body: RegisterSendSmsModel) {
        UserRepository.getInstance().signup({
            body: body,
            onLoadChange: (load) => this.loading = load,
            onReceive: () => {
                this.enterAgain = true;
            }
        })
    }
}
