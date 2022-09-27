export interface UpdateMainPageDetailsModel {
    profileImageUrl: string;
    name: string;
    username: string;
}

export interface newMobileNumber {
    prefixMobileNumber: string;
    newMobileNumber: number;
    password: string;
}

export interface verifyNewPhonNumber {
    newMobileNumber: number;
    answer: string;
    otpCode: number;
}

export interface ValidateNewMobileMobile {
    answer: string;
    password: string;
    mobileNumber: number;
    otpCode: string;
}


export interface UpdateMainPageUsernameModel {
    username: string;
}

export interface NewMobileNumber {
    mobileNumber: number;
}

export interface CheckPassWord {
    password: string;
}

export interface UpdateMainPageBioModel {
    bio: string;
}