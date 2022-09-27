<template>
  <div class="w-100 my-3 bg-white py-2 uper-card-1">
    <div class="w-100 d-flex justify-content-between px-3 my-2 py-2">
      <i class="fas text-muted fa-chevron-right" @click="prevMonthHandle"></i>
      <span>{{ state.months[state.month - 1] }}{{ state.year }}</span>
      <i class="fas text-muted fa-chevron-left" @click="nextMonthHandle"></i>
    </div>
    <div class="w-100 d-flex justify-content-center px-0 my-2">
      <span
        v-for="(item, index) in state.weekdaysMin"
        :key="index"
        class="text-center"
        style="width: calc(100% / 7)"
        >{{ item }}</span
      >
    </div>
    <swiper
      v-if="slideIndex != -1"
      :direction="'horizontal'"
      :free-mode="false"
      :initialSlide="slideIndex"
      :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
      :space-between="0"
      class="p-0 w-100 datePicker"
      slides-per-view="1"
    >
      <swiper-slide
        v-for="(item, index) in state.calcNumberWeeks(
          state.offsetDay(state.firstDayMonth(state.year, state.month)),
          state.lastOffsetDay(
            state.lastDayMonth(
              state.year,
              state.month,
              state.daysInMonth(state.year, state.month)
            )
          ),
          state.daysInMonth(state.year, state.month)
        )"
        :key="item"
        class="d-flex justify-content-between px-0 datePicker m-0"
      >
        <span
          v-for="(day, idx) in state.tableDays(
            state.daysInMonth(state.year, state.month),
            state.prevMonthDays(
              state.prevMonth(state.year, state.month),
              state.offsetDay(state.firstDayMonth(state.year, state.month))
            ),
            state.nextMonthDays(
              state.lastOffsetDay(
                state.lastDayMonth(
                  state.year,
                  state.month,
                  state.daysInMonth(state.year, state.month)
                )
              )
            )
          )[index]"
          :key="idx"
          :class="{
            'hiden-text': typeof day !== 'number',
            'bg-warning text-light': state.selected === day,
            'datePicker--active':
              !state.selected &&
              state.today === day &&
              state.checkYearMonth(state.year, state.month),
            'datePicker--highlight':
              state.today === day &&
              state.checkYearMonth(state.year, state.month),
          }"
          class="text-center rounded hover-pointer"
          style="width: calc(100% / 7)"
          @click="dateSelectedHandle($event, day)"
          >{{ day }}</span
        >
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import PersianDate from "persian-date";
import { computed, onMounted, reactive, ref, watch } from "vue";
import "vue3-persian-datepicker/dist/datepicker.min.css";
import { Swiper, SwiperSlide } from "swiper/vue";

