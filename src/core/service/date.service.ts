import moment from "jalali-moment";
import {i18n} from '@/main';

export class DateService {
    private static instance: DateService

    public static getInstance(): DateService {
        if (!DateService.instance) DateService.instance = new DateService()
        return DateService.instance
    }

    getCurrentJalaliMonth() {
        let m = moment(new Date().toISOString());
        return m.jMonth() + 1;
    }

    convertToJalali(date: string, withTime: boolean = false) {
        if (date == null || date == '' || !date) {
            return 'ندارد';
        }
        let text = '';
        try {
            let startdate = moment(date).add({hour:3,minute:30});
            text = startdate.format(withTime ? 'jYYYY/jMM/jDD HH:mm' : 'jYYYY/jMM/jDD');
        } catch (error) {
            text = 'تاریخ نامعتبر';
        }
        return text;
    }

    getJalaliTime(date: string) {
        if (date == null || date == '' || !date) {
            return 'ندارد';
        }
        let text = '';
        try {
            if (typeof date == 'string') date = date.replace('Z', '');
            let startdate = moment(date);
            if (this.getCurrentJalaliMonth() > 6) startdate = startdate.add(3.5, 'hours');
            else startdate = startdate.add(4.5, 'hours');
            text = startdate.format('HH:mm');
        } catch (error) {
            text = 'زمان نامعتبر است';
        }
        return text == 'Invalid date' ? 'زمان نامعتبر است' : text;
    }

    getHours(date:String) {
        return date.split('T')[1].substring(0,5)
    }

    timeNow() {
        let utc = moment.utc();
        return utc.format();
    }

    dayFromNow(date) {
        if (date == null) return '- 0 -'
        let m;
        m = moment(date);
        let today;
        today = moment().startOf('day');
        return Math.round(moment.duration(m - today).asDays());
    }

    timeDifference(previous) {
        console.log(previous);
        const date = new Date;
        console.log( date.toISOString());
        
        previous = new Date(previous);
        previous = previous.getTime()
        if (this.getCurrentJalaliMonth() < 7)
            previous += 16200000
        else
            previous += 12600000
        let msPerMinute = 60 * 1000;
        let msPerHour = msPerMinute * 60;
        let msPerDay = msPerHour * 24;
        let msPerMonth = msPerDay * 30;
        let msPerYear = msPerDay * 365;
        let current = Date.now()
        let elapsed = current - previous;

        if (elapsed < 0) {
            return 'نامعتبر'
        } else if (elapsed < msPerMinute) {
            return Math.round(elapsed / 1000) + ' ' + i18n.global.tc('seconds-ago');
        } else if (elapsed < msPerHour) {
            return Math.round(elapsed / msPerMinute) + ' ' + i18n.global.tc('minutes-ago');
        } else if (elapsed < msPerDay) {
            return Math.round(elapsed / msPerHour) + ' ' + i18n.global.tc('hours-ago');
        } else if (elapsed < msPerMonth) {
            return Math.round(elapsed / msPerDay) + ' ' + i18n.global.tc('days-ago');
        } else if (elapsed < msPerYear) {
            return Math.round(elapsed / msPerMonth) + ' ' + i18n.global.tc('months-ago');
        } else {
            return Math.round(elapsed / msPerYear) + ' ' + i18n.global.tc('years-ago');
        }
    }

    dayOfweek(time) {
        let date = moment(time);
        let weekday = [
            i18n.global.tc('sunday'),
            i18n.global.tc('monday'),
            i18n.global.tc('tuesday'),
            i18n.global.tc('wednesday'),
            i18n.global.tc('thursday'),
            i18n.global.tc('friday'),
            i18n.global.tc('saturday'),
        ]
        return weekday[date.isoWeekday()];
    }

    convertJalaliToGregorian(dateTime) {
        const sdate = moment.from(dateTime,
            'fa',
            'YYYY/MM/DD HH🇲🇲ss'
        );
        return sdate.toISOString();
    }

    countDown(date, onTick?: (time) => void, onStop?: () => void) {
        let countDownDate = new Date(date).getTime();
        
        let res
        if (res === undefined) {
            let now = new Date().getTime();
            
            let distance = countDownDate - now;
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

            res = days + ' ' + i18n.global.tc('day') + ' ' + hours + ' ' + i18n.global.tc('hour') + ' ' + minutes + ' ' + i18n.global.tc('minute') + ' ' + seconds + ' ' + i18n.global.tc('second')
        }

        let interval = setInterval(function () {
            let now = new Date().getTime();
            let distance = countDownDate - now;
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
            if (distance < 0) {
                clearInterval(interval);
                res = 'زمان تموم شد';
                onStop()
            } else {
                res = days + ' ' + i18n.global.tc('day') + ' ' + hours + ' ' + i18n.global.tc('hour') + ' ' + minutes + ' ' + i18n.global.tc('minute') + ' ' + seconds + ' ' + i18n.global.tc('second')
                onTick(res)
            }

        }, 1000);
        return res
    }

