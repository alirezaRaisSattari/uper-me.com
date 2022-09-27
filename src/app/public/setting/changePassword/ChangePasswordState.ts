import {UserRepository} from "@/core/repository/user.repository";
import router from "@/core/router/router";
import {ToastService} from "@/core/service/toast.service";
import {i18n} from "@/main";

export class ChangePasswordState {
    loading = false;

    internalResetPassword(model) {
        let body = {
            newPassword: model.password,
            oldPassword: model.LastPassword,
        }
        UserRepository.getInstance().internalResetPassword(
            {
                body: body,
                onReceive: () => {
                    ToastService.getInstance().success(i18n.global.tc('success'))
                    router.back()
                },
                onLoadChange: (val) => this.loading = val,
                onError: (msg) => {
                    ToastService.getInstance().error(msg.toString())
                }
            }
        );
    }
}
