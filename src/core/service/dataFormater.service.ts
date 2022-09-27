import { i18n } from "@/main";
import moment from "moment";

export class DataFormatterService {
    private static instance: DataFormatterService

    public static getInstance(): DataFormatterService {
        if (!DataFormatterService.instance) DataFormatterService.instance = new DataFormatterService()
        return DataFormatterService.instance
    }

    getTimeJalali(value: string) {
        return value.split(' ')[1];
    }

    expireDate(expireDate: Date) {
        const startDate = moment(moment(new Date()).format('YYYY-MM-DD'));
        const endDate = moment(moment(expireDate).format('YYYY-MM-DD'));
        
        const diff = endDate.diff(startDate);
        
        if (diff > 0) {
            return new Date(diff).getDate();
        } else {
            return null;
        }
    }

    formatCurrency(price ,decimalDigits = false) {
        
        if (Number(price) > 0) {
            if (decimalDigits) {
                let n = Number(price);
                if (isNaN(n)) {
                  return 0.0;
                }
                let x = `${price}`;
                let y;
                if (x.split('.').length != 1) {
                  y = x.split('.')[1].length
                }
                var re = '\\d(?=(\\d{' + (3) + '})+' + (4 > 0 ? '\\.' : '$') + ')';
                return n.toFixed(Math.max(0, ~~(y ?? 1))).replace(new RegExp(re, 'g'), '$&,');
            } else return Intl.NumberFormat().format(Math.floor(Number(price)));
        } else {
            return price;
        }
    }

    getDayOrHours(minutes) {
        if (Number(minutes) > 0) {
           if (minutes >= 1440) {
               return i18n.global.tc('day',{index:Math.round((minutes / 60) / 24)});
            } else {
                return i18n.global.tc('hour',{index:Math.round(minutes / 60)});
           }
        } else {
            return minutes;
        }
    }

    formatDate(value: any) {
        return moment(value, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
    }

    getVideoData( file , callBack:Function) {

        const loadVideo:any = file => new Promise((resolve, reject) => {
           try {
               let video = document.createElement('video')
               video.preload = 'metadata'
   
               video.onloadedmetadata = function () {
                   resolve(this);
                   
                   const data = {
                       src:video.currentSrc,
                       duration:video.duration
                   }
                   callBack(data);
               }
   
               video.onerror = function () {
                   reject("Invalid video. Please select a video file.")
               }
   
               video.src = window.URL.createObjectURL(file)
           } catch (e) {
               reject(e)
           }
       })

       loadVideo(file)
    }

     postCodeValid(value , callBack:Function) {
      
        if (isNaN(value)) {
            callBack(false);
        } else if (value == "") {
            callBack(false);
        } else if (value.length < 10) {
           callBack(false);
        } else {
            var numb = 0;
            var data = Number(data);
            for (let i = 0; i < value.length; i++) {
                data = value[i] * (value.length - i);
                numb += data;
            }
            var x = numb % 11;
            if (x === 0) {
                callBack(true);
            } else {
                callBack(false);
            }
            numb = 0;
        }
    }

    getPersianDayLabel = (dateValue) => { 
        const week = ["يكشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنج شنبه", "جمعه", "شنبه"]
        const date = new Date(dateValue);
        const day = date.getDay();
        return week[day];
    }

    
}
