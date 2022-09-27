import {StationRepository} from "@/core/repository/station.repository";
import router from "@/core/router/router";
import {ToastService} from "@/core/service/toast.service";
import {getSelectedPageId} from "@/core/service/utils.service"
import {CreateStationModel, getStationModel} from "@/data/city/workpage/stations.model";
import {i18n} from "@/main";

export class YourStationsState {

    dataView = {
        listStations: <getStationModel[]>[],
        selectedStation: <getStationModel>null,
        loading: false
    }

    station = {
        type: false,
        postData: <CreateStationModel>null,
    }


    getList() {
        this.dataView.loading = true;
        StationRepository.getInstance().getAllStation({
            urlContent: {
                workPageId: Math.abs(getSelectedPageId()),
                myPageId: getSelectedPageId()
            },
            onReceive: (res) => {
                if (res !== null) {
                    this.dataView.listStations = res;
                }
                this.dataView.loading = false;
            }
        })
    }

    checkStatus(status) {
        switch (status) {
            case 1:
                return i18n.global.tc('notCheck')
            case 2:
                return i18n.global.tc('accepted')
            case 3:
                return i18n.global.tc('notAccepted')
            case 4:
                return i18n.global.tc('deletedPage')
        }
    }

    checkOntAllow() {
        let sum = 0;
        this.dataView.listStations.forEach(item => {
            if (item.stationStatus === 1) {
                sum += 1
            }
        });
        if (sum < 3) {
            router.push('/createStation');
        } else {
            ToastService.getInstance().error(i18n.global.tc('tooManyAttempt'));
        }
    }

    goToPreview(id) {
        router.push(`/stationPreview/${id}`);
    }
}
