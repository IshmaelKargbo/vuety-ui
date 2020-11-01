<template>
  <div v-click-outside="closeOption" class="w-full">
    <div class="w-full relative">
      <div
        class="flex cursor-pointer border bg-white rounded-md items-center p-2"
        @click="toggleDate"
        :class="{ 'border-red-500': error }"
      >
        <div class="w-full flex">
          <p
            class="text-gray-500 w-full overflow-hidden"
            :class="[{ 'text-gray-700': selected }]"
          >
            <v-clamp autoresize :max-lines="1">{{ selectedDate }}</v-clamp>
          </p>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="fill-current text-gray-500"
          :class="{ 'text-red-500': error }"
          width="19"
          height="19"
        >
          <path
            class="heroicon-ui"
            d="M17 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h2V3a1 1 0 1 1 2 0v1h6V3a1 1 0 0 1 2 0v1zm-2 2H9v1a1 1 0 1 1-2 0V6H5v4h14V6h-2v1a1 1 0 0 1-2 0V6zm4 6H5v8h14v-8z"
          />
        </svg>
      </div>
      <p v-if="eMessage" class="text-red-500 text-sm pt-1 pl-1">
        {{ error }}
      </p>
      <div
        v-show="visible"
        :id="datepickerId"
        class="absolute z-50 flex overflow-hidden shadow-xl flex-col mt-1 rounded-md iu-datepicker py-2 bg-white border"
      >
        <div v-if="view === 'Days'">
          <div class="flex items-center justify-between text-gray-600 p-3">
            <div class="cursor-pointer" @click="goToPrevMonth">
              <svg
                class="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  class="heroicon-ui"
                  d="M14.7 15.3a1 1 0 0 1-1.4 1.4l-4-4a1 1 0 0 1 0-1.4l4-4a1 1 0 0 1 1.4 1.4L11.42 12l3.3 3.3z"
                />
              </svg>
            </div>
            <div class="cursor-pointer" @click="monthView">
              {{ mthElement }}
            </div>
            <div class="cursor-pointer" @click="goToNextMonth">
              <svg
                class="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  class="heroicon-ui"
                  d="M9.3 8.7a1 1 0 0 1 1.4-1.4l4 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 0 1-1.4-1.4l3.29-3.3-3.3-3.3z"
                />
              </svg>
            </div>
          </div>
          <div class="flex flex-wrap px-3 pb-2">
            <p
              class="iu-datepicker-date text-center text-gray-500 cursor-pointer"
            >
              S
            </p>
            <p
              class="iu-datepicker-date text-center text-gray-500 cursor-pointer"
            >
              M
            </p>
            <p
              class="iu-datepicker-date text-center text-gray-500 cursor-pointer"
            >
              T
            </p>
            <p
              class="iu-datepicker-date text-center text-gray-500 cursor-pointer"
            >
              W
            </p>
            <p
              class="iu-datepicker-date text-center text-gray-500 cursor-pointer"
            >
              T
            </p>
            <p
              class="iu-datepicker-date text-center text-gray-500 cursor-pointer"
            >
              F
            </p>
            <p
              class="iu-datepicker-date text-center text-gray-500 cursor-pointer"
            >
              S
            </p>
          </div>
          <div class="flex flex-wrap px-3 pb-2">
            <div
              v-for="(row, index) in populateDates()"
              :key="index"
              @click="selectDay(row.day, row.month)"
            >
              <p
                :class="{
                  border:
                    currentDay == row.day &&
                    currentMonth == month &&
                    currentYear == year,
                }"
                v-if="
                  selectedDay == row.day &&
                  selectedMonth == month &&
                  selectedYear == year &&
                  row.month === 'current'
                "
                class="iu-datepicker-date text-center cursor-pointer iu-select-date text-white py-1"
              >
                {{ row.day }}
              </p>
              <p
                v-else
                :class="[
                  {
                    border:
                      currentDay == row.day &&
                      currentMonth == month &&
                      currentYear == year &&
                      row.month === 'current',
                  },
                  {
                    'iu-select-date-border':
                      currentDay == row.day &&
                      currentMonth == month &&
                      currentYear == year,
                  },
                  {
                    'text-gray-400':
                      row.month === 'last' &&
                      noPast &&
                      !pastDate(row.day, row.month),
                  },
                  { 'text-gray-400': row.month === 'last' && !noPast },
                  {
                    'text-gray-600':
                      row.month === 'current' && !noPast && !noFuture && !dob,
                  },
                  { 'text-gray-300': pastDate(row.day, row.month) && noPast },
                  {
                    'cursor-not-allowed':
                      pastDate(row.day, row.month) && noPast,
                  },
                  {
                    'text-gray-300':
                      futureDate(row.day, row.month) && (noFuture || dob),
                  },
                  {
                    'cursor-not-allowed':
                      futureDate(row.day, row.month) && (noFuture || dob),
                  },
                ]"
                class="iu-datepicker-date text-center cursor-pointer py-1"
              >
                {{ row.day }}
              </p>
            </div>
          </div>
        </div>
        <div v-if="view === 'Month'">
          <div
            class="flex items-center justify-between text-gray-600 px-3 py-3"
          >
            <div class="cursor-pointer" @click="goToPrevYear">
              <svg
                class="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  class="heroicon-ui"
                  d="M14.7 15.3a1 1 0 0 1-1.4 1.4l-4-4a1 1 0 0 1 0-1.4l4-4a1 1 0 0 1 1.4 1.4L11.42 12l3.3 3.3z"
                />
              </svg>
            </div>
            <div class="cursor-pointer" @click="yearView">{{ year }}</div>
            <div class="cursor-pointer" @click="goToNextYear">
              <svg
                class="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  class="heroicon-ui"
                  d="M9.3 8.7a1 1 0 0 1 1.4-1.4l4 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 0 1-1.4-1.4l3.29-3.3-3.3-3.3z"
                />
              </svg>
            </div>
          </div>
          <div class="flex flex-wrap px-3 pb-2">
            <div
              v-for="(m, index) in months"
              :key="index + 'm'"
              class="w-1/3 my-2"
              @click="selectMonth(index)"
            >
              <p
                class="text-center text-gray-600 cursor-pointer py-2 hover:bg-sec hover:font-semibold"
              >
                {{ limitMonth(m) }}
              </p>
            </div>
          </div>
        </div>
        <div v-if="view === 'Year'">
          <div
            class="flex items-center justify-between text-gray-600 px-3 py-3"
          >
            <div class="cursor-pointer" @click="goToPrevYear">
              <svg
                class="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  class="heroicon-ui"
                  d="M14.7 15.3a1 1 0 0 1-1.4 1.4l-4-4a1 1 0 0 1 0-1.4l4-4a1 1 0 0 1 1.4 1.4L11.42 12l3.3 3.3z"
                />
              </svg>
            </div>
            <div class="cursor-pointer">{{ yearRange().range }}</div>
            <div class="cursor-pointer" @click="goToNextYear">
              <svg
                class="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  class="heroicon-ui"
                  d="M9.3 8.7a1 1 0 0 1 1.4-1.4l4 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 0 1-1.4-1.4l3.29-3.3-3.3-3.3z"
                />
              </svg>
            </div>
          </div>
          <div class="flex flex-wrap px-3 pb-2">
            <div
              v-for="(y, index) in yearRange().years"
              :key="index + 'y'"
              class="w-1/3 my-2"
            >
              <p
                @click="selectYear(y)"
                class="text-center cursor-pointer py-2 text-gray-600 hover:bg-sec hover:font-semibold"
              >
                {{ y }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vClamp from "vue-clamp";
import * as moment from "moment";

export default {
  props: {
    placeholder: {
      default: "Select Date",
    },
    value: String,
    dob: {
      default: false,
    },
    error: {
      default: "",
    },
    noPast: {
      type: Boolean,
      default: false,
    },
    noFuture: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      eMessage: false,
      selectedDate: this.placeholder,
      datepickerId: "_" + Math.random().toString(36).substr(2, 9),
      visible: false,
      view: this.dob ? "Year" : "Days",
      selected: false,
      date: new Date(),
      day: null,
      month: null,
      year: null,
      selectedMonth: null,
      selectedDay: null,
      selectedYear: null,
      currentMonth: null,
      currentDay: null,
      currentYear: null,
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      week: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      mthElement: null,
    };
  },
  methods: {
    closeOption() {
      this.visible = false;
      this.view = this.dob ? "Year" : "Days";
    },
    toggleDate(e) {
      this.day = this.selectedDay;
      this.month = this.selectedMonth;
      this.year = this.selectedYear;

      const datepicker = document.querySelector(`#${this.datepickerId}`);

      this.visible = !this.visible;
      this.view = this.dob ? "Year" : "Days";
    },
    daysInMonth(month, year) {
      return new Date(year, month, 0).getDate();
    },
    selectYear(y) {
      this.view = "Month";
      this.year = y;
    },
    selectMonth(m) {
      this.month = m;
      this.view = "Days";
      this.mthElement = this.months[this.month] + " " + this.year;
      this.populateDates();
    },
    dateInWeekOther(lastMonth, seletedMonth, week) {
      const dateInWeek = [];

      if (week === "Monday") dateInWeek.push({ day: lastMonth, month: "last" });

      if (week === "Tuesday") {
        dateInWeek.push({ day: lastMonth - 1, month: "last" });
        dateInWeek.push({ day: lastMonth, month: "last" });
      }

      if (week === "Wednesday") {
        dateInWeek.push({ day: lastMonth - 2, month: "last" });
        dateInWeek.push({ day: lastMonth - 1, month: "last" });
        dateInWeek.push({ day: lastMonth, month: "last" });
      }

      if (week === "Thursday") {
        dateInWeek.push({ day: lastMonth - 3, month: "last" });
        dateInWeek.push({ day: lastMonth - 2, month: "last" });
        dateInWeek.push({ day: lastMonth - 1, month: "last" });
        dateInWeek.push({ day: lastMonth, month: "last" });
      }

      if (week === "Friday") {
        dateInWeek.push({ day: lastMonth - 4, month: "last" });
        dateInWeek.push({ day: lastMonth - 3, month: "last" });
        dateInWeek.push({ day: lastMonth - 2, month: "last" });
        dateInWeek.push({ day: lastMonth - 1, month: "last" });
        dateInWeek.push({ day: lastMonth, month: "last" });
      }

      if (week === "Saturday") {
        dateInWeek.push({ day: lastMonth - 5, month: "last" });
        dateInWeek.push({ day: lastMonth - 4, month: "last" });
        dateInWeek.push({ day: lastMonth - 3, month: "last" });
        dateInWeek.push({ day: lastMonth - 2, month: "last" });
        dateInWeek.push({ day: lastMonth - 1, month: "last" });
        dateInWeek.push({ day: lastMonth, month: "last" });
      }

      const length = seletedMonth + 0;

      for (let day = 1; day <= length; day++) {
        dateInWeek.push({ day: day, month: "current" });
      }

      return dateInWeek;
    },
    formateDays(year, month) {
      const dayWeek = new Date(year, month, 1).getDay();
      const seletedMonth = this.daysInMonth(month + 1, year);
      const lastMonth = this.daysInMonth(month, year);
      const w = this.week[dayWeek];

      return this.dateInWeekOther(lastMonth, seletedMonth, w);
    },
    rang12Years(year) {
      const years = [];
      const newYear = year + 10;

      for (let i = year; i < newYear; i++) {
        years.push(i);
      }

      return { years, range: `${year} - ${newYear - 1}` };
    },
    populateDates() {
      return this.formateDays(this.year, this.month);
    },
    yearRange() {
      return this.rang12Years(this.year);
    },
    limitMonth(month) {
      return month.substring(0, 3).toUpperCase();
    },
    errorHandler() {
      if (this.error) {
        this.eMessage = true;

        setTimeout(() => {
          this.eMessage = false;
        }, 5000);
      }
    },
    goToNextMonth() {
      this.month++;
      if (this.month > 11) {
        this.month = 0;
        this.year++;
      }
      this.mthElement = this.months[this.month] + " " + this.year;
      this.populateDates();
    },
    goToPrevMonth() {
      this.month--;
      if (this.month < 0) {
        this.month = 11;
        this.year--;
      }
      this.mthElement = this.months[this.month] + " " + this.year;
      this.populateDates();
    },
    goToNextYear() {
      this.year++;
      this.yearRange();
    },
    goToPrevYear() {
      this.year--;
      this.yearRange();
    },
    monthView() {
      this.view = "Month";
    },
    yearView() {
      this.view = "Year";
    },
    edit(value) {
      let dates = "";
      if (value.indexOf("/") != -1) dates = value.split(["/"]);

      if (value.indexOf("-") != -1) dates = value.split(["-"]);

      const date = new Date(dates[0], dates[1] - 1, dates[2]);

      if (date == "Invalid Date") return;

      this.day = date.getDate();
      this.month = date.getMonth();
      this.year = date.getFullYear();

      this.selected = true;
      this.selectedDay = this.day;
      this.selectedMonth = this.month;
      this.selectedYear = this.year;

      this.mthElement = this.months[this.month] + " " + this.year;

      this.selectedDate = `${
        this.selectedDay < 10 ? "0" + this.selectedDay : this.selectedDay
      }-${
        this.selectedMonth + 1 < 10
          ? "0" + (this.selectedMonth + 1)
          : this.selectedMonth + 1
      }-${this.selectedYear}`;
    },
    pastDate(day, status) {
      const oldDate = new Date(
        `${this.year}-${
          status == "last"
            ? this.month - 1 <= 0
              ? 1
              : this.month - 1
            : this.month == 0
            ? 1
            : this.month
        }-${day}`
      );

      const currentDate = new Date(
        `${this.currentYear}-${this.currentMonth}-${this.currentDay}`
      );

      return currentDate > oldDate;
    },
    futureDate(day, status) {
      const oldDate = new Date(
        `${this.year}-${
          status == "last"
            ? this.month - 1 <= 0
              ? 0
              : this.month - 1
            : this.month == 0
            ? 1
            : this.month
        }-${day}`
      );
      const currentDate = new Date(
        `${this.currentYear}-${this.currentMonth}-${this.currentDay}`
      );

      return currentDate < oldDate;
    },
    selectDay(select, status) {
      const checkPastStatus = this.noPast
        ? this.pastDate(select, status)
        : false;
      const checkFutureStatus = this.noFuture
        ? this.futureDate(select, status)
        : false;

      if (!checkPastStatus && !checkFutureStatus) {
        this.visible = false;
        this.selected = true;
        this.day = select;

        if (status == "last") {
          this.month--;
          this.mthElement = this.months[this.month] + " " + this.year;
        }

        this.selectedDay = select;
        this.selectedMonth = this.month;
        this.selectedYear = this.year;

        this.selectedDate = `${this.selectedYear}-${
          this.selectedMonth + 1 < 10
            ? "0" + (this.selectedMonth + 1)
            : this.selectedMonth + 1
        }-${this.selectedDay < 10 ? "0" + this.selectedDay : this.selectedDay}`;

        this.$emit("input", this.selectedDate);
      }
    },
  },
  watch: {
    value(f) {
      if (f) {
        this.edit(f);
      } else {
        this.selectedDate = this.placeholder;
      }
    },
    error(data) {
      if (data) {
        this.errorHandler();
      }
    },
  },
  mounted() {
    if (this.value) {
      this.edit(this.value);
    } else {
      this.day = this.date.getDate();
      this.month = this.date.getMonth();
      this.year = this.date.getFullYear();
      this.selectedMonth = this.month;
      this.selectedDay = this.day;
      this.selectedYear = this.year;
      this.currentMonth = this.month;
      this.currentDay = this.day;
      this.currentYear = this.year;
      this.mthElement = this.months[this.month] + " " + this.year;
    }

    if (this.error) {
      this.errorHandler();
    }
  },
  components: {
    vClamp,
  },
};
</script>
<style scoped>
.iu-select-date {
  background: #0b4671;
}

.iu-select-date-border {
  border-color: #0b4671;
}

.iu-datepicker {
  width: 270px;
}

.iu-datepicker-date {
  width: 24.7px;
  margin: 5px;
}
</style>
