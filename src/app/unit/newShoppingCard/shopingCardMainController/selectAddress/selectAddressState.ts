import { FactorRepository } from "@/core/repository/factor.repository";
import { UserRepository } from "@/core/repository/user.repository";
import router from "@/core/router/router";
import { LocalStorageService } from "@/core/service/localStorage.service";
import { ToastService } from "@/core/service/toast.service";
import {  getSelectedPageId } from "@/core/service/utils.service";
import { GiftCardGetMyGiftCardOfSellerModel } from "@/data/city/mainpage/factor.modal";
import { i18n } from "@/main";

export class selectAddressState {
    list = [];
    endList = false;
    loading = false;
    selectedData = JSON.parse(LocalStorageService.getInstance().getItem("selectedData")) ?? router.back();
    selectedAddress = null;
    showOptions = false;
    itemCont = 0;
    selectedMap = {
        dialog:false,
        lat:0,
        lan:0,
        name:''
    }
    gift = {
        list:<GiftCardGetMyGiftCardOfSellerModel[]>[],
        dialog:false,
        loading: false,
        code:'',
        type:false,
        selectedGif:<GiftCardGetMyGiftCardOfSellerModel>null,
        giftCodeLoading:false,
        percentFromCode:0,
        maximumValue:0,
        finalPrice:0
    };

    addressData = {
        buyerAddressObject: {
            addressTitle: "",
            cityId: 0,
            areaId: 0,
            textAddress: "",
            postalCode: "",
            latitude: 0,
            longitude: 0,
            phones: [
              {
                title: "",
                number: ""
              }
            ]
          },
          giftCardId: null,
          factorOffCode: null,
          sellerAddressType: this.selectedData.sellerAddressType,
    }

    getAddress() {
        if (this.loading || this.endList) return
        UserRepository.getInstance().getAddressByPageId({
            body:{
                pageId:getSelectedPageId(),
                skip:this.list.length,
                take:10
            },onReceive:(res)=>{
                if (res.length < 10) this.endList = true
                this.list.push(...res);
            },onError:(err)=>{
                console.log(err);
            }
        })
    }

    getAllGiftCard() {
        if (this.gift.percentFromCode > 0) return ToastService.getInstance().warning(i18n.global.tc('youHaveARegisteredDiscountCodeToUseTheFreeVoucherFirstDeleteTheEnteredDiscountCode')) 
        this.showOptions = false;
        this.gift.type = false;
        this.gift.loading = true;
        FactorRepository.getInstance().GiftCardGetMyGiftCardOfSeller({
            urlContent:`${getSelectedPageId()}/${this.selectedData.sellerWorkPageId}`,
            onReceive:(res:GiftCardGetMyGiftCardOfSellerModel[])=>{
                this.gift.loading = false;
                this.gift.list = res.filter(item => !((item.currencyId != this.selectedData.currencyId) || item.used == 3 || item.used == 1));
            },onError:(err)=> {
                this.gift.loading = false;
                console.log(err);
            }
        })
    }

    onSelectGiftCard() {
        const d = new Date(this.gift.selectedGif.factorModifiedAt);
        let day = d.getDay();
        if ((this.gift.selectedGif.factorStatus == 8 && day > 7) || this.gift.selectedGif.factorStatus == 12) {
            ToastService.getInstance().success(i18n.global.tc('successMassage'));
            this.addressData.giftCardId = this.gift.selectedGif.giftId;
            this.gift.dialog = false;
        } else ToastService.getInstance().warning(i18n.global.tc('forUseGiftCardWarning'));
    };

