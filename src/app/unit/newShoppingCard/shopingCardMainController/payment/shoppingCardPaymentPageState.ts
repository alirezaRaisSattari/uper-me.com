import { AccountingRepository } from "@/core/repository/accountingRepository";
import { FactorRepository } from "@/core/repository/factor.repository";
import router from "@/core/router/router";
import { DataFormatterService } from "@/core/service/dataFormater.service";
import { DateService } from "@/core/service/date.service";
import { LocalStorageService } from "@/core/service/localStorage.service";
import { ToastService } from "@/core/service/toast.service";
import { getSelectedPageId } from "@/core/service/utils.service";
import { CreateFactorModel } from "@/data/city/mainpage/factor.modal";
import { SelectedDataPaymentModel } from "@/data/city/mainpage/selectedProductFactor.model";
import { i18n } from "@/main";
import moment from "moment";

export class shoppingCardPaymentPageState {
    sendTypeList = [
        {'value': 1, 'name': i18n.global.tc('normal')},
        {'value': 3, 'name': i18n.global.tc('immediate')},
    ];
    selectedSendType = 1;
    cargoType = [
        {'value': 1, 'name': i18n.global.tc('normal')},
        {'value': 2, 'name': i18n.global.tc('sensitive')},
        {'value': 3, 'name': i18n.global.tc('glacier')},
        {'value': 4, 'name': i18n.global.tc('expressDelivery')},
        {'value': 5, 'name': i18n.global.tc('hotFood')},
    ];
    
    selectedData:SelectedDataPaymentModel = JSON.parse(LocalStorageService.getInstance().getItem("selectedData")) ?? router.back();
    purchaseAmount = 0;
    accountList = [];
    selectedAccount = null;
    imageList = [];
    selectSendTime = {
        dialog:false,
        loading:false,
        times:[],
        selectedTime:null,
        todayList:[],
        tomorrowList:[],
        isToday:true,
        status:0,
        selectedHour:null,
        label:''
    }
    postData = <CreateFactorModel>{
        sendType:this.selectedData.sellerAddressType,
    };

    loading = false;
    showPasswordDialog = false;
    doneDialog = false;
    dialogType = true;
    charge = {
        value:null,
        loading:false,
        inValid:true
    }
    sendPrice = null;
    initData() {
      
        this.purchaseAmount = this.selectedData.percentFromCode == 0 ? this.selectedData.totalPrice : ((this.selectedData.totalPrice * (this.selectedData.percentFromCode/100)));
        AccountingRepository.getInstance().GetWalletByIdAndType({
            body:{
                pageId: getSelectedPageId(),
                accountType:1 ,
                currencyId: this.selectedData.currencyId,
            },onReceive:(res)=>{
                this.accountList = res.filter(item => item.accountType == 4 || item.accountType == 1);
                this.selectedAccount = this.accountList[0];
                
            }
        });
        
        if (this.selectedData.sellerAddressType !== 3 && this.selectedData.productType !== 2 ||  this.selectedData.productType !== 12 ) {
        
            this.getSendPrice(1);
    }
    
    this.selectedData.productLists.forEach(product => {
        this.imageList.push(product.mainImageUrl);
    });

    if (this.selectedData.sellerAddressType == 3 ||  this.selectedData.sellerAddressType == 4) {
        let maxPrepareTime = 0;
        if (this.selectedData.productType == 1) {
                this.selectedData.productLists.forEach(product => {
                    if (product.prepareTime > maxPrepareTime) {
                        maxPrepareTime = product.prepareTime;
                    }
                });
                const now = new Date();
                let date = moment(now.toISOString())    
                date.add({minute:maxPrepareTime});
                this.postData.buyerWillReceiveFactor = date.toISOString();
            } else {
                this.postData.buyerWillReceiveFactor = new Date().toISOString();
            }
        } else {
            if (this.selectedData.productType == 2 || this.selectedData.productType == 3 || this.selectedData.productType == 4) {
                this.postData.buyerWillReceiveFactor = new Date().toISOString();
            }
        }

    }

    getSendPrice(key) {
        if (this.selectedData.productType == 12) return;

        FactorRepository.getInstance().CalculateDeliveryPrice({
            body:{
                shoppingCartId: this.selectedData.id,
                buyerPageId: getSelectedPageId(),
                sendType:key ,
                latitude:  Number(this.selectedData.addressData.buyerAddressObject.latitude),
                longitude: Number(this.selectedData.addressData.buyerAddressObject.longitude),
                sellerAddressType: this.selectedData.sellerAddressType
            },onReceive:(res)=>{
                this.sendPrice = res.cost;
                this.selectedData.totalPrice = this.selectedData.totalPrice + this.sendPrice;
            },onError:(err)=> {
                ToastService.getInstance().error(err.toString());
            }
        });
    }

