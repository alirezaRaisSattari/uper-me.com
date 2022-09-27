import {UserRepository} from "@/core/repository/user.repository";
import {PageStore} from "@/core/store/page.store";
import {FileUploaderService, ImageUploaderKeys} from "@/core/service/fileUploader.service";
import {CreateTicket} from "@/data/city/ticket/tickets.model"
import router from "@/core/router/router";


export class CreateTicketState {
    result = ''
    urlImages = []
    ticketUnit = 1
    ticketSubject = ""
    ticketPriority
    descriptionTicket = ""
    filesUrl

    submitTicket() {
        UserRepository.getInstance().createMyTicket({
            body: <CreateTicket>{
                pageId: PageStore().selectedPageId,
                unitType: this.ticketUnit,
                subject: this.ticketSubject,
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
