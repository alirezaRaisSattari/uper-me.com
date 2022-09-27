import {UserRepository} from "@/core/repository/user.repository";
import {messagesModel} from "@/data/city/ticket/tickets.model"
import router from "@/core/router/router";
import {BASE_TAKE} from "@/core/constant/constant";

export class getTicketsMessages {
    result = []
    messages = []
    isNull: Boolean
    unit
    ticketSubject: String
    ticketPriority
    messageLoading = false
    closeTicketLoading = false
    ticketProperty = null
    ticketPropertyloading = false
    messagesIsFinished = false
    skipNum = 0

    getAllMessages(body) {
        if (this.messageLoading || this.messagesIsFinished) return;
        body.skip = this.skipNum
        UserRepository.getInstance().GetMessages({
            body: <messagesModel>{...body},
            onLoadChange: (load) => {
                this.messageLoading = load
            },
            onReceive: (res) => {
                if (Array.isArray(res)) {
                    if (BASE_TAKE > res.length)
                        this.messagesIsFinished = true
                    if (res.length == BASE_TAKE) {
                        this.skipNum += BASE_TAKE;
                    }
                    this.result = this.result.concat(res)
                    this.messages = this.result;
                    this.unit = this.messages[0].unitType;
                    this.ticketSubject = this.messages[0].subject
                    this.ticketPriority = this.messages[0].priority
                } else this.messagesIsFinished = true
            }
        })

    }

    closeTicket(pageId, ticketId) {
        UserRepository.getInstance().CloseTicket({
            urlContent: `${pageId} / ${ticketId}`,
            onLoadChange: (load) => {
                this.closeTicketLoading = load
            },
            onReceive: (res) => {
                router.back();

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
