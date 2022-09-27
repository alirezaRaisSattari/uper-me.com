import { FactorRepository } from "@/core/repository/factor.repository";
import router from "@/core/router/router";
import { LocalStorageService } from "@/core/service/localStorage.service";
import { ToastService } from "@/core/service/toast.service";
import { getMainPageId, getSelectedPageId } from "@/core/service/utils.service";
import { LocationsModel } from "@/data/city/mainpage/factor.modal";
import { i18n } from "@/main";
import { useRoute } from "vue-router";

export class locationsPageState {
    list = <LocationsModel[]>[];
    route = useRoute();
    loading = false;
    showDialog = false;
    showQrReader = false;
    selectedStation = <LocationsModel>null;
    selectedData = JSON.parse(LocalStorageService.getInstance().getItem("selectedData"));

    getData() {
        this.loading = true;
        if (!this.selectedData) return router.back();
        FactorRepository.getInstance().StationGetAll({
            urlContent:`${this.selectedData.sellerWorkPageId}/${getMainPageId()}`,
            onReceive:(res:LocationsModel[])=>{
                this.list = res.filter(item => item.type < 4);
                this.loading = false;
            },onError:(err)=>{
                this.loading = false;
            }
        })
    }

    typeStatus (key) {
        switch (key) {
            case 1:
                return i18n.global.tc('place');
            case 2:
                return i18n.global.tc('desk');
            case 3:
                return i18n.global.tc('chair');
            case 4:
                return i18n.global.tc('motorcycle');
            case 5:
                return i18n.global.tc('car');
            case 6:
                return i18n.global.tc('etc.');
        }
    }

    StationStatus (key) {
        switch (key) {
            case 1:
                return i18n.global.tc('notCheck');
            case 2:
                return i18n.global.tc('accepted');
            case 3:
                return i18n.global.tc('notAccepted');
            case 4:
                return i18n.global.tc('deletedPage');
        }
    }


    onDecode(data) {
        this.showQrReader = false;
        if (!data) return 
        ToastService.getInstance().success(i18n.global.tc('scannedSuccessful'))
    }

    onSelectLocation() {
        if (!this.selectedData) return router.back();
        
        FactorRepository.getInstance().CalculateEarningUperByShoppingCart({
            body:{
                shoppingCartId: Number(this.selectedData.id),
                buyerPageId: Number(getSelectedPageId()),
                sellerAddressType: this.selectedData.sellerAddressType,
            },onReceive:(res)=> {

                let item:any = JSON.parse(LocalStorageService.getInstance().getItem("selectedData"));
                item.uperScore = res.earningUper;
                item.stationId = this.selectedStation.id;
                
                LocalStorageService.getInstance().setItem('selectedData',JSON.stringify(item));
                router.push('/shoppingCartChoseAddress')
            },onError:(err)=> {
                console.log(err);
                
            }
        })
    }
}
