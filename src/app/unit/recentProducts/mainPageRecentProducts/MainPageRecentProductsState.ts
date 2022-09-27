import {i18n} from "@/main";
import {CacheService} from '@/core/service/cache.service'
import {ToastService} from "@/core/service/toast.service";
import {ProductRepository} from '@/core/repository/product.repository'

export class MainPageRecentProductsState {
    chipsArray = [i18n.global.tc('category'), i18n.global.tc('area'), i18n.global.tc('ware_type'), i18n.global.tc('CreditLevel'), i18n.global.tc('productType'), i18n.global.tc('immediate')]
    showFilterPage = false
    showCities = false
    selectedCities = []
    selectedCity_Ids = []
    cityLabelName = 'مشهد'
    found_productsByFilterAPI = []
    loadingProducts = false
    productsIsFinished = false
    showFoundProducts = false
    curr_price = null
    skip = 0
    take = 10
    model = {
        skip: this.skip,
        take: 10,
        name: null,
        requestTime: new Date(),
        cityIds: null,
        areaIds: null,
        // usedType: this.selectedProductType.usedType || null,  ////???????
        usedType: null,
        productType: null,
        categoryIds: null,
        creditLevels: null,


        isImmediate: null
    }


    citiesArray = CacheService.getInstance().getCities()

    addCity() {
        if (this.selectedCities.length == 0) {
            ToastService.getInstance().error(i18n.global.tc('chooseCityError'))
        } else if (this.selectedCities.length > 3) {
            ToastService.getInstance().error(i18n.global.tc('3selectCityLimit'))

        } else {
            if (this.selectedCities.length == 1) this.cityLabelName = this.selectedCities[0].cityName
            else if (this.selectedCities.length == 2) this.cityLabelName = 2 + i18n.global.tc('city')
            else if (this.selectedCities.length == 3) this.cityLabelName = 3 + i18n.global.tc('city')
            this.showCities = false
        }
    }

    cancel() {
        this.showCities = false
        this.selectedCities = []

    }

    selectCity(item) {

        let find = this.selectedCity_Ids.indexOf(item.id)
        if (find != -1) {
            this.selectedCity_Ids.splice(find, 1)
            this.selectedCities.splice(find, 1)
        } else {
            this.selectedCity_Ids.push(item.id)
            this.selectedCities.push(item)
        }
    }

    ProductFilter(model) {
        if (this.loadingProducts || this.productsIsFinished) return;
        this.loadingProducts = true
        model.skip = this.skip


        ProductRepository.getInstance().getRecentProducts({
            body: model,
            onLoadChange: (loadStatus) => this.loadingProducts = loadStatus,
            onReceive: (res) => {
                if (res == null) {
                    ToastService.getInstance().error(i18n.global.tc('thereAreNoResults'))
                } else {
                    if (res.statusCode == 204) ToastService.getInstance().error(i18n.global.tc('thereAreNoResults'))
                    else if (res.statusCode == 400) ToastService.getInstance().error(i18n.global.tc('searchByAreaCityLimitation'))

                    else {
                        this.found_productsByFilterAPI.push(...res)
                        this.showFoundProducts = true
                        if (this.take > res.length) {
                            this.productsIsFinished = true
                        }
                        if (res.length == this.take) {
                            this.skip += this.take;
                        }
                        this.loadingProducts = false
                    }

                }
            }
        })

    }


}