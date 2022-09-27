import {FileUploaderService, ImageUploaderKeys} from "@/core/service/fileUploader.service";
import {ToastService} from "@/core/service/toast.service";
import {i18n} from "@/main";

export class ImageProductModel {
    static images: (mainPhoto, otherImage) => void
    progress = {
        valueNow: 0,
        valueMin: 0,
        valueMax: 100
    }

    uploadMainImage(file, jobDone) {
        this.progress.valueMax = 100;
        this.progress.valueNow = 0;

        FileUploaderService.getInstance().uploadProfile({
            file: file,
            onProgressChange: progress1 => {
                this.progress.valueNow = progress1
            },
            onError: (msg) => {
                ToastService.getInstance().error(msg.toString() ?? i18n.global.tc('error'))
            },
            onReceive: (res) => {
                jobDone(res)
            }
        }, ImageUploaderKeys.PRODUCT)
    }

    uploadOtherImages(files, jobDone: Function) {
        this.progress.valueNow = 0
        this.progress.valueMax = (files ?? []).length * 100
        if (files.length !== 0) {
            let urls = [];
            files.forEach((fileImage) => {
                FileUploaderService.getInstance().uploadImage({
                    file: fileImage.file,
                    onProgressChange: progress => {
                        this.progress.valueNow += progress;
                    },
                    onReceive: (res) => {
                        this.progress.valueNow = 0;
                        urls.push(res);
                        if (urls.length === files.length) {
                            jobDone(urls);
                        }
                    }
                }, ImageUploaderKeys.PRODUCT)
            })
        } else
            ToastService.getInstance().error("uploadOtherImages " + i18n.global.tc('uploadError'));
    }

}