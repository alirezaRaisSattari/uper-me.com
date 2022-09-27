import { ProductRepository } from "@/core/repository/product.repository";
import { SettingRepository } from "@/core/repository/setting.repository";
import router from "@/core/router/router";
import { CacheService } from "@/core/service/cache.service";
import { ToastService } from "@/core/service/toast.service";
import { getSelectedPageId, WindowLoading } from "@/core/service/utils.service";
import { GetProductModel, updateProductModel } from "@/data/city/product/product.model";
import { i18n } from "@/main";
import { useRoute } from "vue-router";

export class updateProductState {
    route = useRoute();
    folders = null;
    addressDialog = false;
    options = {
        show: [{ name: i18n.global.tc('showInScreen'), value: true }, {
            name: i18n.global.tc('notShowInScreen'),
            value: false
        }],
        sellType: [{ name: i18n.global.tc('actual'), value: 1 }, {
            name: i18n.global.tc('virtual'),
            value: 2
        }, { name: i18n.global.tc('both'), value: 3 }]
    }
    product: GetProductModel = null;

    getProductInfo() {
        ProductRepository.getInstance().GetProductById({
            body: {
                productId: this.route.params.productId,
                workPageId: Math.abs(getSelectedPageId()),
                myPageId: getSelectedPageId(),
            },
            onReceive: (res: GetProductModel) => {
                this.product = res;
            },
        })
    }

    getAllFolders() {
        this.folders = null;
        ProductRepository.getInstance().GetAllFolders({
            body: {
                skip: 0,
                take: 100,
                workPageId: Math.abs(getSelectedPageId()),
            },
            onReceive: (res) => {
                this.folders = res;
            }
        })
    }

    getLocationByLatLon(data) {
        WindowLoading.value = true;
        SettingRepository.getInstance().GetAreaWithPoint({
            body: {
                latitude: data.lng,
                longitude: data.lat,
            },
            onReceive: (res) => {

                WindowLoading.value = false;
                this.product.productArea.cityName = CacheService.getInstance().getCityById(res.cityId).cityName;
                this.product.productArea.countryName = CacheService.getInstance().getCountryById(res.countryId).countryName;
                ToastService.getInstance().success(i18n.global.tc("verifiedSuccessful"));
                this.product.result.cityId = res.cityId;
                this.product.result.countryId = res.countryId;
                this.product.result.areaId = res.areaId;
                this.product.productArea.areaName = res.areaName;

                this.addressDialog = false;
            }, onError: (err) => {
                WindowLoading.value = false;
                this.addressDialog = false;
            }
        });
    }

    onUpdate() {
        ProductRepository.getInstance().UpdateProduct({
            body: <updateProductModel>{
                areaId: this.product.result.areaId,
                cityId: this.product.result.cityId,
                countryId: this.product.result.countryId,
                folderId: this.product.result.folderId,
                id: Number(this.route.params.productId),
                isShow: this.product.result.isShow,
                privateBarcode: this.product.result.privateBarcode,
                sellType: this.product.result.sellType,
                usedType: this.product.result.usedType,
                workPageId: this.product.result.workPageId,
            }, onReceive: (res) => {
                ToastService.getInstance().success('successMassage');
                router.back();
            }
        })
    }
}
