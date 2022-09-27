export interface LoginModel {
    session: SessionModel
    mobileNumber: number
    username: string
    password: string
}

export interface SignUpModel {
    session: SessionModel;
    mobileNumber: number;
    prefix: string;
    otpCode: number;
}

export interface SessionModel {
    serialNumber: string;
    deviceType: number;
    deviceName: string;
    fireBaseToken: string;
}


export interface RegisterSendSmsModel {
    prefixMobileNumber: string;
    mobileNumber: number;
}

export interface GetInformationAfterSignUpModel {
    profileImageUrl: string;
    isPublic: boolean;
    name: string;
    introduceCode: string;
    username: string;
    password: string;
}