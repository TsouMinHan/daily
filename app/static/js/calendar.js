let calendarData = {
    Calendar: {
        year: null,
        month: null,
        day: null
    },
    dayArr: {}
};

var calendarApp = new Vue({
    el: '#calendar',
    delimiters: ["((", "))"],
    data: calendarData,
    mounted: function() {
        this.updateCalendar();

        this.updateDayArr();
    },
    methods: {
        updateCalendar: function() {
            let today = new Date();
            this.Calendar.year = today.getFullYear();
            this.Calendar.month = today.getMonth() + 1;
            this.Calendar.day = today.getDay();
        },
        updateDayArr: function() {
            // month - 1 是因為 month 我有給他 + 1
            const first = new Date(this.Calendar.year, this.Calendar.month - 1, 1);
            const last = new Date(this.Calendar.year, this.Calendar.month, 0);
            // const first = new Date(2021, 5 - 1, 1);
            // const last = new Date(2021, 5, 0);

            const firstDate = first.getDate();
            const lastDate = last.getDate(); // 代表 這個月份的前一天

            const firstDay = first.getDay();
            const lastDay = last.getDay();

            // 日曆上個月分的尾段日期，從星期幾開始
            let tmp = [];
            for (i = 0; i < firstDay; i++) {
                tmp.push(i);
            }

            // 日曆上這個月份的日期，將所有天數放入
            for (i = 1; i <= lastDate; i++) {
                tmp.push(i)
            }

            // 日曆上補上下個月的前段日期
            for (i = 0; i < 7 * 5 - tmp.length; i++) {
                tmp.push(i);
            }
            // 放入 dayArr 中
            for (i = 0; i < 5; i++) {
                this.dayArr[i] = tmp.slice(i * 7, (i + 1) * 7);
            }
        }
    }
});