import {CityModel, CountryModel, ProvinceModel} from "@/data/setting/countries.model"
import {EnumKeys} from "../constant/constant"
import {SettingRepository} from "../repository/setting.repository"
import {LocalStorageService} from "./localStorage.service"
import {WindowLoading} from "./utils.service"

export class CacheService {
    private static instance: CacheService

    public static getInstance(): CacheService {
        if (!CacheService.instance) CacheService.instance = new CacheService()
        return CacheService.instance
    }

    private static setListInLocalStorage(key, val) {
        if (Array.isArray(val)) {
            LocalStorageService.getInstance().setItem(key, JSON.stringify(val))
        } else {
            LocalStorageService.getInstance().setItem(key, JSON.stringify([]))
        }
    }

    private static getChangeIndex() {
        try {
            let changeIndexes = LocalStorageService.getInstance().getItem(EnumKeys.KeyChangeIndexes);
            if (changeIndexes != null) {
                if (!isNaN(JSON.parse(changeIndexes).countries)) return JSON.parse(changeIndexes).countries
            }
            LocalStorageService.getInstance().setItem(EnumKeys.KeyChangeIndexes, JSON.stringify({countries: 0}))
            changeIndexes = LocalStorageService.getInstance().getItem(EnumKeys.KeyChangeIndexes);
            return JSON.parse(changeIndexes).countries
        } catch (error) {
            return 0
        }
    }

    private static setChangeIndex(index) {
        let changeIndexes = JSON.parse(LocalStorageService.getInstance().getItem(EnumKeys.KeyChangeIndexes));
        changeIndexes.countries = index
        LocalStorageService.getInstance().setItem(EnumKeys.KeyChangeIndexes, JSON.stringify(changeIndexes))
    }

    getCache(): void {
        WindowLoading.value = true;
        this.loadCountries();
        this.loadCurrency()
    }

    public loadCurrency(): void {
        SettingRepository.getInstance().getAllCurrency({
            body: {
                skip: 0,
                take: 1000,
                changeIndex: 0
            },
            onReceive: res => {
                LocalStorageService.getInstance().setItem(EnumKeys.KeyCurrencies, JSON.stringify(res))
            }
        })
    }

    getCountries(): CountryModel[] {
        let countries = JSON.parse(LocalStorageService.getInstance().getItem(EnumKeys.KeyCountries));
        if (Array.isArray(countries)) {
            return countries;
        }
        return [];
    }

    getProvinces(): ProvinceModel[] {
        let provinces = JSON.parse(LocalStorageService.getInstance().getItem(EnumKeys.KeyProvinces));
        if (Array.isArray(provinces)) {
            return provinces;
        }
        return [];
    }

    getCities(): CityModel[] {
        let cities = JSON.parse(LocalStorageService.getInstance().getItem(EnumKeys.KeyCities));
        if (Array.isArray(cities)) {
            return cities;
        }
        return [];
    }

    getCountryById(countryId): CountryModel {
        return this.getCountries().find(m => m.id == countryId)
    }

    getProvinceById(provinceId): ProvinceModel {
        return this.getProvinces().find(m => m.id == provinceId)
    }

    getCityById(cityId): CityModel {
        return this.getCities().find(m => m.id == cityId)
    }

    getCurrencies() {
        try {
            let currencies = JSON.parse(LocalStorageService.getInstance().getItem(EnumKeys.KeyCurrencies)).currency;
            if (Array.isArray(currencies)) {
                return currencies;
            }
            return [];
        } catch (e) {
        }
    }

    getCurrencyById(currencyId) {
        try {
            return this.getCurrencies().find(m => m.id == currencyId)
        } catch (e) {
        }

    }

    getCurrencyByCountryId(countryId) {
        return this.getCurrencies().find(m => m.countryId == countryId)
    }

    private loadCountries(): void {
        SettingRepository.getInstance().getAllCountries({
            urlContent: CacheService.getChangeIndex(),
            onReceive: (res) => {
                if (res != null && res.changeIndex) {
                    CacheService.setListInLocalStorage(EnumKeys.KeyCountries, res.countries);
                    CacheService.setListInLocalStorage(EnumKeys.KeyProvinces, res.provinces);
                    if (Array.isArray(res.cities)) {
                        res.cities = res.cities.map(e => {
                            delete e.provinceName
                            return e
                        })
                        CacheService.setListInLocalStorage(EnumKeys.KeyCities, res.cities);
                    }
                    CacheService.setChangeIndex(res.changeIndex);
                }
                WindowLoading.value = false;
            },
            onError: () => {
                WindowLoading.value = false;
            }
        })
    }


}
