import {i18n} from "@/main";

export class supervisorState {
    units = [
        {label: i18n.global.tc("members")},
        {label: i18n.global.tc("activities")},
        {label: i18n.global.tc("income")},
        {label: i18n.global.tc("awards")},
        {label: i18n.global.tc("sells")},
        {label: i18n.global.tc("purchases")},
    ];
    selectedUnit = 0;
}
