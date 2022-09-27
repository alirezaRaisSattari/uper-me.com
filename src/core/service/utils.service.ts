import {EnumKeys} from "@/core/constant/constant";
import {LanguageType} from "@/core/enum/enums";
import {LocalStorageService} from "@/core/service/localStorage.service";
import {ref} from "vue";
import jwt_decode from "jwt-decode"
import {PageStore} from "@/core/store/page.store";
import {i18n} from "@/main";

export const WindowLoading = ref(false);

export const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
}

export function changeAppDirection(locale) {
    document.body.dir = locale === 'fa' ? 'rtl' : 'ltr'
    LocalStorageService.getInstance().setItem(EnumKeys.KeyLanguage, locale)
}

export function getProductTypeById(categoryId, isAds, isConsult) {
    let productType = 1;
    if (isConsult) {
        productType = 14;
    } else {
        switch (categoryId) {
            case 8:
                productType = isAds ? 5 : 1;
                break;
            case 10:
                productType = isAds ? 8 : 4;
                break;
            case 11:
                productType = isAds ? 7 : 3;
                break;
            case 12:
                productType = isAds ? 6 : 2;
                break;
            case 14:
                productType = 12;
                break;
        }
    }
    return productType;
}

export function getLanguageFromCache() {
    let lang = LocalStorageService.getInstance().getItem(EnumKeys.KeyLanguage);
    if (lang === LanguageType.en) {
        return LanguageType.en;
    } else if (lang === LanguageType.fa) {
        return LanguageType.fa;
    } else {
        LocalStorageService.getInstance().setItem(EnumKeys.KeyLanguage, LanguageType.fa)
        return LanguageType.fa;
    }
}

export function getMainPageId(): number {
    let x: any = getDecodedToken();
    return x.MainPageId
}

export function getSelectedPageId() {
    let x: any = Number(LocalStorageService.getInstance().getItem(EnumKeys.KeySelectedPageId));
    if (!isNaN(x) && x !== 0) return x
    else return null
}

export function getDecodedToken() {
    let token = LocalStorageService.getInstance().getItem(EnumKeys.KeyToken);
    return jwt_decode(token)
}

export function isLoggedIn() {
    let x = LocalStorageService.getInstance().getItem(EnumKeys.KeyToken)
    return x && typeof x == 'string';
}


export function getMainPageData() {

    let mainPageData = JSON.parse(
        String(LocalStorageService.getInstance().getItem(EnumKeys.KeyMainPage))
    );
    return mainPageData ? {
        id: Math.abs(mainPageData.mainPageId),
        name: mainPageData.name,
        username: mainPageData.username,
        profileUrl: mainPageData.profileImageUrl,
        bio: mainPageData.bio,
        pageType: null,
        mobileNumber: mainPageData.mobileNumber,
        creditLevel: mainPageData.creditLevel,
        pageStatus: mainPageData.pageStatus,
        isPublic: mainPageData.isPublic,
        showFollowers: mainPageData.showFollowers,
        showFollowing: mainPageData.showFollowing,
        mobilePrefix: mainPageData.mobilePrefix,
        introduceCode: mainPageData.introduceCode,
        isSupporter: mainPageData.isSupporter,
    } : null;
}

