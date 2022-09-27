import {UserRepository} from "@/core/repository/user.repository";
import {getAllTicketsModel} from "@/data/city/ticket/tickets.model"
import {BASE_TAKE} from "@/core/constant/constant";

export class getTickets {
    skipNum = 0;
    loadingTickets = false
    ticketsIsFinished = false
    isNull: Boolean
    allTickets = []
    openNum = 0

    getTicket(body) {
        if (this.loadingTickets || this.ticketsIsFinished) return;
        body.skip = this.allTickets.length
        UserRepository.getInstance().GetAllTickets({
            body: <getAllTicketsModel>{...body},
            onReceive: (res) => {
                if (Array.isArray(res)) {
                    this.allTickets = this.allTickets.concat(res)
                    if (BASE_TAKE > res.length)
                        this.ticketsIsFinished = true;
                    if (res.length == BASE_TAKE) {
                        this.skipNum += BASE_TAKE;
                    }
                    this.openNum = this.allTickets.filter((e) => e.activeStatus == 1).length
                } else {
                    this.ticketsIsFinished = true;
                }
            },
            onLoadChange: (load) => this.loadingTickets = load
        })
    }

}