    getProductType(key) {
        switch (key) {
            case 1:
                return i18n.global.tc("sell")
            case 2:
                return i18n.global.tc("reserve")
            case 3:
                return i18n.global.tc("fare")
            case 4:
                return i18n.global.tc("service")
            case 12:
                return i18n.global.tc("virtual")
            }
    }
    checkStatus() {
        if (this.selectedData.sellerAddressType == 2) {
            return 1; //chose date 
        } else {
            return 2; // show date form this.postData.buyerWillReceiveFactor حداکثر تا
        }
    }

    checkBeforeSend() {
        if (this.selectedAccount.originalCash < this.purchaseAmount) return ToastService.getInstance().error(i18n.global.tc('notEnoughMoney'));
        this.checkSendTime();
        
        if (!this.selectSendTime.label && this.selectedData.productType != 12) return ToastService.getInstance().error(i18n.global.tc('receiveTimeNotSelected'));
        
        this.postData.password = null;
        this.showPasswordDialog = true;
        this.dialogType = true;
    }

    onSend() {

        this.loading = true;
        this.postData.shoppingCartId = null;
        this.checkSendTime();
        
        this.postData = {
            shoppingCartId:this.selectedData.id,
            buyerPageId:this.selectedAccount.pageId,
            paymentType:1,
            sendType:this.selectedSendType ,
            stationId: this.selectedData.stationId,
            buyerReceivedId:1 ,
            buyerAddressObject: this.selectedData.productType !== 12 ? this.selectedData.addressData.buyerAddressObject : null,
            sellerAddressType:this.selectedData.sellerAddressType,
            accountNumber:this.selectedAccount.accountNumber,
            password:this.postData.password,
            buyerDescription:this.postData.buyerDescription,
            buyerWillReceiveFactor:this.postData.buyerWillReceiveFactor ,
            factorOffCode:  this.selectedData.productType !== 12 ? this.selectedData.addressData.factorOffCode ==  "0" ? null : this.selectedData.addressData.factorOffCode : null,
            giftCardId:  this.selectedData.productType !== 12 ? this.selectedData.addressData.giftCardId ?? null : null,
            propBuyWithActivity:this.selectedData.propBuyWithActivity ?? []
        }
        FactorRepository.getInstance().FactorCreate({
            body:this.postData,
            onReceive:(res)=>{
                this.showPasswordDialog = false;
                this.loading = false;
                LocalStorageService.getInstance().removeItem('selectedData');
                this.doneDialog = true;                    
            },onError:(err)=>{
                this.showPasswordDialog = false;
                this.loading = false;
                ToastService.getInstance().error(err.toString())
                
            }
        })
    }

    initChargeAccount() {
        this.dialogType = false;
        this.showPasswordDialog = true;
        this.charge.value = null;
    }

    chargeAccount() {
        if (this.charge.value < 100) return this.charge.inValid = false;
        const date = new Date;
        AccountingRepository.getInstance().GetPaymentGateWay({
            body:{
                pageId: getSelectedPageId(),
                gatewayType: 1,
                amount: this.charge.value,
                currencyId: this.selectedData.currencyId,
                invoiceDate: DateService.getInstance().convertToJalali(date.toISOString()),
                accountId: this.selectedAccount.accountNumber
              },onReceive:(res)=>{
                  this.openInNewTab(res.webPayingAddress + res.token);
                  
              }
        })
    }

    openInNewTab(href) {
    Object.assign(document.createElement('a'), {
        target: '_blank',
        href: href,
    }).click();
    }

    checkCargo(key) {
        switch (key) {
            case 1:
            return i18n.global.tc('normal');
            case 2:
            return i18n.global.tc('sensitive');
            case 3:
                return i18n.global.tc('glacier');
            case 4:
                return i18n.global.tc('fastSend');
            case 5:
                return i18n.global.tc('hotFood');
            default:
                return i18n.global.tc('notFound');
        }
    }

