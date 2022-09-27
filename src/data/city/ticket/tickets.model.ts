export interface CreateTicket {
    pageId: number;
    unitType: number;
    subject: string;
    priority: number;
    text: string;
    filesUrl: string[];
}

export interface getAllTicketsModel {
    pageId: number;
    unitType: number;
    activeStatus: number;
    skip: number;
    take: number;
}

export interface messagesModel {
    pageId: number;
    ticketId: number;
    skip: number;
    take: number;
}

export interface addMessageModel {
    pageId: number;
    ticketId: number;
    text: string;
    filesUrl: string[];
    sender_pageId: number;
}
