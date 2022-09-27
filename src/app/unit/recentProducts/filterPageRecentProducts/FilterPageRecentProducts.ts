import {SettingRepository} from '@/core/repository/setting.repository'


import {i18n} from "@/main";
import {ToastService} from "@/core/service/toast.service";

import {elementIdScrolledToBottom} from '@/core/service/utils.service';

export class FilterPageRecentProducts {
    skip = 0

    take = 10
    immediate = false
    loadingAreas = false
    AreasIsFinished = false
    showProductsCategory = false
    selectedCities = []
    areaArray = []
    areaModal = false
    noArea = false
    selectedCreditLevel = null
    showCreditLevelModal = false
    areaMsg = ''
    creditLevelMsg = ''
    showCreditLevelMsg = false

    showProductTypeModal = false
    selectedProductType = null
    ProductTypeMsg = ''
    showProductTypeMsg = false
    productTypeArray = [{usedType: 1, name: i18n.global.tc('new')}, {usedType: 2, name: i18n.global.tc('secondhand')}]
    mahsoollTypeArray = [i18n.global.tc('offer'), i18n.global.tc('request')]
    creditLevelArray = [{id: 1, name: i18n.global.tc('goldCreditLevel')}, {
        id: 2,
        name: i18n.global.tc('silverCreditLevel')
    }, {id: 3, name: i18n.global.tc('bronzeCreditLevel')}]
    showMahsolDialog = false
    selectedMahsol = null
    selectedCategories = []
    selectedCategoriesTiltles = []
    selectedAreas = []
    selectedAreas_id = []
    selectedAreas_name = []

    found_productsByFilterAPI = []

    public getAllLayersOfCity() {
        this.areaModal = true
        if (this.loadingAreas || this.AreasIsFinished) return;
        this.loadingAreas = true

        SettingRepository.getInstance().GetAllLayersOfCity({
            body: {
                skip: this.skip,
                take: this.take,

                id: this.selectedCities[0].id,
                changeIndex: 0
            },
            onReceive: (res) => {


                if (res.areas !== null) {

                    if (this.take > res.areas.length) {

                        this.AreasIsFinished = true
                    }
                    if (res.areas.length == this.take) {
                        this.skip += this.take;

                    }
                    this.areaArray.push(...res.areas);
                    this.loadingAreas = false
                    elementIdScrolledToBottom('areaDialog', () => {
                        this.getAllLayersOfCity()
                    })
                } else {

                    this.noArea = true
                    ToastService.getInstance().error(i18n.global.tc('thereAreNoResults'))
                }
            }
        })

    }

    public clickOnAreaFilrter() {

        this.selectedAreas = []
        this.areaModal = true
        this.getAllLayersOfCity()


    }

    public closeAreaModel() {


        this.areaModal = false

    }

    selectArea(item) {
        let find = this.selectedAreas_id.indexOf(item.id)

        if (find != -1) {

            this.selectedAreas_id.splice(find, 1)
            this.selectedAreas.splice(find, 1)
            this.selectedAreas_name.splice(find, 1)

        } else {

            this.selectedAreas_id.push(item.id)
            this.selectedAreas.push(item)
            this.selectedAreas_name.push(item.areaName)

        }
    }


    public openCreditLevelDialog() {
        this.selectedCreditLevel = null
        this.showCreditLevelModal = true;
        this.creditLevelMsg = ''
        this.showCreditLevelMsg = false
    }

    public closeCreditLevelDialog() {
        this.showCreditLevelModal = false;
        this.creditLevelMsg = this.selectedCreditLevel.name
        this.showCreditLevelMsg = true
    }

    public openProductTypeDialog() {
        this.selectedProductType = null
        this.showProductTypeModal = true;
        this.ProductTypeMsg = ''
        this.showProductTypeMsg = false
    }

    public closeProductTypeDialog() {
        this.showProductTypeModal = false;
        this.ProductTypeMsg = this.selectedProductType.name
        this.showProductTypeMsg = true
    }


}
