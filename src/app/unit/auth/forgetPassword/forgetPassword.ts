import {UserRepository} from "@/core/repository/user.repository";
import {SettingRepository} from "@/core/repository/setting.repository";

export class forgetPasswordState {
    ok = false
    mobileInfo = {}
    loading = false
    mobilesPrefix: any
    prefixLoading = false

    submitMobile(body) {
        UserRepository.getInstance().forgetPassword({
            body: body,
            onReceive: (res) => {
                this.mobileInfo = res
                this.ok = true
            },
            onLoadChange: (load) => this.loading = load,
        })
    }

    mobilePrefix() {
        SettingRepository.getInstance().mobilePrefix({
            onReceive: (res) => {
                this.mobilesPrefix = res
            },
            onError: () => {
            },
            onLoadChange: (load) => {
                this.prefixLoading = load
            }
        })
    }
}