    getTimes() {
       
        this.selectSendTime.dialog = true;
        this.selectSendTime.loading = true;
        FactorRepository.getInstance().GetArriveTime({
            body:{
                deliveryAddressType: this.selectedData.sellerAddressType,
                shopingCartId: this.selectedData.id,
                distance: {
                    end: {
                    latitude: Number(this.selectedData.addressData.buyerAddressObject.latitude),
                    longitude: Number(this.selectedData.addressData.buyerAddressObject.longitude),
                    }
                },
                cargoType: this.selectedSendType == 3 ? 4 : this.selectedData.cargoType ,
                sendType: this.selectedSendType   
                },onReceive:(res)=>{
                    this.selectSendTime.loading = false;
                    if (this.selectedData.sellerAddressType == 4) {
                        this.selectSendTime.selectedTime = res.split(".")[0];
                    } else {
                        this.selectSendTime.times = [];
                        if (res.length > 0 && res[0].startTime) {
                            this.selectSendTime.status  = 1;
                            let list:any[] = res;
                            list.forEach(item => {
                                
                                const index =  this.selectSendTime.times.findIndex(time => time.times[0].startTime.split("T")[0] == item.startTime.split("T")[0]);
                                
                                if (index < 0) {
                                    const time = item;
                                    const data = {
                                        dayLabel:this.getDayLabel(item.startTime),
                                        dayNumber:this.getDayNumber(item.startTime),
                                        times:[time]
                                    }
                                    this.selectSendTime.times.push(data);
                                } else {
                                    this.selectSendTime.times[index].times.push(item);
                                }
                            });
            
                            this.selectSendTime.selectedTime = this.selectSendTime.times[0];
                            this.selectSendTime.times.push(this.selectSendTime.selectedTime)
                        } else if (res.today) {
                            this.selectSendTime.times = res
                            this.selectSendTime.status  = 2;
                            res.today.forEach(item => {
                                this.selectSendTime.todayList.push({value:item})
                            });
                            res.tommorow.forEach(item => {
                                this.selectSendTime.tomorrowList.push({value:item})
                            });
                        } else {
                            this.selectSendTime.status  = 3;
                            res.forEach(item => {
                                this.selectSendTime.times.push({value:item})
                            });
                        }

                    }
                },onError:(err)=>{
                this.selectSendTime.loading = false;
                }
        })
    }

    getDayLabel(date) {
        return DataFormatterService.getInstance().getPersianDayLabel(date);
    }

    getDayNumber(date) {
    const text = DateService.getInstance().convertToJalali(date);
    return text.substring(text.length-2);
    }

    convertToRageHour(value) {
    const start:String = value.startTime.split("T")[1].substring(0,2);
    const endTime:String = value.endTime.split("T")[1].substring(0,2);
    
    return i18n.global.tc('receiveTime' , {start:  Number(start),end: Number(endTime)});
    }

    checkSendTime() {
        if (this.selectedData.sellerAddressType == 4) {
            this.postData.buyerWillReceiveFactor = this.selectSendTime.selectedTime;
            this.selectSendTime.dialog = false;
        } else {
            switch (this.selectSendTime.status) {
                case 1:
                        if (!(this.selectSendTime.selectedTime && this.selectSendTime.selectedHour) && this.selectedData.productType !== 12) return ToastService.getInstance().error(i18n.global.tc('receiveTimeNotSelected'));
                        this.postData.buyerWillReceiveFactor = this.selectSendTime.selectedHour.startTime ;
                        this.selectSendTime.dialog = false;
                    break;
                case 2:
                    if (!this.selectSendTime.selectedTime && this.selectedData.productType !== 12) return ToastService.getInstance().error(i18n.global.tc('receiveTimeNotSelected'));
                    const now = new Date();
                    
                    if (this.selectSendTime.isToday) {
                        let date = moment(now.toISOString());
                        const str = date.toISOString().split("T")[0];
                        this.postData.buyerWillReceiveFactor = `${str}T${this.selectSendTime.selectedTime.split("-")[0]}:00`
                    } else {
                        let date = moment(now.toISOString())    
                        date.add({day:1});
                        const str = date.toISOString().split("T")[0];
                        this.postData.buyerWillReceiveFactor = `${str}T${this.selectSendTime.selectedTime.split("-")[0]}:00`
                    }
                    this.selectSendTime.dialog = false;
                    break;
                case 3:
                        const Dnow = new Date();
                        if (!this.selectSendTime.selectedTime && this.selectedData.productType !== 12) return ToastService.getInstance().error(i18n.global.tc('receiveTimeNotSelected'));
                        let date = moment(Dnow.toISOString());
                        const str = date.toISOString().split("T")[0];
                        this.postData.buyerWillReceiveFactor = `${str}T${this.selectSendTime.selectedTime.split("-")[0]}:00`
                        this.selectSendTime.dialog = false;
                    break;
            }
        }
        this.selectSendTime.label = this.postData.buyerWillReceiveFactor;
    }



}