export function getSelectedPageData() {
    try {
        let pageId = PageStore().selectedPageId;
        if (pageId > 0) {
            let mainPageData = JSON.parse(
                String(LocalStorageService.getInstance().getItem(EnumKeys.KeyMainPage))
            );
            return {
                id: Math.abs(mainPageData.mainPageId),
                name: mainPageData.name,
                username: mainPageData.username,
                profileUrl: mainPageData.profileImageUrl,
                bio: mainPageData.bio,
                pageType: null,
                mobileNumber: mainPageData.mobileNumber,
                creditLevel: mainPageData.creditLevel,
                pageStatus: mainPageData.pageStatus,
                isPublic: mainPageData.isPublic,
                showFollowers: mainPageData.showFollowers,
                showFollowing: mainPageData.showFollowing,
                mobilePrefix: mainPageData.mobilePrefix,
                introduceCode: mainPageData.introduceCode,
                isSupporter: mainPageData.isSupporter,
            };
        } else {
            let workPagesData = JSON.parse(
                String(LocalStorageService.getInstance().getItem(EnumKeys.KeyWorkPages))
            );
            let wp = workPagesData.find(m => m.pageId === pageId)
            if (wp) {
                return {
                    id: -Math.abs(wp.pageId),
                    name: wp.name,
                    username: wp.username,
                    bio: wp.bio,
                    pageType: wp.pageType,
                    mobileNumber: wp.mobileNumber,
                    profileUrl: wp.profileImageUrl,
                    creditLevel: wp.creditLevel,
                    pageStatus: wp.userStatus,
                    isPublic: wp.isPublic,
                    showFollower: wp.showFollower,
                    showFollowing: wp.showFollowing,
                    cityId: wp.cityId,
                    introduceCode: wp.introduceCode,
                    isSupporter: wp.isSupporter
                }
            } else {
                return {}
            }
        }
    } catch (error) {
        return {}
    }
}

export function windowScrolledToBottom(callBack) {
    window.addEventListener('scroll', (e) => {
        if (
            (document.documentElement.scrollHeight - document.documentElement.scrollTop) >=
            document.documentElement.clientHeight &&
            (document.documentElement.scrollHeight - document.documentElement.scrollTop) <=
            document.documentElement.clientHeight + 100
        ) {
            callBack()
        }
    }, false);
}

export function windowScrolledToTop(callBack) {
    window.addEventListener('scroll', (e) => {
        if (document.documentElement.scrollTop === 0) {
            callBack()
        }
    }, false);
}

export function elementIdScrolledToBottom(element, callBack) {
    const el = document.getElementById(element);

    el.addEventListener('scroll', (e) => {
        if (
            (document.getElementById(element).scrollHeight - document.getElementById(element).scrollTop) >
            document.getElementById(element).clientHeight &&
            (document.getElementById(element).scrollHeight - document.getElementById(element).scrollTop) <
            document.getElementById(element).clientHeight + 15
        ) {
            callBack()
        }
    }, false);
}


export function elementScrolledToBottom(element, callBack) {

    const el = document.getElementById('pageCategoryDialog');
    el.addEventListener('scroll', (e) => {

        if (
            (document.getElementById('pageCategoryDialog').scrollHeight - document.getElementById('pageCategoryDialog').scrollTop) >
            document.getElementById('pageCategoryDialog').clientHeight &&
            (document.getElementById('pageCategoryDialog').scrollHeight - document.getElementById('pageCategoryDialog').scrollTop) <
            document.getElementById('pageCategoryDialog').clientHeight + 15
        ) {
            callBack()
        }
    }, false);
}

export function elementRemoveEventListener(element) {
    const el = document.getElementById(element);
    el?.removeEventListener("scroll", null);
}

export function convertFileTOBase64(inputValue: any, callBackResult): void {
    let file: File = inputValue;
    const myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
        callBackResult(`data:image/webp;${myReader.result.toString().split(";")[1]}`
        );
    };
    myReader.readAsDataURL(file);
}

export function accountNumberFormat(number) {

    number = number.toString().match(/.{1,4}/g)
    let newString = '';
    for (let i = 0; i < number.length; i++) {
        newString += number[i] + ' '
    }
    return newString;
}

export function priceFormat(price) {
    if (Number(price) > 0) {
        return Intl.NumberFormat().format(Number(price));
    } else {
        return price;
    }
}

export function confirmDialog(confirm, accept, reject?) {
    confirm.require({
        message: i18n.global.tc('want to proceed'),
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: i18n.global.tc('yes'),
        rejectLabel: i18n.global.tc('no'),
        accept: (accept),
        reject: (reject)
    });
}

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function copyToClipboard(str: string) {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}

