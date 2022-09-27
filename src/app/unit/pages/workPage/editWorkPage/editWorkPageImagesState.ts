import { UserRepository } from "@/core/repository/user.repository";
import { FileUploaderService, ImageUploaderKeys } from "@/core/service/fileUploader.service";
import { CreateTicket } from "@/data/city/ticket/tickets.model"
import router from "@/core/router/router";
import { getSelectedPageId } from "@/core/service/utils.service";


export class editWorkPageImagesState {
    result = ''
    urlImages = []
    ticketUnit = 1
    ticketSubject = ""
    ticketPriority: Number = 1
    descriptionTicket = ""
    filesUrl

    submitTicket() {
        UserRepository.getInstance().createMyTicket({
            body: <CreateTicket>{
                pageId: getSelectedPageId(),
                unitType: 1,
                subject: "ویرایش تصاویر صفحه کاری",
                priority: this.ticketPriority,
                text: this.descriptionTicket,
                filesUrl: this.filesUrl
            },
            onReceive: (res) => {
                setTimeout(function () {
                }, 1000);
                router.back();
            }

        })
    }

    uploadImages(ticketPhotos, onLink: Function) {
        if (ticketPhotos.length !== 0)
            ticketPhotos.forEach(element => {

                FileUploaderService.getInstance().uploadImage({
                    file: element,
                    onProgressChange: (progress) => {
                    },
                    onError: (msg) => {
                    },
                    onReceive: (res) => {
                        this.urlImages.push(res)

                        if (this.urlImages.length === ticketPhotos.length) {
                            onLink(this.urlImages)
                        }
                        this.submitTicket()
                    },
                }, ImageUploaderKeys.TICKET)
            });
    }
}
