import { AccountingRepository } from "@/core/repository/accountingRepository";
import { ProductRepository } from "@/core/repository/product.repository";
import { ReservePropFolderRepository } from "@/core/repository/ReservePropFolder.repository";
import { DataFormatterService } from "@/core/service/dataFormater.service";
import { getSelectedPageId, WindowLoading } from "@/core/service/utils.service";
import { createReservePropFolderModel } from "@/data/city/workpage/reservePropFolder/createReservePropFolder.model";
import { wageModel } from "@/data/city/workpage/wage.model";
import { i18n } from "@/main";
import { useRoute } from "vue-router";

export class createSunFoldersState {
    route = useRoute();
    postData: createReservePropFolderModel = <createReservePropFolderModel>{}
    productDetails = null;
    maxNumberSellInSiteList = [
        { value: "1" },
        { value: "2" },
        { value: "3" },
        { value: "4" },
        { value: "5" },
        { value: "6" },
        { value: "7" },
        { value: "8" },
        { value: "9" },
        { value: "10" },
        { value: "20" },
        { value: "30" },
        { value: "40" },
        { value: "50" },
        { value: "60" },
        { value: "70" },
        { value: "80" },
        { value: "90" },
        { value: "100" },
        { value: i18n.global.tc("unlimited") },
    ]
    max_Number_Sell_Per_FactorList = [
        { value: "1" },
        { value: "2" },
        { value: "3" },
        { value: "4" },
        { value: "5" },
        { value: "6" },
        { value: "7" },
        { value: "8" },
        { value: "9" },
        { value: "10" },
        { value: i18n.global.tc("unlimited") },
    ]
    percents = [
        { value: "0" },
        { value: "1" },
        { value: "2" },
        { value: "3" },
        { value: "4" },
        { value: "5" },
        { value: "6" },
        { value: "7" },
        { value: "8" },
        { value: "9" },
        { value: "10" },
        { value: "15" },
        { value: "20" },
        { value: "25" },
        { value: "30" },
        { value: "35" },
        { value: "40" },
        { value: "45" },
        { value: "50" },
        { value: "55" },
        { value: "60" },
        { value: "65" },
    ]
    giftDates = [
        { value: `1 ${i18n.global.tc('day')}` },
        { value: `2 ${i18n.global.tc('day')}` },
        { value: `3 ${i18n.global.tc('day')}` },
        { value: `4 ${i18n.global.tc('day')}` },
        { value: `5 ${i18n.global.tc('day')}` },
        { value: `6 ${i18n.global.tc('day')}` },
        { value: `7 ${i18n.global.tc('day')}` },
        { value: `8 ${i18n.global.tc('day')}` },
        { value: `9 ${i18n.global.tc('day')}` },
        { value: `10 ${i18n.global.tc('day')}` },
        { value: `20 ${i18n.global.tc('day')}` },
        { value: `30 ${i18n.global.tc('day')}` },
        { value: `40 ${i18n.global.tc('day')}` },
        { value: `50 ${i18n.global.tc('day')}` },
        { value: `60 ${i18n.global.tc('day')}` },
        { value: `70 ${i18n.global.tc('day')}` },
        { value: `80 ${i18n.global.tc('day')}` },
        { value: `90 ${i18n.global.tc('day')}` },
        { value: `110 ${i18n.global.tc('day')}` },
        { value: `120 ${i18n.global.tc('day')}` },
        { value: `130 ${i18n.global.tc('day')}` },
        { value: `140 ${i18n.global.tc('day')}` },
        { value: `150 ${i18n.global.tc('day')}` },
        { value: `160 ${i18n.global.tc('day')}` },
        { value: `170 ${i18n.global.tc('day')}` },
        { value: `180 ${i18n.global.tc('day')}` },
        { value: `190 ${i18n.global.tc('day')}` },
        { value: `200 ${i18n.global.tc('day')}` },
    ]

    wageList: wageModel[] = <wageModel[]>[];
    listDisplay = [false, false];

    selectedWage = null;
    selectedGiftDate = this.giftDates[0].value;
    selectedPercent = this.percents[0].value;
    maxNumberSellInSiteSelected = null;
    max_Number_Sell_Per_FactorSelected = null;
    giftImage = null;

    getProductDetails(pId, wpId) {
        WindowLoading.value = true;
        ProductRepository.getInstance().getProductById({
            body: {
                productId: pId,
                workPageId: wpId,
                myPageId: getSelectedPageId()
            }, onReceive: ((res) => {
                WindowLoading.value = false;
                this.productDetails = res.result;
                AccountingRepository.getInstance().FilterWage({
                    body: {
                        skip: 0,
                        take: 1000,
                        categoryId: this.productDetails.categoryId,
                        currencyId: this.productDetails.cargoType
                    }, onReceive: ((res: wageModel[]) => {
                        this.wageList = res;
                    })
                });
                this.initData();
            }), onError: (err => {
                WindowLoading.value = false;
            })
        })
    }

    initData() {
        this.postData.folderId = Number(this.route.query.fId);
        this.postData.workPageId = Number(this.route.query.wpId)
        this.postData.reservePropItems = [{
            startReserveTime: '',
            endReserveTime: '',
            description: '',
            currencyId: 1,
            defaultPrice: 0,
            uperPrice: 0,
            defaultWagePlanId: 0,
            uperWagePlanId: 0,
            offPercent: 0,
            returnedPercent: 0,
            giftProductImageUrl: '',
            giftProductName: '',
            giftProductCurrencyId: 0,
            giftProductCost: 0,
            giftCardCurrencyId: 0,
            giftCardCost: 0,
            giftCardExpiredDays: 0,
            quantity: 0,
            volumePerFactor: 0,
            weight: 0,
            financialValue: 0
        }];
    }

    choseDateControl(date, position) {
        if (position == 0) {
            this.postData.reservePropItems[0].startReserveTime = date;
            this.showDialog(position);
        } else {
            this.postData.reservePropItems[0].endReserveTime = date;
            this.showDialog(position);
        }
    }

    showDialog(position) {
        this.listDisplay[position] ? this.listDisplay[position] = false : this.listDisplay[position] = true;
    }

    getTime(date) {
        return DataFormatterService.getInstance().getTimeJalali(date);
    }

    onCreate() {
        // ReservePropFolderRepository.getInstance().createReservePropFolder({
        //     body: <createReservePropFolderModel>{
        //         folderId: this.postData.folderId
        //     }
        // })
    }
}
