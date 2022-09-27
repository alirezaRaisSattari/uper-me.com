import {i18n} from "@/main";

export class PropConstants {
    prepareTimes = [
        {key: 60, value: i18n.global.tc('one_hour')},
        {key: 60 * 2, value: i18n.global.tc('two_hours')},
        {key: 60 * 3, value: i18n.global.tc('three-hours')},
        {key: 60 * 4, value: i18n.global.tc('four_hours')},
        {key: 60 * 24, value: i18n.global.tc('one-day')},
        {key: 60 * 48, value: i18n.global.tc('two-days')},
        {key: 60 * 72, value: i18n.global.tc('three-days')},
        {key: 60 * 96, value: i18n.global.tc('Four-days')},
    ];
    unitMeasurements = [
        {key: 1, value: i18n.global.tc('g')},
        {key: 2, value: i18n.global.tc('kg')},
    ];
    sellCountsInSingleFactor = [
        {key: 1, value: '1'},
        {key: 2, value: '2'},
        {key: 3, value: '3'},
        {key: 4, value: '4'},
        {key: 5, value: '5'},
        {key: 6, value: '6'},
        {key: 7, value: '7'},
        {key: 8, value: '8'},
        {key: 9, value: '9'},
        {key: 10, value: '10'},
        {key: 10000, value: i18n.global.tc('unlimited')},
    ];

    expireDays = [
        {key: 1, value: '1'},
        {key: 2, value: '2'},
        {key: 3, value: '3'},
        {key: 4, value: '4'},
        {key: 5, value: '5'},
        {key: 6, value: '6'},
        {key: 7, value: '7'},
        {key: 8, value: '8'},
        {key: 9, value: '9'},
        {key: 10, value: '10'},
        {key: 20, value: '20'},
        {key: 30, value: '30'},
        {key: 40, value: '40'},
        {key: 50, value: '50'},
        {key: 60, value: '60'},
        {key: 70, value: '70'},
        {key: 80, value: '80'},
        {key: 90, value: '90'},
        {key: 100, value: '100'},
        {key: 110, value: '110'},
        {key: 120, value: '120'},
        {key: 130, value: '130'},
        {key: 140, value: '140'},
        {key: 150, value: '150'},
        {key: 160, value: '160'},
        {key: 170, value: '170'},
        {key: 180, value: '180'},
        {key: 190, value: '190'},
        {key: 200, value: '200'},
        {key: 210, value: '210'},
    ]

}