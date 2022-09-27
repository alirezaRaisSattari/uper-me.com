import {FileUploaderService} from "@/core/service/fileUploader.service";

export class WorkPageImageUploader {
    urlImages = []
    uploadProgress = 0

    uploadImages(selectedPhotos, onLink: Function, key) {
        let persent = 100 / selectedPhotos.length
        persent = Math.round(persent * 100) / 100

        if (selectedPhotos.length !== 0)
            selectedPhotos.forEach(element => {
                FileUploaderService.getInstance().uploadImage({
                    file: element.base64,
                    onProgressChange: (progress) => {
                        this.uploadProgress = this.uploadProgress + persent;
                    },
                    onError: (msg) => {
                    },
                    onReceive: (res) => {
                        this.urlImages.push(res)

                        if (this.urlImages.length === selectedPhotos.length) {
                            onLink(this.urlImages, this.uploadProgress)
                        }
                    },
                }, key)
            });
    }
}