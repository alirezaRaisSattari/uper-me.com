import { SettingRepository } from "@/core/repository/setting.repository";
import { UserRepository } from "@/core/repository/user.repository";
import router from "@/core/router/router";
import { CacheService } from "@/core/service/cache.service";
import { DataFormatterService } from "@/core/service/dataFormater.service";
import { ToastService } from "@/core/service/toast.service";
import { getSelectedPageId, WindowLoading } from "@/core/service/utils.service";
import { i18n } from "@/main";
import { CrateAddressModel } from "../../pages/newCreateWorkPage/CreateWorkPage.model";

export class addAddressGlobalPageState {
    postData = <CrateAddressModel>{
        title:'',
        address:'',
        postalCode:'',
        phones:[],
        pageId:getSelectedPageId()
    };
    loading = false;
    showMap = false;
    areaName = '';
    validation = true;
    addPhone() {
        if (this.postData.phones.length > 0) {
           const res = this.postData.phones.find(item=> item.number == '' || item.title == '');
            if (res) return ToastService.getInstance().warning(i18n.global.tc('input_is_empty'));
            return this.postData.phones.push({number:"",title:""})
        } else {
            this.postData.phones.push({number:"",title:""})
        }
    }
    initLatLong(data) {
        this.postData.latitude = data.lat;
        this.postData.longitude = data.lng;
        this.showMap = false;
        WindowLoading.value = true;
        SettingRepository.getInstance().GetAreaWithPoint({
            body:{
                latitude: data.lng,
                longitude: data.lat
            },onReceive:(res)=>{
                WindowLoading.value = false;
                if (!res) return ToastService.getInstance().warning(i18n.global.tc('noResultsFound'));
                    this.postData.areaId = res.areaId;
                    this.postData.cityId = res.cityId;
                    const cityList = CacheService.getInstance().getCities();
                    const cityName = cityList.find(item => item.id == res.cityId)
                    this.areaName = `${cityName.cityName} , ${res.areaName}`;
            }
        })
    }

    checkNumbers(callBack:Function) {
        const res = this.postData.phones.find(item => item.number.length !== 11 || item.number.charAt(0) !== '0' );
        if (res) return ToastService.getInstance().error(i18n.global.tc('phoneNumberIsIncorrect'));
        const title = this.postData.phones.find(item => item.title == '');
        if (title) return ToastService.getInstance().error(i18n.global.tc('invalidPhoneTitle'));
        callBack();
    }

    onSend() {
        if (!this.postData.phones || this.postData.phones.length <= 0 ) return ToastService.getInstance().warning(i18n.global.tc("please_enter_at_least_one_phoneNumber"));
        if (!this.areaName) return ToastService.getInstance().error(i18n.global.tc('map-not-selected'));
        if (((this.postData.title.length < 4) || (this.postData.address.length < 4))) return this.validation = false;
        this.checkNumbers(() => {
            this.loading = true;
            UserRepository.getInstance().createAddressFavorite({
                body:this.postData,
                onReceive:(res)=>{
                    ToastService.getInstance().success(i18n.global.tc("successMassage"));
                    setTimeout(() => {
                        this.loading = false;
                        router.back();
                    }, 1000);
                },onError:(err)=>{
                    console.log(err);
                    this.loading = false;
                }
            })
        });
    }
}
