import {UserRepository} from "@/core/repository/user.repository";
import router from "@/core/router/router";
import {ToastService} from "@/core/service/toast.service";
import {getSelectedPageId, unitTitleFunc} from "@/core/service/utils.service";
import {i18n} from "@/main";

export class EmployeePermission {
    mainPageId = 0
    permissionList = []
    deleteAccess = []
    addAccess = []
    callingApiIsFinish = 1
    loading = false
    disableConfirmBtn = false

    getPermissions(workPageId, staffId) {
        UserRepository.getInstance().EmployeePermission({
            urlContent: `${workPageId}/${staffId}`,
            onReceive: (res) => {
                this.permissionList = res
                this.permissionList.forEach(element => {
                    element.unitId = unitTitleFunc(element.unitId)
                    element.permissions.forEach(element => {
                        element.firstHasAccess = element.hasAccess
                    })
                });
            },
            onLoadChange: (load) => {
                this.loading = load
            }
        })

    }

    EmployeeAccess() {
        this.permissionList.forEach(element => {
            element.permissions.forEach(element => {
                if (element.firstHasAccess != element.hasAccess) {
                    this.disableConfirmBtn = true
                    if (element.firstHasAccess) this.deleteAccess.push(element.permissionId)
                    else this.addAccess.push(element.permissionId)
                }
            })
        });
        if (this.deleteAccess.length != 0) {
            this.callingApiIsFinish--
            this.deleteEmployeeAccess()
        }
        if (this.addAccess.length != 0) {
            this.callingApiIsFinish--
            this.addEmployeeAccess()
        }
    }

    addEmployeeAccess() {
        UserRepository.getInstance().addEmployeePermission({
            body: {
                mainPageId: Number(this.mainPageId),
                workPageId: Math.abs(getSelectedPageId()),
                permissionIds: this.addAccess
            },
            onReceive: (res) => {
                this.callingApiIsFinish++
                this.routerBack()
            }
        })
    }

    deleteEmployeeAccess() {
        UserRepository.getInstance().deleteEmployeePermission({
            body: {
                mainPageId: Number(this.mainPageId),
                workPageId: Math.abs(getSelectedPageId()),
                permissionIds: this.deleteAccess
            },
            onReceive: (res) => {
                this.callingApiIsFinish++
                this.routerBack()
            }
        })
    }

    routerBack() {
        if (this.callingApiIsFinish === 1) {
            router.back()
            ToastService.getInstance().success(
                i18n.global.tc("success")
            );
        }
    }
}
