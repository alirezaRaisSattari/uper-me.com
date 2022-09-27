import {UserRepository} from "@/core/repository/user.repository";
import {FileUploaderService, ImageUploaderKeys} from "@/core/service/fileUploader.service";
import {addMessageModel, messagesModel} from "@/data/city/ticket/tickets.model";

import router from "@/core/router/router";
import {getMainPageId, getSelectedPageId} from "@/core/service/utils.service";

export class addMessage {
    msgs = []
    urlImages = []
    addMessageLoading = false
    ticketProperty = null
    ticketPropertyloading = false
    ticketId
    text
    otherPhotoList


    answerMessage() {
        UserRepository.getInstance().AddMessage({
            body: <addMessageModel>{
                pageId: getSelectedPageId(),
                ticketId: this.ticketId,
                text: this.text,
                filesUrl: this.urlImages,
                sender_pageId: getMainPageId(),
            },
            onLoadChange: (load) => {
                this.addMessageLoading = load
            },
            onReceive: (res) => {
                router.back();

            }
        })
    }

    uploadImages(ticketPhotos, onLink: Function) {
        if (ticketPhotos.length !== 0)
            ticketPhotos.forEach(element => {

                FileUploaderService.getInstance().uploadImage(
                    {
                        file: element,
                        onProgressChange: (progress) => {
                        },
                        onError: (msg) => {
                        },
                        onReceive: (res) => {
                            this.urlImages.push(res)
                            this.answerMessage()
                            // if (this.urlImages.length === ticketPhotos.length) {
                            //     onLink(this.urlImages)
                            // }
                        },
                    },
                    ImageUploaderKeys.TICKET
                )
            });
    }

    getAllMessages(body) {
        UserRepository.getInstance().GetMessages({
            body: <messagesModel>{...body},
            onReceive: (res) => {
                this.msgs = res
            }
        })

    }

    GetTicketById(body) {
        UserRepository.getInstance().GetTicketById({
            body: body,
            onLoadChange: (load) => {
                this.ticketPropertyloading = load
            }
            ,
            onReceive: (res) => {
                this.ticketProperty = res;

            }
        })
    }
}
