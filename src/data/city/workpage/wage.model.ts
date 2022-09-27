export interface wageModel {
    wageId: number;
    wageStatus: number;
    currencyId: number;
    title: string;
    percent: number;
    valueTrimmer: number;
    buyerEarningValueType1: number;
    sellerEarningValueType1: number;
    buyerEarningValueType2: number;
    sellerEarningValueType2: number;
    buyerEarningValueType3: number;
    sellerEarningValueType3: number;
    buyerEarningValueType4: number;
    sellerEarningValueType4: number;
    sellerSupervisorPercentOfWage: number;
    sellerSupporterPercentOfWage: number;
    buyerSupervisorPercentOfWage: number;
    buyerSupporterPercentOfWage: number;
    maxDeliverOfWage: number;
    categoryId: number;
    modifyDate: Date;
}