    homeScreenCountDown(date, onTick?: (time) => void, onStop?: () => void) {
        let countDownDate = new Date(date).getTime();
        let res
        if (res === undefined) {
            let now = new Date().getTime();
            let distance = countDownDate - now;
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
            res = days + ' ' + i18n.global.tc('day') + ' ' + hours + ' ' + i18n.global.tc('hour') + ' ' + minutes + ' ' + i18n.global.tc('minute') + ' ' + seconds + ' ' + i18n.global.tc('second')
        }

        let interval = setInterval(function () {
            let now = new Date().getTime();
            let distance = countDownDate - now;
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
            if (distance < 0) {
                clearInterval(interval);
                res = 'زمان تموم شد';
                onStop()
            } else {
                res = seconds + ' : ' + minutes + ' : ' + hours;
                onTick({
                    timer: res,
                    days: days + '  ' + i18n.global.tc('day')
                })
            }

        }, 1000);
        return res
    }

    getDateWithTime(date, time) {
        let dateTemp = DateService.getInstance().convertJalaliToGregorian(date)
        let timeTemp = new Date(time).toISOString()
        return dateTemp.toString().split('T')[0] + 'T' + timeTemp.toString().split('T')[1]
    }


    hoursTodays(hour) {
        var Hours = Math.floor(hour / 60);
        var Day = Math.floor(Hours / 24);
        var result = Day + ' ' + i18n.global.tc('day') + ' ' + Hours + ' ' + i18n.global.tc('hour');
        return result
    }

    secondsToString(seconds) {
        let numyears = Math.floor(seconds / 31536000);
        let numdays = Math.floor((seconds % 31536000) / 86400);
        let numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
        let numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
        let numseconds = (((seconds % 31536000) % 86400) % 3600) % 60;
        return this.returnValue(numdays, i18n.global.tc('day')) + this.returnValue(numhours, i18n.global.tc('hour')) + this.returnValue(numminutes, i18n.global.tc('minute')) + this.returnValue(numseconds, i18n.global.tc('second'));
    }

    returnValue(val, postfix) {
        if (val === 0) {
            return ''
        } else {
            return `${val} ${postfix} `
        }
    }

    dayTimeDifference(previous) {
        previous = new Date(previous);
        previous = previous.getTime()
        if (this.getCurrentJalaliMonth() < 7)
            previous += 16200000
        else
            previous += 12600000
        let msPerMinute = 60 * 1000;
        let msPerHour = msPerMinute * 60;
        let msPerDay = msPerHour * 24;
        let current = Date.now()
        let elapsed = current - previous;

        if (elapsed < 0) {
            return 'false'
        } else
            return Math.round(elapsed / msPerDay)
    }

    calculateNumberOfDaysJs(date) { //محاسبه تعداد روز رد شده
        if (!date) return null
        let startDate = date.toString().split('T')[0] ;
        let date1 = new Date();
        let date2 = new Date(startDate);
        var oneDay = 24 * 60 * 60 * 1000;
        var date1InMillis = date1.getTime();
        var date2InMillis = date2.getTime();
        var days = Math.round(Math.abs(date2InMillis - date1InMillis) / oneDay);
        return days;
    }

    calculateNumberOfHoursJs(date) { //محاسبه تعداد ساعت رد شده
        var dateFuture = date;
        var dateNow = new Date();
        
        var seconds = Math.floor((Number(dateFuture) - Number((dateNow)))/1000);
        var minutes = Math.floor(seconds/60);
        var hours = Math.floor(minutes/60);
        var days = Math.floor(hours/24);
        console.log(days);
        
        hours = hours-(days*24);
        return hours;
    }


    testi(date) {
        // 2021-12-30T08
        var dateFuture = new Date(date);
        var dateNow = new Date();
        console.log( dateNow.getMilliseconds() , dateFuture.getMilliseconds());
        const mil = dateNow.getMilliseconds() - dateFuture.getMilliseconds();
        console.log(mil);
        
        return
    }
}
