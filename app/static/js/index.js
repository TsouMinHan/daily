let data = {
    title: "daily",
    dailys: [],
    Calendar: {
        year: null,
        month: null,
        day: null
    }
}

var app = new Vue({
    el: '#app',
    delimiters: ["[[", "]]"],
    data: data,
    mounted: function() {
        this.loadData();
        this.updateCalendar();
    },
    computed: {
        DayArr: function() {
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

            let output = {};
            // 放入 dayArr 中
            for (i = 0; i < 5; i++) {
                output[i] = tmp.slice(i * 7, (i + 1) * 7);
            }

            return output;
        }
    },
    methods: {
        submitData: function() {
            const data = {
                content: CKEDITOR.instances["editor"].getData(),
                timestamp: Math.round(Date.now() / 1000) // now 得到的是毫秒，再除 1000 變成秒數
            }
            let xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    const results = JSON.parse(xhr.responseText);

                    if (results.status == "success") {
                        CKEDITOR.instances["editor"].setData(""); // clear textarea
                    }
                }
            }

            xhr.open("post", "/api/save_daily", true);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.send(JSON.stringify(data));
        },
        loadData: function() {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    const results = JSON.parse(xhr.responseText);

                    if (results.status == "success") {
                        data.dailys = results.dailys;
                    }
                }
            }

            xhr.open("post", "/api/load_daily", true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send({})
        },
        updateCalendar: function() {
            let today = new Date();
            this.Calendar.year = today.getFullYear();
            this.Calendar.month = today.getMonth() + 1;
            this.Calendar.day = today.getDay();
        }
    }
});

CKEDITOR.replace("editor");