    reGetUperScore() {
        if (!this.selectedData.sellerAddressType) {
            this.selectedData.sellerAddressType = this.selectedData.productType !== 12 ? 3 : 1;
            LocalStorageService.getInstance().setItem("selectedData",JSON.stringify(this.selectedData));
        }

        if (this.selectedData.productType == 12) {
            this.getAllGiftCard();
        }
        const propBuyWithActivity = this.selectedData.propBuyWithActivity ?? null;

        FactorRepository.getInstance().CalculateEarningUperByShoppingCart({
            body:{
                shoppingCartId: this.selectedData.id,
                buyerPageId: getSelectedPageId(),
                sellerAddressType: this.selectedData.sellerAddressType,
                propBuyWithActivity:propBuyWithActivity
            },onReceive:(res)=> {
                this.selectedData.uperScore = res.earningUper;
            },onError:(err)=>{
                console.log(err);
            }
        })
    }

    cancelGiftCode() {
        this.reGetUperScore();
        this.gift.percentFromCode = 0;
        this.addressData.factorOffCode = '';
        this.gift.percentFromCode = 0;
        this.gift.maximumValue = 0;
        this.gift.dialog = false;
    }

    checkIsValid() {
        if (this.gift.percentFromCode > 0) return ToastService.getInstance().error(i18n.global.tc('emptyOffCode'));
        this.reGetUperScore();
        FactorRepository.getInstance().FactorOffCodeIsValid({
            body:{
                pageId: this.selectedData.sellerWorkPageId,
                code: this.gift.code,
                currencyId: this.selectedData.currencyId,
                minimumFactorPrice: this.selectedData.totalPrice,
                productType: this.selectedData.productType,
                myPageId: getSelectedPageId()
            },onReceive:(res)=>{
                
                ToastService.getInstance().info(i18n.global.tc('successMassage'));
                this.gift.dialog = false;
                this.addressData.factorOffCode = this.gift.code;
                this.gift.percentFromCode = res.percent;
                this.gift.maximumValue = res.maximumValue;
                this.selectedData.uperScore = 0;
                this.gift.finalPrice = Math.round(this.selectedData.totalPrice * (this.gift.percentFromCode/100));
            },onError:(err)=>{
                ToastService.getInstance().error(err.toString());
            }
        })
    }

    onSubmit() {
        if (!this.selectedAddress && this.selectedData.productType !== 12) return ToastService.getInstance().error(i18n.global.tc('addressNotSelected'));
        if (this.selectedData.productType !== 12) {
            
            let latLong = this.selectedAddress.location.replace('POINT(', '').replace(')', '').split(' ')
            this.addressData.buyerAddressObject = {
                addressTitle: this.selectedAddress.title,
                areaId:this.selectedAddress.areaId,
                cityId:this.selectedAddress.cityId,
                latitude:latLong[1],
                longitude:latLong[0],
                phones:this.selectedAddress.phones,
                postalCode:this.selectedAddress.postalCode,
                textAddress:this.selectedAddress.address
            } 
            this.selectedData.addressData = this.addressData;
        }
        this.addressData.factorOffCode = String(this.gift.percentFromCode) ?? null;
        this.selectedData.percentFromCode = this.gift.percentFromCode;
        LocalStorageService.getInstance().setItem("selectedData",JSON.stringify(this.selectedData));
        router.push('/shoppingCardPayment')
    }

    getTotalPrice() {
        let sum = 0;
        this.itemCont = (this.selectedData.productLists ? this.selectedData.productLists.length : 0) + (this.selectedData.customProducts ? this.selectedData.customProducts.length : 0);
      
        if (this.selectedData.productLists) {
            this.selectedData.productLists.forEach(item => {
                if (item.fPrice && item.fPrice > 0) {
                    sum += item.fPrice;
                } else {
                    if (item.offPercent > 0) {
                        sum += item.numbers * (item.price - (item.price * item.offPercent) / 100);
                    } else {
                        sum += (item.numbers * item.price);
                    }
                }
            });
        }
        
        if (this.selectedData.customProducts) {
            this.selectedData.customProducts.forEach(item => {
                sum += item.number * item.price;
            });
        }
        
        this.selectedData.totalPrice = sum;
    }

    showOnMap(item) {
        const latLon = item.location.replace('POINT(', '').replace(')', '').split(' ')
        this.selectedMap = {
            dialog:true,
            lan:latLon[0],
            lat:latLon[1],
            name:item.title
        }
    }

}
