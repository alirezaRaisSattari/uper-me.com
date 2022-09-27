import {UserRepository} from "@/core/repository/user.repository";
import {ToastService} from "@/core/service/toast.service";
import {UpdateMainPageForSecurityQuestion} from "@/data/setting/security.model";
import router from "@/core/router/router";
import {i18n} from "@/main";

export class ChangeSecurityQuestionState {
    loading = false

    change(securityQuestion, answerQuestion, password) {
        UserRepository.getInstance().updateMainPageForSecurityQuestion(
            {
                body: <UpdateMainPageForSecurityQuestion>{
                    question: securityQuestion,
                    answer: answerQuestion,
                    password: password
                },
                onLoadChange: (load) => this.loading = load,
                onError: message => ToastService.getInstance().success(message.toString() ?? i18n.global.tc('error')),
                onReceive: (res) => {
                    ToastService.getInstance().success(res ?? i18n.global.tc('success'))
                    router.back()
                }
            }
        )
    }
}
