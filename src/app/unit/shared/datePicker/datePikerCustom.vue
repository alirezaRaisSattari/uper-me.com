<template>
  <div class="datePicker">
    <input
        ref="inputRef"
        v-model="state.date"
        :name="name"
        :placeholder="placeholder"
        class="p-inputtext p-component w-100 smart-text-align"
        style="border: 1px solid #ced4da"
        type="text"
        @blur="datePickerHandleBlur"
        @focus="datePickerHandleShow(true, 'opened')"
        @input="datePickerHandleChange"
    />
    <section
        v-if="inline || state.showDatePicker"
        class="datePicker__section"
        @mousedown.prevent
    >
      <div
          class="w-100 d-flex justify-content-between px-2 py-1"
          style="background: #fff"
      >
        <Button
            :label="state.months[state.month - 1]"
            class="px-3 py-1 bgColor border-0"
            @click="state.showMonthList = true"
        />
        <!-- <Button
          class="px-3 py-1 bgColor border-0"
          :label="state.year ? state.year : $t('year')"
          @click="openYearList"
        /> -->
      </div>
      <table>
        <div v-if="state.showMonthList" class="datePicker__div">
          <button
              v-for="(month, index) in state.rangeNameMonths"
              :key="index"
              :class="{ 'datePicker--active': state.month === ++index }"
              class="p-button p-component p-button-outlined"
              type="button"
              @click="chooseMonth(index)"
          >
            {{ month }}
          </button>
        </div>
        <div
            :class="[
            'datePicker__div',
            !state.showYearList && 'datePicker__div--invisible',
          ]"
        >
          <button
              v-for="(year, index) in state.years"
              :key="index"
              :class="{ 'datePicker--active': state.year === year }"
              :data-scroll="state.year === year ? 1 : ''"
              type="button"
              @click="chooseYear(year)"
          >
            {{ year }}
          </button>
        </div>
        <thead>
        <tr>
          <th class="datePicker__th__button">
            <Button
                :label="$t('lastMonth')"
                class="p-button-raised p-button-text p-button-plain"
                @click="prevMonthHandle"
            />
          </th>

          <th class="datePicker__th__button">
            <Button
                :label="$t('nextMonth')"
                class="p-button-raised p-button-text p-button-plain"
                @click="nextMonthHandle"
            />
          </th>
        </tr>
        <tr>
          <th v-for="(item, index) in state.weekdaysMin" :key="index">
            {{ item }}
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
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
        >
          <td
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
                'datePicker__td--disable': typeof day !== 'number',
                'datePicker__td--active': state.selected === day,
                'datePicker--active':
                  !state.selected &&
                  state.today === day &&
                  state.checkYearMonth(state.year, state.month),
                'datePicker--highlight':
                  state.today === day &&
                  state.checkYearMonth(state.year, state.month),
              }"
              @click="dateSelectedHandle($event, day)"
          >
            {{ day }}
          </td>
        </tr>
        <tr class="datePicker__button">
          <Button
              :label="$t('today')"
              class="p-button-raised border-0 pt-2"
              @click="goToday"
          />
        </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
import PersianDate from "persian-date";
import {computed, onMounted, reactive, ref, watch} from "vue";
import "vue3-persian-datepicker/dist/datepicker.min.css";

export default {
  name: "DatePicker",
  props: ["name", "inline", "format", "placeholder"],
  setup(props, context) {
    const jalal = new PersianDate();
    const inputRef = ref(null);
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
            case "????????????":
              return 1;
            case "????????????":
              return 2;
            case "???? ????????":
              return 3;
            case "???????? ????????":
              return 4;
            case "?????????????????":
              return 5;
            case "????????":
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
            case "????????????":
              return 5;
            case "????????????":
              return 4;
            case "???? ????????":
              return 3;
            case "???????? ????????":
              return 2;
            case "?????????????????":
              return 1;
            case "????????":
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
      if (
          event &&
          event.target.classList["value"].indexOf("datePicker__td--disable") > -1
      )
        return;
      state.selected = index;
      // day
      state.date = new PersianDate([jalal.year(state.year), state.month, index])
          .toLocale("en")
          .format(props.format || "YYYY/MM/DD");
      datePickerHandleShow(true, "closed");
      inputRef.value.blur();
      context.emit("update:modelValue", state.date);
      context.emit("selected", state.date);
    };
    const goToday = () => {
      state.year = jalal.year();
      state.month = jalal.month();
      state.today = jalal.date();
      state.selected = state.today;
      dateSelectedHandle(null, state.today);
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
    const chooseMonth = (month) => {
      state.month = month;
      state.showMonthList = false;
    };
    const chooseYear = (year) => {
      state.year = year;
      state.showYearList = false;
    };
    const openYearList = () => {
      state.showYearList = true;
      scrollToElementD(".datePicker__div", "button[data-scroll='1']");
    };
    const scrollToElementD = (parent, toEl) => {
      var topPos = document.querySelector(toEl).offsetTop;
      document.querySelectorAll(parent)[0].scrollTop = topPos - 10;
    };
    const datePickerHandleChange = (event) => {
      const dateArr = event.target.value.split("/");
      if (Number(dateArr[1]) > 12) return;
      state.year = Number(dateArr[0]);
      state.month = Number(dateArr[1]);
      state.today = Number(dateArr[2]);
      state.selected = state.today;
      context.emit("update:modelValue", event.target.value);
    };
    const datePickerHandleShow = (flag, emit) => {
      state.showDatePicker = flag;
      context.emit(emit);
    };
    const datePickerHandleBlur = () => {
      datePickerHandleShow(false, "closed");
      state.showYearList = false;
      state.showMonthList = false;
    };

    return {
      inputRef,
      state,
      prevMonthHandle,
      nextMonthHandle,
      dateSelectedHandle,
      goToday,
      chooseMonth,
      chooseYear,
      openYearList,
      datePickerHandleChange,
      datePickerHandleShow,
      datePickerHandleBlur,
    };
  },
};
</script>
<style scoped>
.bgColor {
  background: #ffa64d;
}
</style>
