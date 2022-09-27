import {UserRepository} from "@/core/repository/user.repository";
import {DateService} from "@/core/service/date.service";
import router from "@/core/router/router";

export class MainEditShiftState {
    id = null
    model = null
    loadAllTimes = false
    username = null


    getUtcTime(time: string) {
        let date = new Date();
        date.setHours(Number(time.split(':')[0]));
        date.setMinutes(Number(time.split(':')[1]));
        let h2 = date.getUTCHours() < 10 ? '0' + date.getUTCHours() : date.getUTCHours();
        let m2 = date.getUTCMinutes() < 10 ? '0' + date.getUTCMinutes() : date.getUTCMinutes();
        return h2 + ':' + m2;
    }


    getAllTimes() {
        this.loadAllTimes = true
        UserRepository.getInstance().GetFullTime({
            urlContent: Math.abs(this.id),
            onReceive: (res) => {
                if (res != null) {
                    this.model = {
                        times: res
                    }

                    for (let i = 0; i < this.model.times.length; i++) {

                        if (this.model.times[i].statusType == 2) {
                            this.model.times[i].statusType = 1;
                        } else if (this.model.times[i].statusType == 1 && this.model.times[i].times[0].startTime == '00:00' && this.model.times[i].times[0].endTime == '23:59') {
                            this.model.times[i].statusType = 2;
                        } else if (this.model.times[i].statusType == 1) {
                            this.model.times[i].statusType = 4;
                        }
                    }


                    this.loadAllTimes = false


                }
            }
        })
    }


    updateWorkPageTime() {
        this.model.times.forEach(e => {
            delete e.workPageId
        })

        for (let i = 0; i < this.model.times.length; i++) {

            if (this.model.times[i].statusType == 1) {
                this.model.times[i].statusType = 2;
            } else if (this.model.times[i].statusType == 2) {
                if (DateService.getInstance().getCurrentJalaliMonth() > 6) {
                    this.model.times[i].times = [{startTime: '00:00', endTime: '23:59'}];
                } else {
                    this.model.times[i].times = [{startTime: '00:00', endTime: '23:59'}];
                }
                this.model.times[i].statusType = 1;
            } else if (this.model.times[i].statusType == 4) {
                for (let j = 0; j < this.model.times[i].times.length; j++) {
                    const element = this.model.times[i].times[j];
                    this.model.times[i].times[j] = {
                        startTime: this.getUtcTime(element.startTime),
                        endTime: this.getUtcTime(element.endTime)
                    };
                }
                this.model.times[i].statusType = 1;
            }
        }


        UserRepository.getInstance().UpdateWorkPageTime({
            body: {
                workPageId: Math.abs(this.id),
                workPageTimes: this.model.times
            },
            onReceive: (res) => {


                this.loadAllTimes = true
                this.getAllTimes()
                router.push(
                    `/page/${this.username}`
                );

            }
        })
    }

}
