export interface mainPageWalletModel {
    pageId: number;
    accountType?: any;
}

export interface updateTransactionModel {
    pageId: number;
    accountNumber: number;
    password: string;
    title: string;
    description: string;
    newPassword: string;
}

export interface getByAccountNumberModel {
    pageId: number;
}

export interface monyTransferModel {
    currencyId: number;
    value: number;
    depositePageId: number;
    depositeAccountNumber: number;
    receiverPageId: number;
    receiverAccountNumber: number;
    description: string;
    password: string;
}