export function getLocationWithPoint(point: string): { lat, lng } {
    let location;
    location = point;
    location = location.replace('POINT(', '');
    location = location.replace(')', '');
    location = location.split(' ');
    location.reverse();
    return {lat: Number(location[0]), lng: Number(location[1])};
}

//
// export function generatePDF(element) {
//     const doc = new jsPDF();
//     let canvasElement = document.createElement('canvas');
//     html2canvas(element, { canvas: canvasElement }).then(function (
//         canvas
//     ) {
//         const img = canvas.toDataURL("image/jpeg", 0.8);
//         doc.addImage(img, "JPEG", 20, 20, 20, 20);
//         doc.save("sample.pdf");
//     });
// }

export function numberOfProductsForHomeScreen(model) {
    let message: string;
    if (model.number === 0) {
        message = i18n.global.tc('unavailable');
    }
    if (model.number === -1) {
        message = i18n.global.tc('lessThan100');
    }
    switch (model.referenceAlgorithmId) {
        case 1:
            message = i18n.global.tc('lessThan10');
            break;
        case 2:
            message = i18n.global.tc('lessThan30');
            break;
        case 3:
            message = i18n.global.tc('lessThan50');
            break;
        case 4:
            message = i18n.global.tc('lessThan70');
            break;
        case 5:
            message = i18n.global.tc('lessThan100');
            break;
    }
    return message;
}

export function unitTitleFunc(unitNum) {
    switch (unitNum) {
        case 1:
            return i18n.global.tc("user");
        case 2:
            return i18n.global.tc("product");
        case 3:
            return i18n.global.tc("post");
        case 4:
            return i18n.global.tc("factor");
        case 5:
            return i18n.global.tc("accounting");
        case 6:
            return i18n.global.tc("delivery");
        case 7:
            return i18n.global.tc("story");
        case 8:
            return i18n.global.tc("ml");
        case 9:
            return i18n.global.tc("setting");
        case 10:
            return i18n.global.tc("agency");
        case 11:
            return i18n.global.tc("ticket");
        case 12:
            return i18n.global.tc("productComment");
    }
}

export function getSellType(sellType: number, pageType: number = 1) {
    return (
        i18n.global.tc("sellType") +
        " : " +
        (pageType === 3
            ? i18n.global.tc("consult")
            : sellType === 1
                ? i18n.global.tc("actual")
                : sellType === 2
                    ? i18n.global.tc("virtual")
                    : i18n.global.tc("actualAndVirtual"))
    );
}

export function genMAC() {
    let hexDigits = "0123456789ABCDEF";
    let macAddress = "";
    for (let i = 0; i < 6; i++) {
        macAddress += hexDigits.charAt(Math.round(Math.random() * 15));
        macAddress += hexDigits.charAt(Math.round(Math.random() * 15));
        if (i !== 5) macAddress += ":";
    }

    return macAddress;
}

export function slugify(text: String) {
    if (text == null) {
        return "";
    }
    text = text.trim();
    text = text.toLowerCase();
    text = text.replace('/', "-");
    text = text.replace(/[\u200B-\u200D\uFEFF]/g, '-');
    text = text.replace(/ /g, "-");
    text = text.replace("/[^a-z0-9_\s-ءاأإآؤئبتثجحخدذرزسشصضطظعغفقكلمنهويةى]/u", "");
    text = text.replace("/[\s-]+/", " ");
    text = text.replace("/[\s_]/", '-');
    text = text.replace("--", '-');
    text = text.replace("---", '-');
    text = text.replace("----", '-');
    text = text.replace("-----", '-');
    return text;
}

export function toEnglishDigits(str) {
    const persianNumbers = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰"]
    const arabicNumbers = ["١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩", "٠"]
    const englishNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]

    return str.split("").map(c => englishNumbers[persianNumbers.indexOf(c)] ||
        englishNumbers[arabicNumbers.indexOf(c)] || c).join("")
}

export const getBase64FromUrl = async (url) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            const base64data = reader.result;
            resolve(base64data);
        }
    });
}
