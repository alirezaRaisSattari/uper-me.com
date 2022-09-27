export interface InternalResetPasswordModel {
    newPassword: string;
    oldPassword: string;
}


export interface UpdateMainPageForSecurityQuestion {
    question: string;
    answer: string;
    password: string;
}


export interface sessionModel {
    sessionId: number;
    mainPageId: number;
    serialNumber: string;
    deviceType: number;
    firebaseToken: string;
    createDate: Date;
    modifyDate: Date;
    deviceName: string;
    status: number;
    userType: number;
    ip: string;
}
