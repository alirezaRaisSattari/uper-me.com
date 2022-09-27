import {UserRepository} from "@/core/repository/user.repository";
import {FileUploaderService, ProfileUploaderKeys} from "@/core/service/fileUploader.service";
import {ToastService} from "@/core/service/toast.service";
import {addEmployeeModel} from "@/data/city/product/product.model";
import {i18n} from "@/main";

export class employeeState {
    allEmployee = null
    getAllEmployeeLoading = false
    updateEmployeeDialog = false
    disableButton = false

    getAllEmployee(pageId) {
        UserRepository.getInstance().getEmployee({
            urlContent: `${pageId}`,
            onReceive: (res) => {
                this.allEmployee = res
            },
            onLoadChange: (load) => {
                this.getAllEmployeeLoading = load
            }
        })
    }

    updateEmployee(body, jobDone: Function) {
        UserRepository.getInstance().updateEmployee({
            body: <addEmployeeModel>{...body},
            onReceive: (res) => {
                ToastService.getInstance().success(i18n.global.tc("success"));
                this.updateEmployeeDialog = false
                jobDone()
            },
            onError: () => {
                this.updateEmployeeDialog = false
                this.disableButton = false
            }
        })
    }

    uploadImages(file, onUpload: Function) {
        FileUploaderService.getInstance().uploadProfile({
            file,
            onProgressChange: (progress) => {
            },
            onError: (msg) => {
            },
            onReceive: (res) => {
                onUpload(res)
            },
        }, ProfileUploaderKeys.USER);
    }

    deleteEmployee(mainPageId, workPageId, jobDone: Function) {
        UserRepository.getInstance().deleteEmployee({
            urlContent: `${mainPageId}/${workPageId}`,
            onReceive: (res) => {
                ToastService.getInstance().success(i18n.global.tc("deleteEmployeeSuccessFull"));
                jobDone()
            }
        })
    }
}
