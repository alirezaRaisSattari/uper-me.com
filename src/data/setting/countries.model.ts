export class CountryModel {
    countryName: string
    id: number
}

export class ProvinceModel {
    countryId: number
    provinceName: string
    id: number
}

export class CityModel {
    countryId: number
    provinceId: number
    cityName: string
    id: number
}