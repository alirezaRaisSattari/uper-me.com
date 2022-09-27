import { UserRepository } from "@/core/repository/user.repository";
import { RegisterSendSmsModel } from "@/data/auth/login.model";
import { SettingRepository } from "@/core/repository/setting.repository";
import { ReturnResponse } from "@/core/repository/repository";

export class RegisterState {
    loading = false
    nextStep = false
    userCode = []
    mobilesPrefixVal: any
    prefixLoading = false
    introduceCodeCheck = false

    constructor(private onCreate) {

    }

    userSignUp(body: RegisterSendSmsModel) {
        UserRepository.getInstance().signup({
            body: body,
            onLoadChange: (load) => this.loading = load,
            onReceive: () => {
                this.onCreate()
            }
        })
    }

    mobilePrefix() {
        SettingRepository.getInstance().mobilePrefix({
            onReceive: (res) => {
                this.mobilesPrefixVal = res
            },
            onError: () => {
            },
            onLoadChange: (load) => {
                this.prefixLoading = load
            }
        })
    }

    introduceCode(introduceCode) {
        UserRepository.getInstance().CheckIntroduceCode({
            urlContent: {
                introduceCode: introduceCode
            },
            onReceive: () => {
                this.introduceCodeCheck = true
            },
            onError: () => {
                this.introduceCodeCheck = false
            },
            onLoadChange: (load) => {
                this.prefixLoading = load
            }
        })
    }
}
