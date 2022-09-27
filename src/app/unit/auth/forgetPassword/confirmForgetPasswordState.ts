import {UserRepository} from "@/core/repository/user.repository";
import router from "@/core/router/router";
import {ToastService} from "@/core/service/toast.service";
import {i18n} from "@/main";

export class stepTowState {
    enterAgain = false
    mobileInfo = {}
    loading = false
    finished = false
    submitDisable = false
    repeatDisable = false

    otpCodeConfirmation(body) {
        UserRepository.getInstance().otpCodeConfirmation({
            body: body,
            onReceive: () => {
                this.finished = true
                ToastService.getInstance().success(i18n.global.tc('success'));
                router.push("/login");
            },
            onLoadChange: (load) => {
                this.submitDisable = load
            }
        })
    }

    submitMobile(body) {
        UserRepository.getInstance().forgetPassword({
            body: body,
            onReceive: () => {
                this.enterAgain = true
                ToastService.getInstance().success(i18n.global.tc('success submit'));
            },
            onLoadChange: (load) => this.repeatDisable = load,
        })
    }
}
