import { CacheService } from "@/core/service/cache.service";
import { i18n } from "@/main";
import { FactorRepository } from "@/core/repository/factor.repository"
import { FollowRepository } from "@/core/repository/follow.repository";
import { getSelectedPageId } from "@/core/service/utils.service";
import { DateService } from "@/core/service/date.service"
import router from "@/core/router/router";
import PersianDate from "persian-date";
import "vue3-persian-datepicker/dist/datepicker.min.css";

export class CreateRebateCodeState {
    pageId = getSelectedPageId()
    offCodeType = false
    jalal = new PersianDate();
    percent = ""
    status = true
    time = null
    date
    quanitity = ""
    currencyType = { id: 1, name: "تومان", countryId: 1, isActive: true }
    allCurrencies = [
        {
            name: i18n.global.tc("uper"),
            value: 0
        },
        {
            name: i18n.global.tc("toman"),
            value: 1
        }
    ]
    productType = 1
    offCodeName = ""
    allFollowers = []
    selectedFollowers = []
    minimumFactorPrice: null
    maximumOffValue: null
    showFollowers = false
    showSelectedFollowers = false
    currencyId = 1
    allProductTypes = [
        {
            name: i18n.global.tc("sell"),
            value: 1
        },
        {
            name: i18n.global.tc("reserve"),
            value: 2
        },
        {
            name: i18n.global.tc("fare"),
            value: 3
        },
        {
            name: i18n.global.tc("service"),
            value: 4
        },
        {
            name: i18n.global.tc("virtual"),
            value: 12
        }
    ]

    getFollowers() {
        FollowRepository.getInstance().GetFollowers({
            body: {
                requestTime: new Date(),
                pageId: this.pageId,
                skip: 0,
                take: 10
            },
            onReceive: (res) => {
                this.allFollowers = res
            }
        })

    }

    showFollowersFunc() {
        this.showFollowers = true
        this.getFollowers()
    }

    createRebateCode() {
        FactorRepository.getInstance().FactorOffCodeCreate({
            body: {
                pageId: Math.abs(this.pageId),
                status: this.status == true ? 1 : 2,
                productType: this.productType,
                title: this.offCodeName,
                percent: this.percent,
                currencyId: this.currencyId,////////////////////////////////////////////////////////
                receiverPageId: this.selectedFollowers.length == 1 ? this.selectedFollowers[0].pageId : null,
                isFirst: this.offCodeType,
                minimumFactorPrice: this.minimumFactorPrice,
                maximumOffValue: this.maximumOffValue,
                quanitity: this.quanitity,
                expiredAt: DateService.getInstance().getDateWithTime(this.date, this.time)

            },
            onReceive: (res) => {
                if (res != null) router.push("/rebate-code")
            }
        })
    }


}