export default {
  name: "DatePicker",
  components: { Swiper, SwiperSlide },
  //   props: ["name", "inline", "format", "placeholder"],
  setup(props, context) {
    const slideIndex = ref(-1);
    const jalal = new PersianDate();
    const state = reactive({
      year: jalal.year(),
      daysInMonth: computed(() => {
        return (year, month) => new PersianDate([year, month]).daysInMonth();
      }),
      prevMonth: computed(() => {
        return (year, month) =>
          new PersianDate([year, month <= 1 ? 1 : month - 1]).daysInMonth();
      }),
      nextMonth: computed(() => {
        return (year, month) =>
          new PersianDate([year, month >= 12 ? 1 : month + 1]).daysInMonth();
      }),
      weekdaysMin: jalal.rangeName().weekdaysMin,
      months: jalal.rangeName().months,
      month: jalal.month(),
      today: jalal.date(),
      firstDayMonth: computed(() => {
        return (year, month) =>
          new PersianDate([year, month, 1]).format("dddd");
      }),
      monthName: computed(() => {
        return (year, month) => new PersianDate([year, month]).format("MMMM");
      }),
      offsetDay: computed(() => {
        return (firstDayMonth) => {
          switch (firstDayMonth) {
            case "یکشنبه":
              return 1;
            case "دوشنبه":
              return 2;
            case "سه شنبه":
              return 3;
            case "چهار شنبه":
              return 4;
            case "پنج‌شنبه":
              return 5;
            case "جمعه":
              return 6;
            default:
              return 0;
          }
        };
      }),
      lastDayMonth: computed(() => {
        return (year, month, daysInMonth) =>
          new PersianDate([year, month, daysInMonth]).format("dddd");
      }),
      lastOffsetDay: computed(() => {
        return (lastDayMonth) => {
          switch (lastDayMonth) {
            case "یکشنبه":
              return 5;
            case "دوشنبه":
              return 4;
            case "سه شنبه":
              return 3;
            case "چهار شنبه":
              return 2;
            case "پنج‌شنبه":
              return 1;
            case "شنبه":
              return 6;
            default:
              return 0;
          }
        };
      }),
      prevMonthDays: computed(() => {
        return (prevMonth, offset) => {
          let days = [];
          for (let i = prevMonth; i > prevMonth - offset; i--) {
            days.push(i);
          }
          return days.reverse();
        };
      }),
      nextMonthDays: computed(() => {
        return (offset) => {
          let days = [];
          for (let i = 1; i < offset + 1; i++) {
            days.push(i);
          }
          return days;
        };
      }),
      rangeNameMonths: jalal.rangeName().months,
      years: computed(() => {
        let years = [];
        let start = 1300;
        while (jalal.year() + 20 >= start) {
          years.push(start++);
        }
        return years;
      }),
      selected: null,
      checkYearMonth: computed(() => {
        return (year, month) => {
          return jalal.year() === year && jalal.month() === month;
        };
      }),
      calcNumberWeeks: computed(
        () => (offsetDay, lastOffsetDay, daysInMonth) => {
          return Math.floor((offsetDay + lastOffsetDay + daysInMonth) / 7);
        }
      ),
      tableDays: computed(() => (daysInMonth, prevMonthDays, nextMonthDays) => {
        return genMatrix(daysInMonth, 7, prevMonthDays, nextMonthDays);
      }),
      showYearList: false,
      showMonthList: false,
      showDatePicker: false,
      date: new PersianDate([jalal.year(), jalal.month(), jalal.date()])
        .toLocale("en")
        .format("YYYY/MM/DD"),
    });
    onMounted(() => {
      if (context.attrs.modelValue) {
        const dateArr = context.attrs.modelValue.split("/");
        state.year = Number(dateArr[0]);
        state.month = Number(dateArr[1]);
        state.selected = Number(dateArr[2]);
        state.date = context.attrs.modelValue;
      }
      state.month = jalal.month();
      let dayList = state.tableDays(
        state.daysInMonth(state.year, state.month),
        state.prevMonthDays(
          state.prevMonth(state.year, state.month),
          state.offsetDay(state.firstDayMonth(state.year, state.month))
        ),
        state.nextMonthDays(
          state.lastOffsetDay(
            state.lastDayMonth(
              state.year,
              state.month,
              state.daysInMonth(state.year, state.month)
            )
          )
        )
      );
      for (let i = 0; i < dayList.length; i++) {
        for (let j = 0; j < 7; j++) {
          if (dayList[i][j] === state.today) {
            slideIndex.value = i;
          }
        }
      }
    });
    const prevMonthHandle = () => {
      if (state.month <= 1) {
        state.month = 12;
        state.year -= 1;
        return;
      }
      state.month -= 1;
    };
    const nextMonthHandle = () => {
      if (state.month >= 12) {
        state.month = 1;
        state.year += 1;
        return;
      }
      state.month += 1;
    };
    const dateSelectedHandle = (event = null, index) => {
      if (event && event.target.classList["value"].indexOf("hiden-text") > -1)
        return;
      state.selected = index;
      // day
      context.emit("selected", state.date);
    };
    const genMatrix = (n, length, firstItems, lastItems) => {
      let result = [];
      let genArrNum = [...firstItems.map((item) => item.toString())];
      for (let i = 1; i <= n; i++) {
        genArrNum.push(i);
      }
      genArrNum = [...genArrNum, ...lastItems.map((item) => item.toString())];
      for (let i = 0; i < genArrNum.length / length; i++) {
        result.push(genArrNum.slice(i * length, i * length + length));
      }
      return result;
    };

    return {
      state,
      slideIndex,
      prevMonthHandle,
      nextMonthHandle,
      dateSelectedHandle,
    };
  },
};
</script>
<style scoped>
.bgColor {
  background: #ffa64d;
}

.hiden-text {
  opacity: 0;
}

.main-card {
  border-radius: 33px 33px 9px 9px;
  box-shadow: 0 0 10px 1px #80808059;
}
</style>
